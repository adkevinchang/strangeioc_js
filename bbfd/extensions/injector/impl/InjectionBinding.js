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
require('../../../framework/impl/Binding');
require('../../../framework/impl/SemiBinding');
const iimplements = require('../../../extensions/injector/api/InjectorImplements');
const InjectionBindingType = require('../api/InjectionBindingType');
const BindingConstraintType = require('../../../framework/api/BindingConstraintType');
const InjectionExceptionType = require('../api/InjectionExceptionType');

let InjectionBinding = cc.Class({
    name:'bbfd.InjectionBinding',
    extends: bbfd.Binding,

    properties: {
        supplyList: {
            // ATTRIBUTES:
            default: null,        // The default value will be used only when the component attaching
            // to a node for the first time
            type: Object, // optional, default is typeof default
            serializable: true,   // optional, default is true
        },
        type: {
            get() {
                return this._type ? this._type : this._type = InjectionBindingType.DEFAULT;
            },
            set(value) {
                this._type = value;
            }
        },
        toInject: {
            get() {
                return this._toInject ? this._toInject : this._toInject = true;
            }
        },
        isCrossContext: {
            get() {
                return this._isCrossContext ? this._isCrossContext : this._isCrossContext = false;
            }
        },
    },

    ctor() {
        iimplements.IInjectionBinding("InjectionBinding").ensureImplements([this]);
        this.supplyList = new bbfd.SemiBinding();
        this.keyConstraint = BindingConstraintType.MANY;
        this.valueConstraint = BindingConstraintType.ONE;
        this.supplyList.constraint = BindingConstraintType.MANY;
    },
    // 设置注入者的值
    ToInject(value) {
        this._toInject = value;
        return this;
    },
    //是交叉上下文，并溶解处理
    CrossContext() {
        this._isCrossContext = true;
        if (this.resolver !== null) {
            bbfd.debug("InjectionBinding:CrossContext:");
            this.resolver.invoke(this);
        }
        return this;
    },
    //成为唯一值，并溶解处理
    ToSingleton() {
        //If already a value, this mapping is redundant
        if (this.type === InjectionBindingType.VALUE)
            return this;

        this.type = InjectionBindingType.SINGLETON;
        if (this.resolver !== null) {
            bbfd.debug("InjectionBinding:ToSingleton:");
            this.resolver.invoke(this);
        }
        return this;
    },
    //设置为值 是实例对象
    ToValue(o) {
        this.type = InjectionBindingType.VALUE;
        this.SetValue(o);
        return this;
    },
    //设置为值
    //值的处理
    SetValue(o) {
        var keys = this.key;
        var aa = keys.Length;
        //Check that value is legal for the provided keys
        for (let a = 0; a < aa; a++) {
            var aKey = keys[a];
            //value绑定的key必须是接口或者是继承者
            var keyType = aKey;//(aKey is Type) ? aKey as Type : aKey.GetType();
            if(keyType.ensureImplements([o]) === false)
            {
                bbfd.debug('InjectionBinding-SetValue:'+aKey+'//'+o);
                throw new Error('Injection cannot bind a value that does not extend or implement the binding type.');
            }
        }
        this.To(o);
        return this;
    },
    HasGenericAssignableFrom(keyType, objType) {
        //FIXME: We need to figure out how to determine generic assignability
        if (keyType.IsGenericType == false)
            return false;

        return true;
    },
    IsGenericTypeAssignable(givenType, genericType) {
        var interfaceTypes = givenType.GetInterfaces();
        interfaceTypes.forEach(it => {
            if (it.IsGenericType && it.GetGenericTypeDefinition() == genericType)
                return true;
        });

        if (givenType.IsGenericType && givenType.GetGenericTypeDefinition() == genericType)
            return true;

        var baseType = givenType.BaseType;
        if (baseType == null) return false;

        return IsGenericTypeAssignable(baseType, genericType);
    },
    GetSupply(){
        return this.supplyList.value;
    },
    SupplyTo(){

    },
    Unsupply(){

    },
    ToString(){
        return 'path:bbfd/extensions/injector/impl/InjectionBinding'+' name:'+this.name;
    }
});

bbfd.InjectionBinding = module.exports = InjectionBinding;