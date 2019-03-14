// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

let InjectionExceptionType = cc.Enum({
    CIRCULAR_DEPENDENCY:0,
    /// The value of a binding does not extend or implement the binding type.
    ILLEGAL_BINDING_VALUE:1,
    /// No InjectionBinder found.
    NO_BINDER:2,
    /// No ReflectionBinder found.
    NO_REFLECTOR:3,
    /// No InjectorFactory found.
    NO_FACTORY:4,
    /// The provided binding is not an instantiable class.
    NOT_INSTANTIABLE:5,
    /// The requested Binding was null or couldn't be found.
    NULL_BINDING:6,
    /// During an attempt to construct, no constructor was found.
    NULL_CONSTRUCTOR:7,
    /// During setter injection the requested setter resolved to null.
    NULL_INJECTION_POINT:8,
    /// No reflection was provided for the requested class.
    NULL_REFLECTION:9,
    /// The instance being injected into resolved to null.
    NULL_TARGET:10,
    /// The value being injected into the target resolved to null.
    NULL_VALUE_INJECTION:11,
    /// The list of setters and setter names must have exactly the same number of entries.
    /// Two lists are required because Unity does not at present support Tuple.
    /// Seeing this error likely indicates a problem with the Reflector (it's not you, it's me).
    SETTER_NAME_MISMATCH:12,
    /// The requested cross-context injector returned null
    MISSING_CROSS_CONTEXT_INJECTOR:13,
    //An implicit implementor does not fulfill the designated interface
    IMPLICIT_BINDING_IMPLEMENTOR_DOES_NOT_IMPLEMENT_INTERFACE:14,
    //An implicit type does not implement the designated interface
    IMPLICIT_BINDING_TYPE_DOES_NOT_IMPLEMENT_DESIGNATED_INTERFACE:15,
    //Assembly object was not retrieved and cached
    UNINITIALIZED_ASSEMBLY:16,
})

module.exports = InjectionExceptionType;