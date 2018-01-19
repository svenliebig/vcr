const fs = require("fs")

var pjson = require('../package.json');

const index = __dirname + "/../public/index.html";
fs.readFile(index, 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  var result = data.replace(/<title>VCR<\/title>/g, `<title>VCR - ${pjson.version}<\/title>`);

  fs.writeFile(index, result, 'utf8', function (err) {
     if (err) return console.log(err);
  });
});