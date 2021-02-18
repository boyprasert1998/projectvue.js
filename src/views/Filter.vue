<template>
  <div class="container">
    <h2>TEST</h2>
    <div>{{ name | capitalize }}</div>
    <div>{{ price | currency }}</div>
    <div>Date: {{dateTime|prettyDate}}</div>
    <span v-html="$options.filters.productStatus(status)"></span>
  </div>
</template>
<script>
export default {
  data () {
    return {
      name: 'boy',
      price: 2000,
      dateTime: '2020-12-11 10:29:39',
      status: 'cancel'
    }
  }
}
</script>
