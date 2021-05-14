<template>
  
</template>

<script>


export default {
  name: 'pricing-report-items',
  provide: {
    grid: Provide.Grid
  },
  data () {
    return {
      items,
      searchQuery: '',
      priceLevel,
      filterOptions: {
        type: 'Menu',
        operators: {
          stringOperator: [
            { value: 'contains', text: 'Contains' },
            { value: 'startsWith', text: 'Starts With' },
            { value: 'endsWith', text: 'Ends With' },
          ],
        }
      },
      searchOptions: {
        fields: ['details.category', 'details.itemName', 'details.description']
      },
      pageSettings: { pageSizes: true, pageSize: 15 },
      detailsTemplate: function () {
        return {
          template: ItemDetailTemplate
        }
      }
    }
  },
  methods: {
    rowSelected: function(args) {
      if (args.data !== undefined) this.$emit('item-select', args.data);
    },
    clearSearch () {
      this.searchQuery = ''
      this.$refs.grid.search(this.searchQuery);
    },
    dataBound: function () {
      this.$refs.grid.autoFitColumns(['details.category', 'details.itemName', 'details.description', 'pricing.price','available_quantity']);
    },
    VAOldMainPrice (field, data, column) {
      return PESO(data.pricing.price).format();
    },
  }
}
</script>

<style>
.e-resizable {
  resize: both;
  overflow: auto;
  padding: 10px;
  height: 550;
  width: 100%;
  min-height: 550px;
  min-width: 300px;
}
</style>