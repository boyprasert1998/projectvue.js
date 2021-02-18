<template>
  <div>
        <h2> สวัสดีคุณ : {{userName}} </h2>
        <h3> ชื่อเล่น :{{nickName}}</h3>
        <div class="row"></div>
        <label for="">ชื่อเล่น</label>
        <input type="text" v-model="nickName">
        <div class="row"></div>
        <label for="">ชื่อ:</label>
        <input type="text" v-model="userName">
    <div class="row"></div>
    <label for="">ราคา:</label>
    <input type="text" v-model="productCost">

     <div class="row"></div>
     shippingCost {{shippingCost}}
     <div class="row"></div>
     total {{total}}

    <div class="row"></div>
     <button
      class="btn btn-primary mt-4" @click="calculatePrice()"> calculate
    </button>
    <div>
      <input type="radio" name="gender" value="male" v-model="userGender">ผู้ชาย <br>
      <input type="radio" name="gender" value="female" v-model="userGender">ผู้หญิง <br>
      <input type="radio" name="gender" value="Child" v-model="userGender">เด็ก
    </div>
    <div v-if="userGender">
      <div v-if="userGender === 'male'">
        <img src="https://images.unsplash.com/photo-1508341591423-4347099e1f19?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=334&q=80">
      </div>
      <div v-else-if="userGender === 'female'">
        <img src="https://images.unsplash.com/photo-1545912452-8aea7e25a3d3?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=334&q=80">
      </div><div  v-else-if="userGender === 'Child'">
        <img src="https://images.unsplash.com/photo-1503919545889-aef636e10ad4?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=334&q=80">
      </div>
    </div>
    <div class="row mb-3">
      <div class="col-4" v-for="(attraction, index) in attractions" :key="index">
        <div class="card">
          <img class="card-img-top" :src="attraction.imgUrl" alt="Card imge cap">
          <div class="card-body">
            <h3>{{attraction.name}}</h3>
            <a :href="attraction.link" target="_blank" class="btn btn-primary">
              Go to place
            </a>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
export default {
  data () {
    return {
      userName: null,
      nickName: null,
      productCost: null,
      shippingCost: 70,
      total: null,
      userGender: null,
      attractions: [
        {
          name: 'sea',
          imgUrl: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=334&q=80',
          link: 'www.google.com'
        },
        {
          name: 'sea',
          imgUrl: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=334&q=80',
          link: 'www.google.com'
        },
        {
          name: 'sea',
          imgUrl: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=334&q=80',
          link: 'www.google.com'
        },
        {
          name: 'sea',
          imgUrl: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=334&q=80',
          link: 'www.google.com'
        },
        {
          name: 'sea',
          imgUrl: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=334&q=80',
          link: 'www.google.com'
        },
        {
          name: 'sea',
          imgUrl: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=334&q=80',
          link: 'www.google.com'
        }
      ]
    }
  },
  methods: {
    calculatePrice () {
      this.total = Number(this.productCost) + Number(this.shippingCost)
    }
  }
}
</script>
