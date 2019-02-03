/**
 * The main application class. An instance of this class is created by app.js when it
 * calls Ext.application(). This is the ideal place to handle application launch and
 * initialization details.
 */
Ext.define('etp.Application', {
    extend: 'Ext.app.Application',

    name: 'etp',

    quickTips: false,
    platformConfig: {
        desktop: {
            quickTips: true
        }
    },

    defaultToken: 'home',
    loginToken: 'login',
    initEtp: false,

    controllers: [
        'etp.controller.Main'
    ],

    stores: [
        // TODO: add global / shared stores here
    ],

    launch: function () {
        var me = this;

        Ext.util.Format.defaultDateFormat = 'd.m.Y';
        Ext.Ajax.autoAbort = true;
    },

    isLoggedIn: function () {
        return Ext.util.Cookies.get("DomAuthSessId");
    },

    onAppUpdate: function () {
        Ext.Msg.confirm('Application Update', 'This application has an update, reload?',
            function (choice) {
                if (choice === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});
