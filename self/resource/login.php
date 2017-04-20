<?php
	$users = array(
		'pine' => '123456',
		'wenhao' => 'wenhao',
		'xiaoke' => 'xiaoke',
		'fanbingbing' => 'fanbingbing',
		'huangxioaming' => 'huangxioaming'
	);
	$username = $_POST['username'];
	$userpsw = $_POST['password'];
	$result = array('status'=>0,'info'=>'用户名或者密码错误！');
	foreach ( $users as $i => $value){
		if($username == $i && $userpsw == $value){
			$result['status'] = 1;
			$result['info'] = '账号密码正确！';
			break;
		}
	}
	echo '{"status":'.$result['status'].',"info":"'.$result['info'].'"}';
?>