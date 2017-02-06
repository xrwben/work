function ajax(aJson){
	var method = aJson.method || 'get';
	var url = aJson.url;
	var data = aJson.data;
	var async = aJson.async || true ;
	var success = aJson.success;
	if(method == "get" && data){
		url += "?" + data + "&" + Math.random();
	}

	var xhr = null;
	if(window.XMLHttpRequest){
		xhr = new XMLHttpRequest();
	}else{
		xhr = new ActiveXObject("Microsoft.XMLHTTP");
	}

	xhr.open( method, url, async );
	xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");

	method=="get"?xhr.send():xhr.send(data);

	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4){
			if((xhr.status >= 200 && xhr.status <300) || xhr.status ==304 ){
				success && success(xhr.responseText);
			}else{
				alert("不好意思，出错啦！"+xhr.status);
			}
			
		}
	}
}