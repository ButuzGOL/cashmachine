function randomId() {
  return Math.floor((Math.random() * 9999) + 1);
}

$.mockjax({
  url: /.*?\/signin/,
  response: function(settings) {
    var data = settings.data;

    if (data.number === '111111111' &&
        (data.pin === '111' || typeof data.pin === 'undefined')) {
      this.responseText = { "id": randomId() };
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
    "owner": randomId(),
    "createdAt": "2014-11-12T07:37:28.165Z",
    "updatedAt": "2014-11-12T07:37:28.165Z",
    "id": randomId()
  },
  {
    "code": 1,
    "owner": randomId(),
    "createdAt": "2014-11-12T07:37:29.338Z",
    "updatedAt": "2014-11-12T07:37:29.338Z",
    "id": randomId()
  },
  {
    "code": 1,
    "owner": randomId(),
    "createdAt": "2014-11-12T07:37:54.804Z",
    "updatedAt": "2014-11-12T07:37:54.804Z",
    "id": randomId()
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
        "id": randomId()
      };
    }

  }
});

$.mockjax({
  url: /.*?\/cards\/me/,
  responseText: {
    "id": randomId(),
    "balance": 9999
  }
});
