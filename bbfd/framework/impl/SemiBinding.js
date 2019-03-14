// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
var BindingConstraintType = require("BindingConstraintType")
var iImplements = require("Implements");

var _value = null;

let SemiBinding = cc.Class({
    extends: cc.Object,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        objectValue:{
            default:null,
            type:Array,
            serializable:true,
        },
        constraint: {
            get () {
                return this._constraint;
            },
            set (vvalue) {
                this._constraint = vvalue;
            }
        },
        uniqueValues: {
            get () {
                return this._uniqueValues;
            },
            set (vvalue) {
                this._uniqueValues = vvalue;
            }
        },
        value: {
            get () {
                if (constraint.Equals(BindingConstraintType.ONE))
				{
					return (objectValue == null) ? null : objectValue [0];
				}
				return objectValue;
            }
        },
    },

    //=======================================================================================
    // 构造函数中初始化实现的接口方法
    //=======================================================================================
    ctor(){
        const isemibinding = iImplements.IManagedList("SemiBinding");
        isemibinding.ensureImplements([this]);
        this.constraint = BindingConstraintType.ONE;
        this.uniqueValues = true;
    },
    // LIFE-CYCLE CALLBACKS:
    //=======================================================================================
    // -继承接口方法
    //=======================================================================================
    Add () {
        if (objectValue == null || constraint == BindingConstraintType.ONE)
        {
            objectValue = Object.create(null);
        }
        else
        {
            if (uniqueValues)
            {
                var aa = objectValue.Length;
                for (let a = 0; a < aa; a++)
                {
                    var val = objectValue[a];
                    if (val.Equals(o))
                    {
                        return this;
                    }
                }
            }
            
            var tempList = objectValue;
            var len = tempList.Length;
            objectValue = Object.create(null);
            tempList.CopyTo (objectValue, 0); //数组对象的复制
        }
        objectValue [objectValue.Length - 1] = o;
        return this;
    },
    AddList(list){
        list.forEach(element => {
            Add (element);
        });
        return this;
    },
    Remove (o) {
        if (o.Equals(objectValue) || objectValue == null)
        {
            objectValue = null;
            return this;
        }
        var aa = objectValue.Length;
        for(let a = 0; a < aa; a++)
        {
            var currVal = objectValue [a];
            if (o.Equals(currVal))
            {
                spliceValueAt (a);
                return this;
            }
        }
        return this;
    },
    RemoveList(list){
        list.forEach(element => {
            Remove (element);
        });
		return this;
    },
    spliceValueAt(){
        var newList = Object.create(null);
	    var  mod = 0;
		var aa = objectValue.Length;
		for(let a = 0; a < aa; a++)
		{
			if (a == splicePos)
			{
				mod = -1;
				continue;
			}
			newList [a + mod] = objectValue [a];
		}
		objectValue = (newList.Length == 0) ? null : newList;
    }
    // update (dt) {},
});
