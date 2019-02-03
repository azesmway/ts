Ext.define('etp.profile.Desktop', {
    extend: 'Ext.app.Profile',

    isActive: function () {
        return Ext.os.is.Desktop;
    },

    launch: function () {
        this.callParent(arguments);
    }
});
