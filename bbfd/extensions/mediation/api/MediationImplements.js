// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

var Interface = require("Interface")

module.exports = {
    ITriggerable:function(nm){
        return new Interface(nm,["Trigger"]);
    },
    IEventBinding:function(nm){
        return new Interface(nm,["TypeForCallback","To"]);//new
    },
    IEventDispatcher:function(nm){
        return new Interface(nm,["Bind","AddListener","RemoveListener","HasListener","UpdateListener","ReleaseEvent"]);
    },
    ITriggerProvider:function(nm){
        return new Interface(nm,["AddTriggerable","RemoveTriggerable"]);//get
    },
    IDispatcher:function(nm){
        return new Interface(nm,["Dispatch","To"]);//new
    },
    IEvent:function(nm){
        return new Interface(nm,["Dispatch","To"]);//new
    },
    IMediationBinder:function(nm){
        return new Interface(nm,["Trigger","BindView"]);//new
    },
    IMediator:function(nm){
        return new Interface(nm,["PreRegister","OnRegister","OnRemove","OnEnabled","OnDisabled"]);
    },
    IMediationBinding:function(nm){
        return new Interface(nm,["ToMediator","ToAbstraction"]);
    }
}