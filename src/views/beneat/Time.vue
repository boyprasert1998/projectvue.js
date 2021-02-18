<template>
  <div class="container">
    <div class="row mt-3">
      <h2>ลงเวลาเข้างาน/ออกงาน</h2>
    </div>
    <div class="row">
      <v-col cols="12" lg="6">
        <v-menu :close-on-content-click="false" max-width="290">
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              :value="computedDateFormattedMomentjs"
              clearable
              readonly
              v-bind="attrs"
              v-on="on"
              @click:clear="dates = null"
            ></v-text-field>
          </template>
          <v-date-picker v-model="dates" @change="showTime"></v-date-picker>
        </v-menu>
      </v-col>
      <div class="col-6 text-right">
        <b-button v-b-modal.modal-1 variant="primary m-2"><i class="far fa-clock"></i
                > ลงเวลาเข้างาน</b-button>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <table class="table table-bordered  text-center" id="datatable">
          <thead>
            <th>ลำดับ</th>
            <th>ชื่อ</th>
            <th>เวลาเข้างาน</th>
            <th>เวลาออกงาน</th>
            <th>วันที่</th>
            <th>แก้ไข/ลบ</th>
          </thead>
          <tbody v-for="(time, index) in dataTime.data" :key="index">{{time.title}}
            <td>{{ index + 1 }}</td>
            <td>{{ time.nameuser }}</td>
            <td>{{ subtime(time.start_time) }} </td>
            <td>
              <template v-if="!time.end_time">
                <b-button
                  v-b-modal.modal-2
                  variant="rigth m-2"
                  @click.prevent="showcheckOut(time.id)"
                  ><i class="far fa-clock"></i
                ></b-button>
              </template>
              <template v-if="time.end_time">
                {{subtime (time.end_time) }}
              </template>
            </td>
            <td>{{ time.start_date | prettyDate }}</td>
            <td>
              <b-button
                v-b-modal.modal-3
                variant="warning m-1"
                @click.prevent="showEdit(time.id)"
                ><i class="fas fa-user-edit"></i></b-button
              >
              <button class="btn btn-danger" @click="deleteTime(time.id)">
              <i class="fas fa-trash-alt"></i>
              </button>
            </td>
          </tbody>
        </table>
          <pagination :data="dataTime" @pagination-change-page="showTime"></pagination>
        <b-modal
          ref="my-modal"
          id="modal-1"
          title="ลงเวลาเข้างาน"
          mt-2
          hide-footer
        >
          <!-- Check in -->
          <form @submit.prevent="checkinTime">
            <div class="form-group">
              <label>ชื่อ</label>
              <select class="form-control" v-model="name">
                <option
                  v-for="(user, index) in dataUser"
                  :key="index"
                  :value="user.id"
                >
                  {{ user.name }}
                </option>
              </select>
              <label>เวลาเข้างาน</label>
              <input type="time" class="form-control" v-model="checkIn" />

              <label>วันที่</label>
              <input type="date" class="form-control" v-model="date" />
            </div>
            <button type="submit" class="btn btn-primary">ตกลง</button>
          </form>
        </b-modal>
        <b-modal
          ref="my-modal"
          id="modal-2"
          title="เวลาออกงาน"
          mt-2
          hide-footer
        >
          <!-- Check out -->
          <form @submit.prevent="checkoutTime">
            <div class="form-group">
              <label>ชื่อ</label>
              <select class="form-control" v-model="name" disabled>
                <option
                  v-for="(user, index) in dataUser"
                  :key="index"
                  :value="user.id"
                >
                  {{ user.name }}
                </option>
              </select>
              <label>เวลาเข้างาน</label>
              <input
                type="time"
                class="form-control"
                v-model="checkIn"
                disabled
              />
               <label>เวลาออกงาน</label>
          <input type="time" class="form-control" v-model="checkOut" />
              <label>วันที่</label>
              <input type="date" class="form-control" v-model="date" disabled />
            </div>
            <button type="submit" class="btn btn-primary">ตกลง</button>
          </form>
        </b-modal>
        <b-modal
          ref="my-modal"
          id="modal-3"
          title="แก้ไข "
          mt-2
          hide-footer
        >
          <!-- edit -->
          <form @submit.prevent="editData">
            <div class="form-group">
              <label>ชื่อ</label>
              <select class="form-control" v-model="nameupdate">
                <option
                  v-for="(user, index) in dataUser"
                  :key="index"
                  :value="user.id"
                >
                  {{ user.name }}
                </option>
              </select>
              <label>เวลาเข้างาน</label>
              <input type="time" class="form-control" v-model="checkInupdate" />

              <label>เวลาออกงาน</label>
              <input type="time" class="form-control" v-model="checkOutupdate"  />
              <label>วันที่</label>
              <input type="date" class="form-control" v-model="dateupdate" />
            </div>
            <button type="submit" class="btn btn-primary">ยืนยัน</button>
          </form>
        </b-modal>
      </div>
    </div>
  </div>
</template>
<script>
import Swal from 'sweetalert2'
import axios from 'axios'
import moment from 'moment'
import { format, parseISO } from 'date-fns'
// const $ = require('jquery')
// const dt = require('datatables.net')(window, $)
// require('datatables.net-bs4')()
export default {
  computed: {
    computedDateFormattedMomentjs () {
      return this.dates ? moment(this.dates).format('dddd, MMMM Do YYYY') : ''
    },
    computedDateFormattedDatefns () {
      return this.dates ? format(this.dates, 'EEEE, MMMM do yyyy') : ''
    }
  },
  data () {
    return {
      // moment: moment,
      dates: format(parseISO(new Date().toISOString()), 'yyyy-MM-dd'),
      dataTime: {},
      name: null,
      checkIn: null,
      checkOut: null,
      date: null,

      nameupdate: null,
      checkInupdate: null,
      checkOutupdate: null,
      dateupdate: null,

      dataUser: [],
      selectedId: null
    }
  },
  methods: {
    showTime (page = 1) {
      const url = 'http://127.0.0.1:8000/time?page=' + page
      axios
        .get(url, {
          params: {
            keydates: this.dates
          }
        })
        .then((response) => {
          this.dataTime = response.data
          console.log('เวลาเข้างานของพนักงาน', response)
        })
    },
    showUser () {
      const url = 'http://127.0.0.1:8000/user'
      axios.get(url, {
        params: {
          from: 1
        }
      }).then((response) => {
        this.dataUser = response.data
        console.log('showUser', response)
      })
    },
    checkinTime () {
      const url = 'http://127.0.0.1:8000/time'
      axios
        .post(url, {
          user_id: this.name,
          checkin: this.checkIn,
          checkout: this.checkOut,
          date: this.date
        })
        .then((response) => {
          this.$refs['my-modal'].hide()
          this.showTime()
          this.reset()
          console.log('checkinTime', response)
          Swal.fire('สำเร็จ!', 'ลงเวลาเข้างานสำเร็จ', 'success')
        })
    },
    showcheckOut (id) {
      this.selectedId = id
      const url = 'http://127.0.0.1:8000/time/' + this.selectedId
      axios.get(url).then((response) => {
        this.name = response.data.user_id
        this.checkIn = response.data.start_time
        this.checkOut = response.data.end_time
        this.date = response.data.start_date
        console.log('showcheckOut', response)
      })
    },
    checkoutTime (id) {
      const url = 'http://127.0.0.1:8000/time/' + this.selectedId
      axios
        .put(url, {
          user_id: this.name,
          checkin: this.checkIn,
          checkout: this.checkOut,
          date: this.date
        })
        .then((response) => {
          this.$refs['my-modal'].hide()
          this.showTime()
          this.reset()
          console.log('checkoutTime', response)
          Swal.fire('สำเร็จ!', 'ลงเวลาออกงานสำเร็จ', 'success')
        })
    },
    showEdit (id) {
      this.selectedId = id
      const url = 'http://127.0.0.1:8000/time/' + this.selectedId
      axios.get(url).then((response) => {
        this.nameupdate = response.data.user_id
        this.checkInupdate = response.data.start_time
        this.checkOutupdate = response.data.end_time
        this.dateupdate = response.data.start_date
        console.log('showEdit', response)
      })
    },
    editData (id) {
      const url = 'http://127.0.0.1:8000/time/' + this.selectedId
      axios
        .put(url, {
          user_id: this.nameupdate,
          checkin: this.checkInupdate,
          checkout: this.checkOutupdate,
          date: this.dateupdate
        })
        .then((response) => {
          this.$refs['my-modal'].hide()
          this.showTime()
          this.reset()
          console.log('editData', response)
          Swal.fire('สำเร็จ!', 'แก้ไขข้อมูลสำเร็จ', 'success')
        })
    },
    deleteTime (id) {
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
          const url = 'http://127.0.0.1:8000/time/' + id
          axios.delete(url).then((response) => {
            this.dataTime = response.data
            this.showTime()
            console.log('deleteTime', response)
            Swal.fire('สำเร็จ!', 'คุณลบข้อมูลสำเร็จ', 'success')
          })
        }
      })
    },
    reset () {
      this.name = null
      this.checkIn = null
      this.checkOut = null
      this.date = null
    },
    subtime (mytime) {
      const subb = mytime.substr(0, 5)
      // console.log('subtime', mytime)
      return subb
    }
  },
  // mounted () {
  //   = $('#datatable').Datatable()
  // },
  created () {
    this.showTime()
    this.showUser()
  }
}
</script>
<style>
button {
  border-radius: 25px;
}
h2 {
    margin: 20px;
}
</style>
