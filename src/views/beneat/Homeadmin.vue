<template>
  <div class="container">
    <v-tabs mt-5>
      <v-tab @click="allArray()">ปฎิทิน </v-tab>
      <div v-for="(team, index) in deparmentData" :key="index">
      <v-tab @click.prevent="allArray(team.id)"  @change="allArray(team.id)">{{team.name}}</v-tab>
      </div>
      </v-tabs>
  <!-- <v-tab-item> -->
   <v-row class="fill-height">
      <v-col>
        <v-sheet height="64">
          <v-toolbar flat>
            <v-btn fab text small color="grey darken-2" @click="prev">
              <v-icon small> mdi-chevron-left </v-icon>
            </v-btn>
            <v-btn fab text small color="grey darken-2" @click="next">
              <v-icon small> mdi-chevron-right </v-icon>
            </v-btn>
            <v-toolbar-title v-if="$refs.calendar">
              {{ $refs.calendar.title }}
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-menu bottom right>
              <template v-slot:activator="{ on, attrs }">
                <v-btn outlined color="grey darken-2" v-bind="attrs" v-on="on">
                  <span>{{ typeToLabel[type] }}</span>
                  <v-icon right> mdi-menu-down </v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item @click="type = 'day'">
                  <v-list-item-title>วัน</v-list-item-title>
                </v-list-item>
                <v-list-item @click="type = 'week'">
                  <v-list-item-title>สัปดาห์</v-list-item-title>
                </v-list-item>
                <v-list-item @click="type = 'month'">
                  <v-list-item-title>เดือน</v-list-item-title>
                </v-list-item>
                <v-list-item @click="type = '4day'">
                  <v-list-item-title>4 วัน</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-toolbar>
        </v-sheet>
        <v-sheet :height="750">
          <v-calendar
            ref="calendar"
            v-model="focus"
            color="primary"
            :events="all"
            :event-more="false"
            :event-color="getEventColor"
            :type="type"
            @click:event="showEvent"
            @click:more="viewDay"
            @click:date="viewDay"
            @change="updateRange"

          ></v-calendar>
          <v-menu
            v-model="selectedOpen"
            :close-on-content-click="false"
            :activator="selectedElement"
            offset-x
          >
            <v-card color="grey lighten-4" min-width="350px" flat>
              <v-toolbar :color="selectedEvent.color" dark>
                <v-btn icon>
                  <!-- <v-icon>mdi-pencil</v-icon> -->
                </v-btn>
                <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon>
                  <!-- <v-icon>mdi-heart</v-icon> -->
                </v-btn>
                <v-btn icon>
                  <!-- <v-icon>mdi-dots-vertical</v-icon> -->
                </v-btn>
              </v-toolbar>
              <v-card-text>
                <span v-html="selectedEvent.details"></span>
              </v-card-text>
              <v-card-actions>
                <v-btn color="error" @click="selectedOpen = false">
                  ปิด
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-menu>
        </v-sheet>
      </v-col>
    </v-row>
  <!-- </v-tab-item> -->

  </div>
</template>
<script>
import axios from 'axios'
import { mapState } from 'vuex'
export default {
  data: () => ({
    focus: '',
    type: 'month',
    typeToLabel: {
      month: 'Month',
      week: 'Week',
      day: 'Day',
      '4day': '4 Days'
    },
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    arrayData: [],
    arrayHoliday: [],
    all: [],
    deparmentData: [],
    events: [],
    colors: [
      'red',
      'blue',
      'indigo',
      'deep-purple',
      'cyan',
      'green',
      'orange',
      'grey darken-1'
    ],
    name: [
      'Meeting',
      'Holiday',
      'PTO',
      'Travel',
      'Event',
      'Birthday',
      'Conference',
      'Party'
    ]
  }),
  mounted () {
    this.$refs.calendar.checkChange()
  },
  computed: {
    ...mapState({
      admin: (state) => state.admin.dataAdmin
    })
  },
  methods: {
    viewDay ({ date }) {
      this.focus = date
      this.type = 'day'
    },
    getEventColor (event) {
      return event.color
    },
    setToday () {
      this.focus = ''
    },
    prev () {
      this.$refs.calendar.prev()
    },
    next () {
      this.$refs.calendar.next()
    },
    showEvent ({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event
        this.selectedElement = nativeEvent.target
        setTimeout(() => {
          this.selectedOpen = true
        }, 10)
      }

      if (this.selectedOpen) {
        this.selectedOpen = false
        setTimeout(open, 10)
      } else {
        open()
      }

      nativeEvent.stopPropagation()
    },
    async updateRange (deparmentId = null) {
      const url = 'http://127.0.0.1:8000/calendar?deparmentId=' + deparmentId
      const dataCalendar = await axios.get(url, {
        params: {
          id: deparmentId
        }
      })
      this.arrayData = dataCalendar.data
      console.log('วันลา', this.arrayData)
      const events = []
      for (let i = 0; i < this.arrayData.calendarleave.length; i++) {
        events.push({
          name:
            this.arrayData.calendarleave[i].nameuser +
            ' ' +
            this.arrayData.calendarleave[i].leave_type,
          start: this.arrayData.calendarleave[i].start_date,
          end: this.arrayData.calendarleave[i].end_date,
          color: this.colors[this.rnd(1, this.colors.length - 1)]
          // timed: !allDay
        })
      }
      this.events = events
      return Promise.resolve(events)
    },
    async holiday (deparmentId = null) {
      const url = 'http://127.0.0.1:8000/holiday?deparmentId=' + deparmentId
      const dataHoliday = await axios.get(url, {
        params: {
          from: 1
        }
      })
      this.arrayHoliday = dataHoliday.data
      console.log('วันหยุด', this.arrayHoliday)
      const events = []
      for (let i = 0; i < this.arrayHoliday.dataHoliday.length; i++) {
        events.push({
          name:
          this.arrayHoliday.dataHoliday[i].name,
          start: this.arrayHoliday.dataHoliday[i].start_date,
          end: this.arrayHoliday.dataHoliday[i].end_date,
          // color: this.colors[this.rnd(0, this.colors.length - 1)]
          color: this.colors[0]
          // timed: !allDay
        })
      }
      this.events = events
      return Promise.resolve(events)
    },
    rnd (a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a
    },
    async allArray (deparmentId) {
      console.log('แผนกไอดี', deparmentId)
      if (deparmentId) {
        const leave = await this.updateRange(deparmentId)
        this.all = leave
        console.log('วันลาของแผนก', this.all)
      } else {
        const leave = await this.updateRange()
        const holiday = await this.holiday()
        this.all = holiday.concat(leave)
        console.log('รวมวันลาวันหยุด', this.all)
      }
    },
    showDeparment () {
      const url = 'http://127.0.0.1:8000/deparment'
      axios
        .get(url, {
          params: {
            from: 1
          }
        }).then((response) => {
          this.deparmentData = response.data
          console.log('แผนก', response)
        })
    }
  },
  created () {
    this.allArray()
    this.showDeparment()
  }

}
</script>
<style>
.v-card__subtitle {
  padding: 2px;
}
.v-card__text {
  padding: 2px;
  text-align: right
}
.v-card__title {
  padding: 2px;
}
.v-card__subtitle, .v-card__text, .v-card__title {
    padding: 1px;
    display: none;
}
</style>
