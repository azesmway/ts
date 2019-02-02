/**
 * Главный контроллер приложения.
 * Отвечает за авторизацию и роутинг главных страниц.
 */
Ext.define('etp.controller.Main', {
  extend: 'Ext.app.Controller',

  routes: {
    'home': {
      before: 'onBeforeRoutes',
      action: 'onHomeRoute'
    },
    'login': 'onLoginRoute'
  },

  // listen: {
  //   controller: {
  //     loginMain: {
  //       loggedin: 'onLoggedIn'
  //     }
  //   }
  // },

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
    var me = this;

    if (Ext.util.History.getToken() && Ext.util.History.getToken() !== me.getApplication().loginToken) {
      me.requestedToken = Ext.util.History.getToken();
    } else {
      me.requestedToken = me.getApplication().getConfig('defaultToken');
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
    var me = this;

    if (me.getApplication().initEtp !== true) {
        me.getApplication().initEtp = true;
        if (me.getApplication().isLoggedIn()) {
          action.resume();
        } else {
          if (location.hash !== '#login') {
            action.stop();
            me.redirectTo(me.getApplication().loginToken);
          } else {
            action.resume();
          }
        }
    } else {
      action.resume();
    }
  },

  onLoginRoute: function () {
    Ext.Msg.confirm('Confirm', 'Are you sure?', 'onConfirm', this);
  },

  onHomeRoute: function () {

  },

  onConfirm: function (choice) {
    if (choice === 'yes') {
      //
    }
  }

  /**
   * Срабатывает только при авторизации пользователя
   *
   * @param {object} user @see Main.user
   */
  // onLoggedIn: function () {
  //   var me = this, mainView;
  //
  //   Ext.Viewport.removeAll(true, true);
  //   me.getApplication().setMainView('Etpgpb.view.main.Main');
  //   mainView = me.getApplication().getMainView();
  //   Ext.Viewport.add(mainView);
  //
  //   if (me.requestedToken !== me.getApplication().getConfig('defaultToken')) {
  //     me.getApplication().getMainView().hide();
  //   }
  //
  //   Ext.Viewport.setViewModel({
  //     type: 'viewport'
  //   });
  //
  //   Ext.Viewport.getViewModel().set('currentRoute', me.requestedToken);
  //   me.redirectTo(me.requestedToken);
  //   me.requestedToken = me.getApplication().getDefaultToken();
  // }

});