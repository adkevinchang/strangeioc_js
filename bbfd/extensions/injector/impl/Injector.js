// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
var iimplements = require("InjectorImplements");

let Injector = cc.Class({
    extends: cc.Object,

    properties: {
        infinityLock: {
            // ATTRIBUTES:
            default: null,        // The default value will be used only when the component attaching
            // to a node for the first time
            type: Object, // optional, default is typeof default
            serializable: true,   // optional, default is true
        },
        INFINITY_LIMIT: {
            default: 10
        },
        factory: {
            get() {
                return this._factory;
            },
            set(value) {
                this._factory = value;
            }
        },
        binder: {
            get() {
                return this._binder;
            },
            set(value) {
                this._binder = value;
            }
        },
        reflector: {
            get() {
                return this._reflector;
            },
            set(value) {
                this._reflector = value;
            }
        },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {

    },
    Instantiate(binding, tryInjectHere) {
        failIf(binder == null, "Attempt to instantiate from Injector without a Binder", InjectionExceptionType.NO_BINDER);
        failIf(factory == null, "Attempt to inject into Injector without a Factory", InjectionExceptionType.NO_FACTORY);

        armorAgainstInfiniteLoops(binding);

        retv = null;
        reflectionType = null;

        if (binding.value)// is Type
        {
            reflectionType = binding.value;// as Type
        }
        else if (binding.value == null) {
            tl = binding.key;
            reflectionType = tl;
            if (reflectionType.IsPrimitive || reflectionType == typeof (Decimal) || reflectionType == typeof (string)) {
                retv = binding.value;
            }
        }
        else {
            retv = binding.value;
        }

        if (retv == null) //If we don't have an existing value, go ahead and create one.
        {

            reflection = reflector.Get(reflectionType);

            parameterTypes = reflection.constructorParameters;
            parameterNames = reflection.ConstructorParameterNames;

            aa = parameterTypes.Length;
            args = Object.create(null);
            for (let a = 0; a < aa; a++) {
                args[a] = getValueInjection(parameterTypes[a], parameterNames[a], reflectionType, null);
            }
            retv = factory.Get(binding, args);

            if (tryInjectHere) {
                TryInject(binding, retv);
            }
        }
        infinityLock = null; //Clear our infinity lock so the next time we instantiate we don't consider this a circular dependency

        return retv;
    },
    TryInject(binding, target) {
        //If the InjectorFactory returns null, just return it. Otherwise inject the retv if it needs it
        //This could happen if Activator.CreateInstance returns null
        if (target != null) {
            if (binding.toInject) {
                target = Inject(target, false);
            }

            if (binding.type == InjectionBindingType.SINGLETON || binding.type == InjectionBindingType.VALUE) {
                //prevent double-injection
                binding.ToInject(false);
            }
        }
        return target;
    },
    Inject(target, attemptConstructorInjection) {
        failIf(binder == null, "Attempt to inject into Injector without a Binder", InjectionExceptionType.NO_BINDER);
        failIf(reflector == null, "Attempt to inject without a reflector", InjectionExceptionType.NO_REFLECTOR);
        failIf(target == null, "Attempt to inject into null instance", InjectionExceptionType.NULL_TARGET);

        //Some things can't be injected into. Bail out.
        t = target.GetType();
        if (t.IsPrimitive || t == typeof (Decimal) || t == typeof (string)) {
            return target;
        }

        reflection = reflector.Get(t);

        if (attemptConstructorInjection) {
            target = performConstructorInjection(target, reflection);
        }
        performSetterInjection(target, reflection);
        postInject(target, reflection);
        return target;
    },
    Uninject(target) {
        failIf(binder == null, "Attempt to inject into Injector without a Binder", InjectionExceptionType.NO_BINDER);
        failIf(reflector == null, "Attempt to inject without a reflector", InjectionExceptionType.NO_REFLECTOR);
        failIf(target == null, "Attempt to inject into null instance", InjectionExceptionType.NULL_TARGET);

        t = target.GetType();
        if (t.IsPrimitive || t == typeof (Decimal) || t == typeof (string)) {
            return;
        }

        reflection = reflector.Get(t);

        performUninjection(target, reflection);
    },
    performConstructorInjection(target, reflection) {
        failIf(target == null, "Attempt to perform constructor injection into a null object", InjectionExceptionType.NULL_TARGET);
        failIf(reflection == null, "Attempt to perform constructor injection without a reflection", InjectionExceptionType.NULL_REFLECTION);

        constructor = reflection.constructor;
        failIf(constructor == null, "Attempt to construction inject a null constructor", InjectionExceptionType.NULL_CONSTRUCTOR);

        parameterTypes = reflection.constructorParameters;
        parameterNames = reflection.ConstructorParameterNames;
        values = [];

        var i = 0;
        parameterTypes.forEach(element => {
            values[i] = getValueInjection(type, parameterNames[i], target, null);
            i++;
        });
        if (values.Length == 0) {
            return target;
        }

        constructedObj = constructor.Invoke(values);
        return (constructedObj == null) ? target : constructedObj;
    },
    performSetterInjection(target, reflection) {
        failIf(target == null, "Attempt to inject into a null object", InjectionExceptionType.NULL_TARGET);
        failIf(reflection == null, "Attempt to inject without a reflection", InjectionExceptionType.NULL_REFLECTION);
        reflection.Setters.forEach(element => {
            value = getValueInjection(attr.type, attr.name, target, attr.propertyInfo);
            injectValueIntoPoint(value, target, attr.propertyInfo);
        });
    },
    getValueInjection(t, name, target, propertyInfo) {
        var suppliedBinding = null;
        if (target != null) {
            suppliedBinding = binder.GetSupplier(t, target);
        }

        //空合并运算
        var binding = null;
        if (binder.GetBinding(t, name) != null) {
            binding = binder.GetBinding(t, name);
        } else {
            if (suppliedBinding != null) {
                binding = suppliedBinding;
            }
        }

        failIf(binding == null, "Attempt to Instantiate a null binding", InjectionExceptionType.NULL_BINDING, t, name, target, propertyInfo);
        if (binding.type == InjectionBindingType.VALUE) {
            if (!binding.toInject) {
                return binding.value;
            } else {
                var retv = Inject(binding.value, false);
                binding.ToInject(false);
                return retv;
            }
        }
        else if (binding.type == InjectionBindingType.SINGLETON) {
            if (binding.value || binding.value == null) {
                Instantiate(binding, true);
            }
            return binding.value;
        }
        else {
            return Instantiate(binding, true);
        }
    },
    injectValueIntoPoint(value, target, point) {
        failIf(target == null, "Attempt to inject into a null target", InjectionExceptionType.NULL_TARGET);
        failIf(point == null, "Attempt to inject into a null point", InjectionExceptionType.NULL_INJECTION_POINT);
        failIf(value == null, "Attempt to inject null into a target object", InjectionExceptionType.NULL_VALUE_INJECTION);
        point.SetValue(target, value, null);
    },
    postInject(target, reflection) {
        failIf(target == null, "Attempt to PostConstruct a null target", InjectionExceptionType.NULL_TARGET);
        failIf(reflection == null, "Attempt to PostConstruct without a reflection", InjectionExceptionType.NULL_REFLECTION);

        postConstructors = reflection.postConstructors;
        if (postConstructors != null) {
            postConstructors.forEach(element => {
                element.Invoke(target, null);
            });
        }
    },
    performUninjection(target, reflection) {
        reflection.Setters.forEach(element => {
            element.propertyInfo.SetValue(target, null, null);
        });
    },
    failIf(condition, message, type, t, name, target, propertyInfo) {
        if (condition) {
            if (propertyInfo != null) {
                message += "\n\t\ttarget property: " + propertyInfo.Name;
            } else {
                message += "\n\t\ttarget: " + target;
                message += "\n\t\ttype: " + t;
                message += "\n\t\tname: " + name;
                cc.warn(message, type);
            }
        }
    },
    armorAgainstInfiniteLoops(binding) {
        if (binding == null) {
            return;
        }
        if (infinityLock == null) {
            infinityLock = Object.create(null);
        }
        if (infinityLock.ContainsKey(binding) == false) {
            infinityLock.Add(binding, 0);
        }
        infinityLock[binding] = infinityLock[binding] + 1;
        if (infinityLock[binding] > INFINITY_LIMIT) {
            cc.warn("There appears to be a circular dependency. Terminating loop.", InjectionExceptionType.CIRCULAR_DEPENDENCY);
        }
    }

    // update (dt) {},
});
