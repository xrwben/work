<?php
header('Content-type:text/html; charset="utf-8"'); //头文件设置编码格式
	$present = $_GET['present']; //$_GET是内置对象获取接受的内容
	$len = $_GET['len'];
	$liContent = array();  //定义一个数组
	for ($i=0; $i < $len; $i++) {  
		array_push($liContent, "內容".($present + $i + 1)); //向数组末尾添加一个或多个数据 返回新的长度 "."为拼接符
	}
	$arr = array('data'=>$liContent); // =>在php中表示“.”   data.
	echo json_encode($arr); // 把数组转化为json
?>