<template>
  <div class="container">
    <div class="row mt-3">
        <h2>จัดการวันหยุด</h2>
      </div>
       <v-row>
      <v-col
      cols="11"
      sm="5"
    >
      <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        :return-value.sync="date"
        transition="scale-transition"
        offset-y
        max-width="290px"
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="date"
            label="ดูประวัติตามเดือน,ปี"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="date" @change="showHoliday"
          type="month"
          title="date"
          scrollable
          locale="th"
        >
          <v-spacer></v-spacer>
          <v-btn
            text
            color="primary"
            @click="$refs.menu.save(date)"
          >
            OK
          </v-btn>
        </v-date-picker>
      </v-menu>
    </v-col>
      <div class="col d-flex justify-content-end">
        <b-button v-b-modal.modal-1 variant="primary m-2">
          <i class="fas fa-plus-square"></i> เพิ่มวันหยุด
        </b-button>
        <!-- <b-button variant="primary m-2">
          <a target="_blank" href="http://127.0.0.1:8000/export"><i class="fas fa-download"></i> Export</a>
        </b-button> -->
      </div>
       </v-row>
    <div class="row">
      <div class="col mt-5">
        <table class="table table-bordered text-center">
          <thead>
            <th>ลำดับ</th>
            <th>ชื่อวันหยุด</th>
            <th>วันเริ่มต้น</th>
            <th>วันสิ้นสุด</th>
            <th>แก้ไข/ลบ</th>
          </thead>
          <tbody v-for="(holiday, index) in dataHoliday.data" :key="index">
            {{holiday.title}}
            <td>{{ index + 1 }}</td>
            <td>{{ holiday.name }}</td>
            <td>{{holiday.start_date| prettyDate }}</td>
            <td>
              <span v-if="holiday">
                {{ holiday.end_date ? holiday.end_date : holiday.start_date | prettyDate }}
              </span>
              </td>
            <td>
              <b-button
                v-b-modal.modal-2
                variant="warning m-1"
                @click.prevent="showUpdate(holiday.id)"
                ><i class="fas fa-user-edit"></i
              ></b-button>
              <button class="btn btn-danger" @click="deleteHoliday(holiday.id)">
                <i class="fas fa-trash-alt"></i>
              </button>
            </td>
          </tbody>
        </table>
         <pagination :data="dataHoliday" @pagination-change-page="showHoliday"></pagination>
        <b-modal
          ref="my-modal"
          id="modal-1"
          title="เพิ่มวันหยุด"
          mt-2
          hide-footer
        >
          <form @submit.prevent="addHoliday">
            <div class="form-group">
              <label>ชื่อวันหยุด </label>
              <input type="text" class="form-control" v-model="nameholiday" />
              <label for="day">จำนวนวัน</label><br />
              <input type="radio" value="วันเดียว" v-model="day" />
              วันเดียว<br />
              <input type="radio" value="หลายวัน" v-model="day" /> หลายวัน
              <br />
              <div v-if="day">
                <div v-if="day === 'วันเดียว'">
                  <b-form-datepicker
                    id="example-datepicker"
                    v-model="datepicker"
                    class="mb-2"
                  ></b-form-datepicker>
                </div>
                <div v-else>
                  <b-form-datepicker
                    id="example-datepicker"
                    v-model="datepicker"
                    class="mb-2"
                  ></b-form-datepicker>
                  ถึง
                  <b-form-datepicker
                    id="example-datepicker"
                    v-model="datepicker1"
                    class="mb-2"
                  ></b-form-datepicker>
                </div>
              </div>
            </div>
            <button type="submit" class="btn btn-primary">เพิ่มวันหยุด</button>
          </form>
        </b-modal>
        <!-- edit  -->
        <b-modal
          ref="my-modal"
          id="modal-2"
          title="แก้ไขวันหยุด"
          mt-2
          hide-footer
        >
          <form @submit.prevent="editHoliday">
            <div class="form-group">
              <label>ชื่อวันหยุด </label>
              <input type="text" class="form-control" v-model="nameholidayupdate" />
              <label for="day">จำนวนวัน</label><br />
              <input
                type="radio"
                value="วันเดียว"
                v-model="dayupdate"
              />วันเดียว<br />
              <input type="radio" value="หลายวัน" v-model="dayupdate" />หลายวัน <br />
              <div v-if="dayupdate">
                <div v-if="dayupdate === 'วันเดียว'">
                  <b-form-datepicker
                    id="example-datepicker"
                    v-model="datepickerupdate"
                    class="mb-2"
                  ></b-form-datepicker>
                </div>
                <div v-else>
                  <b-form-datepicker
                    id="example-datepicker"
                    v-model="datepickerupdate"
                    class="mb-2"
                  ></b-form-datepicker>
                  to
                  <b-form-datepicker
                    id="example-datepicker"
                    v-model="datepicker1update"
                    class="mb-2"
                  ></b-form-datepicker>
                </div>
              </div>
            </div>
            <button type="submit" class="btn btn-primary">แก้ไขข้อมูล</button>
          </form>
        </b-modal>
      </div>
    </div>
  </div>
</template>
<script>
import Swal from 'sweetalert2'
import axios from 'axios'
export default {
  data () {
    return {
      dataHoliday: {},
      nameholiday: null,
      day: null,
      datepicker: null,
      datepicker1: null,
      selectedId: null,

      nameholidayupdate: null,
      dayupdate: null,
      datepickerupdate: null,
      datepicker1update: null,

      menu: false,
      date: new Date().toISOString().substr(0, 7)
    }
  },
  methods: {
    excel () {
      const url = 'http://127.0.0.1:8000/excel'
      axios.get(url).then((response) => {
        console.log('excel', response)
      })
    },
    showHoliday (page = 1) {
      const url = 'http://127.0.0.1:8000/holiday?page=' + page
      axios
        .get(url, {
          params: {
            keymonthyear: this.date
          }
        }).then((response) => {
          this.dataHoliday = response.data.dataHoliday
          console.log('showHoliday', response)
        })
    },
    addHoliday () {
      const url = 'http://127.0.0.1:8000/holiday'
      axios
        .post(url, {
          nameholiday: this.nameholiday,
          day: this.day,
          datepicker: this.datepicker,
          datepicker1: this.datepicker1
        })
        .then((response) => {
          this.$refs['my-modal'].hide()
          this.showHoliday()
          this.reset()
          Swal.fire('สำเร็จ!', 'เพิ่มวันหยุดสำเร็จ', 'success')
          console.log('addHoliday', response)
        })
    },
    showUpdate (id) {
      this.selectedId = id
      const url = 'http://127.0.0.1:8000/holiday/' + this.selectedId
      axios.get(url).then((response) => {
        this.nameholidayupdate = response.data.name
        this.dayupdate = response.data.day
        this.datepickerupdate = response.data.start_date
        this.datepicker1update = response.data.end_date
        console.log('showUpdate', response)
      })
    },
    editHoliday (id) {
      const url = 'http://127.0.0.1:8000/holiday/' + this.selectedId
      axios
        .put(url, {
          nameholiday: this.nameholidayupdate,
          day: this.dayupdate,
          datepicker: this.datepickerupdate,
          datepicker1: this.datepicker1update
        })
        .then((response) => {
          this.$refs['my-modal'].hide()
          this.showHoliday()
          this.reset()
          console.log('editHoliday', response)
          Swal.fire('สำเร็จ!', 'แก้ไขข้อมูลสำเร็จ', 'success')
        })
    },
    deleteHoliday (id) {
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
          const url = 'http://127.0.0.1:8000/holiday/' + id
          axios.delete(url).then((response) => {
            this.showHoliday()
            console.log('delete', response)
            Swal.fire('สำเร็จ!', 'คุณลบข้อมูลสำเร็จ', 'success')
          })
        }
      })
    },
    reset () {
      this.nameholiday = null
      this.day = null
      this.datepicker = null
      this.datepicker1 = null
    }
  },
  created () {
    this.showHoliday()
  }
}
</script>
<style scoped>
.v-application a {
    text-decoration: none !important;
    color: white !important;
}
button.btn.btn-primary.m-2 {
    height: 60%;
}
</style>
