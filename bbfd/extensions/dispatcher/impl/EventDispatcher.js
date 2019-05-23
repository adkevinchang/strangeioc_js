// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
require('../../../../bbfd');
require('../../../framework/impl/Binder');
const iImplements = require('../api/DispatcherImplements');
const poolImp = require('../../pool/api/PoolImplements');
const TmEvent = require('../impl/TmEvent');
const EventCallbackType = require('../api/EventCallbackType');
const DelegateType = require('../../../framework/api/DelegateType');

let EventDispatcher = cc.Class({
    name:'bbfd.EventDispatcher',
    extends: bbfd.Binder,
    properties: {
        triggerClients: [],
        triggerClientRemovals: [],
        isTriggeringClients: false,
        Triggerables:{
            get () {
               if(this.triggerClients === undefined||this.triggerClients === null)
               {
                    this.triggerClients = [];
               }
               return this.triggerClients.length;
           }
        }
        // isTriggeringClients: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:
    //=======================================================================================
    // 构造函数中初始化实现的接口方法
    //=======================================================================================

    ctor() {
        iImplements.IEventDispatcher("EventDispatcher").ensureImplements([this]);
        iImplements.ITriggerable("EventDispatcher").ensureImplements([this]);
        iImplements.ITriggerProvider("EventDispatcher").ensureImplements([this]);
    },

    //=======================================================================================
    // -继承接口方法
    //=======================================================================================
    Dispatch(eventType,data) {
        bbfd.debug('EventDispathcer-Dispatch1');
        let evt = this.conformDataToEvent(eventType,data);
       // if(poolImp.IPoolable('EventDispatcher').ensureImplements([evt]))
       // {
       //    evt.Retain();
       // }
        bbfd.debug('EventDispathcer-Dispatch2'+evt.ToString()+'//'+this.triggerClients);
        let continueDispatch = true;
        if(this.triggerClients != undefined && this.triggerClients != null)
        {
            this.isTriggeringClients = true;
            for (let index = 0; index < this.triggerClients.length; index++) {
                const element = this.triggerClients[index];
                if(iImplements.ITriggerable("EventDispatcher").ensureImplements([element]))
                {
                    if(!element.Trigger(evt.type,evt))
                    {
                        continueDispatch = false;
                        break;
                    }
                }else{
                    this.internalReleaseEvent(evt);
                }
            }
            if(this.triggerClients != undefined && this.triggerClients != null)
            {
                this.flushRemovals();
            }
            this.isTriggeringClients = false;
        }
        if(!continueDispatch)
        {
            this.internalReleaseEvent(evt);
            return;
        }
        //IEventBinding
        bbfd.debug('EventDispathcer-Dispatch3'+evt.type);
        let binding = this.GetBinding(evt.type);
        if(binding === null)
        {
            this.internalReleaseEvent(evt);
            return;
        }
        //------------------------------------------------------------------待完善
        //bbfd.print(binding.value);
        //bbfd.debug('------------------------------');
        let callbacks = binding.value;//此处深度复制待优化 bbfd.deepCopy
        //bbfd.print(callbacks);
        if(callbacks === null||callbacks===undefined)
        {
            this.internalReleaseEvent(evt);
            return;
        }
        for (let index = 0; index < callbacks.length; index++) {
            const callback = callbacks[index];
            //bbfd.debug('------------------------------');
           // let tempc = bbfd.deepCopy(callback);
           // bbfd.print(tempc);
            if(callback === null||callback === undefined)
            {
                continue;
            }
            if(callback.type === DelegateType.DEFAULT)
            {
                this.invokeEventCallback(evt,callback);
            }else if(callback.type === DelegateType.EMPTY)
            {
                callback.invoke();
            }
        }
        /*
        let callbackss = bbfd.cloneToArray(binding.value);//数组深复制
        if(callbackss === null)
        {
            this.internalReleaseEvent(evt);
            return;
        }
        bbfd.debug('EventDispathcer-Dispatch4');
         //委托执行
        for (let index = 0; index < callbackss.length; index++) {
            const cb = callbackss[index];
            if(cb === null)
            {
                continue;
            }
            callbackss[index] = null;
            bbfd.debug('EventDispathcer-Dispatch5');
            if(cb)
            {
                this.invokeEventCallback(evt,cb);
            }else if(cb)
            {
               //cb.invoke(this);
            }
        }*/
        bbfd.debug('EventDispathcer-Dispatch6');
        this.internalReleaseEvent(evt);
    },
    GetRawBinding(){
        return new bbfd.EventBinding(bbfd.createDelegate(this,this.resolver));
    },
    Bind(key){ 
        return this._super(key);
    },
    conformDataToEvent(eventType,data) {
        let evt = null;
        if(eventType === null)
        {
            throw new Error("Attempt to Dispatch to null.\n data: " + data);
        }else if(iImplements.IEvent("EventDispatcher").ensureImplements([eventType]))
        {
            evt = eventType;
        }else if(data === null||data === undefined)
        {
            evt = this.createEvent(eventType,null);
            bbfd.debug('conformDataToEvent-'+evt);
        }else if(iImplements.IEvent("EventDispatcher").ensureImplements([data]))
        {
            evt = data;
        }else{
            evt = this.createEvent(eventType,data);
        }
        return evt;
    },
    createEvent(eventType,data) {
        let evt = TmEvent.get(eventType,this,data)//pool
        return evt;
    },
    invokeEventCallback(data,callback) {
        if(callback != null)
        {
            callback.invoke(data);
            return;
        }
        let tgt = "";
        let methodName = '';
        throw new Error('An EventCallback is attempting an illegal cast. One possible reason is not typing the payload to IEvent in your callback. Another is illegal casting of the data.\n Target class: '  + tgt + ' method: ' + methodName);
    },
    AddListener(evt,callback) {
        let binding = this.GetBinding(evt);
        //bbfd.debug('AddListener=============================================================='+evt+'//'+callback);
        if(binding === null)
        {
            this.Bind(evt).To(callback);
        }else{
            binding.To(callback);
        }
    },
    RemoveListener(evt,callback) {
       // bbfd.debug('RemoveListener=============================================================='+evt+'//'+callback);
        let binding = this.GetBinding(evt);
        this.RemoveValue(binding,callback);
    },
    HasListener(evt,callback) {
        let binding = this.GetBinding(evt);
        if(binding === null)
        {
            return false;
        }
        return binding.TypeForCallback(callback) != EventCallbackType.NOT_FOUND;
    },
    UpdateListener(toAdd,evt,callback) {
        if(toAdd)
        {
            this.AddListener(evt,callback);
        }else{
            this.RemoveListener(evt,callback);
        }
    },
    AddTriggerable(target) {
        if(this.triggerClients === undefined||this.triggerClients === null)
        {
            this.triggerClients = [];
        }
        this.triggerClients.push(target);
    },
    RemoveTriggerable(target) {
        if(bbfd.containsToArray(target,this.triggerClients))
        {
            if(this.triggerClientRemovals === undefined)
            {
                this.triggerClientRemovals = [];
            }
            this.triggerClientRemovals.push(target);
            if(!this.isTriggeringClients)
            {
                this.flushRemovals();
            }
        }
    },
    flushRemovals() {
        if(this.triggerClientRemovals === undefined)
        {
            return;
        }
        for (let index = 0; index < this.triggerClientRemovals.length; index++) {
            const element = this.triggerClientRemovals[index];
            bbfd.removeToArray(element,this.triggerClients);
        }
        this.triggerClientRemovals = [];
    },
    Trigger(key,data) {
        this.Dispatch(key,data);
        return true;
    },
    internalReleaseEvent(evt) {
        this.cleanEvent(evt);
        TmEvent.put(evt);
    },
    ReleaseEvent(evt) {
        this.cleanEvent(evt);
        TmEvent.put(evt);
    },
    cleanEvent(evt) {
        evt.type = null;
        evt.target = null;
        evt.data = null;
    },
    ToString(){
        return 'path:bbfd/extensions/dispatcher/impl/EventDispatcher'+' name:'+this.name;
    }

});

bbfd.EventDispatcher = module.exports = EventDispatcher;