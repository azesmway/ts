Ext.define('etp.profile.Phone', {
    extend: 'Ext.app.Profile',

    isActive: function () {
        return Ext.os.is.Phone;
    },

    launch: function () {
        this.callParent(arguments);
    }
});
