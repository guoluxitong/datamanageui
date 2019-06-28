import request from '@/utils/request'

export function agentlist(query) {
  return request({
    url: 'webapi/datacenter/agent',
    method: 'get',
    params: query
  })
}


export function editagent(data) {
    return request({
        url: '/agent/editagent',
        method: 'post',
        data:data
    })
}

