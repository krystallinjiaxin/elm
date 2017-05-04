/*
  解析url参数
  @example ?id=12345&a=b
  @renturn obj {id:12345,a:b}
*/
export function urlParse() {
  let url = window.location.search;
  let obj = {};
  let reg = /[?&][^?&]+=[^?&]+/g;
  let arr = url.match(reg); //返回数组 [?id=12345,&a=b]
  if(arr){
    arr.forEach((item) => {
      let tempArr = item.substring(1).split('=');
      let key = decodeURIComponent(tempArr[0]); //id
      let value = decodeURIComponent(tempArr[1]); //12345
      obj[key] = value;
    });
  }
  return obj;
}
