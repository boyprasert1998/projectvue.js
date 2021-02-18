<template>
  <div class="container">
    <div class="row mt-3">
      <b-modal ref="my-modal" id="modal-1" :title = "idPeople ? 'แก้ไขข้อมูล' : 'เพิ่มข้อมูล'" hide-footer>
        <form @submit.prevent="addEdit">
          <div class="form-group">
            <label for="name">Name</label>
            <input
              type="text"
              class="form-control"
              placeholder="ชื่อ"
              v-model="people.name"
              required
            />
          </div>
          Gender <br />
          <input
            type="radio"
            name="gender"
            value="1"
            v-model="people.gender"
            required
          />ผู้ชาย <br />
          <input
            type="radio"
            name="gender"
            value="2"
            v-model="people.gender"
            required
          />ผู้หญิง <br />
          <div class="form-group">
            <label for="age">Age</label>
            <input
              type="number"
              class="form-control"
              placeholder="อายุ"
              v-model="people.age"
              required
            />
          </div>
          <div class="form-group">
            <label for="university">University</label>
            <input
              type="text"
              class="form-control"
              placeholder="มหาวิทยาลัย"
              v-model="people.university"
              required
            />
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      </b-modal>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import Swal from 'sweetalert2'
export default {
  data () {
    return {
      people: {
        name: null,
        gender: null,
        age: null,
        university: null
      },
      idPeople: null
    }
  },
  methods: {
    showModal (id) {
      console.log('id', id)
      this.idPeople = id

      if (this.idPeople) {
        const url = 'http://127.0.0.1:8000/profile/' + this.idPeople
        axios.get(url).then((response) => {
          console.log('123', response.data)
          this.people.name = response.data.name
          this.people.gender = response.data.gender
          this.people.age = response.data.age
          this.people.university = response.data.university
        })
      } else {
        this.people.name = null
        this.people.gender = null
        this.people.age = null
        this.people.university = null
      }
      this.$refs['my-modal'].show()
    },
    addEdit (id) {
      if (this.idPeople) {
        this.$swal({ icon: 'success', title: 'แก้ไขข้อมูลสำเร็จ' })
        const url = 'http://127.0.0.1:8000/profile/' + this.idPeople
        axios
          .put(url, {
            nameUpdate: this.people.name,
            genderUpdate: this.people.gender,
            ageUpdate: this.people.age,
            universityUpdate: this.people.university
          })
          .then((response) => {
            this.people = response.data
            this.$emit('reset')
            this.$refs['my-modal'].hide()
          })
      } else {
        this.$swal({ icon: 'success', title: 'บันทึกสำเร็จ' })
        const url = 'http://127.0.0.1:8000/profile'
        axios
          .post(url, {
            nameData: this.people.name,
            genderData: this.people.gender,
            ageData: this.people.age,
            universityData: this.people.university
          })
          .then((response) => {
            this.people = response.data
            this.$emit('reset')
            this.$refs['my-modal'].hide()
          })
      }
    },
    deleteData (id) {
      console.log('000', id)
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
            this.people = response.data
            this.$emit('reset')
            console.log('ลบ ', response)
          })
        }
      })
    }
  }
}
</script>
