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

let InjectorFactory = cc.Class({
    extends: cc.Object,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    Get(binding, args) {
        if (binding == null) {
            cc.warn("InjectorFactory cannot act on null binding", InjectionExceptionType.NULL_BINDING);
        }
        var type = binding.type;
        switch (type) {
            case InjectionBindingType.SINGLETON:
                return singletonOf(binding, args);
            case InjectionBindingType.VALUE:
                return valueOf(binding);
            default:
                break;
        }
        return instanceOf(binding, args);
    },
    singletonOf(binding, args) {
        if (binding.value != null) {
            if (binding.value.GetType().IsInstanceOfType(typeof (Type))) {
                var o = createFromValue(binding.value, args);
                if (o == null)
                    return null;
                binding.SetValue(o);
            }
            else {
                //no-op. We already have a binding value!
            }
        }
        else {
            binding.SetValue(generateImplicit((binding.key)[0], args));
        }
        return binding.value;
    },
    generateImplicit(key, args) {
        var type = key;
        if (!type.IsInterface && !type.IsAbstract) {
            return createFromValue(key, args);
        }
        cc.warn("InjectorFactory can't instantiate an Interface or Abstract Class. Class: " + key.ToString(), InjectionExceptionType.NOT_INSTANTIABLE);
    },
    valueOf(binding) {
        return binding.value;
    },
    instanceOf(binding, args) {
        if (binding.value != null) {
            return createFromValue(binding.value, args);
        }
        var value = generateImplicit((binding.key)[0], args);
        return createFromValue(value, args);
    },
    createFromValue(o, args) {
        var value = o.GetType();
        var retv = null;
        try {
            if (args == null || args.Length == 0) {
                retv = Activator.CreateInstance(value);
            }
            else {
                retv = Activator.CreateInstance(value, args);
            }
        }
        catch(err)
        {
            //No-op
        }
        return retv;
    }
    // update (dt) {},
});
