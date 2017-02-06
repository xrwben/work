<?php

header("content-type:text/html;charset=utf-8");
$arr = array(
	array("name"=>"AA","age"=>'20'),
	array("name"=>"BB","age"=>'21'),
	array("name"=>"CC","age"=>'22'),
	array("name"=>"DD","age"=>'23'),
	array("name"=>"EE","age"=>'24')
);
echo json_encode($arr);

?>