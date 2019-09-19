// 下载文件方法
export const htmlDownload = function(content: string, filename = 'index.js') {
  var eleLink = document.createElement('a');
  eleLink.download = filename;
  eleLink.style.display = 'none';
  // 字符内容转变成blob地址
  var blob = new Blob([content]);
  eleLink.href = URL.createObjectURL(blob);
  // 触发点击
  document.body.appendChild(eleLink);
  eleLink.click();
  // 然后移除
  document.body.removeChild(eleLink);
};

// if ('download' in document.createElement('a')) {
//   // 作为test.html文件下载
//   eleButton.addEventListener('click', function() {
//      funDownload(eleTextarea.value, 'test.html');
//   });
// } else {
//   eleButton.onclick = function() {
//     alert('浏览器不支持');
//   };
// }
