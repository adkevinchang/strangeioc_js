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
const iImplements = require('./../api/ContextImplements');
const ContextStartupFlags = require("ContextStartupFlags");

let Context = cc.Class({
    name:"bbfd.Context",
    extends: bbfd.Binder,
    statics: {
        firstContext: null
    },
    properties: {
        autoStartup: {
            // ATTRIBUTES:
            default: null,        // The default value will be used only when the component attaching
            type: Boolean, // optional, default is typeof default
            serializable: true,   // optional, default is true
        },
        contextView: {
            get() {
                return this._contextView;
            },
            set(value) {
                this._contextView = value;
            }
        },
    },

    // LIFE-CYCLE CALLBACKS:
    //=======================================================================================
    // 构造函数中初始化实现的接口方法
    //=======================================================================================
    //Context(view,ContextStartupFlags.AUTOMATIC);

    ctor() {
        //初始化context并设置唯一舞台第一个上下文显示对象
        //并添加核心组件
        //如果自动启动在调用开始函数
        var flags = ContextStartupFlags.AUTOMATIC;
        var view = null;
        if (arguments.length == 0) {
            cc.error("context's arguments length must have view!");
            return;
        } else if (arguments.length == 1) {
            view = arguments[0];
        } else if (arguments.length > 1) {
            view = arguments[0];
            flags = arguments[1];
        }

        iImplements.IContext("Context").ensureImplements([this]);
        if (Context.firstContext === null || Context.firstContext.GetContextView() === null) {
            Context.firstContext = this;
        }
        else {
            Context.firstContext.AddContext(this);
        }
        this.SetContextView(view);
        this.addCoreComponents();
        //bbfd.debug('Context:ctor===========================');
        this.autoStartup = (flags & ContextStartupFlags.MANUAL_LAUNCH) != ContextStartupFlags.MANUAL_LAUNCH;
        if ((flags & ContextStartupFlags.MANUAL_MAPPING) != ContextStartupFlags.MANUAL_MAPPING) {
            this.Start();
        }
    },

    //=======================================================================================
    // -继承接口方法
    //=======================================================================================
    //整个功能模块启动
    Start() {
        //实例化核心的所有组件 如：命令绑定组件，中介绑定组件等
        this.instantiateCoreComponents();
        //全面的绑定机器操作
        this.mapBindings();
        //远程绑定机器操作
        this.postBindings();
        if (this.autoStartup)
            this.Launch();
        return this;
    },
    postBindings() {

    },
    Launch() {

    },
    AddContext(context) {
        return this;
    },
    RemoveContext(context) {
        if (context == firstContext) {
            firstContext = null;
        }
        else {
            context.OnRemove();
        }
        return this;
    },
    AddView(view) {

    },
    RemoveView(view) {

    },
    EnableView(view) {

    },
    DisableView(view) {

    },
    GetContextView() {
        return this.contextView;
    },
    mapBindings() {

    },
    addCoreComponents() {

    },
    instantiateCoreComponents() {

    },
    SetContextView(view) {
        this.contextView = view;
        return this;
    },
    GetComponent(key,name) {
        return null
    },
    ToString(){
        return 'path:bbfd/extensions/context/impl/Context'+' name:'+this.name;
    }
});

bbfd.Context = module.exports = Context;