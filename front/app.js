/*
 * This file launches the application by asking Ext JS to create
 * and launch() the Application class.
 */
Ext.application({
  extend: 'etp.Application',

  name: 'etp',

  profiles: [
    'Phone',
    'Tablet',
    'Desktop'
  ],

  requires: [
    'etp.*',
    'Ext.*'
  ]

});
