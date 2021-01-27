//定义无依赖
define(function(){
    let name="M1";
    function getName(){
        return name;
    }
    //暴露模块
    return {getName};
})