<template>
  <div class="container">
    <h2>Checkout</h2>
    <div class="row">
      <div class="col-4">
        <div class="text-left">
          <h3> <router-link to="/ex6">Back</router-link></h3>

        </div>
      </div>
    </div>
    <br />
   <table class="table">
      <thead class="thead-dark">
        <tr>
          <th>No</th>
          <th>Item</th>
          <th>Price</th>
          <th>Qty</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, index) in productShow" :key="index">
          <td>{{ index + 1 }}</td>
          <td>
            <img class="card-img-top" :src="product.imgUrl" />
            {{ product.name }}
          </td>
          <td>{{ product.price| currency }}</td>
          <td>{{ product.qty }}</td>
          <td>{{ product.price  * product.qty  | currency }}</td>
        </tr>
      </tbody>
    </table>
    <div class="text-right">Total: {{ totalPrice()| currency }}</div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      productShow: []
    }
  },
  methods: {
    dataShow () {
      const url =
        'https://beneat-62203-default-rtdb.firebaseio.com/checkout.json'
      axios
        .get(url, this.productShow)
        .then((response) => {
          this.productShow = response.data
          console.log('response ', response)
        })
        .catch((error) => {
          console.log('error', error)
        })
    },
    totalPrice () {
      let total = 0

      for (let i = 0; i < this.productShow.length; i++) {
        total += this.productShow[i].price * this.productShow[i].qty
      }
      return total
    }
  },
  created () {
    this.dataShow()
  },
  updated () {
    this.dataShow()
  }

}
</script>
<style lang="scss" scoped>
img {
  width: 7.5%;
}
</style>
