
let DelegateType = cc.Enum({
    DEFAULT:'default',//一个参数
    /// Constrains a SemiBinding to carry a list of items in its Value
    EMPTY:'empty',//无参数
    /// Instructs the Binding to apply a Pool instead of a SemiBinding
    TWO_ARGS:'two_args' //两个参数
})

module.exports = DelegateType;