<template>
  <div class="container">
    <h2><center><i class="fas fa-user-shield"></i></center></h2>
    <div class="row text-left m-6">
      <div class="col-6 offset-3">
        <div class="card">
          <div class="card-body">
            <form>
              <v-text-field
                v-model="email"
                label="E-mail"
                required
              ></v-text-field>
              <v-text-field
                v-model="password"
                label="Password"
                type="password"
                required
              ></v-text-field>
              <div class="text-right">
                <v-btn @click="signin">signIn</v-btn>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import { mapState } from 'vuex'
import firebase from 'firebase'
import Swal from 'sweetalert2'
export default {
  data () {
    return {
      email: '',
      password: ''
    }
  },
  computed: {
    ...mapState({
      admin: (state) => state.user.dataUser.email
    })
  },
  methods: {
    signin: function () {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(
          async () => {
            const url = 'http://127.0.0.1:8000/admin'
            const { data } = await axios.post(url, {
              email: this.email
            })
            if (data.admin) {
              this.$store.commit('admin/SET_ADMIN', data.admin)
            }
            console.log('เช็คอีเมล', data)

            // alert('เข้าสู่ระบบสำเร็จ')
            this.$store.commit('user/saveUser', this.email)
            if (data.admin.user_level === 'Admin') {
              this.$router.push('/homeadmin')
              console.log('แอดมินเข้าสู่ระบบสำเร็จ', this.email)
              // Swal.fire('สำเร็จ!', 'ยินดีตอนรับแอดมินเข้าสู่ระบบ', 'success')
            } else {
              alert('user')
              // this.$router.push('/register')
              console.log('พนักงานเข้าสู่ระบบสำเร็จ', this.email)
              // Swal.fire('สำเร็จ!', 'ยินดีตอนรับพนักงานเข้าสู่ระบบ', 'success')
            }
          },
          (error) => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: error.message
            })
            // alert('Error' + error.message)
          }
        )
    }
  }
}
</script>
