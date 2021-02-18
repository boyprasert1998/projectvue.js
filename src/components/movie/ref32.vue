<template>
  <div class="col-8 offset-2">
    <div class="card">
      <div class="card-body">
        <h1>User Component</h1>
             {{datamy.name}} <br>
              {{datamy.age}} <br>
              <img :src="datamy.image">

      </div>
    </div>
  </div>

</template>
<script>
export default {
  data () {
    return {
      datamy: {
        name: null,
        age: null,
        image: null
      }

    }
  },
  methods: {

    mydata (type) {
      console.log('check', type)
      this.datamy.name = type.name
      this.datamy.age = type.age
      this.datamy.image = type.image
    }
  }

}

</script>
<style lang="less" scoped>

</style>
