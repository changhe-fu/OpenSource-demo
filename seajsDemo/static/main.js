define(function (require, exports, module) {
    var changeText = require('changeText');
    var $ = require('jquery');
    var showText = function () {
        $('#title').text(changeText.init());
    }
    exports.showText = showText;
})