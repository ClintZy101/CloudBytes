<template>
 <div class="row">
    <div class="col-2">
      <div class="row">
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
      ]
    },
  }
}
</script>