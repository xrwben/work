<?php
header("content-type:text/html;charset=utf-8");
//利用PHP代理
$url="http://api.k780.com:88/?app=weather.today&weaid=1&&appkey=10003&sign=b59bc3ef6191eb9f747dd4e83c99f2a4";
echo file_get_contents($url);




?>