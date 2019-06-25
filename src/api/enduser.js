import request from '@/utils/request'

export function enduserlist(query) {
  return request({
    url: '/enduser/enduserlist',
    method: 'get',
    params: query
  })
}


export function editenduser(data) {
    return request({
        url: '/enduser/editenduser',
        method: 'post',
        data:data
    })
}

