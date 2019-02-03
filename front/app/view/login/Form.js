Ext.define('etp.view.login.Form', {
    extend: 'Ext.form.Panel',
    xtype: 'loginForm',

    requires: [
        'Ext.form.Panel',
        'Ext.field.Text',
        'Ext.field.Password',
        'Ext.Button'
    ],

    title: 'Вход в систему',
    cls: 'login-form',
    border: true,
    bodyPadding: 0,
    autoSize: true,

    items: [{
        xtype: 'textfield',
        name: 'login',
        itemId: 'login',
        label: 'Имя пользователя',
        placeholder: 'Имя пользователя',
        required: true
    }, {
        xtype: 'passwordfield',
        name: 'password',
        itemId: 'password',
        label: 'Пароль',
        placeholder: 'Пароль',
        required: true
    }],

    buttons: [{
        xtype: 'button',
        text: 'Войти',
        ui: 'action',
        formBind: true,
        handler: 'onLoginBtnClick'
    }]
});
