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
const iimplements = require('../api/SignalImplements');

let BaseSignal = cc.Class({
    name:'bbfd.BaseSignal',
    extends: cc.Object,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        //Delegate 里面可以动态添加委托对象
        BaseListener: {
            get () {
                return this._BaseListener;
            }
        },
        //Delegate
        OnceBaseListener: {
            get () {
                return this._OnceBaseListener;
            }
        },
    },

    //=======================================================================================
    // 构造函数中初始化实现的接口方法
    //=======================================================================================

    ctor(){
        iimplements.IBaseSignal("BaseSignal").ensureImplements([this]);
        
    },

    //=======================================================================================
    // -继承接口方法
    //=======================================================================================
    Dispatch(){
        if(this.BaseListener != null||this.BaseListener != undefined)
        {
            if(arguments.length > 0)
            {
                this.BaseListener.invoke(arguments);
            }else{
                this.BaseListener.invoke();
            }
        }
        if(this.OnceBaseListener != null||this.OnceBaseListener != undefined)
        {
            if(arguments.length > 0)
            {
                this.OnceBaseListener.invoke(arguments);
            }else{
                this.OnceBaseListener.invoke();
            }
        }
        this._OnceBaseListener = null;
    },
    //此处的callback是动态的委托对象，如果重复添加将替换之前的委托callback
    AddListener(callback){
        this._BaseListener = this.AddUnique(this.BaseListener,callback);
    },

    //为事件委托添加多个函数监听。
    AddMultiListener(ctarget,callbackfun){
        if(this.BaseListener === null || this.BaseListener === undefined)
        {
            throw new Error('BaseSignal BaseListener is null! use AddListener()');
        }
        this.BaseListener.Add(ctarget,callbackfun);
    },
    AddUnique(listeners,callback){
        //如果之前存在，将替换之前的callback
        if(callback != null)
        {
            listeners = callback;
        }
        return listeners;
    },
    AddOnce(callback){
        this._OnceBaseListener = this.AddUnique(this.OnceBaseListener,callback);
    },
    RemoveListener(callback){
        if(this.BaseListener === callback)
        {
            this._BaseListener = null;
        }
        if(this.OnceBaseListener === callback)
        {
            this._OnceBaseListener = null;
        }
    },
    RemoveMultiListener(ctarget,callbackfun){
        if(this.BaseListener === null || this.BaseListener === undefined)
        {
            throw new Error('BaseSignal BaseListener is null! use AddListener()');
        }
        this.BaseListener.remove(ctarget,callbackfun);
    },
    RemoveAllListeners(){
        if(this.BaseListener != null||this.BaseListener != undefined)
        {
            this.BaseListener.removeAll();
        }
        if(this.OnceBaseListener != null||this.OnceBaseListener != undefined)
        {
            this.OnceBaseListener.removeAll();
        }
        this._BaseListener = null;
        this._OnceBaseListener = null;
    },
    GetTypes(){
        let types = [];
        return types;
    },
    /**
    *输出类路径与名字
    */
   ToString() {
       return 'path:bbfd/extensions/signal/impl/BaseSignal' + ' name:' + this.name;
   }
});

bbfd.BaseSignal = module.exports = BaseSignal;