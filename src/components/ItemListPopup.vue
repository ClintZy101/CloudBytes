<template>
  <q-dialog
    v-model="dialog"
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
              <q-icon name="store" size="sm" /> Tarlac
            </div>
            <div class="col-6">
              Total Items: <b>4</b>
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
        <div class="e-resizable q-mt-xs">
          <ejs-grid
            class="q-pt-md"
            ref="grid"
            :dataSource="getItems"
            :allowTextWrap='true'
            :dataBound="databound"
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
                field='details.itemName'
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
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import inv_tarlac from 'assets/inventory_tarlac.json';
import inv_talavera from 'assets/inventory_talavera.json';
import inv_rosales from 'assets/inventory_rosales.json';

export default {
  name: 'item-list-popup',
  props: ['value','storeType'],
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
      switch(this.storeType) {
        case 'tarlac':
          return inv_tarlac.Items;
        case 'talavera':
          return inv_talavera.Items;
        case 'rosales':
          return inv_rosales.Items;
        default:
          return [];
      }
    }
  },
  methods: {
    itemSelect: function(data) {
      this.$emit('item-select', data);
      this.dialog = false;
    }
  }
}
</script>

<style>
.e-resizable {
  resize: both;
  overflow: auto;
  padding: 5px;
  height: 300;
  width: 100%;
  min-height: 550px;
  min-width: 300px;
}
</style>