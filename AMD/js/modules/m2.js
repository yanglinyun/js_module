//有依赖模块
define(['m1'],function(m1){
    let name="M1";
    function getName(){
        console.log(name,m1.getName());
    }
    //暴露模块
    return {getName}
})