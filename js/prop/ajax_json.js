/**
 * json attributes for read queries
 * comapre: lowerbound,upperbound
 * array: yes
 * exact: yes
 * count: <integer>
 */

function ajax_external(url,data,func)
{
	$.ajax(
	{
		type: "POST",
		url: url,
		data: data,
		error:function(xhr, ajaxOptions, thrownError)
		{
			hide_loader();
			//console.log(data);
            console.log(xhr.responseText);
		},
		success: function(return_data,return_status,e)
		{
			var response_object={status:'error',rows:[],count:0};
			try
			{
			  response_object=JSON.parse(e.responseText);
			} catch (ee)
			{
			  console.log(data);
			  console.log(e.responseText);
			  hide_loader();
			  return;
			}

			if(!vUtil.isBlank(func))
			{
				func(response_object);
			}
		}
	});
}

/**
 * This function executes a custom function on ajax call
 * @param url - url of the php file to be called
 * @param kvp - parameters passed to php file as key value pairs string
 * @param func - function to be executed on successful result from server
 */
function ajax_json(url,kvp,func)
{
	if(typeof number_active_ajax=='undefined')
	{
		number_active_ajax=1;
	}
	else
	{
		number_active_ajax+=1;
	}

	$.ajax(
	{
		type: "POST",
		url: url,
		data: kvp,
		error:function(xhr, ajaxOptions, thrownError)
		{
			number_active_ajax-=1;
			hide_loader();
			console.log(kvp);
            console.log(xhr.responseText);
		},
		success: function(return_data,return_status,e)
		{
			var response_object={status:'error',rows:[],count:0};
			try
			{
			  response_object=JSON.parse(e.responseText);
			} catch (ee)
			{
			  console.log(kvp);
			  console.log(e.responseText);
			  hide_loader();
			  return;
			}

			if(response_object.status=="Invalid session")
			{
				number_active_ajax-=1;
				hide_loader();
				var user=get_username();
				var domain=get_domain();

				vIni.lockScreen(function()
				{
					show_loader();
					var pass=document.getElementById("lock_form").elements['password'].value;

					var user_kvp={domain:domain,user:user,pass:pass,os:navigator.platform,browser:navigator.userAgent};
					ajax_json(server_root+"/ajax/login.php",user_kvp,function(response_object)
					{
						if(response_object.status=="Failed Authentication")
						{
							alert("Password is incorrect. Aborting operation.");
							delete_session();
							hide_loader();
						}
						else if(response_object.status=="Account Inactive")
						{
							alert("This account has been deactivated.");
							delete_session();
							hide_loader();
						}
						else
						{
							var session_vars=response_object.data;

							var offline=get_session_var('offline');
							for(var field in session_vars)
							{
								localStorage.setItem(field,session_vars[field]);
							}
							set_session_var('offline',offline);

							kvp.re_old=kvp.re;
							kvp.cr_old=kvp.cr;
							kvp.del_old=kvp.del;
							kvp.up_old=kvp.up;
							kvp.cr=session_vars['cr'];
							kvp.up=session_vars['up'];
							kvp.del=session_vars['del'];
							kvp.re=session_vars['re'];

							hide_loader();
							ajax_json(url,kvp,func);
						}
					});
				});
			}
			else
			{
				//console.log('here');
				number_active_ajax-=1;
				func(response_object);
			}
		}
	});
};

function server_read_json_rows(columns,callback,results)
{
	if(vUtil.isBlank(columns.start_index))
	{
		columns.start_index=0;
	}

	var data = vUtil.getCredentials();
	data['data']=JSON.stringify(columns);

	ajax_json(server_root+"/controller/read_rows",data,function(response_object)
	{
		results=results.concat(response_object.rows);

		if(typeof columns.count=='undefined' && response_object.count>=global_server_read_batch_size)
		{
			columns.start_index=columns.start_index+response_object.count;
			server_read_json_rows(columns,callback,results);
		}
		else
		{
			callback(results);
		}

	});
}

function server_read_json_column(columns,callback,results)
{
	var data = vUtil.getCredentials();
	data['data']=JSON.stringify(columns);

	ajax_json(server_root+"/controller/read_column",data,function(response_object)
	{
		results=response_object.rows;
		callback(results);
	});
}

function server_read_json_count(columns,callback)
{
	var data = vUtil.getCredentials();
	data['data']=JSON.stringify(columns);

	ajax_json(server_root+"/controller/get_count",data,function(response_object)
	{
		callback(response_object.count);
	});
}


function server_generate_report_json(report_id,callback)
{
	show_loader();
	var domain=get_domain();
	var username=get_username();
	var re_access=get_session_var('re');
	ajax_json(server_root+"/ajax_json/generate_report.php",{domain:domain,username:username,re:re_access,report_id:report_id},function(response_object)
	{
		//console.log(response_object);
		//console.log(response_object.rows);
		var results=response_object.rows;
		callback(results);
		hide_loader();
	});
}


function server_send_email(columns,func)
{
	var data = vUtil.getCredentials();
	data['data']=columns;
	ajax_json(server_root+"/ajax/email.php",data,function(response_object)
	{
		console.log(response_object);
		func();
	});
}

/**
 * this function delete a row of data from the server database
 */
function server_delete_json(columns,callback)
{
	show_loader();
	var data = vUtil.getCredentials();
	data['data']=JSON.stringify(columns);

	ajax_json(server_root+"/controller/delete",data,function(response_object)
	{
		console.log(response_object.status);
		hide_loader();
		if(typeof callback!="undefined")
		{
			callback();
		}
	});
}

function server_delete_logs(data_json,func)
{
	show_loader();
	var domain=get_domain();
	var username=get_username();
	var del_access=get_session_var('del');
	var string_columns=JSON.stringify(data_json);

	ajax_json(server_root+"/ajax_json/delete_logs.php",{domain:domain,username:username,del:del_access,data:string_columns},function(response_object)
	{
		console.log(response_object.status);
		hide_loader();
		if(typeof func!="undefined")
		{
			func();
		}
	});
}

function server_delete_logs(data_json,func)
{
	show_loader();
	var data = vUtil.getCredentials();
	data['data']=JSON.stringify(data_json);

	ajax_json(server_root+"/controller/deleteLog",data,function(response_object)
	{
		console.log(response_object.status);
		hide_loader();
		if(typeof func!="undefined")
		{
			func();
		}
	});
}

function server_get_logs(data_json,func)
{
	show_loader();
	var data = vUtil.getCredentials();
	data['data']=JSON.stringify(data_json);

	ajax_json(server_root+"/controller/getLog",data,function(response_object)
	{
		console.log(response_object);
		hide_loader();
		if(typeof func!="undefined" && response_object.status=='success')
		{
			func(response_object.data);
		}
	});
}

function server_create_json(data_json,func)
{
	show_loader();
	var data = vUtil.getCredentials();
	data['data']=JSON.stringify(data_json);

	ajax_json(server_root+"/controller/create",data,function(response_object)
	{
		console.log(response_object.status);
		hide_loader();
		if(response_object.description=='duplicate record')
		{
			if(typeof response_object.warning=='undefined' || response_object.warning!="no")
			{
				$("#modal5_link").click();
			}
		}
		else
		{
			if(typeof func!="undefined")
			{
				func();
			}
		}
	});
}

function server_create_batch_json(data_json,func)
{
	if(typeof data_json.loader!='undefined' && data_json.loader=='no')
	{}else
	{show_loader();}

	var domain=get_domain();
	var username=get_username();
	var cr_access=get_session_var('cr');

	var data_arrays = [];
	var array_size = 500;

	while (data_json.data.length > 0)
	{
		var new_size=Math.max(array_size,data_json.data.length);

		var new_data_object=new Object();
		for(var i in data_json)
		{
			new_data_object[i]=data_json[i];
		}
		new_data_object.data=data_json.data.splice(0, new_size);
    	data_arrays.push(new_data_object);
    };

    data_arrays.forEach(function(data_chunk)
	{
		var string_columns=JSON.stringify(data_chunk);
		ajax_json(server_root+"/ajax_json/create_batch.php",{domain:domain,username:username,cr:cr_access,data:string_columns},function(response_object)
		{
			console.log(response_object);
		});
	});

	var server_create_complete=setInterval(function()
	{
		if(number_active_ajax===0)
		{
			clearInterval(server_create_complete);
			if(typeof data_json.loader!='undefined' && data_json.loader=='no')
			{}else{hide_loader();}

			if(typeof func!="undefined")
			{
				func();
			}
		}
	},1000);
}

function server_update_json(data_json,callback)
{
	if(!(typeof data_json.loader!='undefined' && data_json.loader=='no'))
	{
		show_loader();
	}
	var data = vUtil.getCredentials();
	data['data']=JSON.stringify(data_json);

	ajax_json(server_root+"/controller/update",data,function(response_object)
	{
		console.log(response_object.status);
		if(!(typeof data_json.loader!='undefined' && data_json.loader=='no'))
		{
			hide_loader();
		}
		if(typeof func!="undefined")
		{
			callback();
		}
	});
}

function server_update_batch_json(data_json,func)
{
	if(typeof data_json.loader!='undefined' && data_json.loader=='no')
	{}else
	{show_loader();}

	var data_arrays = [];
	var array_size = 500;

	while (data_json.data.length > 0)
	{
		var new_size=Math.max(array_size,data_json.data.length);

		var new_data_object=new Object();
		for(var i in data_json)
		{
			new_data_object[i]=data_json[i];
		}
		new_data_object.data=data_json.data.splice(0, new_size);
    	data_arrays.push(new_data_object);
    };

	data_arrays.forEach(function(data_chunk)
	{
		var string_columns=JSON.stringify(data_chunk);
		var ajax_data = vUtil.getCredentials();
		ajax_data.data = string_columns;
		ajax_json(server_root+"/ajax_json/update_batch.php",ajax_data,function(response_object)
		{
			console.log(response_object);
		});
	});

	var server_update_complete=setInterval(function()
	{
		if(number_active_ajax===0)
		{
			clearInterval(server_update_complete);
			if(typeof data_json.loader!='undefined' && data_json.loader=='no')
			{}else{hide_loader();}

			if(typeof func!="undefined")
			{
				func();
			}
		}
	},1000);
}

function get_table_structure(tablename,func)
{
	show_loader();
	var domain=get_domain();
	var username=get_username();
	var re_access=get_session_var('re');
	ajax_json(server_root+"/ajax_json/get_table_structure.php",{domain:domain,username:username,re:re_access,table:tablename},function(response_object)
	{
		//console.log(response_object);
		hide_loader();
		func(response_object.data);
	});
}

function delete_server_table(tablename,master)
{
	show_loader();
	var domain=get_domain();
	var username=get_username();
	var del_access=get_session_var('del');
	var up_access=get_session_var('up');
	var cr_access=get_session_var('cr');
	var url=server_root+"/ajax_json/set_table_structure.php";
	if(typeof master!='undefined' && master=='master')
	{
		url=server_root+"/ajax_json/set_table_structure_master.php";
	}
	ajax_json(url,{domain:domain,username:username,cr:cr_access,up:up_access,del:del_access,table:tablename,action:'delete_table'},function(response_object)
	{
		console.log(response_object.status);
		hide_loader();
	});
}

function delete_server_table_column(tablename,columnname,master)
{
	show_loader();
	var domain=get_domain();
	var username=get_username();
	var del_access=get_session_var('del');
	var up_access=get_session_var('up');
	var cr_access=get_session_var('cr');
	var url=server_root+"/ajax_json/set_table_structure.php";
	if(typeof master!='undefined' && master=='master')
	{
		url=server_root+"/ajax_json/set_table_structure_master.php";
	}
	ajax_json(url,{domain:domain,username:username,cr:cr_access,up:up_access,del:del_access,table:tablename,column:columnname,action:'delete_column'},function(response_object)
	{
		console.log(response_object.status);
		hide_loader();
	});
}

function create_server_table(tablename,master)
{
	show_loader();
	var domain=get_domain();
	var username=get_username();
	var del_access=get_session_var('del');
	var up_access=get_session_var('up');
	var cr_access=get_session_var('cr');
	var url=server_root+"/ajax_json/set_table_structure.php";
	if(typeof master!='undefined' && master=='master')
	{
		url=server_root+"/ajax_json/set_table_structure_master.php";
	}
	ajax_json(url,{domain:domain,username:username,cr:cr_access,up:up_access,del:del_access,table:tablename,action:'create_table'},function(response_object)
	{
		console.log(response_object.status);
		hide_loader();
	});
}

function create_server_table_column(tablename,columnname,columntype,master)
{
	show_loader();
	var domain=get_domain();
	var username=get_username();
	var del_access=get_session_var('del');
	var up_access=get_session_var('up');
	var cr_access=get_session_var('cr');
	var url=server_root+"/ajax_json/set_table_structure.php";
	if(typeof master!='undefined' && master=='master')
	{
		url=server_root+"/ajax_json/set_table_structure_master.php";
	}
	ajax_json(url,{domain:domain,username:username,cr:cr_access,up:up_access,del:del_access,table:tablename,column:columnname,type:columntype,action:'create_column'},function(response_object)
	{
		console.log(response_object.status);
		hide_loader();
	});
}

function update_server_table_column(tablename,columnname,columntype,master)
{
	show_loader();
	var domain=get_domain();
	var username=get_username();
	var del_access=get_session_var('del');
	var up_access=get_session_var('up');
	var cr_access=get_session_var('cr');
	var url=server_root+"/ajax_json/set_table_structure.php";
	if(typeof master!='undefined' && master=='master')
	{
		url=server_root+"/ajax_json/set_table_structure_master.php";
	}
	ajax_json(url,{domain:domain,username:username,cr:cr_access,up:up_access,del:del_access,table:tablename,column:columnname,type:columntype,action:'update_column'},function(response_object)
	{
		console.log(response_object.status);
		hide_loader();
	});
}

function s3_object(data_json,func)
{
	show_loader();

	var data = vUtil.getCredentials();
	data['data']=JSON.stringify(data_json);

	ajax_json(server_root+"/controller/s3",data,function(response_object)
	{
		hide_loader();
		if(typeof func!='undefined')
        {
            func();
        }
	});
}

function server_cron_request(columns,callback)
{
	show_loader();
	var data = vUtil.getCredentials();
	data['data']=JSON.stringify(columns);

	ajax_json(server_root+"/controller/cron",data,function(response_object)
	{
		hide_loader();
		console.log(response_object);
		if(response_object.status=='success')
		{
			callback(response_object);
		}
		else
		{
			$("#modal74_link").click();
		}
	});
}
