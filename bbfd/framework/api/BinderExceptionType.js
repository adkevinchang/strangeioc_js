// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

let BinderExceptionType = cc.Enum({
   /// The binder is being used while one or more Bindings are in conflict
		CONFLICT_IN_BINDER:0,

		/// A runtime class resolved to null. Usually caused when a class can't be resolved.
		RUNTIME_NULL_VALUE:1,

		/// A runtime binding was attempted with no 'Bind'
		RUNTIME_NO_BIND:2,

		/// Detected an unrecognized runtime type.
		RUNTIME_TYPE_UNKNOWN:3,

		/// A runtime binding tried to add multiple Bind keys. The current binder accepts only a single key.
		RUNTIME_TOO_MANY_KEYS:4,

		/// A runtime binding tried to add multiple Bind keys. The current binder accepts only a single key.
		RUNTIME_TOO_MANY_VALUES:5,

		/// A runtime binding tried to add something rejected by the whitelist.
		RUNTIME_FAILED_WHITELIST_CHECK:6
})

module.exports = BinderExceptionType;