const fs = require("fs")
const packagejson = __dirname + "/../package.json"
const index = __dirname + "/../public/index.html"

function replaceStringInFile(regex, replaceStr, file) {
	fs.readFile(file, 'utf8', function (err,data) {
		if (err) {
			return console.log(err)
		}
		var result = data.replace(regex, replaceStr)

		fs.writeFile(file, result, 'utf8', function (err) {
			if (err) return console.log(err);
		})
	})
}

var pjson = require('../package.json')


replaceStringInFile(/<title>VCR<\/title>/g, `<title>VCR - ${pjson.version}<\/title>`, index)
replaceStringInFile(/http:\/\/tv.slyox.de/g, `http://tv.beta.slyox.de`, packagejson)
