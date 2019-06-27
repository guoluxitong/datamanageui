import request from '@/utils/request'

export function enterprisecodelist(query) {
  return request({
    url: '/enterprisecode/enterprisecodelist',
    method: 'get',
    params: query
  })
}


export function editenterprisecode(data) {
    return request({
        url: '/enterprisecode/editenterprisecode',
        method: 'post',
        data:data
    })
}

