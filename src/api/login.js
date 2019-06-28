import request from '@/utils/request'
export function login(account, password, orgType) {
  return request({
    url: '/webapi/login',
    method: 'post',
    data:{ "loginid": account, "password": password,"orgtype":orgType()}
  })
}
