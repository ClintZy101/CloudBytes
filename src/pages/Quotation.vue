<template>
  <q-page padding>
    <!-- <q-toolbar class="bg-grey-3 text-primary rounded-borders">
      <q-toolbar-title>
        Make a Quotation
      </q-toolbar-title>
    </q-toolbar> -->
    <item-list-popup v-model="itemListDialog" :store-type="storeType" @item-select="itemSelect" />
      <div class="q-gutter-sm">
        <q-radio v-model="storeChange" val="Tarlac" label="Tarlac" @input="storeTypeChange" />
        <q-radio v-model="storeChange" val="Rosales" label="Rosales" @input="storeTypeChange" />
        <q-radio v-model="storeChange" val="Talavera" label="Talavera" @input="storeTypeChange" />
      </div>
       <q-banner class="bg-green-2 text-black" v-if="getTips !== null">
        <div class="text-weight-bold q-mb-sm">TIP</div>
          {{ getTips.store }} Store Price List have been updated since <b>{{ getTips.updated }}</b>
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
          <q-item-section side>
              <div class="column">
                <div class="col">
                  <q-btn @click="increaseQuantity(item.id)" size="sm" icon="arrow_drop_up" />
                </div>
                <div class="col">
                  <q-btn @click="decreaseQuantity(item.id)" size="sm" icon="arrow_drop_down" />
                </div>
              </div>
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
        <div class="text-subtitle2 text-info">Note: Slide right the item to remove or decrease the quantity.</div>
        <div class="text-subtitle1">Total Cost: <q-chip color="secondary" text-color="white">{{ getFormattedTotalCost }}</q-chip></div>
        <div class="text-subtitle1">Total Price: <q-chip color="secondary" text-color="white">{{ getFormattedTotalPrice }}</q-chip></div>
        <div class="text-subtitle1">Total Interest: <q-chip color="secondary" text-color="white">{{ getTotalInterest }}</q-chip></div>
      </q-card-section>
      <q-separator />
      <q-card-actions align="left">
        <q-btn color="primary" style="width: 100px" @click="saveQuotation">Save</q-btn>
        <q-btn flat @click="preview">Preview</q-btn>
        <q-btn flat @click="clear">Clear</q-btn>
      </q-card-actions>
    </q-card>
    <q-page-sticky position="bottom-right" :offset="fabPos">
     <q-fab color="primary" persistent v-model="fab" icon="keyboard_arrow_up" direction="up" v-touch-pan.prevent.mouse="moveFab">
       <q-fab-action color="secondary" @click="savedQuotationsDialog = true" icon="library_books" external-label label-class="bg-grey-3 text-grey-8" label-position="left" label="Quotations" />
       <q-fab-action color="secondary" @click="itemListDialog = true" icon="add" external-label label-class="bg-grey-3 text-grey-8" label-position="left" label="Add Item/s" />
      </q-fab>
    </q-page-sticky>
    <preview-quotation v-model="previewQuotationDialog" :data="getPreviewItems" />
    <saved-quotations v-model="savedQuotationsDialog" @show-quote="showQuote" />
  </q-page>
</template>

<script>
import { PESO } from 'src/helpers/NumberFormat.js';
import _ from 'lodash';
import { v4 as uuidv4 } from "uuid";

export default {
  data () {
    return {
      fab: true,
      fabPos: [ 18, 18 ],
      draggingFab: false,
      itemListDialog: false,
      previewQuotationDialog: false,
      savedQuotationsDialog: false,
      storeChange: 'Tarlac',
      storeType: 'Tarlac',
      items: [],
      totalCost: 0,
      totalPrice: 0
    }
  },
  async mounted () {
    const quote = await this.$store.dispatch('fetchQuote');
    if (quote) {
      this.storeType = quote.storeType;
      this.storeChange = quote.storeType;
      this.items = quote.items;
      this.totalCost = quote.totalCost;
      this.totalPrice = quote.totalPrice;
    }
  },
  watch: {
    itemListDialog (val) {
      if (val === false) {
        this.fab = true;
      }
    },
    savedQuotationsDialog (val) {
      if (val === false) {
        this.fab = true;
      }
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
    },
    getTips () {
      switch (this.storeChange) {
        case "Tarlac": 
          return {
            store: 'Tarlac',
            updated: 'July 1, 2021'
          }
        case "Rosales":
          return {
            store: 'Rosales',
            updated: 'July 1, 2021'
          }
        case "Talavera":
          return {
            store: 'Talavera',
            updated: 'July 1, 2021'
          }
        default:
          return null;
      }
    }
  },
  methods: {
    showQuote (quote) {
      const copy = JSON.parse(JSON.stringify(quote));
      this.storeChange = copy.store_type;
      this.storeType = copy.store_type;
      this.totalCost = copy.total_cost;
      this.totalPrice = copy.total_price;
      this.items = copy.items;
      this.saveQuote();
      this.savedQuotationsDialog = false;
    },
    saveQuotation () {
      this.$q.dialog({
        title: 'Save Quotation',
        message: 'Customer Name / Remarks <br /><span class="text-info">(minimum of 5 characters)</span><br /><br /> <span class="text-caption text-grey-6">Eg. Izuku Midoriya, Ryzen 5 3400G Package, White Build</span>',
        html: true,
        prompt: {
          model: '',
          isValid: val => val.length >= 5, // << here is the magic
          type: 'text' // optional
        },
        cancel: true,
        persistent: true
      }).onOk(data => {
        const quote = {
          id: uuidv4(),
          quote_name: data,
          date: new Date(),
          items: this.items,
          store_type: this.storeType,
          total_cost: this.totalCost,
          total_price: this.totalPrice
        }
        this.$store.dispatch('addQuote', quote);
        this.$q.notify({
          type: 'positive',
          message: `Quote '${data}' has been saved.`
        });
      })
    },
    moveFab (ev) {
      this.draggingFab = ev.isFirst !== true && ev.isFinal !== true

      this.fabPos = [
        this.fabPos[0] - ev.delta.x,
        this.fabPos[1] - ev.delta.y
      ]
    },
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
          this.storeType = value;
          this.clear();
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
    increaseQuantity (id) {
      if (this.items.length > 0) {
        const find = _.find(this.items, x => x.id === id);
        if (find !== undefined && find.quantity >= 1 ) {
           const findIndex = _.findIndex(this.items, x => x.id === id);
          if (findIndex > -1) {
            this.items[findIndex].quantity++;
            this.addTotal(this.items[findIndex]);
            this.saveQuote();
          }
        }
      }
    },
    decreaseQuantity (id) {
      if (this.items.length > 0) {
        const find = _.find(this.items, x => x.id === id);
        if (find !== undefined && find.quantity === 1) {
          this.$q.notify({
            type: 'primary',
            message: 'You can remove the item instead of decreasing the quantity.'
          });
        } else {
          find.quantity--;
          this.minusTotal(find);
          this.$forceUpdate(); 
          // this.finalize(reset);
        }
        this.saveQuote();
      }
    },
    itemSelect(data) {
      if (this.items.length > 0) {
        const findIndex = _.findIndex(this.items, x => x.details.item_name === data.details.item_name);
        if (findIndex > -1) {
          this.items[findIndex].quantity++;
          this.addTotal(this.items[findIndex]);
          this.saveQuote();
          return;
        }
      } 
      data.quantity = 1;
      this.addTotal(data);
      this.items.push(data);
      this.saveQuote();
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
        this.saveQuote();
      }
    },
    clear () {
      this.items = [];
      this.totalCost = 0;
      this.totalPrice = 0;
      this.$store.dispatch('clearQuote');
    },
    saveQuote() {
      const data = {
        items: this.items,
        storeType: this.storeType,
        totalCost: this.totalCost,
        totalPrice: this.totalPrice
      };
      this.$store.dispatch('saveQuote', data);
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