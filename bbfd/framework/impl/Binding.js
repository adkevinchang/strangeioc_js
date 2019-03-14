// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
var iImplements = require("Implements");

let Binding = cc.Class({
    extends: cc.Object,

    properties: {
        key: {
            get () {
                return this._key;
            }
        },
        value: {
            get () {
                return this._value;
            }
        },
        name: {
            get () {
                return this._name;
            }
        },
        isWeak:{
            get () {
                return this._isWeak;
            }
        },
        keyConstraint: {
            get () {
                return this._keyConstraint;
            },
            set (vvalue) {
                this._keyConstraint = vvalue;
            }
        },
        valueConstraint: {
            get () {
                return this._valueConstraint;
            },
            set (vvalue) {
                this._valueConstraint = vvalue;
            }
        },
        nameConstraint: {
            get () {
                return this._nameConstraint;
            },
            set (vvalue) {
                this._nameConstraint = vvalue;
            }
        },
        resolver:{
            get () {
                return this._resolver;
            }
        }
        
    },

    //=======================================================================================
    // 构造函数中初始化实现的接口方法
    //=======================================================================================
    ctor(resolver){
        const ibinding = iImplements.IBinding("Binding");
        ibinding.ensureImplements([this]);
        this._resolver = resolver;
        this._key   = new SemiBinding();
        this._value = new SemiBinding();
        this._name  = new SemiBinding();
        keyConstraint = BindingConstraintType.ONE;
		nameConstraint = BindingConstraintType.ONE;
        valueConstraint = BindingConstraintType.MANY;
        
    },
    // LIFE-CYCLE CALLBACKS:

    //=======================================================================================
    // -继承接口方法
    //=======================================================================================
    
    Bind(o){
        _key.Add (o);
		return this;
    },

    To(o){
        _value.Add (o);
        if (resolver != null)
            resolver (this);
        return this;
    },
    
    ToName(o){
        var toName = (o == null) ? BindingConst.NULLOID : o;
        _name.Add(toName);
        if (resolver != null)
            resolver(this);
        return this;
    },

    Named(o){
        return _name.value == o ? this : null;
    },

    RemoveKey(o){
        _key.Remove (o);
    },

    RemoveName(o){
        _name.Remove (o);
    },

    RemoveValue(o){
        _value.Remove (o);
    },

    Weak(){
        _isWeak = true;
        return this;
    }
});
