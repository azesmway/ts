Ext.define('etp.view.login.Main', {
    extend: 'Ext.Container',

    xtype: 'loginMain',

    requires: [
        'Ext.layout.Center',
        'Ext.Panel',
        'etp.view.login.Form',
        'etp.view.login.MainController'
    ],

    controller: 'loginMain',

    layout: 'center',

    items: [{
        xtype: 'loginForm',
        reference: 'loginForm',
        plugins: {
            responsive: true
        },
        responsiveConfig: {
            'width <= 414': {
                width: '100%'
            },
            'width > 414': {
                width: 414,
                maxWidth: 414
            },
            'height <= 315': {
                header: false
            },
            'height > 315': {
                header: true
            }
        }
    }]
});
