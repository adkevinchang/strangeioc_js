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
require('../../../../bbfd')
require('../../injector/impl/InjectionBinder');
const IImplements = require('../api/InjectorImplements');

/**
 * 交叉上下文的注入绑定者
 */
let CrossContextInjectionBinder = cc.Class({
    name:'bbfd.CrossContextInjectionBinder',
    extends: bbfd.InjectionBinder,

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
                //bbfd.debug('CrossContextInjectionBinder-get CrossContextBinder'+this._CrossContextBinder);
                return this._CrossContextBinder;
            },
            set(value) {
                this._CrossContextBinder = value;
                //bbfd.debug('CrossContextInjectionBinder-set CrossContextBinder'+this._CrossContextBinder);
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
        bbfd.debug('CrossContextInjectionBinder:GetBinding');
        var binding = this._super(key, name);
        if (binding === null) //Attempt to get this from the cross context. Cross context is always SECOND PRIORITY. Local injections always override
        {
            bbfd.debug('CrossContextInjectionBinder:GetBinding2'+this.CrossContextBinder);
            if (this.CrossContextBinder != undefined) {
                bbfd.debug('CrossContextInjectionBinder:GetBinding3'+this.CrossContextBinder);
                binding = this.CrossContextBinder.GetBinding(key, name);
            }
        }
        bbfd.debug('CrossContextInjectionBinder:GetBinding-end');
        return binding;
    },
    /**
     * 把绑定器保存起来
     * @param {被溶解存储的绑定器} binding 
     * @param {对应的key} key 
     */
    ResolveBinding(binding, key) {
        //Decide whether to resolve locally or not
       // bbfd.debug('CrossContextInjectionBinder:ResolveBinding');
        if (IImplements.IInjectionBinding("CrossContextInjectionBinder").ensureImplements([binding])) {
            var injectionBinding = binding;
            if (injectionBinding.isCrossContext) {
                //bbfd.debug('CrossContextInjectionBinder:ResolveBinding2:'+this.CrossContextBinder);
                if (this.CrossContextBinder === undefined) //We are a crosscontextbinder
                {
                   // bbfd.debug('CrossContextInjectionBinder:ResolveBinding3:'+this.CrossContextBinder);
                    this._super(binding, key);
                }
                else {
                //bbfd.debug('CrossContextInjectionBinder:ResolveBinding4:'+this.CrossContextBinder);
                   //bbfd.debug('binding.name:'+binding.name);
                   // this.Unbind(key, binding.name); //remove this cross context binding from ONLY the local binder
                    this.CrossContextBinder.ResolveBinding(binding, key);
                }
            }
            else {
               // bbfd.debug('CrossContextInjectionBinder:ResolveBinding5:'+this.CrossContextBinder);
                this._super(binding, key);
            }
        }
    },

    GetInjectorForBinding(binding) {
       // bbfd.debug(binding);
       // bbfd.debug(this.CrossContextBinder);
        if (binding && binding.isCrossContext && this.CrossContextBinder !== undefined) {
            return this.CrossContextBinder.injector;
        }
        else {
            return this.injector;
        }
    },

    Unbind(key, name) {
        var binding = this.GetBinding(key, name);
        bbfd.debug('CrossContextInjectionBinder:Unbind'+binding+"//"+key);
        if (binding !== null &&
            binding.isCrossContext &&
            this.CrossContextBinder !== undefined) {
            this.CrossContextBinder.Unbind(key, name);
        }
        this._super(key, name);
    },
    ToString() {
        return 'path:bbfd/extensions/injector/impl/CrossContextInjectionBinder' + ' name:' + this.name;
    }

});

bbfd.CrossContextInjectionBinder = module.exports = CrossContextInjectionBinder;