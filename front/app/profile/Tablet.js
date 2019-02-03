Ext.define('etp.profile.Tablet', {
    extend: 'Ext.app.Profile',

    isActive: function () {
        return Ext.os.is.Tablet;
    },

    launch: function () {
        this.callParent(arguments);
    }
});
