<template>
  <q-page padding>
    <q-toolbar class="bg-grey-3 text-primary rounded-borders">
      <q-toolbar-title>
        Pricing Report
      </q-toolbar-title>
    </q-toolbar>
    <div class="q-pa-sm q-mt-sm">
      <q-input bottom-slots v-model="search" label="Search" counter dense  @input="$refs.grid.search(search)">
        <template v-slot:append>
          <q-icon v-if="search !== ''" name="close" @click="clearSearch" class="cursor-pointer" />
          <q-icon name="search" />
        </template>

        <template v-slot:hint>
          Category | Item Name | Description
        </template>
      </q-input>
    </div>
    <div class="e-resizable q-mt-md">
      <ejs-grid
        ref="grid"
        :dataSource="getItems"
        :allowTextWrap='true'
        :dataBound="dataBound"
        :searchSettings='searchOptions'
        :detailTemplate="detailsTemplate"
      >
        <e-columns>
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
            :valueAccessor='VAOldMainPrice'
            :customAttributes="{class: 'text-red-8'}"
          />
          <e-column
            field='oldBranchPrice'
            headerText='Branch Price'
            :valueAccessor='VAOldBranchPrice'
            :customAttributes="{class: 'text-red-8'}"
          />
          <e-column
            field='newPrice'
            headerText='New Price'
            :customAttributes="{class: ['text-green-8','text-weight-bold']}"
            :valueAccessor='VANewPrice'
          />
          <e-column
            field='difference'
            headerText='Difference (Main | Branch)'
            :customAttributes="{class: ['text-primary','text-weight-bold']}"
            :valueAccessor='VADifference'
          />
        </e-columns>
      </ejs-grid>
    </div>
  </q-page>
</template>

<script>
import items from 'src/helpers/ItemsJsonHelper.js';
import ItemDetailTemplate from 'components/ItemDetailTemplate.vue'
import { Provide } from 'boot/syncfusion.js';
import { PESO } from 'src/helpers/NumberFormat.js';

export default {
  name: 'item-list-component',
  provide: {
    grid: Provide.Grid
  },
  data () {
    return {
      items,
      search: '',
      searchOptions: {
        fields: ['details.category', 'details.itemName', 'details.description']
      },
      detailsTemplate: function () {
        return {
          template: ItemDetailTemplate
        }
      }
    }
  },
  computed: {
    getItems () {
      return _.slice(this.items, 0, 10);
    }
  },
  methods: {
    dataBound: function () {
      this.$refs.grid.autoFitColumns(['details.category', 'details.itemName', 'details.description', 'oldMainPrice', 'oldBranchPrice', 'newPrice', 'difference']);
    },
    clearSearch () {
      this.search = '';
      this.$refs.grid.search(this.search);
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
  height: 100%;
  width: 100%;
  min-height: 250px;
  min-width: 300px;
}
</style>