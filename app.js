const Koa=require('koa')
const app=new Koa()
const static=require('koa-static')
const path=require('path')
const bodyparser=require('koa-bodyparser')
const router=require('koa-router')()
const query=require('./db/query')

app.use(static(path.join(process.cwd(),'public')))
app.use(bodyparser())
app.use(router.routes(),router.allowedMethods())

router.get('/list',async ctx=>{
  let data=await query('select * from perse')
  if(data.msg==='error'){
    ctx.body={
      code:0,
      msg:error
    }
  }
  else{
    ctx.body={
      code:1,
      data
    }
  }
})

router.post('/add',async ctx=>{
  let {name,content,time}=ctx.request.body
  if(name&&content&&time){
    let userData=await query('select * from perse where name=?',[name])
    if(userData.data.length){
      ctx.body={
        code:3,
        msg:'此人已存在'
      }
    }
    else{
      let time=new Date();
      try{
        await query('insert into perse (name,content,time) values (?,?,?)',[name,content,time])
        ctx.body={
          code:1,
          msg:'添加成功'
        }
      }catch(e){
        ctx.body={
          code:0,
          msg:e.error
        }
      }
    }
  }
  else{
    ctx.body={
      code:2,
      msg:'缺失参数'
    }
  }
})

router.get('/del',async ctx=>{
  let {id}=ctx.query
  if(id||id===0){
    try{
      await auery('delete from perse where id=?',[id])
      ctx.body={
        code:1,
        msg:'删除成功'
      }
    }catch(e){
      ctx.body={
        code:0,
        msg:e.error
      }
    }
  }
  else{
    ctx.body={
      code:2,
      msg:'缺失参数'
    }
  }
})
router.post('edit',async ctx=>{
  let {name,content,time}=ctx.request.body
  if(name&&content&&time&&id){
    try{
      let time=new Date()
      await query('update perse set name=?,content=?,time=?',[name,content,time])
      ctx.body={
        code:1,
        msg:'修改成功'
      }
    }catch(e){
      ctx.body={
        code:0,
        msg:e.error
      }
    }
  }
  else{
    ctx.body={
      code:2,
      msg:'丢失参数'
    }
  }
})
app.listen(process.env.PORT||3000,()=>{
  console.log('服务器启动成功')
})