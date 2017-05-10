import React from 'react';
import { connect } from 'dva';
import Style from './recharge.css';
import {setCurPath} from '../models/path';
class recharge extends React.Component {
  constructor(){
    super();
    this.state = {

    }
  }

  componentWillMount() {
    setCurPath('/recharge');
  }

  recharge(rechargeId){
    alert(rechargeId);
  }

  render(){
    return (
      <div className = {Style['container']}>
        <div className = {Style['selectContainer']}>
          <div className={Style['selectRow']}>
            <div className={Style['selection']}>
              <div className={Style['btn']}
                   onClick={()=>{this.recharge(1)}}
                   style = {{backgroundImage:'url(http://rentservice.b0.upaiyun.com/recharge2.png)',marginLeft:'5vw'}}/>
            </div>
            <div className={Style['selection']}>
              <div className={Style['btn']}
                   onClick={()=>{this.recharge(2)}}
                   style = {{backgroundImage:'url(http://rentservice.b0.upaiyun.com/recharge5.png)',marginRight:'5vw'}}/>
            </div>
          </div>
          <div className={Style['selectRow']}>
            <div className={Style['selection']}>
              <div className={Style['btn']}
                   onClick={()=>{this.recharge(3)}}
                   style = {{backgroundImage:'url(http://rentservice.b0.upaiyun.com/recharge10.png)',marginLeft:'5vw'}}/>
            </div>
            <div className={Style['selection']}>
              <div className={Style['btn']}
                   onClick={()=>{this.recharge(4)}}
                   style = {{backgroundImage:'url(http://rentservice.b0.upaiyun.com/recharge20.png)',marginRight:'5vw'}}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

var mapDispatchToProps = function(dispatch){
  return{
    createRechargeOrder:(rechargeId,callback)=>{
      dispatch({type:'user/createRechargeOrder',callback:callback,rechargeId:rechargeId})
    },
  }
}

recharge.propTypes = {

};

export default connect()(recharge);
