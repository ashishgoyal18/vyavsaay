<?php

namespace RetailingEssentials;
include_once "../Classes/db.php";
include_once '../Classes/file_reader.php';

use RetailingEssentials\db_connect;
use \PDO;

class send_sms
{
	public $username=null;
	public $password=null;
	public $sender_id=null;
	public $url=null;
		
	public function __construct()
	{
		$root_folder="../../";
		if(isset($_SERVER['DOCUMENT_ROOT']) && $_SERVER['DOCUMENT_ROOT']!="")
		{
			$root_folder=$_SERVER['DOCUMENT_ROOT']."/";
		}
		$fr=new file_reader($root_folder."../Config/config.prop");		

        $this->pusername=urlencode($fr->attributes["smsPromotionalUsername"]);
		$this->ppassword=urlencode($fr->attributes["smsPromotionalPassword"]);
		$this->tusername=urlencode($fr->attributes["smsTransactionalUsername"]);
		$this->tpassword=urlencode($fr->attributes["smsTransactionalPassword"]);
		$this->sender_id=urlencode($fr->attributes["smsDefaultSenderId"]);
		$this->url='http://sms99.co.in/pushsms.php';
	}

	public function sender_id($sender_id)
	{
		$this->sender_id=urlencode($sender_id);
	}

	//send sms
	public function direct_send($message,$to,$type)
	{
		$message=urlencode($message);
		$fields_string='password='.$this->ppassword.'&username='.$this->pusername.'&sender='.$this->sender_id.'&message='.$message.'&numbers='.$to;
		if($type=='transaction')
		{
			$fields_string='password='.$this->tpassword.'&username='.$this->tusername.'&sender='.$this->sender_id.'&message='.$message.'&numbers='.$to;
		}
		$get_url=$this->url."?".$fields_string;

		$ch=curl_init();	
		curl_setopt($ch,CURLOPT_URL, $get_url);
		curl_setopt($ch,CURLOPT_RETURNTRANSFER,true);
		$result = curl_exec($ch);
		curl_close($ch);
		//echo $result;
	}

	///send all pending sms stored in the db
	public function send_stored_sms($domain)
	{
		$conn1=new db_connect('re_user_'.$domain);
		
		$select_query="select * from sms where status=?";
		$select_stmt=$conn1->conn->prepare($select_query);
		$update_query="update sms set status=? where id=?;";
		$update_stmt=$conn1->conn->prepare($update_query);
		
		$select_stmt->execute(array('pending'));
		$result=$select_stmt->fetchAll(PDO::FETCH_ASSOC);
		
		for($i=0;$i<count($result);$i++)
		{
			$this->direct_send($result[$i]['message'],$result[$i]['receiver'],$result[$i]['type']);			
			$update_stmt->execute(array('sent',$result[$i]['id']));
		}
	}

	public function store_pending_sms($domain,$message,$to,$type)
	{
		$conn=new db_connect('re_user_'.$domain);
		
		$create_query="insert into sms (receiver,message,status,billing_status,type,last_updated) values(?,?,?,?,?,?)";		
		$create_stmt=$conn->conn->prepare($create_query);
		$create_stmt->execute(array($to,$message,'pending','pending',$type,1000*time()));		
	}

	public function log_sms($domain,$message,$to,$type)
	{
		$conn=new db_connect('re_user_'.$domain);
		
		$create_query="insert into sms (receiver,message,status,billing_status,type,last_updated) values(?,?,?,?,?,?)";		
		$create_stmt=$conn->conn->prepare($create_query);
		$create_stmt->execute(array($to,$message,'sent','pending',$type,1000*time()));		
	}

	public function send_all_stored_sms()
	{
		$conn=new db_connect(0);
		$select_query="select username from user_profile where status=?";
		$select_stmt=$conn->conn->prepare($select_query);
		
		$select_stmt->execute(array('active'));
		$result=$select_stmt->fetchAll(PDO::FETCH_ASSOC);
		
		for($i=0;$i<count($result);$i++)
		{
			$this->send_stored_sms($result[$i]['username']);
		}
	}
}

?>