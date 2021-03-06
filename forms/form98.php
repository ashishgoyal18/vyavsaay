<div id='form98' class='tab-pane portlet box green-meadow'>
	<div class="portlet-title">
		<div class='caption'>
			<a class='btn btn-circle grey btn-outline btn-sm' onclick='form98_add_item();'>Add <i class='fa fa-plus'></i></a>
		</div>
		<div class="actions">
            <div class="btn-group">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">Tools <i class="fa fa-angle-down"></i></button>
                <ul class="dropdown-menu pull-right">
                    <li>
                        <a id='form98_csv'><i class='fa fa-file-excel-o'></i> Save as CSV</a>
                    </li>
                    <li>
                      	<a id='form98_pdf'><i class='fa fa-file-pdf-o'></i> Save as PDF</a>
                    </li>
                    <li>
                        <a id='form98_print'><i class='fa fa-print'></i> Print</a>
                    </li>
                    <li class="divider"> </li>
                    <li>
                        <a id='form98_upload' onclick=modal23_action(form98_import_template,form98_import,form98_import_validate);><i class='fa fa-upload'></i> Import</a>
                    </li>
                </ul>
            </div>
      </div>
	</div>

	<div class="portlet-body">
	<br>
		<table class="table table-striped table-bordered table-hover dt-responsive no-more-tables" width="100%">
			<thead>
				<tr>
					<form id='form98_header'></form>
						<th><input type='text' placeholder="Name" class='floatlabel' name='name' form='form98_header'></th>
						<th><input type='text' placeholder="Attribute" class='floatlabel' name='attribute' form='form98_header'></th>
						<th><input type='text' placeholder="Value" class='floatlabel' name='value' form='form98_header'></th>
						<th><input type='submit' form='form98_header' style='visibility: hidden;'></th>
				</tr>
			</thead>
			<tbody id='form98_body'>
			</tbody>
		</table>
	</div>

	<script>
		function form98_header_ini()
		{
			var filter_fields=document.getElementById('form98_header');
			var staff_filter=filter_fields.elements['name'];
			var attribute_filter=filter_fields.elements['attribute'];
			var value_filter=filter_fields.elements['value'];

			var staff_data={data_store:'staff',return_column:'acc_name'};
			var attribute_data={data_store:'attributes',return_column:'attribute',
										indexes:[{index:'type',exact:'staff'}]};
			var value_data={data_store:'attributes',return_column:'value',
								indexes:[{index:'type',exact:'staff'}]};

			set_my_filter_json(staff_data,staff_filter);
			set_my_filter_json(attribute_data,attribute_filter);
			set_my_filter_json(value_data,value_filter);

			$(filter_fields).off('submit');
			$(filter_fields).on('submit',function(event)
			{
				event.preventDefault();
				form98_ini();
			});
		};

		function form98_ini()
		{
			show_loader();
			var fid=$("#form98_link").attr('data_id');
			if(fid==null)
				fid="";

			$('#form98_body').html("");

			var filter_fields=document.getElementById('form98_header');
			var fstaff=filter_fields.elements['name'].value;
			var fattribute=filter_fields.elements['attribute'].value;
			var fvalue=filter_fields.elements['value'].value;

			var paginator=$('#form98_body').paginator();

			var new_columns=new Object();
					new_columns.count=paginator.page_size();
					new_columns.start_index=paginator.get_index();
					new_columns.data_store='attributes';
					new_columns.indexes=[{index:'id',value:fid},
									{index:'name',value:fstaff},
									{index:'type',exact:'staff'},
									{index:'attribute',value:fattribute},
									{index:'value',value:fvalue}];

			read_json_rows('form98',new_columns,function(results)
			{
				results.forEach(function(result)
				{
					var rowsHTML="<tr>";
						rowsHTML+="<form id='form98_"+result.id+"'></form>";
							rowsHTML+="<td data-th='Name'>";
								rowsHTML+="<a onclick=\"show_object('staff','"+result.name+"');\"><textarea readonly='readonly' form='form98_"+result.id+"'>"+result.name+"</textarea></a>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Attribute'>";
								rowsHTML+="<textarea readonly='readonly' form='form98_"+result.id+"'>"+result.attribute+"</textarea>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Value'>";
								rowsHTML+="<textarea class='dblclick_editable' readonly='readonly' form='form98_"+result.id+"'>"+result.value+"</textarea>";
							rowsHTML+="</td>";
							rowsHTML+="<td data-th='Action'>";
								rowsHTML+="<input type='hidden' form='form98_"+result.id+"' value='"+result.id+"'>";
								rowsHTML+="<button type='submit' class='btn green' name='save' form='form98_"+result.id+"' title='Save'><i class='fa fa-save'></i></button>";
								rowsHTML+="<button type='button' class='btn red' name='delete' form='form98_"+result.id+"' title='Delete' onclick='form98_delete_item($(this));'><i class='fa fa-trash'></i></button>";
							rowsHTML+="</td>";
					rowsHTML+="</tr>";

					$('#form98_body').append(rowsHTML);
					var fields=document.getElementById("form98_"+result.id);
					$(fields).on("submit", function(event)
					{
						event.preventDefault();
						form98_update_item(fields);
					});
				});

				$('#form98').formcontrol();
				paginator.update_index(results.length);
				vExport.export_buttons({action:'dynamic',columns:new_columns,file:'Staff Attributes',report_id:'form98'});
				hide_loader();
			});
		};

		function form98_add_item()
		{
			if(is_create_access('form98'))
			{
				var id=vUtil.newKey();
				var rowsHTML="<tr>";
				rowsHTML+="<form id='form98_"+id+"' autocomplete='off'></form>";
					rowsHTML+="<td data-th='Name'>";
						rowsHTML+="<input type='text' form='form98_"+id+"' required>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Attribute'>";
						rowsHTML+="<input type='text' form='form98_"+id+"' required>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Value'>";
						rowsHTML+="<textarea class='dblclick_editable' form='form98_"+id+"' required></textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='hidden' form='form98_"+id+"' value='"+id+"'>";
						rowsHTML+="<button type='submit' class='btn green' form='form98_"+id+"' title='Save'><i class='fa fa-save'></i></button>";
						rowsHTML+="<button type='button' class='btn red' form='form98_"+id+"' title='Delete' onclick='$(this).parent().parent().remove();'><i class='fa fa-trash'></i></button>";
					rowsHTML+="</td>";
				rowsHTML+="</tr>";

				$('#form98_body').prepend(rowsHTML);
				var fields=document.getElementById("form98_"+id);
				var staff_filter=fields.elements[0];
				var attribute_filter=fields.elements[1];

				$(fields).on("submit", function(event)
				{
					event.preventDefault();
					form98_create_item(fields);
				});

				var staff_data={data_store:'staff',return_column:'acc_name'};
				set_my_value_list_json(staff_data,staff_filter,function ()
				{
					$(staff_filter).focus();
				});

				var attribute_data={data_store:'attributes',return_column:'attribute',
											indexes:[{index:'type',exact:'staff'}]};
				set_my_filter_json(attribute_data,attribute_filter);

				$('#form98').formcontrol();
			}
			else
			{
				$("#modal2_link").click();
			}
		}

		function form98_create_item(form)
		{
			if(is_create_access('form98'))
			{
				var staff=form.elements[0].value;
				var attribute=form.elements[1].value;
				var value=form.elements[2].value;
				var data_id=form.elements[3].value;
				var last_updated=get_my_time();

				var data_json={data_store:'attributes',
	 				log:'yes',
	 				data:[{index:'id',value:data_id},
	 					{index:'name',value:staff},
	 					{index:'type',value:'staff'},
	 					{index:'attribute',value:attribute},
	 					{index:'value',value:value},
	 					{index:'last_updated',value:last_updated}],
	 				log_data:{title:'Added',notes:'Attribute for staff '+staff,link_to:'form98'}};
				create_json(data_json);

				$(form).readonly();

				var del_button=form.elements[5];
				del_button.removeAttribute("onclick");
				$(del_button).on('click',function(event)
				{
					form98_delete_item(del_button);
				});

				$(form).off('submit');
				$(form).on('submit',function(event)
				{
					event.preventDefault();
					form98_update_item(form);
				});
			}
			else
			{
				$("#modal2_link").click();
			}
		}

		function form98_update_item(form)
		{
			if(is_update_access('form98'))
			{
				var staff=form.elements[0].value;
				var attribute=form.elements[1].value;
				var value=form.elements[2].value;
				var data_id=form.elements[3].value;
				var last_updated=get_my_time();
				var data_json={data_store:'attributes',
	 				log:'yes',
	 				data:[{index:'id',value:data_id},
	 					{index:'name',value:staff},
	 					{index:'type',value:'staff'},
	 					{index:'attribute',value:attribute},
	 					{index:'value',value:value},
	 					{index:'last_updated',value:last_updated}],
	 				log_data:{title:'Updated',notes:'Attribute for staff '+staff,link_to:'form98'}};

				update_json(data_json);
				$(form).readonly();
			}
			else
			{
				$("#modal2_link").click();
			}
		}

		function form98_delete_item(button)
		{
			if(is_delete_access('form98'))
			{
				modal115_action(function()
				{
					var form_id=$(button).attr('form');
					var form=document.getElementById(form_id);

					var staff=form.elements[0].value;
					var attribute=form.elements[1].value;
					var value=form.elements[2].value;
					var data_id=form.elements[3].value;
					var last_updated=get_my_time();

					var data_json={data_store:'attributes',
	 				log:'yes',
	 				data:[{index:'id',value:data_id}],
	 				log_data:{title:'Deleted',notes:'Attribute for staff '+staff,link_to:'form98'}};

					delete_json(data_json);
					$(button).parent().parent().remove();
				});
			}
			else
			{
				$("#modal2_link").click();
			}
		}

		function form98_import_template()
		{
			var data_array=['id','name','attribute','value'];
			vUtil.arrayToCSV(data_array);
		};

		function form98_import_validate(data_array)
		{
			var validate_template_array=[{column:'name',required:'yes',regex:new RegExp('^[0-9a-zA-Z \'_.,/@$!()-]+$')},
									{column:'attribute',required:'yes',regex:new RegExp('^[0-9a-zA-Z \'_.,/@$!()-]+$')},
									{column:'value',regex:new RegExp('^[0-9a-zA-Z \'_.,/@$!()-]+$')}];

			var error_array=vImport.validate(data_array,validate_template_array);
			return error_array;
		}

		function form98_import(data_array,import_type)
		{
			var data_json={data_store:'attributes',
 					loader:'no',
 					log:'yes',
 					data:[],
 					log_data:{title:'Attributes for staff',link_to:'form98'}};

			var counter=1;
			var last_updated=get_my_time();

			data_array.forEach(function(row)
			{
				counter+=1;
				if(import_type=='create_new')
				{
					row.id=last_updated+counter;
				}

				var data_json_array=[{index:'id',value:row.id},
	 					{index:'name',value:row.name},
	 					{index:'type',value:'staff'},
	 					{index:'attribute',value:row.attribute},
	 					{index:'value',value:row.value},
	 					{index:'last_updated',value:last_updated}];

				data_json.data.push(data_json_array);
			});

			if(import_type=='create_new')
			{
				create_batch_json(data_json);
			}
			else
			{
				update_batch_json(data_json);
			}
		};

	</script>
</div>
