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
require('../../command/impl/CommandBinding');
require('../../../framework/impl/Binder');
require('../../../framework/api/Inject');
const commandImplements = require('../api/CommandImplements');
const dispatchImplements = require('../../dispatcher/api/DispatcherImplements');
const InjectorImplements = require('../../injector/api/InjectorImplements');
const PoolImplements = require('../../pool/api/PoolImplements');
const CommandExceptionType = require('../api/CommandExceptionType');

let CommandBinder = cc.Class({
    name:'bbfd.CommandBinder',
    extends: bbfd.Binder,

    properties: {
        pools: {
            // ATTRIBUTES:
            default: null,        // The default value will be used only when the component attaching
            // to a node for the first time
            type: Object, // optional, default is typeof default
            serializable: true,   // optional, default is true
        },
        activeCommands: {
            // ATTRIBUTES:
            default: null,        // The default value will be used only when the component attaching
            // to a node for the first time
            type: Array, // optional, default is typeof default
            serializable: true,   // optional, default is true
        },
        activeSequences: {
            // ATTRIBUTES:
            default: null,        // The default value will be used only when the component attaching
            // to a node for the first time
            type: Object, // optional, default is typeof default
            serializable: true,   // optional, default is true
        },
        injectionBinder: {
            get() {
                return this._injectionBinder ? this._injectionBinder : this._injectionBinder = bbfd.Inject.Injecting('bbfd.CommandBinder','injectionBinder',InjectorImplements.IInjectionBinder);
            },
            set(value) {
                this._injectionBinder = value;
            }
        },
        usePooling: {
            get() {
                return this._usePooling;
            },
            set(value) {
                this._usePooling = value;
            }
        },

    },

    //=======================================================================================
    // 构造函数中初始化实现的接口方法
    //=======================================================================================

    ctor() {
        commandImplements.ICommandBinder("CommandBinder").ensureImplements([this]);
        commandImplements.IPooledCommandBinder("CommandBinder").ensureImplements([this]);
        dispatchImplements.ITriggerable("CommandBinder").ensureImplements([this]);
        this.usePooling = true;
        this.pools = cc.js.createMap(true);;
        this.activeCommands = [];
        this.activeSequences = cc.js.createMap(true);
        
    },
    //=======================================================================================
    // -继承接口方法
    //=======================================================================================
    GetRawBinding() {
        //bbfd.debug('GetRawBinding:CommandBinder123');
        return new bbfd.CommandBinding(bbfd.createDelegate(this, this.resolver));
    },
    ReactTo(trigger, data) {
       bbfd.debug('CommandBinder:ReactTo:'+trigger);
      // bbfd.print(trigger);
        if (PoolImplements.IPoolable('CommandBinder').ensureImplements([data])) {
            //data.Retain();
        }
        var binding = this.GetBinding(trigger);
        if (binding != null) {
            if (binding.isSequence) {
                this.next(binding, data, 0);
            }
            else {
                var values = binding.value;
                var aa = values.length + 1;
                for (let a = 0; a < aa; a++) {
                    this.next(binding, data, a);
                }
            }
        }
    },
    next(binding, data, depth) {
        var values = binding.value;
        bbfd.debug('CommandBinder:next:'+binding.ToString()+'//'+data+"//"+depth+"//"+values.length);
        //bbfd.print(values);
        if (depth < values.length) {
            var cmd = values[depth];
            var command = this.invokeCommand(cmd, binding, data, depth);
            this.ReleaseCommand(command);
        }
        else {
            this.disposeOfSequencedData(data);
            if (binding.isOneOff) {
                this.Unbind(binding.key,binding.name);
            }
        }
    },
    disposeOfSequencedData() {

    },
    invokeCommand(cmd,binding,data,depth) {
        bbfd.debug('CommandBinder:invokeCommand:'+'//'+data+"//"+cmd);
        var command = this.createCommand(cmd, data);
        command.sequenceId = depth;
        this.trackCommand(command, binding);
        this.executeCommand(command);
        return command;
    },
    createCommand(cmd, data) {
        //bbfd.debug('CommandBinder:createCommand:'+'//'+data+"//"+cmd);
        var command = this.getCommand(cmd);
        if (command == null) {
            var msg = "A Command ";
            if (data != null) {
                msg += "tied to data " + data.ToString();
            }
            msg += " could not be instantiated.\nThis might be caused by a null pointer during instantiation or failing to override Execute (generally you shouldn't have constructor code in Commands).";
            throw new Error(msg, CommandExceptionType.BAD_CONSTRUCTOR);
        }
        command.data = data;
        return command;
    },
    getCommand(type) {
        // if (this.usePooling && this.pools[type]) {
        //     var pool = this.pools[type];
        //     var command = pool.GetInstance();
        //     if (command.IsClean) {
        //         injectionBinder.injector.Inject(command);
        //         command.IsClean = false;
        //     }
        //     return command;
        // }
        // else {
            this.injectionBinder.Bind(commandImplements.ICommand).To(type);
            var command = this.injectionBinder.GetInstance(commandImplements.ICommand);
            this.injectionBinder.Unbind(commandImplements.ICommand);
            return command;
        //}
    },
    trackCommand(command, binding) {
        bbfd.debug('CommandBinder:trackCommand:'+'//'+command+"//"+binding);
        if (binding.isSequence) {
            this.activeSequences[command] = binding;
        }
        else {
            this.activeCommands.push(command);
        }
    },
    executeCommand(command) {
        if (command == null||command == undefined) {
            return;
        }
        bbfd.debug('CommandBinder:executeCommand:'+'//'+command);
        command.Execute();
    },
    Stop(key) {
        if (commandImplements.ICommand('CommandBinder').ensureImplements([key]) && this.activeSequences.ContainsKey(key)) {
            removeSequence(key);
        }
        else {
            var binding = GetBinding(key);
            if (binding != null) {
                if (this.activeSequences.ContainsValue(binding)) {
                    this.activeSequences.forEach(sequence => {
                        if (sequence.Value == binding) {
                            var command = sequence.Key;
                            removeSequence(command);
                        }
                    });
                }
            }
        }
    },
    ReleaseCommand(command) {
        bbfd.debug('ReleaseCommand:'+command);
        if (command.retain == false) {
           // var t = command.GetType();---------------------对象池以后优化
            //if (usePooling && this.pools.ContainsKey(t)) {
               // this.pools[t].ReturnInstance(command);
           // }
            if (bbfd.containsToArray(command,this.activeCommands)) {
                bbfd.removeToArray(command,this.activeCommands);
            }
            else if (this.activeSequences[command]) {
                var binding = this.activeSequences[command];
                var data = command.data;
                delete this.activeSequences[command];
                this.next(binding, data, command.sequenceId + 1);
            }
        }
    },
    GetPool(t) {
        if (this.pools.ContainsKey(t))
            return this.pools[t];
        return null;
    },
    performKeyValueBindings(keyList, valueList) {
        var binding = null;

        // Bind in order
        keyList.forEach(key => {
            var keyType = Type.GetType(key);
            var enumerator = null;
            if (keyType == null) {
                //If it's not a class, attempt to resolve as an Enum
                var keyString = key;
                var separator = keyString.LastIndexOf(".");
                if (separator > -1) {
                    var enumClassName = keyString.Substring(0, separator);
                    var enumType = Type.GetType(enumClassName);
                    if (enumType != null) {
                        var enumName = keyString.Substring(separator + 1);
                        enumerator = Enum.Parse(enumType, enumName);
                    }
                }
            }
            //If all else fails, just bind the original key
            var bindingKey = null;
            if (keyType !== null) {
                bindingKey = keyType;
            } else {
                if (enumerator !== null) {
                    bindingKey = enumerator;
                } else {
                    bindingKey = key
                }
            }
            binding = Bind(bindingKey);
        });
        valueList.forEach(value => {
            var valueType = Type.GetType(value);
            if (valueType == null) {
                cc.warn("A runtime Command Binding has resolved to null. Did you forget to register its fully-qualified name?\n Command:" + value, BinderExceptionType.RUNTIME_NULL_VALUE);
            }
            binding = binding.To(valueType);
        });
        return binding;
    },
    addRuntimeOptions(b, options) {
        this._super(b, options);
        var binding = b;
        if (options.IndexOf("Once") > -1) {
            binding.Once();
        }
        if (options.IndexOf("InParallel") > -1) {
            binding.InParallel();
        }
        if (options.IndexOf("InSequence") > -1) {
            binding.InSequence();
        }
        if (options.IndexOf("Pooled") > -1) {
            binding.Pooled();
        }

        return binding;
    },
    removeSequence(command) {
        if (this.activeSequences.ContainsKey(command)) {
            command.Cancel();
            this.activeSequences.Remove(command);
        }
    },
    Trigger(key, data) {
        this.ReactTo(key, data);
        return true;
    },
    resolver(binding) {
        this._super(binding);
        if (this.usePooling && binding.isPooled) {
            if (binding.value != null&&binding.value != undefined) {
                var values = binding.value;
                //------------------------------------------------------------------------------对象池的处理以后优化kevin 2019/5/13
                values.forEach(value => {
                   // if (!this.pools[value]) {
                   //     var myPool = this.makePoolFromType(value);
                   //     this.pools[value] = myPool;
                  //}
                });
            }
        }
    },
    makePoolFromType() {
        //Type poolType = typeof(Pool<>).MakeGenericType(type);
        this.injectionBinder.Bind(type).To(type);
        this.injectionBinder.Bind(Pool).To(poolType).ToName(CommandKeys.COMMAND_POOL);
        var pool = injectionBinder.GetInstance(Pool)(CommandKeys.COMMAND_POOL);
        injectionBinder.Unbind(Pool)(CommandKeys.COMMAND_POOL);
        return pool;
    },
    /**
     *输出类路径与名字
     */
    ToString() {
        return 'path:bbfd/extensions/command/impl/CommandBinder' + ' name:' + this.name;
    }
});

bbfd.CommandBinder = module.exports = CommandBinder;
