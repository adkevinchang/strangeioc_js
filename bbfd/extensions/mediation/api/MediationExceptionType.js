// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
let MediationExceptionType = cc.Enum({
    NO_CONTEXT: 'NO_CONTEXT',

    /// Exception raised when a View is mapped to itself.
    /// If a View is accidentally mapped to itself, the result will be an
    /// infinite loop of Mediation creation.
    MEDIATOR_VIEW_STACK_OVERFLOW: 'MEDIATOR_VIEW_STACK_OVERFLOW',

    /// A Binding resolved to null as it was converted (usually from a Binding)
    /// Honestly, this should never happen.
    BINDING_RESOLVED_TO_NULL: 'BINDING_RESOLVED_TO_NULL',

    /// Exception raised when AddComponent results in a null Mediator.
    /// This probably means that the mapped "mediator" wasn't a MonoBehaviour.
    NULL_MEDIATOR: 'NULL_MEDIATOR',

    /// The mediator type is null on the attribute tag
    IMPLICIT_BINDING_MEDIATOR_TYPE_IS_NULL: 'IMPLICIT_BINDING_MEDIATOR_TYPE_IS_NULL',
    /// The view type is null on the attribute tag
    IMPLICIT_BINDING_VIEW_TYPE_IS_NULL: 'IMPLICIT_BINDING_VIEW_TYPE_IS_NULL',

    /// View bound to abstraction that View doesn't actually extend/implement
    VIEW_NOT_ASSIGNABLE: 'VIEW_NOT_ASSIGNABLE',
})

module.exports = MediationExceptionType;