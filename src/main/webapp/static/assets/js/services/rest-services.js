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
                $http.put(REST_SERVER+'/assemblies/'+$localStorage.user.assembly+'/member/'+member.id, {
                    params: {
                        data: member
                    }
                }).then(function (response) {
                    callback(response.data);
                });
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
            create:function(data,callback){
                var url = REST_SERVER+'/ws/member/event/add/';
                var req = {
                    method: 'POST',
                    url: url,
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    data: data
                }
                return $http(req).
                    then(function (response) {
                    callback(response);
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
    .factory('Tithe', ['$http','REST_SERVER','$state',function($http,REST_SERVER){
        var user;

        return{
            addTithes : function(tithe,callback){
                var tithejson = JSON.stringify(tithe);
                var url = REST_SERVER+'/ws/member/tithe/add/';

                var config = {
                    headers : {
                        'Content-Type': 'application/json;charset=utf-8;'
                    }
                }
                return $http.post(url,tithejson,config).
                    then(function (data) {
                        var result = data.data;
                        if (result !== null) {
                            response = result.success;
                        } else {
                            response = { success: false, message: 'Failed to post tithe transactions to server' };
                        }
                        callback(response,result);
                    },function(error){
                        console.log(error);
                        callback(error);
                    });
            }
        }
    }])
;
