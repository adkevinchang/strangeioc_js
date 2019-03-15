// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
var Inject = cc.Class({
    extends:cc.Object,
    statics:{
        injectionBinder:null,
        initialize:function(binder){
            Inject.injectionBinder = binder;
        },
        GetInstance:function(key){
            if(Inject.injectionBinder !== null)
            {
                cc.log('injectionBinder:'+Inject.injectionBinder+'key:'+key);
                return Inject.injectionBinder.GetInstance(key);
            }else
            {
                cc.log('injectionBinder:null'+key);
                return null;
            }
        }
    }
});
module.exports = Inject;