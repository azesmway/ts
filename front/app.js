/*
 * This file launches the application by asking Ext JS to create
 * and launch() the Application class.
 */
Ext.application({
    extend: 'GTS.Application',

    name: 'GTS',

    requires: [
        'GTS.*',
        'Ext.Dialog',
        'Ext.plugin.Responsive',
        'Ext.Img',
        'Ext.menu.Menu',
        'Ext.tab.Panel',
        'Ext.Panel',
        'Ext.ActionSheet',
        'Ext.Toolbar',
        'Ext.MessageBox',
        'Ext.layout.Fit',
        'Ext.menu.CheckItem'
    ],

    // The name of the initial view to create.
    mainView: 'GTS.view.main.Main'
});
