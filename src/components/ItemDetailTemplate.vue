<template>
 <div class="row">
    <div class="col-2">
      <div class="row">
        <!-- <div class="col-4">
          <q-chip color="primary" icon="insights" text-color="white">
            Main Store
          </q-chip>
        </div> -->
        <div class="col q-ml-sm">
            <q-tree
              :nodes="mainStore"
              node-key="label"
              no-connectors
              :expanded.sync="expanded"
            />
        </div>
      </div>
    </div>
    <div class="col-2">
      <div class="row">
        <!-- <div class="col-4">
          <q-chip color="primary" icon="insights" text-color="white">
            New Price
          </q-chip>
        </div> -->
        <div class="col q-ml-sm">
            <q-tree
              :nodes="branchStore"
              node-key="label"
              no-connectors
              :expanded.sync="expanded"
            />
        </div>
      </div>
    </div>
     <div class="col-2">
      <div class="row">
        <!-- <div class="col-4">
          <q-chip color="primary" icon="insights" text-color="white">
            New Price
          </q-chip>
        </div> -->
        <div class="col q-ml-sm">
            <q-tree
              :nodes="difference"
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
      expanded: ['Main Store', 'Branch Store', 'Difference' ]
    }
  },
  methods: {
    round(num) {
      var m = Number((Math.abs(num) * 100).toPrecision(15));
      return (Math.round(m) / 100) * Math.sign(num);
    }
  },
  computed: {
    mainStore () {
      return [
        {
          label: 'Main Store',
          icon: 'business',
          children: [
            { label: 'Cost: ' + PESO(this.data.pricing.main_cost).format() },
            { label: 'Markup: ' + (this.data.pricing.main_markup * 100) + '%' },
            { label: 'Interest: ' + PESO(this.data.pricing.main_interest).format() }
          ]
        }
        //     {
        //       label: 'Branch Store',
        //       icon: 'store',
        //       children: [
        //         { label: 'Cost Markup: ' + (this.data.oldPricing.branch.costMarkup * 100) + '%' },
        //         { label: 'Cost: ' + PESO(this.data.oldPricing.branch.cost).format() },
        //         { label: 'Markup: ' + (this.data.oldPricing.branch.markup * 100) + '%' },
        //         { label: 'Price: ' + PESO(this.data.oldPricing.branch.price).format() },
        //         { label: 'Interest: ' + PESO(this.data.oldPricing.branch.interest).format() },
        //       ]
        //     },
        //   ]
        // }
      ]
    },

    branchStore () {
      return [
        {
          label: 'Branch Store',
          icon: 'store',
          children: [
            { label: 'Cost: ' + PESO(this.data.pricing.branch_cost).format() },
            { label: 'Markup: ' + (this.data.pricing.branch_markup * 100) + '%' },
            { label: 'Interest: ' + PESO(this.data.pricing.branch_interest).format() }
          ]
        }
        //     {
        //       label: 'Branch Store',
        //       icon: 'store',
        //       children: [
        //         { label: 'Cost Markup: ' + (this.data.oldPricing.branch.costMarkup * 100) + '%' },
        //         { label: 'Cost: ' + PESO(this.data.oldPricing.branch.cost).format() },
        //         { label: 'Markup: ' + (this.data.oldPricing.branch.markup * 100) + '%' },
        //         { label: 'Price: ' + PESO(this.data.oldPricing.branch.price).format() },
        //         { label: 'Interest: ' + PESO(this.data.oldPricing.branch.interest).format() },
        //       ]
        //     },
        //   ]
        // }
      ]
    },
    difference () {
      return [
        {
          label: 'Difference',
          icon: 'insights',
          children: [
            { label: 'Cost: ' + PESO(this.data.difference.cost).format() },
            { label: 'Markup: ' +  ((this.data.pricing.main_markup * 100) - (this.data.pricing.branch_markup * 100)) + '%' },
            { label: 'Interest: ' +  PESO(this.data.difference.interest).format() }
          ]
        }
        //     {
        //       label: 'Branch Store',
        //       icon: 'store',
        //       children: [
        //         { label: 'Cost Markup: ' + (this.data.oldPricing.branch.costMarkup * 100) + '%' },
        //         { label: 'Cost: ' + PESO(this.data.oldPricing.branch.cost).format() },
        //         { label: 'Markup: ' + (this.data.oldPricing.branch.markup * 100) + '%' },
        //         { label: 'Price: ' + PESO(this.data.oldPricing.branch.price).format() },
        //         { label: 'Interest: ' + PESO(this.data.oldPricing.branch.interest).format() },
        //       ]
        //     },
        //   ]
        // }
      ]
    },
    // newPrice () {
    //   return [
    //     {
    //       label: 'Pricing',
    //       icon: 'insights',
    //       children: [
    //         {
    //           label: 'Price Level',
    //           children: [
    //             { label: 'Range: ' + PESO(this.data.newPricing.min).format() + ' - ' + PESO(this.data.newPricing.max).format() },
    //             { label: 'Markup: ' + (this.data.newPricing.markup * 100) + '%' },
    //             { label: 'New Price: ' + PESO(this.data.newPricing.price).format() },
    //           ]
    //         },
    //         {
    //           label: 'Main Store',
    //           icon: 'business',
    //           children: [
    //             { label: 'Interest: ' + PESO(this.data.newPricing.main.interest).format() },
    //             { label: 'Difference: ' + PESO(this.data.newPricing.main.difference).format() },
    //           ]
    //         },
    //         {
    //           label: 'Branch Store',
    //           icon: 'store',
    //           children: [
    //             { label: 'Interest: ' + PESO(this.data.newPricing.branch.interest).format() },
    //             { label: 'Difference: ' + PESO(this.data.newPricing.branch.difference).format() },
    //           ]
    //         },
    //       ]
    //     }
    //   ]
    // }
  }
}
</script>