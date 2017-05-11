/**
 * Created by magiclizi on 2017/4/6.
 */
import React from 'react';
var LoadingTarget = require('react-loading');
class Loading extends React.Component {
  constructor(){
    super();
    this['state'] = {
      total :8
    }
  }

  componentWillMount() {

    if(this['props'].duration){
      this.setState({total:this['props'].duration});
    }
  }

  componentDidMount() {
    this.timer = setInterval(()=>{
      var cur = this.state.total - 1;
      if(cur>=0){
        this.setState({total:cur});
      }
      else{
        if(this['props']['cancelAlert']){
          alert('开门完成，如果柜门没有打开，请联系客服！');
        }
        this.timer&&clearInterval(this.timer);
        this.props['closeLoading']&&this.props['closeLoading']();
      }
    },1000);
  }

  render(){
    var title = this['props'].title?this['props'].title:`开门中，请稍后..剩余 ${this.state.total} 秒`;
    return (
      <div style = {{width:'100vw',height:'100vh',display:'flex',alignItems:'center',
        justifyContent:'center',flexDirection:'column',
        backgroundColor:'rgba(0,0,0,0.6)',position:'absolute',top:0,left:0}}>
        <LoadingTarget type='spin' color='white' />
        <span style = {{fontSize:14,color:'white',marginTop:'3vh',fontWeight:300}}>{title}</span>
      </div>
    );
  }

  componentWillUnmount() {
    this.timer&&clearInterval(this.timer);
  }
};

Loading.propTypes = {

};

export default Loading;
