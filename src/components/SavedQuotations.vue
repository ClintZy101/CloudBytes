<template>
   <q-dialog
    v-model="dialog"
    maximized
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card>
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">Saved Quotations</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
       <q-banner class="bg-grey-3 text-black q-mt-sm">
        <b>Note:</b>
          <ul class="text-secondary">
            <li>Slide <b>right</b> the item to remove the quote.</li>
            <li>Slide <b>left</b> the item to show the saved quotation.</li>
          </ul>
      </q-banner>
      <q-card-section>
        <q-list bordered separator class="q-mt-xs" v-for="quote in quotes" :key="quote.id">
          <q-slide-item :id="quote.id" ref="slide"
            @left="opt => removeItem(opt, quote.id)" left-color="red"
            @right="opt => showQuote(opt, quote)" right-color="green"
          >
            <template v-slot:left>
              <q-icon name="done" /> Removed
            </template>
            <template v-slot:right>
              <q-icon name="view_list" /> Show Quotation
            </template>
            <q-item>
              <q-item-section>
                <q-item-label lines="1">{{ quote.quote_name }}</q-item-label>
                <q-item-label caption>{{ formatDate(quote.date) }}</q-item-label>
                <q-item-label caption>Cost: {{ formatCurrency(quote.total_cost) }} | Interest: {{ getTotalInterest(quote) }}</q-item-label>
              </q-item-section>

              <q-item-section side top>
                <div class="text-subtitle2 text-primary">{{ quote.store_type }}</div>
                <div class="text-center">No. of items: <b class="text-green">{{ getNoOfItems(quote.items) }}</b></div>
                <q-chip color="secondary" text-color="white">
                  {{ formatCurrency(quote.total_price) }}
                </q-chip>
              </q-item-section>
            </q-item>
          </q-slide-item>
        </q-list>
        <q-card flat bordered class="q-mt-md" v-if="quotes.length === 0">
          <q-card-section>
            <div class="text-subtitle1 text-info">
              There is no saved quotations. 
            </div>
          </q-card-section>
        </q-card>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import _ from 'lodash';
import { mapState } from 'vuex';
import dateFormat from "dateformat";
import { PESO } from 'src/helpers/NumberFormat.js';

export default {
  name: 'saved-quotations',
  props: ['value'],
  computed: {
    ...mapState(['quotes']),
    dialog: {
      get () {
        return this.value;
      },
      set (val) {
        this.$emit('input', val);
      }
    }
  },
  methods: {
    removeItem ({ reset }, id) {
      this.$store.dispatch('removeQuote', id);
    },
    showQuote ({ reset }, quote) {
      this.$emit('show-quote', quote);
      reset();
    },
    formatDate (date) {
      return dateFormat(date, "dddd, mmm dd, yyyy, h:MM:ss TT");
    },
    getNoOfItems (items) {
      let totalItems = 0;
      for (let i = 0; i < items.length; i++) {
        totalItems += items[i].quantity;
      }
      return totalItems;
    },
    formatCurrency (val) {
      return PESO(val).format();
    },
    getTotalInterest (quote) {
      return PESO(quote.total_price - quote.total_cost).format();
    }
  },
  watch: {
    dialog (val) {
      if (val) {
        this.$store.dispatch('fetchQuotes');
      }
    }
  }
}
</script>