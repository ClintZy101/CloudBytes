<template>
  <div>
     <div class="q-gutter-xs q-mt-md">
      <q-chip v-for="(chip,i) in chips" :key="i" removable color="primary" text-color="white">
        {{ chip }}
      </q-chip>
    </div>
    <div class="e-resizable q-mt-xs">
      <ejs-grid
        class="q-pt-md"
        ref="grid"
        :dataSource="items"
        :allowTextWrap='true'
        :dataBound="dataBound"
        :detailTemplate="detailsTemplate"
        :selectionSettings='selectionOptions'
        :allowPaging="true"
        :pageSettings='pageSettings'
        :enableHover="false"
        :allowSelection="enableSelection"
        :allowFiltering='true' 
        :filterSettings='filterOptions'
        :toolbar='toolbar'
        :toolbarClick='clickHandler'
        :rowSelected="rowSelected"
        :rowDeselected="rowDeselected"
        :rowSelecting="rowSelecting"
        :rowDeselecting="rowDeselecting"
      >
        <e-columns>
          <e-column v-if="enableSelection"  :lockColumn='true'  type='checkbox' width='50'></e-column>
           <e-column
            field='id'
            headerText='Id'
            isPrimaryKey='true'
            :visible='false'
          />
          <e-column
            field='details.category'
            headerText='Category'
          />
          <e-column
            field='details.itemName'
            headerText='Item Name'
          />
          <e-column
            field='details.description'
            :min-width="150"
            headerText='Description'
          />
          <e-column
            field='oldMainPrice'
            headerText='Main Price'
            :allowFiltering='false'
            :valueAccessor='VAOldMainPrice'
            :customAttributes="{class: 'text-red-8'}"
          />
          <e-column
            field='oldBranchPrice'
            headerText='Branch Price'
            :allowFiltering='false'
            :valueAccessor='VAOldBranchPrice'
            :customAttributes="{class: 'text-red-8'}"
          />
          <e-column
            field='newPrice'
            headerText='New Price'
            :allowFiltering='false'
            :customAttributes="{class: ['text-green-8','text-weight-bold']}"
            :valueAccessor='VANewPrice'
          />
          <e-column
            field='difference'
            headerText='Difference (Main | Branch)'
            :allowFiltering='false'
            :customAttributes="{class: ['text-primary','text-weight-bold']}"
            :valueAccessor='VADifference'
          />
        </e-columns>
      </ejs-grid>
    </div>
    <div class="q-mt-lg row justify-end">
      <div class="col-12">
      <q-btn v-if="enableSelection" color="primary" class="float-right q-mr-md" icon="add" label="Add to quote" rounded @click="addToQuote"/>
      </div>
    </div>
  </div>
</template>

<script>
import items from 'src/helpers/ItemsJsonHelper.js';
import ItemDetailTemplate from 'components/ItemDetailTemplate.vue'
import { Provide } from 'boot/syncfusion.js';
import { PESO } from 'src/helpers/NumberFormat.js';
import priceLevel from 'src/helpers/PriceLevel.js';
import _ from 'lodash';

export default {
  name: 'item-list-component',
  props: {
    enableSelection: {
      type: Boolean,
      default: false
    }
  },
  provide: {
    grid: Provide.Grid
  },
  data () {
    return {
      items,
      chips: [],
      priceLevel,
      selectionOptions: {
        persistSelection: true,
        type: 'Multiple',
        allowColumnSelection: false, 
      },
      toolbar: ['Clear Search', 'Search'],
      filterOptions: {
        type: 'Menu',
        operators: {
          stringOperator: [
            { value: 'contains', text: 'Contains' },
            { value: 'startsWith', text: 'Starts With' },
            { value: 'endsWith', text: 'Ends With' },
          ],
        }
      },
      pageSettings: { pageSizes: true, pageSize: 10 },
      detailsTemplate: function () {
        return {
          template: ItemDetailTemplate
        }
      }
    }
  },
  methods: {
    addToQuote () {
      // if (selectedRecords.length < 1) {
      //   this.$q.notify({
      //     message: 'No selected items, click the "x" button instead.',
      //     color: 'warning',
      //     icon: 'warning',
      //     actions: [
      //       { label: 'Dismiss', color: 'white', handler: () => { /* ... */ } }
      //     ]
      //   })
      // }
    },
    rowSelected: function(args) {
      if (this.chips.length > 0) {
        const find = _.find(this.chips, x => x === args.data.details.itemName);
        if (find === undefined) this.chips.push(args.data.details.itemName);
      } else this.chips.push(args.data.details.itemName);
    },
    rowDeselected: function(args) {
      if (args.data === undefined) {
        this.chips = [];
        return;
      }
      if (this.chips.length > 0) {
        const index = _.findIndex(this.chips, x => x === args.data.details.itemName);
        if (index > -1) {
          this.chips.splice(index, 1);
        }
      }
    },
    rowSelecting: function(args) {
      if(_.isArray(args.data)) args.cancel = true;
    },
    rowDeselecting: function(args) {
      if(_.isArray(args.data)) args.cancel = true;
    },
    clickHandler: function(args) {
      if(args.item.text === 'Clear Search') {
        this.$refs.grid.ej2Instances.searchSettings.key = "";
      }
    },
    dataBound: function () {
      this.$refs.grid.autoFitColumns(['details.category', 'details.itemName', 'details.description', 'oldMainPrice', 'oldBranchPrice', 'newPrice', 'difference']);
    },
    VAOldMainPrice (field, data, column) {
      return PESO(data.oldPricing.main.price).format();
    },
    VAOldBranchPrice (field, data, column) {
      return PESO(data.oldPricing.branch.price).format();
    },
    VANewPrice (field, data, column) {
      return PESO(data.newPricing.price).format();
    },
    VADifference (field, data, column) {
      const main = PESO(data.newPricing.main.difference).format();
      const branch = PESO(data.newPricing.branch.difference).format();
      return main + ' | ' + branch;
    }
  }
}
</script>

<style>
.e-resizable {
  resize: both;
  overflow: auto;
  padding: 10px;
  height: 600px;
  width: 100%;
  min-height: 600px;
  min-width: 300px;
}
</style>