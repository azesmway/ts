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

        form.getFields('login').on({
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
            password = values.password,
            params = [login, password, {
                'lock_ip': false,
                'come_from_marker': false
            }],
            dparams = {
                scope: me,
                mask: true,
                wait_text: 'Загрузка привилегий...',
                mask_el: me.getView()
            };

        if (!form.validate()) {
            return;
        }

        performRPCCall(RPC.Authentication.login, params, dparams, me.loginCallback);
    },

    /**
     * @param {Object} result
     */
    loginCallback: function (result) {
        var me = this;

        if (result.success !== true) {
            echoResponseMessage(result, function () {
                me.getView().down('[name="login"]').focus();
            });
            return;
        }

        Main.reloadPrivileges().then(function () {
            // Если нет ролей "Уполномоченный на создание заявки" или "Уполномоченный на согласование процедуры"
            // отправляем на основную площадку
            if (Main.user.roles.indexOf(USER_ROLE_GUEST) === -1
                && Main.user.roles.indexOf(USER_ROLE_REQUESTS_CREATOR) === -1
                && Main.user.roles.indexOf(USER_ROLE_REQUESTS_APPROVE_USER) === -1) {

                performRPCCall(RPC.Index.switchToFullMode, [], null, function (resp) {
                    window.location = "/";
                });
                return;
            }

            me.fireEvent('loggedin', Main.user);
        });
        localStorage.setItem("etpLoggedIn", '1');
    }
});
