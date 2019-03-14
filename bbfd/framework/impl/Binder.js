// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
//destroy()
//name
//isValid  cc.isValid(obj) 检查是否被销毁
//bbfd js框架 Binder类
//author:kevin
//time:20190307

var iImplements = require("Implements");

let Binder = cc.Class({
    extends: cc.Object,

    properties: {
        bindings: {
            // ATTRIBUTES:
            default: null,        // The default value will be used only when the component attaching
                                  // to a node for the first time
            type: Object, // optional, default is typeof default
            serializable: true,   // optional, default is true
        },
        conflicts: {
            // ATTRIBUTES:
            default: null,        // The default value will be used only when the component attaching
                                  // to a node for the first time
            type: Object, // optional, default is typeof default
            serializable: true,   // optional, default is true
        },
        bindingWhitelist: {
            // ATTRIBUTES:
            default: null,        // The default value will be used only when the component attaching
                                  // to a node for the first time
            type:  Array, // optional, default is typeof default
            serializable: true,   // optional, default is true
        },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:
    
    //=======================================================================================
    // 构造函数中初始化实现的接口方法
    //=======================================================================================

    ctor(){
        cc.log("ctor");
        iImplements.IBinder("Binder").ensureImplements([this]);
        this.bindings = Object.create(null);
        this.conflicts = Object.create(null);

    },
    start () {
        //cc.log("Binder start1:",iImplements);
        //cc.log("Binder start2:",ibinder);
    },

    //=======================================================================================
    // -继承接口方法
    //=======================================================================================
    
    Bind(key){
		var binding = GetRawBinding ();
		binding.Bind(key);
		return binding;
    },

    //arguments--key
    //arguments--name
    //return any
    GetBinding(key,name){
        if (conflicts.Count > 0)
        {
            var conflictSummary = '';
            var keys = conflicts.Keys;
            keys.forEach(element => {
                if (conflictSummary.Length > 0)
                {
                    conflictSummary+= ", ";
                }
                conflictSummary += element.ToString ();
            });
            cc.error("Binder cannot fetch Bindings when the binder is in a conflicted state.\nConflicts: " + conflictSummary, BinderExceptionType.CONFLICT_IN_BINDER);
        }

        if(bindings.ContainsKey (key))
        {
           var dict = bindings [key];
            name = (name == null) ? BindingConst.NULLOID : name;
            if (dict.ContainsKey(name))
            {
                return dict [name];
            }
        }
        return null;
    },

    //arguments--key
    //arguments--name
    //return any
    Unbind(key,name){
        if (bindings.ContainsKey(key))
		{
			var dict = bindings[key];
			var bindingName = (name == null) ? BindingConst.NULLOID : name;
			if (dict.ContainsKey(bindingName))
			{
				dict.Remove(bindingName);
			}
		}
    },

    RemoveValue(binding,value){
        if (binding == null || value == null)
        {
            return;
        }
        var key = binding.key;
        var dict;
        if ((bindings.ContainsKey(key)))
        {
            dict = bindings [key];
            if (dict.ContainsKey(binding.name))
            {
                var useBinding = dict [binding.name];
                useBinding.RemoveValue (value);

                //If result is empty, clean it out
                var values = useBinding.value;
                if (values == null || values.Length == 0)
                {
                    dict.Remove(useBinding.name);
                }
            }
        }
    },

    RemoveKey(binding,key){
        if (binding == null || key == null || bindings.ContainsKey(key) == false) 
        {
            return;
        }
        var dict = bindings[key];
        if (dict.ContainsKey (binding.name)) 
        {
            var useBinding = dict [binding.name];
            useBinding.RemoveKey (key);
            var keys = useBinding.key;
            if (keys != null && keys.Length == 0)
            {
                dict.Remove(binding.name);
            }
        }
    },

    RemoveName(binding,name){
        if (binding == null || name == null) 
        {
            return;
        }
        var key;
        if (binding.keyConstraint.Equals(BindingConstraintType.ONE))
        {
            key = binding.key;
        }
        else
        {
            var keys = binding.key;
            key = keys [0];
        }

        var dict = bindings[key];
        if (dict.ContainsKey (name)) 
        {
            var useBinding = dict [name];
            useBinding.RemoveName (name);
        }
    },

    resolver(binding)
	{
		var key = binding.key;
		if (binding.keyConstraint.Equals(BindingConstraintType.ONE)) {
			ResolveBinding (binding, key);
		} 
		else
		{
			var keys = key;
            var aa = keys.Length;
            for (let a = 0; index < aa; a++) {
                ResolveBinding (binding, keys[a]);
            }
		}
	},
    //获取正在的绑定类
    GetRawBinding(){
        return new Binding (resolver);
    },

    OnRemove(){

    },

    WhitelistBindings(list){
        bindingWhitelist = list;
    },

    ConsumeBindings(jsonString){
        var list = JSON.parse(jsonString);
        var testBinding = GetRawBinding ();

        for (let a=0, aa=list.Count; a < aa; a++)
        {
            ConsumeItem(list[a],testBinding);
        }
    },

    ResolveBinding(){
        //Check for existing conflicts
        if (conflicts.ContainsKey(key))	//does the current key have any conflicts?
        {
            var inConflict = conflicts [key];
            if (inConflict.ContainsKey(binding)) //Am I on the conflict list?
            {
                var conflictName = inConflict[binding];
                if (isConflictCleared(inConflict, binding)) //Am I now out of conflict?
                {
                    clearConflict (key, conflictName, inConflict); //remove all from conflict list.
                }
                else
                {
                    return;	//still in conflict
                }
            }		
        }

        //Check for and assign new conflicts
        var bindingName = (binding.name == null) ? BindingConst.NULLOID : binding.name;
        Dictionary<object, IBinding> dict;
        if ((bindings.ContainsKey(key)))
        {
            dict = bindings [key];
            //Will my registration create a new conflict?
            if (dict.ContainsKey(bindingName))
            {

                //If the existing binding is not this binding, and the existing binding is not weak
                //If it IS weak, we will proceed normally and overwrite the binding in the dictionary
                var existingBinding = dict[bindingName];
                //if (existingBinding != binding && !existingBinding.isWeak)
                //SDM2014-01-20: as part of cross-context implicit bindings fix, attempts by a weak binding to replace a non-weak binding are ignored instead of being 
                if (existingBinding != binding)
                {
                    if (!existingBinding.isWeak && !binding.isWeak)
                    {
                        //register both conflictees
                        registerNameConflict(key, binding, dict[bindingName]);
                        return;
                    }
                    //existingBinding.value is System.Type
                    if (existingBinding.isWeak && (!binding.isWeak || existingBinding.value == null))
                    {
                        //SDM2014-01-20: (in relation to the cross-context implicit bindings fix)
                        // 1) if the previous binding is weak and the new binding is not weak, then the new binding replaces the previous;
                        // 2) but if the new binding is also weak, then it only replaces the previous weak binding if the previous binding
                        // has not already been instantiated:

                        //Remove the previous binding.
                        dict.Remove(bindingName);
                    }
                }
                
            }
        }
        else
        {
            dict = Object.create(null);
            bindings [key] = dict;
        }

        //Remove nulloid bindings
        if (dict.ContainsKey(BindingConst.NULLOID) && dict[BindingConst.NULLOID].Equals(binding) )
        {
            dict.Remove (BindingConst.NULLOID);
        }

        //Add (or override) our new binding!
        if (!dict.ContainsKey(bindingName))
        {
            dict.Add (bindingName, binding);
        }
    },

    BindingResolver(){

    },
    ConsumeItem(item,testBinding)
	{
	    var bindConstraints = (testBinding.keyConstraint == BindingConstraintType.ONE) ? 0 : 1;
			bindConstraints |= (testBinding.valueConstraint == BindingConstraintType.ONE) ? 0 : 2;
		var binding = null;
		var keyList;
		var valueList;

			if (item != null)
			{
				item = ConformRuntimeItem (item);
				// Check that Bind exists
				if (!item.ContainsKey ("Bind"))
				{
					throw new BinderException ("Attempted to consume a binding without a bind key.", BinderExceptionType.RUNTIME_NO_BIND);
				}
				else
				{
					keyList = conformRuntimeToList (item ["Bind"]);
				}
				// Check that key counts match the binding constraint
				if (keyList.Count > 1 && (bindConstraints & 1) == 0)
				{
					throw new BinderException ("Binder " + this.ToString () + " supports only a single binding key. A runtime binding key including " + keyList [0].ToString () + " is trying to add more.", BinderExceptionType.RUNTIME_TOO_MANY_KEYS);
				}

				if (!item.ContainsKey ("To"))
				{
					valueList = keyList;
				}
				else
				{
					valueList = conformRuntimeToList (item ["To"]);
				}
				// Check that value counts match the binding constraint
				if (valueList.Count > 1 && (bindConstraints & 2) == 0)
				{
					throw new BinderException ("Binder " + this.ToString () + " supports only a single binding value. A runtime binding value including " + valueList [0].ToString () + " is trying to add more.", BinderExceptionType.RUNTIME_TOO_MANY_VALUES);
				}

				// Check Whitelist if it exists
				if (bindingWhitelist != null)
				{
                    valueList.forEach(element => {
                        if (bindingWhitelist.IndexOf (value) == -1)
						{
							throw new BinderException ("Value " + value.ToString () + " not found on whitelist for " + this.ToString () + ".", BinderExceptionType.RUNTIME_FAILED_WHITELIST_CHECK);
						}
                    });
				}

				binding = performKeyValueBindings (keyList, valueList);

				// Optionally look for ToName
				if (item.ContainsKey ("ToName"))
				{
					binding = binding.ToName (item ["ToName"]);
				}

				// Add runtime options
				if (item.ContainsKey ("Options"))
				{
					varoptionsList = conformRuntimeToList (item ["Options"]);
					addRuntimeOptions (binding, optionsList);
				}
			}
			return binding;
    },
    ConformRuntimeItem(){
        return dictionary;
    },
    performKeyValueBindings(keyList,valueList){
        var binding = null;
            // Bind in order
        keyList.forEach(element => {
            binding = Bind (key);
        });
        valueList.forEach(element => {
            binding = binding.To (value);
        });
		return binding;
    },
    addRuntimeOptions(binding,options){
        if (options.IndexOf ("Weak") > -1)
		{
			binding.Weak();
		}
		return binding;
    },
    conformRuntimeToList(bindObject){
       var conformed = Object.create(null);

        var t = bindObject.GetType().ToString ();
        if (t.IndexOf ("System.Collections.Generic.List") > -1)
        {
            return bindObject;
        }

        // Conform strings to Lists
        switch (t)
        {
            case "System.String":
                var stringValue = bindObject;
                conformed.Add(stringValue);
                break;
            case "System.Int64":
                var intValue = bindObject;
                conformed.Add(intValue);
                break;
            case "System.Double":
                var floatValue = bindObject;
                conformed.Add(floatValue);
                break;
            default:
                throw new BinderException ("Runtime binding keys (Bind) must be strings or numbers.\nBinding detected of type " + t, BinderExceptionType.RUNTIME_TYPE_UNKNOWN);
        }
        return conformed;
    },
    registerNameConflict(){
        var dict;
		if (conflicts.ContainsKey(key) == false)
		{
			dict = Object.create(null);
			conflicts [key] = dict;
		}
		else
		{
			dict = conflicts [key];
		}
		dict [newBinding] = newBinding.name;
		dict [existingBinding] = newBinding.name;
    },
    isConflictCleared(dict,binding){
        dict.forEach(element => {
            if (element.Key != binding &&element.Key.name == binding.name)
			{
				return false;
			}
        });
		return true;
    },
    clearConflict(key, name, dict){
        var removalList = [];
        array.forEach(element => {
            
        });
        foreach(KeyValuePair<IBinding, object> kv in dict)
        {
            var v = kv.Value;
            if (v.Equals(name))
            {
                removalList.Add (kv.Key);
            }
        }
        var aa = removalList.Count;
        for (let a = 0; a < aa; a++)
        {
            dict.Remove(removalList[a]);
        }
        if (dict.Count == 0)
        {
            conflicts.Remove (key);
        }
    },
    spliceValueAt(splicePos,objectValue){
        var newList = [];
        var mod = 0;
        var aa = objectValue.Length;
        for(let a = 0; a < aa; a++)
        {
            if (a == splicePos)
            {
                mod = -1;
                continue;
            }
            newList [a + mod] = objectValue[a];
        }
        return newList;
    }
    // update (dt) {},
});

