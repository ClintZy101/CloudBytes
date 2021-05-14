<template>
  <div>
     <div class="q-gutter-xs q-pa-sm">
       <q-input bottom-slots v-model="searchQuery" label="Search" counter dense @input="$refs.grid.search(searchQuery)">
        <template v-slot:append>
          <q-icon v-if="searchQuery !== ''" name="close" @click="clearSearch" class="cursor-pointer" />
          <q-icon name="search" />
        </template>

        <template v-slot:hint>
          Category | Item Name | Description
        </template>
      </q-input>
    </div>
    
     <q-banner v-if="enableSelection" class="bg-primary text-white q-mt-sm" dense>
       Select or click to add an item.
    </q-banner>
    <div class="e-resizable q-mt-xs">
      <ejs-grid
        class="q-pt-md"
        ref="grid"
        :dataSource="items"
        :allowTextWrap='true'
        :dataBound="dataBound"
        :detailTemplate="detailsTemplate"
        :allowPaging="true"
        :pageSettings='pageSettings'
        :enableHover="false"
        :allowSelection="enableSelection"
        :allowFiltering='true' 
        :filterSettings='filterOptions'
        :searchSettings='searchOptions'
        :rowSelected="rowSelected"
      >
        <e-columns>
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
          <!-- <e-column
            field='available_quantity'
            :min-width="20"
            headerText='QTY'
          /> -->
          <e-column
            field='pricing.price'
            headerText='Price'
            :allowFiltering='false'
            :valueAccessor='VAOldMainPrice'
            :customAttributes="{class: ['text-green-8','text-weight-bold']}"
          />
          <e-column
            field='details.description'
            :min-width="130"
            headerText='Description'
          />
          <!-- <e-column
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
          /> -->
        </e-columns>
      </ejs-grid>
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
      searchQuery: '',
      priceLevel,
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
      searchOptions: {
        fields: ['details.category', 'details.itemName', 'details.description']
      },
      pageSettings: { pageSizes: true, pageSize: 15 },
      detailsTemplate: function () {
        return {
          template: ItemDetailTemplate
        }
      }
    }
  },
  methods: {
    rowSelected: function(args) {
      if (args.data !== undefined) this.$emit('item-select', args.data);
    },
    clearSearch () {
      this.searchQuery = ''
      this.$refs.grid.search(this.searchQuery);
    },
    dataBound: function () {
      this.$refs.grid.autoFitColumns(['details.category', 'details.itemName', 'details.description', 'pricing.price','available_quantity']);
    },
    VAOldMainPrice (field, data, column) {
      return PESO(data.pricing.price).format();
    },
    // VAOldBranchPrice (field, data, column) {
    //   return PESO(data.oldPricing.branch.price).format();
    // },
    // VANewPrice (field, data, column) {
    //   return PESO(data.newPricing.price).format();
    // },
    // VADifference (field, data, column) {
    //   const main = PESO(data.newPricing.main.difference).format();
    //   const branch = PESO(data.newPricing.branch.difference).format();
    //   return main + ' | ' + branch;
    // }
  }
}
</script>

<style>
.e-resizable {
  resize: both;
  overflow: auto;
  padding: 10px;
  height: 550;
  width: 100%;
  min-height: 550px;
  min-width: 300px;
}
</style>