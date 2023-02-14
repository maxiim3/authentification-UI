const {handler} = require("./hello-world.js")


function init(){
	console.log("init")
		return handler("coucou").then(r => console.log(r))
}
module.exports = init
