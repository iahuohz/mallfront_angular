angular.module("user")
	.controller('userCtrl', function($scope, accountSvc){
		$scope.changePwdModel = {
			oldpassword : "",
			newpassword : "",
			confirmpassword : ""
		}
		$scope.changePwd = function(){
			accountSvc.changePwd($scope.changePwdModel.oldpassword, 
				$scope.changePwdModel.newpassword).then(
					function(response){
						if(response.status == 200){
							if(response.data.success){
								Messenger().post({
					           		message: '密码修改成功！',
					           		hideAfter: 3,
					           		hideOnNavigate: true,
					           		showCloseButton: true
								});
								$scope.changePwdModel.oldpassword = "";
								$scope.changePwdModel.newpassword = "";
								$scope.changePwdModel.confirmpassword = "";
							} else{
								$scope.changePwdError = "密码修改失败！";
							}
						}
					}
				);
		}
	});
