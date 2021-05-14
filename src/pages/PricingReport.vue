<template>
  <q-page padding>
    <q-toolbar class="bg-grey-3 text-primary rounded-borders">
      <q-toolbar-title>
        Pricing Report
      </q-toolbar-title>
    </q-toolbar>
    <div class="q-pa-md">
      <q-scroll-area
        :thumb-style="thumbStyle"
        :bar-style="barStyle"
        style="height: 200px; width: 100%;"
      >
        <q-markup-table>
          <thead>
            <tr>
              <th class="text-left">Level</th>
              <th class="text-center">Min</th>
              <th class="text-center">Max</th>
              <th class="text-center">Markup</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(price, i) in priceLevel" :key="i">
              <td class="text-left">Level {{ i + 1 }}</td>
              <td class="text-center">{{ formatToPeso(price.min) }}</td>
              <td class="text-center">{{ formatToPeso(price.max) }}</td>
              <td class="text-center">{{ formatToPercentage(price.markup) }}</td>
            </tr>
          </tbody>
        </q-markup-table>
      </q-scroll-area>
      <q-banner class="bg-green-2 text-black q-mt-md q-mb-sm">
        <div class="text-weight-bold q-mb-sm text-secondary">INFO</div>
          Items and pricing have been updated since May 14, 2021. <br />
          If there is a new update of items and pricing. Contact the developer and send a backup of quickbooks.
      </q-banner>
      <div id="item-list">
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
        <div class="e-resizable q-mt-xs">
          <ejs-grid
            class="q-pt-md"
            ref="grid"
            :dataSource="items"
            :allowTextWrap='true'
            :dataBound="databound"
            :detailTemplate="detailsTemplate"
            :allowPaging="true"
            :pageSettings='pageSettings'
            :enableHover="false"
            :allowSelection="false"
            :allowFiltering='true' 
            :filterSettings='filterOptions'
            :searchSettings='searchOptions'
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
                field='details.item_name'
                headerText='Item Name'
              />
              <e-column
                field='pricing.price'
                headerText='Price'
                :allowFiltering='false'
                :valueAccessor='valAccessorPrice'
                :customAttributes="{class: ['text-green-8','text-weight-bold']}"
              />
              <e-column
                field='details.description'
                :min-width="130"
                headerText='Description'
              />
            </e-columns>
          </ejs-grid>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import _ from 'lodash';
import { Provide } from 'boot/syncfusion.js';
import { PESO } from 'src/helpers/NumberFormat.js';
import priceLevel from 'src/helpers/PriceLevel.js';
import { getItems } from 'src/helpers/ItemsJsonHelper.js';
import ReportItemDetails from 'components/ReportItemDetails.vue'

export default {
  data () {
    return { 
      priceLevel,
      thumbStyle: {
        right: '4px',
        borderRadius: '5px',
        backgroundColor: '#027be3',
        width: '5px',
        opacity: 0.75
      },
      barStyle: {
        right: '2px',
        borderRadius: '9px',
        backgroundColor: '#027be3',
        width: '9px',
        opacity: 0.2
      },

     items: getItems('tarlac'),
      searchQuery: '',
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
        fields: ['details.category', 'details.item_name', 'details.description']
      },
      pageSettings: { pageSizes: true, pageSize: 15 },
      detailsTemplate: function () {
        return {
          template: ReportItemDetails
        }
      }
    }
  },
  methods: {
    databound: function () { this.$refs.grid.autoFitColumns(['details.category', 'details.item_name', 'details.description', 'pricing.price']) },
    formatToPeso: (num) => PESO(num).format(),
    formatToPercentage: (num) => Math.round(num * 100) + "%",
    valAccessorPrice: (field, data, column) => PESO(data.pricing.price).format(),
    clearSearch: function () {
      this.searchQuery = ''
      this.$refs.grid.search(this.searchQuery);
    }
  },
  provide: {
    grid: Provide.Grid
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