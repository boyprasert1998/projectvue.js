<template>
  <div class="container">
    <h2>Products</h2>
    <div class="row">
      <div class="col-8">
        <div class="row">
          <div class="col-4 m-3" v-for="(product, index) in show" :key="index">
            <div class="card">
              <div>
                <img class="card-img-top" :src="product.imgUrl" />
                <br />
                {{ product.name }}
                <span v-html="$options.filters.Color(product.status)"></span>
                <br />
                {{ product.description }} <br />
                <span>{{ product.price | currency }} </span> <br />
                สร้างเมื่อ : {{ product.created_at | prettyDate }} <br />
                <button
                  class="btn btn-primary"
                  @click="
                    add(product)
                    totalPrice()
                  "
                  :disabled="check(product)"
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-4">
        <h2>Shopping Card</h2>

        <div class="card" v-for="(testProduct, index) in shop" :key="index">
          <div class="card-body">
            <div class="row text-left">
              <div class="col-4">
                <img class="card-img-top" :src="testProduct.imgUrl" />
              </div>
              <div class="col-8 mp-3">
                <!-- {{ testProduct.id }} <br /> -->
                {{ testProduct.name }} <br />
                {{ testProduct.price | currency }} <br />
                <input
                  type="number"
                  name="Qty"
                  v-model="testProduct.qty"
                  placeholder="จำนวน"
                />
                <br /><br />

                <button
                  class="btn btn-danger"
                  @click="
                    clear(index)
                    seveData()
                  "
                >
                  Clear
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="row mt-4 offset-6">
          <div v-if="shop && shop.length >=1">
            <span>Total: {{ totalPrice()| currency  }}</span>
            <br />
            <br />
            <button
              class="btn btn-success"
              @click="
                seveData()
                link()
              "
            >
              Checkout
            </button>
          </div>
          <div v-else-if="shop <=0" >ไม่มีของในตะกร้า</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      show: null,
      checkNo: null,
      // total: 0,
      shop: []
    }
  },
  // watch: {
  //   $route: {
  //     handler: function (search) {

  //     },
  //     deep: true,
  //     immediate: true
  //   },
  methods: {
    dataShow () {
      const url =
        'https://beneat-62203-default-rtdb.firebaseio.com/checkout.json'
      axios
        .get(url)
        .then((response) => {
          this.shop = response.data
          console.log('response ', response)
        })
        .catch((error) => {
          console.log('error', error)
        })
    },
    totalPrice () {
      let total = 0
      if (this.shop !== null) {
        for (let i = 0; i < this.shop.length; i++) {
          total += this.shop[i].price * this.shop[i].qty
        }
      }
      return total
    },
    showData () {
      const url =
        'https://vuejs-stock-trader-aa575.firebaseio.com/products.json'
      axios
        .get(url, this.show)
        .then((response) => {
          this.show = response.data
          console.log('response', response)
        })
        .catch((error) => {
          console.log('error', error)
        })
    },
    seveData () {
      const url =
        'https://beneat-62203-default-rtdb.firebaseio.com/checkout.json'
      axios
        .put(url, this.shop)
        .then((response) => {
          console.log('response', response)
        })
        .catch((error) => {
          console.log('error', error)
        })
    },
    link () {
      this.$router.push('/checkout')
    },
    add (product) {
      product.qty = 1
      const cloneProduct = Object.assign({}, product)
      if (this.shop === null) {
        console.log(123, this.shop)
        this.shop = []
      }
      this.shop.push(cloneProduct)
    },
    check (product) {
      let hasProduct = null
      if (this.shop) {
        hasProduct = this.shop.find((item) => product.id === item.id)
      }
      if (hasProduct) {
        return true
      } else {
        return false
      }
      // for (let index = 0; index < this.shop.length; index++) {
      //   return index
      //   // if (this.shop[id].id === product.id) {
      //   //   return true
      //   // } else {
      //   //   return false
      //   // }
      // }
    },
    clear (index) {
      this.shop.splice(index, 1)
      // this.shop.splice(index, 1)
      console.log('index', index)
    }
  },
  created () {
    this.showData()
  },
  mounted () {
    this.dataShow()
  }
}
</script>

<style lang="scss" scoped>
span {
  color: red;
}
</style>
