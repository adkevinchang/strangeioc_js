//author:kevin
//time:2019/03/24
//bbfd命令空间定义
// window may be undefined when first load engine from editor
var _global = typeof window === 'undefined' ? global : window;

//框架中日志輸出根据環境不同設定
//模拟器预览输出
bbfd.debug = function(){
    if(CC_PREVIEW && CC_JSB)
    {
        cc.log(cc.js.formatStr.apply(null, arguments));
    }
}

//发布版本输出
bbfd.log = function(){
    if(CC_BUILD && !CC_DEBUG)
    {
        cc.log(cc.js.formatStr.apply(null, arguments));
    }
}

//bbfd框架版本
const frameworkVersion = '0.0.1';
_global['BbfdFramework'] = bbfd.FRAMEWORK_VERSION = frameworkVersion;