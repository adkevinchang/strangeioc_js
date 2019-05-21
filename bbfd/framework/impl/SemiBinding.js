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
const BindingConstraintType = require('../api/BindingConstraintType');
const iImplements = require('../api/Implements');
var _value = null;

let SemiBinding = cc.Class({
    name:'bbfd.SemiBinding',
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
                if (this.constraint === BindingConstraintType.ONE)
				{
                    //bbfd.debug('SemiBinding-value:'+BindingConstraintType.ONE);
					return (this.objectValue === null) ? null : this.objectValue [0];
                }
                //bbfd.debug('SemiBinding-value:'+BindingConstraintType.MANY);
				return this.objectValue;
            }
        },
    },

    //=======================================================================================
    // 构造函数中初始化实现的接口方法
    //=======================================================================================
    ctor(){
        iImplements.IManagedList("SemiBinding").ensureImplements([this]);
        this.constraint = BindingConstraintType.ONE;
        this.uniqueValues = true;
    },
    // LIFE-CYCLE CALLBACKS:
    //=======================================================================================
    // -继承接口方法
    //=======================================================================================
    Add (o) {
        //bbfd.debug('semiBinding0-Add(o)'+this.objectValue+"//"+this.constraint);
        if (this.objectValue === null || this.objectValue === undefined || this.constraint === BindingConstraintType.ONE)
        {
            this.objectValue = [];
        }
        else
        {
            if (this.uniqueValues)
            {
                var aa = this.objectValue.length;
                for (let a = 0; a < aa; a++)
                {
                    var val = this.objectValue[a];
                    if (val === o)
                    {
                        return this;
                    }
                }
            }
        }
        this.objectValue [this.objectValue.length] = o;
       // bbfd.debug('semiBinding1-Add(o)'+typeof this.objectValue);
        //bbfd.debug('semiBinding1-Add(o)'+this.objectValue.length);
        //bbfd.debug('semiBinding1-Add(o)'+typeof this.objectValue[0]);
        return this;
    },
    
    AddList(list){
        list.forEach(element => {
            Add (element);
        });
        return this;
    },
    Remove (o) {
        //bbfd.debug('SemiBinding-Remove1');
        //bbfd.print(this.objectValue);
       // bbfd.print(o);
        if (o === this.objectValue || this.objectValue === null)
        {
            //bbfd.debug('SemiBinding-Remove2');
            this.objectValue = null;
            return this;
        }
        
        var aa = this.objectValue.length;
       // bbfd.debug('SemiBinding-Remove3:'+aa);
        for(let a = 0; a < aa; a++)
        {
            var currVal = this.objectValue[a];
            //bbfd.print(currVal);
            //bbfd.debug('================');
            //bbfd.print(o);
            if (o === currVal)
            {
               // bbfd.debug('SemiBinding-Remove4');
                this.spliceValueAt(a);
                return this;
            }
        }
        //bbfd.debug('SemiBinding-Remove5');
        return this;
    },
    RemoveList(list){
        list.forEach(element => {
            this.Remove (element);
        });
		return this;
    },
    spliceValueAt(splicePos){
        var newList = [];
	    var  mod = 0;
		var aa = this.objectValue.length;
		for(let a = 0; a < aa; a++)
		{
			if (a == splicePos)
			{
				mod = -1;
				continue;
			}
			newList [a + mod] = this.objectValue [a];
        }
        //bbfd.debug('SemiBinding-spliceValueAt'+newList.length);
		this.objectValue = (newList.length == 0) ? null : newList;
    },
    ToString(){
        return 'path:bbfd/framwork/impl/SemiBinding'+' name:'+this.name;
    }
});

bbfd.SemiBinding = module.exports = SemiBinding;