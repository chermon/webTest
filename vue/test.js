function Vue (name) {
    this.test = name;
}
Vue.prototype.bus = function () {
    console.log(this.test);
}
Vue.test = 'abc';
Vue.bus = function () {
    console.log(this.test);
};

var vm = new Vue(123);

vm.bus();
Vue.bus();


