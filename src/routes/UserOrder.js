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
    alert(this.props.orders);
    return(
      <div className = {UserOrderCss['container']}>
        {this.props.orders}
      </div>
    )
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
