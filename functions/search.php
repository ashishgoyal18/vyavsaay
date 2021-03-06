<div id='search_results_box' style='display:none;'>
	<h3 class="page-title">Search Results</h3>
	<div class="row">
		<div class="col-md-12">
			<div class="tabbable-line tabbable-full-width">
				<ul class="nav nav-tabs">

<?php

	include_once "./Classes/db.php";
	use RetailingEssentials\db_connect;

	$domain="";

	if(isset($_GET['dn']))
	{
		$domain=$_GET['dn'];
	}

	if(isset($_SESSION['domain']) || $domain!="")
	{
		if($domain=="")
		{	$domain=$_SESSION['domain'];}

		$db_name="re_user_".$domain;
		$conn=new db_connect($db_name);
		$query="select * from system_search where status=? order by tab_order asc;";
		$stmt=$conn->conn->prepare($query);
		$stmt->execute(array('active'));
		$struct_res=$stmt->fetchAll(PDO::FETCH_ASSOC);

		$search_tab_links="";
		$search_tab_content="";
		$search_ini="";
		$main_search="";
		for($i=0;$i<count($struct_res);$i++)
		{
			$search_tab_links.="<li><a data-toggle='tab' id='search_tab_".$struct_res[$i]['table_name']."_link' href='#search_tab_".$struct_res[$i]['table_name']."' onclick=search_".$struct_res[$i]['table_name']."_ini();>".$struct_res[$i]['tab_name']."</a></li>";

			$search_tab_content.="<div id='search_tab_".$struct_res[$i]['table_name']."' class='tab-pane'><div class='row search-form-default'>".
					"<div class='col-md-12'><form id='search_form_".$struct_res[$i]['table_name']."'>".
					"<div class='input-group'><div class='input-cont'>".
					"<input type='text' placeholder='Search...' name='search_box' required class='form-control'/>".
					"</div><span class='input-group-btn'><button type='submit' class='btn green-haze'>".
					"Search &nbsp; <i class='m-icon-swapright m-icon-white'></i></button></span></div></form></div></div>".
					"<div id='search_results_".$struct_res[$i]['table_name']."'></div></div>";

			$search_ini.="$('#search_form_".$struct_res[$i]['table_name']."').on('submit',function(e)".
							"{e.preventDefault();".
							"search_".$struct_res[$i]['table_name']."_ini();});";

			if($i==0)
			{
				$main_search.="function show_search_results(){".
									"vIni.hideAll();".
									"$('#search_results_box').show();".
									"$('#search_tab_".$struct_res[$i]['table_name']."_link').click();}";
			}

			$search_column_array=json_decode($struct_res[$i]['search_column_array'],true);
			$search_ini.="function search_".$struct_res[$i]['table_name']."_ini(){";
			$search_ini.="$('#search_results_".$struct_res[$i]['table_name']."').html('');";

			foreach($search_column_array as $search_column)
			{
				$search_ini.="search_ini('".$struct_res[$i]['table_name']."','".$search_column."','".$struct_res[$i]['return_columns']."','".$struct_res[$i]['result_count']."','".$struct_res[$i]['result_detail']."','".$struct_res[$i]['result_title']."','".$struct_res[$i]['result_form']."');";
			}
			$search_ini.="}";
		}

		echo $search_tab_links;
		echo "</ul><div class='tab-content'>";
		echo $search_tab_content;
		echo "<script type='text/javascript'>";
		echo $main_search;
		echo $search_ini;
	}
?>


					</script>

					<script>
						function search_ini(tablename,search_column,return_columns_string,result_count,record_detail,record_title,result_form)
						{
							var mainSearchForm=document.getElementById('search_form');
							var mainSearchStr=mainSearchForm.elements['search_box'].value;
							var searchForm=document.getElementById('search_form_'+tablename);
							var searchStr=searchForm.elements['search_box'].value;
							if(vUtil.isBlank(searchStr))
							{
								searchStr=mainSearchStr;
							}

							var new_search_array=searchStr.split(' ');
							var search_array=[searchStr.toLowerCase()];
							new_search_array.forEach(function(new_search_string)
							{
								if(new_search_string.length>=3)
								{
									search_array.push(new_search_string.toLowerCase());
								}
							});

							var search_columns={count:result_count,
												data_store:tablename,
												indexes:[{index:'id'},{index:search_column,approx_array:search_array}]};

							var return_columns=vUtil.jsonParse(return_columns_string);
							for(var i in return_columns)
							{
								var search_index={index:return_columns[i]['column']};
								search_columns.indexes.push(search_index);
							}

							read_json_rows('',search_columns,function(results)
							{
								results.forEach(function(result)
								{
									result.search_priority=100;
									for(var i in search_array)
									{
										if(result[search_column].toLowerCase().indexOf(search_array[i])>-1)
										{
											result.search_priority=i;
											break;
										}
									}
								});

								results.sort(function(a,b)
								{
									if(parseInt(a.search_priority)>parseInt(b.search_priority))
									{	return 1;}
									else
									{	return -1;}
								});

								var result_html='';
								results.forEach(function(result)
								{
									var already_present=document.getElementById(tablename+"_"+result.id);
									if(vUtil.isBlank(already_present))
									{
										var local_record_detail=record_detail;
										var local_record_title=record_title;
										for(var x=0;x<return_columns.length;x++)
										{
											var regex=new RegExp(return_columns[x]['key']);
											if(!vUtil.isBlank(result[return_columns[x].column]))
											{
												local_record_detail=local_record_detail.replace(regex,result[return_columns[x]['column']]);
												local_record_title=local_record_title.replace(regex,result[return_columns[x]['column']]);
											}
											else
											{
												local_record_detail=local_record_detail.replace(regex,'');
												local_record_title=local_record_title.replace(regex,'');
											}
										}
										if(!vUtil.isBlank(record_detail))
										{
											if(tablename=='activities')
											{
												result_html+="<div class='search-classic' id='"+tablename+"_"+result.id+"'><h4><a onclick=element_display('"+result.data_id+"','"+result.link_to+"');>"+local_record_title+"</a></h4><p>"+local_record_detail+"</p></div>";
											}
											else
											{
												result_html+="<div class='search-classic' id='"+tablename+"_"+result.id+"'><h4><a onclick=element_display('"+result.id+"','"+result_form+"');>"+local_record_title+"</a></h4><p>"+local_record_detail+"</p></div>";
											}
										}
									}
								});

								$('#search_results_'+tablename).append(result_html);
							});
						}
					</script>
				</div>
			</div>
		</div>
	</div>
</div>
