<?php
	header("content-type:text/html;charset:utf-8");
	$arr = array();
	for($i=1;$i<1000;$i++){
		array_push($arr, "第{$i}项...");
	}
	echo json_encode($arr);
?>