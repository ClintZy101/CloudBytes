<template>
  <pattern-lock v-model="patternLock" @finish="finish" />
</template>

<script>
import _ from 'lodash';

export default {
  data () {
    return {
      patternLock: true
    }
  },
  methods: {
    finish: function(data) {
      if (data.length !== 9) {
        localStorage.setItem('pattern-lock', null);
        return;
      }

      let valid = false;
      _.forEach(data, (item,i) => {
        if (item === i) valid = true;
        else {
          valid = false;
          return;
        }
      });
      if (valid) localStorage.setItem('pattern-lock', data);
      else localStorage.setItem('pattern-lock', null);

      this.$router.replace('/')
    }
  }
}
</script>