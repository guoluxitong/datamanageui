import request from '@/utils/request'
import qs from 'qs'
export function change(orgUser) {
  console.log(orgUser)
  return request({
    url: '/webapi/datacenter/boiler/user/change',
    method: 'post',
    data: orgUser
  })
}

