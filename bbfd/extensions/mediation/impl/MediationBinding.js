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

const BindingConst = require('../../../framework/api/BindingConst');
const iimplements = require('../api/MediationImplements');
const BindingConstraintType = require('../../../framework/api/BindingConstraintType');
const MediationExceptionType = require('../api/MediationExceptionType');

let MediationBinding = cc.Class({
    extends: bbfd.Binding,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        abstraction: {
            get() {
                return (this._abstraction.value == null) ? BindingConst.NULLOID : this._abstraction.value;
            }
        },
    },

    // LIFE-CYCLE CALLBACKS:
    //=======================================================================================
    // 构造函数中初始化实现的接口方法
    //=======================================================================================

    ctor() {
        iimplements.IMediationBinding("MediationBinding").ensureImplements([this]);
        this._abstraction = new bbfd.SemiBinding();
        this._abstraction.constraint = BindingConstraintType.ONE;
    },

    //=======================================================================================
    // -继承接口方法
    //=======================================================================================
    ToMediator(value) {
        return this.To(value);
    },
    ToAbstraction(t) {
        var abstractionType = t;
        if (key != null) {
            var keyType = key;
            if (abstractionType.IsAssignableFrom(keyType) == false)
                cc.warn("The View " + key.ToString() + " has been bound to the abstraction " + t.ToString() + " which the View neither extends nor implements. ", MediationExceptionType.VIEW_NOT_ASSIGNABLE);
        }
        this._abstraction.Add(abstractionType);
        return this;
    },
    ToString() {
        return 'path:bbfd/extensions/mediation/impl/MediationBinding' + ' name:' + this.name;
    }
});

bbfd.MediationBinding = module.exports = MediationBinding;