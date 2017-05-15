import React from 'react';
import { connect } from 'dva';
import rentPageCss from './RentPage.css';
import {setCurPath} from '../models/path';
// import {openInRenting} from '../services/action';
import Loading from '../components/Loading';
import {getBoxOpenState,getRentFee,payRecharge,tryRepay} from '../services/user';
import TitleLoading from '../components/TitleLoading';
class RepayNewPage extends React.Component {
  constructor(){
    super();
    this.state = {
      showloading:false,
      showCloseloading:false,
      openBox:true,
      orderInfo:null,
      pressLock:true
    }
  }

  componentWillMount() {
    setCurPath('/repayNewPage');

    this.props.getCurRentInfo(()=>{
      if(this.props.curRentInfo){
        //开门
        alert('点击确认后柜门会自动打开，请将篮球放入后关好柜门并且前往结算！');
        this.open();
      }
    });
  }

  open(){
    //开门并且标记状态
    tryRepay().then(result=>{
      this.setState({showloading:true});
    })
  }

  beginGetState(callback){
    var chestLogicId = this.props.curRentInfo.chestLogicId;
    var boxId = this.props.curRentInfo.boxId;
    this.timer&&clearInterval(this.timer);
    this.timer = setInterval(()=>{
      getBoxOpenState(chestLogicId,boxId).then(result=>{
        callback(result['openState']);
      })
    },3000);
  }

  render(){
    return (
      <div className = {rentPageCss['container']}>
        {this.renderAction()}
        {this.renderLoading()}
        {this.renderCloseLoading()}
      </div>
    );
  }

  renderCloseLoading(){
    if(this.state.showCloseloading){
      return(
        <TitleLoading title = '结算中请稍后，如果柜门没有关闭请立即关闭，否则可能导致无法结算！'/>
      )
    }
  }

  renderLoading(){
    if(this.state.showloading){
      return(
        <Loading duration = {10} cancelAlert = {true} closeLoading = {()=>{
          alert('开门完成，请于放入篮球后关闭,并点击结算，如果柜门没有打开，请联系客服！');
          this.setState({showloading:false,pressLock:false});
        }}/>
      )
    }
  }

  goPay(){
    alert('结算成功');
    // this.setState({showCloseloading:true});
    // this.beginGetState(state=>{
    //   if(state === 0){
    //     this.timer&&clearInterval(this.timer);
    //     payRecharge().then(r=>{
    //       if(r){
    //         alert('结算成功');
    //         this.setState({showCloseloading:false});
    //         this.closeWeb();
    //       }
    //     })
    //   }
    // })
  }

  renderAction(){
    if(this.props.curRentInfo){
      if(this.state.openBox){
        return(
          <div className = {rentPageCss['bg']}
               style = {{backgroundImage:'url(http://rentservice.b0.upaiyun.com/repaynew1.jpg!w640)'}}>
            <div onClick={()=>{
              if(!this.state.pressLock){
                alert('结算成功');
              }
              else{
                alert('该订单已经点击过还球但是没有完成结算，请联系客服进行结算！');
              }
            }} className = {rentPageCss['ball1']}/>
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
            <div onClick={()=>{this.goPay()}} className = {rentPageCss['ball']}/>
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
