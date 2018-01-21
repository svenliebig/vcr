"usestrict"

const possibleSubjects = ["feat", "fix", "docs", "style", "refactor", "test", "chore"]

const instructions = `\nnode patch.js <subject> ...<content>\n\n\tsubject: ${possibleSubjects.join(" | ")}\n\tcontent: string`
const moment = require("moment")

const changeLogSubject = process.argv[2]

if (possibleSubjects.indexOf(changeLogSubject) === -1) {
	console.error(`\nPlease pass a valid changeLogSubject.\n${instructions}\n`)
	process.exit(0)
}

const content = process.argv.slice(3)

if (content.length === 0) {
	console.error(`\nPlease pass a content.\n${instructions}\n`)
	process.exit(0)
}

const fs = require("fs")

const oldVersion = require('../package.json').version
const versionRegex = /([\d]*)\.([\d]*)\.([\d]*)/g
const result = versionRegex.exec(oldVersion)
const newVersion = `${result[1]}.${result[2]}.${parseInt(result[3]) + 1}`
const packageJson = __dirname + "/../package.json"
const changelog = __dirname + "/../changelog.md"
const readme = __dirname + "/../README.md"

function replaceStringInFile(regex, replaceStr, file) {
	fs.readFile(file, 'utf8', function (err, data) {
		if (err) {
			return console.log(err)
		}
		var result = data.replace(regex, replaceStr)

		fs.writeFile(file, result, 'utf8', function (err) {
			if (err) return console.log(err);
		})
	})
}

function appendStringToFile(appendString, file) {
	fs.readFile(file, 'utf8', function (err, data) {
		if (err) {
			return console.log(err)
		}
		var result = data += appendString

		fs.writeFile(file, result, 'utf8', function (err) {
			if (err) return console.log(err);
		})
	})
}

const today = moment().format("DD.MM.YYYY")
const changelogText = content.map(val => { console.log("foreach"); console.log(val); return `\n- ${val}`; });
const changelogString = `\n\n## [${newVersion}] - ${today}\n\n### ${changeLogSubject}\n${changelogText.join("")}`

replaceStringInFile(oldVersion, newVersion, packageJson)
replaceStringInFile(oldVersion, newVersion, readme)
appendStringToFile(changelogString, changelog)
