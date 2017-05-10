import React from 'react';
import { connect } from 'dva';
import rentPageCss from './RentPage.css';
import {setCurPath} from '../models/path';
import {openInRenting} from '../services/action';
import {getBoxOpenState} from '../services/user';
import TitleLoading from '../components/TitleLoading';
class RepayNewPage extends React.Component {
  constructor(){
    super();
    this.state = {
      showloading:false,
      openBox:false,
      orderInfo:null
    }
  }

  componentWillMount() {
    setCurPath('/repayNewPage');

    this.props.getCurRentInfo(()=>{
      if(this.props.curRentInfo){
        //打开租赁中的箱子
      }
    });
  }

  open(){
    this.setState({showloading:true});
    //开门
    openInRenting().then(result=>{
      if(result){
        this.beginGetState();
      }
    })
  }

  beginGetState(){
    var chestLogicId = this.props.curRentInfo.chestLogicId;
    var boxId = this.props.curRentInfo.boxId;
    alert(chestLogicId + '_' +boxId);
    this.timer&&clearInterval(this.timer);
    this.timer = setInterval(()=>{
      getBoxOpenState(chestLogicId,boxId).then(result=>{
        if(result['openState'] === 1){
          this.timer&&clearInterval(this.timer);
          this.setState({showloading:false});
          alert('开门完成，请于放入篮球后关闭，如果柜门没有打开，请联系客服！');
        }
      })
    },3000);
  }

  render(){
    return (
      <div className = {rentPageCss['container']}>
        {this.renderAction()}
        {this.renderLoading()}
      </div>
    );
  }

  renderLoading(){
    if(this.state.showloading){
      return(
        <TitleLoading title = '开门中，请稍后。。。'/>
      )
    }
  }

  goPay(){

  }

  renderAction(){
    if(this.props.curRentInfo){
      if(this.state.openBox){
        return(
          <div className = {rentPageCss['bg']}
               style = {{backgroundImage:'url(http://rentservice.b0.upaiyun.com/repaynew1.jpg!w640)'}}>
            <div onClick={()=>{this.closeWeb()}} className = {rentPageCss['ball']}/>
          </div>
        )
      }
      else{

        var duration = this.state.orderInfo?this.state.orderInfo.duration:0;
        var orderPrice = this.state.orderInfo?(this.state.orderInfo['orderPrice']/100).toFixed(2):0;

        return(
          <div className = {rentPageCss['bg']}
               style = {{backgroundImage:'url(http://rentservice.b0.upaiyun.com/repay.jpeg!w640)'}}>
          <span style = {{fontSize:25,color:'white'}}>
            您本次租用时长：{duration} 分钟
          </span>
            <span style = {{fontSize:25,color:'white',marginBottom:'24vh'}}>
            费用共计：{orderPrice}元
          </span>
            <div onClick={()=>{this.setState({openBox:true});this.open();}} className = {rentPageCss['ball']}/>
          </div>
        )
      }
    }
    else{
      return(
        <div className = {rentPageCss['bg']}
             style = {{backgroundImage:'url(http://rentservice.b0.upaiyun.com/openRentingError.jpg!w640)'}}>
          <div onClick={()=>{this.closeWeb()}} className = {rentPageCss['ball']}/>
        </div>
      )
    }
  }

  closeWeb(){
    WeixinJSBridge.invoke('closeWindow',{},function(res){

    });
  }

  componentWillUnMount() {
    this.timer&&clearInterval(this.timer);
  }
}

RepayNewPage.propTypes = {

};

var mapStateToProps = function(state){
  return state['user'];
}

var mapDispathchToProps = function(dispatch){
  return{
    getCurRentInfo:(callback)=>{
      dispatch({type:'user/getCurRentInfo',callback:callback})
    },
  }
}

export default connect(mapStateToProps,mapDispathchToProps)(RepayNewPage);
