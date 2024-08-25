import Mock from 'mockjs'

Mock.setup({
  timeout: '300-600'
})

// token
let token = ''
Mock.mock('/users/login', 'post', function(request){
  console.log(`%c request======${JSON.parse(request.body).email}`, "color:red");
  return Mock.mock({
      "errcode": 0,
      "errmsg": "ok",
      "token": function() {
        if(JSON.parse(request.body).email == 'huangrong@imooc.com'){
          token = 'huangrong'
          return 'huangrong'
        }else if(JSON.parse(request.body).email == 'hongqigong@imooc.com'){
          token = 'hongqigong'
          return 'hongqigong'
        }else{
          return ""
        }
      }
  })
})
Mock.mock('/users/infos', 'get', function(request,request1){
  console.log(`%c token=${token}`, "color:red");
  if(token == 'huangrong'){
    return {
      "errcode": 0,
          "errmsg": "infos success",
          "infos": {
        "name": "黄蓉",
            "permission": [
          "home",
          "sign",
          "exception",
          "apply"
        ],
            "_id": "62632f3f674b1e20c841aae2",
            "approver": [
          {
            "_id": "626c7236e0c7edf6ce507708",
            "name": "洪七公"
          }
        ],
            "head": "http://api.h5ke.top/uploads/62632f3f674b1e20c841aae2.png"
      }
    }
  }else if(token == 'hongqigong'){
    return {
      "errcode": 0,
      "errmsg": "infos success",
      "infos": {
        "name": "洪七公",
        "permission": [
          "home",
          "sign",
          "exception",
          "apply",
          "check"
        ],
        "_id": "626c7236e0c7edf6ce507708",
        "approver": [
          {
            "_id": "876d7136e0c9eaf62e503256",
            "name": "虚竹"
          }
        ],
        "head": "http://api.h5ke.top/uploads/626c7236e0c7edf6ce507708.png"
      }
    }
  }else{

  }
})

export default Mock;
