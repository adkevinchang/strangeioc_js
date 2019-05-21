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

let CommandBinding = cc.Class({
    name:'bbfd.CommandBinding',
    extends: bbfd.Binding,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        isOneOff: {
            get () {
                return this._isOneOff;
            },
            set (value) {
                this._isOneOff = value;
            }
        },
        isSequence: {
            get () {
                return this._isSequence;
            },
            set (value) {
                this._isSequence = value;
            }
        },
        isPooled: {
            get () {
                return this._isPooled;
            },
            set (value) {
                this._isPooled = value;
            }
        },
    },

    ctor(){
        this._value.uniqueValues = false;
    },
    Once(){
        this.isOneOff = true;
        return this;
    },
    InParallel(){
        this.isSequence = false;
        return this;
    },
    InSequence(){
        this.isSequence = true;
        return this;
    },
    Pooled(){
        this.isPooled = true;
        if (this.resolver != null)
           this.resolver.invoke(this);
        return this;
    },
    /**
     *输出类路径与名字
     */
    ToString() {
        return 'path:bbfd/extensions/command/impl/CommandBinding' + ' name:' + this.name;
    }
});

bbfd.CommandBinding = module.exports = CommandBinding;