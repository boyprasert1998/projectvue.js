<template>
  <div class='col-3'>
    <div class=' text-left'>
      <div class='card'>
        <div class='card-body'>
          ID {{ id + 1 }}
          <br> <br>

          Name {{ names.name }} <br> <br>
          <input type='text' @keyup.enter='addItem' placeholder='EnterName' v-model='names.name' />
          <button class=' btn btn-danger mt-3' @click='deleteItem()'> Delete by parent ref</button>
          <button class=' btn btn-danger mt-3' @click='deleteByEmit()'> Delete by emit</button>
          <br>
          <br>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
export default {
  props: ['names', 'id'],
  methods: {
    addItem () {
      const copy = {
        name: null
      }
      this.items.push(copy)
    },

    deleteItem () {
      this.$parent.removeItem(this.id)
      //       $parent อ้างอิงจากตัวแม่
    },
    deleteByEmit () {
      this.$emit('onDelete', this.id)
    }

  }
}

</script>
<style scope>
input {
  width: auto;

}

</style>
