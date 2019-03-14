// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

let ContextView = cc.Class({
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
            }
        },
        shouldRegister: {
            get () {
                return this._shouldRegister;
            }
        },
        context: {
            get () {
                return this._context;
            },
            set (value) {
                this._context = value;
            }
        },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    onDestroy(){
        //
        
    }
    // update (dt) {},
});
