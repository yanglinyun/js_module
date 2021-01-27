define(function(require,exports,module){
    let name="m3.js";
    let m1 = require("./m1");
    require.async("./m2",(m2)=>{
        m2.getName();
    });
    m1.getName();
    module.exports = {
        getName(){
            console.log(name);
        }
    }
})