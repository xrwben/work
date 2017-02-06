<?php
header("content-type:text/html;charset=utf-8");
/*
	Array
(
    [user] => Jack
    [password] => 123
)
Array
(
    [files] => Array
        (
            [name] => logo_xrw.png
            [type] => image/png
            [tmp_name] => D:\wamp\tmp\php49CA.tmp
            [error] => 0
            [size] => 236481
        )
)
*/
	//print_r($_POST);
	//print_r($_FILES);
	
	if($_FILES["files"]["error"]>0){
		exit("附件有错误！");
	}
	//附件上传逻辑
	$path = "./upload/";
	$name = date("YmdHis")."-".mt_rand(1000,9999);
	$arr = explode(".",$_FILES["files"]["name"]);
	$ext = ".".$arr[count($arr)-1];
	
	$path_name = $path.$name.$ext;
	
	$file = move_uploaded_file($_FILES["files"]['tmp_name'],$path_name);
	if($file){
		echo "上传成功！";
	}else{
		echo "上传失败！";
	}
?>