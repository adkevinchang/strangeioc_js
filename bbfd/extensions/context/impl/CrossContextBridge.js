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
const ContextKeys = require('../../context/api/ContextKeys');
const iImplements = require('../../dispatcher/api/DispatcherImplements');

let CrossContextBridge = cc.Class({
    name: 'bbfd.CrossContextBridge',
    extends: bbfd.Binder,
    statics:{
        getBounds: function (spriteList) {
            //bbfd.debug("getBounds");
            for (const key in this.__ctors__) {
                //bbfd.debug("getBounds0:"+key);
            }
            return this.__ctors__;
        }
    },
    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        crossContextDispatcher: {
            get () {
                this._crossContextDispatcher = this._crossContextDispatcher!==undefined?this._crossContextDispatcher:bbfd.Inject.GetInstance(ContextKeys.CROSS_CONTEXT_DISPATCHER);
                return this._crossContextDispatcher;
            },
            set (value) {
                this._crossContextDispatcher = value;
            }
        },
    },

    //=======================================================================================
    // 构造函数中初始化实现的接口方法
    //=======================================================================================

    ctor(){
        //iImplements.ITriggerable("CrossContextBridge").ensureImplements([this]);
       // bbfd.debug(this._crossContextDispatcher.ToString());
    },

    //=======================================================================================
    // -继承接口方法
    //=======================================================================================
    Trigger(){
    }

    // update (dt) {},
});

bbfd.CrossContextBridge = module.exports = CrossContextBridge;