<template>
  <div class="container">
    Name :
    <input type="text" name="name" value="name" v-model="name" />
    <hr />
    E-mail :
    <input type="email" name="email" value="email" v-model="email" />
    <hr />
    <button class="btn btn-primary" @click="saveData">Save Data</button>
    <hr />
    <button class="btn btn-primary" @click="fetch">Fetch Data</button>
    <hr />
    <h2>showdata</h2>

   ชื่อ : {{ name }}  <br>
   อีเมล : {{ email }}
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      name: null,
      email: null
    }
  },

  methods: {
    saveData () {
      const url = 'https://beneat-62203-default-rtdb.firebaseio.com/user.json'
      const userData = {
        name: this.name,
        email: this.email
      }
      axios
        .put(url, userData)
        .then((response) => {
          console.log('response', response)
        })
        .catch((error) => {
          console.log('error', error)
        })
    },
    fetch () {
      const url = 'https://beneat-62203-default-rtdb.firebaseio.com/user.json'
      const fetchData = {
        response: this.name,
        email: this.email
      }
      axios
        .get(url, fetchData)
        .then((response) => {
          this.name = response.data.name
          this.email = response.data.email
          console.log('response', response)
        })
        .catch((error) => {
          console.log('error', error)
        })
    }

    //    axios.get('https://beneat-62203-default-rtdb.firebaseio.com/user.json')
    // .then((response) => {
  }
}
</script>
