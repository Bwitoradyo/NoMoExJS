const through2 = require("through2"),
	cowsay = require("cowsay");
process.stdin.pipe(through2(function(chunk, enc, callback){
  this.push(cowsay.say({text: "" + chunk}));
  callback()
})).pipe(process.stdout);
