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