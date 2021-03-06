/**
 * This function executes the login opertation
 */
function login_action(domain,username,pass,func)
{
	show_loader();
	logout_page = window.location.pathname;
	set_session_var('logout_page',logout_page);

	if(typeof domain=='undefined')
	{
		var form=document.getElementById('login');
		var l_id=form.elements[1].value;
		var index=l_id.indexOf("@");

		if(index===-1)
		{
			domain=l_id;
			username="master";
		}
		else
		{
			domain=l_id.substr(index+1);
			username=l_id.substr(0,index);
		}
		pass=form.elements[2].value;
	}

	//console.log(domain+username+pass);
	try_local_db_login(username,domain,function(result)
	{
		//console.log('trying local login');
		var password="p";
		if(result) { password=result.password;}
		var salt='$2a$10$'+domain+'1234567891234567891234';
		var salt_22=salt.substring(0, 29);
		//console.log(password);
		var bcrypt = new bCrypt();
		bcrypt.hashpw(pass, salt_22, function(newhash)
		{
			//console.log(newhash+"---"+password);
			if(newhash.substring(3)==password.substring(3))
			{
				//console.log('logged in offline');
				if(typeof func!='undefined')
				{
					set_session_variables(domain,username,pass,func);
				}
				else
				{
					set_session_variables(domain,username,pass);
				}
			}
			else
			{
				//console.log('logging online'+username+"-"+pass+"-"+domain);
				if(typeof func!='undefined')
				{
					login_online(username,domain,pass,func);
				}
				else
				{
					login_online(username,domain,pass);
				}
			}
		}, function() {});

	},function()
	{
		//console.log('trying online login');
		if(typeof func!='undefined')
		{
			login_online(username,domain,pass,func);
		}
		else
		{
			login_online(username,domain,pass);
		}
	});
}


function login_online(username,domain,pass,func)
{
	var user_kvp={domain:domain,user:username,pass:pass,os:navigator.platform};
	ajax_json(server_root+"/ajax/login.php",user_kvp,function(response_object)
	{
		//console.log(response_object);
		//console.log(response_object.status);

		if(response_object.status=="Failed Authentication")
		{
			//console.log('failed because of db problem');
			document.getElementById("failed_auth").innerHTML="Login failed, try again!";
			hide_loader();
		}
		else if(response_object.status=="Account Inactive")
		{
			document.getElementById("failed_auth").innerHTML="Invalid domain or account deactivated.";
			hide_loader();
		}
		else
		{
			var session_vars=response_object.data;
			ini_session(domain,username);

			//console.log(session_vars);
			set_session_online(function()
			{
				if(typeof func!='undefined')
				{
					set_session(session_vars,func);
				}
				else
				{
					set_session(session_vars);
				}
				//console.log(session_vars);
			});
		}
	});
}


/**
 * This function sets the session variables from offline after the login is successful
 * @param domain
 * @param username
 */
function set_session_variables(domain,username,pass,func)
{
	var db_name="re_local_"+domain;

	var request = indexedDB.open(db_name);
	request.onsuccess=function(e)
	{
		static_local_db=e.target.result;
		var report_string="-";
		var form_string="-";
		var data=new Object();

		static_local_db.transaction(['user_preferences'],"readonly").objectStore('user_preferences').openCursor().onsuccess=function(e)
		{
			var result=e.target.result;
			if(result)
			{
				var record=result.value;

				if(record['type']=='report')
				{
					if(record['value']=='checked')
						report_string+=record['name']+"-";
				}
				else if(record['type']=='form')
				{
					if(record['value']=='checked')
						form_string+=record['name']+"-";
				}
				else
				{
					data[record['name']]=record['value'];
				}
				result.continue();
			}
			else
			{
				data.reports=report_string;
				data.forms=form_string;
				data.session='yes';
				data.domain=domain;
				data.username=username;
				if(data.offline==='online')
				{
					if(typeof func!='undefined')
					{
						login_online(username,domain,pass,func);
					}
					else
					{
						login_online(username,domain,pass);
					}
				}
				else
				{
					var keyValue=IDBKeyRange.bound([username,'0'],[username,'99999999']);
					static_local_db.transaction(['accounts'],"readonly").objectStore('accounts').index('username').openCursor(keyValue).onsuccess=function(e)
					{
						var result2=e.target.result;
						if(result2)
						{
							data.acc_name=result2.value.acc_name;
							data.acc_type=result2.value.type;
						}

						var acc_table='staff';
						if(data.acc_type=='customer')
						{
							acc_table='customers';
						}
						else if(data.acc_type=='supplier')
						{
							acc_table='suppliers';
						}

						var keyV=IDBKeyRange.bound([data.acc_name,'0'],[data.acc_name,'99999999']);
						static_local_db.transaction([acc_table],"readonly").objectStore(acc_table).index('acc_name').openCursor(keyV).onsuccess=function(e)
						{
							var result21=e.target.result;
							if(result21)
							{
								data.name=result21.value.name;
								data.user_id=result21.value.id;
							}

							var re='';
							var cr='';
							var up='';
							var del='';
							var user_roles="";
							var access_control_count=1;

							static_local_db.transaction(['user_role_mapping'],"readonly").objectStore('user_role_mapping').index('username').openCursor(keyValue).onsuccess=function(e)
							{
								var result5=e.target.result;
								if(result5)
								{
									var record5=result5.value;
									access_control_count+=1;

									user_roles+=record5.role_name+"--";

									keyValue=IDBKeyRange.bound([record5.role_name,'0'],[record5.role_name,'99999999']);
									static_local_db.transaction(['access_control'],"readonly").objectStore('access_control').index('username').openCursor(keyValue).onsuccess=function(e)
									{
										var result3=e.target.result;
										if(result3)
										{
											var record3=result3.value;

											if(record3.re==='checked')
											{
												re+=record3.element_id+"-";
											}
											if(record3.cr==='checked')
											{
												cr+=record3.element_id+"-";
											}
											if(record3.up==='checked')
											{
												up+=record3.element_id+"-";
											}
											if(record3.del==='checked')
											{
												del+=record3.element_id+"-";
											}

											result3.continue();
										}
										else{
											access_control_count-=1;
										}
									};
									result5.continue();
								}
								else
								{
									keyValue=IDBKeyRange.bound([username,'0'],[username,'99999999']);
									static_local_db.transaction(['access_control'],"readonly").objectStore('access_control').index('username').openCursor(keyValue).onsuccess=function(e)
									{
										var result3=e.target.result;
										if(result3)
										{
											var record3=result3.value;

											if(record3.re==='checked')
											{
												re+=record3.element_id+"-";
											}
											if(record3.cr==='checked')
											{
												cr+=record3.element_id+"-";
											}
											if(record3.up==='checked')
											{
												up+=record3.element_id+"-";
											}
											if(record3.del==='checked')
											{
												del+=record3.element_id+"-";
											}

											result3.continue();
										}
										else
										{
                                           keyValue=IDBKeyRange.bound([data.acc_name,'0'],[username,'99999999']);
									       static_local_db.transaction(['attributes'],"readonly").objectStore('attributes').index('name').openCursor(keyValue).onsuccess=function(e)
									       {
                                               var result6=e.target.result;
                                               if(result6)
                                                {
                                                    var record=result6.value;
                                                    if(record.type=='staff')
                                                    {
                                                        data['user_setting_'+record.attribute]=record.value;
                                                    }
                                                    result6.continue();
                                                }
                                                else
                                                {
											         access_control_count-=1;
                                                }
                                           };
										}
									};
								}
							};

							var access_control_complete=setInterval(function()
							{
							   if(access_control_count===0)
							   {
							   		//console.log('access parameters set');
									clearInterval(access_control_complete);
									data.re=re;
									data.cr=cr;
									data.up=up;
									data.del=del;
									data.user_roles=user_roles;

									if(typeof func!='undefined')
									{
										set_session(data,func);
									}
									else
									{
										set_session(data);
									}
							 	}
							 },100);
						};
					};
				}
			}
		};
	};
};

/**
 * This function tries to check if local db exists and contains the right password
 * @param domain domain to look for the specific database
 * @param func_success function to be executed if the login is successful
 * @param func_failure fucntion to be executed if login fails
 */
function try_local_db_login(username,domain,func_success,func_failure)
{
	////////////checking if indexed db is supported/////////////////
	if("indexedDB" in window && indexedDB!=null)
	{
		//console.log("3.1");
		var db_name="re_local_" + domain;
		var request = indexedDB.open(db_name);
		//console.log("3.1.1");

		request.onsuccess=function(e)
		{
			//console.log("3.2");
			var db=e.target.result;
			if(!db.objectStoreNames.contains("accounts"))
			{
				//console.log("3.3");
				var deleterequest=indexedDB.deleteDatabase(db_name);
				deleterequest.onsuccess=function(ev)
				{
					//console.log("3.3.1");
					func_failure();
				};
			}
			else
			{
				//console.log("3.4");
				var tran=db.transaction("accounts","readonly");
				var table = tran.objectStore("accounts");

				var index=table.index("username");
				var kv=IDBKeyRange.bound([username,'0'],[username,'99999999']);
				var records=index.get(kv);

				records.onsuccess=function(e)
				{
					var result=records.result;
					func_success(result);
					//console.log("3.5");
				};
				records.onerror=function(e)
				{
					//console.log("3.6");
					func_failure();
				};
			}
			//console.log("3.7");
			db.close();
		};

		request.onerror = function(e)
		{
			//console.log("3.8");
			var db=e.target.result;
			if(db)
				db.close();
			func_failure();
		};

		request.onabort=function(e)
		{
			console.log("3.9");
		    var db=e.target.result;
			if(db)
		    	db.close();
		    console.log(this.error);
		    func_failure();
		};
	}
	else
	{
		//console.log("3.11");
		func_failure();
	}
};

/**
 * This fucntion validates that the passwords match during registration process
 */
function match_password()
{
	var form=document.getElementById('registeration');

	var pass1=form.elements[4].value;
	var pass2=form.elements[5].value;

	if(pass1==pass2 && pass1!="")
	{
		document.getElementById("password_match_validation").innerHTML="Match!!";
		document.getElementById("password_match_validation").value="correct";
	}
	else
	{
		document.getElementById("password_match_validation").innerHTML="Passwords do not match!";
		document.getElementById("password_match_validation").value="incorrect";
	}

}


/**
 * This function is run to set the preferences during registration process
 */
function register_click()
{
	var form=document.getElementById('registeration');

	var userid=form.elements[0].value;
	var email=form.elements[1].value;
	var name=form.elements[2].value;
	var phone=form.elements[3].value;
	var pass=form.elements[4].value;
	var repass=form.elements[5].value;
	var e0=form.elements[6];
	var userid_valid=document.getElementById("userid_validation").value;
	var emailid_valid=document.getElementById("emailid_validation").value;
	var pass_valid=document.getElementById("password_match_validation").value;

	if(userid_valid=="incorrect" || emailid_valid=="incorrect" || pass_valid=="incorrect")
	{
		document.getElementById("failed_register").innerHTML="Please update the incorrect fields to proceed!";
	}
	else
	{
		show_loader();
		var post_data={userid:userid,
						email:email,
						name:name,
						pass:pass,
						phone:phone};

		ajax_json(server_root+"/scripts/user_db_creation.php",{userid:userid},function(e2)
		{
			if(e2.status=="success")
			{
				ajax_json(server_root+"/ajax/register.php",post_data,function(response_object)
				{
					if(response_object.status=="success")
					{
						$("#r_register").slideUp();
						document.getElementById("r_complete").innerHTML="Registration complete, proceed to <a href='#home' onclick='display_login_box();'>login</a>";
					}
					else
					{
						document.getElementById("failed_register").innerHTML="An error occured, please try again.";
						console.log(response_object);
					}
					window.location.assign("#register");
					hide_loader();
				});
			}
			else
			{
				console.log(e2.responseText);
				document.getElementById("failed_register").innerHTML="An error occured, please try again.";
				window.location.assign("#register");
				hide_loader();
			}
		});
	}
}

/**
 * This function checks if the desired user id has already been taken
 */
function userid_validation(userid)
{
	if(userid!="")
	{
		var match=userid.match(/[a-z0-9]*/i);
		//console.log(match);
		if(match[0].length!=userid.length)
		{
			document.getElementById("userid_validation").innerHTML="The UserId is invalid, it can only contain alpha-numeric characters";
			document.getElementById("userid_validation").value="incorrect";
		}
		else
		{
			ajax_json(server_root+"/ajax/verify_id.php",{userid:userid},function(response_object)
			{
				if(response_object.status=="match")
				{
					document.getElementById("userid_validation").innerHTML="This ID already exists, choose a different ID.";
					document.getElementById("userid_validation").value="incorrect";
				}
				else
				{
					document.getElementById("userid_validation").innerHTML="User ID is available.";
					document.getElementById("userid_validation").value="correct";
				}
			});
		}
	}
}

/**
 * This function checks if the email id is already registered for an account
 */
function emailid_validation(emailid)
{
	if(emailid!="")
	{
		ajax_json(server_root+"/ajax/verify_id.php",{email:emailid},function(response_object)
		{
			if(response_object.status=="match")
			{
				document.getElementById("emailid_validation").innerHTML="This email ID is already registered, choose a different ID.";
				document.getElementById("emailid_validation").value="incorrect";
			}
			else
			{
				document.getElementById("emailid_validation").innerHTML="";
				document.getElementById("emailid_validation").value="correct";
			}
		});
	}
}



function verify_login(pass,func_success,func_failure)
{
	var domain=get_domain();
	var username=get_username();
	if(is_online())
	{
		var user_kvp={domain:domain,user:username,pass:pass,os:navigator.platform};
		ajax_json(server_root+"/ajax/login.php",user_kvp,function(response_object)
		{
			//console.log(response_object);
			//console.log(response_object.status);
			if(response_object.status=="Failed Authentication")
			{
				func_failure();
			}
			else
			{
				func_success();
			}
		});
	}
	else
	{
		////////////checking if indexed db is supported/////////////////
		if("indexedDB" in window)
		{
			//console.log("3.1");
			var db_name="re_local_" + domain;
			var request = indexedDB.open(db_name);

			request.onsuccess=function(e)
			{
				//console.log("3.2");
				var db=e.target.result;
				if(!db.objectStoreNames.contains("accounts"))
				{
					//console.log("3.3");
					var deleterequest=indexedDB.deleteDatabase(db_name);
					deleterequest.onsuccess=function(ev)
					{
						//console.log("3.3.1");
						func_failure();
					};
				}
				else
				{
					//console.log("3.4");
					var tran=db.transaction("accounts","readonly");
					var table = tran.objectStore("accounts");

					var index=table.index("username");
					var kv=IDBKeyRange.bound([username,'0'],[username,'99999999']);
					var records=index.get(kv);

					records.onsuccess=function(e)
					{
						var result=records.result;
						var password="p";
						if(result) { password=result.password;}
						var salt='$2a$10$'+domain+'1234567891234567891234';
						var salt_22=salt.substring(0, 29);

						var bcrypt = new bCrypt();
						bcrypt.hashpw(pass,salt_22,function(newhash)
						{
							if(newhash.substring(3)==password.substring(3))
							{
								func_success();
							}
							else
							{
								func_failure();
							}
						}, function() {});
						//console.log("3.5");
					};
					records.onerror=function(e)
					{
						//console.log("3.6");
						func_failure();
					};
				}
				//console.log("3.7");
				db.close();
			};

			request.onerror = function(e)
			{
				//console.log("3.8");
				var db=e.target.result;
				if(db)
					db.close();
				func_failure();
			};
		}
		else
		{
			//alert('you browser doesnt support offline mode. Please upgrade');
			func_failure();
		}
	}
}
