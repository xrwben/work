<?php
header("content-type:text/html;charset=utf-8");
/*
	create table chartMessage(
		id int primary key auto_increment,
		msg varchar(200),
		sender varchar(20),
		receiver varchar(20),
		color varchar(20),
		biaoqing varchar(20),
		add_time datetime
	);
	insert into chartMessage values("null","我可以问你个问题吗？","张三","李四","#00BBFF","含情脉脉",now());
	insert into chartMessage values("null","爱过","李四","张三","#0000ff","深情款款",now());
	insert into chartMessage values("null","萨瓦迪卡！","王五","赵六","#ff0033","深情款款",now());
	insert into chartMessage values("null","萨瓦迪卡！","赵六","王五","#ff0033","深情款款",now());
*/

$link = mysqli_connect("localhost","root","");
mysqli_set_charset($link,"utf-8");
mysqli_select_db($link,"php");

$max_id = $_GET["maxId"];

$sql = "select * from chartmessage where id > {$max_id}";
$result = mysqli_query($link, $sql);

$info = array();
while($res = mysqli_fetch_assoc($result)){
	//print_r($res);
	//echo "<hr>";
	$info[] = $res;
}
echo json_encode($info);	








?>