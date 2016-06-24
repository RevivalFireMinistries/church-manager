angular.module('esavvy.services', [])

    //.constant('REST_SERVER', 'http://esavvy.rfm.org.za')
    .constant('REST_SERVER', 'http://localhost:8000')


    .factory('Members',['$http','REST_SERVER','$localStorage', function($http,REST_SERVER,$localStorage) {
        console.log("Rest server url "+REST_SERVER)
        var members = [];
        return {
            all: function(assemblyId,callback) {
                return $http.get(REST_SERVER+'/assemblies/'+$localStorage.user.assembly+'/members').
                    then(function (result) {
                        var members = result.data;
                        if (members !== null) {
                            response = { success: true };
                        } else {
                            response = { success: false, message: 'Failed to load members from server' };
                        }
                        callback(response,members);
                    });
            },
            create:function(data,callback){
                $http.post(REST_SERVER+'/assemblies/'+$localStorage.user.assembly+'/member/',data).
                    then(function(response){
                        callback(response.data);
                    });
            },
            edit:function(member,callback){
                $http.put(REST_SERVER+'/assemblies/'+$localStorage.user.assembly+'/member/'+member.id,member).
                    then(function (response) {
                    callback(response.data);
                });
            },
            delete:function(id,callback){
                $http.delete(REST_SERVER+'/assemblies/'+$localStorage.user.assembly+'/member/'+id).
                    then(function (response) {
                        callback(response.data);
                    });
            },
            get: function(memberId) {
                return $http.get(REST_SERVER+'/ws/member/'+memberId).
                    then(function(result) {
                        return result.data;
                    });
            }

        }
    }])
    .factory('Events',['$http','REST_SERVER','$localStorage', function($http,REST_SERVER,$localStorage) {
        console.log("Rest server url "+REST_SERVER)
        var members = [];
        return {
            all: function() {
                return $http.get(REST_SERVER+'/ws/member/reports/all/1').
                    then(function(result) {
                        return result.data;
                    });
            },
            create:function(data,callback){
                $http.post(REST_SERVER+'/assemblies/'+$localStorage.user.assembly+'/event/',data).
                    then(function(response){
                        callback(response.data);
                    });
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
    .factory('Auth', ['$http','REST_SERVER','$state',function($http,REST_SERVER){
        var user;

        return{
            getUser : function(formUser,callback){
                var url = REST_SERVER+'/auth/login';
                var req = {
                    method: 'POST',
                    url: url,
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    data: formUser
                }
                return $http(req).
                    then(function (resp) {
                        callback(resp.data);
                    },
                    function(err) {
                        console.log(err); // Error: "It broke"
                        response = { status: 0, message: 'Server error' };
                        callback(response);
                    });
            }
        }
    }])
    .factory('Tithe', ['$http','REST_SERVER','$localStorage',function($http,REST_SERVER,$localStorage,$q) {

        return {
            create:function(tithe,callback){
                $http.post(REST_SERVER+'/member/'+tithe.member.id+'/tithe/',tithe).
                    then(function(response){
                        callback(response.data);
                    });
            }
        }
    }]);


