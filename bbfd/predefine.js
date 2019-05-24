//author:kevin
//time:2019/03/24
//bbfd命令空间定义

////////////////////////////////////////////////////////////////////////////////////////////////////////
//重点信息备注
//
//依赖注入的实例不可以相互引用，比如EnemyMediator 引用注入了EnemyView,则EnemyView不可以引用EnemyMediator
////////////////////////////////////////////////////////////////////////////////////////////////////////

// window may be undefined when first load engine from editor
var _global = typeof window === 'undefined' ? global : window;

//框架中日志輸出根据環境不同設定
//模拟器预览输出
//cc.assert(true,msg);
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

//打印输出对象
bbfd.print = function(obj){
    bbfd.debug('printobj:start------------------');
    for (const key in obj) {
        bbfd.debug('printobj:'+key+'//'+obj[key]);
    }
    bbfd.debug('printobj:end--------------------');
}

//返回空对象的存储长度，类似字典的cont
bbfd.sizeObj = function(obj){
    var num = 0;
    for (const key in obj) {
        ++num;
    }
    return num;
}

//删除数组指定对象
bbfd.removeToArray = function(target,arr){
    if(arr === null||arr === undefined)return;
    for(var i=0;i<arr.length;i++)
    {
        if(target === arr[i])
        {
            arr.splice(i,1);
        }
    }
}

//判断对象是否在数组中
bbfd.containsToArray = function(target,arr){
    if(arr === null||arr === undefined)
    {
        return false;
    }
    for(var i=0;i<arr.length;i++)
    {
        if(target === arr[i])
        {
            return true;
        }
    }
    return false;
}

//浅复制数组
bbfd.cloneToArray = function(arr){
    let newarr = [];
    if(arr === null||arr === undefined)
    {
        return [];
    }
    for(var i=0;i<arr.length;i++)
    {
        newarr[i] = arr[i];
    }
    return newarr;
}

//深度拷贝 经过测试cc.node 可以完全深度复制，cc.Component//太复制的对象无法复制，特别是带注入对象的复杂对象。
bbfd.deepCopy = function(obj)
{
    if (obj === null || typeof obj !== 'object') return obj;
	if (obj instanceof Boolean) return new Boolean(obj.valueOf());
	if (obj instanceof Number) return new Number(obj.valueOf());
	if (obj instanceof String) return new String(obj.valueOf());
	if (obj instanceof RegExp) return new RegExp(obj.valueOf());
	if (obj instanceof Date) return new Date(obj.valueOf());
	let cpObj = obj instanceof Array ? [] : {};
	for (var key in obj) cpObj[key] = bbfd.deepCopy(obj[key]);
	return cpObj;
}

//throw new Error(debug.getError(3820, userRenderMode));

//bbfd框架版本
const frameworkVersion = '1.0.0';
const frameworkTime = '2019-05-24'
_global['BbfdFramework'] = bbfd.FRAMEWORK_VERSION = frameworkVersion;
bbfd.FRAMEWORK_TIME = frameworkTime;