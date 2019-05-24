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
require('../../../framework/api/Inject');
require('../impl/MediationBinder');
require('../../mediation/impl/MediationBinding');

const iimplements = require('../api/MediationImplements');
const InjectorImplements = require('../../injector/api/InjectorImplements');
const MediationEvent = require('../api/MediationEvent');

let AbstractMediationBinder = cc.Class({
    extends: bbfd.Binder,

    properties: {
        injectionBinder: {
            get() {
                //注入者初始化注入绑定者
                return this._injectionBinder?this._injectionBinder:this._injectionBinder = bbfd.Inject.Injecting('bbfd.AbstractMediationBinder','injectionBinder',InjectorImplements.IInjectionBinder);
            },
            set(value) {
                this._injectionBinder = value;
            }
        }
    },

    // LIFE-CYCLE CALLBACKS:
    //=======================================================================================
    // 构造函数中初始化实现的接口方法
    //=======================================================================================

    ctor() {
        iimplements.IMediationBinder("AbstractMediationBinder").ensureImplements([this]);

    },
    GetRawBinding() {
        return new bbfd.MediationBinding(bbfd.createDelegate(this, this.resolver));
    },
    //触发事件，不同的事件类型做不同的处理。
    Trigger(evt, view) {
       // bbfd.debug('AbstractMediationBinder-Trigger1-:'+view+'//'+binding+'//'+evt);
        var binding = this.GetBinding(view.constructor);
        bbfd.debug('AbstractMediationBinder-Trigger2-:'+view.constructor+'//'+binding+'//'+evt);
        if (binding != null) {
            switch (evt) {
                case MediationEvent.ONLOAD:
                    this.InjectViewAndChildren(view);
                    this.MapView(view, binding);
                    break;
                case MediationEvent.DESTROYED:
                    this.UnmapView(view, binding);
                    break;
                case MediationEvent.ENABLED:
                    this.EnableView(view, binding);
                    break;
                case MediationEvent.DISABLED:
                    this.DisableView(view, binding);
                    break;
                default:
                    break;
            }
        }
        else if (evt === MediationEvent.ONLOAD) {
            //Even if not mapped, Views (and their children) have potential to be injected
            this.InjectViewAndChildren(view);
        }
    },
    //更新所有中介类时，同时注入view的类型。
    ApplyMediationToView(binding, view, mediatorType) {
        bbfd.debug('AbstractMediationBinder:ApplyMediationToView'+view.constructor);
        var isTrueMediator = this.IsTrueMediator(mediatorType);
        if (!isTrueMediator || !this.HasMediator(view, mediatorType)) {
            let viewType = view.constructor;
            var typeToInject = (binding.abstraction == null) ? viewType : binding.abstraction;
            bbfd.debug('AbstractMediationBinder:ApplyMediationToView0'+typeToInject+'//'+view);
            this.injectionBinder.Bind(typeToInject).ToValue(view).ToInject(false);
            var mediator = this.CreateMediator(view, mediatorType);
            if (mediator == null)
            {
                this.ThrowNullMediatorError(viewType, mediatorType);
            }
            bbfd.debug('AbstractMediationBinder:ApplyMediationToView1'+isTrueMediator+'//'+mediator);
            if (isTrueMediator)
            {
                mediator.PreRegister();
            }
            //var typeToInject = (binding.abstraction == null || binding.abstraction.Equals(BindingConst.NULLOID)) ? iimplements.IView : binding.abstraction;
            //this.injectionBinder.Bind(typeToInject).ToValue(view).ToInject(false);
            //this.injectionBinder.injector.Inject(mediator);
            //this.injectionBinder.Unbind(typeToInject);
            if (isTrueMediator) {
                mediator.OnRegister();
            }
        }
    },
    //注入显示对象和所有的子集
    InjectViewAndChildren(view) {
        var views = this.GetViews(view);
        var aa = views.length;
        bbfd.debug('AbstractMediationBinder-InjectViewAndChildren-length:'+aa);
        for (let a = aa - 1; a > -1; a--) {
            var iView = views[a];
            bbfd.debug('AbstractMediationBinder-InjectViewAndChildren0:'+iView.active);
            if (iView != null && iView.shouldRegister) {
                if (iView.autoRegisterWithContext && iView.registeredWithContext) {
                    bbfd.debug('AbstractMediationBinder-InjectViewAndChildren1:');
                    continue;
                }
                iView.registeredWithContext = true;
                bbfd.debug('AbstractMediationBinder-InjectViewAndChildren2:'+iView);
                if (iView !== view)
                {
                    this.Trigger(MediationEvent.ONLOAD, iView);
                    bbfd.debug('AbstractMediationBinder-InjectViewAndChildren3:');
                }
            }
        }
        this.injectionBinder.injector.Inject(view, false);
    },
    //待优化
    IsTrueMediator(mediatorType) {
        //if(cc.js.isChildClassOf(mediatorType,bbfd.EventMediator))
       // bbfd.debug("AbstractMediationBinder-IsTrueMediator1:"+cc.js.isChildClassOf(mediatorType,bbfd.EventMediator));
        //bbfd.debug("AbstractMediationBinder-IsTrueMediator2:"+mediatorType);
        if(iimplements.IMediator("IsTrueMediator").ensureImplements([new mediatorType()]))
        {
            //bbfd.debug("AbstractMediationBinder-IsTrueMediator1:true");
            return true;
        }
        return null;
       // return typeof (IMediator).IsAssignableFrom(mediatorType);
    },
    //Type.GetType(key)  找寻类型该如何定义
    performKeyValueBindings(keyList, valueList) {
        var binding = null;
        // Bind in order
        keyList.forEach(key => {
            var keyType = Type.GetType(key);
            //if (keyType == null) {
               // cc.warn("A runtime Mediation Binding has resolved to null. Did you forget to register its fully-qualified name?\n View:" + key, BinderExceptionType.RUNTIME_NULL_VALUE);
            //}
            binding = Bind(keyType);
        });
        valueList.forEach(value => {
            var valueType = Type.GetType(value);
            if (valueType == null) {
                cc.warn("A runtime Mediation Binding has resolved to null. Did you forget to register its fully-qualified name?\n Mediator:" + value, BinderExceptionType.RUNTIME_NULL_VALUE);
            }
            binding = binding.To(valueType);
        });
        return binding;
    },
    //????????????
    ConformRuntimeItem(dictionary) {
        var bindItems = Object.create(null);
        var toItems = Object.create(null);
        dictionary.forEach(item => {
            if (item.Key == "BindView") {
                bindItems["Bind"] = item.Value;
            }
            else if (item.Key == "ToMediator") {
                toItems['To'] = item.Value;
            }
        });
        bindItems.forEach(item => {
            //dictionary.Remove("BindView");
            //dictionary.Add("Bind", item.Value);
        });
        toItems.forEach(item => {
            //dictionary.Remove("ToMediator");
            //dictionary.Add("To", item.Value);
        });
        return dictionary;
    },
    //消费目录？？？？？？？？？？？？？？？
    ConsumeItem(item, testBinding) {
        var binding = this._super(item, testBinding);
        item.forEach(i => {
            if (i.Key == "ToAbstraction") {
                var abstractionType = Type.GetType(i.Value);
                var mediationBinding = binding;
                if (abstractionType == null) {
                    cc.warn("A runtime abstraction in the MediationBinder returned a null Type. " + i.ToString(), BinderExceptionType.RUNTIME_NULL_VALUE);
                }
                if (mediationBinding == null) {
                    cc.warn("During an attempt at runtime abstraction a MediationBinding could not be found. " + i.ToString(), MediationExceptionType.BINDING_RESOLVED_TO_NULL);
                }

                mediationBinding.ToAbstraction(abstractionType);
            }
        });
        return binding;
    },
    BindView(key) {
        return this.Bind(key)
    },
    MapView(view, binding) {
        var viewType = view.constructor;
        bbfd.debug('AbstractMediationBinder-MapView1:'+viewType);
        if (this.bindings[viewType]) {
            var values = binding.value;
            var aa = values.length;
            bbfd.debug('AbstractMediationBinder-MapView-length:'+aa);
            for (let a = 0; a < aa; a++) {
                var mediatorType = values[a];
                if (mediatorType == viewType) {
                    cc.warn(viewType + "mapped to itself. The result would be a stack overflow.", MediationExceptionType.MEDIATOR_VIEW_STACK_OVERFLOW);
                }
                bbfd.debug('AbstractMediationBinder-MapView2:'+viewType);
                this.ApplyMediationToView(binding, view, mediatorType);

                if (view.active)
                    this.EnableMediator(view, mediatorType);
            }
        }
    },
    UnmapView(view, binding) {
        this.TriggerInBindings(view, binding, this.DestroyMediator);
    },
    EnableView(view, binding) {
        this.TriggerInBindings(view, binding, this.EnableMediator);
    },
    DisableView(view, binding) {
        this.TriggerInBindings(view, binding, this.DisableMediator);
    },
    TriggerInBindings(view, binding, method) {
        var viewType = view.constructor;

        if (this.bindings[viewType]) {
            var values = binding.value;
            var aa = values.Length;
            for (let a = 0; a < aa; a++) {
                var mediatorType = values[a];
                this.method(view, mediatorType);
            }
        }
    },
    CreateMediator(){

    },
    DestroyMediator() {

    },
    EnableMediator() {

    },
    DisableMediator() {

    },
    GetViews(){

    },
    HasMediator(){

    },
    ThrowNullMediatorError()
    {
        
    }
    //=======================================================================================
    // -继承接口方法
    //=======================================================================================
    ,
    ToString() {
        return 'path:bbfd/extensions/mediation/impl/AbstractMediationBinder' + ' name:' + this.name;
    }

});
bbfd.AbstractMediationBinder = module.exports = AbstractMediationBinder;