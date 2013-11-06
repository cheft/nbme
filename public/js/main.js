App = Ember.Application.create();

/*创建应用控制器类，为视图提供上下文，模板里的内容将由该控制器提供*/
App.IndexController = Ember.Controller.extend({
    title: 'Index'
});

App.TempController = Ember.Controller.extend({
    title: 'Temp'
});

App.TestController = Ember.Controller.extend({
    title: 'Test'
});

App.Router.map(function() {
    this.route('index', {
        path: '/'
    });
    this.route('temp', {
        path: '/temp'
    });
    this.route('test', {
        path: '/test'
    });
});


/*初始化应用，启动路由进程，创建视图实例并插入到页面*/
App.initialize();

function getHtml() {
    $.get(url, function(html) {
        $('#main').html(html);
    });
}
