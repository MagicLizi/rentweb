/**
 * Created by magiclizi on 2017/4/6.
 */
import React from 'react';
var LoadingTarget = require('react-loading');
class Loading extends React.Component {
  render(){
    var title = this['props'].title?this['props'].title:'加载中,请稍后...';
    return (
      <div style = {{width:'100vw',height:'100vh',display:'flex',alignItems:'center',
        justifyContent:'center',flexDirection:'column',
        backgroundColor:'rgba(0,0,0,0.6)',position:'absolute',top:0,left:0}}>
        <LoadingTarget type='spin' color='white' />
        <span style = {{fontSize:14,color:'white',marginTop:'3vh',fontWeight:300}}>{title}</span>
      </div>
    );
  }
};

Loading.propTypes = {

};

export default Loading;
