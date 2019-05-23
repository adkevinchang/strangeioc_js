// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
//反射绑定的作用
/*
var Binder = require("Binder");
var iImplements = require("ReflectedImplements");
var ReflectedClass = require('ReflectedClass');
var BindingConstraintType = require('BindingConstraintType');

let ReflectionBinder = cc.Class({
    extends: Binder,

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

    //=======================================================================================
    // 构造函数中初始化实现的接口方法
    //=======================================================================================

    ctor() {
        iImplements.IReflectionBinder("ReflectionBinder").ensureImplements([this]);

    },

    //=======================================================================================
    // -继承接口方法
    //=======================================================================================
    Get(type) {
        var binding = GetBinding(type);
        var retv;
        if (binding === null) {
            binding = GetRawBinding();
            var reflected = new ReflectedClass();
            mapPreferredConstructor(reflected, binding, type);
            mapSetters(reflected, binding, type); //map setters before mapping methods
            mapMethods(reflected, binding, type);
            binding.Bind(type).To(reflected);
            retv = binding.value;
            retv.PreGenerated = false;
        }
        else {
            retv = binding.value;
            retv.PreGenerated = true;
        }
        return retv;
    },
    GetRawBinding() {
        var binding = this._super();
        binding.valueConstraint = BindingConstraintType.ONE;
        return binding;
    },
    mapPreferredConstructor(reflected, binding, type) {
        constructor = findPreferredConstructor(type);
        if (constructor == null) {
            //throw new ReflectionException("The reflector requires concrete classes.\nType " + type + " has no constructor. Is it an interface?", ReflectionExceptionType.CANNOT_REFLECT_INTERFACE);
        }
        var parameters = constructor.GetParameters();
        var paramList = [];
        var names = [];
        var i = 0;
        parameters.forEach(param => {
            var paramType = param.ParameterType;
            paramList[i] = paramType;
            var attributes = param.GetCustomAttributes(typeof (Name), false);
            if (attributes.Length > 0) {
                names[i] = attributes[0].name;
            }
            i++;
        });
        reflected.Constructor = constructor;
        reflected.ConstructorParameters = paramList;
        reflected.ConstructorParameterNames = names;
    },
    findPreferredConstructor(type) {
        var constructors = type.GetConstructors(BindingFlags.FlattenHierarchy |
            BindingFlags.Public |
            BindingFlags.Instance |
            BindingFlags.InvokeMethod);
        if (constructors.Length == 1) {
            return constructors[0];
        }
        var len;
        var shortestLen = int.MaxValue;
        var shortestConstructor = null;
        constructors.forEach(constructor => {
            var taggedConstructors = constructor.GetCustomAttributes(typeof (Construct), true);
            if (taggedConstructors.Length > 0) {
                return constructor;
            }
            len = constructor.GetParameters().Length;
            if (len < shortestLen) {
                shortestLen = len;
                shortestConstructor = constructor;
            }
        });
        return shortestConstructor;
    },
    mapMethods(reflected, binding, type) {
        var methods = type.GetMethods(BindingFlags.FlattenHierarchy |
            BindingFlags.Public |
            BindingFlags.NonPublic |
            BindingFlags.Instance |
            BindingFlags.InvokeMethod);
        var methodList = new ArrayList();
        var attrMethods = [];
        methods.forEach(method => {
            var tagged = method.GetCustomAttributes(typeof (PostConstruct), true);
            if (tagged.Length > 0) {
                methodList.Add(method);
                attrMethods.Add(new KeyValuePair(method, tagged[0]));
            }
            var listensToAttr = method.GetCustomAttributes(typeof (ListensTo), true);
            if (listensToAttr.Length > 0) {
                for (let i = 0; i < listensToAttr.Length; i++) {
                    attrMethods.Add(new KeyValuePair(method, listensToAttr[i]));
                }
            }
        });
        methodList.Sort(new PriorityComparer());
        reflected.postConstructors = methodList.ToArray(typeof (MethodInfo));
        reflected.attrMethods = attrMethods.ToArray();
    },
    mapSetters(reflected, binding, type) {
        var privateMembers = type.FindMembers(MemberTypes.Property,
            BindingFlags.FlattenHierarchy |
            BindingFlags.SetProperty |
            BindingFlags.NonPublic |
            BindingFlags.Instance,
            null, null);
        privateMembers.forEach(member => {
            var injections = member.GetCustomAttributes(typeof (Inject), true);
            if (injections.Length > 0) {
                //throw new ReflectionException ("The class " + type.Name + " has a non-public Injection setter " + member.Name + ". Make the setter public to allow injection.", ReflectionExceptionType.CANNOT_INJECT_INTO_NONPUBLIC_SETTER);
            }
        });

        var members = type.FindMembers(MemberTypes.Property,
            BindingFlags.FlattenHierarchy |
            BindingFlags.SetProperty |
            BindingFlags.Public |
            BindingFlags.Instance,
            null, null);

        //propertyinfo.name to reflectedattribute
        //This is to test for 'hidden' or overridden injections.
        var namedAttributes = Object.create(null);
        members.forEach(member => {
            var injections = member.GetCustomAttributes(typeof (Inject), true);
            if (injections.Length > 0) {
                var attr = injections[0];
                var point = member;
                var baseType = member.DeclaringType.BaseType;
                var hasInheritedProperty = baseType != null ? baseType.GetProperties().Any(p => p.Name == point.Name) : false;
                var toAddOrOverride = true; //add or override by default

                //if we have an overriding value, we need to know whether to override or leave it out.
                //We leave out the base if it's hidden
                //And we add if its overriding.
                if (namedAttributes.ContainsKey(point.Name))
                    toAddOrOverride = hasInheritedProperty; //if this attribute has been 'hidden' by a new or override keyword, we should not add this.

                if (toAddOrOverride)
                    namedAttributes[point.Name] = new ReflectedAttribute(point.PropertyType, point, attr.name);
            }
        });
        reflected.Setters = namedAttributes.Values.ToArray();
    }
});*/
