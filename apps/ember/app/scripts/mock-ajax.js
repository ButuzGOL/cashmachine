$.mockjax({
  url: /.*?\/signin/,
  response: function(settings) {
    var data = settings.data;

    if (data.number === '111111111' &&
        (data.pin === '111' || typeof data.pin === 'undefined')) {
      this.responseText = { "id": "54630bbc484d45154e6fa294" };
    } else {
      this.status = 400;
      this.responseText = { "message": "Wrong data" };
    }
  }
});

$.mockjax({
  url: /.*?\/signout/,
  status: 204
});

$.mockjax({
  url: /.*?\/cards\/me\/operations/,
  responseText: [{
    "code": 1,
    "owner": "54630bbc484d45154e6fa294",
    "createdAt": "2014-11-12T07:37:28.165Z",
    "updatedAt": "2014-11-12T07:37:28.165Z",
    "id": "54630e3881355d434e8a8be7"
  },
  {
    "code": 1,
    "owner": "54630bbc484d45154e6fa294",
    "createdAt": "2014-11-12T07:37:29.338Z",
    "updatedAt": "2014-11-12T07:37:29.338Z",
    "id": "54630e3981355d434e8a8be8"
  },
  {
    "code": 1,
    "owner": "54630bbc484d45154e6fa294",
    "createdAt": "2014-11-12T07:37:54.804Z",
    "updatedAt": "2014-11-12T07:37:54.804Z",
    "id": "54630e5281355d434e8a8be9"
  }]
});

$.mockjax({
  url: /.*?\/cards\/.*?\/balance/,
  response: function(settings) {
    var data = settings.data;

    if (data.take < 0) {
      this.status = 400;
      this.responseText = { "message": "Should be more than zero" };
    } else if (data.take > 9999) {
      this.status = 400;
      this.responseText = { "message": "Not enough balance" };
    } else {
      this.responseText = {
        "code": 2,
        "createdAt": "2014-11-15T07:24:23.497Z",
        "id": "5466ffa74115434b1177fd15"
      };
    }

  }
});

$.mockjax({
  url: /.*?\/cards\/me/,
  responseText: {
    "id": "54630bbc484d45154e6fa294",
    "balance": 9999
  }
});
