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
require('../../mediation/impl/Mediator');
const imp = require('../../dispatcher/api/DispatcherImplements');
const ContextKeys = require('../../context/api/ContextKeys');

let EventMediator = cc.Class({
    name:'bbfd.EventMediator',
    extends: bbfd.Mediator,
    properties: {
        dispatcher: {
            get() {
                //注入者初始化注入绑定者
                return this._dispatcher? this._dispatcher: this._dispatcher = bbfd.Inject.Injecting('bbfd.EventMediator','dispatcher',imp.IEventDispatcher,ContextKeys.CONTEXT_DISPATCHER);
            },
            set(value) {
                this._dispatcher = value;
            }
        },
    },
    ToString() {
        return 'path:bbfd/extensions/mediation/impl/EventMediator' + ' name:' + this.name;
    }
});

bbfd.EventMediator = module.exports = EventMediator;