<?php

/**
* db=domainName
* all=yes
**/
	session_start();

	include_once "../Classes/db.php";
	include_once '../Classes/config.php';
	require_once '../Classes/vUtil.php';
	use RetailingEssentials\vUtil;
	use RetailingEssentials\config;
	use RetailingEssentials\db_connect;
	use \DOMDocument;
	use \PDO;


	function grid_metrics_js($dbname,$table_name)
	{
		$conn=new db_connect($dbname);

		$js_file=file_get_contents("../db/grid_metrics.js");
		$grids_array = explode('/***function limiter***/',$js_file);

		foreach($grids_array as $i => $grid_string)
	    {
	    	$grid_string=str_replace("\n","",$grid_string);
	    	$grid_string=str_replace("\t","",$grid_string);
	    	$grid_string=str_replace("/*","",$grid_string);
	    	$grid_string=str_replace("*/","",$grid_string);
	    	$grid_object_array=explode('*@*',$grid_string);

			$data_array=Array();
			$q_string="insert into ".$table_name."(";

			foreach ($grid_object_array as $x => $col_value)
    		{
    			$col_array=explode('*:*',$col_value);
				$q_string.=$col_array[0].",";
				$data_array[]=$col_array[1];
			}

			$q_string=rtrim($q_string,",");
			$q_string.=") values(";
			foreach ($grid_object_array as $x => $col_value)
    		{
					$q_string.="?,";
			}
			$q_string=rtrim($q_string,",");
			$q_string.=");";

			try{
				$stmt=$conn->conn->prepare($q_string);
				$stmt->execute($data_array);
				echo "added grid metric<br>";
			}catch(PDOException $ex)
			{
				echo "Could not setup table $table_name: " .$ex->getMessage() ."</br>";
			}

		}
	}

	function grid_metrics_all()
	{
		$config = config::getInstance();
		$dbhost = $config->get('host');
		$dbuser = $config->get('user');
		$dbpass = $config->get('password');

		$info_conn=new db_connect('information_schema');
		$get_query="select distinct table_schema from information_schema.columns where table_schema like ?";
		$get_stmt=$info_conn->conn->prepare($get_query);
		$get_stmt->execute(array('%re_user%'));
		$get_res=$get_stmt->fetchAll(PDO::FETCH_ASSOC);

		for($i=0;$i<count($get_res);$i++)
		{
			$dbname=$get_res[$i]['table_schema'];
			grid_metrics_js($dbname,'system_grid_metrics');
		}
	}

	if(vUtil::isMasterSession())
	{
		if(isset($_GET['db']))
		{
			$db_name="re_user_".$_GET['db'];
			grid_metrics_js($db_name,'system_grid_metrics');
		}
		else if(isset($_GET['all']))
		{
			grid_metrics_all();
		}
	}
	else{
		echo "You don't have permissions to perform this operation";
	}
?>
