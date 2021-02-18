<template>
  <div class="container">
    <h2>Lumen</h2>
    <div class="row-ms-3 text-right">
      <b-button variant="primary" @click="call(null)">เพิ่มข้อมูล</b-button>
    </div>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Id</th>
          <th scope="col">Name</th>
          <th scope="col">Gender</th>
          <th scope="col">Age</th>
          <th scope="col">University</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in dataPeople" :key="index">
          <th>{{ index + 1 }}</th>
          <th>{{ item.name }}</th>
          <th>{{ item.gender }}</th>
          <th>{{ item.age }}</th>
          <td>{{ item.university }}</td>
          <td>
            <b-button
              v-b-modal.modal-2
              variant="warning"
              @click.prevent="call(item.id)"
              >Edit</b-button
            >
          </td>
            <td>
            <button
              type="bunton"
              class="btn btn-danger"
              @click="deleteData(item.id)"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <From ref="From" @reset = "dataShow"></From>
    <!-- @reset รีโหลดข้อมูลให้เป็นปัจจุบัน -->
  </div>
</template>
<script>
import From from '@/components/lumen/From.vue'
import axios from 'axios'
export default {
  components: {
    From
  },
  data () {
    return {
      dataPeople: []
    }
  },
  methods: {
    async dataShow () {
      const Peopledata = await axios.get('http://127.0.0.1:8000/profile')
      this.dataPeople = Peopledata.data
      console.log('async', this.dataPeople)
    },
    call (id) {
      console.log('call', id)
      this.$refs.From.showModal(id)
    },
    deleteData (id) {
      console.log('del', id)
      this.$refs.From.deleteData(id)
    }
  },
  created () {
    this.dataShow()
  }
}
</script>
