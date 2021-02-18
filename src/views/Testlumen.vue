<template>
  <div class="container">
    <h2>Test Lumen</h2>
    <div class="row">
      <div class="col-8 offset-2">
        <input type="text" v-model="search" placeholder="ค้นหา.." /> <br />
        <br />
        <button class="btn btn-primary" @click="dataShow()">ค้นหา</button>
      </div>
      <div class="col-8 offset-8">
        <b-button v-b-modal.modal-1 variant="primary">เพิ่มข้อมูล</b-button>
        <b-modal ref="my-modal" id="modal-1" title="เพิ่มข้อมูล" hide-footer>
          <form @submit.prevent="addData">
            <div class="form-group">
              <label for="name">Name</label>
              <input
                type="text"
                class="form-control"
                placeholder="ชื่อ"
                v-model="nameAdd"
                required
              />
            </div>
            Gender <br />
            <input
              type="radio"
              name="gender"
              value="1"
              v-model="genderAdd"
              required
            />ผู้ชาย <br />
            <input
              type="radio"
              name="gender"
              value="2"
              v-model="genderAdd"
              required
            />ผู้หญิง <br />
            <div class="form-group">
              <label for="age">Age</label>
              <input
                type="number"
                class="form-control"
                placeholder="อายุ"
                v-model="ageAdd"
                required
              />
            </div>
            <div class="form-group">
              <label for="university">University</label>
              <input
                type="text"
                class="form-control"
                placeholder="มหาวิทยาลัย"
                v-model="universityAdd"
                required
              />
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
            <!-- <button type="button" class="btn btn-danger" @click="dataShow">Cancel</button> -->
          </form>
        </b-modal>
      </div>
    </div>
    <br />
    <table class="table">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Name</th>
          <th scope="col">Gander</th>
          <th>Age</th>
          <th scope="col">university</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(data, index) in dataPeople" :key="index">
          <td>{{ data.id }}</td>
          <td>{{ data.name }}</td>
          <td>{{ data.gender }}</td>
          <td>{{ data.age }}</td>
          <td>{{ data.university }}</td>
          <td>
            <b-button
              v-b-modal.modal-2
              variant="warning"
              @click.prevent="show(data.id)"
              >Edit</b-button
            >
          </td>
          <td>
            <button
              type="bunton"
              class="btn btn-danger"
              @click="deleteData(data.id)"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <b-modal ref="my-modal" id="modal-2" title="อัพเดจข้อมูล" hide-footer>
      <form>
        <div class="form-group">
          <label for="name">Name</label>
          <input
            type="text"
            class="form-control"
            placeholder="ชื่อ"
            v-model="name"
            required
          />
        </div>
        Gender <br />
        <input
          type="radio"
          name="gender"
          value="1"
          v-model="gender"
          required
        />ผู้ชาย <br />
        <input
          type="radio"
          name="gender"
          value="2"
          v-model="gender"
          required
        />ผู้หญิง <br />
        <div class="form-group">
          <label for="age">Age</label>
          <input
            type="number"
            class="form-control"
            placeholder="อายุ"
            v-model="age"
            required
          />
        </div>
        <div class="form-group">
          <label for="university">University</label>
          <input
            type="text"
            class="form-control"
            placeholder="มหาวิทยาลัย"
            v-model="university"
            required
          />
        </div>
        <button
          type="submit"
          class="btn btn-primary"
          @click.prevent="updateData()"
        >
          Submit
        </button>
        <!-- <button type="button" class="btn btn-danger" @click="dataShow">Cancel</button> -->
      </form>
    </b-modal>
  </div>
</template>
<script>
import Swal from 'sweetalert2'

import axios from 'axios'
export default {
  data () {
    return {
      dataPeople: [],
      search: null,

      nameAdd: null,
      genderAdd: null,
      ageAdd: null,
      universityAdd: null,

      name: null,
      gender: null,
      age: null,
      university: null,

      id: null,
      selectedId: null
    }
  },
  methods: {
    setSelectedData (data) {
      this.selectedData = data
    },
    dataShow () {
      const url = 'http://127.0.0.1:8000/profile'
      axios
        .get(url, {
          params: {
            keyword: this.search
          }
        })
        .then((response) => {
          this.dataPeople = response.data
          console.log('response ', response)
        })
    },
    addData () {
      this.$swal({ icon: 'success', title: 'บันทึกสำเร็จ' })
      const url = 'http://127.0.0.1:8000/profile'
      axios
        .post(url, {
          nameData: this.nameAdd,
          genderData: this.genderAdd,
          ageData: this.ageAdd,
          universityData: this.universityAdd
        })
        .then((response) => {
          this.dataPeople = response.data
          this.reset()
          this.dataShow()
          this.$refs['my-modal'].hide()
          console.log('response ', response)
        })
    },
    reset () {
      this.nameAdd = null
      this.genderAdd = null
      this.ageAdd = null
      this.universityAdd = null
    },
    deleteData (id) {
      Swal.fire({
        title: 'คุณแน่ใจที่จะลบข้อมูล?',
        // text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes!'
      }).then((result) => {
        if (result.isConfirmed) {
          const url = 'http://127.0.0.1:8000/profile/' + id
          axios.delete(url).then((response) => {
            Swal.fire('สำเร็จ!', 'คุณลบข้อมูลสำเร็จ.', 'success')
            this.dataPeople = response.data
            console.log('response ', response)
            this.dataShow()
          })
        }
      })
    },
    show (id) {
      this.selectedId = id
      const url = 'http://127.0.0.1:8000/profile/' + id
      axios.get(url).then((response) => {
        this.name = response.data.name
        this.gender = response.data.gender
        this.age = response.data.age
        this.university = response.data.university
        console.log('show ', response)
      })
    },
    updateData () {
      this.$swal({ icon: 'success', title: 'แก้ไขข้อมูลสำเร็จ' })
      const url = 'http://127.0.0.1:8000/profile/' + this.selectedId
      axios
        .put(url, {
          nameUpdate: this.name,
          genderUpdate: this.gender,
          ageUpdate: this.age,
          universityUpdate: this.university
        })
        .then((response) => {
          this.dataPeople = response.data
          this.dataShow()
          this.$refs['my-modal'].hide()
          console.log('editData ', response)
        })
    }
  },
  created () {
    this.dataShow()
  }
}
</script>

<style lang="scss" scoped>
@import 'sweetalert2/src/sweetalert2.scss';
</style>
