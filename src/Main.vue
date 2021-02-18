<template>
  <div style="height: 100%">
    <!-- style="background-color: #e3f2fd" -->
    <nav class="navbar navbar-light">
      <!-- <div class="container"> -->
      <!-- <b-navbar-toggle target="sidebar-variant"></b-navbar-toggle> -->
      <img src="https://beneat.co/static/img/main-logo.svg" :class="'logo'" />
      <div class="col d-flex justify-content-end">
        <div>
  <b-dropdown size="lg"  variant="link" toggle-class="text-decoration-none" no-caret class="logout">
    <template #button-content>
      <img
            src="https://scontent.fbkk12-3.fna.fbcdn.net/v/t1.0-9/143633889_1009168306243211_7845070409861736232_o.jpg?_nc_cat=102&ccb=2&_nc_sid=09cbfe&_nc_eui2=AeG33SC5If0S7PY0v5i5P3-8dyENxze_htN3IQ3HN7-G0wn8JuxqAQfnxhse45HUK9D9sCcVwxwwGQLzT5pMZFnw&_nc_ohc=3KpacdRb0SEAX-V79gQ&_nc_oc=AQkOIp7dUzVGAajoNl9o91D5NatDS8L2Kh9rHJvo6Np9WWjPOGhJhIivl1JPr0V7zQQ&_nc_ht=scontent.fbkk12-3.fna&oh=555df4fda1df076cc67bc91a7522bf60&oe=603CDD93"
            :class="'profile'"
          /><span class="sr-only">Search</span>
    </template>
    <span class="name"> คุณ{{ admin.name }}</span>
    <b-dropdown-item @click="resetPassword"><i class="fas fa-unlock-alt"></i> ResetPassword</b-dropdown-item>
    <b-dropdown-item @click="signOut"><i class="fas fa-sign-in-alt"></i> SignOut</b-dropdown-item>
    <!-- <b-dropdown-item href="#">Something else here...</b-dropdown-item> -->
   <!-- <li class="side">
            <button class="btn btn-info" @click="resetPassword">
              <i class="fas fa-unlock-alt"></i> ResetPassword
            </button>
          </li>
      <li class="side">
            <button class="btn btn-danger" @click="signOut">
              <i class="fas fa-sign-in-alt"></i> SignOut
            </button>
          </li> -->
    </b-dropdown>
</div>
        <!-- <b>ยินดีตอนรับคุณ{{ admin.name }}</b>
        <template>
          <img
            src="https://scontent.fbkk12-3.fna.fbcdn.net/v/t1.0-9/143633889_1009168306243211_7845070409861736232_o.jpg?_nc_cat=102&ccb=2&_nc_sid=09cbfe&_nc_eui2=AeG33SC5If0S7PY0v5i5P3-8dyENxze_htN3IQ3HN7-G0wn8JuxqAQfnxhse45HUK9D9sCcVwxwwGQLzT5pMZFnw&_nc_ohc=3KpacdRb0SEAX-V79gQ&_nc_oc=AQkOIp7dUzVGAajoNl9o91D5NatDS8L2Kh9rHJvo6Np9WWjPOGhJhIivl1JPr0V7zQQ&_nc_ht=scontent.fbkk12-3.fna&oh=555df4fda1df076cc67bc91a7522bf60&oe=603CDD93"
            :class="'profile'"
          /><span class="sr-only">Search</span>
        </template> -->
      </div>
      <!-- </div> -->
    </nav>
    <div class="row">
      <div class="col-3">
        <ul>
          <li class="side">
            <router-link to="/homeadmin"
              ><i class="fas fa-home"></i> ปฎิทินรวม</router-link
            >
          </li>
          <li class="side">
            <router-link to="/homeadmin/time"
              ><i class="far fa-clock"></i> เวลาเข้า/ออกงาน</router-link
            >
          </li>
        <li class="side">
            <router-link to="/homeadmin/leave"
              ><i class="fas fa-calendar-check"></i> จัดการวันลา</router-link
            >
          </li>
        <li class="side">
            <router-link to="/homeadmin/manageholiday"
              ><i class="fas fa-calendar-day"></i> จัดการวันหยุด</router-link
            >
          </li>
        <li class="side">
            <router-link to="/homeadmin/employee"
              ><i class="fas fa-user"></i> พนักงาน</router-link
            >
          </li>
       <li class="side">
            <router-link to="/homeadmin/deparment"
              ><i class="fas fa-users"></i> แผนก</router-link
            >
          </li>
       <li class="side">
            <router-link to="/homeadmin/report"
              ><i class="fas fa-file-excel"></i> รายงาน</router-link
            >
          </li>
        </ul>
      </div>
      <div class="col-9">
        <router-view />
      </div>
    </div>
    <!-- <b-sidebar
        id="sidebar-variant"
        title="เมนู"
        bg-variant="light"
        text-variant="black"
        shadow
      ><b>ยินดีตอนรับคุณ{{ admin.name }}</b>
        <div class="px-3 py-2">
          <ul>
            <b-nav-item router-link to="/home-admin" :class="'li'"
              ><i class="fas fa-home"></i> Calender</b-nav-item
            >
            <br />
            <b-nav-item router-link to="/home-admin/time" :class="'li'"
              ><i class="far fa-clock"></i> To Clock in/out</b-nav-item
            >
            <br />
            <b-nav-item router-link to="/home-admin/leave" :class="'li'"
              ><i class="fas fa-calendar-check"></i>
              Leave</b-nav-item
            >  <br />
            <b-nav-item router-link to="/home-admin/employee" :class="'li'"
              ><i class="fas fa-user"></i> Employee</b-nav-item
            >  <br />
            <b-nav-item router-link to="/home-admin/deparment" :class="'li'"
              ><i class="fas fa-users"></i> Teams</b-nav-item
            >  <br />
          </ul>
        </div>
      </b-sidebar> -->
    <calendar></calendar>
  </div>
</template>
<script>
import Swal from 'sweetalert2'
import { mapState } from 'vuex'
import firebase from 'firebase'

export default {
  computed: {
    ...mapState({
      admin: (state) => state.admin.dataAdmin
    })
  },
  methods: {
    async signOut () {
      try {
        const data = await firebase.auth().signOut()
        console.log('DataLogOut', data)
        this.$router.push('/login')
        this.$store.commit('user/saveUser', null)
        // Swal.fire('สำเร็จ!', 'ออกจากระบบสำเร็จ', 'success')
      } catch (err) {
        console.log(err)
      }
    },
    resetPassword () {
      const email = this.admin.email
      firebase
        .auth()
        .sendPasswordResetEmail(email)
        .then(function () {
          Swal.fire({
            title:
              '<h6>ระบบได้ส่งลิงค์ให้คุณกำหนดรหัสผ่านใหม่ในอีเมลเรียบร้อยแล้ว</h6>',
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            }
          })
        })
    }
  }
}
</script>

<style scope>
@import url('https://fonts.googleapis.com/css2?family=Kanit:wght@100;300&display=swap');
#app {
font-family: 'Kanit', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
/* #nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
} */
body {
  font-family: 'Lato', sans-serif;
}

.logo {
  margin-top: 0.15rem;
  margin-left: 0.99rem;
  width: 155px;
  height: 46.3px;
}
.profile {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
/* .btn-link {
  color: black !important;
}
.btn-link:hover {
  color: skyblue !important;
  text-decoration: none !important;
} */
/* .v-application a  {
    text-decoration: none !important;
    color: red !important;
} */

b {
  margin-top: 15px;
  padding-right: 15px;
}
.row {
  height: 100%;
}
/* .li {
  list-style: none;
  text-align: left;
  font-size: 20px;
  border-bottom-style: groove;
  border-bottom-width: thin;
} */
li.side:hover {
  background-color: skyblue;
}
ul {
  /* border-right: 2px solid grey;
  border-top: 2px solid grey; */
  padding: 20px;
  font-size: 20px;
  height: 100%;
  list-style: none;
  box-shadow: 2px 0 2px 0 rgb(0 0 0/ 15%);
}

li.side {
  font-size: 20px;
  padding: 10px;
  text-align: left;
  padding-left: 45px;
  /* margin-top: 5px; */
}
.v-application ul, .v-application ol {
    padding-left: 0px !important;
}
.dropdown-menu.show {
  left: -70px !important;
}
.v-application a {
  text-decoration: none !important;
  color: black !important;
}
.v-application a:hover {
  color: white !important;
}
.siggout {
  list-style: none;
  text-align: left;
}
nav.navbar.navbar-light {
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 12%);
  height: 72px;
  width: 100%;
}
.navbar {
  flex-wrap: nowrap !important;
}
.btn-light {
  color: white !important;
  background-color: white !important;
  border-color: none !important;
  box-shadow: unset !important;
}
button.btn.btn-outline-success {
  height: 40px;
}
.sidenav {
  height: 100%;
  width: 0;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: #111;
  overflow-x: hidden;
  transition: 0.5s;
  padding-top: 60px;
}

.sidenav a {
  padding: 8px 8px 8px 32px;
  text-decoration: none;
  font-size: 25px;
  color: #818181;
  display: block;
  transition: 0.3s;
}

.sidenav a:hover {
  color: #f1f1f1;
}

.sidenav .closebtn {
  position: absolute;
  top: 0;
  right: 25px;
  font-size: 36px;
  margin-left: 50px;
}

@media screen and (max-height: 450px) {
  .sidenav {
    padding-top: 15px;
  }
  .sidenav a {
    font-size: 18px;
  }
}
.btn-warning {
  color: white;
}
ul.dropdown-menu.show {
    height: 150%;
    padding: 5px;
}
.v-application a:hover {
    color:white !important;
    background-color: skyblue;
}
.name {
  padding: 25px;
}
</style>
