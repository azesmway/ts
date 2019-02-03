Ext.define('etp.view.login.MainController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.loginMain',

  listen: {
    component: {
      'loginForm': {
        painted: 'onPainted'
      },
      '#login': {
        keyup: 'onFieldKeyUp'
      },
      '#password': {
        keyup: 'onFieldKeyUp'
      }
    }
  },

  onPainted: function () {
    var me = this, form = me.lookupReference('loginForm');

    form.getFields('username').on({
      single: true,
      delay: 100,
      change: 'onLoginChange'
    });
  },

  onLoginChange: function (field, newValue) {
    var me = this, form = me.lookupReference('loginForm');

    if (newValue.length > 1) {
      form.getFields('password').focus();
      Ext.defer(function () {
        field.focus();
      }, 500);
    }
  },

  /**
   *
   * @param {Ext.field.Field} field
   * @param {Ext.event.Event} e
   */
  onFieldKeyUp: function (field, e) {
    var pwdField;

    if (e && e.getKey() === e.ENTER) {
      pwdField = this.lookupReference('loginForm').getFields('password');
      if (pwdField.validate()) {
        this.doLogin();
      } else {
        pwdField.focus();
      }
    }
  },

  /**
   * @param {Ext.Button} btn
   */
  onLoginBtnClick: function (btn) {
    this.doLogin();
  },

  doLogin: function () {
    var me = this,
      form = me.lookupReference('loginForm'),
      values = form.getValues(),
      login = values.login,
      password = values.password;

    if (!form.validate()) {
      return;
    }

    var auth = me.makeBaseAuth(login, password);

    Ext.Ajax.request({
      url: '/names.nsf?Login',
      method: 'POST',
      headers: {
        Authorization: auth
      },
      params: values,
      success: function(response, opts) {
        var domAuthSessId = Ext.util.Cookies.get("DomAuthSessId");

        if (domAuthSessId) {
          localStorage.setItem("etpbLoggedIn", domAuthSessId);
          me.redirectTo(etp.getApplication().getConfig('defaultToken'));
          me.fireEvent('loggedin', domAuthSessId);
        } else {
          form.reset();
          Ext.Msg.alert('Ошибка', 'Неверный логин или пароль');
        }
      }
    });
  },

  makeBaseAuth: function (user, password) {
    var tok = user + ':' + password;
    var hash = Ext.util.Base64.encode(tok);
    return "Basic " + hash;
  }
});
