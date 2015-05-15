
var COL_USERNAME= 'username';
var COL_PASSWORD = 'password';


exports.getUser = function(request, response) {
  console.log("getUser request:" + JSON.stringify(request.params));
  var params = request.params;
  var username = params[COL_USERNAME];
 if (!username || !password){
	 response.error('username or password null');
	 return ;
	 
 }
   var query = new AV.Query('_User');
  query.equalTo(COL_USERNAME, username);
   query.find().then(function (params) {
    if (params){
       response.success(JSON.stringify(params.toJSON()));
    }
  });
}

exports.login = function(request, response) {
  console.log("getUser request:" + JSON.stringify(request.params));
  var params = request.params;
  var username = params[COL_USERNAME];
  var password = params[COL_PASSWORD];
 if (!username || !password){
	 response.error('username or password null');
	 return ;
	 
 }
   var query = new AV.Query('_User');
  query.equalTo(COL_USERNAME, username);
  query.equalTo(COL_PASSWORD , password);
  query.find().then(function (params) {
    if (params){
       response.success('ok');
    }else{
       response.error('failed');
    }
  });
 
}