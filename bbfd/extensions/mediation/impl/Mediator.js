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
require('../../../framework/api/Inject');
const iimplements = require("../api/MediationImplements");
const ContextKeys = require('../../context/api/ContextKeys');

let Mediator = cc.Class({
    extends: cc.Component,
    properties: {
        contextView: {
            get () {
                return this._contextView?this._contextView:this._contextView = bbfd.Inject.Injecting('bbfd.Mediator','contextView',cc.Node,ContextKeys.CONTEXT_VIEW);
            },
            set (value) {
                this._contextView = value;
            }
        },
    },

    // LIFE-CYCLE CALLBACKS:
    //=======================================================================================
    // 构造函数中初始化实现的接口方法
    //=======================================================================================
    ctor(){
        iimplements.IMediator("Mediator").ensureImplements([this]);
    },

    //=======================================================================================
    // -继承接口方法
    //=======================================================================================
    //view的 start函数在此函数之后onLoad函数在中介Trigger之前
    PreRegister(){

    },
    //view的 start函数在此函数之后onLoad函数在中介Trigger之前
    OnRegister(){

    },
    onDestroy(){

    },
    onEnable(){

    },
    onDisable(){

    },
    ToString() {
        return 'path:bbfd/extensions/mediation/impl/Mediator' + ' name:' + this.name;
    }
});

bbfd.Mediator = module.export = Mediator;