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
    ICommand:function(nm){
        return new Interface(nm,["Execute","Retain","Release","Fail","Cancel"]);//get set
    },
    ICommandBinder:function(nm){
        return new Interface(nm,["ReactTo","ReleaseCommand","Stop"]);//new
    },
    IPooledCommandBinder:function(nm){
        return new Interface(nm,["GetPool"]);//get set
    },
    ICommandBinding:function(nm){
        return new Interface(nm,["Once","InParallel","InSequence","Pooled"]);//new get set
    },
    
}