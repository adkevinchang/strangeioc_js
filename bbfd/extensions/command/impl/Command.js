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
const iimplements = require("../api/CommandImplements");
const InjectorImplements = require('../../injector/api/InjectorImplements');
const poolImpl = require('../../pool/api/PoolImplements');
//var Inject = require('Inject');

let Command = cc.Class({
    name:'bbfd.Command',
    extends: cc.Object,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        commandBinder: {
            get () {
                return this._commandBinder?this._commandBinder:this._commandBinder = bbfd.Inject.Injecting('Command','commandBinder',iimplements.ICommandBinder);
            },
            set (value) {
                this._commandBinder = value;
            }
        },
        injectionBinder: {
            get () {
                return this._injectionBinder?this._injectionBinder:this,_injectionBinder = bbfd.Inject.Injecting('Command','injectionBinder',InjectorImplements.IInjectionBinder);
            },
            set (value) {
                this._injectionBinder = value;
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
        cancelled: {
            get () {
                return this._cancelled;
            },
            set (value) {
                this._cancelled = value;
            }
        },
        IsClean: {
            get () {
                return this._IsClean;
            },
            set (value) {
                this._IsClean = value;
            }
        },
        sequenceId: {
            get () {
                return this._sequenceId;
            },
            set (value) {
                this._sequenceId = value;
            }
        },
        retain: {
            get () {
                return this._retain;
            },
            set (value) {
                this._retain = value;
            }
        },
    },

    //=======================================================================================
    // 构造函数中初始化实现的接口方法
    //=======================================================================================

    ctor() {
        iimplements.ICommand("Command_ICommand").ensureImplements([this]);
        poolImpl.IPoolable("Command_IPoolable").ensureImplements([this]);
        this.IsClean = false;
        this._retain = false;
    },

    //=======================================================================================
    // -继承接口方法
    //=======================================================================================
    Execute() {
        
    },
    Retain() {
        this.retain = true;
    },
    Release() {
        this.retain = false;
        if (this.commandBinder != undefined && this.commandBinder != null)
        {
            this.commandBinder.ReleaseCommand(this);
        }
    },
    Fail() {
        if (this.commandBinder != undefined && this.commandBinder != null)
        {
            this.commandBinder.Stop(this);
        }
    },
    Cancel() {
        this.cancelled = true;
    },
    Restore() {
        //this.injectionBinder.injector.Uninject (this);
        this.IsClean = true;
    },
    Reuse(){

    },
    Unuse(){
        
    },
    /**
     *输出类路径与名字
     */
    ToString() {
        return 'path:bbfd/extensions/command/impl/Command' + ' name:' + this.name;
    }
    
});

bbfd.Command = module.exports = Command;