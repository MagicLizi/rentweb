/**
 * Created by magiclizi on 2017/4/7.
 */
import React from 'react';
import {connect} from 'dva';
import UserOrderCss from './UserOrder.css';
class UserOrder extends React.Component{
  componentWillMount() {
    this['props'].getOrders();
  }

  render(){
    return(
      <div className = {UserOrderCss['container']}>
        {this.renderRows()}
      </div>
    )
  }

  renderRows(){
    var rows = this.props.orders.map((data,i)=>{
        return(
          <div style = {{width:'80vw',borderRadius:4,height:'20vw', marginTop:'4vh'}}>
          </div>
        )
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
