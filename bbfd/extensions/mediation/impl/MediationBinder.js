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
require('../../mediation/impl/View');
var AbstractMediationBinder = require("AbstractMediationBinder");
const MediationExceptionType = require('../api/MediationExceptionType');
const MediationImplements = require('../api/MediationImplements');

let MediationBinder = cc.Class({
    extends: bbfd.AbstractMediationBinder,

    ctor() {
        MediationImplements.IMediationBinder("MediationBinder").ensureImplements([this]);
    },
    //获取view的子集所有组件，并转换成数组
    GetViews(view) {
        var mono = view;
        //bbfd.debug('MediationBinder:GetViews'+mono);
        //bbfd.debug('MediationBinder:GetViews'+mono.node);
        if(mono&&mono.node)
        {
            //bbfd.debug('MediationBinder:GetViews'+mono.node.children);
            return mono.node.getComponentsInChildren(bbfd.View);
        }
        return [];
    },
    HasMediator(view, mediatorType) {
        var mono = view.node;
        return mono.getComponent(mediatorType) != null;
    },
    CreateMediator(view, mediatorType) {
        var mono = view;
        bbfd.debug('MediationBinder:CreateMediator1:'+view+"//"+mediatorType);
        return mono.addComponent(mediatorType);
    },
    DestroyMediator(view, mediatorType) {
        var mono = view.node;
        var mediator = mono.getComponent(mediatorType);
        if (mediator != null)
            mediator.destroy();
        return mediator;
    },
    EnableMediator(view, mediatorType) {
        var mono = view.node;
        var mediator = mono.getComponent(mediatorType);
        if (mediator != null)
            mediator.enabled = true;
        return mediator;
    },
    DisableMediator(view, mediatorType) {
        var mono = view.node;
        var mediator = mono.getComponent(mediatorType);
        if (mediator != null)
            mediator.enabled = false;
        return mediator;
    },
    ThrowNullMediatorError(viewType, mediatorType) {
        cc.warn("The view: " + viewType.ToString() + " is mapped to mediator: " + mediatorType.ToString() + ". AddComponent resulted in null, which probably means " + mediatorType.ToString().Substring(mediatorType.ToString().LastIndexOf(".") + 1) + " is not a CC.Component.", MediationExceptionType.NULL_MEDIATOR);
    },
    ToString() {
        return 'path:bbfd/extensions/mediation/impl/MediationBinder' + ' name:' + this.name;
    }
});

bbfd.MediationBinder = module.exports = MediationBinder;