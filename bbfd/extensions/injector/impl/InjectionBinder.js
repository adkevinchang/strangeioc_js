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
require('../../../framework/impl/Binder')
require('../../../extensions/injector/impl/Injector')
require('../../../framework/impl/delegate');
const IImplements = require('../api/InjectorImplements');
const InjectionBinding = require('../impl/InjectionBinding');
const InjectionExceptionType = require('../api/InjectionExceptionType');

/**
 * 注入绑定者，控制绑定逻辑。
 */

let InjectionBinder = cc.Class({
    name:'bbfd.InjectionBinder',
    extends: bbfd.Binder,
    properties: {
        suppliers: {
            // ATTRIBUTES:
            default: null,        // The default value will be used only when the component attaching
            // to a node for the first time
            type: Object, // optional, default is typeof default
            serializable: true,   // optional, default is true
        },
        injector: {
            get() {
                return this._injector;
            },
            set(value) {
                if (this._injector != null) {
                    this._injector.binder = null;
                }
                this._injector = value;
                this._injector.binder = this;
            }
        },
    },

    // LIFE-CYCLE CALLBACKS:
    ctor() {
        IImplements.IInjectionBinder("InjectionBinder").ensureImplements([this]);
        this.suppliers = Object.create(null);
        this.injector = new bbfd.Injector();
        this.injector.binder = this;
        //this.injector.reflector = new ReflectionBinder();
    },
    
    GetInstance(key, name) {
        var binding = this.GetBinding(key, name);
        if (binding === null) {
            throw new Error("InjectionBinder has no binding for:\n\tkey: " + key + "\nname: " + name, InjectionExceptionType.NULL_BINDING);
        }
        //bbfd.debug("InjectionBinder:GetInstance0:"+binding.ToString());
        var instance = this.GetInjectorForBinding(binding).Instantiate(binding,false);
        //bbfd.debug("InjectionBinder:GetInstance1:"+instance.ToString());
        this.injector.TryInject(binding,instance);
        return instance;
    },
    GetInjectorForBinding(binding) {
        return this.injector;
    },
    GetRawBinding() {
        return new bbfd.InjectionBinding(bbfd.createDelegate(this, this.resolver));
    },

    /**
     * 所有类型的查找和遍历
     */
    ReflectAll() {
        var list = [];
        bindings.forEach(element => {
            var dict = element.Value;
            dict.forEach(bPair => {
                var binding = bPair.Value;
                var t = binding.value;
                if (list.IndexOf(t) == -1) {
                    list.push(t);
                }
            });
        });
        return Reflect(list);
    },

    /**
     * 反射类型到注入者
     * @param {类型列表} list 
     */
    Reflect(list) {
        var count = 0;
        list.forEach(element => {
            // if (element.IsPrimitive || element == typeof (Decimal) || element == typeof (string)) {
            //     continue;
            // }
            count++;
            this.injector.reflector.Get(element);
        });
        return count;
    },

    performKeyValueBindings(keyList, valueList) {
        var binding = null;
        // Bind in order
        keyList.forEach(element => {
            var keyType = Type.GetType(element);
            if (keyType == null) {
                throw new BinderException("A runtime Injection Binding has resolved to null. Did you forget to register its fully-qualified name?\n Key:" + element, BinderExceptionType.RUNTIME_NULL_VALUE);
            }
            if (binding == null) {
                binding = Bind(keyType);
            }
            else {
                binding = binding.Bind(keyType);
            }
        });
        valueList.forEach(element => {
            var valueType = Type.GetType(value);
            if (valueType == null) {
                throw new BinderException("A runtime Injection Binding has resolved to null. Did you forget to register its fully-qualified name?\n Value:" + value, BinderExceptionType.RUNTIME_NULL_VALUE);
            }
            binding = binding.To(valueType);
        });
        return binding;
    },
    addRuntimeOptions(b, options) {
        base.addRuntimeOptions(b, options);
        var binding = b;
        if (options.IndexOf("ToSingleton") > -1) {
            binding.ToSingleton();
        }
        if (options.IndexOf("CrossContext") > -1) {
            binding.CrossContext();
        }
        var dict = Object.create(null);
        if (dict.Any()) {
            var supplyToDict = dict.First(a => a.Keys.Contains("SupplyTo"));
            if (supplyToDict != null) {
                foreach(KeyValuePair < string, object > kv in supplyToDict)
                {
                    if (kv.Value) {
                        var valueType = Type.GetType(kv.Value);
                        binding.SupplyTo(valueType);
                    }
                    else {
                        var values = kv.Value;
                        for (let a = 0, aa = values.Count; a < aa; a++) {
                            var valueType = Type.GetType(values[a]);
                            binding.SupplyTo(valueType);
                        }
                    }
                }
            }
        }

        return binding;
    }, 
    GetSupplier(injectionType, targetType) {
        if (suppliers.ContainsKey(targetType)) {
            if (suppliers[targetType].ContainsKey(injectionType)) {
                return suppliers[targetType][injectionType];
            }
        }
        return null;
    },
    Unsupply(injectionType, targetType) {
        var binding = GetSupplier(injectionType, targetType);
        if (binding != null) {
            suppliers[targetType].Remove(injectionType);
            binding.Unsupply(targetType);
        }
    },
    resolver(binding) {
        bbfd.debug('InjectionBinder:resolver0' + binding);
        var iBinding = binding;
        var supply = iBinding.GetSupply();

        if (supply != null) {
            bbfd.debug('InjectionBinder:resolver1');
            supply.forEach(element => {
                var aType = a;
                if (suppliers.ContainsKey(aType) == false) {
                    suppliers[aType] = Object.create(null);
                }
                var keys = iBinding.key;
                keys.forEach(element => {
                    var keyType = key;
                    if (suppliers[aType].ContainsKey(keyType) == false) {
                        bbfd.debug("InjectionBinder-test:" + aType + "//" + keyType);
                        suppliers[aType][keyType] = iBinding;
                    }
                });
            });
        }

        this._super(binding);
    },
     /**
     *输出类路径与名字
     */
    ToString() {
        return 'path:bbfd/extensions/injector/impl/InjectionBinder' + ' name:' + this.name;
    }
});

bbfd.InjectionBinder = module.exports = InjectionBinder;