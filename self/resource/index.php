<?php
	$users = array('pine','wenhao','xiaoke','fanbingbing','huangxioaming');
	if(in_array($_POST['username'],$users)){
		echo '{"status":0,"info":"用户名已被注册"}';
	}else {
		echo '{"status":1,"info":"用户名可用"}';
	}
?>