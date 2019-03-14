// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
// author:kevin
// time:20190314

var InjectionBinder = require("InjectionBinder");
var IImplements = require("InjectorImplements");

/**
 * 交叉上下文的注入绑定者
 */
let CrossContextInjectionBinder = cc.Class({
    extends: InjectionBinder,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        CrossContextBinder: {
            get() {
                return this._CrossContextBinder;
            },
            set(value) {
                this._CrossContextBinder = value;
            }
        },
    },

    // LIFE-CYCLE CALLBACKS:
    /**
     * return Bingding  绑定器
     * @param {存储绑定器的key} key 
     * @param {绑定器的名字} name 
     */
    GetBinding(key, name) {
        var binding = this._super();
        if (binding == null) //Attempt to get this from the cross context. Cross context is always SECOND PRIORITY. Local injections always override
        {
            if (this.CrossContextBinder !== null) {
                binding = this.CrossContextBinder.GetBinding(key, name);
            }
        }
        return binding;
    },
    /**
     * 把绑定器保存起来
     * @param {被溶解存储的绑定器} binding 
     * @param {对应的key} key 
     */
    ResolveBinding(binding, key) {
        //Decide whether to resolve locally or not
        if (IImplements.IInjectionBinding("CrossContextInjectionBinder").ensureImplements([binding])) {
            var injectionBinding = binding;
            if (injectionBinding.isCrossContext) {
                if (this.CrossContextBinder == null) //We are a crosscontextbinder
                {

                    this._super(binding, key);
                }
                else {
                    this.Unbind(key, binding.name); //remove this cross context binding from ONLY the local binder
                    this.CrossContextBinder.ResolveBinding(binding, key);
                }
            }
            else {
                this._super(binding, key);
            }
        }
    },

    GetInjectorForBinding(binding) {
        if (binding.isCrossContext && this.CrossContextBinder != null) {
            return this.CrossContextBinder.injector;
        }
        else {
            return this.injector;
        }
    },
    
    Unbind(key, name) {
        var binding = this.GetBinding(key, name);

        if (binding !== null &&
            binding.isCrossContext &&
            this.CrossContextBinder !== null) {
            this.CrossContextBinder.Unbind(key, name);
        }
        this._super(key, name);
    }

});
