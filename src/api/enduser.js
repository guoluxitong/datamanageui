import request from '@/utils/request'
import qs from 'qs'
export function enduserlist(query) {
  return request({
    url: '/webapi/datacenter/enduser/list',
    method: 'get',
    params: query
  })
}


export function editenduser(data) {
    return request({
        url: '/webapi/datacenter/enduser/modify',
        method: 'post',
        data:qs.stringify(data)
    })
}

export function create(data) {
  return request({
    url: '/webapi/datacenter/enduser/create',
    method: 'post',
    data:qs.stringify(data)
  })
}
