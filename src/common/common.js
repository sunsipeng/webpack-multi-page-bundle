import urls from './rest-mapping.js';
import { EventProxy } from 'eventproxy';
import $ from 'jquery';
import { Toast } from 'mint-ui';
import axios from 'axios';
import conf from './config';
import { Indicator } from 'mint-ui';
var assetsConfig = require('../../config/index');
const ep = new EventProxy();
var interfaceHost = process.env.NODE_ENV === 'production' ? '/nr.php/' : conf.APIPrefixDev;
export default {
  params: {
    userId:null,
    token:null
  },
  conf: {
    ...conf
  },
  imagePath: process.env.NODE_ENV === 'production' ?
  assetsConfig.build.assetsPublicPath + assetsConfig.build.assetsSubDirectory :
  '/static',
  instance: null,
  getInstance () {
    this.instance = axios.create({
      baseURL: interfaceHost,
      timeout: conf.timeout
    });
    this.instance.interceptors.request.use((config) => {
      // config.headers.Authorization = 'Authorization Token';
      return config;
    }, error => Promise.reject(error));

    this.instance.interceptors.response.use((res) => {
      return res;
    }, (error) => {
      const res = error.response;
      if (res) {
        if (res.status === 401) {
          this.vueRouter.next({
            path: '/logout',
            query: { redirect: this.vueRouter.to.fullPath }
          });
        } else {
          Toast(conf.SERVER_ERROR_MESSAGE);
        }
      } else {
        if(!navigator.onLine){
          Toast(conf.NETWORK_EXCEPTION_MESSAGE);
        } else {
          Toast(conf.SERVER_ERROR_MESSAGE);
        }
      }
      Indicator.close();
      return Promise.reject(error);
    });
  },
  initAPI () {
    this.getInstance();
  },
  createAPI (key, config) {
    config = config || {};
    var $params = {};
    if(!urls[key] || !urls[key].u) throw new Error(`${conf.NOT_SET_RESTMAPPING_MESSAGE} [ ${key} ]`);
    urls[key].m = urls[key].m || 'get';
    if(urls[key].m == 'get' || urls[key].m == 'GET'){
      $params.params = config;
    } else {
      $params.data = config;
    }
    if(process.env.NODE_ENV !== 'production') {
      console.log(interfaceHost + urls[key].u);
    }
    return this.instance({
      url: urls[key].u,
      method: urls[key].m,
      ...$params
    });
  },
  request (url, methods, config) {
    return this.createAPI(url, methods, config);
  },
  init: function () {
    if(!this.hostNameExist()) this.getOptimumServer();
  },
  hostNameExist (){
    var hostName = global.$cookies.get(conf.storageNamespace + 'hostName');
    if(hostName) return true;
    return false;
  },
  urls: conf.serverList,
  getOptimumServer: function () {
    ep.once('serverResponded', function (data) { // data
      global.$cookies.set(
        conf.storageNamespace + 'hostName',
        data.ip,
        conf.TOKEN_EXPIRED_TIME
      );
      interfaceHost = data.ip;
    }.bind(this));
    this.urls.forEach(function (u) {
      $.ajax({
        type: 'get',
        url: u,
        async: true,
        data: { token: this.token },
        success: function (data) {
          ep.emit('serverResponded', {data: data});
        },
        error: function (err) {
          Toast(err.responseText);
        }
      });
    }, this);
  },
  getUrlParams: function (urlfield) {
    var url = location.href.split(`#/${urlfield}`)[1]; // 获取url中"?"符后的字串
    var theRequest = {};
    if (~url.indexOf('?')) {
      var str = url.substr(1);
      var strs = str.split('&');
      for (var i = 0; i < strs.length; i++) {
        theRequest[strs[i].split('=')[0]] = decodeURI(strs[i].split('=')[1]);
      }
    }
    return theRequest;
  },
  unique (array){
    for(var i = 0 ; i < array.length;i++) {
      for(var j = i + 1 ; j < array.length;j++) {
        if(array[i] === array[j]) {
          array.splice(j, 1);
          j--;
        }
      }
    }
    return array;
  },
  redirect: function (url) {
    window.location.href = url;
  },
  loginOut: function (next) {
    global.$cookies.remove(conf.storageNamespace + 'token');
    next('/login');
  },
  isMobile: function () {
    var u = navigator.userAgent;
    return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
  },
  isWeixin () {
    var ua = navigator.userAgent.toLowerCase();
    return ua.match(/MicroMessenger/i) == 'micromessenger';
  },
  getToken () {
    return global.$cookies.get(conf.storageNamespace + 'token') ?
           global.$cookies.get(conf.storageNamespace + 'token') : null;
  },
  getLocalStorage () {
    return localStorage.getItem(`${conf.storageNamespace}$user`) ?
           JSON.parse(localStorage.getItem(`${conf.storageNamespace}$user`)).value : null;
  },
  // es6 Dynamic key polyfill
  defineProperty: function (obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  },
  REST_REQ_URL: interfaceHost,
  req: function (key, data, callback, isResolve = true, customCb, dataType, async, errorCallBack) {
    var mapping_obj = urls[key];
    if(!mapping_obj) throw new Error(`${conf.NOT_SET_RESTMAPPING_MESSAGE} [ ${key} ]`);

    var url = mapping_obj.u;
    if(!url) throw new Error(`${conf.NOT_SET_URL_MESSAGE} [ ${key} ]`);
    url = this.REST_REQ_URL + mapping_obj.u;

    var type = mapping_obj.m ? mapping_obj.m : 'get';
    async = async || true;
    dataType = dataType || 'json';
    errorCallBack = errorCallBack || this.onresterror;
    data = data || {};

    var def = $.Deferred();

    var ajaxParams = {
      type: type,
      url: url,
      async: async,
      data: data,
      dataType: dataType,
      success: function (data){
        callback(data, isResolve ? null : def);
        if(isResolve) def.resolve(data);
      },
      error: function (err){
        errorCallBack.call(this, arguments);
        def.reject(err);
      }.bind(this)
    };
    //自定义钩子函数
    if (customCb) {
      for(var o in customCb) {
        ajaxParams[o] = customCb[o];
      }
    }

    $.ajax(ajaxParams);

    return def.promise();
  },
  vueRouter:null,
  onresterror: function (xhr){
    if(xhr[0].status === 401) {
      this.vueRouter.next({
        path: '/login',
        query: { redirect: this.vueRouter.to.fullPath }
      });
    } else if(!navigator.onLine) {
      Toast(conf.NETWORK_EXCEPTION_MESSAGE);
    } else {
      Toast(conf.SERVER_ERROR_MESSAGE);
    }
  },
  isNumber (num) {
    var re = /^[0-9]*[1-9][0-9]*$/;
    if(!re.test(num)){
      return false;
    }else{
      return true;
    }
  },
  isObject (obj) {
    return Object.prototype.toString.call(obj) === '[object Object]';
  },
  isArray (arr) {
    return Object.prototype.toString.call(arr) === '[object Array]';
  },
  isString (str) {
    return Object.prototype.toString.call(str) === '[object String]';
  },
  CE: {
    on: function ( eventName, callback ){
      if(!this[eventName]){
        this[eventName] = [];
      }
      this[eventName].push(callback);
    },
    emit: function ( eventName ){
      var that = this;
      var params = arguments.length > 1 ? Array.prototype.slice.call(arguments, 1) : [];
      if(that[eventName]){
        Array.prototype.forEach.call(that[eventName], function (arg){
          arg.apply(self, params);
        });
      }
    }
  },
  // 字符串括号替换
  bracketReplace (flag, replaceStr){
    if(flag == 'smail') {
      var result = /\((\d+)\)/.exec(replaceStr);
      if(result.length > 1) {
        return replaceStr.replace(/\([^\)]*\)/g, `<span style='color:#0096ff;'> ${result[1]} </span>`);
      } else {
        return replaceStr;
      }
    } else {
      let str = replaceStr.replace(/{/g, '<span style="color:red;">');
      return str.replace(/}/g, '</span>');
    }
  },
  StringFormat () {
    if(!String.format) {
      String.format = function (format) {
        var args = Array.prototype.slice.call(arguments, 1);
        return format.replace(/{(\d+)}/g, function (match, number) {
          return typeof args[number] != 'undefined' ?
            args[number] :
            match;
        });
      };
    }
  },
  getNumber (value){
    if((value && this.isString(value)) || this.isNumber(value)){
      return parseInt(value);
    }
  }
};
