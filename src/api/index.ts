import http from "@/utils/request"
export  const getUsers = ()=> http({
  url:'/api/users',
  method:'get'
})
