<template>
  <q-page padding>
    <q-toolbar class="bg-grey-3 text-primary rounded-borders">
      <q-toolbar-title>
        Make a Quotation
      </q-toolbar-title>
    </q-toolbar>
    <q-btn class="q-mt-md" color="primary" icon="view_list" label="Browse Items" rounded glossy @click="itemListDialog = true" />
    <item-list-popup v-model="itemListDialog" />
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      itemListDialog: false
    }
  }
}
</script>