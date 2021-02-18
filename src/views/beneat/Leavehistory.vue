<template>
    <div class="container">
      <div class="row">
        <h2>ประวัติการลา</h2>
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
            label="ดูประวัติตามเดือน"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="date" @change="showLeavehistory"
          type="month"
          title="date"
          scrollable
          locale="th"
        >
          <v-spacer></v-spacer>
          <!-- <v-btn
            text
            color="primary"
            @click="menu = false"
          >
            Cancel
          </v-btn> -->
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
     <div class="col d-flex justify-content-end ">
           <form class="form-inline">
          <input
            class="form-control mr-sm-2"
            placeholder="ค้นหา.."
            v-model="search"
          />
           <b-button  variant="success "  @click.prevent="showLeavehistory"><i class="fas fa-search"></i></b-button>
         </form>
      </div>
  </v-row>
      <div class="table-responsive">
           <table class="table table-bordered  text-center">
            <thead>
              <tr>
                <th>ลำดับ</th>
                <th scope="col">ชื่อ</th>
                <th scope="col">วันเริ่มต้น</th>
                <th scope="col">วันสิ้นสุด</th>
                <th scope="col">ประเภทการลา</th>
                <th scope="col">เหตุผล</th>
                <th scope="col">สถานะ</th>
                <th scope="col">ผู้อนุมัติ</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(history, index) in myHistory.data" :key="index">{{history.title}}
                <td>{{ index + 1 }}</td>
                <td>{{ history.nameuser }}</td>
                <td>
                  <span v-if="history">
                    {{ history.start_date | prettyDate  }}
                  </span>
                </td>
                <td>
                  <span v-if="history">
                    {{ history.end_date ? history.end_date : history.start_date | prettyDate }}
                  </span>
                </td>
                <td>{{ history ? history.leave_type : '' }}</td>
                <td>{{ history ? history.leave_description : '' }}</td>
                <td>
                  <template
                    v-if="history && history.leave_status == 'อนุมัติ'"
                  >
                    <span
                      v-html="$options.filters.statusColor('อนุมัติ')"
                    ></span>
                  </template>
                  <template v-else>
                    <span
                      v-html="$options.filters.statusColor('ไม่อนุมัติ')"
                    ></span>
                  </template>
                </td>
                <td>{{ history ? history.nameadmin : '' }}</td>
              </tr>
            </tbody>
          </table>
      </div>
       <pagination :data="myHistory" @pagination-change-page="showLeavehistory"></pagination>
    </div>
</template>
<script>
import axios from 'axios'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      myHistory: {},
      search: null,
      menu: false,
      date: new Date().toISOString().substr(0, 7)

    }
  },
  computed: {
    ...mapState({
      admin: (state) => state.admin.dataAdmin
    })
  },
  methods: {
    showLeavehistory (page = 1) {
      const url = 'http://127.0.0.1:8000/leavehistory?page=' + page
      axios
        .get(url, {
          params: {
            keyword: this.search,
            keymonthyear: this.date
          }
        })
        .then((response) => {
          this.myHistory = response.data
          console.log('showLeavehistory', response.data)
          console.log('keymonth', this.date)
        })
    }
    // ,
    // subyear (myyear) {
    //   const year = myyear.substr(0, 3)
    //   return year
    // },
    // submonth (mymonth) {
    //   const year = mymonth.substr(5, 1)
    //   return year
    // }
  },
  created () {
    this.showLeavehistory()
  }
}
</script>
<style scope>
@media only screen and (min-width: 600px){

}
</style>
