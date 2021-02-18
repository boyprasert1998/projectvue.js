<template>
  <div class="container">
    <h1>Register From API</h1>
    <div class="row text-left">
      <div class="col-6 offset-3">
        <div class="card">
          <div class="card-body">
            <div class="form-group">
              <label for="name">ชื่อ</label>
              <input
                type="text"
                class="form-control"
                id="name"
                name="name"
                v-model="userData.name"
                placeholder="ชื่อ"
              />
            </div>
            <div class="form-group">
              <label for="email">Email</label>
              <input
                type="email"
                class="form-control"
                id="email"
                name="email"
                v-model="userData.email"
                placeholder="xxx@email.com"
              />
            </div>

            <div class="form-group">
              <label for="age">Age</label>
              <input
                type="number"
                class="form-control"
                id="age"
                name="age"
                v-model="userData.age"
                placeholder="อายุ"
              />
            </div>

            <div class="form-group">
              <label for="phone">เบอร์โทร</label>
              <input
                type="number"
                class="form-control"
                id="phone"
                name="phone"
                v-model="userData.phone"
                placeholder="เบอร์โทร"
              />
            </div>

            <div class="form-group">
              <label for="addres">ที่อยู่</label>
              <textarea
                id="addres"
                class="form-control"
                name="addres"
                v-model="userData.addres"
                placeholder="เช่น 38/123 ถ.วังตอ ต.ทับเที่ยง อ.เมือง จ.ตรัง"
              >
              </textarea>
            </div>

            <div class="form-group">
              <label for="gender">เพศ</label> <br />
              <input
                type="radio"
                id="m"
                value="ชาย"
                v-model="userData.gender"
              />
              <label for="w">ชาย</label>
              <br />
              <input
                type="radio"
                id="w"
                value="หญิง"
                v-model="userData.gender"
              />
              <label for="m">หญิง</label>
            </div>

            <div class="form-group">
              <label for="education">ระดับการศึกษา</label>
              <select
                class="form-control"
                id="education"
                v-model="userData.education"
              >
                <option value="null">โปรดเลือกการศึกษาด้วยครับ</option>
                <option value="ประถมศึกษา">ประถมศึกษา</option>
                <option value="มัธยมศึกษา">มัธยมศึกษา</option>
                <option value="ปริญญาตรี">ปริญญาตรี</option>
                <option value="ปริญญาโท">ปริญญาโท</option>
                <option value="ปริญญาเอก">ปริญญาเอก</option>
              </select>
            </div>

            <div class="form-check">
              <input
                type="checkbox"
                class="form-check-input"
                id="exampleCheck1"
                name="checkbox"
                v-model="userData.checkbox"
              />
              <label class="form-check-label" for="exampleCheck1"
                >คุณต้องการรับข่าวสารหรือไม่?</label
              >
            </div>

            <button class="btn btn-primary" @click="saveData()">Submit</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      userData: {
        name: null,
        email: null,
        age: null,
        phone: null,
        addres: null,
        gender: null,
        education: null,
        checkbox: null
      }
    }
  },
  methods: {
    saveData () {
      if (
        !this.userData.name ||
        !this.userData.email ||
        !this.userData.age ||
        !this.userData.addres ||
        !this.userData.gender ||
        !this.userData.education
      ) {
        this.$swal({ icon: 'error', title: 'ไม่สำเร็จ' })
        return
      }

      const url =
        'https://beneat-62203-default-rtdb.firebaseio.com/userData.json'
      axios
        .put(url, this.userData)
        .then((response) => {
          if (response.status === 200) {
            this.$swal({ icon: 'success', title: 'บันทึกสำเร็จ' })
          }
          console.log('response', response)
        })
        .catch((error) => {
          console.log('error', error)
        })
    },
    fetchData () {
      console.log('fetch , fetch')
      const url =
        'https://beneat-62203-default-rtdb.firebaseio.com/userData.json'
      axios
        .get(url, this.userData)
        .then((response) => {
          this.userData = response.data
          console.log('response ', response)
        })
        .catch((error) => {
          console.log('error', error)
        })
    }
  },
  mounted () {
    this.fetchData()
  }
}
</script>
