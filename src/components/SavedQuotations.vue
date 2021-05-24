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
      <q-card-section>
       <q-banner class="bg-green-2 text-black">
        <div class="text-weight-bold q-mb-sm">On Working...</div>
        This section is under development. <br />
        But the quote is automatically saved to your device. <br />
        Try to make a quote and then refresh the page or close the app and then come back again,
        you will see your quotation again. 
      </q-banner>
      </q-card-section>
      <q-card-actions>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import _ from 'lodash';

export default {
  name: 'saved-quotations',
  props: ['value'],
  computed: {
    dialog: {
      get () {
        return this.value;
      },
      set (val) {
        this.$emit('input', val);
      }
    }
  }
}
</script>