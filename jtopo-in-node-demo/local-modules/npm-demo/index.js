;(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
      typeof define === 'function' && define.amd ? define(factory) :
        global.moduleName = factory()
  }(this, (function () {
    var demo = {
      sayHi: function () {
        console.log('hi，module !');
      }
    };
   
    return demo
})))