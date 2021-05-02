<template>
 <div class="row">
      <div class="col">
        <div class="row">
          <div class="col-4">
            <q-chip color="grey" icon="show_chart" text-color="white">
              Old Price
            </q-chip>
          </div>
          <div class="col q-ml-sm">
             <q-tree
                :nodes="oldPrice"
                node-key="label"
                no-connectors
                :expanded.sync="expanded"
              />
          </div>
        </div>
      </div>
      <div class="col">
        <div class="row">
          <div class="col-4">
            <q-chip color="primary" icon="insights" text-color="white">
              New Price
            </q-chip>
          </div>
          <div class="col q-ml-sm">
            <q-tree
                :nodes="newPrice"
                node-key="label"
                no-connectors
                :expanded.sync="expanded"
              />
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { PESO } from 'src/helpers/NumberFormat.js';

export default {
  data () {
    return { 
      data: {},
      expanded: [ 'Pricing', 'Main Store', 'Branch Store', 'Price Level' ]
    }
  },
  computed: {
    oldPrice () {
      return [
        {
          label: 'Pricing',
          icon: 'show_chart',
          children: [
            {
              label: 'Main Store',
              icon: 'business',
              children: [
                { label: 'Cost: ' + PESO(this.data.oldPricing.main.cost).format() },
                { label: 'Markup: ' + (this.data.oldPricing.main.markup * 100) + '%' },
                { label: 'Price: ' + PESO(this.data.oldPricing.main.price).format() },
                { label: 'Interest: ' + PESO(this.data.oldPricing.main.interest).format() },
              ]
            },
            {
              label: 'Branch Store',
              icon: 'store',
              children: [
                { label: 'Cost Markup: ' + (this.data.oldPricing.branch.costMarkup * 100) + '%' },
                { label: 'Cost: ' + PESO(this.data.oldPricing.branch.cost).format() },
                { label: 'Markup: ' + (this.data.oldPricing.branch.markup * 100) + '%' },
                { label: 'Price: ' + PESO(this.data.oldPricing.branch.price).format() },
                { label: 'Interest: ' + PESO(this.data.oldPricing.branch.interest).format() },
              ]
            },
          ]
        }
      ]
    },
    newPrice () {
      return [
        {
          label: 'Pricing',
          icon: 'insights',
          children: [
            {
              label: 'Price Level',
              children: [
                { label: 'Range: ' + PESO(this.data.newPricing.min).format() + ' - ' + PESO(this.data.newPricing.max).format() },
                { label: 'Markup: ' + (this.data.newPricing.markup * 100) + '%' },
                { label: 'New Price: ' + PESO(this.data.newPricing.price).format() },
              ]
            },
            {
              label: 'Main Store',
              icon: 'business',
              children: [
                { label: 'Interest: ' + PESO(this.data.newPricing.main.interest).format() },
                { label: 'Difference: ' + PESO(this.data.newPricing.main.difference).format() },
              ]
            },
            {
              label: 'Branch Store',
              icon: 'store',
              children: [
                { label: 'Interest: ' + PESO(this.data.newPricing.branch.interest).format() },
                { label: 'Difference: ' + PESO(this.data.newPricing.branch.difference).format() },
              ]
            },
          ]
        }
      ]
    }
  }
}
</script>