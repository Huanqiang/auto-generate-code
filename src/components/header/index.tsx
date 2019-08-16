import React from 'react';
import './index.css';
import { htmlDownload } from '../../utils/download';

const download = () => {
  const canvas = document.getElementById('MainCanvas') || document.createElement('div');
  htmlDownload(canvas.innerHTML);
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
