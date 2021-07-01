<template>
  <q-page padding>
    <q-btn @click="refreshSheet" label="Refresh" />
    {{ getDatas }}
  </q-page>
</template>


<script>
import _ from 'lodash';
import {
  Loading,
  QSpinnerGears
} from 'quasar';
import getSpreadsheetData from 'boot/spreadsheet.js';


export default {
  data () {
    return {
      datas: []
    }
  },
  computed: {
    getDatas(){
      return this.datas;
    }
  },
  methods: {
    async refreshSheet () {
      Loading.show({
        message: 'Fetching data. Please wait...',
        boxClass: 'bg-grey-2 text-grey-9',
        spinnerColor: 'primary'
      });
      this.datas = await getSpreadsheetData();      
      Loading.hide();
    }
  }
}
</script>