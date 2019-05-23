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
const iimplements = require("../../pool/api/PoolImplements");

var MAX_POOL_SIZE = 50;
var _eventPool = new cc.js.Pool(MAX_POOL_SIZE);

let TmEvent = cc.Class({
    name:'bbfd.TmEvent',
    extends: cc.Object,
    statics:{
        get: function (type,target,data) {
            var event = _eventPool._get();
            if(event != null)
            {
                event.Reuse(type,target,data)
            }else
            {
                event = new bbfd.TmEvent(type,target,data);
            }
            return event;
        },
        put: function (evt) {
            evt.Unuse();
            _eventPool.put(evt);
        }
    },
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
        retain: {
            get () {
                return this._retain;
            }
        },
    },

    // LIFE-CYCLE CALLBACKS:
    //=======================================================================================
    // 构造函数中初始化实现的接口方法
    //=======================================================================================

    ctor(){
        iimplements.IPoolable("TmEvent").ensureImplements([this]);
        this.type = arguments[0];
        this.target = arguments[1];
        this.data = arguments[2];

    },

    //=======================================================================================
    // -继承接口方法
    //=======================================================================================
    //重新初始化
    Reuse(eventtype,eventtarget,eventdata)
    {
        this.type = eventtype;
        this.target = eventtarget;
        this.data = eventdata;
    },
    Unuse()
    {
        this.type = null;
        this.target = null;
        this.data = null;
    },
    ToString(){
        return 'path:bbfd/extensions/dispatcher/impl/TmEvent'+' name:'+ this.name+' type:'+this.type+' target:'+this.target+' data:'+this.data;
    }

});

bbfd.TmEvent = module.exports = TmEvent;