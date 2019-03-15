// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
var iImplements = require("ContextImplements");
var DispatcherImplements = require("DispatcherImplements");
var EventDispatcher = require("EventDispatcher");
var Context = require("Context");
var ContextKeys = require("ContextKeys");
var CrossContextInjectionBinder = require("CrossContextInjectionBinder");
var CrossContextBridge = require("CrossContextBridge");
var InjectionBinder = require("InjectionBinder");
var Inject = require("Inject");

let CrossContext = cc.Class({
    extends: Context,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        injectionBinder: {
            get() {
                this._injectionBinder = this._injectionBinder ? this._injectionBinder : this._injectionBinder = new CrossContextInjectionBinder();
                //注入者初始化注入绑定者
                Inject.initialize(this._injectionBinder);
                return this._injectionBinder;
            },
            set(value) {
                this._injectionBinder = value;
            }
        },
        crossContextDispatcher: {
            get() {
                return this._crossContextDispatcher;
            },
            set(value) {
                this._crossContextDispatcher = value;
            }
        },
        crossContextBridge: {
            get() {
                return this._crossContextBridge ? this._crossContextBridge : this._crossContextBridge = this.injectionBinder.GetInstance("");
            },
            set(value) {
                this._crossContextBridge = value;
            }
        },
    },

    //=======================================================================================
    // 构造函数中初始化实现的接口方法
    //=======================================================================================

    ctor() {
      iImplements.ICrossContextCapable("CrossContext").ensureImplements([this]);
    },

    //=======================================================================================
    // -继承接口方法
    //=======================================================================================
    /**
     * 初始化交叉上下文的注入绑定者类
     * 并添加事件派发器组件
     */
    addCoreComponents() {
        this._super();
        if (this.injectionBinder.CrossContextBinder === null) {
            this.injectionBinder.CrossContextBinder = new CrossContextInjectionBinder();
        }
        /*
        var maps = Object.create(null);
        maps[DispatcherImplements.ITriggerable] = 100;
        cc.log('++++++++++++++++++++++++++++++++++++++++++++++'+maps[DispatcherImplements.ITriggerable]);
        for (let index = 0; index < 1000; index++) {
            maps[DispatcherImplements.ITriggerable] = 100+'kevin'+index;
            cc.log('=============================================='+maps[DispatcherImplements.ITriggerable]);
        }
        
        Inject.GetInstance(DispatcherImplements.ITriggerable);*/
        if (Context.firstContext == this) {
            cc.log("kevin:");
            cc.log(cc.js.isChildClassOf(CrossContextInjectionBinder,InjectionBinder));
            //this.injectionBinder.Bind(DispatcherImplements.IEventDispatcher).To(EventDispatcher).ToSingleton().ToName(ContextKeys.CROSS_CONTEXT_DISPATCHER).CrossContext();
            //this.injectionBinder.Bind(CrossContextBridge).ToSingleton().CrossContext();
        }
    },
    /**
     * 实例化核心组件
     * 实例化派发器好实例化交叉上下文派发器，并添加派发能力
     */
    instantiateCoreComponents() {
        this._super();
        var dispatcherBinding = this.injectionBinder.GetBinding(ContextKeys.CONTEXT_DISPATCHER);

        if (dispatcherBinding != null) {
            var dispatcher = this.injectionBinder.GetInstance(ContextKeys.CONTEXT_DISPATCHER);

            if (dispatcher != null) {
                this.crossContextDispatcher = this.injectionBinder.GetInstance(ContextKeys.CROSS_CONTEXT_DISPATCHER);
                this.crossContextDispatcher.AddTriggerable(dispatcher);
                dispatcher.AddTriggerable(crossContextBridge);
            }
        }
    },
    /**
     * 如果添加的上下文是交叉上下文
     * 执行赋值交叉上下文
     * @param {CrossContext} context
     *  
     */
    AddContext(context) {
        this._super();
        if(iImplements.ICrossContextCapable("CrossContext").ensureImplements([context]))
        {
            AssignCrossContext(context);
        }
        return this;
    },
    /**
     * 执行赋值交叉上下文
     * @param {CrossContext} childContext 
     */
    AssignCrossContext(childContext) {
        childContext.crossContextDispatcher = this.crossContextDispatcher;
        childContext.injectionBinder.CrossContextBinder = this.injectionBinder.CrossContextBinder;
    },
    /**
     * 清空交叉上下文的派发者能力
     * @param {CrossContext} childContext 
     */
    RemoveCrossContext(childContext) {
        if (childContext.crossContextDispatcher != null) {
            childContext.crossContextDispatcher.RemoveTriggerable(childContext.GetComponent(ContextKeys.CONTEXT_DISPATCHER));
            childContext.crossContextDispatcher = null;
        }
    },
    /**
     * 移除交叉上下文
     * @param {CrossContext} context 
     */
    RemoveContext(context) {
        if(iImplements.ICrossContextCapable("CrossContext").ensureImplements([context]))
        {
            RemoveCrossContext(context);
        }
        this._super();
    }
});
