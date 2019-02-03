Ext.define('etp.view.login.Form', {
    extend: 'Ext.form.Panel',

    xtype: 'loginForm',

    title: 'Вход в систему',
    cls: 'login-form',
    border: true,
    // bodyBorder: true,
    bodyPadding: 0,
    autoSize: true,
    shadow: true,

    items: [{
        xtype: 'textfield',
        name: 'username',
        itemId: 'username',
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

    bbar: ['->', {
        xtype: 'button',
        text: 'Войти',
        ui: 'action',
        formBind: true,
        handler: 'onLoginBtnClick'
    }]
});
