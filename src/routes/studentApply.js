/**
 * Created by magiclizi on 2017/6/15.
 */
import React from 'react';
import Style from './studentApply.css';
import Loading from '../components/TitleLoading';
import FileUpload from 'react-fileupload';
import {connect} from 'dva';
import {applyStudent} from '../services/user';
import {setCurPath} from '../models/path';
class studentApply extends React.Component{

  constructor(){
    super();
    this.state = {
      cre:null,
      needLoading:false,
      loadingTitle:''
    }
  }

  componentWillMount() {
    setCurPath('/studentApply');
    this.props.refreshUserInfo();

  }

  closeWeb(){
    WeixinJSBridge.invoke('closeWindow',{},function(res){

    });
  }

  renderLoading(){
    if(this.state.needLoading){
      return(
        <Loading title = {this.state.loadingTitle} />
      )
    }
  }

  render(){
    var self = this;
    var options = {
      baseUrl: 'http://139.196.210.143:7777/upload',
      chooseAndUpload: true,
      fileFieldName: self.props.userId,
      chooseFile: function (files) {
        console.log('you choose', typeof files == 'string' ? files : files[0].name);
        self.setState({needLoading: true});
      },
      doUpload: function (files, mill) {
        console.log('you just uploaded', typeof files == 'string' ? files : files[0].name)
      },
      uploading: function (progress) {
        console.log('loading...', progress.loaded / progress.total + '%')
        var persent =~~(progress.loaded / progress.total);
        self.setState({loadingTitle:`上传中：${persent}%`})
      },
      uploadSuccess: function (resp) {
        console.log('upload success..!');
        self.setState({loadingTitle:`上传完成：100% 提交数据中。。`});
        applyStudent(resp['fileUrl']).then(result=>{
          if(result){
            alert(`提交申请成功，稍等片刻即可免费用球！`);
            self.closeWeb();
          }
        })
      },
      uploadError: function (err) {
        alert(err.message);
        self.setState({needLoading: false});
      },
      uploadFail: function (resp) {
        alert(resp);
        self.setState({needLoading: false});
      }
    }

    return(
      <div className = {Style['container']}
           style = {{backgroundImage:'url(http://rentservice.b0.upaiyun.com/studentapply1.jpg!w640)'}}>
          <div className = {Style['btn']}>
            <FileUpload options={options}>
              <div className = {Style['creImgInput']} ref="chooseAndUpload">
                <span className = {Style['title']}>上传学生证</span>
              </div>
            </FileUpload>
          </div>
        {this.renderLoading()}
      </div>
    )
  }
}

var mapDispatchToProps = function(dispatch) {
  return {
    refreshUserInfo: () => {
      dispatch({
        type: 'user/refreshUserInfo'
      })
    },
  }
}

var mapStateToProps = function(state){
  return state['user'];
}

export default connect(mapStateToProps,mapDispatchToProps)(studentApply);
