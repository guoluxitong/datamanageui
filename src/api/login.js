import request from '@/utils/request'


export function login(account, password, orgType) {
  return request({
    url: '/webapi/login',
    method: 'post',
    data: {"loginId":account, "password":password,"orgType":orgType}
  })
}
//data: {"loginId":account, "password":password,"orgType":orgType} 
//"loginId="+account+ "&password="+password+"&orgType="+orgType
//"loginId:"+account+ "\r\npassword:"+password+"\r\norgType:"+orgType+"\r\naa"