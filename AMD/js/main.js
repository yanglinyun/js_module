(function(){
    requirejs.config({
        baseUrl:'js/',
        paths:{
            m1:'modules/m1',
            m2:'modules/m2',
            main:'main'
        }
    })
    requirejs(['m2'],function(m2){
        m2.getName();
    })
})();