// pages/login/login.js
let app = getApp();
// 获取数据库引用
const db = wx.cloud.database();
const userListDB = db.collection('zdinfo');

let name = null;
let password = null;
Page({

 data: {
 },

 //输入用户名
 inputName(evnet) {
  console.log(evnet.detail.value)
  name = evnet.detail.value;
 },
 //输入密码
 inputPassword(evnet) {
  password = evnet.detail.value;
 },
 //登陆
 login(){
  let that = this;
  //登陆获取用户信息
  userListDB.get({
    success:(res)=>{
      let user = res.data;
     // console.log(res.data);
      for (let i = 0; i < user.length; i++) {  //遍历数据库对象集合
        if (name === user[i].name) { //用户名存在
          if (password !== user[i].password) {  //判断密码是否正确
            wx.showToast({
              title: '密码错误！！',
              icon: 'false',
              duration: 2500
            })
          } else {
            console.log('登陆成功！')
            wx.showToast({
              title: '登陆成功！！',
              icon: 'success',
              duration: 2500
            })
            wx.navigateTo({   //跳转首页
              url: '/pages/index/index',  //这里的URL是你登录完成后跳转的界面
            })
          }
        }else{   //不存在
          wx.showToast({
            title: '登陆成功！！',
            icon: 'success',
            duration: 2500
          })
        }
      }
    }
  })
},


register(){
  wx.navigateTo({
    url: '/pages/register/register'
  })
},
})
