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
const MediationImplements = require('../api/MediationImplements');
const Context = require('../../context/impl/Context');
const MediationExceptionType = require('../api/MediationExceptionType');

let BubbleType = {
    Add: 0,
    Remove: 1,
    Enable: 2,
    Disable: 3
};

let View = cc.Class({
    name:'bbfd.View',
    extends: cc.Component,
    properties: {
        requiresContext: {
            get() {
                return this._requiresContext;
            },
            set(value) {
                this._requiresContext = value;
            },
            visible:false
        },
        registeredWithContext: {
            get() {
                return this._registeredWithContext;
            },
            set(value) {
                this._registeredWithContext = value;
            },
            visible:false
        },
        autoRegisterWithContext: {
            get() {
                return this._autoRegisterWithContext;
            },
            visible:false
        },
        shouldRegister: {
            get() {
                return this.node.active;
            },
            visible:false
        }
    },
    ctor(){
        MediationImplements.IView('View').ensureImplements([this]);
    },
    onLoad() {
        if (this.autoRegisterWithContext && !this.registeredWithContext && this.shouldRegister)
            this.bubbleToContext(this, BubbleType.Add, false);
    },
    start() {
        if (this.autoRegisterWithContext && !this.registeredWithContext && this.shouldRegister)
        this.bubbleToContext(this, BubbleType.Add, true);
    },
    onDestroy() {
        this.bubbleToContext(this, BubbleType.Remove, false);
    },
    onEnable() {
        this.bubbleToContext(this, BubbleType.Enable, false);
    },
    onDisable() {
        this.bubbleToContext(this, BubbleType.Disable, false);
    },
    bubbleToContext(view, type, finalTry) {
        const LOOP_MAX = 100;
        var loopLimiter = 0;
        
        var trans = view.node;

        while (trans.parent != null && loopLimiter < LOOP_MAX) {
            loopLimiter++;
            trans = trans.parent;
            //if (trans.gameObject.GetComponent<ContextView>() != null)
            if (true) {
                var contextView = trans.getComponent(bbfd.ContextView);
                if (contextView!=null&&contextView.context != null) {
                    var context = contextView.context;
                    var success = true;

                    switch (type) {
                        case BubbleType.Add:
                            context.AddView(view);
                            this.registeredWithContext = true;
                            break;
                        case BubbleType.Remove:
                            context.RemoveView(view);
                            break;
                        case BubbleType.Enable:
                            context.EnableView(view);
                            break;
                        case BubbleType.Disable:
                            context.DisableView(view);
                            break;
                        default:
                            success = false;
                            break;
                    }

                    if (success) {
                        return;
                    }
                }
            }
        }
        if (this.requiresContext && finalTry && type == BubbleType.Add) {
            //last ditch. If there's a Context anywhere, we'll use it!
            if (Context.firstContext != null) {
                Context.firstContext.AddView(view);
                this.registeredWithContext = true;
                return;
            }

            var msg = (loopLimiter == LOOP_MAX) ?
                msg = "A view couldn't find a context. Loop limit reached." :
                msg = "A view was added with no context. Views must be added into the hierarchy of their ContextView lest all hell break loose.";
            msg += "\nView: " + view.ToString();
            cc.warn(msg,MediationExceptionType.NO_CONTEXT);
        }
    },
    //获取实现的接口
    getImplement(){
        return MediationImplements.IView;
    },
    ToString() {
        return 'path:bbfd/extensions/mediation/impl/View' + ' name:' + this.name;
    }
});

bbfd.View = module.exports = View;