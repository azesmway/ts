/**
 * Главный контроллер приложения.
 * Отвечает за авторизацию и роутинг главных страниц.
 */
Ext.define('etp.controller.Main', {
  extend: 'Ext.app.Controller',

  routes: {
    '*': {
      before: 'onBeforeRoutes'
    },
    'login': 'onLoginRoute',
    ':route': 'onRoute'
  },

  listen: {
    controller: {
      loginMain: {
        loggedin: 'onLoggedIn'
      }
    }
  },

  /**
   * Запрошенный роут
   *
   * @cfg {String}
   */
  requestedToken: null,

  /**
   * @inheritDoc
   */
  init: function () {
    this.initRequestedToken();
    this.callParent(arguments);
  },

  /**
   * Запоминаем запрошенный роут и, при изменении роута,
   * записываем новый роут в модель вьюпорта.
   */
  initRequestedToken: function () {
    var me = this,
      app = me.getApplication();

    if (Ext.util.History.getToken() && Ext.util.History.getToken() !== app.loginToken) {
      me.requestedToken = Ext.util.History.getToken();
    } else {
      me.requestedToken = app.getConfig('defaultToken');
    }

    Ext.util.History.on('change', function (token) {
      Ext.Viewport.getViewModel() && Ext.Viewport.getViewModel().set('currentRoute', token);
    }, me);
  },

  /**
   * Проверка сесии пользователя, если нету сессии то инициализируем ее.
   *
   * @param {Ext.route.Action} action
   */
  onBeforeRoutes: function (action) {
    var me = this,
      app = me.getApplication();

    if (app.initEtp !== true) {
      app.initEtp = true;
      if (app.isLoggedIn()) {
        action.resume();
      } else {
        if (location.hash !== '#' + app.getConfig('loginToken')) {
          action.stop();
          me.redirectTo(app.getConfig('loginToken'));
        } else {
          action.resume();
        }
      }
    } else {
      action.resume();
    }
  },

  /**
   * Отображаем страницу авторизации
   */
  onLoginRoute: function () {
    var me = this,
      app = me.getApplication();

    if (Ext.fly('loader')) {
      Ext.fly('loader').destroy();
    }

    if (app.isLoggedIn()) {
      me.redirectTo(app.getConfig('defaultToken'));
    } else {
      Ext.Viewport.removeAll(true, true);
      app.setMainView('etp.view.login.Main');
      Ext.Viewport.add(app.getMainView());
    }
  },

  onHomeRoute: function () {
    var me = this,
      app = me.getApplication();

//    localStorage.setItem("etpbLoggedIn", null);
    Ext.Viewport.removeAll(true, true);
    app.setMainView('etp.view.main.Main');
    Ext.Viewport.add(app.getMainView());
  },

  onConfirm: function (choice) {
    if (choice === 'yes') {
      //
    }
  },

  /**
   * Срабатывает только при авторизации пользователя
   *
   * @param {object} user @see Main.user
   */
  onLoggedIn: function () {
    var me = this, mainView,
      app = me.getApplication();

    Ext.Viewport.removeAll(true, true);
    app.setMainView('etp.view.main.Main');
    mainView = app.getMainView();
    Ext.Viewport.add(mainView);

    if (me.requestedToken !== app.getConfig('defaultToken')) {
      app.getMainView().hide();
    }

    Ext.Viewport.setViewModel({
      type: 'viewport'
    });

    Ext.Viewport.getViewModel().set('currentRoute', me.requestedToken);
    me.redirectTo(me.requestedToken);
    me.requestedToken = app.getDefaultToken();
  },

  /**
   * @param {String} hash
   */
  onRoute: function (hash) {
    var me = this, item,
      view = me.getApplication().getMainView(),
      app = me.getApplication();

    if (!app.isLoggedIn()) {
      return me.redirectTo(app.getConfig('loginToken'));
    }

    item = view.down('[route="' + hash + '"]');
    if (!item) {
      return me.redirectTo(app.getDefaultToken());
    }

    view.suspendEvent('beforeactiveItemchange');
    view.setActiveItem(item, true);
    view.resumeEvent('beforeactiveItemchange');
  }

});