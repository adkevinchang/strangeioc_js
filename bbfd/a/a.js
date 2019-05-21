//bbfd framework 
//author:kevin
//time:2019/03/24
// window may be undefined when first load engine from editor
var _global = typeof window === 'undefined' ? global : window;
/**
 * require('./bbfd/index');
 * !#en
 * The main namespace of bbfd framework Be based on cocos js engine, all framework core classes, functions, properties and constants are defined in this namespace.
 * !#zh
 * bbfd 框架的主要命名空间，基于Cocos 引擎。框架核心代码中所有的类，函数，属性和常量都在这个命名空间中定义。
 * @module bbfd
 * @main bbfd
 */
_global.bbfd = _global.bbfd || {};

// For internal usage
_global._bbfd = _global._bbfd || {};

module.exports = _global.bbfd;