const paths = require("./paths")

const aliases = {
    "react-native": "react-native-web",
    "@service": paths.appSrc + "/service",
    "@components": paths.appSrc + "/components",
    "@scenes": paths.appSrc + "/scenes",
    "@environment": paths.appSrc + "/environment",
    "@converter": paths.appSrc + "/converter",
    "@model": paths.appSrc + "/model",
    "@utils": paths.appSrc + "/utils",
    "@details": paths.appSrc + "/details"
}

module.exports = aliases