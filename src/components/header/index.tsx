import React from 'react';
import { message } from 'antd';
import './index.css';
import { htmlDownload } from '../../utils/download';
import { parse } from '../../utils/parseToReactComponent';

const download = () => {
  // const canvas = document.getElementById('MainCanvas') || document.createElement('div');
  const component = parse();
  if (!!component) {
    htmlDownload(component);
  } else {
    message.warning('请先拖拽合成组件');
  }
};

export default () => {
  return (
    <div className="layout-header">
      <span>Home</span>
      <button onClick={download} className="download">
        {' '}
        下载{' '}
      </button>
    </div>
  );
};
