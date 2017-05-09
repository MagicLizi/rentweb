/**
 * Created by magiclizi on 2017/4/20.
 */
import React from 'react';
import {connect} from 'dva';
import {getVerifyCode,bind} from '../services/user';
import UserInfoCSS from './userInfo.css';
import {setCurPath} from '../models/path';
import {urlDomain} from '../utils/request';
class BindMobile extends React.Component{

  constructor(){
    super();
    this.state = {
      mobile:'',
      verifyCode:'',
      verifyTime:-1,
    }
  }

  componentWillMount() {
    setCurPath('/rent');
  }

  getVerifyCode(){
    if(this['state'].verifyTime<0){
      if(this['state'].mobile.length === 11){
        getVerifyCode(this['state'].mobile).then(data=>{
          console.log(data);
          if(data){
            this.setState({verifyTime:60});
            setTimeout(()=>{
              this.startTimer();
            },50);
          }
          else{

          }
        })
      }
      else{
        alert('请输入11位手机号码！');
      }
    }
  }

  startTimer(){
    this.vtimer&&clearInterval(this.vtimer);
    this.vtimer = setInterval(()=>{
      var verifyTime = this['state'].verifyTime;
      verifyTime = verifyTime - 1;
      if(verifyTime<0){
        this.vtimer&&clearInterval(this.vtimer);
      }
      this.setState({verifyTime:verifyTime});
    },1000);
  }

  componentWillUnmount() {
    this.vtimer&&clearInterval(this.vtimer);
  }

  bind(){
    bind(this.state.mobile,this.state.verifyCode).then(result=>{
      if(result){
        // this.vtimer&&clearInterval(this.vtimer);
        alert('绑定成功');
        window.location = `${urlDomain}/rent`;
      }
    })
  }

  render(){

    var verifyMsg = '发送验证码';
    if(this['state'].verifyTime>0){
      verifyMsg = `${this['state'].verifyTime}秒后重发`;
    }
    return(
      <div className = {UserInfoCSS['loginContainer']}>

        <span style = {{color:'red',textAlign:'center',marginTop:'6vh',width:'80vw',marginBottom:'3vh'}}>
          为了防止盗窃事件的发生，我们需要登记您的手机号，请见谅！</span>

        <div className = {UserInfoCSS['inputContainer']} style = {{marginTop:25}}>
          <span className = {UserInfoCSS['title']}>手机号</span>
          <div className = {UserInfoCSS['verifyContainer']}>
            <input className = {UserInfoCSS['halfinput']}
                   type = "tel"
                   maxLength = {11}
                   title = '手机号码'
                   onChange = {(e)=>{this.setState({mobile:e.target.value})}}
                   placeholder = '请输入您的手机号码'/>
            <div onClick={()=>{
              this.getVerifyCode()
            }} className = {UserInfoCSS['getverify']}>
              <span className = {UserInfoCSS['textGetVer']}>{verifyMsg}</span>
            </div>
          </div>
          <div className={UserInfoCSS['line']}/>
        </div>

        <div className = {UserInfoCSS['inputContainer']} style = {{marginTop:15}}>
          <span className = {UserInfoCSS['title']}>验证码</span>
          <input className = {UserInfoCSS['input']}
                 type = "text"
                 maxLength = {6}
                 onChange = {(e)=>{this.setState({verifyCode:e.target.value})}}
                 placeholder = '请输入您的验证码'/>
          <div className={UserInfoCSS['line']}/>
        </div>

        <div onClick={()=>{this.bind()}} className = {UserInfoCSS['goInBtn']}>
          <span style = {{color:'white',fontSize:15}}>确定</span>
        </div>
      </div>
    )
  }
}


export default connect()(BindMobile)
