module.exports = {
    msg:"m1",
    foo(){
        console.log(this.msg);
    }
}
//层叠上面
module.exports = {
    msg:"m1层叠",
    foo(){
        console.log(this.msg);
    },
    arr:[4,4,5,32,1]
}