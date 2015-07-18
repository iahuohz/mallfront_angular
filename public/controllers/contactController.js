angular.module('user')
	.controller("contactCtrl", function($scope, contactSvc) {
		contactSvc.listContacts().then(function(data) {
			$scope.contacts = data;
		});

		$scope.newContact = {
			name: "",
			address: "",
			postalcode: "",
			phone: ""
		};

		$scope.addContact = function(valid) {
			if (valid) {
				contactSvc.createContact($scope.newContact).then(function(result) {
					contactSvc.listContacts().then(function(data) {
						$scope.contacts = data;
					});
					Messenger().post({
						message: '添加成功！',
						hideAfter: 3,
						hideOnNavigate: true,
						showCloseButton: true
					});
				});
				$scope.newContact.name = "";
				$scope.newContact.address = "";
				$scope.newContact.postalcode = "";
				$scope.newContact.phone = "";
				$('#addContactDiv').modal('hide');
			}
		};

		$scope.deleteContact = function(contact) {
			var msg = Messenger().post({
				message: '确定删除联系人【' + contact.name + '】吗?',
				id: "deleteConfirm", // 设置id将使得该确认框一次只能显示一个
				showCloseButton: true,
				actions: {
					confirm: {
						label: '确定',
						action: function() {
							contactSvc.deleteContact(contact).then(function(response) {
								$scope.contacts.splice($scope.contacts.indexOf(contact), 1);
								Messenger().post({
									message: '删除成功！',
									hideAfter: 3,
									hideOnNavigate: true,
									showCloseButton: true
								});
							});
							$scope.$digest();
							return msg.hide();
						}
					},
					cancel: {
						label: '取消',
						action: function() {
							return msg.cancel();
						}
					}
				}
			});
		}
		
		$scope.beginEdit = function(contact){
			$scope.editContact = contact;
		}
	});