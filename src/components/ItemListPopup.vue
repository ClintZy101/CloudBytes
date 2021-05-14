<template>
  <q-dialog
    v-model="dialog"
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card>
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">List of items</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
        <q-card-section>
          <item-list-component :enableSelection="true" @item-select="itemSelect" />
        </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: 'item-list-popup',
  props: ['value','storeType'],
  computed: {
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
    itemSelect: function(data) {
      this.$emit('item-select', data);
      this.dialog = false;
    }
  }
}
</script>