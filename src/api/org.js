import request from '@/utils/request'

export function orglist(query) {
  return request({
    url: '/org/orglist',
    method: 'get',
    params: query
  })
}
export function editorg(data) {
    return request({
        url: '/org/editorg',
        method: 'post',
        data:data
    })
}

