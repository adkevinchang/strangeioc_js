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
require('../CrossContext');
require('../../dispatcher/impl/EventDispatcher');
require('../../command/impl/SignalCommandBinder');
require('../../../framework/api/Inject');
require('../../mediation/SignalMediationBinder');
require('../impl/ContextView');
require('../../../framework/impl/SemiBinding');
const injectorImp = require('../../injector/api/InjectorImplements');
const imp = require('../../../framework/api/Implements');
const contextImp = require('../../context/api/ContextImplements');
const ContextKeys = require('../api/ContextKeys');
const ContextEvent = require('../api/ContextEvent');
const commandImp = require('../../command/api/CommandImplements');
const dispatcherImp = require('../../dispatcher/api/DispatcherImplements');
const mediaImp = require('../../../extensions/mediation/api/MediationImplements');
const ContextExceptionType = require('../api/ContextExceptionType');
const MediationEvent = require('../../mediation/api/MediationEvent');

let MVCSContext = cc.Class({
    name:'bbfd.MVCSContext',
    extends: bbfd.CrossContext,
    statics: {
        viewCache: {
            // ATTRIBUTES:
            default: new bbfd.SemiBinding(),        // The default value will be used only when the component attaching
                                  // to a node for the first time
            type: bbfd.SemiBinding, // optional, default is typeof default
        },
    },
    properties: {
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
        //bbfd.debug('MVCSContext SetContextView:');
       // bbfd.debug(view.node);
        this.contextView = view.node;
        if (this.contextView === null) {
           cc.error("MVCSContext requires a ContextView of type cc.Component", "MVCSContext");
        }
        return this
    },
    addCoreComponents() {
        this._super();
        this.injectionBinder.Bind(imp.IInstanceProvider).Bind(injectorImp.IInjectionBinder).ToValue(this.injectionBinder);
        this.injectionBinder.Bind(contextImp.IContext).ToValue(this).ToName(ContextKeys.CONTEXT);
        this.injectionBinder.Bind(commandImp.ICommandBinder).To(bbfd.SignalCommandBinder).ToSingleton();
        this.injectionBinder.Bind(dispatcherImp.IEventDispatcher).To(bbfd.EventDispatcher);
        bbfd.debug('MVCSContext-addCoreComponents2');
        this.injectionBinder.Bind(dispatcherImp.IEventDispatcher).To(bbfd.EventDispatcher).ToSingleton().ToName(ContextKeys.CONTEXT_DISPATCHER);
        this.injectionBinder.Bind(mediaImp.IMediationBinder).To("bbfd.SignalMediationBinder").ToSingleton();
        //var obj1 = this.injectionBinder.GetInstance(contextImp.IContext,ContextKeys.CONTEXT);
        //bbfd.debug('===========================addCoreComponents');
        //bbfd.debug(obj1);
        //this.injectionBinder.Bind().Bind().ToValue();
        //this.injectionBinder.Bind().Bind().ToValue();
        //this.injectionBinder.Bind().Bind().ToValue();
        //this.injectionBinder.Bind().Bind().ToValue();
        //this.injectionBinder.Bind().Bind().ToValue();
        //this.injectionBinder.Bind().Bind().ToValue();
        //this.injectionBinder.Bind().Bind().ToValue();
    },
    instantiateCoreComponents() {
        this._super();
        //if (this.contextView === null) {
           //cc.error("MVCSContext requires a ContextView of type cc.Component", "MVCSContext");
        //}
        this.injectionBinder.Bind(bbfd.ContextView).ToValue(this.contextView).ToName(ContextKeys.CONTEXT_VIEW);
        this.commandBinder = this.injectionBinder.GetInstance(commandImp.ICommandBinder);
        this.dispatcher = this.injectionBinder.GetInstance(dispatcherImp.IEventDispatcher,ContextKeys.CONTEXT_DISPATCHER);
        this.mediationBinder = this.injectionBinder.GetInstance(mediaImp.IMediationBinder);
        //bbfd.debug('============================================================================================MVCSContext-instantiateCoreComponents2'+this.dispatcher);
       // injectionBinder.Bind().ToValue().ToName();
       // commandBinder = injectionBinder.GetInstance();
       // dispatcher = injectionBinder.GetInstance();
       // mediationBinder = injectionBinder.GetInstance();
       // sequencer = injectionBinder.GetInstance();
       // implicitBinder = injectionBinder.GetInstance();

        this.dispatcher.AddTriggerable(this.commandBinder);
       // dispatcher.AddTriggerable(sequencer)
    },
    postBindings() {
        bbfd.debug('postBindings');
        this.mediateViewCache();
        this.mediationBinder.Trigger(MediationEvent.ONLOAD, this.contextView.getComponent(bbfd.ContextView));
    },
    Launch() {
        //bbfd.debug('===========================Launch:');
        //let test = bbfd.Inject.Injecting('bbfd.CommandBinder','injectionBinder',injectorImp.IInjectionBinder);
       // bbfd.debug('===========================Launch:'+test);
        //this.commandBinder = this.injectionBinder.GetInstance(commandImp.ICommandBinder); 
        this.dispatcher.Dispatch(ContextEvent.START);
        //bbfd.debug('MVCSContext=Launch============================================='+ this.dispatcher.triggerClients);
        //bbfd.debug('MVCSContext=Launch============================================='+ this.dispatcher.triggerClients.length);
        //bbfd.debug('===========================Launch');
    },
    GetComponent(key,name) {
       var binding = this.injectionBinder.GetBinding(key,name);
       if (binding != null) {
            return this.injectionBinder.GetInstance(key,name);
       }
       return null;
    },
    AddView(view) {
       if (this.mediationBinder != null) {
           this.mediationBinder.Trigger(MediationEvent.ONLOAD, view);
       }
       else {
           this.cacheView(view);
       }
    },
    RemoveView(view) {
        this.mediationBinder.Trigger(MediationEvent.DESTROYED, view);
    },
    EnableView(view) {
        this.mediationBinder.Trigger(MediationEvent.ENABLED, view);
    },
    DisableView(view) {
        this.mediationBinder.Trigger(MediationEvent.DISABLED, view);
    },
    cacheView(view) {
        if (MVCSContext.viewCache.constraint === BindingConstraintType.ONE)
        {
        	MVCSContext.viewCache.constraint = BindingConstraintType.MANY;
        }
        MVCSContext.viewCache.Add(view);
    },
    mediateViewCache() {
       if (this.mediationBinder == null)
           CC.error("MVCSContext cannot mediate views without a mediationBinder",ContextExceptionType.NO_MEDIATION_BINDER);

       var values = MVCSContext.viewCache.value;
       if (values === null||values === undefined) {
           return;
       }
       var aa = values.Length;
        for (var a = 0; a < aa; a++) {
           this.mediationBinder.Trigger(MediationEvent.ONLOAD, values[a]);
       }
       MVCSContext.viewCache = new bbfd.SemiBinding();
    },
    OnRemove() {
        this._super();
        this.commandBinder.OnRemove();
    },
    ToString(){
        return 'path:bbfd/extensions/context/impl/MVCSContext'+' name:'+ this.name;
    }
    // update (dt) {},
});

bbfd.MVCSContext = module.exports = MVCSContext;