// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
var Binder = require("Binder");
var commandImplements = require("CommandImplements");
var dispatchImplements = require("DispatcherImplements");

let CommandBinder = cc.Class({
    extends: Binder,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    //=======================================================================================
    // 构造函数中初始化实现的接口方法
    //=======================================================================================

    ctor(){
        commandImplements.ICommandBinder("CommandBinder").ensureImplements([this]);
        commandImplements.IPooledCommandBinder("CommandBinder").ensureImplements([this]);
        dispatchImplements.ITriggerable("CommandBinder").ensureImplements([this])

    },

    //=======================================================================================
    // -继承接口方法
    //=======================================================================================
    ReactTo(){
        
    },
    next(){

    },
    disposeOfSequencedData(){

    },
    invokeCommand(){

    },
    createCommand(){

    },
    getCommand(){

    },
    trackCommand(){

    },
    executeCommand(){

    },
    Stop(){

    },
    ReleaseCommand()
    {

    },
    GetPool()
    {

    },
    performKeyValueBindings()
    {

    },
    addRuntimeOptions(){

    },
    removeSequence(){

    },
    Trigger()
    {

    },
    resolver(){

    },
    makePoolFromType(){
        
    }


});