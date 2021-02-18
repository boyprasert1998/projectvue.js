<template>
  <div class="container">
    <router-link to="/">Home</router-link>
    <br />
    <button class="btn btn-primary" @click="gotoHome()">Home</button>
    <h1>Product (components & array data)</h1>
    <div class="row">
      <product v-for="(item, index) in items" :key="index" :id="index" :names="item" @onDelete="removeItem"></product>
    </div>
    <br />
    <button class="btn btn-primary" @click="addItem">Add</button>
    <br />
    {{ items }}
  </div>
</template>

<script>
import Product from '../components/movie/Product'

export default {
  components: { Product },
  data () {
    return {
      items: []
    }
    // adata [
    //   {
    //     name: 'boy',
    //     price: 10
    //   },
    //   {
    //     name: 'kat',
    //     price: 11
    //   },
    //   {
    //     name: 'fin',
    //     price: 12
    //   },
    //   {
    //     name: 'cat',
    //     price: 13
    //   }
    // ]
    // const copy = Object.assign({}, this.book)
  },
  methods: {
    addItem () {
      const copy = {
        name: null
      }
      this.items.push(copy)
    },
    removeItem (index) {
      this.items.splice(index, 1)
    },
    gotoHome () {
      this.$router.push('/')
    }
  }
}
</script>
