<template>
  <div class="container">
    <div class="row mt-3">
       <h2>พนักงาน</h2>
       <div class="col d-flex justify-content-end">
           <form class="form-inline">
          <input
            class="form-control mr-sm-2"
            placeholder="ค้นหา.."
            v-model="search"
          />
           <b-button  variant="success "  @click.prevent="showUser"><i class="fas fa-search"></i></b-button>
         </form>
        <b-button v-b-modal.modal-1 variant="primary m-2"><i class="fas fa-user-plus"></i></b-button>
      </div>
    </div>
    <b-modal
      ref="my-modal"
      id="modal-1"
      title="เพิ่มพนักงาน"
      mt-2
      hide-footer
    >
      <form @submit.prevent="registerUser">
        <div class="form-group">
          <label for="name">ชื่อ</label>
          <input type="text" class="form-control" name="name" v-model="name"  required/>

          <label for="email">อีเมล</label>
          <input
            type="email"
            class="form-control"
            name="email"
            v-model="email"
            required
          />
          <label for="password">พาสเวิร์ด</label>
          <input
            type="password"
            class="form-control"
            name="password"
            v-model="password"
            required
          />
          <label for="phone">เบอร์โทร</label>
          <input
            type="number"
            class="form-control"
            name="phone"
            v-model="phone"
            required
          />
          แผนก
          <select class="form-control" v-model="department">
            <option
              v-for="(deparment, index) in deparmentData"
              :key="index"
              :value="deparment.id"
            >
              {{ deparment.name }}
            </option>
          </select>
          <label>ประเภทพนักงาน</label>
          <select class="form-control" v-model="type" required>
            <option>User</option>
            <option>Admin</option>
          </select>
        </div>
        <button type="submit" class="btn btn-primary">เพิ่มข้อมูล</button>
      </form>
    </b-modal>
    <div class="table-responsive mt-5">
       <table class="table table-bordered  text-center">
        <thead>
          <th>ลำดับ</th>
          <th>ชื่อ</th>
          <th>อีเมล</th>
          <th>เบอร์โทร</th>
          <th>แผนก</th>
          <th>ประเภทพนักงาน</th>
          <th>แก้ไข/ลบ</th>
        </thead>
        <tbody v-for="(empolyee, index) in empolyeeData.data" :key="empolyee.id">{{empolyee.title}}
          <td>{{ index + 1 }}</td>
          <td>{{ empolyee.name }}</td>
          <td>{{ empolyee.email }}</td>
          <td>{{ empolyee.tel }}</td>
          <td>{{ empolyee.namedepartment }}</td>
          <td>{{ empolyee.user_level }}</td>
          <td>
            <b-button
              v-b-modal.modal-2
              variant="warning m-1"
              @click.prevent="showUpdate(empolyee.id)"
              ><i class="fas fa-user-edit"></i></b-button
            >
            <button class="btn btn-danger" @click="dataDelete(empolyee.id)">
               <i class="fas fa-trash-alt"></i>
            </button>
          </td>
        </tbody>
      </table>
    </div>
    <pagination :data="empolyeeData" @pagination-change-page="showUser"></pagination>
    <b-modal ref="my-modal" id="modal-2" title="แก้ไขข้อมุูล" mt-2 hide-footer>
      <form @submit.prevent="updateUser">
        <div class="form-group">
          <label for="name"> ชื่อ</label>
          <input
            type="text"
            class="form-control"
            name="name"
            v-model="nameUpdate"
          />
          <label for="email">อีเมล</label>
          <input
            type="email"
            class="form-control"
            name="email"
            v-model="emailUpdate"
          />

          <label for="phone">เบอร์โทร</label>
          <input
            type="number"
            class="form-control"
            name="phone"
            v-model="phoneUpdate"
          />
          แผนก
          <select class="form-control" v-model="departmentUpdate">
            <option
              v-for="(deparment, index) in deparmentData"
              :key="index"
              :value="deparment.id"
            >
              {{ deparment.name }}
            </option>
          </select>
          <label>ประเภทพนักงาน</label>
          <select class="form-control" v-model="typeUpdate">
            <option>User</option>
            <option>Admin</option>
          </select>
        </div>
        <button class="btn btn-primary">แก้ไขข้อมูล</button>
      </form>
    </b-modal>
  </div>
</template>
<script>
import Swal from 'sweetalert2'
import axios from 'axios'
import firebase from 'firebase'
export default {
  data () {
    return {
      search: null,
      empolyeeData: {},
      name: null,
      email: null,
      password: null,
      phone: null,
      type: null,

      nameUpdate: null,
      emailUpdate: null,
      phoneUpdate: null,
      typeUpdate: null,
      selectedId: null,

      deparmentData: [],
      department: null,
      departmentUpdate: null
    }
  },
  methods: {
    registerUser () {
      const url = 'http://127.0.0.1:8000/user'
      axios
        .post(url, {
          name: this.name,
          email: this.email,
          phone: this.phone,
          user_level: this.type,
          department_id: this.department
        })
        .then((response) => {
          this.register()
          this.$refs['my-modal'].hide()
          this.resetData()
          this.showUser()
          console.log('registerUser', response)
          Swal.fire('สำเร็จ!', 'เพิ่มข้อมูลสำเร็จ', 'success')
        })
    },
    resetData () {
      this.name = null
      this.email = null
      this.password = null
      this.phone = null
      this.type = null
      this.department = null
    },
    showUser (page = 1) {
      const url = 'http://127.0.0.1:8000/user?page=' + page
      axios
        .get(url, {
          params: {
            keyword: this.search
          }
        })
        .then((response) => {
          this.empolyeeData = response.data
          console.log('showUser', response)
        })
    },
    updateUser () {
      const url = 'http://127.0.0.1:8000/user/' + this.selectedId

      axios
        .put(url, {
          name: this.nameUpdate,
          email: this.emailUpdate,
          phone: this.phoneUpdate,
          user_level: this.typeUpdate,
          department_id: this.departmentUpdate
        })
        .then((response) => {
          this.showUser()
          this.$refs['my-modal'].hide()
          console.log('updateEmployee', response)
          Swal.fire('สำเร็จ!', 'แก้ไขข้อมูลสำเร็จ', 'success')
        })
    },
    showUpdate (id) {
      this.selectedId = id
      const url = 'http://127.0.0.1:8000/user/' + this.selectedId
      axios.get(url).then((response) => {
        this.nameUpdate = response.data.name
        this.emailUpdate = response.data.email
        this.phoneUpdate = response.data.tel
        this.typeUpdate = response.data.user_level
        this.departmentUpdate = response.data.department_id
        console.log('showUpdate', response)
      })
    },
    dataDelete (id) {
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
          const url = 'http://127.0.0.1:8000/user/' + id
          axios.delete(url).then((response) => {
            this.empolyeeData = response.data
            this.showUser()
            console.log('dataDelete', response)
            Swal.fire('สำเร็จ!', 'คุณลบข้อมูลสำเร็จ', 'success')
          })
        }
      })
    },
    showDepartment () {
      const url = 'http://127.0.0.1:8000/deparment'
      axios
        .get(url, {
          params: {
            from: 1
          }
        })
        .then((response) => {
          this.deparmentData = response.data
          console.log('showDepartment', response)
        })
    },
    register: function () {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(
          (user) => {
            this.$refs['my-modal'].hide()
            this.resetData()
            this.showUser()
            console.log('registerFirebase')
          },
          (error) => {
            alert('Error' + error.message)
          }
        )
    }
  },
  created () {
    this.showUser()
    this.showDepartment()
  }
}
</script>
<style scoped>
.v-application a {
    text-decoration: none !important;
    color: white !important;
}
</style>
