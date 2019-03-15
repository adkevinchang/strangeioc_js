// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
var Interface = function(name,methods){
    if(arguments.length !=2)
    {
        throw new Error("Interface constructor called with "+arguments.length+" arguments,but expected exactly 2")
    }

    this.name = name;
    this.methods = [];

    for (let i = 0; i < methods.length; i++) {
        const method = methods[i];
        if(typeof method !== "string")
        {
            throw new Error('Interface constructor expects method names as a string');
        }
        this.methods.push(method);
    }
}

//检查继承接口类是否有添加接口方法
Interface.prototype.ensureImplements = function(objs){
    if(arguments.length != 1)
    {   
        throw new Error("Interface constructor called with "+arguments.length+" arguments,but expected exactly 1");
    }
    for (let j = 0; j < objs.length; j++) {
        const obj = objs[j];
        //console.log("-======================================="+this.name);
        for (let k = 0; k < this.methods.length; k++) {
            const method = this.methods[k];
            //console.log("-=======================================1:"+method);
            //console.log("-=======================================2:"+obj[method]);
            //console.log("-=======================================3:"+typeof obj[method]);
            if(!obj[method] || typeof obj[method] !== "function")
            {
                cc.error('Function Interface.ensureImplements:implements interface '+this.name+' ,obj.mothed '+method+' was not found');
                return false;
            }
        }
    }
    return true;
}

module.exports = Interface;