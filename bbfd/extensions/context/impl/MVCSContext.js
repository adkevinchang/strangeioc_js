// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
var CrossContext = require("CrossContext");
var SemiBinding = require("SemiBinding");

let MVCSContext = cc.Class({
    extends: CrossContext,
    statics: {
        viewCache: {
            // ATTRIBUTES:
            default: new SemiBinding(),        // The default value will be used only when the component attaching
            // to a node for the first time
            type: SemiBinding, // optional, default is typeof default
            serializable: true,   // optional, default is true
        },
    },
    properties: {
        // viewCache: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        commandBinder: {
            get() {
                return this._commandBinder;
            },
            set(value) {
                this._commandBinder = value;
            }
        },
        dispatcher: {
            get() {
                return this._dispatcher;
            },
            set(value) {
                this._dispatcher = value;
            }
        },
        mediationBinder: {
            get() {
                return this._mediationBinder;
            },
            set(value) {
                this._mediationBinder = value;
            }
        },
        implicitBinder: {
            get() {
                return this._implicitBinder;
            },
            set(value) {
                this._implicitBinder = value;
            }
        },
        sequencer: {
            get() {
                return this._sequencer;
            },
            set(value) {
                this._sequencer = value;
            }
        },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {

    },
    //view cc.Component
    SetContextView(view) {
        this.contextView = view.node;
        if (this.contextView == null) {
            cc.error("MVCSContext requires a ContextView of type cc.Component", "MVCSContext");
        }
        return this
    },
    addCoreComponents() {
        this._super();
        injectionBinder.Bind().Bind().ToValue();
        injectionBinder.Bind().Bind().ToValue();
        injectionBinder.Bind().Bind().ToValue();
        injectionBinder.Bind().Bind().ToValue();
        injectionBinder.Bind().Bind().ToValue();
        injectionBinder.Bind().Bind().ToValue();
        injectionBinder.Bind().Bind().ToValue();
        injectionBinder.Bind().Bind().ToValue();
    },
    instantiateCoreComponents() {
        this._super();
        if (contextView == null) {
            cc.error("MVCSContext requires a ContextView of type cc.Component", "MVCSContext");
        }
        injectionBinder.Bind().ToValue().ToName();
        commandBinder = injectionBinder.GetInstance();
        dispatcher = injectionBinder.GetInstance();
        mediationBinder = injectionBinder.GetInstance();
        sequencer = injectionBinder.GetInstance();
        implicitBinder = injectionBinder.GetInstance();

        dispatcher.AddTriggerable(commandBinder)
        dispatcher.AddTriggerable(sequencer)
    },
    postBindings() {
        mediateViewCache();
        mediationBinder.Trigger(MediationEvent.AWAKE, contextView.getComponent(ContextView));
    },

    Launch() {
        dispatcher.Dispatch(ContextEvent.START);
    },
    GetComponent(name) {
        binding = injectionBinder.GetBinding(name);
        if (binding != null) {
            return binding;
        }
        return null;
    },
    AddView(view) {
        if (mediationBinder != null) {
            mediationBinder.Trigger(MediationEvent.AWAKE, view);
        }
        else {
            cacheView(view);
        }
    },
    RemoveView(view) {
        mediationBinder.Trigger(MediationEvent.DESTROYED, view);
    },
    EnableView(view) {
        mediationBinder.Trigger(MediationEvent.ENABLED, view);
    },
    DisableView(view) {
        mediationBinder.Trigger(MediationEvent.DISABLED, view);
    },
    cacheView(view) {
        //if (viewCache.constraint.Equals(BindingConstraintType.ONE))
        //{
        //	viewCache.constraint = BindingConstraintType.MANY;
        //}
        viewCache.Add(view);
    },
    mediateViewCache() {
        if (mediationBinder == null)
            CC.error("MVCSContext cannot mediate views without a mediationBinder", "ContextExceptionType.NO_MEDIATION_BINDER");

        var values = viewCache.value;
        if (values == null) {
            return;
        }
        var aa = values.Length;
        for (var a = 0; a < aa; a++) {
            mediationBinder.Trigger(MediationEvent.AWAKE, values[a]);
        }
        viewCache = new SemiBinding();
    },
    OnRemove() {
        this._super();
        commandBinder.OnRemove();
    }
    // update (dt) {},
});