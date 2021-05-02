import Vue from "vue";

import {
  GridPlugin,
  Page,
  Search,
  Filter,
  Resize,
  Sort,
  ColumnChooser,
  Toolbar,
  ColumnMenu,
  Freeze,
  ExcelExport,
  DetailRow
} from "@syncfusion/ej2-vue-grids";

Vue.use(GridPlugin);

export const Provide = {
  Grid: [
    DetailRow,
    Page,
    Search,
    Filter,
    Resize,
    Sort,
    ColumnChooser,
    Toolbar,
    ExcelExport,
    ColumnMenu,
    Freeze
  ]
};
