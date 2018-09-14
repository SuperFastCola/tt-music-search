import $ from 'jquery';
export const sendAjaxRequest = (url, token, callback, errorHandler) => {
	var ajaxobj = {};

	if(token != null){
		ajaxobj.setHeaderForAjax = function(xhr){
 			xhr.setRequestHeader("Authorization", "Bearer " + token );
 		}	
 		ajaxobj.setHeaderForAjax = ajaxobj.setHeaderForAjax.bind(this);
	}
	
 	ajaxobj.ajaxError = function(jqXHR, textStatus){
 		console.log(jqXHR);
 		console.log(textStatus);
 		var error = Object.assign({},jqXHR,textStatus);
		return error;
 	}

	ajaxobj.ajaxError = ajaxobj.ajaxError.bind(this);
	ajaxobj.request = $.ajax({
			url: url,
			method: "GET",
			dataType: "json",
			beforeSend: ajaxobj.setHeaderForAjax
		});
	ajaxobj.request.done(callback);
	
	if(typeof errorHandler != "undefined"){
		ajaxobj.request.fail(errorHandler);	
	}
	else{
		ajaxobj.request.fail(ajaxobj.ajaxError);
	}
	

	return ajaxobj;
};
