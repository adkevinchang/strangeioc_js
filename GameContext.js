// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
var MVCSContext = require("MVCSContext");

cc.Class({
    extends: MVCSContext,

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

    start () {

    },
    mapBindings(){
        injectionBinder.Bind().To().ToSingleton();

        mediationBinder.Bind().To();
        mediationBinder.Bind().To();
        mediationBinder.Bind().To();

        if(this == Context.firstContext)
        {
            commandBinder.Bind(ContextEvent.START).To().To().Once().InSequence()
        }else
        {
            commandBinder.Bind(ContextEvent.START).To().To().To().Once().InSequence()
        }

        commandBinder.Bind(GameEvent.ADD_TO_SCORE).To();
        commandBinder.Bind(GameEvent.SHIP_DESTROYED).To();
        commandBinder.Bind(GameEvent.GAME_OVER).To();
        commandBinder.Bind(GameEvent.REPLAY).To();
        commandBinder.Bind(GameEvent.REMOVE_SOCIAL_CONTEXT).To();
    },
    addCoreComponents()
    {
        this._super();
        injectionBinder.Unbind();
        injectionBinder.Bind().To().ToSingleton();
    }
    // update (dt) {},
});
