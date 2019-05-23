// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
require('../../../bbfd');
const iImplements = require("../api/Implements");
const BindingConstraintType = require('../api/BindingConstraintType');
const BindingConst = require('../api/BindingConst');

let Binding = cc.Class({
    name: 'bbfd.Binding',
    extends: cc.Object,

    properties: {
        key: {
            get () {
                return this._key.value;
            }
        },
        value: {
            get () {
                return this._value.value;
            }
        },
        name: {
            get () {
                return (this._name.value == null) ? BindingConst.NULLOID : this._name.value;
            }
        },
        isWeak:{
            get () {
                return this._isWeak;
            }
        },
        keyConstraint: {
            get () {
                return this._key.constraint;
            },
            set (vvalue) {
                this._key.constraint = vvalue;
            }
        },
        valueConstraint: {
            get () {
                return this._value.constraint;
            },
            set (vvalue) {
                this._value.constraint = vvalue;
            }
        },
        nameConstraint: {
            get () {
                return this._name.constraint;
            },
            set (vvalue) {
                this._name.constraint = vvalue;
            }
        },
        //Delegate
        resolver:{
            get () {
                return this._resolver;
            }
        }
        
    },

    //=======================================================================================
    // 构造函数中初始化实现的接口方法
    //=======================================================================================
    ctor(){
       // cc.assert(arguments.length === 1,'Binding ctor arguments length must 1')
        iImplements.IBinding("Binding").ensureImplements([this]);
        this._resolver = null;
        if(arguments.length === 1)
        {
            this._resolver = arguments[0];
        }
        this._key   = new bbfd.SemiBinding();
        this._value = new bbfd.SemiBinding();
        this._name  = new bbfd.SemiBinding();
        this._isWeak = false;
        this.keyConstraint = BindingConstraintType.ONE;
		this.nameConstraint = BindingConstraintType.ONE;
        this.valueConstraint = BindingConstraintType.MANY;
        
    },
    // LIFE-CYCLE CALLBACKS:

    //=======================================================================================
    // -继承接口方法
    //=======================================================================================
    //绑定的key:Type|bbfd.Binder|'bbfd.Binder' //绑定的key的类型有3三种，一个是接口类型，一个是类的构造函数，还有是类的字符串表示
    Bind(o){
        //bbfd.debug("Binding:Bind:"+o); 
        this._key.Add (o);
		return this;
    },
    //注入绑定的值对象  类型或者实例
    // |bbfd.Binder|instance
    To(o){
        this._value.Add (o);
       // bbfd.debug("Binding:To:"+o); 
        if (this.resolver != null)
           this.resolver.invoke(this);
        return this;
    },
    //绑定对象的名称定义
    ToName(o){
        var toName = (o == null) ? BindingConst.NULLOID : o;
        this._name.Add(toName);
        if (this.resolver != null)
        bbfd.debug("Binding:ToName:"+o); 
            this.resolver.invoke(this);
        return this;
    },

    Named(o){
        return this._name.value == o ? this : null;
    },

    RemoveKey(o){
        this._key.Remove(o);
    },

    RemoveName(o){
        this._name.Remove(o);
    },

    RemoveValue(o){
        //bbfd.debug('RemoveValue');
        this._value.Remove(o);
    },

    Weak(){
       this._isWeak = true;
        return this;
    },
    ToString(){
        return 'path:bbfd/framwork/impl/Binding'+' name:'+this.name;
    }
});

bbfd.Binding = module.exports = Binding;