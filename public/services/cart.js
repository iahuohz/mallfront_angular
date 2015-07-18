angular.module("cart")
    .factory("cartSvc", function (localStorageService) {
    	var cartData = localStorageService.get('cart');
    	if(cartData == null){
    		localStorageService.set('cart', []);
    	}
    	
        return {
            addItem: function (bookId, title, price) {
            	var cartData = localStorageService.get('cart');
            	
                var addedToExistingItem = false;
                for (var i = 0; i < cartData.length; i++) {
                    if (cartData[i].bookId == bookId) {
                        cartData[i].quantity++;
                        addedToExistingItem = true;
                        break;
                    }
                }
                if (!addedToExistingItem) {
                    cartData.push({
                        bookId: bookId,
                        price: price,
                        title: title,
                        quantity: 1
                    });
                }
                
                localStorageService.set('cart', cartData);
            },
            removeItem: function (bookId) {
            	var cartData = localStorageService.get('cart');
                for (var i = 0; i < cartData.length; i++) {
                    if (cartData[i].bookId == bookId) {
                        cartData.splice(i, 1);
                        break;
                    }
                }
                localStorageService.set('cart', cartData);
            },
            increaseItem: function(bookId){
            	var cartData = localStorageService.get('cart');
            	for (var i = 0; i < cartData.length; i++) {
                    if (cartData[i].bookId == bookId) {
                        cartData[i].quantity++;
                        break;
                    }
                }
            	localStorageService.set('cart', cartData);
            },
            decreaseItem: function(bookId){
            	var cartData = localStorageService.get('cart');
            	for (var i = 0; i < cartData.length; i++) {
                    if (cartData[i].bookId == bookId) {
                        cartData[i].quantity--;
                        if(cartData[i].quantity == 0){
                        	cartData.splice(i, 1);
                        }
                        break;
                    }
                }
            	localStorageService.set('cart', cartData);
            },
            getItems: function () {
                return localStorageService.get('cart');
            },
            clear : function(){
                localStorageService.set('cart', []);
            }
        }
    });