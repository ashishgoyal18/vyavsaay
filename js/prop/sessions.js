/**
 * this function initiates the session by using local storage
 * @param username
 */
function ini_session(domain,user)
{
	localStorage.setItem('domain',domain);
	localStorage.setItem('session','yes');
	localStorage.setItem('username',user);
}

/**
 *
 * @param username
 * @param session_data
 */
function set_session(session_data,func)
{
	for(var field in session_data)
	{
		localStorage.setItem(field,session_data[field]);
	}

	if(typeof func=='undefined')
	{
		var domain=get_session_var('domain');
		var version=get_session_var('code_version');
		version = (version==null || version == "" || version =="undefined")? "1" : version;
		window.location.assign(server_root+"/main.php?dn="+domain+"&cv="+version);
		// window.location.assign(server_root+"/main.php?dn="+domain);
	}
	else
	{
		func();
	}
}

/**
 *
 */
function set_session_var(name,value)
{
	localStorage.setItem(name,value);
}

function delete_session_var(name)
{
	localStorage.removeItem(name);
}
/**
 *
 * @returns {Boolean}
 */
function is_online()
{
	var offline=localStorage.getItem('offline');
	if(offline=="online")
		return true;
	else
		return false;
}


/**
 *
 * @param ses_var
 * @returns
 */
function get_session_var(ses_var)
{
	var value=localStorage.getItem(ses_var);
	return value;
}

/**
 * this function returns the domain for the current session
 * @returns
 */
function get_domain()
{
	var domain=localStorage.getItem('domain');
	return domain;
}


/**
 * this function returns the username for the current session
 * @returns
 */
function get_username()
{
	var username=localStorage.getItem('username');
	return username;
}

/**
 * this function returns the acc_name for the current session
 * @returns
 */
function get_account_name()
{
	var acc_name=localStorage.getItem('acc_name');
	return acc_name;
}


/**
 * this function returns the name for the current session
 * @returns
 */
function get_name()
{
	var name=localStorage.getItem('name');
	return name;
}


/**
 *
 * @returns {Boolean}
 */
function is_set_session()
{
	var sess=localStorage.getItem('session');
	if(sess=='yes')
		return true;
	else
		return false;
}

/**
 *
 * @returns {String}
 */
function get_theme()
{
	var theme=localStorage.getItem('theme');
	if(theme==null)
	{
		theme="theme1";
	}
	var css="./CSS/"+theme+".css";
	return css;
}


function get_credit_period()
{
	var period=localStorage.getItem('credit_period');
	if(period==null || period=='')
	{
		period=0;
	}
	var p_time=get_my_time()+(parseFloat(period)*86400000);
	return p_time;
}

function get_payment_mode()
{
	var mode=localStorage.getItem('mode_of_payment');
	if(mode==null || mode=='undefined')
	{
		mode="";
	}
	return mode;
}


function get_debit_period()
{
	var period=localStorage.getItem('debit_period');
	if(period==null || period=='')
	{
		period=0;
	}
	var p_time=get_my_time()+(parseFloat(period)*86400000);
	return p_time;
}

function get_task_due_period()
{
	var period=localStorage.getItem('task_due_period');
	if(period==null || period=='')
	{
		period=0;
	}
	var p_time=get_my_time()+(parseFloat(period)*3600000);
	return p_time;
}

function get_task_due_time(raw_time)
{
	var period=localStorage.getItem('task_due_period');
	if(period==null || period=='')
	{
		period=0;
	}
	var p_time=raw_time+(parseFloat(period)*3600000);
	return p_time;
}

function get_worker_delay()
{
	var period=parseFloat(localStorage.getItem('worker_delay'));
	if(period==null || period=='' || period=='NaN')
	{
		period=600;
	}
	var p_time=period*1000;
	return p_time;
}

function get_worker_repeat()
{
	var period=parseFloat(localStorage.getItem('worker_repeat'));
	if(period==null || period=='' || period=='NaN')
	{
		period=3600;
	}
	var p_time=period*1000;
	return p_time;
}

/**
 *
 */
function delete_session()
{
	localStorage.removeItem('session');
	localStorage.removeItem('domain');
	localStorage.removeItem('username');
	localStorage.removeItem('logout_page');
	localStorage.clear();
	// console.log(logout_page);
	if(is_online())
	{
		window.location.assign(server_root+"/logout.php?p="+logout_page);
	}
	else
	{
		window.location.assign(server_root+logout_page);
	}
}

function get_pamphlet_template()
{
	var template=localStorage.getItem('pamphlet');
	return template;
}


/**
 * This function sets the session variable to online and write it to db
 * @returns
 */
function set_session_online(func)
{
	//console.log('5.1');
	if("indexedDB" in window && indexedDB!=null)
	{
		//console.log('5.2');
		var db_name="re_local_"+get_domain();
		var request = indexedDB.open(db_name);
		request.onsuccess=function(e)
		{
			//console.log('5.3');
			static_local_db=e.target.result;
			if(static_local_db.objectStoreNames.contains("user_preferences"))
			{
				//console.log('5.4');
				var transaction=static_local_db.transaction(['user_preferences'],"readwrite");
				var objectStore=transaction.objectStore('user_preferences');
				var kv=IDBKeyRange.bound(['offline','0'],['offline','99999999']);
				var req=objectStore.index('name').get(kv);
				req.onsuccess=function(e)
				{
					//console.log('5.5');
					var data=req.result;
					if(data)
					{
						//console.log('5.6');
						data.value='online';
						var put_req=objectStore.put(data);
						put_req.onsuccess=function(e)
						{
							//console.log('5.7');
							set_session_var('offline','online');
							vIni.hideMenu();
							func();
						};
						put_req.onerror=function(e)
						{
							//console.log('5.7.1');
							set_session_var('offline','online');
							vIni.hideMenu();
							func();
						};
					}
					else
					{
						//console.log('5.6.1');
						set_session_var('offline','online');
						vIni.hideMenu();
						func();
					}
				};
			}
			else
			{
//				console.log('5.8');
				set_session_var('offline','online');
				func();
			}
		};
		request.onerror=function(e)
		{
	//		console.log('5.9');
		    var db=e.target.result;
		    if(db)
		    {	db.close();}
			console.log(this.error);
			func();
		};
		request.onabort=function(e)
		{
		//	console.log('5.10');
		    var db=e.target.result;
		    if(db)
		    {	db.close();}
			db.close();
		    console.log(this.error);
		    func();
		};
	}
	else
	{
		//console.log('5.11');
		set_session_var('offline','online');
		vIni.hideMenu();
		func();
	}
};

/**
 * This function sets the session variable to offline and write it to db
 * @returns
 */
function set_session_offline()
{
	if(typeof static_local_db=='undefined')
	{
		//console.log('static_local_db_undefined');
		open_local_db(function()
		{
			set_session_offline();
		});
	}
	else
	{
		//console.log('static_local_db_set');

		var objectStore=static_local_db.transaction(['user_preferences'],"readwrite").objectStore('user_preferences');
		var kv=IDBKeyRange.bound(['offline','0'],['offline','99999999']);
		var req=objectStore.index('name').get(kv);
		req.onsuccess=function(e)
		{
			//console.log('got offline record');
			var data=req.result;
			//console.log(req);
			if(data)
			{
				//console.log(data);
				data.value='offline';
				var put_req=objectStore.put(data);
				put_req.onsuccess=function(e)
				{
					//console.log('put offline record');

					set_session_var('offline','offline');
					vIni.hideMenu();
					hide_loader();
				};
			}
		};
		req.onerror=function(e)
		{
			console.log(this.error);
		};
	}
};

function clear_appcache()
{
	var appCache = window.applicationCache;

	appCache.update();

	if (appCache.status == window.applicationCache.UPDATEREADY)
	{
  		appCache.swapCache(); //replaces the old cache with the new one.
	}
	window.location.reload();
}
