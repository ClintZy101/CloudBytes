<template>
  <q-page padding>
    <q-toolbar class="bg-grey-3 text-primary rounded-borders">
      <q-toolbar-title>
        Make a Quotation
      </q-toolbar-title>
    </q-toolbar>
    <item-list-popup v-model="itemListDialog" @item-select="itemSelect" />
      <div class="q-gutter-sm q-mt-sm">
        <q-radio v-model="priceType" val="newPrice" label="New Price" />
        <q-radio v-model="priceType" val="mainPrice" label="Main Price" />
        <q-radio v-model="priceType" val="branchPrice" label="Branch Price" />
      </div>
     <q-list bordered separator class="q-mt-md" v-for="item in getItems" :key="item.id">
       <q-slide-item :id="item.id" @left="opt => removeItem(opt, item.id)" left-color="red" ref="slide">
        <template v-slot:left>
          <q-icon name="done" /> Removed
        </template>
        <q-item>
          <q-item-section>
            <q-item-label lines="1">{{ item.details.itemName }}</q-item-label>
            <q-item-label caption>{{ item.details.category }}</q-item-label>
          </q-item-section>

          <q-item-section side top>
            {{ item.quantity }} x {{ getFormattedPrice(item) }}
            <q-chip color="secondary" text-color="white">
              {{ getAmount(item) }}
            </q-chip>
          </q-item-section>
        </q-item>
      </q-slide-item>
     </q-list>
     <q-card class="my-card q-mt-md q-pa-xs" v-if="items.length > 0">
      <q-card-section>
        <div class="text-subtitle2 text-info">Note: Slide right the item to remove or decrease it.</div>
        <div class="text-subtitle1">Total Cost: <q-chip color="secondary" text-color="white">{ on working }</q-chip></div>
        <div class="text-subtitle1">Total Price: <q-chip color="secondary" text-color="white">{ on working }</q-chip></div>
        <div class="text-subtitle1">Total Interest: <q-chip color="secondary" text-color="white">{ on working }</q-chip></div>
      </q-card-section>

      <q-separator />

      <q-card-actions align="left">
        <q-btn flat @click="clear">Clear</q-btn>
        <q-btn flat>Print</q-btn>
      </q-card-actions>
    </q-card>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="add" color="primary" @click="itemListDialog = true" />
    </q-page-sticky>
  </q-page>
</template>

<script>
import { PESO } from 'src/helpers/NumberFormat.js';
import _ from 'lodash';

export default {
  data () {
    return {
      itemListDialog: false,
      priceType: 'newPrice',
      items: [],
    }
  },
  computed: {
    getItems () {
      return this.items;
    }
  },
  methods: {
    removeItem ({ reset }, id) {
      if (this.items.length > 0) {
        const find = _.find(this.items, x => x.id === id);
        if (find !== undefined && find.quantity === 1) {
          const findIndex = _.findIndex(this.items, x => x.id === id);
          this.items.splice(findIndex, 1);
        } else {
          find.quantity--;
          reset();
          this.$forceUpdate(); 
        }
      }
    },
    clear () {
      this.items = [];
    },
    itemSelect(data) {
      if (this.items.length > 0) {
        const findIndex = _.findIndex(this.items, x => x.id === data.id);
        if (findIndex > -1) {
          this.items[findIndex].quantity++;
          return;
        }
      } 
      data.quantity = 1;
      this.items.push(data);
    },
    getPrice(item) {
      switch(this.priceType) {
        case 'newPrice':
          return item.newPricing.price;
        case 'mainPrice':
          return item.oldPricing.main.price;
        case 'branchPrice':
          return item.oldPricing.branch.price;
      }
    },
    getFormattedPrice(item) {
      return PESO(this.getPrice(item)).format();
    },
    getAmount(item) {
      const price = this.getPrice(item);
      return PESO(price * item.quantity).format();
    }
  },
}
</script>