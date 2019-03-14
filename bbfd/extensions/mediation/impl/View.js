// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
let View = cc.Class({
    extends: cc.Component,

    properties: {
        requiresContext: {
            get () {
                return this._requiresContext;
            },
            set (value) {
                this._requiresContext = value;
            }
        },
        registeredWithContext: {
            get () {
                return this._registeredWithContext;
            },
            set (value) {
                this._registeredWithContext = value;
            }
        },
        autoRegisterWithContext: {
            get () {
                return this._autoRegisterWithContext;
            },
            set (value) {
                this._autoRegisterWithContext = value;
            }
        },
        shouldRegister: {
            get () {
                return this._shouldRegister;
            },
            set (value) {
                this._shouldRegister = value;
            }
        }

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    // update (dt) {},
});
