<template>
  <q-page padding>
    <q-toolbar class="bg-grey-3 text-primary rounded-borders">
      <q-toolbar-title>
        Make a Quotation
      </q-toolbar-title>
    </q-toolbar>
    <item-list-popup v-model="itemListDialog" :store-type="storeType" @item-select="itemSelect" />
      <div class="q-gutter-sm q-mt-sm">
        <q-radio v-model="storeChange" val="Tarlac" label="Tarlac" @input="storeTypeChange" />
        <q-radio v-model="storeChange" val="Rosales" label="Rosales" @input="storeTypeChange" />
        <q-radio v-model="storeChange" val="Talavera" label="Talavera" @input="storeTypeChange" />
      </div>
       <q-banner class="bg-green-2 text-black">
        <div class="text-weight-bold q-mb-sm">TIP</div>
        Choosing the right store will provide the correct information about the stocks of an item.
      </q-banner>
     <q-list bordered separator class="q-mt-md" v-for="item in items" :key="item.id">
      <q-slide-item :id="item.id" @left="opt => removeItem(opt, item.id)" left-color="red" ref="slide">
        <template v-slot:left>
          <q-icon name="done" /> Removed
        </template>
        <q-item>
          <q-item-section>
            <q-item-label lines="1">{{ item.details.item_name }}</q-item-label>
            <q-item-label caption>{{ item.details.category }} <span class="text-negative text-caption"> &nbsp;{{ getStatus(item) }}</span></q-item-label>
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
    <q-card class="my-card q-mt-md q-pa-xs" v-if="items.length > 0">
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
    </q-card>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="add" color="primary" @click="itemListDialog = true" :storeType="storeType" />
    </q-page-sticky>
    <preview-quotation v-model="previewQuotationDialog" :data="getPreviewItems" />
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
      storeChange: 'Tarlac',
      storeType: 'Tarlac',
      items: [],
      totalCost: 0,
      totalPrice: 0,
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
          item_name: item.details.item_name,
          category: item.details.category,
          description: item.details.description,
          quantity: item.quantity,
          price: this.getFormattedPrice(item),
          amount: this.getAmount(item)
        });
      });
      return {
        items: previewItems,
        totalPrice: this.totalPrice,
        formattedTotalPrice: this.getFormattedTotalPrice
      }
    },
    getFormattedTotalPrice () {
      return PESO(this.totalPrice).format();
    },
    getFormattedTotalCost () {
      return PESO(this.totalCost).format();
    },
    getTotalInterest () {
      return PESO(this.totalPrice - this.totalCost).format();
    }
  },
  methods: {
    storeTypeChange (value, evt) {
      if (this.items.length > 0) {
        this.$q.dialog({
          title: 'Confirm',
          message: 'If you change the Store type, it will automatically clear the items. Would you like to continue?',
          cancel: true,
          persistent: true,
          cancel: 'No',
          ok: 'Yes'
        }).onOk(() => {
          this.items = [];
          this.storeType = value;
        }).onCancel(() => {
          this.storeChange = this.storeType;
        });
      } else {
        this.storeType = value;
      }
    },
    finalize (reset) {
      this.timer = setTimeout(() => {
        reset()
      }, 300)
    },
    preview () {
      this.previewQuotationDialog = true;
    },
    minusTotal(item) {
      this.totalCost -= item.cost;
      this.totalPrice -= item.price;
    },
    addTotal(item) {
      this.totalCost += item.cost;
      this.totalPrice += item.price;
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
      this.totalCost = 0;
      this.totalPrice = 0;
    },
    itemSelect(data) {
      if (this.items.length > 0) {
        const findIndex = _.findIndex(this.items, x => x.id === data.id);
        if (findIndex > -1) {
          this.items[findIndex].quantity++;
          this.addTotal(this.items[findIndex]);
          return;
        }
      } 
      data.quantity = 1;
      this.addTotal(data);
      this.items.push(data);
    },
    getFormattedCost(item) {
      return PESO(item.cost * item.quantity).format();
    },
    getFormattedInterest(item) {
      const cost = item.cost * item.quantity;
      const price = item.price * item.quantity;
      return PESO(price - cost).format();
    },
    getFormattedPrice(item) {
      return PESO(item.price).format();
    },
    getAmount(item) {
      return PESO(item.price * item.quantity).format();
    },
    getStatus(item) {
      if (item.available_items > 0 && item.available_items < item.quantity)
        return `(only ${item.available_items} available)`;
      else if (item.available_items <= 0)
        return '(out of stock)';
    }
  },
}
</script>