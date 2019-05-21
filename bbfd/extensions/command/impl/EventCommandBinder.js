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
const dispatchImp = require('../../dispatcher/api/DispatcherImplements');
const commandImp = require('../../command/api/CommandImplements');

let EventCommandBinder = cc.Class({
    name:'bbfd.EventCommandBinder',
    extends: bbfd.CommandBinder,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },
    createCommand (cmd,data) {
       // bbfd.debug('EventCommandBinder:createCommand=================================:'+'//'+data+"//"+cmd);
        this.injectionBinder.Bind(commandImp.ICommand).To(cmd);
        var dataisEvent = false;
        if(dispatchImp.IEvent("EventCommandBinder").ensureImplements([data]))
        {
            dataisEvent = true;
            this.injectionBinder.Bind(dispatchImp.IEvent).ToValue(data).ToInject(false);
        }
        let command =  this.injectionBinder.GetInstance(commandImp.ICommand);//实例化命令类
        if(command == null)
        {
            var msg = '';
            if(dataisEvent)
            {
                msg = data.type;
            }
            throw new Error('EventCommandBinder：A Command tied to event '+ msg + ' could not be instantiated.\nThis might be caused by a null pointer during instantiation or failing to override Execute (generally you shouldnt have constructor code in Commands).');
        }
        command.data = data;
        if (dataisEvent)
	    {
			this.injectionBinder.Unbind(dispatchImp.IEvent);
		}
        this.injectionBinder.Unbind(commandImp.ICommand);
        return command;
    },
    disposeOfSequencedData(data){
        data = null;//对象销毁
    },
    /**
     *输出类路径与名字
     */
    ToString() {
        return 'path:bbfd/extensions/command/impl/EventCommandBinder' + ' name:' + this.name;
    }
});

bbfd.EventCommandBinder = module.exports = EventCommandBinder;