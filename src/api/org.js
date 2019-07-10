import request from '@/utils/request'
import qs from 'qs'
export function orglist(query) {
  return request({
    url: '/webapi/datacenter/org/list',
    method: 'get',
    params: query
  })
}
export function editorg(data) {
  console.log(data)
    return request({
        url: '/webapi/datacenter/org/modify',
        method: 'post',
        data:qs.stringify(data)
    })
}
export function create(data) {
  return request({
    url: '/webapi/datacenter/org/create',
    method: 'post',
    data:qs.stringify(data)
  })
}
