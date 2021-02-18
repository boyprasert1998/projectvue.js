<template>
  <div class="col-8 offset-2">
    <div class="card">
      <div class="card-body">
        <h1>User Component</h1>
            ชื่อ : {{typeob.name}} <br>
            อายุ : {{typeob.age}} <br>
            <img :src="typeob.image" >

      </div>
    </div>
  </div>

</template>
<script>
export default {
  props: {
    typeob: Object
  }

}
</script>
<style lang="less" scoped>

</style>
