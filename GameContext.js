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
        this.injectionBinder.Bind().To().ToSingleton();

        this.mediationBinder.Bind().To();
        this.mediationBinder.Bind().To();
        this.mediationBinder.Bind().To();

        if(this == Context.firstContext)
        {
            this.commandBinder.Bind(ContextEvent.START).To().To().Once().InSequence()
        }else
        {
            this.commandBinder.Bind(ContextEvent.START).To().To().To().Once().InSequence()
        }

        this.commandBinder.Bind(GameEvent.ADD_TO_SCORE).To();
        this.commandBinder.Bind(GameEvent.SHIP_DESTROYED).To();
        this.commandBinder.Bind(GameEvent.GAME_OVER).To();
        this.commandBinder.Bind(GameEvent.REPLAY).To();
        this.commandBinder.Bind(GameEvent.REMOVE_SOCIAL_CONTEXT).To();
    },
    addCoreComponents()
    {
        this._super();
        //this.injectionBinder.Unbind();
        //this.injectionBinder.Bind().To().ToSingleton();
    }
    // update (dt) {},
});
