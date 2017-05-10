import React from 'react';
import { connect } from 'dva';
import rentPageCss from './RentPage.css';
import {setCurPath} from '../models/path';
import {openInRenting} from '../services/action';
import TitleLoading from '../components/TitleLoading';
class RepayNewPage extends React.Component {
  constructor(){
    super();
    this.state = {
      showloading:false
    }
  }

  componentWillMount() {
    setCurPath('/repayNewPage');

    this.props.getCurRentInfo(()=>{
      if(this.props.curRentInfo){
        //打开租赁中的箱子
        this.setState({showloading:true});
        //开门
        openInRenting().then(result=>{
          if(result){
            alert('开门成功，开始轮询状态');
          }
        })
      }
    });
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
      return(
        <div className = {rentPageCss['bg']}
             style = {{backgroundImage:'url(http://rentservice.b0.upaiyun.com/repaynew1.jpg!w640)'}}>
          <div onClick={()=>{this.goPay()}} className = {rentPageCss['ball1']}/>
        </div>
      )
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
