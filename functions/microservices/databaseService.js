const mongoModel = require("../../router/lib/mongoModel");

new mongoModel({
    codeData:"hello"
}).save()