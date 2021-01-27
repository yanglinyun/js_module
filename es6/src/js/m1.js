import * as m2 from './m2.js';
import m3 from './m3.js';
//分别暴露
export let name = "m1";
export function sayName(){
	console.log(name,m2.name,m3.sayName());
}