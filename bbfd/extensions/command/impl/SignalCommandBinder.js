// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
require('../../../../bbfd');
require('../impl/CommandBinder');
const imp = require('../../signal/api/SignalImplements');

let SignalCommandBinder = cc.Class({
    name:'bbfd.SignalCommandBinder',
    extends: bbfd.CommandBinder,
    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        reactToCallBack: {
            get () {
                return this._bar;
            },
            set (value) {
                this._bar = value;
            }
        },
    },
    ResolveBinding(binding,key) {
        this._super(binding,key);
        if(this.bindings[key])
        {
            //bbfd.debug('SignalCommandBinder-ResolveBinding:'+key);
            if(imp.IBaseSignal("SignalCommandBinder").ensureImplements([key]))
            {
                let signal = key;
                if(this.reactToCallBack === undefined||this.reactToCallBack === null)
                {
                    this.reactToCallBack = bbfd.EventCallBack(this, this.ReactTo);
                }
                signal.AddListener(this.reactToCallBack);
            }
        }
    },
    OnRemove()
    {
       for (const key in this.bindings) {
           if (this.bindings.hasOwnProperty(key)) {
               //if(key is signal)
               if(imp.IBaseSignal("SignalCommandBinder").ensureImplements([key]))
               {
                    const signal = key;
                    signal.RemoveListener(this.reactToCallBack);//移除对应的委托
               }
           }
       }
    },
    invokeCommand(cmd,binding,data,depth){
        bbfd.debug('invokeCommand:'+typeof cmd);
        let signal = binding.key;
        let command = this.createCommandForSignal(cmd,data,signal.GetTypes());
        command.sequenceId = depth;
        this.trackCommand(command, binding);
        this.executeCommand(command);
        return command;
    },
    createCommandForSignal(cmd,data,signalTypes){
        if(data != null)
        {

        }
        let command = this.getCommand(cmd);
        command.data = data;
        //injectionBinder 清除绑定处理
        return command;
    },
    Bind(key)
    {
        let binding = this.injectionBinder.GetBinding(key);
        let signal = null;
        if(typeof key === 'function'||typeof key === 'string')
        {
            if(binding === null){
                binding = this.injectionBinder.Bind(key);
                binding.ToSingleton();
            }
            signal = this.injectionBinder.GetInstance(key);
            
        }
        signal = signal?signal:key;
        //signal 实例化 
        return this._super(signal);
    },
    Unbind(key,name)
    {
        if(this.bindings[key])
        {
            let signal = null;
            if(typeof key === 'function'||typeof key === 'string')
            {
                if(binding === null){
                    binding = this.injectionBinder.Bind(key);
                    binding.ToSingleton();
                }
                signal = this.injectionBinder.GetInstance(key);
                
            }
            signal = signal?signal:key;
            signal.RemoveListener(this.reactToCallBack);//移除对应的委托
        }
        this._super(key,name);
    },
    /**
     *输出类路径与名字
     */
    ToString() {
        return 'path:bbfd/extensions/command/impl/SignalCommandBinder' + ' name:' + this.name;
    }
});

bbfd.SignalCommandBinder = module.exports = SignalCommandBinder;