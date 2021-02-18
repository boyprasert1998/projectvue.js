import Vue from 'vue'
import moment from 'moment'

Vue.filter('capitalize', (value) => {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})
Vue.filter('currency', (value) => {
  value = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return value + ' THB'
})
Vue.filter('productStatus', (value) => {
  let html
  switch (value) {
    case 'new':
      html = '<span class="badge badge-info">New</span>'
      break
    case 'failed':
      html = '<span class="badge badge-denger">Failed</span>'
      break
    case 'success':
      html = '<span class="badge badge-success">Success</span>'
      break
    case 'panding':
      html = '<span class="badge badge-warning">Panding</span>'
      break
    case 'cancel':
      html = '<span class="badge badge-secondary">Cancel</span>'
      break
  }
  return html
})

Vue.filter('prettyDate', (value) => {
  if (!value) {
    return ''
  }
  const NewDateTime = moment(value).format('LL')
  // ('D MMM YYYY - h:mm:ss')
  return NewDateTime
})
Vue.filter('Color', (value) => {
  let html
  if (value === 'new') {
    html = '<span class="badge badge-success">New</span>'
  } else if (value === 'hot') {
    html = '<span class="badge badge-danger">Hot</span>'
  } else {
  }
  return html
})
Vue.filter('statusColor', (value) => {
  let html
  if (value === 'อนุมัติ') {
    html = '<span class="badge badge-success">อนุมัติ</span>'
  } else if (value === 'ไม่อนุมัติ') {
    html = '<span class="badge badge-danger">ไม่อนุมัติ</span>'
  } else {
    html = '<span class="badge badge-warning">รออนุมัติ</span>'
  }
  return html
})

export default {}
