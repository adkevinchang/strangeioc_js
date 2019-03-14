// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

let ContextStartupFlags = cc.Enum({
    AUTOMATIC:0,
		/// Context startup will halt after Core bindings are mapped, but before instantiation or any custom bindings.
		/// If this flag is invoked, the developer must call context.Start()
    MANUAL_MAPPING:1,
		/// Context startup will halt after all bindings are mapped, but before firing ContextEvent.START (or the analogous Signal).
		/// If this flag is invoked, the developer must call context.Launch()
    MANUAL_LAUNCH:2,
})

module.exports = ContextStartupFlags;