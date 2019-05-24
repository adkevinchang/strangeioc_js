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
require('../impl/BaseSignal');

let Signal = cc.Class({
    name:'bbfd.Signal',
    extends: bbfd.BaseSignal,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        //Delegate
        Listener: {
            get () {
                return this._Listener;
            }
        },
        //Delegate
        OnceListener: {
            get () {
                return this._OnceListener;
            }
        },
    },
    Dispatch(){
        //bbfd.debug('====================================================================signal-Dispatch');
        if(this.Listener != null||this.Listener != undefined)
        {
            if(arguments)
            {
                this.Listener.invoke(this,arguments);
            }else{
                this.Listener.invoke(this);
            }
        }
        if(this.OnceListener != null||this.OnceListener != undefined)
        {
            if(arguments)
            {
                this.OnceListener.invoke(this,arguments);
            }else{
                this.OnceListener.invoke(this);
            }
        }
        this._OnceListener = null;
        this._super();
    },
    AddMultiListener(ctarget,callbackfun){
        if(this.Listener === null || this.Listener === undefined)
        {
            throw new Error('Signal Listener is null! use AddListener()');
        }
        this.Listener.Add(ctarget,callbackfun);
    },
    AddListener(callback){
        this._Listener = this.AddUnique(this.Listener,callback);
    },
    AddOnce(callback){
        this._OnceListener = this.AddUnique(this.OnceListener,callback);
    },
    AddUnique(listeners,callback){
       //如果之前存在，将替换之前的callback
       if(callback != null)
       {
           listeners = callback;
       }
       return listeners;
    },
    RemoveListener(callback){
        if(this.Listener === callback)
        {
            this._Listener = null;
        }
        if(this.OnceListener === callback)
        {
            this._OnceListener = null;
        }
    },
    RemoveMultiListener(ctarget,callbackfun){
        if(this.Listener === null || this.Listener === undefined)
        {
            throw new Error('Signal Listener is null! use AddListener()');
        }
        this.Listener.remove(ctarget,callbackfun);
        this._super();
    },
    RemoveAllListeners(){
        if(this.Listener != null||this.Listener != undefined)
        {
            this.Listener.removeAll();
        }
        if(this.OnceListener != null||this.OnceListener != undefined)
        {
            this.OnceListener.removeAll();
        }
        this._Listener = null;
        this._OnceListener = null;
        this._super();
    },
    GetTypes(){
        let types = [];
        return types;
    },
     /**
     *输出类路径与名字
     */
    ToString() {
        return 'path:bbfd/extensions/signal/impl/Signal' + ' name:' + this.name;
    }
});

bbfd.Signal = module.exports = Signal;