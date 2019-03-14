// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

let ContextKeys = cc.Enum({
    CONTEXT:0,
		/// Marker for the named Injection of the ContextView
	CONTEXT_VIEW:1,
		/// Marker for the named Injection of the contextDispatcher
	CONTEXT_DISPATCHER:2,
		/// Marker for the named Injection of the crossContextDispatcher
	CROSS_CONTEXT_DISPATCHER:3
})

module.exports = ContextKeys;