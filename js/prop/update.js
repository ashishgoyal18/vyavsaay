/**
 * @report Item Picklist
 * @param form
 */
function report63_update(form)
{
	if(is_update_access('report63'))
	{
		console.log('update63');
		var item=form.elements[0].value;
		var batch=form.elements[2].value;
		var to_pick=parseFloat(form.elements[3].value);
		var picked=parseFloat(form.elements[4].value);
		var storage=form.elements[5].value;
		var data_ids=form.elements[6].value;
		var table_type=form.elements[7].value;
		var last_updated=get_my_time();
		var ids_object=vUtil.jsonParse(data_ids);

		var data_xml="<"+table_type+">";
		var counter=1;

		ids_object.forEach(function(id_object)
		{
			if((counter%500)===0)
			{
				data_xml+="</"+table_type+"><separator></separator><"+table_type+">";
			}
			var status='pending';
			var pending_quantity=parseFloat(id_object.quantity)-parseFloat(id_object.picked);
			if(pending_quantity<=picked)
			{
				status='picked';
				picked=picked-pending_quantity;
				id_object.picked=parseFloat(id_object.picked)+pending_quantity;
			}
			data_xml+="<row>" +
					"<id>"+id_object.id+"</id>" +
					"<picked_status>"+status+"</picked_status>" +
					"<picked_quantity>"+id_object.picked+"</picked_quantity>" +
					"<storage>"+storage+"</storage>"+
					"<last_updated>"+last_updated+"</last_updated>" +
					"</row>";
		});

		data_xml+="</"+table_type+">";

		update_batch(data_xml);

		for(var i=0;i<6;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @report Channel Collections
 * @param form
 */
function report67_update(data_id)
{
	if(is_update_access('report67'))
	{
		var last_updated=get_my_time();
		var	data_xml="<bills>" +
					"<id>"+data_id+"</id>" +
					"<collection_status>received</collection_status>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</bills>";
		update_simple(data_xml);

	}
	else
	{
		$("#modal2_link").click();
	}
}

function report72_update(form)
{
	if(is_update_access('report72'))
	{
		var status_filter=form.elements[0];
		var status=form.elements[0].value;
		var id=form.elements[1].value;
		var last_updated=get_my_time();
		var new_status="";
		var customer=form.elements[2].value;
		var order_num=form.elements[3].value;
		var total=form.elements[4].value;
		var button_filter=form.elements[5];

		if(status=='pending')
		{
			new_status="picking";
			button_filter.value="Picked";
			modal119_action(id,'pickup');
		}
		else if(status=='picking')
		{
			new_status="picked";
			button_filter.value="Process";
		}
		if(status=='picked')
		{
			new_status="processing";
			button_filter.value="Processed";
		}
		else if(status=='processing')
		{
			new_status="ready for delivery";
			button_filter.value="Deliver";
		}
		else if(status=='ready for delivery')
		{
			modal119_action(id,'delivery');
			new_status="out for delivery";
			button_filter.value="Delivered";
		}
		else if(status=='out for delivery')
		{
			new_status="delivered";
			$(button_filter).hide();
		}

		status_filter.value=new_status;

		var data_xml="<sale_orders>" +
					"<id>"+id+"</id>" +
					"<status>"+new_status+"</status>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</sale_orders>";

		update_simple(data_xml);

		/////////////////
		var sms_notification_status=get_session_var('sms_notification_status');
		var sms="";
		var found=sms_notification_status.indexOf(new_status);
		if(found>=0)
		{
			var f_id=get_my_time();

			if(new_status=='delivered')
			{
				var last_updated=get_my_time();
				var feedback_xml="<feedback>"+
							"<id>"+f_id+"</id>"+
							"<order_num unique='yes'>"+order_num+"</order_num>"+
							"<provider>"+customer+"</provider>"+
							"<date>"+last_updated+"</date>"+
							"<last_updated>"+last_updated+"</last_updated>"+
							"</feedback>";
				create_simple_no_warning(feedback_xml);
				sms=get_session_var('delivered_sms_message');
			}
			else if(new_status=='out for delivery')
			{
				sms=get_session_var('out_for_delivery_sms_message');
			}
			else if(new_status=='ready for delivery')
			{
				sms=get_session_var('ready_for_delivery_sms_message');
			}
			else if(new_status=='processed')
			{
				sms=get_session_var('processed_sms_message');
			}
			else if(new_status=='processing')
			{
				sms=get_session_var('processing_sms_message');
			}
			else if(new_status=='picked')
			{
				sms=get_session_var('picked_sms_message');
			}
			else if(new_status=='picking')
			{
				sms=get_session_var('picking_sms_message');
			}
			else if(new_status=='pending')
			{
				sms=get_session_var('pending_sms_message');
			}
			else if(new_status=='cancelled')
			{
				var last_updated=get_my_time();
				var feedback_xml="<feedback>"+
							"<id>"+f_id+"</id>"+
							"<order_num unique='yes'>"+order_num+"</order_num>"+
							"<provider>"+customer_name+"</provider>"+
							"<date>"+last_updated+"</date>"+
							"<last_updated>"+last_updated+"</last_updated>"+
							"</feedback>";
				create_simple_no_warning(feedback_xml);

				sms=get_session_var('cancelled_sms_message');
			}

			var feedback_link="vyavsaay.com/f/v.htm?i="+f_id+"&d=washclub";
			//console.log(sms);
			sms=sms.replace(/bill_total/g,total);
			sms=sms.replace(/feedback_link/g,feedback_link);
			var phone_xml="<customers>"+
						"<phone></phone>"+
						"<name></name>"+
						"<acc_name exact='yes'>"+customer+"</acc_name>"+
						"</customers>";
			fetch_requested_data('',phone_xml,function(phones)
			{
				var to=phones[0].phone;
				var customer_name=phones[0].name;
				var sms_content=sms.replace(/customer_name/g,customer_name);
				send_sms(to,sms_content,'transaction');
			});
		}


		/////////////////

	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @report Order Picklist
 * @param form
 */
function report90_close_item(form)
{
	if(is_update_access('report90'))
	{
		console.log('picked');
		var item=form.elements[1].value;
		var item_desc=form.elements[2].value;
		var batch=form.elements[3].value;
		var to_pick=form.elements[4].value;
		var picked=form.elements[5].value;
		var storage=form.elements[6].value;
		var data_id=form.elements[8].value;
		var bill_id=form.elements['bill_id'].value;
		var table_type=form.elements[9].value;
		var last_updated=get_my_time();

		form.elements[5].value=to_pick;
		var close_button=form.elements[7];
		var edit_button=document.getElementById('report90_edit_location_'+data_id);
		var refresh_button=document.getElementById('report90_refresh_location_'+data_id);

		$(close_button).hide();
		$(edit_button).hide();
		$(refresh_button).hide();

		var plus_minus="";
		if(table_type=='inventory_adjust')
		{
			plus_minus="-";
		}

		var data_xml="<"+table_type+">";
			data_xml+="<id>"+data_id+"</id>" +
				"<picked_status>picked</picked_status>" +
				"<picked_quantity>"+plus_minus+to_pick+"</picked_quantity>" +
				"<storage>"+storage+"</storage>"+
				"<last_updated>"+last_updated+"</last_updated>";
			data_xml+="</"+table_type+">";

		console.log(data_xml);
		update_simple(data_xml);
	}
}

/**
 * @report Order Picklist
 * @param form
 */
function report90_update(form)
{
	if(is_update_access('report90'))
	{
		var item=form.elements[1].value;
		var item_desc=form.elements[2].value;
		var batch=form.elements[3].value;
		var to_pick=form.elements[4].value;
		var picked=form.elements[5].value;
		var storage=form.elements[6].value;
		var data_id=form.elements[8].value;
		var bill_id=form.elements['bill_id'].value;
		var table_type=form.elements[9].value;
		var last_updated=get_my_time();

		var plus_minus="";
		if(table_type=='inventory_adjust')
		{
			plus_minus="-";
		}

		var status="picked";
		if(parseFloat(picked)!=parseFloat(to_pick))
			status='pending';
		var data_xml="<"+table_type+">";
			data_xml+="<id>"+data_id+"</id>" +
				"<picked_status>"+status+"</picked_status>" +
				"<picked_quantity>"+plus_minus+picked+"</picked_quantity>" +
				"<storage>"+storage+"</storage>"+
				"<last_updated>"+last_updated+"</last_updated>";
			data_xml+="</"+table_type+">";

		update_simple(data_xml);

		//////////////////////////////
		var old_storage=form.elements[13].value;
		var old_picked=form.elements[14].value;

		if(storage==old_storage)
		{
			var status="picked";
			if(parseFloat(picked)!=parseFloat(to_pick))
				status='pending';
			var data_xml="<"+table_type+">";
				data_xml+="<id>"+data_id+"</id>" +
					"<picked_status>"+status+"</picked_status>" +
					"<picked_quantity>"+plus_minus+picked+"</picked_quantity>" +
					"<storage>"+old_storage+"</storage>"+
					"<last_updated>"+last_updated+"</last_updated>";
				data_xml+="</"+table_type+">";

			update_simple(data_xml);
			form.elements[13].value=storage;
			form.elements[14].value=picked;
		}
		else
		{
			if(picked==0)
			{
				var status="picked";
				if(parseFloat(picked)!=parseFloat(to_pick))
					status='pending';

				var data_xml="<"+table_type+">"+
						"<id>"+data_id+"</id>" +
						"<picked_status>"+status+"</picked_status>" +
						"<picked_quantity>"+plus_minus+picked+"</picked_quantity>" +
						"<storage>"+storage+"</storage>"+
						"<last_updated>"+last_updated+"</last_updated>"+
						"</"+table_type+">";

				update_simple(data_xml);
				form.elements[13].value=storage;
				form.elements[14].value=picked;
			}
			else
			{
				var status="picked";
				var data_xml="<"+table_type+">"+
						"<id>"+data_id+"</id>" +
						"<picked_status>"+status+"</picked_status>" +
						"<picked_quantity>"+plus_minus+to_pick+"</picked_quantity>" +
						"<storage>"+old_storage+"</storage>"+
						"<last_updated>"+last_updated+"</last_updated>"+
						"</"+table_type+">";

				update_simple(data_xml);

				var new_status='completed';
				if(parseFloat(picked)!=parseFloat(to_pick))
				{
					new_status='pending';
				}
				var old_pending_quantity=parseFloat(to_pick)-parseFloat(old_picked);
				var new_picked_quantity=parseFloat(picked)-parseFloat(old_picked);
				var new_key=vUtil.newKey();
				form.elements[9].value='inventory_adjust';
				form.elements[8].value=new_key;
				form.elements[13].value=storage;
				form.elements[14].value=new_picked_quantity;
				form.elements[4].value=old_pending_quantity;
				form.elements[5].value=new_picked_quantity;

				var adjust1_xml="<inventory_adjust>"+
					"<id>"+(new_key-1)+"</id>" +
					"<product_name>"+item+"</product_name>" +
					"<item_desc>"+item_desc+"</item_desc>" +
					"<batch>"+batch+"</batch>" +
					"<picked_status>picked</picked_status>" +
					"<quantity>"+old_pending_quantity+"</quantity>" +
					"<picked_quantity>"+old_pending_quantity+"</picked_quantity>" +
					"<storage>"+old_storage+"</storage>"+
					"<source>picking</source>"+
					"<source_id>"+bill_id+"</source_id>"+
					"<last_updated>"+last_updated+"</last_updated>"+
					"</inventory_adjust>";
				create_simple(adjust1_xml);

				var adjust2_xml="<inventory_adjust>"+
					"<id>"+new_key+"</id>" +
					"<product_name>"+item+"</product_name>" +
					"<item_desc>"+item_desc+"</item_desc>" +
					"<batch>"+batch+"</batch>" +
					"<picked_status>"+new_status+"</picked_status>" +
					"<quantity>-"+old_pending_quantity+"</quantity>" +
					"<picked_quantity>-"+new_picked_quantity+"</picked_quantity>" +
					"<storage>"+storage+"</storage>"+
					"<source>picking</source>"+
					"<source_id>"+bill_id+"</source_id>"+
					"<last_updated>"+last_updated+"</last_updated>"+
					"</inventory_adjust>";
				create_simple(adjust2_xml);

			}
		}

		for(var i=0;i<7;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}

		var storage_data="<area_utilization>" +
				"<id></id>" +
				"<name exact='yes'>"+storage+"</name>" +
				"<item_name exact='yes'>"+item+"</item_name>" +
				"<batch exact='yes'>"+batch+"</batch>" +
				"</area_utilization>";
		fetch_requested_data('',storage_data,function(placements)
		{
			if(placements.length===0)
			{
				var storage_xml="<area_utilization>" +
						"<id>"+vUtil.newKey()+"</id>" +
						"<name>"+storage+"</name>" +
						"<item_name>"+item+"</item_name>" +
						"<batch>"+batch+"</batch>" +
						"<last_updated>"+get_my_time()+"</last_updated>" +
						"</area_utilization>";
				create_simple(storage_xml);
			}
		});

		//////////////////////////////
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form Create Newsletter
 * @param button
 */
function form2_update_item(form)
{
	if(is_update_access('form2'))
	{
		if(is_online())
		{
			var nl_id=document.getElementById('form2_master').elements[3].value;
			var type=form.elements[0].value;
			var name=form.elements[1].value;
			var detail=form.elements[2].value;
			var url=form.elements[3].value;
			var picture=form.elements[5].value;
			var column_size=form.elements[6].value;
			var data_id=form.elements[7].value;
			var blob=$("#img_form2_"+data_id).attr('src');
			var blob_name="client_images/"+data_id+".jpeg";
			var del_button=form.elements[9];
			var last_updated=get_my_time();
			var data_xml="<newsletter_items>" +
						"<id>"+data_id+"</id>" +
						"<item_name>"+name+"</item_name>" +
						"<item_type>"+type+"</item_type>" +
						"<item_detail>"+detail+"</item_detail>" +
						"<nl_id>"+nl_id+"</nl_id>" +
						"<url>"+url+"</url>";
					if(picture!="")
					{
						data_xml+="<data_blob>"+blob+"</data_blob>"+
								"<pic_url>"+blob_name+"</pic_url>";
					}
					data_xml+="<column_size>"+column_size+"</column_size>"+
						"<last_updated>"+last_updated+"</last_updated>" +
						"</newsletter_items>";
			if(picture!="")
			{
				$.ajax(
				{
					type: "POST",
					url: server_root+"/ajax/save_image.php",
					data:
					{
						blob: blob,
						name:blob_name
					}
				});
			}

			server_update_simple(data_xml);

			for(var i=0;i<7;i++)
			{
				$(form.elements[i]).attr('readonly','readonly');
			}
		}
		else
		{
			$("#modal6_link").click();
		}
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form Create Pamphlets
 * @param button
 */
function form2_update_form()
{
	if(is_update_access('form2'))
	{
		var form=document.getElementById("form2_master");
		var name=form.elements[1].value;
		var description=form.elements[2].value;
		var data_id=form.elements[3].value;
		var last_updated=get_my_time();
		var data_xml="<newsletter>" +
					"<id>"+data_id+"</id>" +
					"<name>"+name+"</name>" +
					"<description>"+description+"</description>"+
					"<last_updated>"+last_updated+"</last_updated>" +
					"</newsletter>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>newsletter</tablename>" +
					"<link_to>form2</link_to>" +
					"<title>Updated</title>" +
					"<notes>NewsLetter "+name+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		update_row(data_xml,activity_xml);

		$("[id^='save_form2_']").click();
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form Manage Assets
 * @param button
 */
function form5_update_item(form)
{
	if(is_update_access('form5'))
	{
		var name=form.elements[0].value;
		var type=form.elements[1].value;
		var description=form.elements[2].value;
		var data_id=form.elements[3].value;
		var last_updated=get_my_time();
		var data_xml="<assets>" +
					"<id>"+data_id+"</id>" +
					"<name>"+name+"</name>" +
					"<type>"+type+"</type>" +
					"<description>"+description+"</description>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</assets>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>assets</tablename>" +
					"<link_to>form5</link_to>" +
					"<title>Updated</title>" +
					"<notes>Asset "+name+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		update_row(data_xml,activity_xml);

		for(var i=0;i<3;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
	}
	else
	{
		$("#modal2_link").click();
	}
}


/**
 * @form Service Reciept
 * @param button
 */
function form10_update_form()
{
	if(is_update_access('form10'))
	{
		var form=document.getElementById("form10_master");

		var customer=form.elements['customer'].value;
		var bill_num=form.elements['bill_num'].value;
		var bill_date=get_raw_time(form.elements['bill_date'].value);
		var due_date=get_raw_time(form.elements['due_date'].value);
		var payment_filter=form.elements['payment'];

		var quantity=0;
		var amount=0;
		var discount=0;
		var tax=0;
		var total=0;

		$("[id^='save_form10_']").each(function(index)
		{
			var subform_id=$(this).attr('form');
			var subform=document.getElementById(subform_id);
			if(!isNaN(parseFloat(subform.elements[2].value)))
			{
				quantity+=parseFloat(subform.elements[2].value);
			}
			if(!isNaN(parseFloat(subform.elements[4].value)))
			{
				amount+=parseFloat(subform.elements[4].value);
			}
			if(!isNaN(parseFloat(subform.elements[5].value)))
			{
				discount+=parseFloat(subform.elements[5].value);
			}
			if(!isNaN(parseFloat(subform.elements[6].value)))
			{
				tax+=parseFloat(subform.elements[6].value);
			}
			if(!isNaN(parseFloat(subform.elements[7].value)))
			{
				total+=parseFloat(subform.elements[7].value);
			}
		});

		var data_id=form.elements['bill_id'].value;
		var order_id=form.elements['order_id'].value;
		var transaction_id=form.elements['t_id'].value;
		var last_updated=get_my_time();

		var data_xml="<bills>" +
					"<id>"+data_id+"</id>" +
					"<customer_name>"+customer+"</customer_name>" +
					"<bill_date>"+bill_date+"</bill_date>" +
					"<due_date>"+due_date+"</due_date>" +
					"<amount>"+amount+"</amount>" +
					"<total>"+total+"</total>" +
					"<total_quantity>"+quantity+"</total_quantity>" +
					"<type>service</type>" +
					"<discount>"+discount+"</discount>" +
					"<tax>"+tax+"</tax>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"<transaction_id>"+transaction_id+"</transaction_id>" +
					"</bills>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>bills</tablename>" +
					"<link_to>form42</link_to>" +
					"<title>Updated</title>" +
					"<notes>Bill no "+bill_num+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		var sale_order_xml="<sale_orders>" +
					"<id>"+order_id+"</id>" +
					"<bill_id>"+data_id+"</bill_id>"+
					"<amount>"+amount+"</amount>" +
					"<total>"+total+"</total>" +
					"<tax>"+tax+"</tax>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</sale_orders>";
		var transaction_xml="<transactions>" +
					"<id>"+transaction_id+"</id>" +
					"<trans_date>"+get_my_time()+"</trans_date>" +
					"<amount>"+total+"</amount>" +
					"<receiver>"+customer+"</receiver>" +
					"<giver>master</giver>" +
					"<tax>"+tax+"</tax>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</transactions>";
		update_row(data_xml,activity_xml);
		update_simple(transaction_xml);
		update_simple(sale_order_xml);

		var total_row="<tr><td colspan='2' data-th='Total'>Total<br>PCS: "+quantity+"</td>" +
					"<td>Amount:</br>Discount: </br>Tax: </br>Total: </td>" +
					"<td>Rs. "+amount+"</br>" +
					"Rs. "+discount+"</br>" +
					"Rs. "+tax+"</br>" +
					"Rs. "+total+"</td>" +
					"<td></td>" +
					"</tr>";
		$('#form10_foot').html(total_row);

		var payment_data="<payments>" +
				"<id></id>" +
				"<bill_id exact='yes'>"+data_id+"</bill_id>" +
				"</payments>";
		get_single_column_data(function(payments)
		{
			for(var y in payments)
			{
				var payment_xml="<payments>" +
							"<id>"+payments[y]+"</id>" +
							"<type>received</type>" +
							"<total_amount>"+total+"</total_amount>" +
							"<acc_name>"+customer+"</acc_name>" +
							"<transaction_id>"+payments[y]+"</transaction_id>" +
							"<bill_id>"+data_id+"</bill_id>" +
							"<last_updated>"+last_updated+"</last_updated>" +
							"</payments>";
				var pt_xml="<transactions>" +
							"<id>"+payments[y]+"</id>" +
							"<amount>"+total+"</amount>" +
							"<receiver>master</receiver>" +
							"<giver>"+customer+"</giver>" +
							"<tax>0</tax>" +
							"<last_updated>"+last_updated+"</last_updated>" +
							"</transactions>";
				update_simple_func(payment_xml,function()
				{
					modal26_action(payments[y],function (mode,paid)
					{
						//console.log(paid);
						if(parseFloat(paid)==0)
							payment_filter.value="Unpaid<br>Balance: Rs. "+total;
						else if(parseFloat(paid)==parseFloat(total))
							payment_filter.value="Paid<br>Balance: Rs. 0";
						else
							payment_filter.value="Partially paid<br>Balance: Rs. "+(parseFloat(total)-parseFloat(paid));

						modal127_action();
					});
				});


				break;
			}
		},payment_data);

		$("[id^='save_form10_']").click();
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form Manage Payments
 * @param button
 */
function form11_update_item(form)
{
	if(is_update_access('form11'))
	{
		var type=form.elements[0].value;
		var acc_name=form.elements[1].value;
		var total_amount=form.elements[2].value;
		var paid_amount=form.elements[3].value;
		var status=form.elements[4].value;
		var data_id=form.elements[6].value;
		var mode=form.elements[7].value;
		var date=form.elements[8].value;
		if(status=='closed' && date=="")
		{
			date=get_my_time();
		}
		var due_date=form.elements[9].value;
		var notes=form.elements[11].value;
		var share_message=form.elements[13];
		var last_updated=get_my_time();
		var data_xml="<payments>" +
					"<id>"+data_id+"</id>" +
					"<acc_name>"+acc_name+"</acc_name>" +
					"<total_amount>"+total_amount+"</total_amount>" +
					"<paid_amount>"+paid_amount+"</paid_amount>" +
					"<due_date>"+due_date+"</due_date>" +
					"<status>"+status+"</status>" +
					"<notes>"+notes+"</notes>" +
					"<mode>"+mode+"</mode>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</payments>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>payments</tablename>" +
					"<link_to>form11</link_to>" +
					"<title>Updated</title>";
		var message_string="";
		if(type=='paid')
		{
			activity_xml+="<notes>Payment of amount Rs. "+total_amount+" paid to "+acc_name+"</notes>";
			message_string="Payment of Rs: "+paid_amount+" paid on "+get_my_past_date(date)+".\n The status of this payment is "+status;
		}
		else
		{
			activity_xml+="<notes>Payment of amount Rs. "+total_amount+" received from "+acc_name+"</notes>";
			message_string="Payment of Rs: "+paid_amount+" received on "+get_my_past_date(date)+".\n The status of this payment is "+status;
		}
		activity_xml+="<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		if(is_online())
		{
			server_update_row(data_xml,activity_xml);
		}
		else
		{
			local_update_row(data_xml,activity_xml);
		}
		share_message.value=message_string;

		for(var i=0;i<7;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form New Bill
 * @param button
 */
function form12_update_form()
{
	if(is_update_access('form12'))
	{
		var form=document.getElementById("form12_master");

		var customer=form.elements[1].value;
		var bill_date=get_raw_time(form.elements[2].value);
		var bill_num=form.elements[3].value;
		var storage=get_session_var('sales_store');

		var message_string="Bill from:"+encodeURIComponent(get_session_var('title'))+"\nAddress: "+get_session_var('address');

		var amount=0;
		var discount=0;
		var tax=0;
		var total=0;

		$("[id^='save_form12']").each(function(index)
		{
			var subform_id=$(this).attr('form');
			var subform=document.getElementById(subform_id);
			total+=parseFloat(subform.elements[4].value);
			amount+=parseFloat(subform.elements[5].value);
			discount+=parseFloat(subform.elements[6].value);
			tax+=parseFloat(subform.elements[7].value);

			message_string+="\nItem: "+subform.elements[0].value;
			message_string+=" Quantity: "+subform.elements[2].value;
			message_string+=" Total: "+subform.elements[4].value;
		});


		var data_id=form.elements[4].value;
		var transaction_id=form.elements[6].value;
		var last_updated=get_my_time();
		var offer_detail="";

		/////deleting existing free products
		var items_data="<bill_items>" +
				"<bill_id>"+data_id+"</bill_id>" +
				"<free_with>bill</free_with>" +
				"<last_updated upperbound='yes'>"+last_updated+"</last_updated>" +
				"</bill_items>";

		if(is_online())
		{
			server_delete_simple(items_data);
		}
		else
		{
			local_delete_simple(items_data);
		}
		///////////////////////////////////

		var offer_data="<offers>" +
				"<offer_type exact='yes'>bill</offer_type>" +
				"<criteria_type>min amount crossed</criteria_type>" +
				"<criteria_amount upperbound='yes'>"+(amount-discount)+"</criteria_amount>" +
				"<result_type></result_type>" +
				"<discount_percent></discount_percent>" +
				"<discount_amount></discount_amount>" +
				"<quantity_add_percent></quantity_add_percent>" +
				"<quantity_add_amount></quantity_add_amount>" +
				"<free_product_name></free_product_name>" +
				"<free_product_quantity></free_product_quantity>" +
				"<offer_detail></offer_detail>" +
				"<status array='yes'>active--extended</status>" +
				"</offers>";
		fetch_requested_data('',offer_data,function(offers)
		{
			offers.sort(function(a,b)
			{
				if(a.criteria_amount<b.criteria_amount)
				{	return 1;}
				else
				{	return -1;}
			});

			for(var i in offers)
			{
				if(offers[i].result_type=='discount')
				{
					if(offers[i].discount_percent!="" && offers[i].discount_percent!=0 && offers[i].discount_percent!="0")
					{
						var dis=parseFloat(((amount-discount)*parseInt(offers[i].discount_percent))/100);
						tax-=(tax*(dis/(amount-discount)));
						discount+=dis;
						total=amount-discount+tax;
					}
					else
					{
						var dis=parseFloat(offers[i].discount_amount)*(Math.floor((amount-discount)/parseFloat(offers[i].criteria_amount)));
						tax-=(tax*(dis/(amount-discount)));
						discount+=dis;
						total=amount-discount+tax;
					}
				}
				else if(offers[i].result_type=='product free')
				{
					var free_product_name=offers[i].free_product_name;
					var free_product_quantity=parseFloat(offers[i].free_product_quantity)*(Math.floor(parseFloat(amount-discount)/parseFloat(offers[i].criteria_amount)));

					get_inventory(free_product_name,'',function(free_quantities)
					{
						if(free_quantities>=free_product_quantity)
						{
							var free_batch_data="<bill_items count='1'>" +
									"<batch></batch>" +
									"<item_name exact='yes'>"+free_product_name+"</item_name>" +
									"</bill_items>";
							get_single_column_data(function(data)
							{
								var free_batch="";
								if(data.length>0)
								{
									free_batch=data[0];
								}

								var id=vUtil.newKey();
								rowsHTML="<tr>";
									rowsHTML+="<form id='form12_"+id+"'></form>";
					                	rowsHTML+="<td>";
					                    	rowsHTML+="<input type='text' readonly='readonly' form='form12_"+id+"' value='"+free_product_name+"'>";
				                        rowsHTML+="</td>";
				                        rowsHTML+="<td>";
				                                rowsHTML+="<input type='text' required form='form12_"+id+"' value='"+free_batch+"'>";
				                        rowsHTML+="</td>";
				                        rowsHTML+="<td>";
				                                rowsHTML+="<input type='number' readonly='readonly' required form='form12_"+id+"' value='0'>";
				                        rowsHTML+="</td>";
				                        rowsHTML+="<td>";
				                                rowsHTML+="<input type='number' readonly='readonly' required form='form12_"+id+"' value='"+free_product_quantity+"'>";
				                        rowsHTML+="</td>";
				                        rowsHTML+="<td>";
				                                rowsHTML+="<input type='number' readonly='readonly' required form='form12_"+id+"' value='0'>";
				                        rowsHTML+="</td>";
				                        rowsHTML+="<td>";
				                                rowsHTML+="<input type='hidden' form='form12_"+id+"' value='0'>";
				                                rowsHTML+="<input type='hidden' form='form12_"+id+"' value='0'>";
				                                rowsHTML+="<input type='hidden' form='form12_"+id+"' value='0'>";
				                                rowsHTML+="<input type='hidden' form='form12_"+id+"' value='free on the bill amount'>";
				                                rowsHTML+="<input type='hidden' form='form12_"+id+"' value='"+id+"'>";
				                                rowsHTML+="<input type='submit' class='save_icon' form='form12_"+id+"' id='save_form12_"+id+"' >";
				                                rowsHTML+="<input type='button' class='delete_icon' form='form12_"+id+"' id='delete_form12_"+id+"' onclick='form12_delete_item($(this));'>";
				                                rowsHTML+="<input type='hidden' form='form12_"+id+"' value=''>";
				                                rowsHTML+="<input type='hidden' form='form12_"+id+"' value=''>";
				                        rowsHTML+="</td>";
				                rowsHTML+="</tr>";

				            $('#form12_body').prepend(rowsHTML);

				            var bill_item_id=vUtil.newKey();
								var free_xml="<bill_items>" +
											"<id>"+bill_item_id+"</id>" +
											"<item_name>"+free_product_name+"</item_name>" +
											"<batch>"+free_batch+"</batch>" +
											"<unit_price>0</unit_price>" +
											"<quantity>"+free_product_quantity+"</quantity>" +
											"<amount>0</amount>" +
											"<total>0</total>" +
											"<discount>0</discount>" +
											"<offer></offer>" +
											"<type>free</type>" +
											"<tax>0</tax>" +
											"<bill_id>"+data_id+"</bill_id>" +
											"<free_with>bill</free_with>" +
											"<storage>"+storage+"</storage>"+
											"<last_updated>"+last_updated+"</last_updated>" +
											"</bill_items>";

								if(is_online())
								{
									server_create_simple(free_xml);
								}
								else
								{
									local_create_simple(free_xml);
								}

							},free_batch_data);
						}
						else
						{
							$("#modal7_link").click();
						}
					});
				}
				offer_detail=offers[i].offer_detail;
				break;
			}

			var data_xml="<bills>" +
						"<id>"+data_id+"</id>" +
						"<customer_name>"+customer+"</customer_name>" +
						"<bill_date>"+bill_date+"</bill_date>" +
						"<amount>"+amount+"</amount>" +
						"<total>"+total+"</total>" +
						"<type>product</type>" +
						"<offer>"+offer_detail+"</offer>" +
						"<discount>"+discount+"</discount>" +
						"<tax>"+tax+"</tax>" +
						"<last_updated>"+last_updated+"</last_updated>" +
						"<transaction_id>"+transaction_id+"</transaction_id>" +
						"</bills>";
			var activity_xml="<activity>" +
						"<data_id>"+data_id+"</data_id>" +
						"<tablename>bills</tablename>" +
						"<link_to>form42</link_to>" +
						"<title>Updated</title>" +
						"<notes>Bill no "+bill_num+"</notes>" +
						"<updated_by>"+get_name()+"</updated_by>" +
						"</activity>";
			var transaction_xml="<transactions>" +
						"<id>"+transaction_id+"</id>" +
						"<trans_date>"+get_my_time()+"</trans_date>" +
						"<amount>"+total+"</amount>" +
						"<receiver>"+customer+"</receiver>" +
						"<giver>master</giver>" +
						"<tax>"+tax+"</tax>" +
						"<last_updated>"+last_updated+"</last_updated>" +
						"</transactions>";
			if(is_online())
			{
				server_update_row(data_xml,activity_xml);
				server_update_simple(transaction_xml);
			}
			else
			{
				local_update_row(data_xml,activity_xml);
				local_update_simple(transaction_xml);
			}

			message_string+="\nAmount: "+amount;
			message_string+="\ndiscount: "+discount;
			message_string+="\nTax: "+tax;
			message_string+="\nTotal: "+total;
			var subject="Bill from "+get_session_var('title');
			$('#form12_share').show();
			$('#form12_share').click(function()
			{
				modal44_action(customer,subject,message_string);
			});

			var total_row="<tr><td colspan='3' data-th='Total'>Total</td>" +
								"<td>Amount:</br>Discount: </br>Tax: </br>Total: </td>" +
								"<td>Rs. "+amount+"</br>" +
								"Rs. "+discount+"</br>" +
								"Rs. "+tax+"</br>" +
								"Rs. "+total+"</td>" +
								"<td></td>" +
								"</tr>";
			$('#form12_foot').html(total_row);


			var payment_data="<payments>" +
					"<id></id>" +
					"<bill_id exact='yes'>"+data_id+"</bill_id>" +
					"</payments>";
			get_single_column_data(function(payments)
			{
				for(var y in payments)
				{
					var payment_xml="<payments>" +
								"<id>"+payments[y]+"</id>" +
								"<type>received</type>" +
								"<total_amount>"+total+"</total_amount>" +
								"<acc_name>"+customer+"</acc_name>" +
								"<transaction_id>"+payments[y]+"</transaction_id>" +
								"<bill_id>"+data_id+"</bill_id>" +
								"<last_updated>"+last_updated+"</last_updated>" +
								"</payments>";
					var pt_xml="<transactions>" +
								"<id>"+payments[y]+"</id>" +
								"<amount>"+total+"</amount>" +
								"<receiver>master</receiver>" +
								"<giver>"+customer+"</giver>" +
								"<tax>0</tax>" +
								"<last_updated>"+last_updated+"</last_updated>" +
								"</transactions>";
					if(is_online())
					{
						server_update_simple_func(payment_xml,function()
						{
							modal26_action(payments[y]);
						});
					}
					else
					{
						local_update_simple_func(payment_xml,function()
						{
							modal26_action(payments[y]);
						});
					}
					break;
				}
			},payment_data);

		});
		$("[id^='save_form12_']").click();
		//$("#modal3").dialog("open");
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form Manage Tasks
 * @param button
 */
function form14_update_item(form)
{
	if(is_update_access('form14'))
	{
		var name=form.elements[0].value;
		var assignee=form.elements[1].value;
		var t_due=get_raw_time(form.elements[2].value);
		var status=form.elements[3].value;
		var data_id=form.elements[4].value;
		var last_updated=get_my_time();
		var data_xml="<task_instances>" +
					"<id>"+data_id+"</id>" +
					"<name>"+name+"</name>" +
					"<assignee>"+assignee+"</assignee>" +
					"<t_due>"+t_due+"</t_due>" +
					"<status>"+status+"</status>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</task_instances>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>task_instances</tablename>" +
					"<link_to>form14</link_to>" +
					"<title>Updated</title>" +
					"<notes>Task "+name+" assigned to "+assignee+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		if(is_online())
		{
			server_update_row(data_xml,activity_xml);
		}
		else
		{
			local_update_row(data_xml,activity_xml);
		}

		var message_string="Due time: "+form.elements[2].value+"\nTask: "+name+"\nAssignee:"+assignee;
		message_string=encodeURIComponent(message_string);
		$("#form14_whatsapp_"+data_id).attr('href',"whatsapp://send?text="+message_string);
		$("#form14_whatsapp_"+data_id).show();

		for(var i=0;i<4;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
	}
	else
	{
		$("#modal2_link").click();
	}
}


/**
 * @form New Purchase Order
 * @param button
 */
function form24_update_form()
{
	if(is_update_access('form24'))
	{
		var form=document.getElementById("form24_master");

		var supplier=form.elements['supplier'].value;
		var order_date=get_raw_time(form.elements['date'].value);
		var order_num=form.elements['order_num'].value;
		var status=form.elements['status'].value;
		var data_id=form.elements['order_id'].value;
		var last_updated=get_my_time();

		var cst='no'
		var payment_mode=form.elements['mode'].value;

		var amount=0;
		var tax=0;
		var total=0;
		var total_quantity=0;

		$("[id^='save_form24']").each(function(index)
		{
			var subform_id=$(this).attr('form');
			var subform=document.getElementById(subform_id);

			if(!isNaN(parseFloat(subform.elements[7].value)))
			{
				amount+=parseFloat(subform.elements[7].value);
				tax+=parseFloat(subform.elements[9].value);
				total+=parseFloat(subform.elements[10].value);
			}
			if(!isNaN(parseFloat(subform.elements[2].value)))
				total_quantity+=parseFloat(subform.elements[2].value);

		});

		total=amount+tax;

		if(form.elements['cst'].checked)
		{
			cst='yes';
			//tax+=vUtil.round(.02*amount,2);
			//total+=vUtil.round(.02*amount,2);
		}

		amount=vUtil.round(amount,2);
		tax=vUtil.round(tax,2);
		total=vUtil.round(total,2);

		var total_row="<tr><td colspan='2' data-th='Total'>Total Quantity: "+total_quantity+"</td>" +
								"<td>Amount:<br>Tax: <br>Total: </td>" +
								"<td>Rs. "+amount+"<br>" +
								"Rs. "+tax+"<br> " +
								"Rs. "+total+"</td>" +
								"<td></td>" +
								"</tr>";

		$('#form24_foot').html(total_row);

		var data_xml="<purchase_orders>" +
					"<id>"+data_id+"</id>" +
					"<supplier>"+supplier+"</supplier>" +
					"<order_date>"+order_date+"</order_date>" +
					"<status>"+status+"</status>" +
					"<order_num>"+order_num+"</order_num>" +
					"<amount>"+amount+"</amount>" +
					"<tax>"+tax+"</tax>" +
					"<total>"+total+"</total>" +
					"<total_quantity>"+total_quantity+"</total_quantity>" +
					"<cst>"+cst+"</cst>"+
					"<payment_mode>"+payment_mode+"</payment_mode>"+
					"<last_updated>"+last_updated+"</last_updated>" +
					"</purchase_orders>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>purchase_orders</tablename>" +
					"<link_to>form43</link_to>" +
					"<title>Updated</title>" +
					"<notes>Purchase order # "+order_num+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		update_row(data_xml,activity_xml);
		$("[id^='save_form24_']").click();
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form Manage Offers
 * @param button
 */
function form35_update_item(form)
{
	if(is_update_access('form35'))
	{
		var offer_name=form.elements[0].value;
		var offer_type=form.elements[1].value;
		var end_date=get_raw_time(form.elements[2].value);
		var offer_detail=form.elements[3].value;
		var status=form.elements[4].value;
		var data_id=form.elements[5].value;
		var last_updated=get_my_time();
		var data_xml="<offers>" +
					"<id>"+data_id+"</id>" +
					"<offer_name>"+offer_name+"</offer_name>" +
					"<offer_type>"+offer_type+"</offer_type>" +
					"<end_date>"+end_date+"</end_date>" +
					"<offer_detail>"+offer_detail+"</offer_detail>" +
					"<status>"+status+"</status>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</offers>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>offers</tablename>" +
					"<link_to>form35</link_to>" +
					"<title>Saved</title>" +
					"<notes>Offer "+offer_name+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		if(is_online())
		{
			server_update_row(data_xml,activity_xml);
		}
		else
		{
			local_update_row(data_xml,activity_xml);
		}
		for(var i=0;i<6;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
	}
	else
	{
		$("#modal2_link").click();
	}
}


/**
 * @form Verify Customer Geo-location
 * @param button
 */
function form41_update_item(form)
{
	if(is_update_access('form41'))
	{
		var name=form.elements[0].value;
		var lat=form.elements[1].value;
		var lng=form.elements[2].value;
		var data_id=form.elements[3].value;
		var button=form.elements[4];
		$(button).hide();

		var last_updated=get_my_time();
		var data_xml="<customers>" +
					"<id>"+data_id+"</id>" +
					"<lat>"+lat+"</lat>" +
					"<lng>"+lng+"</lng>" +
					"<address_status>confirmed</address_status>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</customers>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>customers</tablename>" +
					"<link_to>form41</link_to>" +
					"<title>Updated</title>" +
					"<notes>Geo-location of customer "+name+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		if(is_online())
		{
			server_update_row(data_xml,activity_xml);
		}
		else
		{
			local_update_row(data_xml,activity_xml);
		}
	}
	else
	{
		$("#modal2_link").click();
	}
}


/**
 * @form Verify Customer Geo-location
 * @param button
 */
function form41_update_master(form)
{
	if(is_update_access('form41'))
	{
		var lat_lng_data="<user_preferences>" +
				"<id></id>" +
				"<name array='yes'>--lat--lng--</name>" +
				"</user_preferences>";

		fetch_requested_data('',lat_lng_data,function(lat_lng)
		{
			var lat=form.elements[1].value;
			var lng=form.elements[2].value;
			var button=form.elements[3];
			$(button).hide();

			lat_lng.forEach(function(ll)
			{
				var value=lng;
				if(ll.name==='lat')
				{
					value=lat;
				}
				var last_updated=get_my_time();
				var data_xml="<user_preferences>" +
							"<id>"+ll.id+"</id>" +
							"<value>"+value+"</value>" +
							"<last_updated>"+last_updated+"</last_updated>" +
							"</user_preferences>";
				var activity_xml="<activity>" +
							"<data_id>"+ll.id+"</data_id>" +
							"<tablename>user_preferences</tablename>" +
							"<link_to>form46</link_to>" +
							"<title>Updated</title>" +
							"<notes>Geo-location of business</notes>" +
							"<updated_by>"+get_name()+"</updated_by>" +
							"</activity>";
				if(is_online())
				{
					server_update_row(data_xml,activity_xml);
				}
				else
				{
					local_update_row(data_xml,activity_xml);
				}
				set_session_var(ll.name,value);
			});
		});
	}
	else
	{
		$("#modal2_link").click();
	}
}


/**
 * @form Manage Purchase orders
 * @param button
 */
function form43_update_item(form)
{
	if(is_update_access('form43'))
	{
		var order_num=form.elements[0].value;
		var supplier_name=form.elements[1].value;
		var order_date=get_raw_time(form.elements[2].value);
		var status=form.elements[3].value;
		var data_id=form.elements[8].value;
		var last_updated=get_my_time();
		var data_xml="<purchase_orders>" +
					"<id>"+data_id+"</id>" +
					"<supplier>"+supplier_name+"</supplier>" +
					"<order_date>"+order_date+"</order_date>" +
					"<status>"+status+"</status>" +
					"<order_num>"+order_num+"</order_num>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</purchase_orders>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>purchase_orders</tablename>" +
					"<link_to>form43</link_to>" +
					"<title>Updated</title>" +
					"<notes>Purchase Order # "+order_num+" for supplier "+supplier_name+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		if(is_online())
		{
			server_update_row(data_xml,activity_xml);
		}
		else
		{
			local_update_row(data_xml,activity_xml);
		}
		for(var i=0;i<8;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
	}
	else
	{
		$("#modal2_link").click();
	}
}


/**
 * @form set defaults
 */
function form46_update_form()
{
	if(is_update_access('form46'))
	{
		$("[id^='save_form46_']").click();
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form Change Password
 */
function form47_update_form()
{
	show_loader();
	var form=document.getElementById('form47_master');
	var domain=get_domain();
	var username=get_username();
	var current_pass=form.elements[1].value;
	var new_pass=form.elements[2].value;
	var last_updated=get_my_time();

	var user_data="<accounts count='1'>" +
			"<id></id>" +
			"<username exact='yes'>"+username+"</username>" +
			"<password></password>" +
			"</accounts>";
	fetch_requested_data('',user_data,function(results)
	{
		for(var i in results)
		{
			var salt='$2a$10$'+domain+'1234567891234567891234';
			var salt_22=salt.substring(0, 29);

			var bcrypt = new bCrypt();
			bcrypt.hashpw(current_pass, salt_22, function(currenthash)
			{
				if(currenthash.substring(3)===results[i].password.substring(3))
				{
					//console.log(newhash);
					var bcrypt = new bCrypt();
					bcrypt.hashpw(new_pass, salt_22, function(newhash)
					{
						var data_xml="<accounts>" +
									"<id>"+results[i].id+"</id>" +
									"<password>"+newhash+"</password>" +
									"<last_updated>"+last_updated+"</last_updated>" +
									"</accounts>";
						if(is_online())
						{
							server_update_simple(data_xml);
						}
						else
						{
							local_update_simple(data_xml);
						}
						$(form).find('.form47_verify').html('Password updated.');
						form.elements[1].value="";
						form.elements[2].value="";
						form.elements[3].value="";
						hide_loader();
					}, function() {});
				}
				else
				{
					$(form).find('.form47_verify').html('Incorrect password. Try again!');
					form.elements[1].value="";
					form.elements[2].value="";
					form.elements[3].value="";
					hide_loader();
				}
			}, function() {});
			break;
		}
	});
}


/**
 * @form Select print templates
 * @param button
 */
function form54_update_item(form)
{
	if(is_update_access('form54'))
	{
		var name=form.elements[0].getAttribute('data-i18n');
		name=name.substr(name.indexOf('.')+1);
		var value=form.elements[1].value;
		var data_id=form.elements[2].value;
		var element_id=form.elements[3].value;
		var last_updated=get_my_time();
		var table='user_preferences';
		var data_xml="<"+table+">" +
					"<id>"+data_id+"</id>" +
					"<name unique='yes'>"+element_id+"</name>" +
					"<display_name>"+name+"</display_name>" +
					"<value>"+value+"</value>" +
					"<type>template</type>" +
					"<status>active</status>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</"+table+">";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>"+table+"</tablename>" +
					"<link_to>form50</link_to>" +
					"<title>Updated</title>" +
					"<notes>Selected "+value+" template for "+name+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		if(is_online())
		{
			server_update_row(data_xml,activity_xml);
		}
		else
		{
			local_update_row(data_xml,activity_xml);
		}
		for(var i=0;i<4;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form Select Print templates
 * @param button
 */
function form54_update_form(button)
{
	if(is_update_access('form54'))
	{
		$("[id^='save_form54_']").click();
		//$("#modal3").dialog("open");
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * formNo 58
 * form Manage Service pre-requisites
 * @param button
 */
function form58_update_item(form)
{
	if(is_update_access('form58'))
	{
		var service=form.elements[0].value;
		var type=form.elements[1].value;
		var requisite=form.elements[2].value;
		var quantity=form.elements[3].value;
		var data_id=form.elements[4].value;
		var last_updated=get_my_time();

		var data_json={data_store:'pre_requisites',
	 				log:'yes',
	 				data:[{index:'id',value:data_id},
	 					{index:'name',value:service},
	 					{index:'type',value:'service'},
	 					{index:'requisite_type',value:type},
	 					{index:'requisite_name',value:requisite},
	 					{index:'quantity',value:quantity},
	 					{index:'last_updated',value:last_updated}],
	 				log_data:{title:'Updated',notes:'Pre-requisite for service '+service,link_to:'form58'}};

		update_json(data_json);
		for(var i=0;i<5;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * formNo 59
 * form Manage product pre-requisites
 * @param button
 */
function form59_update_item(form)
{
	if(is_update_access('form59'))
	{
		var product=form.elements[0].value;
		var type=form.elements[1].value;
		var requisite=form.elements[2].value;
		var quantity=form.elements[3].value;
		var data_id=form.elements[4].value;
		var last_updated=get_my_time();
		var table='pre_requisites';
		var data_xml="<"+table+">" +
					"<id>"+data_id+"</id>" +
					"<name>"+product+"</name>" +
					"<type>product</type>" +
					"<requisite_type>"+type+"</requisite_type>" +
					"<requisite_name>"+requisite+"</requisite_name>" +
					"<quantity>"+quantity+"</quantity>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</"+table+">";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>"+table+"</tablename>" +
					"<link_to>form59</link_to>" +
					"<title>Updated</title>" +
					"<notes>Pre-requisite for product "+product+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		if(is_online())
		{
			server_update_row(data_xml,activity_xml);
		}
		else
		{
			local_update_row(data_xml,activity_xml);
		}
		for(var i=0;i<5;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
	}
	else
	{
		$("#modal2_link").click();
	}
}


/**
 * formNo 61
 * form Service Attributes
 * @param button
 */
function form61_update_item(form)
{
	if(is_update_access('form61'))
	{
		var service=form.elements[0].value;
		var attribute=form.elements[1].value;
		var value=form.elements[2].value;
		var data_id=form.elements[3].value;
		var last_updated=get_my_time();
		var data_xml="<attribute>" +
					"<id>"+data_id+"</id>" +
					"<name>"+service+"</name>" +
					"<type>service</type>" +
					"<attribute>"+attribute+"</attribute>" +
					"<value>"+value+"</value>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</"+table+">";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>attributes</tablename>" +
					"<link_to>form61</link_to>" +
					"<title>Updated</title>" +
					"<notes>Attribute "+attribute+" for service "+service+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		if(is_online())
		{
			server_update_row(data_xml,activity_xml);
		}
		else
		{
			local_update_row(data_xml,activity_xml);
		}
		for(var i=0;i<3;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * formNo 62
 * form Product reviews
 * @param button
 */
function form62_update_item(form)
{
	if(is_update_access('form62'))
	{
		var product=form.elements[0].value;
		var reviewer=form.elements[1].value;
		var detail=form.elements[2].value;
		var rating=form.elements[3].value;
		var data_id=form.elements[4].value;
		var last_updated=get_my_time();
		var table='reviews';
		var data_xml="<"+table+">" +
					"<id>"+data_id+"</id>" +
					"<name>"+product+"</name>" +
					"<type>product</type>" +
					"<reviewer>"+reviewer+"</reviewer>" +
					"<detail>"+detail+"</detail>" +
					"<rating>"+rating+"</rating>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</"+table+">";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>"+table+"</tablename>" +
					"<link_to>form62</link_to>" +
					"<title>Updated</title>" +
					"<notes>Review for product "+product+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		if(is_online())
		{
			server_update_row(data_xml,activity_xml);
		}
		else
		{
			local_update_row(data_xml,activity_xml);
		}
		for(var i=0;i<5;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * formNo 63
 * form service reviews
 * @param button
 */
function form63_update_item(form)
{
	if(is_update_access('form63'))
	{
		var service=form.elements[0].value;
		var reviewer=form.elements[1].value;
		var detail=form.elements[2].value;
		var rating=form.elements[3].value;
		var data_id=form.elements[4].value;
		var last_updated=get_my_time();
		var data_xml="<reviews>" +
					"<id>"+data_id+"</id>" +
					"<name>"+service+"</name>" +
					"<type>service</type>" +
					"<reviewer>"+reviewer+"</reviewer>" +
					"<detail>"+detail+"</detail>" +
					"<rating>"+rating+"</rating>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</reviews>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>reviews</tablename>" +
					"<link_to>form63</link_to>" +
					"<title>Updated</title>" +
					"<notes>Review for service "+service+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		if(is_online())
		{
			server_update_row(data_xml,activity_xml);
		}
		else
		{
			local_update_row(data_xml,activity_xml);
		}
		for(var i=0;i<5;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * formNo 64
 * form Service Cross sells
 * @param button
 */
function form64_update_item(form)
{
	if(is_update_access('form64'))
	{
		var service=form.elements[0].value;
		var cross_type=form.elements[1].value;
		var cross_name=form.elements[2].value;
		var data_id=form.elements[3].value;
		var last_updated=get_my_time();
		var table='cross_sells';
		var data_xml="<cross_sells>" +
					"<id>"+data_id+"</id>" +
					"<name>"+service+"</name>" +
					"<type>service</type>" +
					"<cross_type>"+cross_type+"</cross_type>" +
					"<cross_name>"+cross_name+"</cross_name>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</cross_sells>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>cross_sells</tablename>" +
					"<link_to>form64</link_to>" +
					"<title>updated</title>" +
					"<notes>Cross selling of "+cross_name+" with service "+service+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		if(is_online())
		{
			server_update_row(data_xml,activity_xml);
		}
		else
		{
			local_update_row(data_xml,activity_xml);
		}
		for(var i=0;i<4;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * formNo 66
 * form Cross sells
 * @param button
 */
function form66_update_item(form)
{
	if(is_update_access('form66'))
	{
		var product=form.elements[0].value;
		var cross_type=form.elements[1].value;
		var cross_name=form.elements[2].value;
		var data_id=form.elements[3].value;
		var last_updated=get_my_time();
		var table='cross_sells';
		var data_xml="<"+table+">" +
					"<id>"+data_id+"</id>" +
					"<name>"+product+"</name>" +
					"<type>product</type>" +
					"<cross_type>"+cross_type+"</cross_type>" +
					"<cross_name>"+cross_name+"</cross_name>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</"+table+">";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>"+table+"</tablename>" +
					"<link_to>form66</link_to>" +
					"<title>Updated</title>" +
					"<notes>Cross selling of "+cross_name+" to product "+product+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		update_row(data_xml,activity_xml);
		for(var i=0;i<4;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
	}
	else
	{
		$("#modal2_link").click();
	}
}


/**
 * @form New Sale Order
 * @param button
 */
function form69_update_form()
{
	if(is_update_access('form69'))
	{
		var form=document.getElementById("form69_master");

		var customer=form.elements['customer'].value;
		var order_date=get_raw_time(form.elements['order_date'].value);
		var status=form.elements['status'].value;
		var data_id=form.elements['order_id'].value;
		var order_num=form.elements['order_num'].value;
		var channel=form.elements['channel'].value;
		var save_button=form.elements['save'];
		var last_updated=get_my_time();

		var amount=0;
		var freight=0;
		var tax=0;
		var total=0;
		var total_quantity=0;

		$("[id^='save_form69']").each(function(index)
		{
			var subform_id=$(this).attr('form');
			var subform=document.getElementById(subform_id);
			if(!isNaN(parseFloat(subform.elements[8].value)))
				amount+=parseFloat(subform.elements[8].value);
			if(!isNaN(parseFloat(subform.elements[9].value)))
				tax+=parseFloat(subform.elements[9].value);
			if(!isNaN(parseFloat(subform.elements[6].value)))
				freight+=parseFloat(subform.elements[6].value);
			if(!isNaN(parseFloat(subform.elements[10].value)))
				total+=parseFloat(subform.elements[10].value);
			if(!isNaN(parseFloat(subform.elements[4].value)))
				total_quantity+=parseFloat(subform.elements[4].value);
		});

		amount=vUtil.round(amount,2);
		tax=vUtil.round(tax,2);
		total=vUtil.round(total,2);
		freight=vUtil.round(freight,2);

		var total_row="<tr><td colspan='1' data-th='Total'>Total Quantity: "+total_quantity+"</td>" +
							"<td>Amount:</br>Tax: <br>Freight: </br>Total: </td>" +
							"<td>Rs. "+amount+"</br>" +
							"Rs. "+tax+"</br>" +
							"Rs. "+freight+"</br>" +
							"Rs. "+total+"</td>" +
							"<td></td>" +
							"</tr>";
		$('#form69_foot').html(total_row);

		var data_xml="<sale_orders>" +
					"<id>"+data_id+"</id>" +
					"<customer_name>"+customer+"</customer_name>" +
					"<order_date>"+order_date+"</order_date>" +
					"<channel>"+channel+"</channel>" +
					"<status>"+status+"</status>" +
					"<amount>"+amount+"</amount>" +
					"<tax>"+tax+"</tax>" +
					"<freight>"+freight+"</freight>" +
					"<total>"+total+"</total>" +
					"<total_quantity>"+total_quantity+"</total_quantity>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</sale_orders>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>sale_orders</tablename>" +
					"<link_to>form70</link_to>" +
					"<title>Updated</title>" +
					"<notes>Sale order # "+order_num+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		update_row(data_xml,activity_xml);
		$("[id^='save_form69_']").click();
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form Manage Sale orders
 * @param button
 */
function form70_update_item(form)
{
	if(is_update_access('form70'))
	{
		var data_id=form.elements[0].value;
		var customer_name=form.elements[1].value;
		var order_date=get_raw_time(form.elements[2].value);
		var status=form.elements[3].value;
		var last_updated=get_my_time();
		var data_xml="<sale_orders>" +
					"<id>"+data_id+"</id>" +
					"<customer_name>"+customer_name+"</customer_name>" +
					"<order_date>"+order_date+"</order_date>" +
					"<status>"+status+"</status>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</sale_orders>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>sale_orders</tablename>" +
					"<link_to>form70</link_to>" +
					"<title>Updated</title>" +
					"<notes>Order no "+data_id+" for customer "+customer_name+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		if(is_online())
		{
			server_update_row(data_xml,activity_xml);
		}
		else
		{
			local_update_row(data_xml,activity_xml);
		}
		for(var i=0;i<4;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
	}
	else
	{
		$("#modal2_link").click();
	}
}


/**
 * @form Set shortcut keys
 * @param button
 */
function form77_update_item(form)
{
	if(is_update_access('form77'))
	{
		var display_name=form.elements[0].getAttribute('data-i18n');
		display_name=display_name.substr(display_name.indexOf('.')+1);
		var shortcut=form.elements[1].value;
		var data_id=form.elements[2].value;
		var name=form.elements[3].value;
		var last_updated=get_my_time();
		var data_xml="<user_preferences>" +
					"<id>"+data_id+"</id>" +
					"<display_name>"+display_name+"</display_name>" +
					"<name>"+name+"</name>" +
					"<shortcut unique='yes'>"+shortcut+"</shortcut>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</user_preferences>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>user_preferences</tablename>" +
					"<link_to>form77</link_to>" +
					"<title>Saved</title>" +
					"<notes>"+shortcut+" as shortcut for "+display_name+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		if(is_online())
		{
			server_update_row(data_xml,activity_xml);
		}
		else
		{
			local_update_row(data_xml,activity_xml);
		}
		for(var i=0;i<4;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form Set Shortcut keys
 * @param button
 */
function form77_update_form(button)
{
	if(is_update_access('form77'))
	{
		$("[id^='save_form77_']").click();
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form manage task types
 * @param button
 */
function form79_update_item(form)
{
	if(is_update_access('form79'))
	{
		var name=form.elements[0].value;
		var desc=form.elements[1].value;
		var est_hours=form.elements[2].value;
		var data_id=form.elements[3].value;
		var last_updated=get_my_time();
		var data_xml="<task_type>" +
					"<id>"+data_id+"</id>" +
					"<name>"+name+"</name>" +
					"<description>"+desc+"</description>" +
					"<est_hours>"+est_hours+"</est_hours>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</task_type>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>task_type</tablename>" +
					"<link_to>form79</link_to>" +
					"<title>Updated</title>" +
					"<notes>Task type "+name+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		if(is_online())
		{
			server_update_row(data_xml,activity_xml);
		}
		else
		{
			local_update_row(data_xml,activity_xml);
		}
		for(var i=0;i<4;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
	}
	else
	{
		$("#modal2_link").click();
	}
}


/**
 * @form Sale leads
 * @param button
 */
function form81_update_item(form)
{
	if(is_update_access('form81'))
	{
		var customer=form.elements[0].value;
		var detail=form.elements[1].value;
		var due_date=get_raw_time(form.elements[2].value);
		var identified_by=form.elements[3].value;
		var data_id=form.elements[4].value;
		var last_updated=get_my_time();
		var data_xml="<sale_leads>" +
					"<id>"+data_id+"</id>" +
					"<customer>"+customer+"</customer>" +
					"<detail>"+detail+"</detail>" +
					"<due_date>"+due_date+"</due_date>" +
					"<identified_by>"+identified_by+"</identified_by>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</sale_leads>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>sale_leads</tablename>" +
					"<link_to>form81</link_to>" +
					"<title>Updated</title>" +
					"<notes>Sale lead for customer "+customer+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		if(is_online())
		{
			server_update_row(data_xml,activity_xml);
		}
		else
		{
			local_update_row(data_xml,activity_xml);
		}
		for(var i=0;i<4;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
	}
	else
	{
		$("#modal2_link").click();
	}
}



/**
 * @form Manage Subscriptions
 * @param button
 */
function form84_update_item(form)
{
	if(is_update_access('form84'))
	{
		var customer=form.elements[0].value;
		var service=form.elements[1].value;
		var status=form.elements[2].value;
		var notes=form.elements[3].value;
		var data_id=form.elements[5].value;
		var last_updated=get_my_time();
		var data_xml="<service_subscriptions>" +
					"<id>"+data_id+"</id>" +
					"<customer>"+customer+"</customer>" +
					"<service>"+service+"</service>" +
					"<status>"+status+"</status>" +
					"<notes>"+notes+"</notes>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</service_subscriptions>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>service_subscriptions</tablename>" +
					"<link_to>form84</link_to>" +
					"<title>Updated</title>" +
					"<notes>Service "+service+" subscription for customer "+customer+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		if(is_online())
		{
			server_update_row(data_xml,activity_xml);
		}
		else
		{
			local_update_row(data_xml,activity_xml);
		}
		for(var i=0;i<6;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
	}
	else
	{
		$("#modal2_link").click();
	}
}


/**
 * @form Verify Supplier Geo-location
 * @param button
 */
function form85_update_item(form)
{
	if(is_update_access('form85'))
	{
		var name=form.elements[0].value;
		var lat=form.elements[1].value;
		var lng=form.elements[2].value;
		var data_id=form.elements[3].value;
		var button=form.elements[4];
		$(button).hide();

		var last_updated=get_my_time();
		var data_xml="<suppliers>" +
					"<id>"+data_id+"</id>" +
					"<lat>"+lat+"</lat>" +
					"<lng>"+lng+"</lng>" +
					"<address_status>confirmed</address_status>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</suppliers>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>suppliers</tablename>" +
					"<link_to>form85</link_to>" +
					"<title>Updated</title>" +
					"<notes>Geo-location of supplier "+name+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		if(is_online())
		{
			server_update_row(data_xml,activity_xml);
		}
		else
		{
			local_update_row(data_xml,activity_xml);
		}
	}
	else
	{
		$("#modal2_link").click();
	}
}


/**
 * @form Verify Supplier Geo-location
 * @param button
 */
function form85_update_master(form)
{
	if(is_update_access('form85'))
	{
		var lat_lng_data="<user_preferences>" +
				"<id></id>" +
				"<name array='yes'>--lat--lng--</name>" +
				"</user_preferences>";

		fetch_requested_data('',lat_lng_data,function(lat_lng)
		{
			var lat=form.elements[1].value;
			var lng=form.elements[2].value;
			var button=form.elements[3];
			$(button).hide();

			lat_lng.forEach(function(ll)
			{
				var value=lng;
				if(ll.name==='lat')
				{
					value=lat;
				}
				var last_updated=get_my_time();
				var data_xml="<user_preferences>" +
							"<id>"+ll.id+"</id>" +
							"<value>"+value+"</value>" +
							"<last_updated>"+last_updated+"</last_updated>" +
							"</user_preferences>";
				var activity_xml="<activity>" +
							"<data_id>"+ll.id+"</data_id>" +
							"<tablename>user_preferences</tablename>" +
							"<link_to>form46</link_to>" +
							"<title>Updated</title>" +
							"<notes>Geo-location of business</notes>" +
							"<updated_by>"+get_name()+"</updated_by>" +
							"</activity>";
				if(is_online())
				{
					server_update_row(data_xml,activity_xml);
				}
				else
				{
					local_update_row(data_xml,activity_xml);
				}
				set_session_var(ll.name,value);
			});
		});
	}
	else
	{
		$("#modal2_link").click();
	}
}


/**
 * @form Manage Products
 * @param button
 */
function form87_update_item(form)
{
	if(is_update_access('form87'))
	{
		var name=form.elements[0].value;
		var make=form.elements[1].value;
		var description=form.elements[2].value;
		var tax=form.elements[3].value;
		var data_id=form.elements[4].value;
		var last_updated=get_my_time();

		var data_xml="<product_master>" +
					"<id>"+data_id+"</id>" +
					"<make>"+make+"</make>" +
					"<name>"+name+"</name>" +
					"<description>"+description+"</description>" +
					"<tax>"+tax+"</tax>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</product_master>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>product_master</tablename>" +
					"<link_to>form87</link_to>" +
					"<title>Updated</title>" +
					"<notes>Product "+name+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		update_row(data_xml,activity_xml);
		for(var i=0;i<4;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form Manufacturing Schedule
 * @formNo 88
 * @param button
 */
function form88_update_item(form)
{
	if(is_update_access('form88'))
	{
		var product=form.elements[0].value;
		var process=form.elements[1].value;
		var status=form.elements[2].value;
		var schedule=get_raw_time(form.elements[3].value);
		var iteration=form.elements[4].value;
		var data_id=form.elements[5].value;
		var old_status=form.elements[8].value;
		form.elements[8].value=status;
		var last_updated=get_my_time();
		var data_xml="<manufacturing_schedule>" +
					"<id>"+data_id+"</id>" +
					"<product>"+product+"</product>" +
					"<process_notes>"+process+"</process_notes>" +
					"<status>"+status+"</status>" +
					"<schedule>"+schedule+"</schedule>" +
					"<iteration_notes>"+iteration+"</iteration_notes>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</manufacturing_schedule>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>manufacturing_schedule</tablename>" +
					"<link_to>form88</link_to>" +
					"<title>Updated</title>" +
					"<notes>Manufacturing schedule for product "+product+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		if(is_online())
		{
			server_update_row(data_xml,activity_xml);
		}
		else
		{
			local_update_row(data_xml,activity_xml);
		}

		if(status=='scheduled' && old_status!='scheduled')
		{
			var pre_requisite_data="<pre_requisites>" +
					"<type exact='yes'>product</type>" +
					"<requisite_type exact='yes'>task</requisite_type>" +
					"<name exact='yes'>"+product+"</name>" +
					"<requisite_name></requisite_name>" +
					"<quantity></quantity>" +
					"</pre_requisites>";
			fetch_requested_data('',pre_requisite_data,function(pre_requisites)
			{
				pre_requisites.forEach(function(pre_requisite)
				{
					var task_id=vUtil.newKey();
					var task_xml="<task_instances>" +
							"<id>"+task_id+"</id>" +
							"<name>"+pre_requisite.name+"</name>" +
							"<assignee></assignee>" +
							"<t_initiated>"+get_my_time()+"</t_initiated>" +
							"<t_due>"+get_task_due_time(schedule)+"</t_due>" +
							"<status>pending</status>" +
							"<task_hours>"+pre_requisite.quantity+"</task_hours>" +
							"<source>product</source>" +
							"<source_id>"+data_id+"</source_id>" +
							"<last_updated>"+last_updated+"</last_updated>" +
							"</task_instances>";
					var activity_xml="<activity>" +
							"<data_id>"+task_id+"</data_id>" +
							"<tablename>task_instances</tablename>" +
							"<link_to>form14</link_to>" +
							"<title>Added</title>" +
							"<notes>Task "+pre_requisite.name+"</notes>" +
							"<updated_by>"+get_name()+"</updated_by>" +
							"</activity>";

					if(is_online())
					{
						server_create_row(task_xml,activity_xml);
					}
					else
					{
						local_create_row(task_xml,activity_xml);
					}
				});
			});

		}


		for(var i=0;i<5;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}

	}
	else
	{
		$("#modal2_link").click();
	}
}


/**
 * @form Create Bill(multiple registers)
 * @formNo 91
 * @param button
 */
function form91_update_form()
{
	if(is_update_access('form91'))
	{
		var form=document.getElementById("form91_master");

		var customer=form.elements['customer'].value;
		var bill_type=form.elements['bill_type'].value;
		var bill_date=get_raw_time(form.elements['date'].value);
		var bill_num=form.elements['bill_num'].value;

		var amount=0;
		var tax_name="VAT";
		var tax_array=[];
		var freight=0;
		var total=0;
		var total_quantity=0;
		var tax=0;

		$("[id^='save_form91']").each(function(index)
		{
			var subform_id=$(this).attr('form');
			var subform=document.getElementById(subform_id);

			if(!isNaN(parseFloat(subform.elements[3].value)))
			{
				total_quantity+=parseFloat(subform.elements[3].value);
			}
			if(!isNaN(parseFloat(subform.elements[7].value)))
			{
				amount+=parseFloat(subform.elements[7].value);
			}
			if(!isNaN(parseFloat(subform.elements[8].value)))
			{
				if(typeof tax_array[subform.elements[11].value]=='undefined')
				{
					tax_array[subform.elements[11].value]=0;
				}
				tax_array[subform.elements[11].value]+=parseFloat(subform.elements[8].value);
			}
			if(!isNaN(parseFloat(subform.elements[9].value)))
			{
				total+=parseFloat(subform.elements[9].value);
			}
		});

		var form=document.getElementById("form91_master");
		var tax_type_string="<cst>0</cst>"+
							"<vat>"+tax+"</vat>";

		if(form.elements['bill_type'].value=='Retail-CST' || form.elements['bill_type'].value=='Retail-CST-C')
		{
			tax_name="CST";
			tax_type_string="<cst>"+tax+"</cst>"+
							"<vat>0</vat>";
		}

		var tax_string="";
		var tax_amount_string="";

		for(var x in tax_array)
		{
			tax_array[x]=vUtil.round(tax_array[x],2);
			tax_string+=tax_name+" @"+x+"%: <br>";
			tax_amount_string+="Rs. "+tax_array[x]+": <br>";
		}

		amount=vUtil.round(amount,2);
		freight=vUtil.round(freight,2);
		total=vUtil.round(total,2);

		var total_row="<tr><td colspan='3' data-th='Total'>Total Quantity: "+total_quantity+"</td>" +
								"<td>Amount:</br>"+tax_string+"Freight: </br>Total: </td>" +
								"<td>Rs. "+amount+"</br>" +tax_amount_string+
								"Rs. "+freight+"</br>" +
								"Rs. <vyavsaay_p id='form91_final_total'>"+total+"<vyavsaay_p></td>" +
								"<td></td>" +
								"</tr>";
		$('#form91_foot').html(total_row);

		var data_id=form.elements['bill_id'].value;
		var order_id=form.elements['order_id'].value;
		var order_num=form.elements['order_num'].value;
		var channel=form.elements['channel'].value;
		var transaction_id=form.elements['t_id'].value;
		var save_button=form.elements['save'];
		var last_updated=get_my_time();

		var data_xml="<bills>" +
					"<id>"+data_id+"</id>" +
					"<bill_num>"+bill_num+"</bill_num>"+
					"<order_num>"+order_num+"</order_num>"+
					"<order_id>"+order_id+"</order_id>"+
					"<channel>"+channel+"</channel>"+
					"<customer_name>"+customer+"</customer_name>" +
					"<bill_date>"+bill_date+"</bill_date>" +
					"<amount>"+amount+"</amount>" +
					"<total>"+total+"</total>" +
					"<billing_type>"+bill_type+"</billing_type>" +
					"<freight>"+freight+"</freight>" +
					"<tax>"+tax+"</tax>";
		data_xml+=tax_type_string;
		data_xml+="<transaction_id>"+transaction_id+"</transaction_id>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</bills>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>bills</tablename>" +
					"<link_to>form92</link_to>" +
					"<title>Updated</title>" +
					"<notes>Bill # "+bill_num+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		var transaction_xml="<transactions>" +
					"<id>"+transaction_id+"</id>" +
					"<trans_date>"+get_my_time()+"</trans_date>" +
					"<amount>"+total+"</amount>" +
					"<receiver>"+customer+"</receiver>" +
					"<giver>master</giver>" +
					"<tax>"+tax+"</tax>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</transactions>";
		update_row(data_xml,activity_xml);
		update_simple(transaction_xml);


		//////////////////////////////////////////////
		var sale_order_xml="<sale_orders>"+
					"<id>"+order_id+"</id>" +
					"<bill_id></bill_id>" +
					"<status></status>"+
					"<total_quantity></total_quantity>"+
					"</sale_orders>";
		fetch_requested_data('',sale_order_xml,function (sorders)
		{
			if(sorders.length>0)
			{
				var id_object_array=[];
				if(sorders[0].bill_id!="" && sorders[0].bill_id!=0 && sorders[0].bill_id!="null")
				{
					id_object_array=vUtil.jsonParse(sorders[0].bill_id);
				}
				else
				{
					var id_object=new Object();
					id_object.bill_num=bill_num;
					id_object.bill_id=data_id;
					id_object.quantity=0;
					id_object_array.push(id_object);
				}

				var master_total_quantity=0;

				for(var k in id_object_array)
				{
					if(id_object_array[k].bill_id==data_id)
					{
						id_object_array[k].bill_num=bill_num;
						id_object_array[k].quantity=total_quantity;
					}
					master_total_quantity+=parseFloat(id_object_array[k].quantity);
				}

				var status='partially billed';
				if(parseFloat(master_total_quantity)==parseFloat(sorders[0].total_quantity))
				{
					status='billed';
				}

				var new_bill_id=JSON.stringify(id_object_array);
				//console.log(new_bill_id);
				var so_xml="<sale_orders>" +
						"<id>"+order_id+"</id>" +
						"<bill_id>"+new_bill_id+"</bill_id>" +
						"<status>"+status+"</status>" +
						"<last_updated>"+last_updated+"</last_updated>" +
						"</sale_orders>";
				update_simple(so_xml);
			}
		});
		/////////////////////////////////////////////

		var payment_data="<payments>" +
				"<id></id>" +
				"<bill_id exact='yes'>"+data_id+"</bill_id>" +
				"</payments>";
		get_single_column_data(function(payments)
		{
			for(var y in payments)
			{
				var payment_xml="<payments>" +
							"<id>"+payments[y]+"</id>" +
							"<type>received</type>" +
							"<total_amount>"+total+"</total_amount>" +
							"<acc_name>"+customer+"</acc_name>" +
							"<transaction_id>"+payments[y]+"</transaction_id>" +
							"<bill_id>"+data_id+"</bill_id>" +
							"<last_updated>"+last_updated+"</last_updated>" +
							"</payments>";
				var pt_xml="<transactions>" +
							"<id>"+payments[y]+"</id>" +
							"<amount>"+total+"</amount>" +
							"<receiver>master</receiver>" +
							"<giver>"+customer+"</giver>" +
							"<tax>0</tax>" +
							"<last_updated>"+last_updated+"</last_updated>" +
							"</transactions>";
				update_simple_func(payment_xml,function()
				{
					//modal26_action(payments[y]);
				});
				break;
			}
		},payment_data);

		$("[id^='save_form91_']").click();
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form Manage Loans
 * @formNo 93
 * @param button
 */
function form93_update_item(form)
{
	if(is_update_access('form93'))
	{
		var account=form.elements[0].value;
		var type=form.elements[1].value;
		var amount=form.elements[2].value;
		var status=form.elements[4].value;
		var data_id=form.elements[5].value;
		var repayment_method=form.elements[6].value;
		var emi=form.elements[7].value;
		var pending_emis=form.elements[8].value;
		var repayment_amount=amount;
		if(repayment_method=='instalments')
		{
			repayment_amount=parseFloat(pending_emis)*parseFloat(emi);
		}
		var adjective="to";
		var receiver="loan";
		var giver=account;
		var ptype='received';
		var due_time=get_debit_period();
		if(type=='taken')
		{
			adjective="from";
			giver="loan";
			receiver=account;
			ptype='paid';
		}
		var last_updated=get_my_time();
		var data_xml="<loans>" +
				"<id>"+data_id+"</id>" +
				"<status>closed</status>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</loans>";
		var activity_xml="<activity>" +
				"<data_id>"+data_id+"</data_id>" +
				"<tablename>loans</tablename>" +
				"<link_to>form93</link_to>" +
				"<title>Closed</title>" +
				"<notes>Loan of amount Rs. "+amount+" "+type+" "+adjective+" "+account+"</notes>" +
				"<updated_by>"+get_name()+"</updated_by>" +
				"</activity>";
		var payment_id=vUtil.newKey();
		var transaction2_xml="<transactions>" +
				"<id>"+payment_id+"</id>" +
				"<trans_date>"+get_my_time()+"</trans_date>" +
				"<amount>"+repayment_amount+"</amount>" +
				"<receiver>"+receiver+"</receiver>" +
				"<giver>"+giver+"</giver>" +
				"<tax>0</tax>" +
				"<last_updated>"+get_my_time()+"</last_updated>" +
				"</transactions>";
		var payment_xml="<payments>" +
				"<id>"+payment_id+"</id>" +
				"<acc_name>"+account+"</acc_name>" +
				"<type>"+ptype+"</type>" +
				"<total_amount>"+repayment_amount+"</total_amount>" +
				"<paid_amount>0</paid_amount>" +
				"<status>pending</status>" +
				"<date>"+get_my_time()+"</date>" +
				"<due_date>"+get_my_time()+"</due_date>" +
				"<mode>"+get_payment_mode()+"</mode>" +
				"<transaction_id>"+payment_id+"</transaction_id>" +
				"<bill_id>"+data_id+"</bill_id>" +
				"<last_updated>"+get_my_time()+"</last_updated>" +
				"</payments>";
		if(is_online())
		{
			server_update_row(data_xml,activity_xml);
			server_create_simple(transaction2_xml);
			server_create_simple_func(payment_xml,function()
			{
				if(type=='taken')
					modal28_action(payment_id);
				else
					modal26_action(payment_id);
			});
		}
		else
		{
			local_update_row(data_xml,activity_xml);
			local_create_simple(transaction2_xml);
			local_create_simple_func(payment_xml,function()
			{
				if(type=='taken')
					modal28_action(payment_id);
				else
					modal26_action(payment_id);
			});
		}
	}
	else
	{
		$("#modal2_link").click();
	}
}


/**
 * @form Selective Sync
 * @param button
 */
function form100_update_item(form)
{
	if(is_update_access('form100'))
	{
		var name=form.elements[0].getAttribute('data-i18n');
		name=name.substr(name.indexOf('.')+1);
		var value='unchecked';
		if(form.elements[1].checked)
			value='checked';
		var data_id=form.elements[2].value;
		var element_id=form.elements[3].value;
		var last_updated=get_my_time();
		var data_xml="<user_preferences>" +
					"<id>"+data_id+"</id>" +
					"<name>"+element_id+"</name>" +
					"<display_name>"+name+"</display_name>" +
					"<sync>"+value+"</sync>" +
					"<type>form</type>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</user_preferences>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>user_preferences</tablename>" +
					"<link_to>form100</link_to>" +
					"<title>Updated</title>" +
					"<notes>Sync for "+name+" form</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		if(is_online())
		{
			server_update_row(data_xml,activity_xml);
		}
		else
		{
			local_update_row(data_xml,activity_xml);
		}
		for(var i=0;i<4;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form Selective sync
 */
function form100_update_form()
{
	if(is_update_access('form100'))
	{
		$("[id^='save_form100_']").click();
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * formNo 101
 * form Manage Projects
 * @param button
 */
function form101_update_item(form)
{
	if(is_update_access('form101'))
	{
		var name=form.elements[0].value;
		var details=form.elements[1].value;
		var start_date=get_raw_time(form.elements[2].value);
		var status=form.elements[3].value;
		var data_id=form.elements[4].value;
		var last_updated=get_my_time();
		var data_xml="<projects>" +
					"<id>"+data_id+"</id>" +
					"<name>"+name+"</name>" +
					"<details>"+details+"</details>" +
					"<start_date>"+start_date+"</start_date>" +
					"<status>"+status+"</status>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</projects>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>projects</tablename>" +
					"<link_to>form101</link_to>" +
					"<title>Updated</title>" +
					"<notes>Project "+name+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		if(is_online())
		{
			server_update_row(data_xml,activity_xml);
		}
		else
		{
			local_update_row(data_xml,activity_xml);
		}
		for(var i=0;i<4;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form Project Team
 * @formNo 102
 * @param button
 */
function form102_update_item(form)
{
	if(is_update_access('form102'))
	{
		var project_id=document.getElementById('form102_master').elements[2].value;
		var member=form.elements[0].value;
		var role=form.elements[1].value;
		var notes=form.elements[2].value;
		var status=form.elements[3].value;
		var data_id=form.elements[4].value;
		var last_updated=get_my_time();
		var data_xml="<project_team>" +
					"<id>"+data_id+"</id>" +
					"<project_id>"+project_id+"</project_id>" +
					"<member>"+member+"</member>" +
					"<role>"+role+"</role>" +
					"<notes>"+notes+"</notes>" +
					"<status>"+status+"</status>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</project_team>";
		if(is_online())
		{
			server_update_simple(data_xml);
		}
		else
		{
			local_update_simple(data_xml);
		}
		for(var i=0;i<4;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form Project Phases
 * @formNo 103
 * @param button
 */
function form103_update_item(form)
{
	if(is_update_access('form103'))
	{
		var project_id=document.getElementById('form103_master').elements[2].value;
		var phase=form.elements[0].value;
		var details=form.elements[1].value;
		var start_date=get_raw_time(form.elements[2].value);
		var due_date=get_raw_time(form.elements[3].value);
		var status=form.elements[4].value;
		var data_id=form.elements[5].value;
		var last_updated=get_my_time();
		var data_xml="<project_phases>" +
					"<id>"+data_id+"</id>" +
					"<project_id>"+project_id+"</project_id>" +
					"<phase_name>"+phase+"</phase_name>" +
					"<details>"+details+"</details>" +
					"<start_date>"+start_date+"</start_date>" +
					"<due_date>"+due_date+"</due_date>" +
					"<status>"+status+"</status>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</project_phases>";
		if(is_online())
		{
			server_update_simple(data_xml);
		}
		else
		{
			local_update_simple(data_xml);
		}
		for(var i=0;i<5;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
	}
	else
	{
		$("#modal2_link").click();
	}
}


/**
 * @form Manage Sale orders (multi-register)
 * @param button
 */
function form108_update_item(form)
{
	if(is_update_access('form108'))
	{
		var data_id=form.elements[0].value;
		var customer_name=form.elements[1].value;
		var order_date=get_raw_time(form.elements[2].value);
		var status=form.elements[3].value;
		var last_updated=get_my_time();
		var data_xml="<sale_orders>" +
					"<id>"+data_id+"</id>" +
					"<customer_name>"+customer_name+"</customer_name>" +
					"<order_date>"+order_date+"</order_date>" +
					"<status>"+status+"</status>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</sale_orders>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>sale_orders</tablename>" +
					"<link_to>form108</link_to>" +
					"<title>Updated</title>" +
					"<notes>Order no "+data_id+" for customer "+customer_name+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		update_row(data_xml,activity_xml);
		for(var i=0;i<4;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * formNo 109
 * form Asset Attributes
 * @param button
 */
function form109_update_item(form)
{
	if(is_update_access('form109'))
	{
		var asset=form.elements[0].value;
		var attribute=form.elements[1].value;
		var value=form.elements[2].value;
		var data_id=form.elements[3].value;
		var last_updated=get_my_time();
		var data_xml="<attributes>" +
					"<id>"+data_id+"</id>" +
					"<name>"+asset+"</name>" +
					"<type>asset</type>" +
					"<attribute>"+attribute+"</attribute>" +
					"<value>"+value+"</value>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</attributes>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>attributes</tablename>" +
					"<link_to>form109</link_to>" +
					"<title>Updated</title>" +
					"<notes>Attribute "+attribute+" for asset "+asset+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		update_row(data_xml,activity_xml);
		for(var i=0;i<3;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form Create Bill(loyalty)
 * @formNo 118
 * @param button
 */
function form118_update_form()
{
	if(is_update_access('form118'))
	{
		var form=document.getElementById("form118_master");

		var customer=form.elements[1].value;
		var bill_date=get_raw_time(form.elements[2].value);
		var bill_num=form.elements[3].value;

		var message_string="Bill from:"+encodeURIComponent(get_session_var('title'))+"\nAddress: "+get_session_var('address');

		var amount=0;
		var discount=0;
		var tax=0;
		var total=0;

		$("[id^='save_form118']").each(function(index)
		{
			var subform_id=$(this).attr('form');
			var subform=document.getElementById(subform_id);
			total+=parseFloat(subform.elements[4].value);
			amount+=parseFloat(subform.elements[5].value);
			discount+=parseFloat(subform.elements[6].value);
			tax+=parseFloat(subform.elements[7].value);

			message_string+="\nItem: "+subform.elements[0].value;
			message_string+=" Quantity: "+subform.elements[2].value;
			message_string+=" Total: "+subform.elements[4].value;
		});

		var data_id=form.elements[4].value;
		var transaction_id=form.elements[6].value;
		var last_updated=get_my_time();
		var offer_detail="";

		/////deleting existing free products
		var items_data="<bill_items>" +
				"<bill_id>"+data_id+"</bill_id>" +
				"<free_with>bill</free_with>" +
				"<last_updated upperbound='yes'>"+last_updated+"</last_updated>" +
				"</bill_items>";

		if(is_online())
		{
			server_delete_simple(items_data);
		}
		else
		{
			local_delete_simple(items_data);
		}
		///////////////////////////////////

		var offer_data="<offers>" +
				"<criteria_type>min amount crossed</criteria_type>" +
				"<criteria_amount upperbound='yes'>"+(amount-discount)+"</criteria_amount>" +
				"<offer_type exact='yes'>bill</offer_type>" +
				"<result_type></result_type>" +
				"<discount_percent></discount_percent>" +
				"<discount_amount></discount_amount>" +
				"<quantity_add_percent></quantity_add_percent>" +
				"<quantity_add_amount></quantity_add_amount>" +
				"<free_product_name></free_product_name>" +
				"<free_product_quantity></free_product_quantity>" +
				"<offer_detail></offer_detail>" +
				"<status array='yes'>active--extended</status>" +
				"</offers>";
		fetch_requested_data('',offer_data,function(offers)
		{
			offers.sort(function(a,b)
			{
				if(a.criteria_amount<b.criteria_amount)
				{	return 1;}
				else
				{	return -1;}
			});

			for(var i in offers)
			{
				if(offers[i].result_type=='discount')
				{
					if(offers[i].discount_percent!="" && offers[i].discount_percent!=0 && offers[i].discount_percent!="0")
					{
						var dis=parseFloat(((amount-discount)*parseInt(offers[i].discount_percent))/100);
						tax-=(tax*(dis/(amount-discount)));
						discount+=dis;
						total=amount-discount+tax;
					}
					else
					{
						var dis=parseFloat(offers[i].discount_amount)*(Math.floor((amount-discount)/parseFloat(offers[i].criteria_amount)));
						tax-=(tax*(dis/(amount-discount)));
						discount+=dis;
						total=amount-discount+tax;
					}
				}
				else if(offers[i].result_type=='product free')
				{
					var free_product_name=offers[i].free_product_name;
					var free_product_quantity=parseFloat(offers[i].free_product_quantity)*(Math.floor(parseFloat(amount-discount)/parseFloat(offers[i].criteria_amount)));

					get_inventory(free_product_name,'',function(free_quantities)
					{
						if(free_quantities>=free_product_quantity)
						{
							var free_batch_data="<bill_items count='1'>" +
									"<batch></batch>" +
									"<item_name exact='yes'>"+free_product_name+"</item_name>" +
									"</bill_items>";
							get_single_column_data(function(data)
							{
								var free_batch="";
								if(data.length>0)
								{
									free_batch=data[0];
								}

								var id=vUtil.newKey();
								rowsHTML="<tr>";
									rowsHTML+="<form id='form118_"+id+"'></form>";
					                	rowsHTML+="<td data-th='Item'>";
					                    	rowsHTML+="<input type='text' readonly='readonly' form='form118_"+id+"' value='"+free_product_name+"'>";
				                        rowsHTML+="</td>";
				                        rowsHTML+="<td data-th='Batch'>";
				                                rowsHTML+="<input type='text' required form='form118_"+id+"' value='"+free_batch+"'>";
				                        rowsHTML+="</td>";
				                        rowsHTML+="<td data-th='Quantity'>";
				                                rowsHTML+="<input type='number' readonly='readonly' required form='form118_"+id+"' value='0'>";
				                        rowsHTML+="</td>";
				                        rowsHTML+="<td data-th='Unit Price'>";
				                                rowsHTML+="<input type='number' readonly='readonly' required form='form118_"+id+"' value='"+free_product_quantity+"'>";
				                        rowsHTML+="</td>";
				                        rowsHTML+="<td data-th='Total'>";
				                                rowsHTML+="<input type='number' readonly='readonly' required form='form118_"+id+"' value='0'>";
				                        rowsHTML+="</td>";
				                        rowsHTML+="<td data-th='Action'>";
				                                rowsHTML+="<input type='hidden' form='form118_"+id+"' value='0'>";
				                                rowsHTML+="<input type='hidden' form='form118_"+id+"' value='0'>";
				                                rowsHTML+="<input type='hidden' form='form118_"+id+"' value='0'>";
				                                rowsHTML+="<input type='hidden' form='form118_"+id+"' value='free on the bill amount'>";
				                                rowsHTML+="<input type='hidden' form='form118_"+id+"' value='"+id+"'>";
				                                rowsHTML+="<input type='submit' class='save_icon' form='form118_"+id+"' id='save_form118_"+id+"' >";
				                                rowsHTML+="<input type='button' class='delete_icon' form='form118_"+id+"' id='delete_form118_"+id+"' onclick='form118_delete_item($(this));'>";
				                                rowsHTML+="<input type='hidden' form='form118_"+id+"' value=''>";
				                                rowsHTML+="<input type='hidden' form='form118_"+id+"' value=''>";
				                        rowsHTML+="</td>";
				                rowsHTML+="</tr>";

				                $('#form118_body').prepend(rowsHTML);

				            var bill_item_id=vUtil.newKey();
								var free_xml="<bill_items>" +
											"<id>"+bill_item_id+"</id>" +
											"<item_name>"+free_product_name+"</item_name>" +
											"<batch>"+free_batch+"</batch>" +
											"<unit_price>0</unit_price>" +
											"<quantity>"+free_product_quantity+"</quantity>" +
											"<amount>0</amount>" +
											"<total>0</total>" +
											"<discount>0</discount>" +
											"<offer></offer>" +
											"<type>free</type>" +
											"<tax>0</tax>" +
											"<bill_id>"+data_id+"</bill_id>" +
											"<free_with>bill</free_with>" +
											"<last_updated>"+last_updated+"</last_updated>" +
											"</bill_items>";

								if(is_online())
								{
									server_create_simple(free_xml);
								}
								else
								{
									local_create_simple(free_xml);
								}

							},free_batch_data);
						}
						else
						{
							$("#modal7_link").click();
						}
					});
				}
				offer_detail=offers[i].offer_detail;
				break;
			}

			var data_xml="<bills>" +
						"<id>"+data_id+"</id>" +
						"<customer_name>"+customer+"</customer_name>" +
						"<bill_date>"+bill_date+"</bill_date>" +
						"<amount>"+amount+"</amount>" +
						"<total>"+total+"</total>" +
						"<type>product</type>" +
						"<offer>"+offer_detail+"</offer>" +
						"<discount>"+discount+"</discount>" +
						"<tax>"+tax+"</tax>" +
						"<last_updated>"+last_updated+"</last_updated>" +
						"<transaction_id>"+transaction_id+"</transaction_id>" +
						"</bills>";
			var activity_xml="<activity>" +
						"<data_id>"+data_id+"</data_id>" +
						"<tablename>bills</tablename>" +
						"<link_to>form42</link_to>" +
						"<title>Updated</title>" +
						"<notes>Bill no "+bill_num+"</notes>" +
						"<updated_by>"+get_name()+"</updated_by>" +
						"</activity>";
			var transaction_xml="<transactions>" +
						"<id>"+transaction_id+"</id>" +
						"<trans_date>"+get_my_time()+"</trans_date>" +
						"<amount>"+total+"</amount>" +
						"<receiver>"+customer+"</receiver>" +
						"<giver>master</giver>" +
						"<tax>"+tax+"</tax>" +
						"<last_updated>"+last_updated+"</last_updated>" +
						"</transactions>";
			if(is_online())
			{
				server_update_row(data_xml,activity_xml);
				server_update_simple(transaction_xml);
			}
			else
			{
				local_update_row(data_xml,activity_xml);
				local_update_simple(transaction_xml);
			}

			var total_row="<tr><td colspan='3' data-th='Total'>Total</td>" +
						"<td>Amount:</br>Discount: </br>Tax: </br>Total: </td>" +
						"<td>Rs. "+amount+"</br>" +
						"Rs. "+discount+"</br>" +
						"Rs. "+tax+"</br>" +
						"Rs. "+total+"</td>" +
						"<td></td>" +
						"</tr>";
			$('#form118_foot').html(total_row);

			message_string+="\nAmount: "+amount;
			message_string+="\ndiscount: "+discount;
			message_string+="\nTax: "+tax;
			message_string+="\nTotal: "+total;

			var subject="Bill from "+get_session_var('title');
			$('#form118_share').show();
			$('#form118_share').off('click');
			$('#form118_share').on('click',function()
			{
				modal44_action(customer,subject,message_string);
			});

			var loyalty_points_data="<loyalty_points>"+
									"<id></id>"+
									"<points_addition>"+program.points_addition+"</points_addition>"+
									"<source exact='yes'></source>"+
									"<source_id exact='yes'>"+data_id+"</source_id>"+
									"</loyalty_points>";
			fetch_requested_data('',loyalty_points_data,function(programs)
			{
				var new_programs=vUtil.arrayUnique(programs);
				new_programs.forEach(function(program)
				{
					var points=parseFloat(program.points_addition)*parseFloat(total);
					var loyalty_points_xml="<loyalty_points>"+
						"<id></id>"+
						"<points>"+points+"</points>"+
						"<date>"+vTime.date()+"</date>"+
						"<last_updated>"+last_updated+"</last_updated>"+
						"</loyalty_points>";
					if(is_online())
					{
						server_update_simple(loyalty_points_xml);
					}
					else
					{
						local_update_simple(loyalty_points_xml);
					}
				});
			});

			var payment_data="<payments>" +
					"<id></id>" +
					"<bill_id exact='yes'>"+data_id+"</bill_id>" +
					"</payments>";
			get_single_column_data(function(payments)
			{
				for(var y in payments)
				{
					var payment_xml="<payments>" +
								"<id>"+payments[y]+"</id>" +
								"<type>received</type>" +
								"<total_amount>"+total+"</total_amount>" +
								"<acc_name>"+customer+"</acc_name>" +
								"<transaction_id>"+payments[y]+"</transaction_id>" +
								"<bill_id>"+data_id+"</bill_id>" +
								"<last_updated>"+last_updated+"</last_updated>" +
								"</payments>";
					var pt_xml="<transactions>" +
								"<id>"+payments[y]+"</id>" +
								"<amount>"+total+"</amount>" +
								"<receiver>master</receiver>" +
								"<giver>"+customer+"</giver>" +
								"<tax>0</tax>" +
								"<last_updated>"+last_updated+"</last_updated>" +
								"</transactions>";
					if(is_online())
					{
						server_update_simple_func(payment_xml,function()
						{
							modal26_action(payments[y]);
						});
					}
					else
					{
						local_update_simple_func(payment_xml,function()
						{
							modal26_action(payments[y]);
						});
					}
					break;
				}
			},payment_data);
		});
		$("[id^='save_form118_']").click();
	}
	else
	{
		$("#modal2_link").click();
	}
}


/**
 * @form Create Bill(multiple registers, unbilled items)
 * @formNo 119
 * @param button
 */
function form119_update_form()
{
	if(is_update_access('form119'))
	{
		var form=document.getElementById("form119_master");

		var customer=form.elements[1].value;
		var bill_type=form.elements[2].value;
		var bill_date=get_raw_time(form.elements[3].value);
		var bill_num=form.elements[4].value;

		var message_string="Bill from:"+encodeURIComponent(get_session_var('title'))+"\nAddress: "+get_session_var('address');

		var amount=0;
		var discount=0;
		var tax=0;
		var total=0;

		$("[id^='save_form119_']").each(function(index)
		{
			var subform_id=$(this).attr('form');
			var subform=document.getElementById(subform_id);
			amount+=parseFloat(subform.elements[6].value);
			discount+=parseFloat(subform.elements[7].value);
			tax+=parseFloat(subform.elements[8].value);
			total+=parseFloat(subform.elements[9].value);

			message_string+="\nItem: "+subform.elements[0].value;
			message_string+=" Quantity: "+subform.elements[2].value;
			message_string+=" Total: "+subform.elements[4].value;
		});

		var data_id=form.elements[6].value;
		var transaction_id=form.elements[8].value;
		var last_updated=get_my_time();
		var offer_detail="";

		/////deleting existing free products
		var items_data="<bill_items>" +
				"<bill_id>"+data_id+"</bill_id>" +
				"<free_with>bill</free_with>" +
				"<last_updated upperbound='yes'>"+last_updated+"</last_updated>" +
				"</bill_items>";

		if(is_online())
		{
			server_delete_simple(items_data);
		}
		else
		{
			local_delete_simple(items_data);
		}
		///////////////////////////////////

		var offer_data="<offers>" +
				"<criteria_type>min amount crossed</criteria_type>" +
				"<criteria_amount upperbound='yes'>"+(amount-discount)+"</criteria_amount>" +
				"<offer_type exact='yes'>bill</offer_type>" +
				"<result_type></result_type>" +
				"<discount_percent></discount_percent>" +
				"<discount_amount></discount_amount>" +
				"<quantity_add_percent></quantity_add_percent>" +
				"<quantity_add_amount></quantity_add_amount>" +
				"<free_product_name></free_product_name>" +
				"<free_product_quantity></free_product_quantity>" +
				"<offer_detail></offer_detail>" +
				"<status array='yes'>active--extended</status>" +
				"</offers>";
		fetch_requested_data('',offer_data,function(offers)
		{
			offers.sort(function(a,b)
			{
				if(a.criteria_amount<b.criteria_amount)
				{	return 1;}
				else
				{	return -1;}
			});

			for(var i in offers)
			{
				if(offers[i].result_type=='discount')
				{
					if(offers[i].discount_percent!="" && offers[i].discount_percent!=0 && offers[i].discount_percent!="0")
					{
						var dis=parseFloat(((amount-discount)*parseInt(offers[i].discount_percent))/100);
						tax-=(tax*(dis/(amount-discount)));
						discount+=dis;
						total=amount-discount+tax;
					}
					else
					{
						var dis=parseFloat(offers[i].discount_amount)*(Math.floor((amount-discount)/parseFloat(offers[i].criteria_amount)));
						tax-=(tax*(dis/(amount-discount)));
						discount+=dis;
						total=amount-discount+tax;
					}
				}
				else if(offers[i].result_type=='product free')
				{
					var free_product_name=offers[i].free_product_name;
					var free_product_quantity=parseFloat(offers[i].free_product_quantity)*(Math.floor(parseFloat(amount-discount)/parseFloat(offers[i].criteria_amount)));

					get_inventory(free_product_name,'',function(free_quantities)
					{
						if(free_quantities>=free_product_quantity)
						{
							var free_batch_data="<bill_items count='1'>" +
									"<batch></batch>" +
									"<item_name exact='yes'>"+free_product_name+"</item_name>" +
									"</bill_items>";
							get_single_column_data(function(data)
							{
								var free_batch="";
								if(data.length>0)
								{
									free_batch=data[0];
								}

								var id=vUtil.newKey();
								var rowsHTML="<tr>";
								rowsHTML+="<form id='form119_"+id+"'></form>";
									rowsHTML+="<td data-th='Product Name'>";
										rowsHTML+="<label id='form119_product_make_"+id+"'></label>";
										rowsHTML+="<br><v2></v2><textarea required form='form119_"+id+"' readonly='readonly'>"+free_product_name+"</textarea>";
										rowsHTML+="<img src='"+server_root+"/images/add_image.png' class='add_image' title='Add new product' onclick='modal14_action();'>";
									rowsHTML+="</td>";
									rowsHTML+="<td data-th='Batch'>";
										rowsHTML+="<input type='text' required form='form119_"+id+"' value='"+free_batch+"'>";
										rowsHTML+="<img src='"+server_root+"/images/add_image.png' class='add_image' title='Add new batch' onclick='modal22_action();'>";
										rowsHTML+="<br><v2>Expiry: </v2><label id='form119_exp_"+id+"'></label>";
									rowsHTML+="</td>";
									rowsHTML+="<td data-th='Quantity'>";
										rowsHTML+="<v1>Bought: </v1><input type='number' min='0' readonly='readonly' required form='form119_"+id+"' step='any' value='0'>";
										rowsHTML+="<br><v2>Free: </v2><input type='number' min='0' value='0' readonly='readonly' required form='form119_"+id+"' step='any' value='"+free_product_quantity+"'>";
									rowsHTML+="</td>";
									rowsHTML+="<td data-th='Price'>";
										rowsHTML+="<v1>Sale: </v1>Rs. <input type='number' required min='0' readonly='readonly' form='form119_"+id+"' step='any'>";
										rowsHTML+="<br><v2>MRP: </v2>Rs. <input type='number' min='0' readonly='readonly' form='form119_"+id+"' step='any'>";
									rowsHTML+="</td>";
									rowsHTML+="<td data-th='Total'>";
										rowsHTML+="<v1>Amount: </v1>Rs. <input type='number' required min='0' form='form119_"+id+"' readonly='readonly' step='any' value='0'>";
										rowsHTML+="<input type='hidden' value='0' form='form119_"+id+"' readonly='readonly'>";
										rowsHTML+="<br><v2>Tax: </v2>Rs. <input type='number' required min='0' value='0' form='form119_"+id+"' readonly='readonly' step='any' value='0'>";
									rowsHTML+="</td>";
									rowsHTML+="<td data-th='Action'>";
										rowsHTML+="<input type='hidden' form='form119_"+id+"' value='0'>";
										rowsHTML+="<input type='hidden' form='form119_"+id+"' value='free with "+name+"'>";
										rowsHTML+="<input type='hidden' form='form119_"+id+"' value='"+id+"'>";
										rowsHTML+="<input type='button' class='submit_hidden' form='form119_"+id+"' id='save_form119_"+id+"' >";
										rowsHTML+="<input type='button' class='delete_icon' form='form119_"+id+"' id='delete_form119_"+id+"' onclick='form119_delete_item($(this));'>";
									rowsHTML+="</td>";
								rowsHTML+="</tr>";

				            $('#form119_body').prepend(rowsHTML);

				            var make_data="<product_master>" +
										"<make></make>" +
										"<name exact='yes'>"+free_product_name+"</name>" +
										"</product_master>";
								get_single_column_data(function(data)
								{
									if(data.length>0)
									{
										document.getElementById('form119_product_make_'+id).innerHTML=data[0]+":";
									}
								},make_data);

								var exp_data="<product_instances>" +
										"<expiry></expiry>" +
										"<product_name exact='yes'>"+free_product_name+"</product_name>" +
										"<batch exact='yes'>"+free_batch+"</batch>" +
										"</product_instances>";
								get_single_column_data(function(data)
								{
									if(data.length>0)
									{
										document.getElementById('form119_exp_'+id).innerHTML=get_my_past_date(data[0]);
									}
								},exp_data);
								var free_xml="<bill_items>" +
											"<id>"+id+"</id>" +
											"<item_name>"+free_product_name+"</item_name>" +
											"<batch>"+free_batch+"</batch>" +
											"<unit_price>0</unit_price>" +
											"<mrp>0</mrp>" +
											"<p_quantity>0</p_quantity>" +
											"<f_quantity>"+free_product_quantity+"</f_quantity>" +
											"<quantity>"+free_product_quantity+"</quantity>" +
											"<amount>0</amount>" +
											"<total>0</total>" +
											"<discount>0</discount>" +
											"<offer></offer>" +
											"<type>free</type>" +
											"<tax>0</tax>" +
											"<bill_id>"+data_id+"</bill_id>" +
											"<free_with>bill</free_with>" +
											"<last_updated>"+last_updated+"</last_updated>" +
											"</bill_items>";
								if(is_online())
								{
									server_create_simple(free_xml);
								}
								else
								{
									local_create_simple(free_xml);
								}

							},free_batch_data);
						}
						else
						{
							$("#modal7_link").click();
						}
					});
				}
				offer_detail=offers[i].offer_detail;
				break;
			}

			var data_xml="<bills>" +
						"<id>"+data_id+"</id>" +
						"<customer_name>"+customer+"</customer_name>" +
						"<bill_date>"+bill_date+"</bill_date>" +
						"<amount>"+amount+"</amount>" +
						"<total>"+total+"</total>" +
						"<type>product</type>" +
						"<billing_type>"+bill_type+"</billing_type>" +
						"<offer>"+offer_detail+"</offer>" +
						"<discount>"+discount+"</discount>" +
						"<tax>"+tax+"</tax>" +
						"<last_updated>"+last_updated+"</last_updated>" +
						"<transaction_id>"+transaction_id+"</transaction_id>" +
						"</bills>";
			var activity_xml="<activity>" +
						"<data_id>"+data_id+"</data_id>" +
						"<tablename>bills</tablename>" +
						"<link_to>form92</link_to>" +
						"<title>Updated</title>" +
						"<notes>Bill no "+bill_num+"</notes>" +
						"<updated_by>"+get_name()+"</updated_by>" +
						"</activity>";
			var transaction_xml="<transactions>" +
						"<id>"+transaction_id+"</id>" +
						"<trans_date>"+get_my_time()+"</trans_date>" +
						"<amount>"+total+"</amount>" +
						"<receiver>"+customer+"</receiver>" +
						"<giver>master</giver>" +
						"<tax>"+tax+"</tax>" +
						"<last_updated>"+last_updated+"</last_updated>" +
						"</transactions>";
			if(is_online())
			{
				server_update_row(data_xml,activity_xml);
				server_update_simple(transaction_xml);
			}
			else
			{
				local_update_row(data_xml,activity_xml);
				local_update_simple(transaction_xml);
			}

			var total_row="<tr><td colspan='3' data-th='Total'>Total</td>" +
							"<td>Amount:</br>Discount: </br>Tax: </br>Total: </td>" +
							"<td>Rs. "+amount+"</br>" +
							"Rs. "+discount+"</br>" +
							"Rs. "+tax+"</br>" +
							"Rs. "+total+"</td>" +
							"<td></td>" +
							"</tr>";
			$('#form119_foot').html(total_row);

			message_string+="\nAmount: "+amount;
			message_string+="\ndiscount: "+discount;
			message_string+="\nTax: "+tax;
			message_string+="\nTotal: "+total;

			var subject="Bill from "+get_session_var('title');
			$('#form119_share').show();
			$('#form119_share').off('click');
			$('#form119_share').on('click',function()
			{
				modal44_action(customer,subject,message_string);
			});

			var payment_data="<payments>" +
					"<id></id>" +
					"<bill_id exact='yes'>"+data_id+"</bill_id>" +
					"</payments>";
			get_single_column_data(function(payments)
			{

				for(var y in payments)
				{
					var payment_xml="<payments>" +
								"<id>"+payments[y]+"</id>" +
								"<type>received</type>" +
								"<total_amount>"+total+"</total_amount>" +
								"<acc_name>"+customer+"</acc_name>" +
								"<transaction_id>"+payments[y]+"</transaction_id>" +
								"<bill_id>"+data_id+"</bill_id>" +
								"<last_updated>"+last_updated+"</last_updated>" +
								"</payments>";
					var pt_xml="<transactions>" +
								"<id>"+payments[y]+"</id>" +
								"<amount>"+total+"</amount>" +
								"<receiver>master</receiver>" +
								"<giver>"+customer+"</giver>" +
								"<tax>0</tax>" +
								"<last_updated>"+last_updated+"</last_updated>" +
								"</transactions>";
					if(is_online())
					{
						server_update_simple_func(payment_xml,function()
						{
							modal26_action(payments[y],function(mode,paid_amount)
							{
								document.getElementById('form119_payment_info').innerHTML="Payment: "+mode+"<br>Paid: Rs."+paid_amount;
							});
						});
					}
					else
					{
						local_update_simple_func(payment_xml,function()
						{
							modal26_action(payments[y],function(mode,paid_amount)
							{
								document.getElementById('form119_payment_info').innerHTML="Payment: "+mode+"<br>Paid: Rs."+paid_amount;
							});
						});
					}
					break;
				}
			},payment_data);
		});
		$("[id^='save_form119_']").click();
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form New Supplier Bill (unbilled item)
 * @param button
 */
function form122_update_form()
{
	if(is_update_access('form122'))
	{
		var form=document.getElementById("form122_master");

		var supplier=form.elements['supplier'].value;
		var bill_id=form.elements['bill_num'].value;
		var bill_date=get_raw_time(form.elements['bill_date'].value);
		var entry_date=get_raw_time(form.elements['entry_date'].value);
		var data_id=form.elements['bill_id'].value;
		var transaction_id=form.elements['t_id'].value;
		var last_updated=get_my_time();
		var save_button=form.elements['save'];
		var order_id=form.elements['order_id'].value;
		var order_num=form.elements['po_num'].value;
		var share_button=form.elements['share'];

		var cst='no';
		if(form.elements['cst'].checked)
		{
			cst='yes';
		}

		var bt=get_session_var('title');
		$(share_button).show();
		$(share_button).click(function()
		{
			modal101_action(bt+' - Purchase bill # '+bill_id,supplier,'supplier',function (func)
			{
				print_form122(func);
			});
		});

		var total=0;
		var tax=0;
		var amount=0;
		var total_accepted=0;
		var total_quantity=0;

		$("[id^='save_form122']").each(function(index)
		{
			var subform_id=$(this).attr('form');
			var subform=document.getElementById(subform_id);
			if(subform.elements[1].value=="")
			{
				$(this).parent().parent().remove();
			}
			else
			{
				if(subform.elements[12].value=='accepted')
				{
					if(!isNaN(parseFloat(subform.elements[7].value)))
						amount+=parseFloat(subform.elements[7].value);
					if(!isNaN(parseFloat(subform.elements[8].value)))
						tax+=parseFloat(subform.elements[8].value);
					if(!isNaN(parseFloat(subform.elements[4].value)))
						total_accepted+=parseFloat(subform.elements[4].value);
				}
				if(!isNaN(parseFloat(subform.elements[4].value)))
					total_quantity+=parseFloat(subform.elements[4].value);
			}
		});

		amount=vUtil.round(amount,2);
		tax=vUtil.round(tax,2);
		total=amount+tax;

		var total_row="<tr><td colspan='3' data-th='Total'>Total Accepted Quantity: "+total_accepted+"<br>Total Rejected Quantity: "+(total_quantity-total_accepted)+"</td>" +
					"<td>Amount:</br>Tax: </br>Total: </td>" +
					"<td>Rs. "+amount+"</br>" +
					"Rs. "+tax+"</br>" +
					"Rs. "+total+"</td>" +
					"<td></td>" +
					"</tr>";

		$('#form122_foot').html(total_row);

		var data_xml="<supplier_bills>" +
					"<id>"+data_id+"</id>" +
					"<bill_id>"+bill_id+"</bill_id>" +
					"<order_id>"+order_id+"</order_id>" +
					"<order_num>"+order_num+"</order_num>" +
					"<supplier>"+supplier+"</supplier>" +
					"<bill_date>"+bill_date+"</bill_date>" +
					"<entry_date>"+entry_date+"</entry_date>" +
					"<total>"+total+"</total>" +
					"<discount>0</discount>" +
					"<amount>"+amount+"</amount>" +
					"<tax>"+tax+"</tax>" +
					"<cst>"+cst+"</cst>" +
					"<transaction_id>"+transaction_id+"</transaction_id>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</supplier_bills>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>supplier_bills</tablename>" +
					"<link_to>form53</link_to>" +
					"<title>Updated</title>" +
					"<notes>Supplier Bill # "+data_id+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		var transaction_xml="<transactions>" +
					"<id>"+transaction_id+"</id>" +
					"<trans_date>"+get_my_time()+"</trans_date>" +
					"<amount>"+total+"</amount>" +
					"<receiver>master</receiver>" +
					"<giver>"+supplier+"</giver>" +
					"<tax>"+(-tax)+"</tax>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</transactions>";
		update_row(data_xml,activity_xml);
		update_simple(transaction_xml);

		var po_data="<purchase_orders>"+
					"<id>"+order_id+"</id>" +
					"<bill_id></bill_id>" +
					"<total_quantity></total_quantity>"+
					"<quantity_received></quantity_received>"+
					"<quantity_accepted></quantity_accepted>"+
					"</purchase_orders>";
		fetch_requested_data('',po_data,function (porders)
		{
			if(porders.length>0)
			{
				var id_object_array=vUtil.jsonParse(porders[0].bill_id);

				for(var k in id_object_array)
				{
					if(id_object_array[k].bill_id==data_id)
					{
						id_object_array[k].bill_num=bill_id;
						id_object_array[k].total_received=total_quantity;
						id_object_array[k].total_accepted=total_accepted;
						break;
					}
				}

				var quantity_accepted=0;
				var quantity_received=0;
				var quantity_qc_pending=0;

				for(var x in id_object_array)
				{
					quantity_received+=parseFloat(id_object_array[x].total_received);
					quantity_accepted+=parseFloat(id_object_array[x].total_accepted);
				}

				if(porders[0].quantity_received=="" || porders[0].quantity_received=='null')
				{
					porders[0].quantity_received=0;
				}

				if(parseFloat(porders[0].quantity_received)>quantity_received)
				{
					quantity_qc_pending=parseFloat(porders[0].quantity_received)-quantity_received;
					quantity_received=parseFloat(porders[0].quantity_received);
				}

				var status='partially received';
				if(parseFloat(porders[0].total_quantity)<=quantity_accepted)
				{
					status='completely received';
				}

				var new_bill_id=JSON.stringify(id_object_array);

				var po_xml="<purchase_orders>" +
						"<id>"+order_id+"</id>" +
						"<bill_id>"+new_bill_id+"</bill_id>" +
						"<quantity_received>"+quantity_received+"</quantity_received>"+
						"<quantity_accepted>"+quantity_accepted+"</quantity_accepted>"+
						"<quantity_qc_pending>"+quantity_qc_pending+"</quantity_qc_pending>"+
						"<status>"+status+"</status>" +
						"<last_updated>"+last_updated+"</last_updated>" +
						"</purchase_orders>";
				update_simple(po_xml);
			}
		});

		var payment_data="<payments>" +
				"<id></id>" +
				"<bill_id exact='yes'>"+data_id+"</bill_id>" +
				"</payments>";
		get_single_column_data(function(payments)
		{
			for(var y in payments)
			{
				var payment_xml="<payments>" +
							"<id>"+payments[y]+"</id>" +
							"<type>paid</type>" +
							"<total_amount>"+total+"</total_amount>" +
							"<acc_name>"+supplier+"</acc_name>" +
							"<transaction_id>"+payments[y]+"</transaction_id>" +
							"<bill_id>"+data_id+"</bill_id>" +
							"<last_updated>"+last_updated+"</last_updated>" +
							"</payments>";
				var pt_xml="<transactions>" +
							"<id>"+payments[y]+"</id>" +
							"<amount>"+total+"</amount>" +
							"<receiver>"+supplier+"</receiver>" +
							"<giver>master</giver>" +
							"<tax>0</tax>" +
							"<last_updated>"+last_updated+"</last_updated>" +
							"</transactions>";
				update_simple_func(payment_xml,function()
				{
					//modal28_action(payments[y]);
				});
				break;
			}
		},payment_data);

		$("[id^='save_form122_']").click();
	}
	else
	{
		$("#modal2_link").click();
	}
}


/**
 * formNo 125
 * form Customer Accounts
 * @param button
 */
function form125_update_item(form)
{
	if(is_update_access('form125'))
	{
		var customer=form.elements[0].value;
		var username=form.elements[1].value;
		var password=form.elements[2].value;
		var status=form.elements[3].value;
		var data_id=form.elements[4].value;
		var last_updated=get_my_time();
		var domain=get_domain();
		var salt='$2a$10$'+domain+'1234567891234567891234';
		var salt_22=salt.substring(0, 29);

		var bcrypt = new bCrypt();
		bcrypt.hashpw(password, salt_22, function(newhash)
		{
			var data_xml="<accounts>" +
							"<id>"+data_id+"</id>" +
							"<status>"+status+"</status>" +
							"<password>"+newhash+"</password>"+
							"<last_updated>"+last_updated+"</last_updated>" +
							"</accounts>";
			if(password=='null' || password=='undefined' || password=="")
			{
				data_xml="<accounts>" +
							"<id>"+data_id+"</id>" +
							"<status>"+status+"</status>" +
							"<last_updated>"+last_updated+"</last_updated>" +
							"</accounts>";
			}
			var activity_xml="<activity>" +
						"<data_id>"+data_id+"</data_id>" +
						"<tablename>accounts</tablename>" +
						"<link_to>form125</link_to>" +
						"<title>Updated</title>" +
						"<notes>Account for username "+username+"</notes>" +
						"<updated_by>"+get_name()+"</updated_by>" +
						"</activity>";
			update_row(data_xml,activity_xml);
			for(var i=0;i<5;i++)
			{
				$(form.elements[i]).attr('readonly','readonly');
			}
		});
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form Job Order
 * @param button
 */
function form130_update_form()
{
	if(is_create_access('form130'))
	{
		var form=document.getElementById("form130_master");

		var customer=form.elements[1].value;
		var bill_date=get_raw_time(form.elements[2].value);

		var message_string="Bill from:"+encodeURIComponent(get_session_var('title'))+"\nAddress: "+get_session_var('address');
		var mail_string="Bill from:"+encodeURIComponent(get_session_var('title'))+"\nAddress: "+get_session_var('address');

		var amount=0;
		var discount=0;
		var tax=0;
		var total=0;

		$("[id^='save_form130']").each(function(index)
		{
			var subform_id=$(this).attr('form');
			var subform=document.getElementById(subform_id);
			total+=parseFloat(subform.elements[4].value);
			amount+=parseFloat(subform.elements[5].value);
			discount+=parseFloat(subform.elements[6].value);
			tax+=parseFloat(subform.elements[7].value);

			message_string+="\nItem: "+subform.elements[0].value;
			message_string+=" Price: "+subform.elements[3].value;
			message_string+=" Total: "+subform.elements[4].value;
		});

		var data_id=form.elements[3].value;
		var transaction_id=form.elements[5].value;
		var last_updated=get_my_time();
		var offer_detail="";

		/////deleting existing free services
		var items_data="<bill_items>" +
				"<bill_id>"+data_id+"</bill_id>" +
				"<free_with>bill</free_with>" +
				"<last_updated upperbound='yes'>"+last_updated+"</last_updated>" +
				"</bill_items>";

		delete_simple(items_data);
		///////////////////////////////////

		/////deleting existing free products
		var items_data="<bill_items>" +
				"<bill_id>"+data_id+"</bill_id>" +
				"<free_with>bill</free_with>" +
				"<last_updated upperbound='yes'>"+last_updated+"</last_updated>" +
				"</bill_items>";
		delete_simple(items_data);

		var offer_data="<offers>" +
				"<criteria_type>min amount crossed</criteria_type>" +
				"<criteria_amount upperbound='yes'>"+(amount-discount)+"</criteria_amount>" +
				"<offer_type exact='yes'>bill</offer_type>" +
				"<result_type></result_type>" +
				"<discount_percent></discount_percent>" +
				"<discount_amount></discount_amount>" +
				"<quantity_add_percent></quantity_add_percent>" +
				"<quantity_add_amount></quantity_add_amount>" +
				"<free_product_name></free_product_name>" +
				"<free_product_quantity></free_product_quantity>" +
				"<free_service_name></free_service_name>" +
				"<offer_detail></offer_detail>" +
				"<status array='yes'>active--extended</status>" +
				"</offers>";
		fetch_requested_data('',offer_data,function(offers)
		{
			offers.sort(function(a,b)
			{
				if(a.criteria_amount<b.criteria_amount)
				{	return 1;}
				else
				{	return -1;}
			});

			for(var i in offers)
			{
				if(offers[i].result_type=='discount')
				{
					if(offers[i].discount_percent!="" && offers[i].discount_percent!=0 && offers[i].discount_percent!="0")
					{
						var dis=parseFloat(((amount-discount)*parseInt(offers[i].discount_percent))/100);
						tax-=(tax*(dis/(amount-discount)));
						discount+=dis;
						total=amount-discount+tax;
					}
					else
					{
						var dis=parseFloat(offers[i].discount_amount)*(Math.floor((amount-discount)/parseFloat(offers[i].criteria_amount)));
						tax-=(tax*(dis/(amount-discount)));
						discount+=dis;
						total=amount-discount+tax;
					}
				}
				else if(offers[i].result_type=='product free')
				{
					var free_product_name=offers[i].free_product_name;
					var free_product_quantity=parseFloat(offers[i].free_product_quantity)*(Math.floor(parseFloat(amount-discount)/parseFloat(offers[i].criteria_amount)));

					get_inventory(free_product_name,'',function(free_quantities)
					{
						if(free_quantities>=free_product_quantity)
						{
							var free_batch_data="<bill_items count='1'>" +
									"<batch></batch>" +
									"<item_name exact='yes'>"+free_product_name+"</item_name>" +
									"</bill_items>";
							get_single_column_data(function(data)
							{
								var free_batch="";
								if(data.length>0)
								{
									free_batch=data[0];
								}

								var id=vUtil.newKey();
								rowsHTML="<tr>";
									rowsHTML+="<form id='form130_"+id+"'></form>";
					                	rowsHTML+="<td>";
					                    	rowsHTML+="<input type='text' readonly='readonly' form='form130_"+id+"' value='"+free_product_name+"'>";
				                        rowsHTML+="</td>";
				                        rowsHTML+="<td>";
				                                rowsHTML+="<input type='text' required form='form130_"+id+"' value='"+free_batch+"'>";
				                        rowsHTML+="</td>";
				                        rowsHTML+="<td>";
				                                rowsHTML+="<input type='number' readonly='readonly' required form='form130_"+id+"' value='"+free_product_quantity+"'>";
				                        rowsHTML+="</td>";
				                        rowsHTML+="<td>";
				                        	rowsHTML+="<input type='number' readonly='readonly' required form='form130_"+id+"' value='0'>";
				                        rowsHTML+="</td>";
				                        rowsHTML+="<td>";
				                                rowsHTML+="<input type='number' readonly='readonly' required form='form130_"+id+"' value='0'>";
				                        rowsHTML+="</td>";
				                        rowsHTML+="<td>";
				                                rowsHTML+="<input type='hidden' form='form130_"+id+"' value='0'>";
				                                rowsHTML+="<input type='hidden' form='form130_"+id+"' value='0'>";
				                                rowsHTML+="<input type='hidden' form='form130_"+id+"' value='0'>";
				                                rowsHTML+="<input type='hidden' form='form130_"+id+"' value='free on the bill amount'>";
				                                rowsHTML+="<input type='hidden' form='form130_"+id+"' value='"+id+"'>";
				                                rowsHTML+="<input type='button' class='save_icon' form='form130_"+id+"' id='save_form130_"+id+"' >";
				                                rowsHTML+="<input type='button' class='delete_icon' form='form130_"+id+"' id='delete_form130_"+id+"' onclick='form130_delete_item($(this));'>";
				                                rowsHTML+="<input type='hidden' form='form130_"+id+"' value=''>";
				                                rowsHTML+="<input type='hidden' form='form130_"+id+"' value=''>";
				                                rowsHTML+="<input type='hidden' form='form130_"+id+"' value=''>";
				                        rowsHTML+="</td>";
				                rowsHTML+="</tr>";

				                $('#form130_body').prepend(rowsHTML);

				                var free_xml="<bill_items>" +
											"<id>"+id+"</id>" +
											"<item_name>"+free_product_name+"</item_name>" +
											"<batch>"+free_batch+"</batch>" +
											"<unit_price>0</unit_price>" +
											"<quantity>"+free_product_quantity+"</quantity>" +
											"<amount>0</amount>" +
											"<total>0</total>" +
											"<discount>0</discount>" +
											"<offer></offer>" +
											"<type>free</type>" +
											"<tax>0</tax>" +
											"<bill_id>"+data_id+"</bill_id>" +
											"<free_with>bill</free_with>" +
											"<last_updated>"+last_updated+"</last_updated>" +
											"</bill_items>";

								if(is_online())
								{
									server_create_simple(free_xml);
								}
								else
								{
									local_create_simple(free_xml);
								}

							},free_batch_data);
						}
						else
						{
							$("#modal7_link").click();
						}
					});
				}
				else if(offers[i].result_type=='service free')
				{
					var free_service_name=offers[i].free_service_name;
					var id=vUtil.newKey();
					rowsHTML="<tr>";
						rowsHTML+="<form id='form130_"+id+"'></form>";
		                	rowsHTML+="<td>";
		                    	rowsHTML+="<input type='text' readonly='readonly' form='form130_"+id+"' value='"+free_service_name+"'>";
	                        rowsHTML+="</td>";
	                        rowsHTML+="<td>";
	                                rowsHTML+="<input type='text' readonly='readonly' required form='form130_"+id+"'>";
	                        rowsHTML+="</td>";
	                        rowsHTML+="<td>";
	                                rowsHTML+="<textarea readonly='readonly' required form='form130_"+id+"'>free service</textarea>";
	                        rowsHTML+="</td>";
	                        rowsHTML+="<td>";
	                        	rowsHTML+="<input type='number' readonly='readonly' required form='form130_"+id+"' value='0'>";
	                        rowsHTML+="</td>";
	                        rowsHTML+="<td>";
	                                rowsHTML+="<input type='number' readonly='readonly' required form='form130_"+id+"' value='0'>";
	                        rowsHTML+="</td>";
	                        rowsHTML+="<td>";
	                                rowsHTML+="<input type='hidden' form='form130_"+id+"' value='0'>";
	                                rowsHTML+="<input type='hidden' form='form130_"+id+"' value='0'>";
	                                rowsHTML+="<input type='hidden' form='form130_"+id+"' value='0'>";
	                                rowsHTML+="<input type='hidden' form='form130_"+id+"' value='free on the bill amount'>";
	                                rowsHTML+="<input type='hidden' form='form130_"+id+"' value='"+id+"'>";
	                                rowsHTML+="<input type='submit' class='save_icon' form='form130_"+id+"' id='save_form130_"+id+"' >";
	                                rowsHTML+="<input type='button' class='delete_icon' form='form130_"+id+"' id='delete_form130_"+id+"' onclick='form130_delete_item($(this));'>";
	                                rowsHTML+="<input type='hidden' form='form130_"+id+"' value=''>";
	                                rowsHTML+="<input type='hidden' form='form130_"+id+"' value=''>";
	                                rowsHTML+="<input type='hidden' form='form130_"+id+"' value=''>";
	                        rowsHTML+="</td>";
	                rowsHTML+="</tr>";

	                $('#form130_body').prepend(rowsHTML);

	                var free_pre_requisite_data="<pre_requisites>" +
							"<type exact='yes'>service</type>" +
							"<requisite_type exact='yes'>task</requisite_type>" +
							"<name exact='yes'>"+free_service_name+"</name>" +
							"<requisite_name></requisite_name>" +
							"<quantity></quantity>" +
							"</pre_requisites>";
					fetch_requested_data('',free_pre_requisite_data,function(free_pre_requisites)
					{
		                var free_xml="<bill_items>" +
									"<id>"+id+"</id>" +
									"<item_name>"+free_service_name+"</item_name>" +
									"<staff></staff>" +
									"<notes>free service</notes>" +
									"<unit_price>0</unit_price>" +
									"<amount>0</amount>" +
									"<total>0</total>" +
									"<discount>0</discount>" +
									"<offer></offer>" +
									"<type>free</type>" +
									"<tax>0</tax>" +
									"<bill_id>"+data_id+"</bill_id>" +
									"<free_with>bill</free_with>" +
									"<last_updated>"+last_updated+"</last_updated>" +
									"</bill_items>";

						if(is_online())
						{
							server_create_simple(free_xml);
						}
						else
						{
							local_create_simple(free_xml);
						}

						free_pre_requisites.forEach(function(free_pre_requisite)
						{
							var task_id=vUtil.newKey();
							var task_xml="<task_instances>" +
									"<id>"+task_id+"</id>" +
									"<name>"+free_pre_requisite.name+"</name>" +
									"<assignee></assignee>" +
									"<t_initiated>"+get_my_time()+"</t_initiated>" +
									"<t_due>"+get_task_due_period()+"</t_due>" +
									"<status>pending</status>" +
									"<task_hours>"+free_pre_requisite.quantity+"</task_hours>" +
									"<source>service</source>" +
									"<source_id>"+id+"</source_id>" +
									"<last_updated>"+last_updated+"</last_updated>" +
									"</task_instances>";
							var activity_xml="<activity>" +
									"<data_id>"+task_id+"</data_id>" +
									"<tablename>task_instances</tablename>" +
									"<link_to>form14</link_to>" +
									"<title>Added</title>" +
									"<notes>Task "+free_pre_requisite.name+"</notes>" +
									"<updated_by>"+get_name()+"</updated_by>" +
									"</activity>";

							if(is_online())
							{
								server_create_row(task_xml,activity_xml);
							}
							else
							{
								local_create_row(task_xml,activity_xml);
							}
						});

					});
				}

				offer_detail=offers[i].offer_detail;
				break;
			}

			var data_xml="<bills>" +
						"<id>"+data_id+"</id>" +
						"<customer_name>"+customer+"</customer_name>" +
						"<bill_date>"+bill_date+"</bill_date>" +
						"<amount>"+amount+"</amount>" +
						"<total>"+total+"</total>" +
						"<type>product</type>" +
						"<offer>"+offer_detail+"</offer>" +
						"<discount>"+discount+"</discount>" +
						"<tax>"+tax+"</tax>" +
						"<last_updated>"+last_updated+"</last_updated>" +
						"<transaction_id>"+transaction_id+"</transaction_id>" +
						"</bills>";
			var activity_xml="<activity>" +
						"<data_id>"+data_id+"</data_id>" +
						"<tablename>bills</tablename>" +
						"<link_to>form42</link_to>" +
						"<title>Updated</title>" +
						"<notes>Bill no "+data_id+"</notes>" +
						"<updated_by>"+get_name()+"</updated_by>" +
						"</activity>";
			var transaction_xml="<transactions>" +
						"<id>"+transaction_id+"</id>" +
						"<trans_date>"+get_my_time()+"</trans_date>" +
						"<amount>"+total+"</amount>" +
						"<receiver>"+customer+"</receiver>" +
						"<giver>master</giver>" +
						"<tax>"+tax+"</tax>" +
						"<last_updated>"+last_updated+"</last_updated>" +
						"</transactions>";
			if(is_online())
			{
				server_update_row(data_xml,activity_xml);
				server_update_simple(transaction_xml);
			}
			else
			{
				local_update_row(data_xml,activity_xml);
				local_update_simple(transaction_xml);
			}

			message_string+="\nAmount: "+amount;
			message_string+="\ndiscount: "+discount;
			message_string+="\nTax: "+tax;
			message_string+="\nTotal: "+total;

			var subject="Bill from "+get_session_var('title');
			$('#form130_share').show();
			$('#form130_share').click(function()
			{
				modal44_action(customer,subject,message_string);
			});

			var total_row="<tr><td colspan='3' data-th='Total'>Total</td>" +
					"<td>Amount:</br>Discount: </br>Tax: </br>Total: </td>" +
					"<td>Rs. "+amount+"</br>" +
					"Rs. "+discount+"</br>" +
					"Rs. "+tax+"</br>" +
					"Rs. "+total+"</td>" +
					"<td></td>" +
					"</tr>";
			$('#form130_foot').html(total_row);

			var payment_data="<payments>" +
					"<id></id>" +
					"<bill_id exact='yes'>"+data_id+"</bill_id>" +
					"</payments>";
			get_single_column_data(function(payments)
			{
				for(var y in payments)
				{
					var payment_xml="<payments>" +
								"<id>"+payments[y]+"</id>" +
								"<type>received</type>" +
								"<total_amount>"+total+"</total_amount>" +
								"<acc_name>"+customer+"</acc_name>" +
								"<transaction_id>"+payments[y]+"</transaction_id>" +
								"<bill_id>"+data_id+"</bill_id>" +
								"<last_updated>"+last_updated+"</last_updated>" +
								"</payments>";
					var pt_xml="<transactions>" +
								"<id>"+payments[y]+"</id>" +
								"<amount>"+total+"</amount>" +
								"<receiver>master</receiver>" +
								"<giver>"+customer+"</giver>" +
								"<tax>0</tax>" +
								"<last_updated>"+last_updated+"</last_updated>" +
								"</transactions>";
					if(is_online())
					{
						server_update_simple_func(payment_xml,function()
						{
							modal26_action(payments[y]);
						});
					}
					else
					{
						local_update_simple_func(payment_xml,function()
						{
							modal26_action(payments[y]);
						});
					}
					break;
				}
			},payment_data);
		});
		$("[id^='save_form130_']").click();
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form Service Request Details - Team
 * @formNo 134
 * @param button
 */
function form134_update_machine(form)
{
	if(is_update_access('form134'))
	{
		var type=form.elements[0].value;
		var machine=form.elements[1].value;
		var problem=form.elements[2].value;
		var closing_notes=form.elements[3].value;
		var status=form.elements[4].value;
		var data_id=form.elements[5].value;
		var last_updated=get_my_time();

		var data_xml="<service_request_machines>" +
					"<id>"+data_id+"</id>" +
					"<machine_type>"+type+"</machine_type>" +
					"<machine>"+machine+"</machine>" +
					"<problem>"+problem+"</problem>" +
					"<closing_notes>"+closing_notes+"</closing_notes>"+
					"<status>"+status+"</status>"+
					"<last_updated>"+last_updated+"</last_updated>" +
					"</service_request_machines>";
		if(is_online())
		{
			server_update_simple(data_xml);
		}
		else
		{
			local_update_simple(data_xml);
		}
		for(var i=0;i<5;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form Service Request Details - Team
 * @formNo 134
 * @param button
 */
function form134_update_team(form)
{
	if(is_update_access('form134'))
	{
		var assignee=form.elements[0].value;
		var phone=form.elements[1].value;
		var email=form.elements[2].value;
		var data_id=form.elements[3].value;
		var last_updated=get_my_time();

		var data_xml="<service_request_team>" +
					"<id>"+data_id+"</id>" +
					"<assignee>"+assignee+"</assignee>" +
					"<phone>"+phone+"</phone>" +
					"<email>"+email+"</email>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</service_request_team>";

		if(is_online())
		{
			server_update_simple(data_xml);
		}
		else
		{
			local_update_simple(data_xml);
		}
		for(var i=0;i<3;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
	}
	else
	{
		$("#modal2_link").click();
	}
}


/**
 * @form Service Request Detail - Task
 * @formNo 134
 * @param button
 */
function form134_update_task(form)
{
	if(is_update_access('form134'))
	{
		var description=form.elements[0].value;
		var assignee=form.elements[1].value;
		var due_by=get_raw_time(form.elements[2].value);
		var status=form.elements[3].value;
		var data_id=form.elements[4].value;
		var last_updated=get_my_time();

		var data_xml="<task_instances>" +
					"<id>"+data_id+"</id>" +
					"<assignee>"+assignee+"</assignee>" +
					"<description>"+description+"</description>" +
					"<t_due>"+due_by+"</t_due>"+
					"<status>"+status+"</status>"+
					"<last_updated>"+last_updated+"</last_updated>" +
					"</task_instances>";
		if(is_online())
		{
			server_update_simple(data_xml);
		}
		else
		{
			local_update_simple(data_xml);
		}
		for(var i=0;i<5;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
	}
	else
	{
		$("#modal2_link").click();
	}
}



/**
 * @form Customer profiling
 * @formNo 139
 * @param button
 */
function form139_update_item(form)
{
	if(is_update_access('form139'))
	{
		var owner=form.elements[0].value;
		var facility=form.elements[1].value;
		var location=form.elements[2].value;
		var area=form.elements[3].value;
		var floors=form.elements[4].value;
		var data_id=form.elements[5].value;
		var last_updated=get_my_time();
		var data_xml="<assets>" +
					"<id>"+data_id+"</id>" +
					"<name>"+facility+"</name>" +
					"<type>facility</type>"+
					"<owner>"+owner+"</owner>" +
					"<owner_type>customer</owner_type>" +
					"<location>"+location+"</location>" +
					"<floors>"+floors+"</floors>"+
					"<area>"+area+"</area>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</assets>";
		if(is_online())
		{
			server_update_simple(data_xml);
		}
		else
		{
			local_update_simple(data_xml);
		}
		for(var i=0;i<5;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form Supplier profiling
 * @formNo 140
 * @param button
 */
function form140_update_item(form)
{
	if(is_update_access('form140'))
	{
		var supplier=form.elements[0].value;
		var asset_type=form.elements[1].value;
		var desc=form.elements[2].value;
		var location=form.elements[3].value;
		var notes=form.elements[4].value;
		var data_id=form.elements[5].value;
		var last_updated=get_my_time();
		var data_xml="<assets>" +
					"<id>"+data_id+"</id>" +
					"<type>"+asset_type+"</type>"+
					"<description>"+desc+"</description>"+
					"<owner>"+supplier+"</owner>" +
					"<owner_type>supplier</owner_type>" +
					"<location>"+location+"</location>"+
					"<notes>"+notes+"</notes>"+
					"<last_updated>"+last_updated+"</last_updated>" +
					"</assets>";
		if(is_online())
		{
			server_update_simple(data_xml);
		}
		else
		{
			local_update_simple(data_xml);
		}
		for(var i=0;i<5;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
	}
	else
	{
		$("#modal2_link").click();
	}
}



/**
 * @form Manufacturing
 * @formNo 146
 * @param button
 */
function form146_update_item(form)
{
	if(is_update_access('form146'))
	{
		var product=form.elements[0].value;
		var batch=form.elements[1].value;
		var quantity=form.elements[2].value;
		var schedule=get_raw_time(form.elements[3].value);
		var status=form.elements[4].value;
		var data_id=form.elements[5].value;
		var last_updated=get_my_time();
		var data_xml="<manufacturing_schedule>" +
					"<id>"+data_id+"</id>" +
					"<product>"+product+"</product>" +
					"<batch>"+batch+"</batch>" +
					"<status>"+status+"</status>" +
					"<schedule>"+schedule+"</schedule>" +
					"<quantity>"+quantity+"</quantity>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</manufacturing_schedule>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>manufacturing_schedule</tablename>" +
					"<link_to>form146</link_to>" +
					"<title>Updated</title>" +
					"<notes>Manufacturing schedule for product "+product+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		if(is_online())
		{
			server_update_row(data_xml,activity_xml);
		}
		else
		{
			local_update_row(data_xml,activity_xml);
		}

		for(var i=0;i<5;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
	}
	else
	{
		$("#modal2_link").click();
	}
}


/**
 * @form Manufacturing
 * @param button
 */
function form146_suspend_item(button)
{
	if(is_update_access('form146'))
	{
		var form_id=$(button).attr('form');
		var form=document.getElementById(form_id);

		var product_name=form.elements[0].value;
		form.elements[4].value='suspended';
		var data_id=form.elements[5].value;
		var last_updated=get_my_time();
		var data_xml="<manufacturing_schedule>" +
					"<id>"+data_id+"</id>" +
					"<status>suspended</status>"+
					"<last_updated>"+last_updated+"</last_updated>" +
					"</manufacturing_schedule>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>manufacturing_schedule</tablename>" +
					"<link_to>form146</link_to>" +
					"<title>Suspended</title>" +
					"<notes>Manufacturing of product "+product_name+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		if(is_online())
		{
			server_update_row(data_xml,activity_xml);
		}
		else
		{
			local_update_row(data_xml,activity_xml);
		}
		for(var i=0;i<5;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		$(button).hide();
	}
	else
	{
		$("#modal2_link").click();
	}
}


/**
 * @form Service Request Billing - Task
 * @formNo 151
 * @param button
 */
function form151_update_task(form)
{
	if(is_update_access('form151'))
	{
		var description=form.elements[0].value;
		var est_expense=form.elements[1].value;
		var expense=form.elements[2].value;
		var status=form.elements[3].value;
		var data_id=form.elements[4].value;
		var last_updated=get_my_time();

		var data_xml="<task_instances>" +
					"<id>"+data_id+"</id>" +
					"<est_expense>"+est_expense+"</est_expense>" +
					"<description>"+description+"</description>" +
					"<expense>"+expense+"</expense>"+
					"<status>"+status+"</status>"+
					"<last_updated>"+last_updated+"</last_updated>" +
					"</task_instances>";
		if(is_online())
		{
			server_update_simple(data_xml);
		}
		else
		{
			local_update_simple(data_xml);
		}
		for(var i=0;i<5;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form Service Request Billing - Task
 * @formNo 151
 * @param button
 */
function form151_update_item(form)
{
	if(is_update_access('form151'))
	{
		var item=form.elements[0].value;
		var quantity=form.elements[1].value;
		var est_amount=form.elements[2].value;
		var amount=form.elements[3].value;
		var status=form.elements[4].value;
		var data_id=form.elements[5].value;
		var last_updated=get_my_time();

		var data_xml="<service_request_items>" +
					"<id>"+data_id+"</id>" +
					"<item_name>"+item+"</item_name>" +
					"<est_amount>"+est_amount+"</est_amount>"+
					"<amount>"+amount+"</amount>"+
					"<quantity>"+quantity+"</quantity>" +
					"<status>"+status+"</status>"+
					"<last_updated>"+last_updated+"</last_updated>" +
					"</service_request_items>";

		if(is_online())
		{
			server_update_simple(data_xml);
		}
		else
		{
			local_update_simple(data_xml);
		}
		for(var i=0;i<5;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form Service Request Billing - Expense
 * @formNo 151
 * @param button
 */
function form151_update_expense(form)
{
	if(is_update_access('form151'))
	{
		var person=form.elements[0].value;
		var amount=form.elements[1].value;
		var detail=form.elements[2].value;
		var status=form.elements[3].value;
		var data_id=form.elements[4].value;
		var last_updated=get_my_time();

		var data_xml="<expenses>" +
					"<id>"+data_id+"</id>" +
					"<person>"+person+"</person>"+
					"<amount>"+amount+"</amount>"+
					"<detail>"+detail+"</detail>" +
					"<status>"+status+"</status>"+
					"<last_updated>"+last_updated+"</last_updated>" +
					"</expenses>";

		if(is_online())
		{
			server_update_simple(data_xml);
		}
		else
		{
			local_update_simple(data_xml);
		}
		for(var i=0;i<5;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form Service Request Billing - Task
 * @formNo 151
 * @param button
 */
function form151_approve_item(button)
{
	if(is_update_access('form151'))
	{
		var form_id=$(button).attr('form');
		var form=document.getElementById(form_id);

		var status=form.elements[4].value;
		var data_id=form.elements[5].value;
		var last_updated=get_my_time();
		var new_status='used';
		if(status=='requested')
			new_status='approved';
		form.elements[4].value=new_status;

		var data_xml="<service_request_items>" +
					"<id>"+data_id+"</id>" +
					"<status>"+new_status+"</status>"+
					"<last_updated>"+last_updated+"</last_updated>" +
					"</service_request_items>";

		if(is_online())
		{
			server_update_simple(data_xml);
		}
		else
		{
			local_update_simple(data_xml);
		}
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form Manage Quotations
 * @formNo 152
 * @param button
 */
function form152_approve_item(button)
{
	if(is_update_access('form152'))
	{
		var form_id=$(button).attr('form');
		var form=document.getElementById(form_id);

		var data_id=form.elements[5].value;
		var status='approved';
		var last_updated=get_my_time();
		var reject_button=form.elements[8];
		var approve_button=form.elements[7];
		$(reject_button).hide();
		approve_button.value='Approved';
		approve_button.removeAttribute("onclick");

		var data_xml="<quotation>" +
					"<id>"+data_id+"</id>" +
					"<status>"+status+"</status>"+
					"<last_updated>"+last_updated+"</last_updated>" +
					"</quotation>";

		update_simple(data_xml);

	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form Manage Quotations
 * @formNo 152
 * @param button
 */
function form152_reject_item(button)
{
	if(is_update_access('form152'))
	{
		var form_id=$(button).attr('form');
		var form=document.getElementById(form_id);

		var data_id=form.elements[5].value;
		var status='rejected';
		var last_updated=get_my_time();
		var approve_button=form.elements[7];
		var reject_button=form.elements[8];
		$(approve_button).hide();
		reject_button.value='Rejected';
		reject_button.removeAttribute("onclick");

		var data_xml="<quotation>" +
					"<id>"+data_id+"</id>" +
					"<status>"+status+"</status>"+
					"<last_updated>"+last_updated+"</last_updated>" +
					"</quotation>";
		update_simple(data_xml);

	}
	else
	{
		$("#modal2_link").click();
	}
}


/**
 * @form Prepare Quotation
 * @formNo 153
 * @param button
 */
function form153_update_form()
{
	if(is_update_access('form153'))
	{
		var form=document.getElementById("form153_master");

		var customer=form.elements['customer'].value;
		var quot_type=form.elements['type'].value;
		var quot_date=get_raw_time(form.elements['date'].value);
		var intro_notes=form.elements['notes'].value;
		var quot_num=form.elements['quot_num'].value;
		var data_id=form.elements['quot_id'].value;

		var amount=0;
		var discount=0;
		var tax=0;
		var tax_rate=0;

		if(document.getElementById('form153_discount'))
		{
			discount=parseFloat(document.getElementById('form153_discount').value);
			tax_rate=parseFloat(document.getElementById('form153_tax').value);
		}

		$("[id^='save_form153']").each(function(index)
		{
			var subform_id=$(this).attr('form');
			var subform=document.getElementById(subform_id);
			//tax+=parseFloat(subform.elements[5].value);
			amount+=vUtil.round(parseFloat(subform.elements[5].value),0);
			//total+=Math.round(parseFloat(subform.elements[7].value));
			//discount+=parseFloat(subform.elements[8].value);
		});

		var tax=vUtil.round((tax_rate*((amount-discount)/100)),0);
		var total=vUtil.round(amount+tax-discount,0);

		var last_updated=get_my_time();

		var data_xml="<quotation>" +
					"<id>"+data_id+"</id>" +
					"<quot_num>"+quot_num+"</quot_num>" +
					"<customer>"+customer+"</customer>" +
					"<date>"+quot_date+"</date>" +
					"<amount>"+amount+"</amount>" +
					"<total>"+total+"</total>" +
					"<billing_type>"+quot_type+"</billing_type>" +
					"<discount>"+discount+"</discount>" +
					"<tax>"+tax+"</tax>" +
					"<tax_rate>"+tax_rate+"</tax_rate>" +
					"<intro_notes>"+intro_notes+"</intro_notes>"+
					"<last_updated>"+last_updated+"</last_updated>" +
					"</quotation>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>quotation</tablename>" +
					"<link_to>form152</link_to>" +
					"<title>Updated</title>" +
					"<notes>Quotation # "+quot_num+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		update_row(data_xml,activity_xml);

		var total_row="<tr><td colspan='2' data-th='Total'>Total</td>" +
					"<td>Amount:</br>Discount: </br>Tax: @ <input type='number' value='"+tax_rate+"' title='specify tax rate' step='any' id='form153_tax' class='dblclick_editable'>%</br>Total: </td>" +
					"<td>Rs. "+amount+"</br>" +
					"Rs. <input type='number' value='"+discount+"' step='any' id='form153_discount' class='dblclick_editable'><br>" +
					"Rs. "+tax+" <br>" +
					"Rs. "+total+"</td>" +
					"<td></td>" +
					"</tr>";
		$('#form153_foot').html(total_row);

		longPressEditable($('.dblclick_editable'));

		$("[id^='save_form153_']").click();
	}
	else
	{
		$("#modal2_link").click();
	}
}


/**
 * @form Create Bill(DLM)
 * @formNo 154
 * @param button
 */
function form154_update_form()
{
	if(is_update_access('form154'))
	{
		var form=document.getElementById("form154_master");

		var customer=form.elements['customer'].value;
		var bill_type=form.elements['bill_type'].value;
		var tax_type=form.elements['tax_type'].value;
		var storage=form.elements['store'].value;
		var bill_date=get_raw_time(form.elements['date'].value);
		var narration=form.elements['narration'].value;
		var print_1_job='no';
		if(form.elements['job'].checked)
			print_1_job='yes';

		var tax_type=form.elements['tax_type'].value;

		var tax_text="VAT";
		if(tax_type=='CST' || tax_type=='Retail Central')
		{
			tax_text="CST";
		}

		var cform='no';
		if(form.elements['cform'].checked)
			cform='yes';

		var bill_num=form.elements['bill_num'].value;

		var hiring=false;
		if(bill_type=='Hiring')
			hiring=true;

		var amount=0;
		var discount=0;
		var tax_rate=0;
		var cartage=0;

		if(document.getElementById('form154_discount'))
		{
			discount=parseFloat(document.getElementById('form154_discount').value);
			tax_rate=parseFloat(document.getElementById('form154_tax').value);
			cartage=parseFloat(document.getElementById('form154_cartage').value);
		}

		$("[id^='save_form154']").each(function(index)
		{
			var subform_id=$(this).attr('form');
			var subform=document.getElementById(subform_id);
			if(hiring)
			{
				//tax+=parseFloat(subform.elements[7].value);
				if(isNaN(parseFloat(subform.elements[7].value)))
					amount+=0;
				else
					amount+=Math.round(parseFloat(subform.elements[7].value));
				//total+=Math.round(parseFloat(subform.elements[9].value));
				//discount+=parseFloat(subform.elements[10].value);
			}
			else if(bill_type=='Installation' || bill_type=='Repair')
			{
				//tax+=parseFloat(subform.elements[3].value);
				if(isNaN(parseFloat(subform.elements[3].value)))
					amount+=0;
				else
					amount+=Math.round(parseFloat(subform.elements[3].value));
				//total+=Math.round(parseFloat(subform.elements[5].value));
				//discount+=parseFloat(subform.elements[6].value);
			}
			else
			{
				//tax+=parseFloat(subform.elements[3].value);
				if(isNaN(parseFloat(subform.elements[3].value)))
					amount+=0;
				else
					amount+=Math.round(parseFloat(subform.elements[3].value));
				//total+=Math.round(parseFloat(subform.elements[5].value));
				//discount+=parseFloat(subform.elements[6].value);
			}
		});

		var tax=Math.round((tax_rate*((amount-discount)/100)));
		var total=Math.round(amount+tax-discount+cartage).toFixed(2);
		form.elements['bill_total'].value=total;

		var data_id=form.elements['bill_id'].value;
		var transaction_id=form.elements['t_id'].value;
		var last_updated=get_my_time();

		var data_xml="<bills>" +
					"<id>"+data_id+"</id>" +
					"<customer_name>"+customer+"</customer_name>" +
					"<bill_date>"+bill_date+"</bill_date>" +
					"<amount>"+amount+"</amount>" +
					"<total>"+total+"</total>" +
					"<billing_type>"+bill_type+"</billing_type>" +
					"<tax_type>"+tax_type+"</tax_type>" +
					"<bill_num>"+bill_num+"</bill_num>" +
					"<discount>"+discount+"</discount>" +
					"<cartage>"+cartage+"</cartage>" +
					"<tax>"+tax+"</tax>" +
					"<tax_rate>"+tax_rate+"</tax_rate>"+
					"<print_1_job>"+print_1_job+"</print_1_job>"+
					"<cform>"+cform+"</cform>"+
					"<transaction_id>"+transaction_id+"</transaction_id>" +
					"<notes>"+narration+"</notes>"+
					"<last_updated>"+last_updated+"</last_updated>" +
					"</bills>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>bills</tablename>" +
					"<link_to>form92</link_to>" +
					"<title>Updated</title>" +
					"<notes>Bill no "+bill_num+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		var transaction_xml="<transactions>" +
					"<id>"+transaction_id+"</id>" +
					"<trans_date>"+get_my_time()+"</trans_date>" +
					"<amount>"+total+"</amount>" +
					"<receiver>"+customer+"</receiver>" +
					"<giver>master</giver>" +
					"<tax>"+tax+"</tax>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</transactions>";
		if(is_online())
		{
			server_update_row(data_xml,activity_xml);
			server_update_simple(transaction_xml);
		}
		else
		{
			local_update_row(data_xml,activity_xml);
			local_update_simple(transaction_xml);
		}

		var total_row="<tr><td colspan='3' data-th='Total'>Total</td>" +
					"<td>Amount:<disc><br>Discount:</disc><br>"+tax_text+":@ <input type='number' value='"+tax_rate+"' step='any' id='form154_tax' class='dblclick_editable'>% <br>Cartage: <br>Total: </td>" +
					"<td>Rs. "+amount.toFixed(2)+"</br>" +
					"<disc_amount>Rs. <input type='number' value='"+discount.toFixed(2)+"' step='any' id='form154_discount' class='dblclick_editable'><br></disc_amount>" +
					"Rs. "+tax.toFixed(2)+" <br>" +
					"Rs. <input type='number' value='"+cartage.toFixed(2)+"' step='any' id='form154_cartage' class='dblclick_editable'></br>" +
					"Rs. "+total+"</td>" +
					"<td></td>" +
					"</tr>";
		if(hiring)
		{
			total_row="<tr><td colspan='4' data-th='Total'>Total</td>" +
					"<td>Amount:<disc><br>Discount:</disc><br>Service Tax:@ <input type='number' value='"+tax_rate+"' step='any' id='form154_tax' class='dblclick_editable'>% <br>Cartage: <br>Total: </td>" +
					"<td>Rs. "+amount.toFixed(2)+"</br>" +
					"<disc_amount>Rs. <input type='number' value='"+discount.toFixed(2)+"' step='any' id='form154_discount' class='dblclick_editable'><br></disc_amount>" +
					"Rs. "+tax.toFixed(2)+" <br>" +
					"Rs. <input type='number' value='"+cartage.toFixed(2)+"' step='any' id='form154_cartage' class='dblclick_editable'><br>" +
					"Rs. "+total+"</td>" +
					"<td></td>" +
					"</tr>";
		}
		else if(bill_type=='Service')
		{
			total_row="<tr><td colspan='3' data-th='Total'>Total</td>" +
					"<td>Amount:<disc><br>Discount: </disc><br>Service Tax:@ <input type='number' value='"+tax_rate+"' step='any' id='form154_tax' class='dblclick_editable'>% <br>Cartage: <br>Total: </td>" +
					"<td>Rs. "+amount.toFixed(2)+"</br>" +
					"<disc_amount>Rs. <input type='number' value='"+discount.toFixed(2)+"' step='any' id='form154_discount' class='dblclick_editable'></br></disc_amount>" +
					"Rs. "+tax.toFixed(2)+" <br>" +
					"Rs. <input type='number' value='"+cartage.toFixed(2)+"' step='any' id='form154_cartage' class='dblclick_editable'></br>" +
					"Rs. "+total+"</td>" +
					"<td></td>" +
					"</tr>";
		}

		$('#form154_foot').html(total_row);
		longPressEditable($('.dblclick_editable'));

		var payment_data="<payments>" +
				"<id></id>" +
				"<bill_id exact='yes'>"+data_id+"</bill_id>" +
				"</payments>";
		get_single_column_data(function(payments)
		{
			for(var y in payments)
			{
				var payment_xml="<payments>" +
							"<id>"+payments[y]+"</id>" +
							"<type>received</type>" +
							"<total_amount>"+total+"</total_amount>" +
							"<acc_name>"+customer+"</acc_name>" +
							"<transaction_id>"+payments[y]+"</transaction_id>" +
							"<bill_id>"+data_id+"</bill_id>" +
							"<last_updated>"+last_updated+"</last_updated>" +
							"</payments>";
				var pt_xml="<transactions>" +
							"<id>"+payments[y]+"</id>" +
							"<amount>"+total+"</amount>" +
							"<receiver>master</receiver>" +
							"<giver>"+customer+"</giver>" +
							"<tax>0</tax>" +
							"<last_updated>"+last_updated+"</last_updated>" +
							"</transactions>";
				if(is_online())
				{
					server_update_simple_func(payment_xml,function()
					{
						//modal26_action(payments[y]);
					});
				}
				else
				{
					local_update_simple_func(payment_xml,function()
					{
						//modal26_action(payments[y]);
					});
				}
				break;
			}
		},payment_data);

		$("[id^='save_form154_']").click();
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form Update Inventory (DLM)
 * @param button
 */
function form155_update_item(form)
{
	if(is_update_access('form155'))
	{
		var name=form.elements[0].value;
		var cost_price=form.elements[1].value;
		var fresh_quantity=form.elements[3].value;
		var hireable_quantity=form.elements[4].value;
		var hired_quantity=form.elements[5].value;
		var data_id=form.elements[6].value;
		var last_updated=get_my_time();
		var data_xml="<product_instances>" +
					"<id>"+data_id+"</id>" +
					"<product_name>"+name+"</product_name>" +
					"<batch>"+name+"</batch>" +
					"<cost_price>"+cost_price+"</cost_price>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</product_instances>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>product_instances</tablename>" +
					"<link_to>form155</link_to>" +
					"<title>Updated</title>" +
					"<notes>Inventory for product "+name+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		update_row(data_xml,activity_xml);
		for(var i=0;i<6;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form Store Placement (DLM)
 * @param button
 */
function form156_update_item(form)
{
	if(is_update_access('form156'))
	{
		var product_name=form.elements[0].value;
		var name=form.elements[1].value;
		var data_id=form.elements[3].value;
		var last_updated=get_my_time();
		var table='area_utilization';
		var data_xml="<"+table+">" +
					"<id>"+data_id+"</id>" +
					"<product_name>"+product_name+"</product_name>" +
					"<batch>"+product_name+"</batch>" +
					"<name>"+name+"</name>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</"+table+">";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>"+table+"</tablename>" +
					"<link_to>form156</link_to>" +
					"<title>Saved</title>" +
					"<notes>Placed product "+product_name+" at storage "+name+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		if(is_online())
		{
			server_update_row(data_xml,activity_xml);
		}
		else
		{
			local_update_row(data_xml,activity_xml);
		}
		for(var i=0;i<4;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form Store Movement (DLM)
 * @param button
 */
function form157_dispatch_item(button)
{
	if(is_update_access('form157'))
	{
		var form_id=$(button).attr('form');
		var form=document.getElementById(form_id);

		var product_name=form.elements[0].value;
		var source=form.elements[2].value;
		form.elements[4].value='dispatched';

		var data_id=form.elements[5].value;
		var last_updated=get_my_time();
		var data_xml="<store_movement>" +
					"<id>"+data_id+"</id>" +
					"<status>dispatched</status>"+
					"<last_updated>"+last_updated+"</last_updated>" +
					"</store_movement>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>store_movement</tablename>" +
					"<link_to>form157</link_to>" +
					"<title>Dispatched</title>" +
					"<notes>Product "+product_name+" from store "+source+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		update_row(data_xml,activity_xml);
		for(var i=0;i<5;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		$(button).hide();
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form Store Movement
 * @param button
 */
function form157_receive_item(button)
{
	if(is_update_access('form157'))
	{
		var form_id=$(button).attr('form');
		var form=document.getElementById(form_id);

		var product_name=form.elements[0].value;
		var target=form.elements[3].value;
		form.elements[4].value='received';

		var data_id=form.elements[5].value;
		var last_updated=get_my_time();
		var data_xml="<store_movement>" +
					"<id>"+data_id+"</id>" +
					"<status>received</status>"+
					"<last_updated>"+last_updated+"</last_updated>" +
					"</store_movement>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>store_movement</tablename>" +
					"<link_to>form157</link_to>" +
					"<title>Received</title>" +
					"<notes>Product "+product_name+" at store "+target+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		update_row(data_xml,activity_xml);
		for(var i=0;i<5;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}

		///////////adding store placement////////
		var storage_data="<area_utilization>" +
				"<id></id>" +
				"<name exact='yes'>"+target+"</name>" +
				"<item_name exact='yes'>"+product_name+"</item_name>" +
				"<batch exact='yes'>"+product_name+"</batch>" +
				"</area_utilization>";
		fetch_requested_data('',storage_data,function(placements)
		{
			if(placements.length===0 && target!="")
			{
				var storage_xml="<area_utilization>" +
						"<id>"+vUtil.newKey()+"</id>" +
						"<name>"+target+"</name>" +
						"<item_name>"+product_name+"</item_name>" +
						"<batch>"+product_name+"</batch>" +
						"<last_updated>"+get_my_time()+"</last_updated>" +
						"</area_utilization>";
				if(is_online())
				{
					server_create_simple(storage_xml);
				}
				else
				{
					local_create_simple(storage_xml);
				}
			}
		});

		$(button).hide();
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form Store Movement
 * @param button
 */
function form157_cancel_item(button)
{
	if(is_update_access('form157'))
	{
		var form_id=$(button).attr('form');
		var form=document.getElementById(form_id);

		var product_name=form.elements[0].value;
		var source=form.elements[2].value;
		form.elements[4].value='cancelled';

		var data_id=form.elements[5].value;
		var last_updated=get_my_time();
		var data_xml="<store_movement>" +
					"<id>"+data_id+"</id>" +
					"<status>cancelled</status>"+
					"<last_updated>"+last_updated+"</last_updated>" +
					"</store_movement>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>store_movement</tablename>" +
					"<link_to>form157</link_to>" +
					"<title>Cancelled</title>" +
					"<notes>Movement of product "+product_name+" from store "+source+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		update_row(data_xml,activity_xml);

		for(var i=0;i<5;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
		$(button).hide();
	}
	else
	{
		$("#modal2_link").click();
	}
}


/**
 * @form Enter Purchase Bill (DLM)
 * @param button
 */
function form158_update_form()
{
	if(is_update_access('form158'))
	{
		var form=document.getElementById("form158_master");

		var supplier=form.elements['supplier'].value;
		var bill_id=form.elements['bill_num'].value;
		var bill_date=get_raw_time(form.elements['date'].value);
		var imported='no';
		var notes="Local Purchase";
		if(form.elements['imported'].checked)
		{
			imported='yes';
			notes='Imported';
		}
	var amount=0;
		$("[id^='save_form158']").each(function(index)
		{
			var subform_id=$(this).attr('form');
			var subform=document.getElementById(subform_id);

			if(isNaN(parseFloat(subform.elements[3].value)))
				amount+=0;
			else
				amount+=parseFloat(subform.elements[3].value);
		});

		var discount=0;
		var tax_rate=0;
		var cartage=0;

		if(document.getElementById('form158_discount'))
		{
			discount=parseFloat(document.getElementById('form158_discount').value);
			tax_rate=parseFloat(document.getElementById('form158_tax').value);
			cartage=parseFloat(document.getElementById('form158_cartage').value);
		}

		var tax=Math.round((tax_rate*((amount-discount)/100)));
		var total=Math.round(amount+tax-discount+cartage);

		var total_row="<tr><td colspan='2' data-th='Total'>Total</td>" +
								"<td>Amount:<br>Discount: <br>Tax:@ <input type='number' value='"+tax_rate+"' step='any' id='form158_tax' class='dblclick_editable'>%<br>Cartage: <br>Total: </td>" +
								"<td>Rs. "+Math.round(amount)+"</br>" +
								"<disc_amount>Rs. <input type='number' value='"+Math.round(discount)+"' step='any' id='form158_discount' class='dblclick_editable'><br></disc_amount>" +
								"Rs. "+tax+" <br>" +
								"Rs. <input type='number' value='"+Math.round(cartage)+"' step='any' id='form158_cartage' class='dblclick_editable'><br>" +
								"Rs. "+Math.round(total)+"</td>" +
								"<td></td>" +
								"</tr>";

		$('#form158_foot').html(total_row);
		longPressEditable($('.dblclick_editable'));

		var data_id=form.elements['bill_id'].value;
		var transaction_id=form.elements['t_id'].value;
		var last_updated=get_my_time();

		var data_xml="<supplier_bills>" +
					"<id>"+data_id+"</id>" +
					"<bill_id>"+bill_id+"</bill_id>" +
					"<supplier>"+supplier+"</supplier>" +
					"<bill_date>"+bill_date+"</bill_date>" +
					"<total>"+total+"</total>" +
					"<discount>"+discount+"</discount>" +
					"<amount>"+amount+"</amount>" +
					"<tax>"+tax+"</tax>" +
					"<tax_rate>"+tax_rate+"</tax_rate>"+
					"<cartage>"+cartage+"</cartage>"+
					"<transaction_id>"+transaction_id+"</transaction_id>" +
					"<imported>"+imported+"</imported>" +
					"<notes>"+notes+"</notes>"+
					"<last_updated>"+last_updated+"</last_updated>" +
					"</supplier_bills>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>supplier_bills</tablename>" +
					"<link_to>form53</link_to>" +
					"<title>Updated</title>" +
					"<notes>Supplier Bill # "+data_id+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		var transaction_xml="<transactions>" +
					"<id>"+transaction_id+"</id>" +
					"<trans_date>"+get_my_time()+"</trans_date>" +
					"<amount>"+total+"</amount>" +
					"<receiver>master</receiver>" +
					"<giver>"+supplier+"</giver>" +
					"<tax>"+(-tax)+"</tax>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</transactions>";
		if(is_online())
		{
			server_update_row(data_xml,activity_xml);
			server_update_simple(transaction_xml);
		}
		else
		{
			local_update_row(data_xml,activity_xml);
			local_update_simple(transaction_xml);
		}

		var payment_data="<payments>" +
				"<id></id>" +
				"<bill_id exact='yes'>"+data_id+"</bill_id>" +
				"</payments>";
		get_single_column_data(function(payments)
		{
			for(var y in payments)
			{
				var payment_xml="<payments>" +
							"<id>"+payments[y]+"</id>" +
							"<type>paid</type>" +
							"<total_amount>"+total+"</total_amount>" +
							"<acc_name>"+supplier+"</acc_name>" +
							"<transaction_id>"+payments[y]+"</transaction_id>" +
							"<bill_id>"+data_id+"</bill_id>" +
							"<last_updated>"+last_updated+"</last_updated>" +
							"</payments>";
				var pt_xml="<transactions>" +
							"<id>"+payments[y]+"</id>" +
							"<amount>"+total+"</amount>" +
							"<receiver>"+supplier+"</receiver>" +
							"<giver>master</giver>" +
							"<tax>0</tax>" +
							"<last_updated>"+last_updated+"</last_updated>" +
							"</transactions>";
				if(is_online())
				{
					server_update_simple_func(payment_xml,function()
					{
						//modal28_action(payments[y]);
					});
				}
				else
				{
					local_update_simple_func(payment_xml,function()
					{
						//modal28_action(payments[y]);
					});
				}
				break;
			}
		},payment_data);

		$("[id^='save_form158_']").click();
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form Checklist Items
 * @param button
 */
function form161_update_item(form)
{
	if(is_update_access('form161'))
	{
		var cp=form.elements[0].value;
		var desired_result=form.elements[1].value;
		var status=form.elements[2].value;
		var data_id=form.elements[3].value;
		var last_updated=get_my_time();
		var data_xml="<checklist_items>" +
					"<id>"+data_id+"</id>" +
					"<checkpoint>"+cp+"</checkpoint>" +
					"<desired_result>"+desired_result+"</desired_result>" +
					"<status>"+status+"</status>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</checklist_items>";
		update_simple(data_xml);

		for(var i=0;i<3;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form Product Checklist
 * @param button
 */
function form162_update_item(form)
{
	if(is_update_access('form162'))
	{
		var item=form.elements[0].value;
		var cp=form.elements[1].value;
		var desired_result=form.elements[2].value;
		var data_id=form.elements[3].value;
		var last_updated=get_my_time();
		var data_xml="<checklist_mapping>" +
					"<id>"+data_id+"</id>" +
					"<checkpoint>"+cp+"</checkpoint>" +
					"<desired_result>"+desired_result+"</desired_result>" +
					"<item>"+item+"</item>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</checklist_mapping>";
		update_simple(data_xml);

		for(var i=0;i<3;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form Product Dimensions
 * @param button
 */
function form163_update_item(form)
{
	if(is_update_access('form163'))
	{
		var item=form.elements[0].value;
		var length=form.elements[1].value;
		var breadth=form.elements[2].value;
		var height=form.elements[3].value;
		var volume=form.elements[4].value;
		var weight=form.elements[5].value;
		var packing=form.elements[6].value;
		var data_id=form.elements[7].value;
		var last_updated=get_my_time();
		var data_xml="<product_master>" +
					"<id>"+data_id+"</id>" +
					"<name>"+item+"</name>" +
					"<len>"+length+"</len>" +
					"<breadth>"+breadth+"</breadth>" +
					"<height>"+height+"</height>" +
					"<volume>"+volume+"</volume>" +
					"<weight>"+weight+"</weight>"+
					"<packing>"+packing+"</packing>"+
					"<last_updated>"+last_updated+"</last_updated>" +
					"</product_master>";
		update_simple(data_xml);

		for(var i=0;i<7;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
	}
	else
	{
		$("#modal2_link").click();
	}
}


function form165_update_item(form)
{
	if(is_update_access('form165'))
	{
		var item=form.elements[0].value;
		var batch=form.elements[1].value;
		var to_place=form.elements[2].value;
		var placed=form.elements[3].value;
		var storage=form.elements[4].value;
		var data_id=form.elements[6].value;
		var table_type=form.elements[7].value;
		var last_updated=get_my_time();
		var old_storage=form.elements[9].value;
		var old_placed=form.elements[10].value;

		if(storage==old_storage)
		{
			var status="completed";
			if(parseFloat(placed)!=parseFloat(to_place))
				status='pending';
			var data_xml="<"+table_type+">";
				data_xml+="<id>"+data_id+"</id>" +
					"<put_away_status>"+status+"</put_away_status>" +
					"<placed_quantity>"+placed+"</placed_quantity>" +
					"<storage>"+old_storage+"</storage>"+
					"<last_updated>"+last_updated+"</last_updated>";
				data_xml+="</"+table_type+">";

			update_simple(data_xml);
			form.elements[9].value=storage;
			form.elements[10].value=placed;
		}
		else
		{
			if(placed==0)
			{
				var status="completed";
				if(parseFloat(placed)!=parseFloat(to_place))
					status='pending';

				var data_xml="<"+table_type+">"+
						"<id>"+data_id+"</id>" +
						"<put_away_status>"+status+"</put_away_status>" +
						"<placed_quantity>"+placed+"</placed_quantity>" +
						"<storage>"+storage+"</storage>"+
						"<last_updated>"+last_updated+"</last_updated>"+
						"</"+table_type+">";

				update_simple(data_xml);
				form.elements[9].value=storage;
				form.elements[10].value=placed;
			}
			else
			{
				var status="completed";
				var data_xml="<"+table_type+">"+
						"<id>"+data_id+"</id>" +
						"<put_away_status>completed</put_away_status>" +
						"<placed_quantity>"+to_place+"</placed_quantity>" +
						"<storage>"+old_storage+"</storage>"+
						"<last_updated>"+last_updated+"</last_updated>"+
						"</"+table_type+">";

				update_simple(data_xml);

				var new_status='completed';
				if(parseFloat(placed)!=parseFloat(to_place))
				{
					new_status='pending';
				}
				var old_pending_quantity=parseFloat(to_place)-parseFloat(old_placed);
				var new_placed_quantity=parseFloat(placed)-parseFloat(old_placed);
				var new_key=vUtil.newKey();
				form.elements[7].value='inventory_adjust';
				form.elements[6].value=new_key;
				form.elements[9].value=storage;
				form.elements[10].value=new_placed_quantity;
				form.elements[2].value=old_pending_quantity;
				form.elements[3].value=new_placed_quantity;

				var adjust1_xml="<inventory_adjust>"+
					"<id>"+(new_key-1)+"</id>" +
					"<product_name>"+item+"</product_name>" +
					"<batch>"+batch+"</batch>" +
					"<put_away_status>completed</put_away_status>" +
					"<quantity>-"+old_pending_quantity+"</quantity>" +
					"<placed_quantity>-"+old_pending_quantity+"</placed_quantity>" +
					"<storage>"+old_storage+"</storage>"+
					"<source>put away</source>"+
					"<last_updated>"+last_updated+"</last_updated>"+
					"</inventory_adjust>";
				create_simple(adjust1_xml);

				var adjust2_xml="<inventory_adjust>"+
					"<id>"+new_key+"</id>" +
					"<product_name>"+item+"</product_name>" +
					"<batch>"+batch+"</batch>" +
					"<put_away_status>"+new_status+"</put_away_status>" +
					"<quantity>"+old_pending_quantity+"</quantity>" +
					"<placed_quantity>"+new_placed_quantity+"</placed_quantity>" +
					"<storage>"+storage+"</storage>"+
					"<source>put away</source>"+
					"<last_updated>"+last_updated+"</last_updated>"+
					"</inventory_adjust>";
				create_simple(adjust2_xml);
			}
		}

		for(var i=0;i<5;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}

		var storage_data="<area_utilization>" +
				"<id></id>" +
				"<name exact='yes'>"+storage+"</name>" +
				"<item_name exact='yes'>"+item+"</item_name>" +
				"<batch exact='yes'>"+batch+"</batch>" +
				"</area_utilization>";
		fetch_requested_data('',storage_data,function(placements)
		{
			if(placements.length===0)
			{
				var storage_xml="<area_utilization>" +
						"<id>"+vUtil.newKey()+"</id>" +
						"<name>"+storage+"</name>" +
						"<item_name>"+item+"</item_name>" +
						"<batch>"+batch+"</batch>" +
						"<last_updated>"+get_my_time()+"</last_updated>" +
						"</area_utilization>";
				create_simple(storage_xml);
			}
		});
	}
	else
	{
		$("#modal2_link").click();
	}
}



/**
 * @form Storage Structure
 * @param button
 */
function form167_update_item(form)
{
	if(is_update_access('form167'))
	{
		var name=form.elements[0].value;
		var parent=form.elements[1].value;
		var length=form.elements[2].value;
		var breadth=form.elements[3].value;
		var height=form.elements[4].value;
		var unit=form.elements[5].value;
		var data_id=form.elements[6].value;
		var last_updated=get_my_time();
		var data_xml="<storage_structure>" +
					"<id>"+data_id+"</id>" +
					"<name>"+name+"</name>" +
					"<parent>"+parent+"</parent>" +
					"<len>"+length+"</len>"+
					"<breadth>"+breadth+"</breadth>" +
					"<height>"+height+"</height>" +
					"<unit>"+unit+"</unit>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</storage_structure>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>storage_structure</tablename>" +
					"<link_to>form167</link_to>" +
					"<title>Updated</title>" +
					"<notes>Storage type of "+name+" structure</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		if(is_online())
		{
			server_update_row(data_xml,activity_xml);
		}
		else
		{
			local_update_row(data_xml,activity_xml);
		}
		for(var i=0;i<6;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form Manage Products (Nikki)
 * @param button
 */
function form169_update_item(form)
{
	if(is_update_access('form169'))
	{
		var name=form.elements[0].value;
		var description=form.elements[1].value;
		var make=form.elements[2].value;
		var tax=form.elements[6].value;
		var data_id=form.elements[7].value;
		var last_updated=get_my_time();
		var pic_id=$("#img_form169_"+data_id).parent().attr('name');
		var url=$("#img_form169_"+data_id).attr('src');

		var data_xml="<product_master>" +
					"<id>"+data_id+"</id>" +
					"<make>"+make+"</make>" +
					"<name>"+name+"</name>" +
					"<description>"+description+"</description>" +
					"<tax>"+tax+"</tax>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</product_master>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>product_master</tablename>" +
					"<link_to>form169</link_to>" +
					"<title>Updated</title>" +
					"<notes>Product "+name+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		var pic_xml="<documents>" +
					"<id>"+pic_id+"</id>" +
					"<url>"+url+"</url>" +
					"<doc_type>product_master</doc_type>" +
					"<target_id>"+data_id+"</target_id>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</documents>";
		update_row(data_xml,activity_xml);
		update_simple(pic_xml);
		create_simple(pic_xml);

		for(var i=0;i<6;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
	}
	else
	{
		$("#modal2_link").click();
	}
}


/**
 * @form Store Areas (Nikki)
 * @param button
 */
function form170_update_item(form)
{
	if(is_update_access('form170'))
	{
		var name=form.elements[0].value;
		var area_type=form.elements[1].value;
		var parent=form.elements[2].value;
		var owner=form.elements[3].value;
		var length=form.elements[4].value;
		var breadth=form.elements[5].value;
		var height=form.elements[6].value;
		var data_id=form.elements[7].value;
		var last_updated=get_my_time();
		var data_xml="<store_areas>" +
					"<id>"+data_id+"</id>" +
					"<owner>"+owner+"</owner>" +
					"<parent>"+parent+"</parent>"+
					"<area_type>"+area_type+"</area_type>" +
					"<len>"+length+"</len>"+
					"<breadth>"+breadth+"</breadth>"+
					"<height>"+height+"</height>"+
					"<last_updated>"+last_updated+"</last_updated>" +
					"</store_areas>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>store_areas</tablename>" +
					"<link_to>form170</link_to>" +
					"<title>Updated</title>" +
					"<notes>Storage "+name+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		if(is_online())
		{
			server_update_row(data_xml,activity_xml);
		}
		else
		{
			local_update_row(data_xml,activity_xml);
		}
		for(var i=0;i<7;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form Sale channels
 * @formNo 171
 * @param button
 */
function form171_update_item(form)
{
	if(is_update_access('form171'))
	{
		var name=form.elements[0].value;
		var details=form.elements[1].value;
		var dead_weight_factor=form.elements[2].value;
		var data_id=form.elements[3].value;
		var last_updated=get_my_time();
		var data_xml="<sale_channels>" +
					"<id>"+data_id+"</id>" +
					"<name>"+name+"</name>" +
					"<details>"+details+"</details>" +
					"<dead_weight_factor>"+dead_weight_factor+"</dead_weight_factor>"+
					"<last_updated>"+last_updated+"</last_updated>" +
					"</sale_channels>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>sale_channels</tablename>" +
					"<link_to>form171</link_to>" +
					"<title>Updated</title>" +
					"<notes>Sale channel "+name+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		update_row(data_xml,activity_xml);

		for(var i=0;i<3;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form Pricing Sheet
 * @formNo 172
 * @param button
 */
/*function form172_update_item(form)
{
	if(is_update_access('form172'))
	{
		var data_id=form.elements[14].value;
		var last_updated=get_my_time();
		var data_xml="<channel_prices>" +
					"<id>"+data_id+"</id>" +
					"<latest>no</latest>" +
					"<to_time>"+last_updated+"</to_time>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</channel_prices>";
		update_simple(data_xml);
	}
	else
	{
		$("#modal2_link").click();
	}
}
*/
/**
 * @form Sku mapping
 * @formNo 173
 * @param button
 */
function form173_update_item(form)
{
	if(is_update_access('form173'))
	{
		var channel=form.elements[0].value;
		var channel_sku=form.elements[1].value;
		var vendor_sku=form.elements[2].value;
		var system_sku=form.elements[3].value;
		var item_desc=form.elements[4].value;
		var data_id=form.elements[5].value;
		var last_updated=get_my_time();
		var data_xml="<sku_mapping>" +
					"<id>"+data_id+"</id>" +
					"<channel>"+channel+"</channel>" +
					"<channel_sku>"+channel_sku+"</channel_sku>" +
					"<channel_system_sku>"+channel_system_sku+"</channel_system_sku>"+
					"<last_updated>"+last_updated+"</last_updated>" +
					"</sku_mapping>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>sku_mapping</tablename>" +
					"<link_to>form173</link_to>" +
					"<title>Updated</title>" +
					"<notes>SKU mapping for "+system_sku+" for channel "+channel+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		update_row(data_xml,activity_xml);

		for(var i=0;i<5;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
	}
	else
	{
		$("#modal2_link").click();
	}
}


/**
 * @form Pickup Charges
 * @formNo 174
 * @param button
 */
function form174_update_item(form)
{
	if(is_update_access('form174'))
	{
		var channel=form.elements[0].value;
		var pincode=form.elements[1].value;
		var min_charges=form.elements[2].value;
		var max_charges=form.elements[3].value;
		var rate=form.elements[4].value;
		var data_id=form.elements[5].value;
		var last_updated=get_my_time();
		var data_xml="<pickup_charges>" +
					"<id>"+data_id+"</id>" +
					"<channel>"+channel+"</channel>" +
					"<pincode>"+pincode+"</pincode>" +
					"<min_charges>"+min_charges+"</min_charges>"+
					"<max_charges>"+max_charges+"</max_charges>"+
					"<rate>"+rate+"</rate>"+
					"<last_updated>"+last_updated+"</last_updated>" +
					"</pickup_charges>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>pickup_charges</tablename>" +
					"<link_to>form174</link_to>" +
					"<title>Updated</title>" +
					"<notes>Pickup charges for pincode "+pincode+" for channel "+name+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		update_row(data_xml,activity_xml);

		for(var i=0;i<5;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form Channel Category
 * @formNo 175
 * @param button
 */
function form175_update_item(form)
{
	if(is_update_access('form175'))
	{
		var channel=form.elements[0].value;
		var name=form.elements[2].value;
		var commission=form.elements[4].value;
		var data_id=form.elements[5].value;
		var last_updated=get_my_time();
		var data_xml="<channel_category>" +
					"<id>"+data_id+"</id>" +
					"<channel>"+channel+"</channel>" +
					"<commission>"+commission+"</commission>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</channel_category>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>channel_category</tablename>" +
					"<link_to>form175</link_to>" +
					"<title>Updated</title>" +
					"<notes>Commission for category "+name+" for channel "+channel+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		if(is_online())
		{
			server_update_row(data_xml,activity_xml);
		}
		else
		{
			local_update_row(data_xml,activity_xml);
		}

		for(var i=0;i<5;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form Category Item mapping
 * @formNo 176
 * @param button
 */
function form176_update_item(form)
{
	if(is_update_access('form176'))
	{
		var channel=form.elements[0].value;
		var type=form.elements[1].value;
		var category=form.elements[2].value;
		var desc=form.elements[4].value;
		var data_id=form.elements[5].value;
		var last_updated=get_my_time();
		var data_xml="<category_sku_mapping>" +
					"<id>"+data_id+"</id>" +
					"<cat_type>"+type+"</cat_type>" +
					"<cat_name>"+category+"</cat_name>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</category_sku_mapping>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>category_sku_mapping</tablename>" +
					"<link_to>form176</link_to>" +
					"<title>Updated</title>" +
					"<notes>Item to category mapping of  "+desc+" for channel "+channel+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		if(is_online())
		{
			server_update_row(data_xml,activity_xml);
		}
		else
		{
			local_update_row(data_xml,activity_xml);
		}

		for(var i=0;i<5;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form Prioritization Parameters
 * @formNo 177
 * @param button
 */
function form177_update_item(form)
{
	if(is_update_access('form177'))
	{
		var type=form.elements[0].value;
		var name=form.elements[1].value;
		var values=form.elements[2].value;
		var threshold=form.elements[3].value;
		var data_id=form.elements[4].value;
		var last_updated=get_my_time();
		var data_xml="<prioritization_parameters>" +
					"<id>"+data_id+"</id>" +
					"<type>"+type+"</type>" +
					"<name>"+name+"</name>" +
					"<values>"+values+"</values>"+
					"<threshold>"+threshold+"</threshold>"+
					"<last_updated>"+last_updated+"</last_updated>" +
					"</prioritization_parameters>";
		if(is_online())
		{
			server_update_simple(data_xml);
		}
		else
		{
			local_update_simple(data_xml);
		}

		for(var i=0;i<4;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
	}
	else
	{
		$("#modal2_link").click();
	}
}


/**
 * @form Production Steps
 * @formNo 184
 * @param button
 */
function form184_update_item(form)
{
	if(is_update_access('form184'))
	{
		var order_no=form.elements[0].value;
		var name=form.elements[1].value;
		var time=form.elements[2].value;
		var assignee=form.elements[3].value;
		var details=form.elements[4].value;
		var type=form.elements[5].value;
		var status=form.elements[6].value;
		var data_id=form.elements[7].value;
		var last_updated=get_my_time();
		var data_xml="<business_processes>" +
					"<id>"+data_id+"</id>" +
					"<order_no>"+order_no+"</order_no>" +
					"<name>"+name+"</name>" +
					"<details>"+details+"</details>" +
					"<time_estimate>"+time+"</time_estimate>"+
					"<default_assignee>"+assignee+"</default_assignee>"+
					"<type>"+type+"</type>" +
					"<status>"+status+"</status>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</business_processes>";
		update_simple(data_xml);

		for(var i=0;i<7;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
	}
	else
	{
		$("#modal2_link").click();
	}
}


/**
 * @form Testing Steps
 * @formNo 187
 * @param button
 */
function form187_update_item(form)
{
	if(is_update_access('form187'))
	{
		var order_no=form.elements[0].value;
		var name=form.elements[1].value;
		var time=form.elements[2].value;
		var assignee=form.elements[3].value;
		var details=form.elements[4].value;
		var status=form.elements[5].value;
		var data_id=form.elements[6].value;
		var last_updated=get_my_time();
		var data_xml="<business_processes>" +
					"<id>"+data_id+"</id>" +
					"<order_no>"+order_no+"</order_no>" +
					"<name>"+name+"</name>" +
					"<details>"+details+"</details>" +
					"<time_estimate>"+time+"</time_estimate>"+
					"<default_assignee>"+assignee+"</default_assignee>"+
					"<status>"+status+"</status>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</business_processes>";
		if(is_online())
		{
			server_update_simple(data_xml);
		}
		else
		{
			local_update_simple(data_xml);
		}

		for(var i=0;i<6;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
	}
	else
	{
		$("#modal2_link").click();
	}
}

function form187_update_serial_numbers()
{
	$('#form187_body').find('tr').each(function(index)
	{
		$(this).find('td:nth-child(2)>input').attr('value',index+1);
	});
}


/**
 * @form Order (laundry)
 * @formNo 190
 * @param button
 */
function form190_update_item(form)
{
	if(is_update_access('form190'))
	{
		var customer=form.elements[0].value;
		var details=form.elements[1].value;
		var total=form.elements[2].value;
		var status=form.elements[4].value;
		var data_id=form.elements[5].value;
		var last_updated=get_my_time();
		var order_num=form.elements[9].value;

		var data_xml="<sale_orders>" +
					"<id>"+data_id+"</id>" +
					"<customer_name>"+customer+"</customer_name>" +
					"<notes>"+details+"</notes>" +
					"<status>"+status+"</status>"+
					"<last_updated>"+last_updated+"</last_updated>" +
					"</sale_orders>";
		update_simple(data_xml);

		for(var i=0;i<5;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}

		var sms_notification_status=get_session_var('sms_notification_status');
		var sms="";
		var found=sms_notification_status.indexOf(status);
		if(found>=0)
		{
			var f_id=get_my_time();

			if(status=='delivered')
			{
				var last_updated=get_my_time();
				var feedback_xml="<feedback>"+
							"<id>"+f_id+"</id>"+
							"<order_num unique='yes'>"+order_num+"</order_num>"+
							"<provider>"+customer+"</provider>"+
							"<date>"+last_updated+"</date>"+
							"<last_updated>"+last_updated+"</last_updated>"+
							"</feedback>";
				create_simple_no_warning(feedback_xml);
				sms=get_session_var('delivered_sms_message');
			}
			else if(status=='out for delivery')
			{
				sms=get_session_var('out_for_delivery_sms_message');
			}
			else if(status=='ready for delivery')
			{
				sms=get_session_var('ready_for_delivery_sms_message');
			}
			else if(status=='processed')
			{
				sms=get_session_var('processed_sms_message');
			}
			else if(status=='processing')
			{
				sms=get_session_var('processing_sms_message');
			}
			else if(status=='picked')
			{
				sms=get_session_var('picked_sms_message');
			}
			else if(status=='picking')
			{
				sms=get_session_var('picking_sms_message');
			}
			else if(status=='pending')
			{
				sms=get_session_var('pending_sms_message');
			}
			else if(status=='cancelled')
			{
				var last_updated=get_my_time();
				var feedback_xml="<feedback>"+
							"<id>"+f_id+"</id>"+
							"<order_num unique='yes'>"+order_num+"</order_num>"+
							"<provider>"+customer_name+"</provider>"+
							"<date>"+last_updated+"</date>"+
							"<last_updated>"+last_updated+"</last_updated>"+
							"</feedback>";
				create_simple_no_warning(feedback_xml);

				sms=get_session_var('cancelled_sms_message');
			}

			show_loader();

			var feedback_link="vyavsaay.com/f/v.htm?i="+f_id+"&d=washclub";
			//console.log(sms);
			sms=sms.replace(/bill_total/g,total);
			sms=sms.replace(/feedback_link/g,feedback_link);
			var phone_xml="<customers>"+
						"<phone></phone>"+
						"<name></name>"+
						"<acc_name exact='yes'>"+customer+"</acc_name>"+
						"</customers>";
			fetch_requested_data('',phone_xml,function(phones)
			{
				var to=phones[0].phone;
				var customer_name=phones[0].name;
				var sms_content=sms.replace(/customer_name/g,customer_name);
				send_sms(to,sms_content,'transaction');

				hide_loader();
			});
		}
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form Enter Purchase Bill (Laundry)
 * @param button
 */
function form192_update_form()
{
	if(is_update_access('form192'))
	{
		var form=document.getElementById("form192_master");

		var supplier=form.elements[1].value;
		var bill_id=form.elements[2].value;
		var bill_date=get_raw_time(form.elements[3].value);
		var entry_date=get_raw_time(form.elements[4].value);
		var total=0;
		var tax=0;
		var amount=0;

		$("[id^='save_form192']").each(function(index)
		{
			var subform_id=$(this).attr('form');
			var subform=document.getElementById(subform_id);
			total+=parseFloat(subform.elements[5].value);
			tax+=parseFloat(subform.elements[4].value);
		});

		var discount=0;
		amount=total-tax;

		var total_row="<tr><td colspan='2' data-th='Total'>Total</td>" +
				"<td>Amount:</br>Discount: </br>Tax: </br>Total: </td>" +
				"<td>Rs. "+amount+"</br>" +
				"Rs. "+discount+"</br>" +
				"Rs. "+tax+"</br>" +
				"Rs. "+total+"</td>" +
				"<td></td>" +
				"</tr>";
		$('#form192_foot').html(total_row);

		var data_id=form.elements[5].value;
		var transaction_id=form.elements[6].value;
		var last_updated=get_my_time();

		var data_xml="<supplier_bills>" +
					"<id>"+data_id+"</id>" +
					"<bill_id>"+bill_id+"</bill_id>" +
					"<supplier>"+supplier+"</supplier>" +
					"<bill_date>"+bill_date+"</bill_date>" +
					"<entry_date>"+entry_date+"</entry_date>" +
					"<total>"+total+"</total>" +
					"<discount>"+discount+"</discount>" +
					"<amount>"+amount+"</amount>" +
					"<tax>"+tax+"</tax>" +
					"<transaction_id>"+transaction_id+"</transaction_id>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</supplier_bills>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>supplier_bills</tablename>" +
					"<link_to>form53</link_to>" +
					"<title>Updated</title>" +
					"<notes>Supplier Bill no "+data_id+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		var transaction_xml="<transactions>" +
					"<id>"+transaction_id+"</id>" +
					"<trans_date>"+get_my_time()+"</trans_date>" +
					"<amount>"+total+"</amount>" +
					"<receiver>master</receiver>" +
					"<giver>"+supplier+"</giver>" +
					"<tax>"+(-tax)+"</tax>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</transactions>";
		update_row(data_xml,activity_xml);
		update_simple(transaction_xml);

		var payment_data="<payments>" +
				"<id></id>" +
				"<bill_id exact='yes'>"+data_id+"</bill_id>" +
				"</payments>";
		get_single_column_data(function(payments)
		{
			for(var y in payments)
			{
				var payment_xml="<payments>" +
							"<id>"+payments[y]+"</id>" +
							"<type>paid</type>" +
							"<total_amount>"+total+"</total_amount>" +
							"<acc_name>"+supplier+"</acc_name>" +
							"<transaction_id>"+payments[y]+"</transaction_id>" +
							"<bill_id>"+data_id+"</bill_id>" +
							"<last_updated>"+last_updated+"</last_updated>" +
							"</payments>";
				var pt_xml="<transactions>" +
							"<id>"+payments[y]+"</id>" +
							"<amount>"+total+"</amount>" +
							"<receiver>"+supplier+"</receiver>" +
							"<giver>master</giver>" +
							"<tax>0</tax>" +
							"<last_updated>"+last_updated+"</last_updated>" +
							"</transactions>";
				update_simple_func(payment_xml,function()
				{
					modal28_action(payments[y]);
				});
				break;
			}
		},payment_data);

		$("[id^='save_form192_']").click();
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form Update Stock
 * @param button
 */
function form193_update_form()
{
	if(is_update_access('form193'))
	{
		var form=document.getElementById("form193_master");
		var storage=form.elements['storage'].value;
		var items=[];

		var save_button=form.elements['save'];

		$(save_button).off('click');
		$(save_button).on("click", function(event)
		{
			event.preventDefault();
			//form193_update_form();
		});

		form193_get_totals();

		$("[id^='193form193_']").each(function ()
		{
			var item=new Object();
			item.name=this.elements[1].value;
			item.desc=this.elements[2].value;
			item.batch=this.elements[3].value;
			item.quantity=1;
			if(item.name!="")
			items.push(item);
		});

		for(var i=0;i<items.length;i++)
		{
			for(var j=i+1;j<items.length;j++)
			{
				if(items[i].name==items[j].name && items[i].batch==items[j].batch)
				{
					items[i].quantity=items[i].quantity+items[j].quantity;
					items.splice(j,1);
					j-=1;
				}
			}
		}

		var body_html="";
		var head_html="<tr><th>SKU</th><th>Item Name</th><th>Batch</th><th>Quantity</th></tr>";

		var area_util_xml="<area_utilization>"+
						"<item_name></item_name>"+
						"<batch></batch>"+
						"<name exact='yes'>"+storage+"</name>"+
						"</area_utilization>";
		fetch_requested_data('',area_util_xml,function (more_items)
		{
			for(var i=0;i<more_items.length;i++)
			{
				for(var l=i+1;l<more_items.length;l++)
				{
					if(more_items[i].name==more_items[l].item_name && more_items[i].batch==more_items[l].batch)
					{
						more_items.splice(l,1);
						l-=1;
					}
				}
			}
			//console.log(more_items);

			for(var i=0;i<items.length;i++)
			{
				for(var l=0;l<more_items.length;l++)
				{
					if(items[i].name==more_items[l].item_name && items[i].batch==more_items[l].batch)
					{
						more_items.splice(l,1);
						l-=1;
					}
				}
			}
			//console.log(more_items);

			more_items.forEach(function (more_item)
			{
				var item=new Object();
				item.name=more_item.item_name;
				item.desc="";
				item.batch=more_item.batch;
				item.quantity=0;
				if(item.name!="")
				items.push(item);
			});

			//console.log(items);

			var id=vUtil.newKey();
			var counter=1;
			items.forEach(function(item)
			{
				body_html+="<tr><td>"+item.name+"</td><td>"+item.desc+"</td><td>"+item.batch+"</td><td>"+item.quantity+"</td></tr>";

				get_store_inventory(storage,item.name,item.batch,function(sys_quantity)
				{
					counter+=1;
					if(parseFloat(item.quantity)!=parseFloat(sys_quantity))
					{
						var quantity=parseFloat(item.quantity)-parseFloat(sys_quantity);
						//var id=vUtil.newKey();
						var last_updated=get_my_time();
						var data_xml="<inventory_adjust>" +
									"<id>"+(id+counter)+"</id>" +
									"<batch>"+item.batch+"</batch>" +
									"<quantity>"+quantity+"</quantity>" +
									"<product_name>"+item.name+"</product_name>" +
									"<source>manual</source>" +
									"<storage>"+storage+"</storage>" +
									"<last_updated>"+last_updated+"</last_updated>" +
									"</inventory_adjust>";
						var activity_xml="<activity>" +
									"<data_id>"+(id+counter)+"</data_id>" +
									"<tablename>inventory_adjust</tablename>" +
									"<link_to>report66</link_to>" +
									"<title>Updated</title>" +
									"<notes>Inventory of "+item.name+" for storage "+storage+"</notes>" +
									"<updated_by>"+get_name()+"</updated_by>" +
									"</activity>";
						create_row(data_xml,activity_xml);
						//console.log(data_xml);
						///////////adding store placement////////
						var storage_data="<area_utilization>" +
								"<id></id>" +
								"<name exact='yes'>"+storage+"</name>" +
								"<item_name exact='yes'>"+item.name+"</item_name>" +
								"<batch exact='yes'>"+item.batch+"</batch>" +
								"</area_utilization>";
						fetch_requested_data('',storage_data,function(placements)
						{
							counter+=1;
							if(placements.length===0 && parseFloat(item.quantity)>0)
							{
								var storage_xml="<area_utilization>" +
										"<id>"+(id+counter)+"</id>" +
										"<name>"+storage+"</name>" +
										"<item_name>"+item.name+"</item_name>" +
										"<batch>"+item.batch+"</batch>" +
										"<last_updated>"+get_my_time()+"</last_updated>" +
										"</area_utilization>";
								create_simple(storage_xml);
							}
							/*
							else if(placements.length>0 && parseFloat(item.quantity)==0)
							{
								var storage_xml="<area_utilization>" +
										"<id>"+placements[0].id+"</id>" +
										"</area_utilization>";
								delete_simple(storage_xml);
							}
							*/
						});
						///////////////////////////////////
					}
				});
			});
			$('#form193_body').html(body_html);
		});

		$('#form193_head').html(head_html);
		$('#form193_head').parent().attr('class','plain_table');

	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form LetterHead
 * @formNo 195
 * @param button
 */
function form195_update_item(form)
{
	if(is_update_access('form195'))
	{
		var name=form.elements[0].value;
		var to=form.elements[1].value;
		var date=get_raw_time(form.elements[2].value);
		var data_id=form.elements[3].value;
		var last_updated=get_my_time();

		var data_xml="<letterheads>" +
					"<id>"+data_id+"</id>" +
					"<name>"+name+"</name>" +
					"<date>"+date+"</date>"+
					"<receiver>"+to+"</receiver>"+
					"<last_updated>"+last_updated+"</last_updated>" +
					"</letterheads>";
		update_simple(data_xml);

		for(var i=0;i<4;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
	}
	else
	{
		$("#modal2_link").click();
	}
}


/**
 * @form Exchanges
 * @param button
 */
function form202_update_item(form)
{
	if(is_update_access('form202'))
	{
		var master_form=document.getElementById("form202_master");
		var target=master_form.elements['target'].value;

		var awb_num=form.elements[0].value;
		var status='out for delivery';
		var id=form.elements[3].value;
		var last_updated=get_my_time();

		var old_order_history=form.elements[6].value;

		var order_history=vUtil.jsonParse(old_order_history);
		var history_object=new Object();
		history_object.timeStamp=get_my_time();
		history_object.details="In transit";
		history_object.location=target;
		history_object.status='transit';
		order_history.push(history_object);
		var order_history_string=JSON.stringify(order_history);

		var data_xml="<logistics_orders>" +
					"<id>"+id+"</id>" +
					//"<awb_num>"+awb_num+"</awb_num>" +
					"<status>"+status+"</status>" +
					"<order_history>"+order_history_string+"</order_history>" +
					"<current_location>"+target+"</current_location>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</logistics_orders>";
		var activity_xml="<activity>" +
					"<data_id>"+id+"</data_id>" +
					"<tablename>logistics_orders</tablename>" +
					"<link_to>form198</link_to>" +
					"<title>Transferred</title>" +
					"<notes>AWB # "+awb_num+" to "+target+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		update_row(data_xml,activity_xml);

		for(var i=0;i<3;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form Logistics Pending orders
 * @param button
 */
function form204_update_item(form)
{
	if(is_update_access('form204'))
	{
		var master_form=document.getElementById("form204_master");
		var comments=master_form.elements['comments'].value;

		var awb_num=form.elements[0].value;
		var status='pending';
		var id=form.elements[2].value;
		var last_updated=get_my_time();

		var old_order_history=form.elements[5].value;

		var order_history=vUtil.jsonParse(old_order_history);
		var history_object=new Object();
		history_object.timeStamp=get_my_time();
		history_object.details=comments;
		history_object.location=get_session_var('address');
		history_object.status=status;
		order_history.push(history_object);
		var order_history_string=JSON.stringify(order_history);

		var data_xml="<logistics_orders>" +
					"<id>"+id+"</id>" +
					//"<awb_num>"+awb_num+"</awb_num>" +
					"<status>"+status+"</status>" +
					"<order_history>"+order_history_string+"</order_history>" +
					"<comments>"+comments+"</comments>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</logistics_orders>";
		var activity_xml="<activity>" +
					"<data_id>"+id+"</data_id>" +
					"<tablename>logistics_orders</tablename>" +
					"<link_to>form198</link_to>" +
					"<title>Marked Pending</title>" +
					"<notes>AWB # "+awb_num+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		update_row(data_xml,activity_xml);

		for(var i=0;i<2;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}

	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form Logistics unDelivered orders
 * @param button
 */
function form205_update_item(form)
{
	if(is_update_access('form205'))
	{
		var master_form=document.getElementById("form205_master");
		var comments=master_form.elements['comments'].value;

		var awb_num=form.elements[0].value;
		var status='undelivered';
		var id=form.elements[2].value;
		var last_updated=get_my_time();

		var old_order_history=form.elements[5].value;

		var order_history=vUtil.jsonParse(old_order_history);
		var history_object=new Object();
		history_object.timeStamp=get_my_time();
		history_object.details=comments;
		history_object.location="";
		history_object.status=status;
		order_history.push(history_object);
		var order_history_string=JSON.stringify(order_history);

		var data_xml="<logistics_orders>" +
					"<id>"+id+"</id>" +
					//"<awb_num>"+awb_num+"</awb_num>" +
					"<status>"+status+"</status>" +
					"<order_history>"+order_history_string+"</order_history>" +
					"<comments>"+comments+"</comments>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</logistics_orders>";
		var activity_xml="<activity>" +
					"<data_id>"+id+"</data_id>" +
					"<tablename>logistics_orders</tablename>" +
					"<link_to>form198</link_to>" +
					"<title>Delivered</title>" +
					"<notes>AWB # "+awb_num+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		update_row(data_xml,activity_xml);

		for(var i=0;i<2;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form Logistics delivered orders
 * @param button
 */
function form206_update_item(form)
{
	if(is_update_access('form206'))
	{
		var master_form=document.getElementById("form206_master");
		var comments=master_form.elements['comments'].value;

		var awb_num=form.elements[0].value;
		var status='delivered';
		var id=form.elements[2].value;
		var last_updated=get_my_time();

		var old_order_history=form.elements[5].value;

		var order_history=vUtil.jsonParse(old_order_history);
		var history_object=new Object();
		history_object.timeStamp=get_my_time();
		history_object.details=comments;
		history_object.location="";
		history_object.status=status;
		order_history.push(history_object);
		var order_history_string=JSON.stringify(order_history);

		var data_xml="<logistics_orders>" +
					"<id>"+id+"</id>" +
					//"<awb_num>"+awb_num+"</awb_num>" +
					"<status>"+status+"</status>" +
					"<delivery_time>"+history_object.timeStamp+"</delivery_time>" +
					"<order_history>"+order_history_string+"</order_history>" +
					"<comments>"+comments+"</comments>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</logistics_orders>";
		var activity_xml="<activity>" +
					"<data_id>"+id+"</data_id>" +
					"<tablename>logistics_orders</tablename>" +
					"<link_to>form198</link_to>" +
					"<title>Marked Undelivered</title>" +
					"<notes>AWB # "+awb_num+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		update_row(data_xml,activity_xml);

		for(var i=0;i<2;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form Treatment Plans
 * @formNo 208
 * @param button
 */
function form208_update_item(form)
{
	if(is_update_access('form208'))
	{
		var num=form.elements[0].value;
		var customer=form.elements[1].value;
		var details=form.elements[2].value;
		var start_date=get_raw_time(form.elements[3].value);
		var status=form.elements[4].value;
		var data_id=form.elements[5].value;
		var last_updated=get_my_time();

		var data_xml="<treatment_plans>" +
					"<id>"+data_id+"</id>" +
					"<details>"+details+"</details>" +
					"<start_date>"+start_date+"</start_date>" +
					"<status>"+status+"</status>"+
					"<last_updated>"+last_updated+"</last_updated>" +
					"</treatment_plans>";
		update_simple(data_xml);

		for(var i=0;i<5;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form Create Treatment plan
 * @formNo 209
 * @param button
 */
function form209_update_item(form)
{
	if(is_update_access('form209'))
	{
		var master_form=document.getElementById("form209_master");
		var plan_id=master_form.elements['plan_id'].value;

		var order=form.elements[0].value;
		var item=form.elements[1].value;
		var details=form.elements[2].value;
		var from=get_raw_time(form.elements[4].value);
		var to=get_raw_time(form.elements[5].value);
		var status=form.elements[6].value;
		var data_id=form.elements[7].value;
		var save_button=form.elements[8];
		var del_button=form.elements[9];
		var last_updated=get_my_time();

		var data_xml="<treatment_plan_items>" +
				"<id>"+data_id+"</id>" +
				"<order_no>"+order+"</order_no>" +
				"<item>"+item+"</item>" +
				"<details>"+details+"</details>" +
				"<from_time>"+from+"</from_time>" +
				"<to_time>"+to+"</to_time>" +
				"<status>"+status+"</status>" +
				"<plan_id>"+plan_id+"</plan_id>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</treatment_plan_items>";

		update_simple(data_xml);

		for(var i=0;i<7;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
	}
	else
	{
		$("#modal2_link").click();
	}
}


/**
 * @form Create Treatment Plan
 * @param button
 */
function form209_update_form()
{
	if(is_update_access('form209'))
	{
		var form=document.getElementById("form209_master");

		var num=form.elements['num'].value;
		var customer=form.elements['customer'].value;
		var start_date=get_raw_time(form.elements['date'].value);
		var status=form.elements['status'].value;
		var data_id=form.elements['plan_id'].value;
		var save_button=form.elements['save'];
		var last_updated=get_my_time();

		var data_xml="<treatment_plans>" +
					"<id>"+data_id+"</id>" +
					"<plan_num>"+num+"</plan_num>" +
					"<start_date>"+start_date+"</start_date>" +
					"<customer>"+customer+"</customer>" +
					"<status>"+status+"</status>"+
					"<last_updated>"+last_updated+"</last_updated>" +
					"</treatment_plans>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>treatment_plans</tablename>" +
					"<link_to>form208</link_to>" +
					"<title>Updated</title>" +
					"<notes>Treatment Plan "+num+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		update_row(data_xml,activity_xml);

		$("[id^='save_form209_']").click();
	}
	else
	{
		$("#modal2_link").click();
	}
}

function form209_update_serial_numbers()
{
	$('#form209_body').find('tr').each(function(index)
	{
		$(this).find('td:nth-child(2)>input').attr('value',index+1);
	});
}

/**
 * @form Order packing
 * @formNo 210
 * @param button
 */
function form210_reject_item(bar_code)
{
	if(is_update_access('form210'))
	{
		modal157_action(function (rejection_reason)
		{
			var columns="<product_master count='1'>" +
				"<id></id>" +
				"<name></name>"+
				"<bar_code exact='yes'>"+bar_code+"</bar_code>" +
				"</product_master>";
			fetch_requested_data('',columns,function (products)
			{
				var first_match=false;
				$("[id^='form210_row_']").each(function(index)
				{
					if(!first_match)
					{
						var item_object=vUtil.jsonParse($(this).attr('data-object'));
						var data_id=item_object.id;
						var item_storage=item_object.storage;
						var item_name=item_object.item_name;
						var item_batch=item_object.batch;
						var table_type=item_object.table_type;
						var packed_quantity=parseFloat(document.getElementById('form210_packed_'+data_id).innerHTML);
						var rejected_quantity=parseFloat(document.getElementById('form210_rejected_'+data_id).innerHTML)+1;
						var total_quantity=parseFloat(document.getElementById('form210_topack_'+data_id).innerHTML);
						//console.log(item_name);

						if(item_name==products[0].name && (rejected_quantity+packed_quantity)<=total_quantity)
						{
							first_match=true;
							var status='pending';
							var rejected_quantity_elem=document.getElementById('form210_rejected_'+data_id);

							$(rejected_quantity_elem).parent().parent().addClass('red_row');

							rejected_quantity_elem.innerHTML=rejected_quantity;

							var quantity_sign="";
							if(table_type=='inventory_adjust')
							{
								quantity_sign="-";
							}

							//console.log($(packed_quantity_elem).parent());
							var items_xml="<"+table_type+">"+
									"<id>"+data_id+"</id>"+
									"<picked_status>pending</picked_status>"+
									"<packing_status>pending</packing_status>"+
									"<packed_quantity>"+quantity_sign+packed_quantity+"</packed_quantity>"+
									"<picked_quantity>"+quantity_sign+packed_quantity+"</picked_quantity>"+
									"<last_updated>"+get_my_time()+"</last_updated>"+
									"</"+table_type+">";
							update_simple(items_xml);

							var discarded_xml="<discarded>"+
									"<id>"+vUtil.newKey()+"</id>"+
									"<batch>"+item_batch+"</batch>"+
					                "<quantity>1</quantity>"+
					                "<product_name>"+item_name+"</product_name>"+
					                "<source>manual</source>"+
					                "<source_link></source_link>"+
					                "<source_id></source_id>"+
					                "<reason>"+rejection_reason+"</reason>"+
					                "<put_away_status></put_away_status>"+
					                "<storage>"+item_storage+"</storage>"+
					                "<status>pending approval</status>"+
									"<last_updated>"+get_my_time()+"</last_updated>"+
									"</discarded>";
							create_simple(discarded_xml);
							console.log(rejection_reason);
						}
					}
				});
				if(!first_match)
				{
					$("#modal71_link").click();
				}
			});
		});
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form Order packing
 * @formNo 210
 * @param button
 */
function form210_accept_item(bar_code)
{
	if(is_update_access('form210'))
	{
		var columns="<product_master count='1'>" +
			"<id></id>" +
			"<name></name>"+
			"<bar_code exact='yes'>"+bar_code+"</bar_code>" +
			"</product_master>";
		fetch_requested_data('',columns,function (products)
		{
			var first_match=false;
			$("[id^='form210_row_']").each(function(index)
			{
				if(!first_match)
				{
					var item_object=vUtil.jsonParse($(this).attr('data-object'));
					var data_id=item_object.id;
					var item_storage=item_object.storage;
					var item_name=item_object.item_name;
					var item_batch=item_object.batch;
					var table_type=item_object.table_type;

					var packed_quantity=parseFloat(document.getElementById('form210_packed_'+data_id).innerHTML)+1;
					var rejected_quantity=parseFloat(document.getElementById('form210_rejected_'+data_id).innerHTML);
					var total_quantity=parseFloat(document.getElementById('form210_topack_'+data_id).innerHTML);
					//console.log(item_name);

					if(item_name==products[0].name && (rejected_quantity+packed_quantity)<=total_quantity)
					{
						first_match=true;
						var status='pending';
						var packed_quantity_elem=document.getElementById('form210_packed_'+data_id);

						if(packed_quantity==total_quantity)
						{
							status='packed';
							$(packed_quantity_elem).parent().parent().addClass('green_row');
						}

						packed_quantity_elem.innerHTML=packed_quantity;

						$(packed_quantity_elem).parent().addClass('glowing_td');
						setTimeout(function ()
						{
							$(packed_quantity_elem).parent().removeClass('glowing_td');
						},1000);

						var quantity_sign="";
						if(table_type=='inventory_adjust')
						{
							quantity_sign="-";
						}

						//console.log($(packed_quantity_elem).parent());
						var items_xml="<"+table_type+">"+
								"<id>"+data_id+"</id>"+
								"<packing_status>"+status+"</packing_status>"+
								"<packed_quantity>"+quantity_sign+packed_quantity+"</packed_quantity>"+
								"<last_updated>"+get_my_time()+"</last_updated>"+
								"</"+table_type+">";
						update_simple(items_xml);

						//$("#modal69_link").click();
					}
				}
			});
			if(!first_match)
			{
				$("#modal71_link").click();
			}

		});
	}
	else
	{
		$("#modal2_link").click();
	}
}



/**
 * formNo 215
 * form Create Manifest
 * @param button
 */
function form215_update_item(form)
{
	if(is_update_access('form215'))
	{
		var drs_num=document.getElementById('form215_master').elements['man_num'].value;
		var data_id=form.elements[4].value;
		var last_updated=get_my_time();

		var data_xml="<bills>" +
					"<id>"+data_id+"</id>" +
					"<manifest_num>"+drs_num+"</manifest_num>"+
					"<last_updated>"+last_updated+"</last_updated>" +
					"</bills>";
		update_simple(data_xml);
	}
	else
	{
		$("#modal2_link").click();
	}
}


function form215_update_serial_numbers()
{
	$('#form215_body').find('tr').each(function(index)
	{
		$(this).find('td:nth-child(2)').html(index+1);
	});

	var num_orders=0;
	$("[id^='save_form215']").each(function(index)
	{
		var subform_id=$(this).attr('form');
		var subform=document.getElementById(subform_id);

		if(subform.elements[1].value!="")
		{
			num_orders+=1;
		}
	});

	var form=document.getElementById("form215_master");
	form.elements['num_orders'].value=num_orders;
}

/**
 * @form Create DRS
 * @param button
 */
function form215_update_form()
{
	if(is_create_access('form215'))
	{
		var form=document.getElementById("form215_master");

		var drs_num=form.elements['man_num'].value;
		var ddate=get_raw_time(form.elements['date'].value);
		var data_id=form.elements['id'].value;

		$('#form215_share').show();
		$('#form215_share').click(function()
		{
			modal101_action('Order Manifest','','staff',function (func)
			{
				print_form215(func);
			});
		});

		var save_button=form.elements['save'];
		var last_updated=get_my_time();

		var num_orders=0;
		$("[id^='save_form215']").each(function(index)
		{
			var subform_id=$(this).attr('form');
			var subform=document.getElementById(subform_id);

			if(subform.elements[1].value!="")
			{
				num_orders+=1;
			}
		});

		var drs_columns="<drs count='2'>" +
					"<id></id>"+
					"<drs_num exact='yes'>"+drs_num+"</drs_num>"+
					"</drs>";
		fetch_requested_data('',drs_columns,function(drses)
		{
			if(drses.length==0 || (drses.length==1 && drses[0].id==data_id))
			{
				var data_xml="<drs>" +
							"<id>"+data_id+"</id>" +
							"<drs_num>"+drs_num+"</drs_num>"+
							"<drs_time>"+ddate+"</drs_time>"+
							"<num_orders>"+num_orders+"</num_orders>"+
							"<last_updated>"+last_updated+"</last_updated>" +
							"</drs>";
				var activity_xml="<activity>" +
							"<data_id>"+data_id+"</data_id>" +
							"<tablename>drs</tablename>" +
							"<link_to>form236</link_to>" +
							"<title>Updated</title>" +
							"<notes>Manifest # "+drs_num+"</notes>" +
							"<updated_by>"+get_name()+"</updated_by>" +
							"</activity>";
				update_row(data_xml,activity_xml);

				$("[id^='save_form215_']").click();
			}
			else
			{
				$("#modal68_link").click();
			}
		});
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * formNo 217
 * form SKU mapping (Supplier)
 * @param button
 */
function form217_update_item(form)
{
	if(is_update_access('form217'))
	{
		var supplier=form.elements[0].value;
		var item=form.elements[1].value;
		var desc=form.elements[2].value;
		var sku=form.elements[3].value;
		var margin=form.elements[4].value;
		var data_id=form.elements[5].value;
		var del_button=form.elements[7];
		var last_updated=get_my_time();
		var data_xml="<supplier_item_mapping>" +
					"<id>"+data_id+"</id>" +
					"<item>"+item+"</item>" +
					"<item_desc>"+desc+"</item_desc>" +
					"<supplier>"+supplier+"</supplier>" +
					"<supplier_sku>"+sku+"</supplier_sku>" +
					"<margin>"+margin+"</margin>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</supplier_item_mapping>";
		if(is_online())
		{
			server_update_simple(data_xml);
		}
		else
		{
			local_update_simple(data_xml);
		}
		for(var i=0;i<5;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
	}
	else
	{
		$("#modal2_link").click();
	}
}



/**
 * @form Manage Purchase orders
 * @param button
 */
function form223_update_item(form)
{
	if(is_update_access('form223'))
	{
		var order_num=form.elements[0].value;
		var supplier_name=form.elements[1].value;
		var order_date=get_raw_time(form.elements[2].value);
		var status=form.elements[3].value;
		var data_id=form.elements[4].value;
		var last_updated=get_my_time();
		var data_xml="<purchase_orders>" +
					"<id>"+data_id+"</id>" +
					"<supplier>"+supplier_name+"</supplier>" +
					"<order_date>"+order_date+"</order_date>" +
					"<status>"+status+"</status>" +
					"<order_num>"+order_num+"</order_num>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</purchase_orders>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>purchase_orders</tablename>" +
					"<link_to>form223</link_to>" +
					"<title>Updated</title>" +
					"<notes>Purchase Order # "+order_num+" for supplier "+supplier_name+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		if(is_online())
		{
			server_update_row(data_xml,activity_xml);
		}
		else
		{
			local_update_row(data_xml,activity_xml);
		}
		for(var i=0;i<4;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
	}
	else
	{
		$("#modal2_link").click();
	}
}


/**
 * @form New Purchase Order (Aurilion)
 * @param button
 */
function form222_update_form()
{
	if(is_update_access('form222'))
	{
		var form=document.getElementById("form222_master");

		var supplier=form.elements['supplier'].value;
		var order_date=get_raw_time(form.elements['date'].value);
		var order_num=form.elements['order_num'].value;
		var status=form.elements['status'].value;
		var data_id=form.elements['order_id'].value;
		var last_updated=get_my_time();


		var amount=0;
		var tax=0;
		var total=0;

		$("[id^='save_form222']").each(function(index)
		{
			var subform_id=$(this).attr('form');
			var subform=document.getElementById(subform_id);

			if(!isNaN(parseFloat(subform.elements[5].value)))
			{
				amount+=parseFloat(subform.elements[5].value);
				tax+=parseFloat(subform.elements[6].value);
				total+=parseFloat(subform.elements[7].value);
			}
		});

		var total_row="<tr><td colspan='2' data-th='Total'>Total</td>" +
								"<td>Amount:<br>Tax: <br>Total: </td>" +
								"<td>Rs. "+amount+"<br>" +
								"Rs. "+tax+"<br> " +
								"Rs. "+total+"</td>" +
								"<td></td>" +
								"</tr>";

		$('#form222_foot').html(total_row);

		var data_xml="<purchase_orders>" +
					"<id>"+data_id+"</id>" +
					"<supplier>"+supplier+"</supplier>" +
					"<order_date>"+order_date+"</order_date>" +
					"<status>"+status+"</status>" +
					"<order_num>"+order_num+"</order_num>" +
					"<amount>"+amount+"</amount>" +
					"<tax>"+tax+"</tax>" +
					"<total>"+total+"</total>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</purchase_orders>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>purchase_orders</tablename>" +
					"<link_to>form43</link_to>" +
					"<title>Updated</title>" +
					"<notes>Purchase order # "+order_num+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		update_row(data_xml,activity_xml);
		$("[id^='save_form222_']").click();
	}
	else
	{
		$("#modal2_link").click();
	}
}


/**
 * @form Create Prescription
 * @param button
 */
function form231_update_form()
{
	if(is_update_access('form231'))
	{
		show_loader();
		var form=document.getElementById("form231_master");

		var data_id=form.elements['pres_id'].value;
		var date=get_raw_time(form.elements['date'].value);
		var next_visit=get_raw_time(form.elements['next'].value);
		var pres_num=form.elements['p_num'].value;
		var patient=form.elements['patient'].value;
		var save_button=form.elements['save'];
		var last_updated=get_my_time();

		var data_xml="<prescriptions>" +
					"<id>"+data_id+"</id>" +
					"<p_num>"+pres_num+"</p_num>" +
					"<date>"+date+"</date>" +
					"<next_date>"+next_visit+"</next_date>" +
					"<patient>"+patient+"</patient>"+
					"<last_updated>"+last_updated+"</last_updated>" +
					"</prescriptions>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>prescriptions</tablename>" +
					"<link_to>form232</link_to>" +
					"<title>Updated</title>" +
					"<notes>Prescription # "+pres_num+" for "+patient+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		update_row(data_xml,activity_xml);

		$("[id^='save_form231_']").click();
	}
	else
	{
		$("#modal2_link").click();
	}
}


/**
 * @form Newsletter Creator
 * @param button
 */
function form233_update_item()
{
	if(is_update_access('form233'))
	{
		show_loader();
		var form=document.getElementById("form233_form");

		var new_key=vUtil.newKey();
		var counter=0;

		$("[id^='vyavsaay_image_box_']").each(function(index)
		{
			counter+=1;
			var image_elem=$(this)[0];
			vUtil.resize_picture(image_elem,image_elem.width);

			var data_src=image_elem.getAttribute('data-src');
			console.log(data_src);
			var blob=image_elem.src;
			var blob_name=data_src;

			if(data_src=="" || data_src=='undefined' || data_src=='null' || data_src==null)
			{
				blob_name=vUtil.newKey()+".jpeg";
				image_elem.setAttribute('data-src',blob_name);
			}

			if(is_online())
			{
				$.ajax(
				{
					type: "POST",
					url: server_root+"/ajax/s3_doc.php",
					data:
					{
						blob: blob,
						name:blob_name,
						content_type:'image/jpeg'
					},
					success: function(return_data,return_status,e)
					{
						console.log(e.responseText);
					}
				});
			}
			else
			{
				var s3_xml="<s3_objects>"+
							"<id>"+(new_key+counter)+"</id>"+
							"<data_blob>"+blob+"</data_blob>"+
							"<name>"+blob_name+"</name>"+
							"<type>image/jpeg</type>"+
							"<status>pending</status>"+
							"<last_updated>"+get_my_time()+"</last_updated>"+
							"</s3_objects>";
				create_simple(s3_xml);
			}
			console.log('image saved');
		});


		var data_id=form.elements['id'].value;
		var name=form.elements['name'].value;
		var description=form.elements['description'].value;
		var pic_url=form.elements['pic_url'].value;
		var form233_section=document.getElementById('form233_section');
		var html_content=form233_section.innerHTML;
		var save_button=form.elements['save'];
		var last_updated=get_my_time();

		var data_xml="<newsletter>" +
					"<id>"+data_id+"</id>" +
					"<name>"+name+"</name>" +
					"<description>"+description+"</description>" +
					"<html_content>"+htmlentities(html_content)+"</html_content>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</newsletter>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>newsletter</tablename>" +
					"<link_to>form2</link_to>" +
					"<title>Updated</title>" +
					"<notes>Newsletter "+name+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		update_row(data_xml,activity_xml);
	}
	else
	{
		$("#modal2_link").click();
	}
}


/**
 * @form Newsletter Creator
 * @param button
 */
/*function form233_update_item()
{
	if(is_update_access('form233'))
	{
		show_loader();
		var form=document.getElementById("form233_form");

		$("[id^='vyavsaay_image_box_']").each(function(index)
		{
			var image_elem=$(this)[0];
			vUtil.resize_picture(image_elem,image_elem.width);
		});

		var data_id=form.elements['id'].value;
		var name=form.elements['name'].value;
		var description=form.elements['description'].value;
		var pic_url=form.elements['pic_url'].value;
		var form233_section=document.getElementById('form233_section');
		var html_content=form233_section.innerHTML;
		var save_button=form.elements['save'];
		var last_updated=get_my_time();


		var new_div_container=document.getElementById('newsletter_print_div');
		$(new_div_container).html(html_content);
		//$(new_div_container).width($(form233_section).width());
		//$(new_div_container).height($(form233_section).height());

		//console.log(form233_section.style('width'));

		$(new_div_container).find('img').each(function ()
		{
			var img_element=$(this)[0];

			img_element.removeAttribute('onclick');
			img_element.removeAttribute('onmouseup');
			img_element.removeAttribute('onmousedown');
			img_element.removeAttribute('onchange');
			img_element.removeAttribute('contenteditable');
		});

		$(new_div_container).find('div').each(function ()
		{
			var div_element=$(this)[0];
			div_element.removeAttribute('onclick');
			div_element.removeAttribute('onmouseup');
			div_element.removeAttribute('onmousedown');
			div_element.removeAttribute('onchange');
			div_element.removeAttribute('contenteditable');
		});

		////code to convert new_div_container to image_elem//////////

		var blob="";
		//console.log(new_div_container);
		html2canvas(new_div_container,
		{
		    onrendered: function (canvas)
		    {
		       blob=canvas.toDataURL("image/jpeg");
		       //console.log(blob);
		       //console.log(canvas);
				/////////////////////////////////////

				if(pic_url=="")
				{
					var blob_name=get_domain()+"_"+vUtil.newKey()+".jpeg";
				}
				else
				{
					var blob_name=pic_url;
				}

				$.ajax(
				{
					type: "POST",
					url: server_root+"/ajax/s3_doc.php",
					data:
					{
						blob: blob,
						name:blob_name,
						content_type:'image/jpeg'
					},
					success: function(return_data,return_status,e)
					{
						console.log(e.responseText);
						$(new_div_container).html('xyz');
					}
				});

				var data_xml="<newsletter>" +
							"<id>"+data_id+"</id>" +
							"<name>"+name+"</name>" +
							"<description>"+description+"</description>" +
							"<html_content>"+htmlentities(html_content)+"</html_content>" +
							"<pic_url>"+blob_name+"</pic_url>"+
							"<last_updated>"+last_updated+"</last_updated>" +
							"</newsletter>";
				var activity_xml="<activity>" +
							"<data_id>"+data_id+"</data_id>" +
							"<tablename>newsletter</tablename>" +
							"<link_to>form2</link_to>" +
							"<title>Updated</title>" +
							"<notes>Newsletter "+name+"</notes>" +
							"<updated_by>"+get_name()+"</updated_by>" +
							"</activity>";
				update_row(data_xml,activity_xml);
		    }
		});
	}
	else
	{
		$("#modal2_link").click();
	}
}
*/


/**
 * formNo 230
 * form In-out
 * @param button
 */
function form230_update_item(form)
{
	if(is_update_access('form230'))
	{
		var item=form.elements[0].value;
		var quantity=form.elements[1].value;
		var issue_type=form.elements[2].value;
		var hiring_type=form.elements[3].value;
		var customer=form.elements[4].value;
		var date=get_raw_time(form.elements[5].value);
		var notes=form.elements[6].value;
		var data_id=form.elements[7].value;
		var last_updated=get_my_time();
		var data_xml="<bill_items>" +
					"<id>"+data_id+"</id>" +
					"<item_name>"+item+"</item_name>" +
					"<hiring_type>"+hiring_type+"</hiring_type>" +
					"<issue_type>"+issue_type+"</issue_type>" +
					"<issue_date>"+date+"</issue_date>" +
					"<customer>"+customer+"</customer>" +
					"<notes>"+notes+"</notes>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</bill_items>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>bill_items</tablename>" +
					"<link_to>form230</link_to>" +
					"<title>"+issue_type+"</title>" +
					"<notes>"+quantity+" pieces of "+item+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		update_row(data_xml,activity_xml);
		for(var i=0;i<7;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form Manage Products (Grid)
 * @param button
 */
function form235_update_item(form)
{
	if(is_update_access('form235'))
	{
		var pic_id=$("#img_form235_"+data_id).parent().attr('name');
		var url=$("#img_form235_"+data_id).attr('src');
		var name=form.elements[3].value;
		var make=form.elements[4].value;
		var description=form.elements[5].value;
		var tax=form.elements[6].value;
		var data_id=form.elements[7].value;
		var last_updated=get_my_time();

		var data_xml="<product_master>" +
					"<id>"+data_id+"</id>" +
					"<make>"+make+"</make>" +
					"<name>"+name+"</name>" +
					"<description>"+description+"</description>" +
					"<tax>"+tax+"</tax>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</product_master>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>product_master</tablename>" +
					"<link_to>form235</link_to>" +
					"<title>Updated</title>" +
					"<notes>Product "+name+" from inventory</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		var pic_xml="<documents>" +
					"<id>"+pic_id+"</id>" +
					"<url>"+url+"</url>" +
					"<doc_type>product_master</doc_type>" +
					"<target_id>"+data_id+"</target_id>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</documents>";

		update_row(data_xml,activity_xml);
		update_simple(pic_xml);
		create_simple(pic_xml);

		for(var i=0;i<7;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
	}
	else
	{
		$("#modal2_link").click();
	}
}


/**
 * @form Add Stock
 * @param button
 */
function form244_update_form()
{
	if(is_update_access('form244'))
	{
		var form=document.getElementById("form244_master");
		var storage=form.elements['storage'].value;
		var items=[];

		var save_button=form.elements['save'];

		$(save_button).off('click');
		$(save_button).on("click", function(event)
		{
			event.preventDefault();
			//form193_update_form();
		});

		form244_get_totals();

		$("[id^='244form244_']").each(function ()
		{
			var item=new Object();
			item.name=this.elements[1].value;
			item.desc=this.elements[2].value;
			item.batch=this.elements[3].value;
			item.quantity=1;
			if(item.name!="")
			items.push(item);
		});

		for(var i=0;i<items.length;i++)
		{
			for(var j=i+1;j<items.length;j++)
			{
				if(items[i].name==items[j].name && items[i].batch==items[j].batch)
				{
					items[i].quantity=items[i].quantity+items[j].quantity;
					items.splice(j,1);
					j-=1;
				}
			}
		}

		var body_html="";
		var head_html="<tr><th>SKU</th><th>Item Name</th><th>Batch</th><th>Quantity</th></tr>";

		var id=vUtil.newKey();
		var counter=1;
		items.forEach(function(item)
		{
			body_html+="<tr><td>"+item.name+"</td><td>"+item.desc+"</td><td>"+item.batch+"</td><td>"+item.quantity+"</td></tr>";
			counter+=1;
			if(parseFloat(item.quantity)>0)
			{
				//var id=vUtil.newKey();
				var last_updated=get_my_time();
				var data_xml="<inventory_adjust>" +
							"<id>"+(id+counter)+"</id>" +
							"<batch>"+item.batch+"</batch>" +
							"<quantity>"+item.quantity+"</quantity>" +
							"<product_name>"+item.name+"</product_name>" +
							"<source>manual</source>" +
							"<storage>"+storage+"</storage>" +
							"<last_updated>"+last_updated+"</last_updated>" +
							"</inventory_adjust>";
				var activity_xml="<activity>" +
							"<data_id>"+(id+counter)+"</data_id>" +
							"<tablename>inventory_adjust</tablename>" +
							"<link_to>report66</link_to>" +
							"<title>Updated</title>" +
							"<notes>Stock of "+item.name+" for storage "+storage+"</notes>" +
							"<updated_by>"+get_name()+"</updated_by>" +
							"</activity>";
				create_row(data_xml,activity_xml);

				///////////adding store placement////////
				var storage_data="<area_utilization>" +
						"<id></id>" +
						"<name exact='yes'>"+storage+"</name>" +
						"<item_name exact='yes'>"+item.name+"</item_name>" +
						"<batch exact='yes'>"+item.batch+"</batch>" +
						"</area_utilization>";
				fetch_requested_data('',storage_data,function(placements)
				{
					counter+=1;
					if(placements.length===0 && parseFloat(item.quantity)>0)
					{
						var storage_xml="<area_utilization>" +
								"<id>"+(id+counter)+"</id>" +
								"<name>"+storage+"</name>" +
								"<item_name>"+item.name+"</item_name>" +
								"<batch>"+item.batch+"</batch>" +
								"<last_updated>"+get_my_time()+"</last_updated>" +
								"</area_utilization>";
						create_simple(storage_xml);
					}
				});
				///////////////////////////////////
			}

		});
		$('#form244_body').html(body_html);

		$('#form244_head').html(head_html);
		$('#form244_head').parent().attr('class','plain_table');

	}
	else
	{
		$("#modal2_link").click();
	}
}


/**
 * formNo 248
 * form Create Transit Bag
 * @param button
 */
function form248_update_item(form)
{
	if(is_update_access('form248'))
	{
		var bag_num=document.getElementById('form248_master').elements['bag_num'].value;
		var data_id=form.elements[4].value;
		var last_updated=get_my_time();

		var data_xml="<logistics_orders>" +
					"<id>"+data_id+"</id>" +
					"<bag_num>"+bag_num+"</bag_num>"+
					"<last_updated>"+last_updated+"</last_updated>" +
					"</logistics_orders>";
		update_simple(data_xml);
	}
	else
	{
		$("#modal2_link").click();
	}
}


/**
 * @form Manage Transit bags
 * @param button
 */
function form248_update_form()
{
	if(is_create_access('form248'))
	{
		var form=document.getElementById("form248_master");

		var bag_num=form.elements['bag_num'].value;
		var lbh=form.elements['lbh'].value;
		var weight=form.elements['weight'].value;
		var num_orders=form.elements['num_orders'].value;
		var date=get_raw_time(form.elements['date'].value);
		var data_id=form.elements['id'].value;

		var save_button=form.elements['save'];
		var last_updated=get_my_time();

		var bag_columns="<transit_bags count='2'>" +
					"<id></id>"+
					"<bag_num exact='yes'>"+bag_num+"</bag_num>"+
					"</transit_bags>";
		fetch_requested_data('',bag_columns,function(bags)
		{
			if(bags.length==0 || (bags.length==1 && bags[0].id==data_id))
			{
				var data_xml="<transit_bags>" +
							"<id>"+data_id+"</id>" +
							"<bag_num>"+bag_num+"</bag_num>"+
							"<lbh>"+lbh+"</lbh>"+
							"<weight>"+weight+"</weight>"+
							"<num_orders>"+num_orders+"</num_orders>"+
							"<date>"+date+"</date>"+
							"<last_updated>"+last_updated+"</last_updated>" +
							"</transit_bags>";
				var activity_xml="<activity>" +
							"<data_id>"+data_id+"</data_id>" +
							"<tablename>transit_bags</tablename>" +
							"<link_to>form249</link_to>" +
							"<title>Updated</title>" +
							"<notes>Bag # "+bag_num+"</notes>" +
							"<updated_by>"+get_name()+"</updated_by>" +
							"</activity>";
				update_row(data_xml,activity_xml);


				$("[id^='save_form248_']").click();
			}
			else
			{
				$("#modal77_link").click();
			}
		});
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * formNo 250
 * form Create MTS
 * @param button
 */
function form250_update_item(form)
{
	if(is_update_access('form250'))
	{
		var mts_num=document.getElementById('form250_master').elements['mts_num'].value;
		var data_id=form.elements[4].value;
		var last_updated=get_my_time();

		var data_xml="<transit_bags>" +
					"<id>"+data_id+"</id>" +
					"<mts>"+mts_num+"</mts>"+
					"<last_updated>"+last_updated+"</last_updated>" +
					"</transit_bags>";
		update_simple(data_xml);
	}
	else
	{
		$("#modal2_link").click();
	}
}


/**
 * @form Manage MTS
 * @param button
 */
function form250_update_form()
{
	if(is_create_access('form250'))
	{
		var form=document.getElementById("form250_master");

		var mts_num=form.elements['mts_num'].value;
		var branch=form.elements['branch'].value;
		var weight=form.elements['weight'].value;
		var num_orders=form.elements['num_orders'].value;
		var num_bags=form.elements['num_bags'].value;
		var date=get_raw_time(form.elements['date'].value);
		var data_id=form.elements['id'].value;

		var save_button=form.elements['save'];
		var last_updated=get_my_time();

		$('#form250_share').show();
		$('#form250_share').click(function()
		{
			modal101_action('Material Transfer Sheet','','staff',function (func)
			{
				print_form250(func);
			});
		});

		var mts_columns="<mts count='2'>" +
					"<id></id>"+
					"<mts_num exact='yes'>"+mts_num+"</mts_num>"+
					"</mts>";
		fetch_requested_data('',mts_columns,function(mtss)
		{
			if(mtss.length==0 || (mtss.length==1 && mtss[0].id==data_id))
			{
				var data_xml="<mts>" +
							"<id>"+data_id+"</id>" +
							"<mts_num>"+mts_num+"</mts_num>"+
							"<branch>"+branch+"</branch>"+
							"<weight>"+weight+"</weight>"+
							"<num_orders>"+num_orders+"</num_orders>"+
							"<num_bags>"+num_bags+"</num_bags>"+
							"<date>"+date+"</date>"+
							"<last_updated>"+last_updated+"</last_updated>" +
							"</mts>";
				var activity_xml="<activity>" +
							"<data_id>"+data_id+"</data_id>" +
							"<tablename>mts</tablename>" +
							"<link_to>form251</link_to>" +
							"<title>Updated</title>" +
							"<notes>MTS # "+mts_num+"</notes>" +
							"<updated_by>"+get_name()+"</updated_by>" +
							"</activity>";
				update_row(data_xml,activity_xml);


				$("[id^='save_form250_']").click();
			}
			else
			{
				$("#modal77_link").click();
			}
		});
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form Vendor leads
 * @param button
 */
function form252_update_item(form)
{
	if(is_update_access('form252'))
	{
		var customer=form.elements[0].value;
		var detail=form.elements[1].value;
		var due_date=get_raw_time(form.elements[2].value);
		var identified_by=form.elements[3].value;
		var data_id=form.elements[4].value;
		var last_updated=get_my_time();
		var data_xml="<sale_leads>" +
					"<id>"+data_id+"</id>" +
					"<detail>"+detail+"</detail>" +
					"<due_date>"+due_date+"</due_date>" +
					"<identified_by>"+identified_by+"</identified_by>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</sale_leads>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>sale_leads</tablename>" +
					"<link_to>form252</link_to>" +
					"<title>Updated</title>" +
					"<notes>Lead for customer "+customer+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		update_row(data_xml,activity_xml);
		for(var i=0;i<4;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form Customer leads
 * @param button
 */
function form253_update_item(form)
{
	if(is_update_access('form253'))
	{
		var customer=form.elements[0].value;
		var detail=form.elements[1].value;
		var due_date=get_raw_time(form.elements[2].value);
		var identified_by=form.elements[3].value;
		var data_id=form.elements[4].value;
		var last_updated=get_my_time();
		var data_xml="<sale_leads>" +
					"<id>"+data_id+"</id>" +
					"<detail>"+detail+"</detail>" +
					"<due_date>"+due_date+"</due_date>" +
					"<identified_by>"+identified_by+"</identified_by>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</sale_leads>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>sale_leads</tablename>" +
					"<link_to>form253</link_to>" +
					"<title>Updated</title>" +
					"<notes>Lead for customer "+customer+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		update_row(data_xml,activity_xml);
		for(var i=0;i<4;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form Telecalling leads
 * @param button
 */
function form254_update_item(form)
{
	if(is_update_access('form254'))
	{
		var customer=form.elements[0].value;
		var detail=form.elements[1].value;
		var due_date=get_raw_time(form.elements[2].value);
		var identified_by=form.elements[3].value;
		var data_id=form.elements[4].value;
		var last_updated=get_my_time();
		var data_xml="<sale_leads>" +
					"<id>"+data_id+"</id>" +
					"<detail>"+detail+"</detail>" +
					"<due_date>"+due_date+"</due_date>" +
					"<identified_by>"+identified_by+"</identified_by>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</sale_leads>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>sale_leads</tablename>" +
					"<link_to>form254</link_to>" +
					"<title>Updated</title>" +
					"<notes>Lead for customer "+customer+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		update_row(data_xml,activity_xml);
		for(var i=0;i<4;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form Marketing leads
 * @param button
 */
function form255_update_item(form)
{
	if(is_update_access('form255'))
	{
		var customer=form.elements[0].value;
		var detail=form.elements[1].value;
		var due_date=get_raw_time(form.elements[2].value);
		var identified_by=form.elements[3].value;
		var data_id=form.elements[4].value;
		var last_updated=get_my_time();
		var data_xml="<sale_leads>" +
					"<id>"+data_id+"</id>" +
					"<detail>"+detail+"</detail>" +
					"<due_date>"+due_date+"</due_date>" +
					"<identified_by>"+identified_by+"</identified_by>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</sale_leads>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>sale_leads</tablename>" +
					"<link_to>form255</link_to>" +
					"<title>Updated</title>" +
					"<notes>Lead for customer "+customer+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		update_row(data_xml,activity_xml);
		for(var i=0;i<4;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
	}
	else
	{
		$("#modal2_link").click();
	}
}


/**
 * @form Capture Receiving
 * @param button
 */
function form272_update_item()
{
	if(is_update_access('form272'))
	{
		var form=document.getElementById('form272_form');
		var received_by=form.elements[5].value;
		var received_by_phone=form.elements[6].value;
		var id=form.elements['id'].value;
		var last_updated=get_my_time();

		var old_order_history=form.elements['history'].value;
		var order_history=vUtil.jsonParse(old_order_history);
		var history_object=new Object();
		history_object.timeStamp=get_my_time();
		history_object.details="Received By "+received_by;
		history_object.status='delivered';
		history_object.location="";

		var signature_data=$('#form272_canvas_div').jSignature('getData','base30');
		//console.log(signature_data);
		//console.log(signature_data[1]);

		if(order_history.length>0 && order_history[order_history.length-1]['status']!='delivered')
		{
			order_history.push(history_object);
		}

		var order_history_string=JSON.stringify(order_history);

		var data_xml="<logistics_orders>" +
					"<id>"+id+"</id>" +
					"<status>delivered</status>" +
					"<comments>Received By "+received_by+"</comments>" +
					"<order_history>"+order_history_string+"</order_history>" +
					"<delivery_time>"+history_object.timeStamp+"</delivery_time>"+
					"<received_by>"+received_by+"</received_by>"+
					"<received_by_phone>"+received_by_phone+"</received_by_phone>"+
					"<received_by_sign>"+signature_data[1]+"</received_by_sign>"+
					"<last_updated>"+last_updated+"</last_updated>" +
					"</logistics_orders>";
		update_simple(data_xml);

		for(var i=0;i<6;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}

		var save_button=form.elements['save'];
		$(save_button).off('click');
		$(save_button).on('click',function (e)
		{
			e.preventDefault();
		});

		var form272_form=document.getElementById('form272_form');
		form272_form.reset();
		$(form272_form).hide();
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form Purchase leads
 * @param button
 */
function form273_update_item(form)
{
	if(is_update_access('form273'))
	{
		var supplier=form.elements[0].value;
		var item=form.elements[1].value;
		var make=form.elements[2].value;
		var price=form.elements[3].value;
		var quantity=form.elements[4].value;
		var detail=form.elements[5].value;
		var data_id=form.elements[7].value;
		var last_updated=get_my_time();
		var data_xml="<purchase_leads>" +
					"<id>"+data_id+"</id>" +
					"<supplier>"+supplier+"</supplier>" +
					"<detail>"+detail+"</detail>" +
					"<item_name>"+item+"</item_name>" +
					"<item_company>"+make+"</item_company>" +
					"<price>"+price+"</price>" +
					"<quantity>"+quantity+"</quantity>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</purchase_leads>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>purchase_leads</tablename>" +
					"<link_to>form273</link_to>" +
					"<title>Updated</title>" +
					"<notes>Purchase lead for "+supplier+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		update_row(data_xml,activity_xml);
		for(var i=0;i<7;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * formNo 275
 * form In-out (poojaelec)
 * @param button
 */
function form275_update_item(form)
{
	if(is_update_access('form275'))
	{
		var item=form.elements[0].value;
		var quantity=form.elements[1].value;
		var issue_type=form.elements[2].value;
		var customer=form.elements[3].value;
		var date=get_raw_time(form.elements[4].value);
		var notes=form.elements[5].value;
		var data_id=form.elements[6].value;
		var last_updated=get_my_time();
		var data_xml="<bill_items>" +
					"<id>"+data_id+"</id>" +
					"<item_name>"+item+"</item_name>" +
					"<issue_type>"+issue_type+"</issue_type>" +
					"<issue_date>"+date+"</issue_date>" +
					"<customer>"+customer+"</customer>" +
					"<notes>"+notes+"</notes>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</bill_items>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>bill_items</tablename>" +
					"<link_to>form275</link_to>" +
					"<title>"+issue_type+"</title>" +
					"<notes>"+quantity+" pieces of "+item+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		update_row(data_xml,activity_xml);
		for(var i=0;i<6;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
	}
	else
	{
		$("#modal2_link").click();
	}
}



/**
 * @form Buyer leads
 * @param button
 */
function form289_update_item(form)
{
	if(is_update_access('form289'))
	{
		var customer=form.elements[0].value;
		var item=form.elements[1].value;
		var company=form.elements[2].value;
		var price=form.elements[3].value;
		var quantity=form.elements[4].value;
		var detail=form.elements[6].value;
		var data_id=form.elements[8].value;
		var last_updated=get_my_time();
		var data_xml="<sale_leads>" +
					"<id>"+data_id+"</id>" +
					"<customer>"+customer+"</customer>" +
					"<detail>"+detail+"</detail>" +
					"<item_name>"+item+"</item_name>" +
					"<price>"+price+"</price>" +
					"<quantity>"+quantity+"</quantity>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</sale_leads>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>sale_leads</tablename>" +
					"<link_to>form289</link_to>" +
					"<title>Updated</title>" +
					"<notes>Sale lead for "+customer+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		update_row(data_xml,activity_xml);
		for(var i=0;i<8;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form Create Bill(Sehgal)
 * @formNo 294
 * @param button
 */
function form294_update_form()
{
	if(is_update_access('form294'))
	{
		var form=document.getElementById("form294_master");

		var customer=form.elements['customer'].value;
		var bill_type=form.elements['tax_type'].value;
		var bill_date=get_raw_time(form.elements['date'].value);
		var bill_num=form.elements['bill_num'].value;

		var amount=0;
		var discount=0;
		var tax_rate=0;
		var cartage=0;

		if(document.getElementById('form294_discount'))
		{
			discount=parseFloat(document.getElementById('form294_discount').value);
			tax_rate=parseFloat(document.getElementById('form294_tax').value);
			cartage=parseFloat(document.getElementById('form294_cartage').value);
		}

		$("[id^='save_form294']").each(function(index)
		{
			var subform_id=$(this).attr('form');
			var subform=document.getElementById(subform_id);
			if(!isNaN(parseFloat(subform.elements[3].value)))
				amount+=Math.round(parseFloat(subform.elements[3].value));
		});

		var amount=vUtil.round(amount,2);
		var tax=vUtil.round((tax_rate*((amount-discount))/100),2);
		var total=vUtil.round(amount+tax-discount+cartage,0);

		var data_id=form.elements['bill_id'].value;
		var last_updated=get_my_time();

		var data_xml="<bills>" +
					"<id>"+data_id+"</id>" +
					"<customer_name>"+customer+"</customer_name>" +
					"<bill_date>"+bill_date+"</bill_date>" +
					"<amount>"+amount+"</amount>" +
					"<total>"+total+"</total>" +
					"<billing_type>"+bill_type+"</billing_type>" +
					"<bill_num>"+bill_num+"</bill_num>" +
					"<discount>"+discount+"</discount>" +
					"<cartage>"+cartage+"</cartage>" +
					"<tax>"+tax+"</tax>" +
					"<tax_rate>"+tax_rate+"</tax_rate>"+
					"<transaction_id>"+data_id+"</transaction_id>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</bills>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>bills</tablename>" +
					"<link_to>form92</link_to>" +
					"<title>Updated</title>" +
					"<notes>Bill # "+bill_num+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		var transaction_xml="<transactions>" +
					"<id>"+data_id+"</id>" +
					"<trans_date>"+get_my_time()+"</trans_date>" +
					"<amount>"+total+"</amount>" +
					"<receiver>"+customer+"</receiver>" +
					"<giver>master</giver>" +
					"<tax>"+tax+"</tax>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</transactions>";
		update_row(data_xml,activity_xml);
		update_simple(transaction_xml);

		var total_row="<tr><td colspan='3' data-th='Total'>Total</td>" +
					"<td>Amount:<disc><br>Discount:</disc><br>Tax:@ <input type='number' value='"+tax_rate+"' step='any' id='form294_tax' class='dblclick_editable'>% <br>Cartage: <br>Total: </td>" +
					"<td>Rs. "+amount+"</br>" +
					"<disc_amount>Rs. <input type='number' value='"+discount+"' step='any' id='form294_discount' class='dblclick_editable'><br></disc_amount>" +
					"Rs. "+tax+" <br>" +
					"Rs. <input type='number' value='"+cartage+"' step='any' id='form294_cartage' class='dblclick_editable'></br>" +
					"Rs. "+total+"</td>" +
					"<td></td>" +
					"</tr>";

		$('#form294_foot').html(total_row);
		longPressEditable($('.dblclick_editable'));

		var payment_data="<payments>" +
				"<id></id>" +
				"<bill_id exact='yes'>"+data_id+"</bill_id>" +
				"</payments>";
		get_single_column_data(function(payments)
		{
			if(payments.length>0)
			{
				var payment_xml="<payments>" +
							"<id>"+payments[0]+"</id>" +
							"<type>received</type>" +
							"<total_amount>"+total+"</total_amount>" +
							"<acc_name>"+customer+"</acc_name>" +
							"<transaction_id>"+payments[0]+"</transaction_id>" +
							"<bill_id>"+data_id+"</bill_id>" +
							"<last_updated>"+last_updated+"</last_updated>" +
							"</payments>";
				var pt_xml="<transactions>" +
							"<id>"+payments[0]+"</id>" +
							"<amount>"+total+"</amount>" +
							"<receiver>master</receiver>" +
							"<giver>"+customer+"</giver>" +
							"<tax>0</tax>" +
							"<last_updated>"+last_updated+"</last_updated>" +
							"</transactions>";
				update_simple_func(payment_xml,function()
				{
					//modal26_action(payments[0]);
				});
			}
		},payment_data);

		$("[id^='save_form294_']").click();
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form Create Purchase Bill(Sehgal)
 * @formNo 295
 * @param button
 */
function form295_update_form()
{
	if(is_update_access('form295'))
	{
		var form=document.getElementById("form295_master");

		var form=document.getElementById("form295_master");
		var supplier=form.elements['supplier'].value;
		var bill_date=get_raw_time(form.elements['date'].value);
		var entry_date=get_raw_time(form.elements['entry_date'].value);
		var bill_num=form.elements['bill_num'].value;
		var notes=form.elements['notes'].value;

		var amount=0;
		var discount=0;
		var tax_rate=0;
		var cartage=0;

		if(document.getElementById('form295_discount'))
		{
			discount=parseFloat(document.getElementById('form295_discount').value);
			tax_rate=parseFloat(document.getElementById('form295_tax').value);
			cartage=parseFloat(document.getElementById('form295_cartage').value);
		}

		$("[id^='save_form295']").each(function(index)
		{
			var subform_id=$(this).attr('form');
			var subform=document.getElementById(subform_id);
			if(!isNaN(parseFloat(subform.elements[3].value)))
				amount+=Math.round(parseFloat(subform.elements[3].value));
		});

		var amount=vUtil.round(amount,2);
		var tax=vUtil.round((tax_rate*((amount-discount))/100),2);
		var total=vUtil.round(amount+tax-discount+cartage,0);

		var data_id=form.elements['bill_id'].value;
		var last_updated=get_my_time();

		var data_xml="<supplier_bills>" +
					"<id>"+data_id+"</id>" +
					"<supplier>"+supplier+"</supplier>" +
					"<bill_date>"+bill_date+"</bill_date>" +
					"<entry_date>"+entry_date+"</entry_date>" +
					"<amount>"+amount+"</amount>" +
					"<total>"+total+"</total>" +
					"<bill_id>"+bill_num+"</bill_id>" +
					"<discount>"+discount+"</discount>" +
					"<cartage>"+cartage+"</cartage>" +
					"<tax>"+tax+"</tax>" +
					"<tax_rate>"+tax_rate+"</tax_rate>"+
					"<transaction_id>"+data_id+"</transaction_id>" +
					"<notes>"+notes+"</notes>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</supplier_bills>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>bills</tablename>" +
					"<link_to>form53</link_to>" +
					"<title>Updated</title>" +
					"<notes>Purchase Bill # "+bill_num+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		var transaction_xml="<transactions>" +
					"<id>"+data_id+"</id>" +
					"<trans_date>"+get_my_time()+"</trans_date>" +
					"<amount>"+total+"</amount>" +
					"<giver>"+supplier+"</giver>" +
					"<receiver>master</receiver>" +
					"<tax>"+tax+"</tax>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</transactions>";
		update_row(data_xml,activity_xml);
		update_simple(transaction_xml);

		var total_row="<tr><td colspan='3' data-th='Total'>Total</td>" +
					"<td>Amount:<disc><br>Discount:</disc><br>Tax:@ <input type='number' value='"+tax_rate+"' step='any' id='form295_tax' class='dblclick_editable'>% <br>Cartage: <br>Total: </td>" +
					"<td>Rs. "+amount+"</br>" +
					"<disc_amount>Rs. <input type='number' value='"+discount+"' step='any' id='form295_discount' class='dblclick_editable'><br></disc_amount>" +
					"Rs. "+tax+" <br>" +
					"Rs. <input type='number' value='"+cartage+"' step='any' id='form295_cartage' class='dblclick_editable'></br>" +
					"Rs. "+total+"</td>" +
					"<td></td>" +
					"</tr>";

		$('#form295_foot').html(total_row);
		longPressEditable($('.dblclick_editable'));

		var payment_data="<payments>" +
				"<id></id>" +
				"<bill_id exact='yes'>"+data_id+"</bill_id>" +
				"</payments>";
		get_single_column_data(function(payments)
		{
			if(payments.length>0)
			{
				var payment_xml="<payments>" +
							"<id>"+payments[0]+"</id>" +
							"<type>paid</type>" +
							"<total_amount>"+total+"</total_amount>" +
							"<acc_name>"+supplier+"</acc_name>" +
							"<transaction_id>"+payments[0]+"</transaction_id>" +
							"<bill_id>"+data_id+"</bill_id>" +
							"<last_updated>"+last_updated+"</last_updated>" +
							"</payments>";
				var pt_xml="<transactions>" +
							"<id>"+payments[0]+"</id>" +
							"<amount>"+total+"</amount>" +
							"<giver>master</giver>" +
							"<receiver>"+supplier+"</receiver>" +
							"<tax>0</tax>" +
							"<last_updated>"+last_updated+"</last_updated>" +
							"</transactions>";
				update_simple_func(payment_xml,function()
				{
					//modal28_action(payments[0]);
				});
			}
		},payment_data);

		$("[id^='save_form295_']").click();
	}
	else
	{
		$("#modal2_link").click();
	}
}


/**
 * @form New Purchase Order
 * @param button
 */
function form296_update_form()
{
	if(is_update_access('form296'))
	{
		var form=document.getElementById("form296_master");

		var supplier=form.elements['supplier'].value;
		var order_date=get_raw_time(form.elements['date'].value);
		var order_num=form.elements['order_num'].value;
		var status=form.elements['status'].value;
		var data_id=form.elements['order_id'].value;
		var last_updated=get_my_time();

		var amount=0;
		var tax=0;
		var total=0;
		var total_quantity=0;

		$("[id^='save_form296']").each(function(index)
		{
			var subform_id=$(this).attr('form');
			var subform=document.getElementById(subform_id);

			if(!isNaN(parseFloat(subform.elements[6].value)))
			{
				amount+=parseFloat(subform.elements[6].value);
				tax+=parseFloat(subform.elements[8].value);
				total+=parseFloat(subform.elements[9].value);
			}
			if(!isNaN(parseFloat(subform.elements[2].value)))
				total_quantity+=parseFloat(subform.elements[2].value);

		});

		total=amount+tax;

		amount=vUtil.round(amount,2);
		tax=vUtil.round(tax,2);
		total=vUtil.round(total,2);

		var total_row="<tr><td colspan='2' data-th='Total'>Total Quantity: "+total_quantity+"</td>" +
								"<td>Amount:<br>Tax: <br>Total: </td>" +
								"<td>Rs. "+amount+"<br>" +
								"Rs. "+tax+"<br> " +
								"Rs. "+total+"</td>" +
								"<td></td>" +
								"</tr>";

		$('#form296_foot').html(total_row);

		var data_xml="<purchase_orders>" +
					"<id>"+data_id+"</id>" +
					"<supplier>"+supplier+"</supplier>" +
					"<order_date>"+order_date+"</order_date>" +
					"<status>"+status+"</status>" +
					"<order_num>"+order_num+"</order_num>" +
					"<amount>"+amount+"</amount>" +
					"<tax>"+tax+"</tax>" +
					"<total>"+total+"</total>" +
					"<total_quantity>"+total_quantity+"</total_quantity>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</purchase_orders>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>purchase_orders</tablename>" +
					"<link_to>form297</link_to>" +
					"<title>Updated</title>" +
					"<notes>Purchase order # "+order_num+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		update_row(data_xml,activity_xml);
		$("[id^='save_form296_']").click();
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form Manage Purchase orders (Sehgal)
 * @param button
 */
function form297_update_item(form)
{
	if(is_update_access('form297'))
	{
		var order_num=form.elements[0].value;
		var supplier_name=form.elements[1].value;
		var order_date=get_raw_time(form.elements[2].value);
		var status=form.elements[3].value;
		var data_id=form.elements[4].value;
		var last_updated=get_my_time();
		var data_xml="<purchase_orders>" +
					"<id>"+data_id+"</id>" +
					"<supplier>"+supplier_name+"</supplier>" +
					"<order_date>"+order_date+"</order_date>" +
					"<status>"+status+"</status>" +
					"<order_num>"+order_num+"</order_num>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</purchase_orders>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>purchase_orders</tablename>" +
					"<link_to>form297</link_to>" +
					"<title>Updated</title>" +
					"<notes>Purchase Order # "+order_num+" for supplier "+supplier_name+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		update_row(data_xml,activity_xml);
		for(var i=0;i<4;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
	}
	else
	{
		$("#modal2_link").click();
	}
}


/**
 * @form Manage Products (Pooja)
 * @param button
 */
function form300_update_item(form)
{
	if(is_update_access('form300'))
	{
		var name=form.elements[0].value;
		var make=form.elements[1].value;
		var category=form.elements[2].value;
		var description=form.elements[3].value;
		var data_id=form.elements[7].value;
		var last_updated=get_my_time();
		var pic_id=$("#img_form300_"+data_id).parent().attr('name');
		var url=$("#img_form300_"+data_id).attr('src');

		var data_xml="<product_master>" +
					"<id>"+data_id+"</id>" +
					"<make>"+make+"</make>" +
					"<name>"+name+"</name>" +
					"<description>"+description+"</description>" +
					"<category>"+category+"</category>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</product_master>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>product_master</tablename>" +
					"<link_to>form300</link_to>" +
					"<title>Updated</title>" +
					"<notes>Product "+name+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		var pic_xml="<documents>" +
					"<id>"+pic_id+"</id>" +
					"<url>"+url+"</url>" +
					"<doc_type>product_master</doc_type>" +
					"<target_id>"+data_id+"</target_id>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</documents>";
		update_row(data_xml,activity_xml);
		update_simple(pic_xml);
		create_simple(pic_xml);

		for(var i=0;i<4;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form Convert QR Data
 * @param button
 */
function form302_update_item(form)
{
	if(is_update_access('form302'))
	{
		var source=form.elements[0].value;
		var format=form.elements[1].value;
		var func=form.elements[2].value;
		format=htmlentities(format);
		func=htmlentities(func);
		var data_id=form.elements[4].value;
		var last_updated=get_my_time();
		var data_xml="<qr_contexts>" +
				"<id>"+data_id+"</id>" +
				"<source>"+source+"</source>" +
				"<format>"+format+"</format>" +
				"<conversion_func>"+func+"</conversion_func>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</qr_contexts>";

		update_simple(data_xml);

		for(var i=0;i<4;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
	}
	else
	{
		$("#modal2_link").click();
	}
}
