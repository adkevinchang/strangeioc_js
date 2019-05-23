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
        //Delegate
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
    Dispatch(args){
        if(this.BaseListener != null)
        {
            this.BaseListener.invoke(this,args);
        }
        if(this.OnceBaseListener != null)
        {
            this.OnceBaseListener.invoke(this,args);
        }
        this._OnceBaseListener = null;
    },
    AddListener(callback){
        this._BaseListener = this.AddUnique(this.BaseListener,callback);
    },
    AddUnique(listeners,callback){
        if(callback != null)
        {
            //委托增加的触发回调函数
        }
        return listeners;
    },
    AddOnce(callback){
        this._OnceBaseListener = this.AddUnique(this.OnceBaseListener,callback);
    },
    RemoveListener(callback){
        if(callback!=null)
        {
            //this.BaseListener委托减少的触发回调函数
        }
    },
    RemoveAllListeners(){
        this._BaseListener = null;
        this._OnceBaseListener = null;
    },
    GetTypes(){
        let types = [];
        return types;
    }
});

bbfd.BaseSignal = module.exports = BaseSignal;