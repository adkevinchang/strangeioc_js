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
require('../impl/View');
require('../../../framework/api/Inject');
const DispatcherImplements = require('../../dispatcher/api/DispatcherImplements');

let EventView = cc.Class({
    extends: bbfd.View,
    properties: {
        dispatcher: {
            get () {
                //注入者初始化注入绑定者
                return this._dispatcher?this._dispatcher:this._dispatcher = bbfd.Inject.Injecting('bbfd.EventView','dispatcher',DispatcherImplements.IEventDispatcher);
            },
            set (value) {
                this._dispatcher = value;
            },
            visible:false
        },
    },
    ToString() {
        return 'path:bbfd/extensions/mediation/impl/EventView' + ' name:' + this.name;
    }
});

bbfd.EventView = module.exports = EventView;