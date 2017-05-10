/**
 * Created by magiclizi on 2017/4/6.
 */
import React from 'react';
var LoadingTarget = require('react-loading');
class TitleLoading extends React.Component {
  constructor(){
    super();
    this['state'] = {

    }
  }

  componentWillMount() {
  }

  componentDidMount() {

  }

  render(){
    var title = this['props'].title;
    return (
      <div style = {{width:'100vw',height:'100vh',display:'flex',alignItems:'center',
        justifyContent:'center',flexDirection:'column',
        backgroundColor:'rgba(0,0,0,0.6)',position:'absolute',top:0,left:0}}>
        <LoadingTarget type='spin' color='white' />
        <span style = {{textAlign:'center',width:'80vw',fontSize:14,color:'white',marginTop:'3vh',fontWeight:300}}>{title}</span>
      </div>
    );
  }

  componentWillUnmount() {

  }
};

TitleLoading.propTypes = {

};

export default TitleLoading;
