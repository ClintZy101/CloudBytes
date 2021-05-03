<template>
  <q-dialog
    v-model="dialog"
    maximized
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card>
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">Preview Quotation</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
        <div class="q-gutter-sm q-pa-xs">
        <q-radio v-model="detailsType" val="summary" label="Summary" />
        <q-radio v-model="detailsType" val="detailed" label="Detailed" />
      </div>
      </q-card-section>
      <q-card-section>
        <q-list bordered>
          <q-item v-for="item in data.items" :key="item.id">
            <q-item-section>
              <q-item-label :lines="getLines">{{ getDetails(item) }}</q-item-label>
              <q-item-label caption>{{ item.category }}</q-item-label>
            </q-item-section>
            <q-item-section side top>
              {{ item.quantity }} x {{ item.price }}
              <q-chip color="secondary" text-color="white">
                {{ item.amount }}
              </q-chip>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <div class="row q-col-gutter-x-md">
          <div class="col-5">
            <q-input v-model.number="discount" type="number" standout="bg-teal text-white" label="Discount" dense>
              <template v-slot:append>
                <q-icon name="local_offer" />
              </template>
            </q-input>
          </div>
          <div class="col-7">
            <div class="text-subtitle1">Subtotal: <q-chip color="primary" text-color="white">{{ data.totalPriceFormatted }}</q-chip></div>
            <div class="text-subtitle1">Total: <q-chip color="primary" text-color="white">{{ getTotal }}</q-chip></div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { PESO } from 'src/helpers/NumberFormat.js';

export default {
  name: 'preview-quotation',
  props: ['value','data'],
  computed: {
    dialog: {
      get () {
        return this.value;
      },
      set (val) {
        this.$emit('input', val);
      }
    },
    getLines () {
      if (this.detailsType === 'summary') return 1;
      else return 3;
    },
    getTotal () {
      if (this.discount === null || this.discount === '' || this.discount === 0)
      return this.data.totalPriceFormatted;
      else {
        return PESO(this.data.totalPrice - this.discount).format();
      }
    }
  },
  methods: {
    getDetails(item) {
      if (this.detailsType === 'summary')
        return item.itemName;
      else return item.description;
    }
  },
  data () {
    return {
      detailsType: 'summary',
      discount: 0
    }
  }
}
</script>