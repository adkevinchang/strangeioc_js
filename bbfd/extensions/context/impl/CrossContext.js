// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
require('../../../../bbfd')
require('../../dispatcher/impl/EventDispatcher');
require('./Context');
require('../../injector/impl/CrossContextInjectionBinder');
require('../impl/CrossContextBridge');
require('../../../framework/api/Inject');
const iImplements = require('../api/ContextImplements');
const DispatcherImplements = require('../../dispatcher/api/DispatcherImplements');
const ContextKeys = require('../api/ContextKeys');

let CrossContext = cc.Class({
    name:'bbfd.CrossContext',
    extends: bbfd.Context,

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
                if(this._injectionBinder === undefined)
                {
                    this._injectionBinder = new bbfd.CrossContextInjectionBinder();
                    //注入者初始化注入绑定者
                     bbfd.Inject.initialize(this._injectionBinder);
                }
                return this._injectionBinder;
            },
            set(value) {
                this._injectionBinder = value;
                bbfd.Inject.initialize(this._injectionBinder);
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
                return this._crossContextBridge?this._crossContextBridge:this._crossContextBridge = this.injectionBinder.GetInstance(bbfd.CrossContextBridge);
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
        if (this.injectionBinder.CrossContextBinder === undefined) {
            cc.log("CrossContext-addCoreComponents:");
            this.injectionBinder.CrossContextBinder = new bbfd.CrossContextInjectionBinder();
            //this.injectionBinder.CrossContextBinder.name = 'CrossContextBinder';
            //this.injectionBinder.CrossContextBinder.ToString();
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
        if (bbfd.Context.firstContext === this) {
            //cc.log("CrossContext-addCoreComponents:");
            //cc.log(cc.js.isChildClassOf(CrossContextInjectionBinder,InjectionBinder));
            this.injectionBinder.Bind(DispatcherImplements.IEventDispatcher).To(bbfd.EventDispatcher).ToSingleton().ToName(ContextKeys.CROSS_CONTEXT_DISPATCHER).CrossContext();
            //bbfd.debug('addCoreComponents============================');
            this.injectionBinder.Bind(bbfd.CrossContextBridge).ToSingleton().CrossContext();
        }
    },
    /**
     * 实例化核心组件
     * 如果找到上下文派发者，将添加触发能力。否则不处理
     * 实例化派发器好实例化交叉上下文派发器，并添加派发能力
     */
    instantiateCoreComponents() {
        this._super();
        var dispatcherBinding = this.injectionBinder.GetBinding(DispatcherImplements.IEventDispatcher,ContextKeys.CONTEXT_DISPATCHER);

       // bbfd.debug('CrossContext:instantiateCoreComponents1:'+dispatcherBinding);
        
        if (dispatcherBinding != null) {
            var dispatcher = this.injectionBinder.GetInstance(DispatcherImplements.IEventDispatcher,ContextKeys.CONTEXT_DISPATCHER);

            if (dispatcher != null) {
                this.crossContextDispatcher = this.injectionBinder.GetInstance(DispatcherImplements.IEventDispatcher,ContextKeys.CROSS_CONTEXT_DISPATCHER);
                //bbfd.debug('CrossContext:instantiateCoreComponents2:'+this.crossContextDispatcher);
                this.crossContextDispatcher.AddTriggerable(dispatcher);
                //dispatcher.AddTriggerable(this.crossContextBridge);
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
            this.AssignCrossContext(context);
        }
        return this;
    },
    /**
     * 执行赋值交叉上下文
     * @param {CrossContext} childContext 
     */
    AssignCrossContext(childContext) {
        //childContext.crossContextDispatcher = this.crossContextDispatcher;
        //childContext.injectionBinder.CrossContextBinder = this.injectionBinder.CrossContextBinder;
    },
    /**
     * 清空交叉上下文的派发者能力
     * @param {CrossContext} childContext 
     */
    RemoveCrossContext(childContext) {
        if (childContext.crossContextDispatcher != null) {
            //childContext.crossContextDispatcher.RemoveTriggerable(childContext.GetComponent(ContextKeys.CONTEXT_DISPATCHER));
            //childContext.crossContextDispatcher = null;
        }
    },
    /**
     * 移除交叉上下文
     * @param {CrossContext} context 
     */
    RemoveContext(context) {
        if(iImplements.ICrossContextCapable("CrossContext").ensureImplements([context]))
        {
           // RemoveCrossContext(context);
        }
        //this._super();
    },
    ToString(){
        return 'path:bbfd/extensions/context/impl/CrossContext'+' name:'+this.name;
    }
});

bbfd.CrossContext = module.exports = CrossContext;