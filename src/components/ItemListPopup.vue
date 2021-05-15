<template>
  <q-dialog
    v-model="dialog"
    maximized
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card>
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">List of items</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-card-section>
        <q-banner class="bg-green-2 text-black q-mb-xs">
          <div class="text-weight-bold q-mb-sm text-secondary">INFO</div>
          <div class="row">
            <div class="col-6">
              <q-icon name="store" size="sm" /> {{ store }}
            </div>
            <div class="col-6">
              Total Items: <b>{{ getItems.length }}</b>
            </div>
          </div>
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
        <div class="e-resizable">
          <ejs-grid
            class="q-pt-md"
            ref="grid"
            :dataSource="getItems"
            :allowTextWrap='true'
            :dataBound="dataBound"
            :allowPaging="true"
            :pageSettings='pageSettings'
            :enableHover="false"
            :allowSelection="true"
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
                field='details.item_name'
                headerText='Item Name'
              />
              <e-column
                field="available_items"
                headerText='Stocks'
                :allowFiltering='false'
              />
              <e-column
                field="price"
                headerText='Price'
                :allowFiltering='false'
                :valueAccessor='valAccessorPrice'
                :customAttributes="{class: ['text-green-8','text-weight-bold']}"
              />
              <e-column
                field='details.category'
                headerText='Category'
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
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { getItems } from 'src/helpers/ItemsJsonHelper.js';
import { Provide } from 'boot/syncfusion.js';
import { PESO } from 'src/helpers/NumberFormat.js';

export default {
  name: 'item-list-popup',
  props: ['value','storeType'],
  data () {
    return {
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
      pageSettings: { pageSizes: true, pageSize: 20 }
    }
  },
  computed: {
    dialog: {
      get () {
        return this.value;
      },
      set (val) {
        this.$emit('input', val);
      }
    },
    getItems () {
      return getItems(this.storeType);
    },
    store () {
      return this.storeType.toUpperCase();
    }
  },
  methods: {
    itemSelect: function(data) {
      this.$emit('item-select', data);
      this.dialog = false;
    },
    dataBound: function () {
      this.$refs.grid.autoFitColumns(['details.category', 'details.item_name', 'details.description', 'price','available_items']);
    },
    valAccessorPrice: function (field, data, column) {
      return PESO(data.price).format();
    },
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
  padding: 0px;
  height: 550px;
  width: 100%;
  min-height: 550px;
  min-width: 300px;
}
</style>