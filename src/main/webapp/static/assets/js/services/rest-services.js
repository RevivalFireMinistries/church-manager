angular.module('esavvy.services', [])

    //.constant('REST_SERVER', 'http://esavvy.rfm.org.za')
    .constant('REST_SERVER', 'http://localhost:9000')


    .factory('Members',['$http','REST_SERVER', function($http,REST_SERVER) {
        console.log("Rest server url "+REST_SERVER)
        var members = [];
        return {
            all: function(assemblyId) {
                return $http.get(REST_SERVER+'/ws/member/all/'+assemblyId).
                    then(function(result) {
                        return result.data;
                    });
            },
            create:function(data){
                $http.post(REST_SERVER+'/ws/member/add/',data);
                console.log("Member added successfully")
            },
            edit:function(id,data){

            },
            delete:function(id){

            },
            get: function(memberId) {
                return $http.get(REST_SERVER+'/ws/member/'+memberId).
                    then(function(result) {
                        return result.data;
                    });
            }

        }
    }])
    .factory('Reports',['$http','REST_SERVER', function($http,REST_SERVER) {
        console.log("Rest server url "+REST_SERVER)
        var members = [];
        return {
            all: function() {
                return $http.get(REST_SERVER+'/ws/member/reports/all/1').
                    then(function(result) {
                        return result.data;
                    });
            },
            create:function(data){
                $http.post(REST_SERVER+'/ws/member/event/add/',data);
                console.log("Report sent successfully")
            },
            edit:function(id,data){

            },
            delete:function(id){

            },
            get: function(reportId) {
                return $http.get(REST_SERVER+'/ws/member/report/'+reportId).
                    then(function(result) {
                        return result.data;
                    });
            }
        }
    }])
    .factory('Auth', ['$http','REST_SERVER','$state',function($http,REST_SERVER,localStorageService,$state){
        var user;

        return{
            getUser : function(username,password,callback){
                return $http.get(REST_SERVER+'/ws/user/user/'+username).
                    then(function (user) {
                        if (user !== null && user.password === password) {
                            response = { success: true };
                        } else {
                            response = { success: false, message: 'Username or password is incorrect' };
                        }
                        callback(response);
                    });
            }
        }
    }])
;
