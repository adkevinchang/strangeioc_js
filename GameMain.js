// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

var Binder = require("Binder")

cc.Class({
    extends: cc.Component,
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

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},
    ctor(){
        cc.log("GameMain ctor");
    },
    requireComponent(){
        cc.log("GameMain requireComponent");
    },
    update(){
        //cc.log("GameMain update");
    },
    lateUpdate(){
        //cc.log("GameMain lateUpdate");
    },
    onLoad(){
        cc.log("GameMain onLoad");
    },
    onEnable(){
        cc.log("GameMain onEnable");
    },
    onDisable(){
        cc.log("GameMain onDisable");
    },
    onDestroy(){
        cc.log("GameMain onDestroy");
    },
    onFocusInEditor(){
        cc.log("GameMain onFocusInEditor");
    },
    onLostFocusInEditor(){
        cc.log("GameMain onLostFocusInEditor");
    },
    resetInEditor(){
        cc.log("GameMain resetInEditor");
    },
    onRestore(){
        cc.log("GameMain onRestore");
    },
    start () {
        cc.log("hello word!");
        var binder = new Binder();
        binder.start();
        this.run();
    },
    
    //
    run () {
        cc.log("Game Run!");
    },

    // update (dt) {},
});
