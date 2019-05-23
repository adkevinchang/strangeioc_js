// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
/*
var iImplements = require("ReflectedImplements");

let ReflectedClass = cc.Class({
    extends: cc.Object,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        Constructor: {
            get () {
                //console.log("Constructor");
                return this._Constructor;
            },
            set (value) {
                this._Constructor = value;
            }
        },
        ConstructorParameters: {
            get () {
                return this._ConstructorParameters;
            },
            set (value) {
                this._ConstructorParameters = value;
            }
        },
        ConstructorParameterNames: {
            get () {
                return this._ConstructorParameterNames;
            },
            set (value) {
                this._ConstructorParameterNames = value;
            }
        },
        PostConstructors: {
            get () {
                return this._PostConstructors;
            },
            set (value) {
                this._PostConstructors = value;
            }
        },
        Setters: {
            get () {
                return this._PostConstructors;
            },
            set (value) {
                this._PostConstructors = value;
            }
        },
        SetterNames: {
            get () {
                return this._PostConstructors;
            },
            set (value) {
                this._PostConstructors = value;
            }
        },
        PreGenerated: {
            get () {
                //console.log("PreGenerated");
                return this._PostConstructors;
            },
            set (value) {
                this._PostConstructors = value;
            }
        }
    },

    // LIFE-CYCLE CALLBACKS:
    hasSetterFor(type)
    {
        return Setters.Any(attr => attr.type == type);
    },
    ctor() {
        iImplements.IReflectedClass("ReflectedClass").ensureImplements([this]);
        //cc.log('生命周期：ctor');
    },
});*/
