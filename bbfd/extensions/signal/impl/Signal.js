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
        if(this.Listener != null)
        {
            this.Listener.invoke(this);
        }
        if(this.OnceListener != null)
        {
            this.OnceListener.invoke(this);
        }
        this._OnceListener = null;
        this._super(null);
    },
    AddListener(callback){
        this._Listener = this.AddUnique(this.Listener,callback);
    },
    AddOnce(callback){
        this._OnceListener = this.AddUnique(this.OnceListener,callback);
    },
    AddUnique(listeners,callback){
        if(callback != null)
        {
            //委托增加的触发回调函数
        }
        return listeners;
    },
    RemoveListener(callback){
        if(callback!=null)
        {
            //this.Listener委托减少的触发回调函数
        }
    },
    RemoveAllListeners(){
        this._Listener = null;
        this._OnceListener = null;
        this._super();
    },
    GetTypes(){
        let types = [];
        return types;
    }
});

bbfd.Signal = module.exports = Signal;