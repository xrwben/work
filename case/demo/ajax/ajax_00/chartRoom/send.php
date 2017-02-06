<?php
	//收集发送的信息 并放入数据库
	//print_r($_POST);

	$link = mysqli_connect("localhost","root","");
	mysqli_set_charset($link,"utf-8");
	mysqli_select_db($link,"php");
	
	if(!empty($_POST)){
		$color = $_POST["color"];
		$biaoqing = $_POST["biaoqing"];
		$receiver = $_POST["receiver"];
		$msg = $_POST["msg"];
	}
	$sql = "insert into chartMessage values('null','$msg','admin','$receiver','$color','$biaoqing',now())";
	$result = mysqli_query($link, $sql);

	if($result){
		echo "发表成功！";
	}else{
		echo "发送失败！";	
	}
?>