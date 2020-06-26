// pages/register/register.js
let app = getApp();
// 获取数据库引用
wx.cloud.init();
const db = wx.cloud.database();
const userListDB = db.collection('zdinfo');

let name = null;
let password = null;
let phone = null;
let address = null;
Page({
 /**
  * 页面的初始数据
  */
 data: {

 },
 //输入用户名
 inputName(evnet) {
  name = evnet.detail.value;
 },
 //输入密码
 inputPassword(evnet) {
  password = evnet.detail.value;
 },
 //输入手机号
 inputPhone(evnet) {
  phone = evnet.detail.value;
 },
 //输入地址
 inputAddress(evnet) {
  address = evnet.detail.value;
 },
 //注册
  register(){ 
    let that = this;
    let flag = false  //是否存在 true为存在
    //查询用户是否已经注册
    userListDB.get({
      success:(res)=> {
        let userListDBs = res.data;  //获取到的对象数组数据
      //  console.log(userListDB);
        for (let i=0; i<userListDBs.length; i++){  //遍历数据库对象集合
          if (name === userListDBs[i].name){ //用户名存在
            flag = true;
         //   break;
          }
        }
        if(flag === true){    //已注册
          wx.showToast({
          title: '账号已注册！',
          icon: 'success',
          duration: 2500
          })
        }else{  //未注册
          that.saveuserinfo()
        }
      }
    })
  },
  //注册用户信息
  saveuserinfo() {
   // let that = this;
    userListDB.add({  //添加数据
      data:{
        name: name,
        password: password,
        phone: phone,
        address: address
      }
    }).then(res => {
      console.log('注册成功！')
      wx.showToast({
        title: '注册成功！',
        icon: 'success',
        duration: 3000
      })
      wx.redirectTo({
        url: '/pages/login/login',
      })
    })
  },

})
