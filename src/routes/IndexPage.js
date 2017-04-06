import React from 'react';
import { connect } from 'dva';

function IndexPage() {
  return (
    <div>
      rentweb启动成功！
    </div>
  );
}

IndexPage.propTypes = {

};

export default connect()(IndexPage);
