<template>
  <q-page padding>
    <div class="row q-pa-md">
      <div class="col-2 q-pr-md">
        <q-btn @click="refreshSheet" color="secondary" rounded icon="refresh" class="full-width" label="Refresh" />
      </div>
      <div class="col-6">
        <div class="row">
          <div class="col-6">
            <q-input dense label="Search" clearable v-model="searchInput" @input="searchNormal" />
          </div>
          <div class="col-6 q-pl-md">
            <q-input dense label="Search serials here..." v-model="searchSerial" @input="inputTyping" />
          </div>
        </div>
      </div>
      <div class="row col-4 q-pl-md">
        <div class="col-6">
          <q-btn label="Search" @click="search" color="primary" class="full-width" icon="search" />
        </div>
        <div class="col-6 q-pl-md">
          <q-btn label="CLEAR" class="full-width" icon="backspace" @click="clear" />
        </div>
      </div>
    </div>
    <div class="e-resizable">
      <ejs-grid
        class="q-pt-md"
        ref="grid"
        :dataSource="datas"
        :allowTextWrap='true'
        :dataBound="databound"
        :allowPaging="true"
        :pageSettings='pageSettings'
        :searchSettings='searchOptions'
        :enableHover="false"
        :allowSelection="false"
        :allowFiltering='true' 
        :filterSettings='filterOptions'
        :allowGrouping='true'
        :groupSettings='groupOptions'
        :detailTemplate="serialsTemplate"
      >
        <e-columns>
          <e-column
            field='id'
            headerText='Id'
            isPrimaryKey='true'
            :visible='false'
          />
          <e-column
            field='reference'
            headerText='Reference #'
          />
          <e-column
            field='date'
            headerText='Date'
          />
          <e-column
            field='quantity'
            headerText='QTY'
          />
          <e-column
            field='category'
            headerText='Category'
          />
           <e-column
            field='description'
            headerText='Description'
          />
        </e-columns>
      </ejs-grid>
    </div>
  </q-page>
</template>


<script>
import _ from 'lodash';
import { Loading } from 'quasar';
import { Provide } from 'boot/syncfusion.js';
import getSpreadsheetData from 'boot/spreadsheet.js';
import SerialsTemplate from 'components/SerialsTemplate.vue'

export default {
  data () {
    return {
      datas: [],
      searchSerial: '',
      searchInput: '',
      searchOptions: {
        fields: ['reference','date','category','description']
      },
      groupOptions: { columns: ['reference'] },
      pageSettings: { pageSizes: true, pageSize: 15 },
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
      serialsTemplate: function () {
        return {
          template: SerialsTemplate
        }
      }
    }
  },
  provide: {
    grid: Provide.Grid
  },
  methods: {
    databound: function () { 
      this.$refs.grid.autoFitColumns(['date','category','description','quantity'])
    },
    async inputTyping () {
      if (this.searchSerial === undefined || this.searchSerial === '') {
        await this.refreshSheet();
      }
    },
    async refreshSheet () {
      Loading.show({
        message: 'Fetching data. Please wait...',
        boxClass: 'bg-grey-2 text-grey-9',
        spinnerColor: 'primary'
      });
      this.datas = await getSpreadsheetData();      
      Loading.hide();
    },
    searchNormal () {
      if(this.searchInput !== undefined || this.searchInput !== '') {
        if (this.datas.length > 0) {
          this.$refs.grid.search(this.searchInput);
        }
      }
    },
    search () {
      if (this.datas.length < 1) {
        this.$q.notify({
          type: 'warning',
          message: 'Please click the refresh button.'
        });
        return;
      }

      if (this.searchSerial === '' || this.searchSerial === undefined) {
        this.$q.notify({
          type: 'warning',
          message: 'Please fill the search input.'
        });
        return;
      }

      var datas = _.map(this.datas, d => {
        for (let i = 0; i < d.serials.length; i++) {
          const comp1 = d.serials[i].toLowerCase();
          const comp2 = this.searchSerial.toLowerCase();
          if (_.includes(comp1, comp2)) return d;
        }
      });
      datas = _.without(datas, undefined)
      this.datas = datas;
    },
    async clear() {
      this.searchSerial = '';
      await this.refreshSheet();
    }
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