// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
require('../../../../bbfd')
require('../../../framework/api/Interface')
module.exports = {
    IContext:function(nm){
        return new bbfd.Interface(nm,["start","Launch","AddContext","RemoveContext","AddView","RemoveView","EnableView","DisableView","GetContextView"]);
    },
    ICrossContextCapable:function(nm){
        return new bbfd.Interface(nm,["AssignCrossContext","RemoveCrossContext","GetComponent"]);//get set
    },
    ITriggerable:function(nm){
        return new bbfd.Interface(nm,["Trigger"]);
    }
}