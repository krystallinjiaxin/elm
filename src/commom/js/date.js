export function formatDate(date,fmt){
  if(/(y+)/.test(fmt)){//匹配到了输出的yyyy   RegExp.$1 === 匹配到了输出的yyyy   yyyy '2016'  substr方法(4-4=0) 从零开始 截取 yy '16' (4-2=2) 从第二位开始截取
    fmt = fmt.replace(RegExp.$1,(date.getFullYear() + '').substr(4-RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth()+1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for(let k in o){
    if(new RegExp(`(${k})`).test(fmt)){ //实例化一个正则 放入每个k值验证fmt里面有没有
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1,(RegExp.$1.length===1) ? str : padLeftZero(str));
    }
  }
  return fmt;
};
function padLeftZero(str){//1 12
  return ('00' + str).substr(str.length); // 001 (1) = 01  0012 (2) = 12
}
