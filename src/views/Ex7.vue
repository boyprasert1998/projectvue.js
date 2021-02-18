<template>
  <div class="container">
    <div class="row">
      <div class="col-4">
        <div class="card">
          <div class="card-body">
            <div class="text-left">
              Create Task <br /><br />
              <input type="text" v-model="msg" />
              <br />
              <br />
              <div class="text-right">
                <button class="btn btn-primary" @click="addToArray(msg)">
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-8">
        <div class="card">
          <div class="card-body" v-for="(text, index) in msgs" :key="index">
            <input type="checkbox" id="check" v-model="msgs[index].checked" />
            <span> {{ text.msg }}</span>

            <button class="btn btn-danger" @click="clear(index)">Remove</button>
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
      msg: null,
      msgs: [],
      checked: null
    }
  },
  methods: {
    addToArray (msg) {
      // const copy = { msg }
      // this.msgs.push(copy
      const item = {}
      item.checked = false
      item.msg = this.msg
      this.msgs.push(item)
      this.msg = null
    },
    clear (index) {
      // for (let i = 0; i < this.msgs.length; i++) {
      //   if (this.msgs[i].checked === true) {
      this.msgs.splice(index, 1)
    }
  }
  // mounted () {
  //   this.addToArray()
  // }
}
</script>

<style lang="scss" scoped>
#check:checked + span {
  text-decoration: line-through;
}
</style>
