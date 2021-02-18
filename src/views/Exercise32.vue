<template>
  <div class="container">
    <h1>Photos (compoents,refs)</h1>
    <div class="row text-left">
      <div class="col-8 offset-2">
        <div class="card">
          <div class="card-body">
            <form>
              <div class="form-group">
                <label for="exampleInputEmail1">Name</label>
                <input
                  type="text"
                  class="form-control"
                  id="exampleInputEmail1"
                  name="name"
                  v-model="type.name"
                  placeholder="ชื่อ"
                />
              </div>
              <div class="form-group">
                <label for="exampleInputPassword1">Age</label>
                <input
                  type="number"
                  class="form-control"
                  id="exampleInputPassword1"
                  name="age"
                  v-model="type.age"
                  placeholder="อายุ"
                />
              </div>

              <div class="form-group">
                <label for="exampleInputPassword1">Image Url</label>
                <input
                  type="text"
                  class="form-control"
                  id="exampleInputPassword1"
                  name="image"
                  v-model="type.image"
                  placeholder="ลิงค์รูป"
                />
              </div>
              <button type="button" class="btn btn-primary" @click.prevent="sent">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
    <ref-32 ref="ref32"></ref-32>

  </div>
</template>
<script>
import ref32 from '@/components/movie/ref32.vue'

export default {
  components: {
    ref32
  },
  data () {
    return {
      type: {
        name: null,
        age: null,
        image: null
      }
    }
  },

  methods: {
    sent () {
      this.$refs.ref32.mydata(this.type)
    }
  }
}
</script>
<style lang="less" scoped></style>
