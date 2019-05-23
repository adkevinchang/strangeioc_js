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
const iimplements = require('../api/InjectorImplements');
const InjectionBindingType  = require('../api/InjectionBindingType');

let InjectorFactory = cc.Class({
    name:'bbfd.InjectorFactory',
    extends: cc.Object,
    properties: {
    },
    Get(binding,args) {
        if (binding === null) {
            cc.warn("InjectorFactory cannot act on null binding", InjectionExceptionType.NULL_BINDING);
        }
        var type = binding.type;
        switch (type) {
            case InjectionBindingType.SINGLETON:
                return this.singletonOf(binding, args);
            case InjectionBindingType.VALUE:
                return this.valueOf(binding);
            default:
                break;
        }
        return this.instanceOf(binding,args);
    },
    singletonOf(binding, args) {
        if (binding.value != null) {
            if (binding.toInject) {
                var o = this.createFromValue(binding.value, args);
                if (o === null)
                    return null;
                binding.SetValue(o);
            }
            else {
                return binding.value;
            }
        }
        else {
            //如果绑定值为空，则把它的绑定keys数组的第一个值实例化
            binding.SetValue(this.generateImplicit((binding.key)[0], args));
        }
        return binding.value;
    },
    //如果绑定值为空，则把它的绑定keys数组的第一个值实例化
    generateImplicit(key, args) {
        var type = key;
        if(typeof key === "function")
        {
            return this.createFromValue(key, args);
        }
       // if (!type.IsInterface && !type.IsAbstract) {   
       // }
        cc.warn("InjectorFactory can't instantiate an Interface or Abstract Class. Class: " + key.ToString(), InjectionExceptionType.NOT_INSTANTIABLE);
    },
    valueOf(binding) {
        return binding.value;
    },
    instanceOf(binding, args) {
        if (binding.value != null) {
            return this.createFromValue(binding.value, args);
        }
        let value = this.generateImplicit((binding.key)[0], args);
        return this.createFromValue(value, args);
    },
    //实例化
    createFromValue(o, args) {
        let retv = null;
        var typeOrClassName = o;
        var constructor;
        if (typeof typeOrClassName === 'string') {
            constructor = cc.js.getClassByName(typeOrClassName);
            if (!constructor) {
                cc.errorID(3807, typeOrClassName);
                if (cc._RFpeek()) {
                    cc.errorID(3808, typeOrClassName);
                }
                return null;
            }
        }
        else {
            if (!typeOrClassName) {
                cc.errorID(3804);
                return null;
            }
            constructor = typeOrClassName;
        }
        if(typeof constructor === 'function')
        {
            retv = new constructor();
        }else{
            retv = constructor;
        }
        return retv;
    },
    ToString() {
        return 'path:bbfd/extensions/injector/impl/InjectorFactory' + ' name:' + this.name;
    }
});

bbfd.InjectorFactory = module.exports = InjectorFactory;