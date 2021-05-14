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
              <td class="text-center">{{ convertToPeso(price.min) }}</td>
              <td class="text-center">{{ convertToPeso(price.max) }}</td>
              <td class="text-center">{{ convertToPercentage(price.markup) }}</td>
            </tr>
          </tbody>
        </q-markup-table>
      </q-scroll-area>
      <q-banner class="bg-green-2 text-black q-mt-md q-mb-sm">
        <div class="text-weight-bold q-mb-sm text-secondary">INFO</div>
          Items and pricing have been updated since May 14, 2021. <br />
          If there is a new update of items and pricing. Contact the developer and send a backup of quickbooks.
      </q-banner>
      <item-list-component />
    </div>
  </q-page>
</template>

<script>
import priceLevel from 'src/helpers/PriceLevel.js';
import { PESO } from 'src/helpers/NumberFormat.js';

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
    }
  },
  methods: {
    convertToPeso (num) {
      return PESO(num).format();
    },
    convertToPercentage(num) {
      return Math.round(num * 100) + "%"
    },
  }
}
</script>