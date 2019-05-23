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
const iimplements = require('../api/DispatcherImplements');
const EventCallbackType = require('../api/EventCallbackType');
const BindingConstraintType = require('../../../framework/api/BindingConstraintType');

let EventBinding = cc.Class({
    name:'bbfd.EventBinding',
    extends: bbfd.Binding,
    properties: {
        callbackTypes: {
            // ATTRIBUTES:
            default: null,        // The default value will be used only when the component attaching
                                  // to a node for the first time
            type: Object, // optional, default is typeof default
            serializable: true,   // optional, default is tru
        }
    },

    //=======================================================================================
    // 构造函数中初始化实现的接口方法
    //=======================================================================================

    ctor(){
        iimplements.IEventBinding("EventBinding").ensureImplements([this]);
        this.keyConstraint = BindingConstraintType.ONE;
        this.valueConstraint = BindingConstraintType.MANY;
        this.callbackTypes = cc.js.createMap(true);
    },

    //=======================================================================================
    // -继承接口方法
    //=======================================================================================
    TypeForCallback(callback){
        if(this.callbackTypes[callback])
        {
            return this.callbackTypes[callback];
        }
        return EventCallbackType.NOT_FOUND;
    },
    //EventCallBack  EmptyCallBack
    To(value){
        this._super(value);
        this.storeMethodType(value);
        return this;
    },
    RemoveValue(value){
        this._super(value);
        delete this.callbackTypes[value];
    },
    storeMethodType(value){
        if(value === null)
        {
            throw new Error("EventDispatcher can't map something that isn't a delegate");
        }
        let methodInfo = value.Method;
        //判断委托的参数个数
        let argnum = 0;
        if(argnum === 0)
        {
            this.callbackTypes[value] = EventCallbackType.NO_ARGUMENTS;
        }else if(argnum === 1)
        {
            this.callbackTypes[value] = EventCallbackType.ONE_ARGUMENT;
        }else{
            throw new Error("Event callbacks must have either one or no arguments");
        }
    }

});

bbfd.EventBinding = module.exports = EventBinding;