/**
 * Created by magiclizi on 2017/4/7.
 */
import React from 'react';
import {connect} from 'dva';
import UserOrderCss from './UserOrder.css';
import moment from 'moment';
class UserOrder extends React.Component{
  componentWillMount() {
    this['props'].getOrders();
  }

  render(){
    return(
      <div className = {UserOrderCss['container']}>
        {this.renderRows()}
        <span style = {{marginBottom:'2vh',marginTop:'2vh',fontSize:13,color:'rgb(110,109,113)',fontWeight:400}}>没有更多订单信息了～</span>
      </div>
    )
  }

  renderRows(){
    var rows = this.props.orders.map((data,i)=>{
      if(data['orderType'] === 'authority'){
        return(
          <div key = {i} style = {{width:'94vw',borderRadius:4,backgroundColor:'white',display:'flex',marginTop:'4vw',flexDirection:'column'}}>
            <span style = {{marginTop:'2vh',marginLeft:'3vw',color:'rgb(38,38,38)',fontSize:14}}>订单编号 : {data.orderId.split('_')[1]}</span>
            <span style = {{marginTop:'1vh',marginLeft:'3vw',color:'rgb(110,109,103)',fontSize:13}}>订单类型 : 押金</span>
            <span style = {{marginTop:'1vh',marginLeft:'3vw',color:'rgb(110,109,103)',fontSize:13}}>订单金额 : {(data.orderPrice/100).toFixed(2)}元</span>
            <span style = {{marginTop:'1vh',marginBottom:'2vh',marginLeft:'3vw',color:'rgb(110,109,103)',fontSize:13}}>订单状态 : {data.paidAt?'已支付':'未支付'}</span>
          </div>
        )
      }
      else{
        return(
          <div key = {i} style = {{width:'94vw',borderRadius:4,backgroundColor:'white',display:'flex',marginTop:'4vw',flexDirection:'column'}}>
            <span style = {{marginTop:'2vh',marginLeft:'3vw',color:'rgb(38,38,38)',fontSize:14}}>订单编号 : {data.orderId.split('_')[1]}</span>
            <span style = {{marginTop:'1vh',marginLeft:'3vw',color:'rgb(110,109,103)',fontSize:13}}>订单类型 : 租金</span>
            <span style = {{marginTop:'1vh',marginLeft:'3vw',color:'rgb(110,109,103)',fontSize:13}}>订单金额 : {(data.orderPrice/100).toFixed(2)}元</span>
            <span style = {{marginTop:'1vh',marginLeft:'3vw',color:'rgb(110,109,103)',fontSize:13}}>订单状态 : {data.paidAt?'已支付':'未支付'}</span>
            <span style = {{marginTop:'1vh',marginLeft:'3vw',color:'rgb(110,109,103)',fontSize:13}}>开始时间 : {moment(data.startAt * 1000).format('YYYY/MM/DD HH:mm:ss')}</span>
            <span style = {{marginTop:'1vh',marginBottom:'2vh',marginLeft:'3vw',color:'rgb(110,109,103)',fontSize:13,marginBottom:'2vh'}}>结束时间 : {data.endAt?moment(data.endAt * 1000).format('YYYY/MM/DD HH:mm:ss'):'使用中'}</span>
          </div>
        )
      }
    })
    return rows;
  }
}

var mapStateToProps = function(state){
  return state['user'];
}

var mapDispatchToProps = function(dispatch){
  return{
    getOrders:()=>{
      dispatch({
        type:'user/getUserOrders'
      })
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(UserOrder);
