<template>
  <q-page padding>
    <q-toolbar class="bg-grey-3 text-primary rounded-borders">
      <q-toolbar-title>
        Make a Quotation
      </q-toolbar-title>
    </q-toolbar>
    <item-list-popup v-model="itemListDialog" @item-select="itemSelect" />
      <div class="q-gutter-sm q-mt-sm">
        <q-radio v-model="storeType" val="tarlac" label="Tarlac Store" />
        <q-radio v-model="storeType" val="rosales" label="Rosales Store" />
        <q-radio v-model="storeType" val="talavera" label="Talavera Store" />
      </div>
       <q-banner class="bg-green-2 text-black">
        <div class="text-weight-bold q-mb-sm">TIP</div>
        When choosing a store will display the availability of an item.
      </q-banner>
     <q-list bordered separator class="q-mt-md" v-for="item in items" :key="item.id">
      <q-slide-item :id="item.id" @left="opt => removeItem(opt, item.id)" left-color="red" ref="slide">
        <template v-slot:left>
          <q-icon name="done" /> Removed
        </template>
        <q-item>
          <q-item-section>
            <q-item-label lines="1">{{ item.details.itemName }}</q-item-label>
            <q-item-label caption>{{ item.details.category }}</q-item-label>
            <q-item-label caption>Cost: {{ getFormattedCost(item) }} | Interest: {{ getFormattedInterest(item) }}</q-item-label>
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
     <q-card flat bordered class="q-mt-md" v-if="items.length === 0">
       <q-card-section>
         <div class="text-subtitle1 text-info">
           Click '+' to add an item.
         </div>
       </q-card-section>
     </q-card>
    <!-- <q-card class="my-card q-mt-md q-pa-xs" v-if="items.length > 0">
      <q-card-section>
        <div class="text-subtitle2 text-info">Note: Slide right the item to remove or decrease it.</div>
        <div class="text-subtitle1">Total Cost: <q-chip color="secondary" text-color="white">{{ getFormattedTotalCost }}</q-chip></div>
        <div class="text-subtitle1">Total Price: <q-chip color="secondary" text-color="white">{{ getFormattedTotalPrice }}</q-chip></div>
        <div class="text-subtitle1">Total Interest: <q-chip color="secondary" text-color="white">{{ getTotalInterest }}</q-chip></div>
      </q-card-section>

      <q-separator />

      <q-card-actions align="left">
        <q-btn flat @click="clear">Clear</q-btn>
        <q-btn flat @click="preview">Preview</q-btn>
      </q-card-actions>
    </q-card> -->
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="add" color="primary" @click="itemListDialog = true" />
    </q-page-sticky>
    <!-- <preview-quotation v-model="previewQuotationDialog" :data="getPreviewItems" /> -->
  </q-page>
</template>

<script>
import { PESO } from 'src/helpers/NumberFormat.js';
import _ from 'lodash';

export default {
  data () {
    return {
      itemListDialog: false,
      previewQuotationDialog: false,
      storeType: 'tarlac',
      items: [],
      totalNewPrice: 0,
      totalMainPrice: 0,
      totalBranchPrice: 0,
      totalMainCost: 0,
      totalBranchCost: 0,
      totalInterest: 0
    }
  },
   beforeDestroy () {
    clearTimeout(this.timer)
  },
  computed: {
    getPreviewItems () {
      const previewItems = [];
      _.forEach(this.items, item => {
        previewItems.push({
          itemName: item.details.itemName,
          category: item.details.category,
          description: item.details.description,
          quantity: item.quantity,
          price: this.getFormattedPrice(item),
          amount: this.getAmount(item)
        });
      });
      return {
        items: previewItems,
        totalPriceFormatted: this.getFormattedTotalPrice,
        totalPrice: this.getTotalPrice
      }
    },
    getFormattedTotalPrice () {
      return PESO(this.getTotalPrice).format();
    },
    getFormattedTotalCost () {
      return PESO(this.getTotalCost).format();
    },
    getTotalPrice () {
      switch(this.priceType) {
        case 'newPrice':
          return this.totalNewPrice;
        case 'mainPrice':
          return this.totalMainPrice;
        case 'branchPrice':
          return this.totalBranchPrice;
        default:
          return 0;
      }
    },
    getTotalCost () {
      switch(this.priceType) {
        case 'newPrice':
        case 'mainPrice':
          return this.totalMainCost;
        case 'branchPrice':
          return this.totalBranchCost;
        default:
          return 0;
      }
    },
    getTotalInterest () {
      return PESO(this.getTotalPrice - this.getTotalCost).format();
    }
  },
  methods: {
    finalize (reset) {
      this.timer = setTimeout(() => {
        reset()
      }, 300)
    },
    preview () {
      this.previewQuotationDialog = true;
    },
    minusTotal(item) {
      this.totalNewPrice -= item.newPricing.price;
      this.totalMainPrice -= item.oldPricing.main.price;
      this.totalBranchPrice -= item.oldPricing.branch.price;

      this.totalMainCost -= item.oldPricing.main.cost;
      this.totalBranchCost -= item.oldPricing.branch.cost;
    },
    addTotal(item) {
      this.totalNewPrice += item.newPricing.price;
      this.totalMainPrice += item.oldPricing.main.price;
      this.totalBranchPrice += item.oldPricing.branch.price;

      this.totalMainCost += item.oldPricing.main.cost;
      this.totalBranchCost += item.oldPricing.branch.cost;
    },
    removeItem ({ reset }, id) {
      if (this.items.length > 0) {
        const find = _.find(this.items, x => x.id === id);
        if (find !== undefined && find.quantity === 1) {
          const findIndex = _.findIndex(this.items, x => x.id === id);
          this.minusTotal(this.items[findIndex]);
          this.items.splice(findIndex, 1);
        } else {
          find.quantity--;
          this.minusTotal(find);
          this.$forceUpdate(); 
          this.finalize(reset);
        }
      }
    },
    clear () {
      this.items = [];
      this.totalNewPrice = 0;
      this.totalMainPrice = 0;
      this.totalBranchPrice = 0;
      this.totalMainCost = 0;
      this.totalBranchCost = 0;
      this.totalInterest = 0;
    },
    itemSelect(data) {
      if (this.items.length > 0) {
        const findIndex = _.findIndex(this.items, x => x.id === data.id);
        if (findIndex > -1) {
          this.items[findIndex].quantity++;
          // this.addTotal(this.items[findIndex]);
          return;
        }
      } 
      data.quantity = 1;
      // this.addTotal(data);
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
    getCost(item) {
      switch(this.priceType) {
        case 'newPrice':
        case 'mainPrice':
          return item.oldPricing.main.cost;
        case 'branchPrice':
          return item.oldPricing.branch.cost;
      }
    },
    getFormattedCost(item) {
      // return PESO(this.getCost(item) * item.quantity).format();
    },
    getFormattedInterest(item) {
      const cost = this.getCost(item) * item.quantity;
      const price = this.getPrice(item) * item.quantity;
      return PESO(price - cost).format();
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