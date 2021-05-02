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
  DetailRow,
  Group,
  Edit
} from "@syncfusion/ej2-vue-grids";

Vue.use(GridPlugin);

export const Provide = {
  Grid: [DetailRow, Page, Search, Filter, Resize, ColumnMenu, Toolbar, Group]
};
