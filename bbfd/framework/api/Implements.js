// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

module.exports = {
    IBinder:function(nm){
        return new bbfd.Interface(nm,["Bind","GetBinding","GetRawBinding","Unbind","RemoveValue","RemoveKey","RemoveName","OnRemove","WhitelistBindings","ConsumeBindings","ResolveBinding"]);
    },
    IBinding:function(nm){
        return new bbfd.Interface(nm,["Bind","To","ToName","Named","RemoveValue","RemoveKey","RemoveName","Weak"]);//get set
    },
    IManagedList:function(nm){
        return new bbfd.Interface(nm,["Add","Remove"]);//get set
    },
    IInstanceProvider:function(nm){
        return new bbfd.Interface(nm,["GetInstance"]);
    }
}