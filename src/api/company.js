import request from '@/utils/request'

export function companylist(query) {
  return request({
    url: '/company/companylist',
    method: 'get',
    params: query
  })
}


export function editcompany(data) {
    return request({
        url: '/company/editcompany',
        method: 'post',
        data:data
    })
}

