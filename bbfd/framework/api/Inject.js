// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
let Inject = cc.Class({
    name:'bbfd.Inject',
    extends:cc.Object,
    statics:{
        injectionBinder:null,
        //binders:[],
        initialize:function(binder){
            if(Inject.injectionBinder === binder)return;
            Inject.injectionBinder = binder;
        },
        //注入的方式有待优化
        Injecting:function(classnm,classProp,key,name){
            //多个注入绑定者该如何处理
            if(Inject.injectionBinder !== null)
            {
               //bbfd.debug('Inject.injectionBinder=================================key:'+key);
               //let injectProperty = Inject.getCurrBinder(key,name).GetInstance(key,name);
               let injectProperty = Inject.injectionBinder.GetInstance(key,name);
               if(injectProperty===undefined||injectProperty===null)
               {
                   let _msg = '';
                   _msg+'\n\t\ttarget property: '+classProp+
                    +'\n\t\ttarget: '+ classnm +
                    +'\n\t\tkey: '+key+
                    +'\n\t\tname: '+name;
                    throw new Error(_msg);
               }
               return injectProperty;
            }else
            {
                //throw new Error('Inject class no initialize!');
                return null;
            }
        },
        /*
        addBinder:function(binder){
            if(!Inject.hasBinder(binder))
            {
                Inject.binders.push(binder);
            }
        },
        hasBinder:function(binder){
            for (let index = 0; index < this.binders.length; index++) {
                const element = Inject.binders[index];
                if(element === binder)
                {
                    return true;
                }
            }
            return false;
        },
        removeBinder:function(binder)
        {
            bbfd.removeToArray(binder,Inject.binders);
        },
        //多个绑定者管理
        getCurrBinder:function(key,name){
            if(Inject.injectionBinder != null)
            {
                let binding = Inject.injectionBinder.GetBinding(key, name);
                if(binding!=null)
                {
                    return Inject.injectionBinder;
                }
            }
            for (let index = 0; index < Inject.binders.length; index++) {
                const tempBinder = Inject.binders[index];
                const tempBinding = tempBinder.GetBinding(key, name);
                if(tempBinding!=null)
                {
                    bbfd.debug('Inject.injectionBinder================================='+tempBinder.ToString());
                    return tempBinder;
                }
            }
            bbfd.debug('Inject.injectionBinder=================================end'+Inject.binders.length);
            return  Inject.injectionBinder;
        }*/
    }
});

bbfd.Inject = module.exports = Inject;