// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
//基础事件类

let BaseEvent = cc.Class({
    extends: cc.Object,

    properties: {
        type: {
            get () {
                return this._type;
            },
            set (value) {
                this._type = value;
            }
        },
        target: {
            get () {
                return this._target;
            },
            set (value) {
                this._target = value;
            }
        },
        data: {
            get () {
                return this._data;
            },
            set (value) {
                this._data = value;
            }
        },

    },

    // LIFE-CYCLE CALLBACKS:
});
