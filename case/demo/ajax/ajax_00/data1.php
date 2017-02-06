<?php
	header("content-type:text/html;charset=utf-8");
	$arr = array(
		array("name"=>"黎奔","age"=>18),
		array("name"=>"科比","age"=>19),
		array("name"=>"詹姆斯","age"=>20),
		array("name"=>"库里","age"=>21),
		array("name"=>"奥尼尔","age"=>22),
		array("name"=>"黎奔","age"=>18),
		array("name"=>"科比","age"=>19),
		array("name"=>"詹姆斯","age"=>20),
		array("name"=>"库里","age"=>21),
		array("name"=>"奥尼尔","age"=>22),
		array("name"=>"黎奔","age"=>18),
		array("name"=>"科比","age"=>19),
		array("name"=>"詹姆斯","age"=>20),
		array("name"=>"库里","age"=>21),
		array("name"=>"奥尼尔","age"=>22),

	);
	//var_dump($arr);
	echo json_encode($arr);
?>