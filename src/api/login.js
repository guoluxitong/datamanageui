import request from '@/utils/request'
import qs from 'qs'
export function login(account, password, orgType) {

  return request({
    url: '/webapi/login',
    method: 'post',
    data:qs.stringify({ "loginId": account, "password": password,"orgType":orgType})
  })
}
