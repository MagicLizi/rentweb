/**
 * Created by magiclizi on 2017/4/6.
 */
import React from 'react';
import {connect} from 'dva';
import rentPageCss from './RentPage.css';
import {openInRenting} from '../services/action';
import {setCurPath} from '../models/path';
import Loading from '../components/Loading';
class OpenInRentingPage extends React.Component {

  constructor() {
    super();
    this['state']={
      showloading:false
    }
  }

  componentWillMount() {
    setCurPath('/openInRenting');
    this.props.getCurRentInfo();
  }

  render(){
    return(
      <div className = {rentPageCss['container']}>
        {this.renderAction()}
        {this.state.showloading?(<Loading closeLoading = {()=>{
          this.setState({showloading:false})
        }}/>):null}
      </div>
    )
  }

  openInRenting(){
    openInRenting().then(result=>{
      if(result){
        this.setState({showloading:true})
      }
    })

  }

  closeWeb(){
    WeixinJSBridge.invoke('closeWindow',{},function(res){

    });
  }

  renderAction(){
    if(this.props.curRentInfo){
      return(
        <div className = {rentPageCss['bg']}
             style = {{backgroundImage:'url(http://rentservice.b0.upaiyun.com/rentinservice.jpg!w640)'}}>
          <span style = {{fontSize:30,color:'white',marginBottom:'28vh'}}>亲的柜号是{this.props.curRentInfo['chestLogicId']}_{this.props.curRentInfo['boxId']}号
          </span>
          <div onClick={()=>{this.openInRenting()}} className = {rentPageCss['ball']}/>
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

var mapStateToProps = function(state){
  return state['user'];
}

var mapDispathchToProps = function(dispatch){
  return{
    getCurRentInfo:()=>{
      dispatch({type:'user/getCurRentInfo'})
    },
  }
}

export default connect(mapStateToProps,mapDispathchToProps)(OpenInRentingPage);
