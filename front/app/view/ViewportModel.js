Ext.define('etp.view.ViewportModel', {
  extend: 'Ext.app.ViewModel',
  alias: 'viewmodel.viewport',

  data: {
    name: 'etp',
    user: null,
    contragent: null,
    currentRoute: 'home'
  }

  // formulas: {
  //   isUserRequestsCreator: function (get) {
  //     return Main.user.roles.indexOf(USER_ROLE_REQUESTS_CREATOR) > -1;
  //   },
  //
  //   isUserRequestsApprover: function (get) {
  //     return Main.user.roles.indexOf(USER_ROLE_REQUESTS_APPROVE_USER) > -1;
  //   },
  //
  //   isUserRequestsProcedureCreator: function (get) {
  //     return Main.user.roles.indexOf(USER_ROLE_REQUESTS_PROCEDURE_CREATOR) > -1;
  //   }
  // }
});
