import common from '../../../common/common';
import name from './footer';

common.initAPI();
common.request('login').then(res=>{
  console.log(res);
});
console.log(name);
