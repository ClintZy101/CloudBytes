<template>
  <div class="row">
    <div class="col">
      <q-chip v-for="(serial, i) in getSerials" :key="i" color="primary" text-color="white">
        {{ serial }}
      </q-chip>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return { 
      data: {}
    }
  },
  computed: {
    getSerials () {
      return this.data.serials;
    }
  }
}
</script>