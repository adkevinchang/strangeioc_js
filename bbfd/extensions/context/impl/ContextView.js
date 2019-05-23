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

let ContextView = cc.Class({
    name:'bbfd.ContextView',
    extends: cc.Component,
    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        requiresContext: {
            get () {
                return this._requiresContext;
            },
            set (value) {
                this._requiresContext = value;
            },
            visible:false
        },
        registeredWithContext: {
            get () {
                return this._registeredWithContext;
            },
            set (value) {
                this._registeredWithContext = value;
            },
            visible:false
        },
        autoRegisterWithContext: {
            get () {
                return this._autoRegisterWithContext;
            },
            visible:false
        },
        shouldRegister: {
            get () {
                return true;
            },
            visible:false
        },
        context: {
            get () {
                return this._context;
            },
            set (value) {
                this._context = value;
            },
            visible:false
        },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    //销毁处理
    onDestroy(){
        
    }
    // update (dt) {},
});

bbfd.ContextView = module.exports = ContextView;