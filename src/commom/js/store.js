export function saveTococal(id,key,value){//读取
  let seller = window.localStorage.__seller__; //给window.localStorage设置一个属性
  if(!seller){
    seller = {};
    seller[id] = {};
  }else{
    seller = JSON.parse(seller);
    if(!seller[id]){
      seller[id] = {};
    }
  }
  seller[id][key] = value;
  window.localStorage.__seller__ = JSON.stringify(seller);
};

export function loadFromLocal(id,key,def){ //设置 true false
  let seller = window.localStorage.__seller__; //给window.localStorage设置一个属性
  if(!seller){
    return def;
  }
  seller = JSON.parse(seller)[id];
  if(!seller){
    return def;
  }
  let ret = seller[key]
  return ret || def;
};
