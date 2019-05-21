require('../../../bbfd')
const DelegateType = require('../api/DelegateType');

function DelegateObj(dtarget,dmethod){
    this.t = dtarget;
    this.m = dmethod;
}

const DMAXSIZE = 20;
const DelegateObjPool = new cc.js.Pool(function(obj){
    obj.t = null;
    obj.m = null;
},DMAXSIZE)

DelegateObjPool.get = function(dtarget,dmethod){
    return this._get() || new DelegateObj(dtarget,dmethod);
}

let Delegate = function(type){
    this._queues = [];
    this.type = type;
    Delegate.staticDelegateid = Delegate.staticDelegateid + 1;
    this.delegateId = Delegate.staticDelegateid;
}

Delegate.staticDelegateid = 0; 

Delegate.prototype.add = function(dtarget,dmethod){
    //bbfd.debug('Binding:add');
    var obj = DelegateObjPool.get(dtarget,dmethod);
    if(!this.has(obj))
    {
        //bbfd.debug('Binding:add1');
        this._queues[this._queues.length] = obj;
    }
    return this;
}

Delegate.prototype.remove = function(dtarget,dmethod){
    var aa = this._queues.length;
    for (let index = 0; index < aa; index++) {
        const element = this._queues[index];
        if(element.t === dtarget && element.m === dmethod)
        {
            cc.js.array.removeAt(this._queues,index);
            DelegateObjPool.put(element);
            return this;
        }
    }
    return this;
}

Delegate.prototype.removeAll = function(){
    for (const key in this._queues) {
        DelegateObjPool.put(this._queues[key]);
        delete this._queues[key];
    }
    this._queues = [];
    return this;
}

//apply(target,args)
Delegate.prototype.invoke = function(){
    var aa = this._queues.length;
    for (let index = 0; index < aa; index++) {
        const element = this._queues[index];
        if(element.t && element.m)
        {
            var fun = element.m;
            fun.apply(element.t,arguments);
        }
    }
    return this;
}

Delegate.prototype.has = function(obj){
    var aa = this._queues.length;
    for (let index = 0; index < aa; index++) {
        const element = this._queues[index];
        if(element.t === obj.t && element.m === obj.m)
        {
            return true;
        }
    }
    return false;
}

bbfd.createDelegate = function(dtarget,dmethod){
    //bbfd.debug('Binding:createDelegate');
    return new Delegate(DelegateType.DEFAULT).add(dtarget,dmethod);
}

bbfd.EventCallBack = function(dtarget,dmethod){
    //bbfd.debug('Binding:createDelegate');
    return new Delegate(DelegateType.DEFAULT).add(dtarget,dmethod);
}

bbfd.createEmptyDelegate = function(dtarget,dmethod){
    //bbfd.debug('Binding:createDelegate');
    return new Delegate(DelegateType.EMPTY).add(dtarget,dmethod);
}

bbfd.createTwoArgsDelegate = function(dtarget,dmethod){
    //bbfd.debug('Binding:createDelegate');
    return new Delegate(DelegateType.TWO_ARGS).add(dtarget,dmethod);
}

bbfd.delegate = module.exports = Delegate;