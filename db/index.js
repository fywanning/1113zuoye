const mysql=require('mysql')

let connection=mysql.connection({
  host:'127.0.0.1',
  user:'root',
  password:'root',
  port:'3006',
  database:'1705b-userlist'
})

connection.connect((error)=>{
  if(error){
    console.log('连接失败')
  }
  else{
    console.log('连接成功')
  }
})
module.exports=connection