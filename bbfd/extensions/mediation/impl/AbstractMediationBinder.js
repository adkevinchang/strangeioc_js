// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
var Binder = require("Binder");
var iimplements = require("MediationImplements");

let AbstractMediationBinder = cc.Class({
    extends: Binder,

    properties: {
        injectionBinder: {
            get() {
                return this._injectionBinder;
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

    ApplyMediationToView() {

    },
    InjectViewAndChildren() {

    },
    IsTrueMediator() {

    },
    performKeyValueBindings() {

    },
    ConformRuntimeItem() {

    },
    BindView() {

    },
    MapView() {

    },
    UnmapView() {

    },
    EnableView() {

    },
    DisableView() {

    },
    TriggerInBindings() {

    }
    //=======================================================================================
    // -继承接口方法
    //=======================================================================================


});
