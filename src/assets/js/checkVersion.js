(function (){
  if(navigator.appName == 'Microsoft Internet Explorer' &&
      parseInt(
      navigator.appVersion.split(';')[1].replace(/[ ]/g, '').replace('MSIE', '')
      ) < 9){

    var htmldom = '<div style=\'width: 600px;height: 300px;background: #ccc;position: fixed;left:50%;top: 50%;margin-left: -300px;margin-top: -150px;z-index: 60;\'>' +
    '	<h3 style=\'color: red;text-align: center;\'>您当前的浏览器版本过低，可能存在安全风险，</h3>' +
    '	<h3 style=\'text-align: center;\'>建议下载以下推荐浏览器:</h3>' +
    '	<div class=\'browser-btns\' style=\'width: 100%;height: auto;text-align: center;position: absolute;bottom: 0;\'>' +
    '		<a href=\'http://sw.bos.baidu.com/sw-search-sp/software/dd39bb23ec731/ChromeStandalone_62.0.3202.75_Setup.exe\'><button type=\'button\' class=\'btn bg-orange margin\' >谷歌浏览器</button></a>' +
    '		<a href=\'http://sw.bos.baidu.com/sw-search-sp/software/2dc26bb274117/Firefox-56.0.2.6506-setup.exe\'><button type=\'button\' class=\'btn bg-orange margin\' >火狐浏览器</button></a>' +
    '	</div>' +
    '</div>';

    var dom = document.createElement('div');
    dom.innerHTML = htmldom;
    document.body.appendChild(dom);
  }

})();
