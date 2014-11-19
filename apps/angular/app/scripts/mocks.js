/*jshint quotmark: false */

angular.module('cashmachineApp').run(function($httpBackend) {
  
  function randomId() {
    return Math.floor((Math.random() * 9999) + 1);
  }

  $httpBackend.whenGET(/\.html/).passThrough();

  $httpBackend.whenPOST(/.*?\/signin/).respond(function(method, url, data) {
    data = angular.fromJson(data);

    if (data.number === '111111111' &&
        (data.pin === '111' || typeof data.pin === 'undefined')) {
      return [200, { "id": randomId() }];
    } else {
      return [400, { "message": "Wrong data" }];
    }
  });

  $httpBackend.whenGET(/.*?\/signout/).respond(204);

  $httpBackend.whenGET(/.*?\/cards\/.*?\/operations/).respond([{
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
  }]);

  $httpBackend.whenPUT(/.*?\/cards\/.*?\/balance/)
    .respond(function(method, url, data) {
      data = angular.fromJson(data);

      if (data.take < 0) {
        return [400, { "message": "Should be more than zero" }];
      } else if (data.take > 9999) {
        return [400, { "message": "Not enough balance" }];
      } else {
        return [200, {
          "code": 2,
          "createdAt": "2014-11-15T07:24:23.497Z",
          "id": randomId()
        }];
      }
      
    }
  );
 
  $httpBackend.whenGET(/.*?\/cards\/.*?/).respond({
    "id": randomId(),
    "balance": 9999
  });
});
