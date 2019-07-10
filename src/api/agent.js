import request from '@/utils/request'
import qs from 'qs'
export function agentlist(query) {
  return request({
    url: '/webapi/datacenter/agent/list',
    method: 'get',
    params: query
  })
}
export function editagent( data) {
    return request({
        url: '/webapi/datacenter/agent/modify',
        method: 'post',
        data:qs.stringify(data)
    })
}
export function create(data) {
  return request({
    url: '/webapi/datacenter/agent/create',
    method: 'post',
    data:qs.stringify(data)
  })
}
