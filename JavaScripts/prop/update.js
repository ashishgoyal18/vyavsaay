/**
 * @report Item Picklist
 * @param form
 */
function report63_update(form)
{
	if(is_update_access('report63'))
	{
		var storage=form.elements[0].value;
		var data_ids=form.elements[1].value;
		var table_type=form.elements[2].value;
		var last_updated=get_my_time();
		var ids=data_ids.split("--");

		var data_xml="<"+table_type+">";
		var counter=1;

		ids.forEach(function(id)
		{
			if((counter%500)===0)
			{
				data_xml+="</"+table_type+"><separator></separator><"+table_type+">";
			}
			data_xml+="<row>" +
					"<id>"+id+"</id>" +
					"<picked_status>picked</picked_status>" +
					"<storage>"+storage+"</storage>"+
					"<last_updated>"+last_updated+"</last_updated>" +
					"</row>";
		});
	
		data_xml+="</"+table_type+">";
		
		if(is_online())
		{	
			server_update_batch(data_xml);
		}
		else
		{
			local_update_batch(data_xml);
		}		
		
		for(var i=0;i<2;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
	}
	else
	{
		$("#modal2").dialog("open");
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
		$("#modal2").dialog("open");
	}
}

/**
 * @report Pickup & Deliveries
 * @param form
 */
function report72_update(form)
{
	if(is_update_access('report72'))
	{
		var status_filter=form.elements[0];
		var status=form.elements[0].value;
		var id=form.elements[1].value;
		var button_filter=form.elements[2];
		var last_updated=get_my_time();
		var new_status="";

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
		$("#modal2").dialog("open");
	}
}

/**
 * @form Update inventory
 * @param button
 */
function form1_update_item(form)
{
	if(is_update_access('form1'))
	{
		var name=form.elements[0].value;
		var batch=form.elements[1].value;
		var manufacturing=get_raw_time(form.elements[2].value);
		var expiry=get_raw_time(form.elements[3].value);
		var data_id=form.elements[6].value;
		var last_updated=get_my_time();
		var data_xml="<product_instances>" +
					"<id>"+data_id+"</id>" +
					"<product_name>"+name+"</product_name>" +
					"<batch>"+batch+"</batch>" +
					"<manufacture_date>"+manufacturing+"</manufacture_date>"+
					"<expiry>"+expiry+"</expiry>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</product_instances>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>product_instances</tablename>" +
					"<link_to>form1</link_to>" +
					"<title>Updated</title>" +
					"<notes>Costing for batch number "+batch+" of "+name+"</notes>" +
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
		$("#modal2").dialog("open");
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
					url: "./ajax/save_image.php",
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
			$("#modal6").dialog("open");		
		}
	}
	else
	{
		$("#modal2").dialog("open");
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
		if(is_online())
		{
			server_update_row(data_xml,activity_xml);
		}
		else
		{
			local_update_row(data_xml,activity_xml);
		}
	
		$("[id^='save_form2_']").click();
	}
	else
	{
		$("#modal2").dialog("open");
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
		$("#modal2").dialog("open");
	}

}

/**
 * @formNo 7
 * @form Attendance
 * @param button
 */
function form7_update_item(form)
{
	if(is_update_access('form7'))
	{
		var name=form.elements[0].value;
		var presence=form.elements[1].value;
		var hours=form.elements[2].value;
		var data_id=form.elements[3].value;
		var date=form.elements[5].value;
		var last_updated=get_my_time();
		var data_xml="<attendance>" +
					"<id>"+data_id+"</id>" +
					"<acc_name>"+name+"</acc_name>" +
					"<presence>"+presence+"</presence>" +
					"<date>"+date+"</date>" +
					"<hours_worked>"+hours+"</hours_worked>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</attendance>";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>attendance</tablename>" +
					"<link_to>form7</link_to>" +
					"<title>Updated</title>" +
					"<notes>Attendance for "+name+"</notes>" +
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
		$("#modal2").dialog("open");
	}
}

function form7_update_form()
{
	if(is_update_access('form7'))
	{
		$("[id^='save_form7_']").click();
		form7_header_ini();
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Manage Staff
 * @param button
 */
function form8_update_item(form)
{
	if(is_update_access('form8'))
	{
		var name=form.elements[0].value;
		var phone=form.elements[1].value;
		var email=form.elements[2].value;
		var status=form.elements[4].value;
		var data_id=form.elements[5].value;
		var last_updated=get_my_time();
		var data_xml="<staff>" +
					"<id>"+data_id+"</id>" +
					"<name>"+name+"</name>" +
					"<phone>"+phone+"</phone>" +
					"<email>"+email+"</email>" +
					"<status>"+status+"</status>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</staff>";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>staff</tablename>" +
					"<link_to>form8</link_to>" +
					"<title>Updated</title>" +
					"<notes>Staff profile of "+name+"</notes>" +
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
		$("#modal2").dialog("open");
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
		$("#modal2").dialog("open");
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
		$("#modal2").dialog("open");
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

								var id=get_new_key();
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
				                
				            var bill_item_id=get_new_key();
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
							$("#modal7").dialog("open");
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
		$("#modal2").dialog("open");
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
		$("#modal2").dialog("open");
	}
}

/**
 * @form manage customer returns
 * @param button
 */
function form15_update_form()
{
	if(is_create_access('form15'))
	{
		var form=document.getElementById("form15_master");
		
		var customer=form.elements['custoemr'].value;
		var return_date=get_raw_time(form.elements['date'].value);
				
		var tax=0;
		var total=0;
		
		$("[id^='save_form15_']").each(function(index)
		{
			var subform_id=$(this).attr('form');
			var subform=document.getElementById(subform_id);
			
			if(subform.elements[5].value=='refund')
			{	
				total+=parseFloat(subform.elements[7].value);
				tax+=parseFloat(subform.elements[8].value);		
			}
		});
				
		var total_row="<tr><td colspan='3' data-th='Total'>Total</td>" +
					"<td>Refund:</td>" +
					"<td>Rs. "+total+"</td>" +
					"<td></td>" +
					"</tr>";
		$('#form15_foot').html(total_row);

		var data_id=form.elements['return_id'].value;
		var order_id=form.elements['order_id'].value;
		var order_num=form.elements['order_num'].value;
		var channel=form.elements['channel'].value;
		var transaction_id=form.elements['t_id'].value;
		var last_updated=get_my_time();
		
		var data_xml="<customer_returns>" +
					"<id>"+data_id+"</id>" +
					"<customer>"+customer+"</customer>" +
					"<return_date>"+return_date+"</return_date>" +
					"<total>"+total+"</total>" +
					"<order_id>"+order_id+"</order_id>" +
					"<order_num>"+order_num+"</order_num>" +
					"<channel>"+channel+"</channel>" +
					"<tax>"+tax+"</tax>" +
					"<transaction_id>"+transaction_id+"</transaction_id>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</customer_returns>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>customer_returns</tablename>" +
					"<link_to>form16</link_to>" +
					"<title>Updated</title>" +
					"<notes>Returns for order # "+order_num+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		var transaction_xml="<transactions>" +
					"<id>"+transaction_id+"</id>" +
					"<trans_date>"+get_my_time()+"</trans_date>" +
					"<amount>"+total+"</amount>" +
					"<receiver>master</receiver>" +
					"<giver>"+customer+"</giver>" +
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
							"<acc_name>"+customer+"</acc_name>" +
							"<transaction_id>"+payments[y]+"</transaction_id>" +
							"<bill_id>"+data_id+"</bill_id>" +
							"<last_updated>"+last_updated+"</last_updated>" +
							"</payments>";
				var pt_xml="<transactions>" +
							"<id>"+payments[y]+"</id>" +
							"<amount>"+total+"</amount>" +
							"<receiver>"+customer+"</receiver>" +
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
		$("[id^='save_form15_']").click();
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form manage Supplier returns
 * @param button
 */
function form19_update_form()
{
	if(is_create_access('form19'))
	{
		var form=document.getElementById("form19_master");
		
		var supplier=form.elements[1].value;
		var return_date=get_raw_time(form.elements[2].value);
				
		var message_string="Returns from:"+get_session_var('title')+"\nAddress: "+get_session_var('address');
		
		var total=0;
		var tax=0;
		
		$("[id^='save_form19_']").each(function(index)
		{
			var subform_id=$(this).attr('form');
			var subform=document.getElementById(subform_id);	
			total+=parseFloat(subform.elements[5].value);
			tax+=parseFloat(subform.elements[6].value);
			message_string+="\nItem: "+subform.elements[0].value;
			message_string+=" Quantity: "+subform.elements[3].value;
			message_string+=" Amount: "+subform.elements[5].value;
		});

		message_string+="\nTotal Refund Rs : "+total;
		
		var subject="Returns from "+get_session_var('title');
		$('#form19_share').show();
		$('#form19_share').click(function()
		{
			modal44_action(supplier,subject,message_string);
		});
				
		var total_row="<tr><td colspan='3' data-th='Total'>Total</td>" +
				"<td>Refund:</td>" +
				"<td>Rs. "+total+"</td>" +
				"<td></td>" +
				"</tr>";
		$('#form19_foot').html(total_row);

		var data_id=form.elements[3].value;
		var transaction_id=form.elements[4].value;
		var last_updated=get_my_time();
		
		var data_xml="<supplier_returns>" +
					"<id>"+data_id+"</id>" +
					"<supplier>"+supplier+"</supplier>" +
					"<return_date>"+return_date+"</return_date>" +
					"<total>"+total+"</total>" +
					"<tax>"+tax+"</tax>" +
					"<type>product</type>" +
					"<transaction_id>"+transaction_id+"</transaction_id>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</supplier_returns>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>supplier_returns</tablename>" +
					"<link_to>form17</link_to>" +
					"<title>Updated</title>" +
					"<notes>Returns to supplier "+supplier+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		var transaction_xml="<transactions>" +
					"<id>"+transaction_id+"</id>" +
					"<trans_date>"+get_my_time()+"</trans_date>" +
					"<amount>"+total+"</amount>" +
					"<receiver>"+supplier+"</receiver>" +
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
							"<acc_name>"+supplier+"</acc_name>" +
							"<transaction_id>"+payments[y]+"</transaction_id>" +
							"<bill_id>"+data_id+"</bill_id>" +
							"<last_updated>"+last_updated+"</last_updated>" +
							"</payments>";
				var pt_xml="<transactions>" +
							"<id>"+payments[y]+"</id>" +
							"<amount>"+total+"</amount>" +
							"<receiver>master</receiver>" +
							"<giver>"+supplier+"</giver>" +
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
		$("[id^='save_form19_']").click();
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form New Supplier Bill
 * @param button
 */
function form21_update_form()
{
	if(is_update_access('form21'))
	{
		var form=document.getElementById("form21_master");
		
		var supplier=form.elements['supplier'].value;
		var bill_id=form.elements['bill_num'].value;
		var bill_date=get_raw_time(form.elements['date'].value);
		var entry_date=get_raw_time(form.elements['edate'].value);
		var data_id=form.elements['bill_id'].value;
		var transaction_id=form.elements['t_id'].value;
		var save_button=form.elements['save'];
		
		var total=0;
		var tax=0;
		var discount=0;
		var amount=0;
		
		$("[id^='save_form21']").each(function(index)
		{
			var subform_id=$(this).attr('form');
			var subform=document.getElementById(subform_id);
			amount+=parseFloat(subform.elements[5].value);
			discount+=parseFloat(subform.elements[6].value);
			tax+=parseFloat(subform.elements[7].value);
			total+=parseFloat(subform.elements[8].value);
		});

		var total_row="<tr><td colspan='3' data-th='Total'>Total</td>" +
				"<td>Amount:</br>Discount: </br>Tax: </br>Total: </td>" +
				"<td>Rs. "+amount+"</br>" +
				"Rs. "+discount+"</br>" +
				"Rs. "+tax+"</br>" +
				"Rs. "+total+"</td>" +
				"<td></td>" +
				"</tr>";
		$('#form21_foot').html(total_row);
		
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
					"<notes>Purchase Bill no "+data_id+"</notes>" +
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
			
		$("[id^='save_form21_']").click();
	}
	else
	{
		$("#modal2").dialog("open");
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
		
		if(form.elements['cst'].checked)
		{
			cst='yes';
			tax+=my_round(.02*amount,2);
			total+=my_round(.02*amount,2);
		}

		var total_row="<tr><td colspan='2' data-th='Total'>Total</td>" +
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
		if(is_online())
		{
			server_update_row(data_xml,activity_xml);
		}
		else
		{
			local_update_row(data_xml,activity_xml);
		}
		$("[id^='save_form24_']").click();
	}
	else
	{
		$("#modal2").dialog("open");
	}
}


/**
 * @form Manage Customers
 * @param button
 */
function form30_update_item(form)
{
	if(is_update_access('form30'))
	{
		var name=form.elements[0].value;
		var phone=form.elements[1].value;
		var email=form.elements[2].value;
		var data_id=form.elements[4].value;
		var last_updated=get_my_time();
		var data_xml="<customers>" +
					"<id>"+data_id+"</id>" +
					"<name>"+name+"</name>" +
					"<phone>"+phone+"</phone>" +
					"<email>"+email+"</email>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</customers>";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>customers</tablename>" +
					"<link_to>form30</link_to>" +
					"<title>Updated</title>" +
					"<notes>Contact details of customer "+name+"</notes>" +
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
		$("#modal2").dialog("open");
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
		$("#modal2").dialog("open");
	}
}

/**
 * @form Store Placement
 * @param button
 */
function form38_update_item(form)
{
	if(is_update_access('form38'))
	{
		var product_name=form.elements[0].value;
		var batch=form.elements[1].value;
		var name=form.elements[2].value;
		var data_id=form.elements[4].value;
		var last_updated=get_my_time();
		var table='area_utilization';
		var data_xml="<"+table+">" +
					"<id>"+data_id+"</id>" +
					"<product_name>"+product_name+"</product_name>" +
					"<batch>"+batch+"</batch>" +
					"<name>"+name+"</name>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</"+table+">";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>"+table+"</tablename>" +
					"<link_to>form38</link_to>" +
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
		for(var i=0;i<5;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Manage Products
 * @param button
 */
function form39_update_item(form)
{
	if(is_update_access('form39'))
	{
		var name=form.elements[0].value;
		var make=form.elements[1].value;
		var description=form.elements[2].value;
		var tax=form.elements[5].value;
		var data_id=form.elements[6].value;
		var last_updated=get_my_time();
		var pic_id=$("#img_form39_"+data_id).parent().attr('name');
		var url=$("#img_form39_"+data_id).attr('src');
		
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
					"<link_to>form39</link_to>" +
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
		if(is_online())
		{
			server_update_row(data_xml,activity_xml);
			server_update_simple(pic_xml);
			server_create_simple(pic_xml);
		}
		else
		{
			local_update_row(data_xml,activity_xml);
			local_update_simple(pic_xml);
			local_create_simple(pic_xml);
		}	
		for(var i=0;i<6;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Manage Suppliers
 * @param button
 */
function form40_update_item(form)
{
	if(is_update_access('form40'))
	{
		var name=form.elements[0].value;
		var phone=form.elements[1].value;
		var email=form.elements[2].value;
		var data_id=form.elements[4].value;
		var last_updated=get_my_time();
		var data_xml="<suppliers>" +
				"<id>"+data_id+"</id>" +
				"<name>"+name+"</name>" +
				"<phone>"+phone+"</phone>" +
				"<email>"+email+"</email>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</suppliers>";	
		var activity_xml="<activity>" +
				"<data_id>"+data_id+"</data_id>" +
				"<tablename>suppliers</tablename>" +
				"<link_to>form40</link_to>" +
				"<title>Updated</title>" +
				"<notes>Contact details of supplier "+name+"</notes>" +
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
		$("#modal2").dialog("open");
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
		$("#modal2").dialog("open");
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
		$("#modal2").dialog("open");
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
		$("#modal2").dialog("open");
	}
}


/**
 * @form set defaults
 * @param button
 */
function form46_update_item(form)
{
	if(is_update_access('form46'))
	{
		var name=form.elements[0].getAttribute('data-i18n');
		name=name.substr(name.indexOf('.')+1);
		var value=form.elements[1].value;
		var data_id=form.elements[2].value;
		var element_id=form.elements[3].value;
		var last_updated=get_my_time();
		var data_xml="<user_preferences>" +
					"<id>"+data_id+"</id>" +
					"<name>"+element_id+"</name>" +
					"<display_name>"+name+"</display_name>" +
					"<value>"+value+"</value>" +
					"<type>other</type>" +
					"<status>active</status>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</user_preferences>";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>user_preferences</tablename>" +
					"<link_to>form46</link_to>" +
					"<title>Updated</title>" +
					"<notes>System setting for "+name+"</notes>" +
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
		set_session_var(element_id,value);
		for(var i=0;i<4;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
	}
	else
	{
		$("#modal2").dialog("open");
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
		$("#modal2").dialog("open");
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
 * @form Select Reports
 * @param button
 */
function form48_update_item(form)
{
	if(is_update_access('form48'))
	{
		var name=form.elements[0].getAttribute('data-i18n');
		name=name.substr(name.indexOf('.')+1);
		var value='unchecked';
		if(form.elements[1].checked)
			value='checked';
		var tables=form.elements[2].value;
		var data_id=form.elements[3].value;
		var element_id=form.elements[4].value;
		var last_updated=get_my_time();
		var table='user_preferences';
		var data_xml="<"+table+">" +
					"<id>"+data_id+"</id>" +
					"<name unique='yes'>"+element_id+"</name>" +
					"<display_name>"+name+"</display_name>" +
					"<value>"+value+"</value>" +
					"<tables>"+tables+"</tables>" +
					"<type>report</type>" +
					"<status>active</status>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</"+table+">";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>"+table+"</tablename>" +
					"<link_to>form48</link_to>" +
					"<title>Updated</title>" +
					"<notes>Selected "+name+" report for display</notes>" +
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
		$("#modal2").dialog("open");
	}
}

/**
 * @form Select Reports
 */
function form48_update_form()
{	
	if(is_update_access('form48'))
	{
		$("[id^='save_form48_']").click();
		//$("#modal3").dialog("open");
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Select Forms
 * @param button
 */
function form49_update_item(form)
{
	if(is_update_access('form49'))
	{
		var name=form.elements[0].getAttribute('data-i18n');
		name=name.substr(name.indexOf('.')+1);
		var value='unchecked';
		if(form.elements[1].checked)
			value='checked';
		var tables=form.elements[2].value;
		var data_id=form.elements[3].value;
		var element_id=form.elements[4].value;
		var last_updated=get_my_time();
		var table='user_preferences';
		var data_xml="<"+table+">" +
					"<id>"+data_id+"</id>" +
					"<name unique='yes'>"+element_id+"</name>" +
					"<display_name>"+name+"</display_name>" +
					"<value>"+value+"</value>" +
					"<tables>"+tables+"</tables>" +
					"<type>form</type>" +
					"<status>active</status>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</"+table+">";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>"+table+"</tablename>" +
					"<link_to>form49</link_to>" +
					"<title>Updated</title>" +
					"<notes>Selected "+name+" form</notes>" +
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
		$("#modal2").dialog("open");
	}
}

/**
 * @form Select Forms
 */
function form49_update_form()
{	
	if(is_update_access('form49'))
	{
		$("[id^='save_form49_']").click();
		//$("#modal3").dialog("open");
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Set Accounting Defaults
 * @param button
 */
function form50_update_item(form)
{
	if(is_update_access('form50'))
	{
		var name=form.elements[0].value;
		var value=form.elements[1].value;;
		var data_id=form.elements[2].value;
		var element_id=form.elements[3].value;
		var last_updated=get_my_time();
		var data_xml="<user_preferences>" +
					"<id>"+data_id+"</id>" +
					"<name>"+element_id+"</name>" +
					"<display_name>"+name+"</display_name>" +
					"<value>"+value+"</value>" +
					"<type>accounting</type>" +
					"<status>active</status>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</user_preferences>";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>user_preferences</tablename>" +
					"<link_to>form50</link_to>" +
					"<title>Updated</title>" +
					"<notes>"+name+" accounting property</notes>" +
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
		set_session_var(element_id,value);
		for(var i=0;i<4;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Select Accounting Principles
 */
function form50_update_form()
{
	if(is_update_access('form50'))
	{
		$("[id^='save_form50_']").click();
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Access Control
 * @param button
 */
function form51_update_item(form)
{
	if(is_update_access('form51'))
	{
		var master_form=document.getElementById('form51_master');
		var username=master_form.elements[1].value;
			
		var element_name=form.elements[0].getAttribute('data-i18n');
		element_name=element_name.substr(element_name.indexOf('.')+1);
		var re='unchecked';
		if(form.elements[1].checked)
			re='checked';
		var cr='unchecked';
		if(form.elements[2].checked)
			cr='checked';
		var up='unchecked';
		if(form.elements[3].checked)
			up='checked';
		var del='unchecked';
		if(form.elements[4].checked)
			del='checked';
		var data_id=form.elements[5].value;
		var element_id=form.elements[6].value;
		var last_updated=get_my_time();
		var data_xml="<access_control>" +
					"<id>"+data_id+"</id>" +
					"<username>"+username+"</username>" +
					"<element_id>"+element_id+"</element_id>" +
					"<element_name>"+element_name+"</element_name>" +
					"<re>"+re+"</re>" +
					"<cr>"+cr+"</cr>" +
					"<up>"+up+"</up>" +
					"<del>"+del+"</del>" +
					"<status>active</status>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</access_control>";	
		if(is_online())
		{
			server_update_simple(data_xml);
		}
		else
		{
			local_update_simple(data_xml);
		}	
		for(var i=0;i<7;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * formNo 51
 * form Access Control
 * @param button
 */
function form51_update_form()
{
	if(is_update_access('form51'))
	{
		var form=document.getElementById("form51_master");
		
		var username=form.elements[1].value;
		var password=form.elements[2].value;
		var data_id=form.elements[3].value;
		var last_updated=get_my_time();
		if(password=="")
		{
			var data_xml="<accounts>" +
						"<id>"+data_id+"</id>" +
						"<username>"+username+"</username>" +
						"<status>active</status>" +
						"<last_updated>"+last_updated+"</last_updated>" +
						"</accounts>";
			var activity_xml="<activity>" +
						"<data_id>"+data_id+"</data_id>" +
						"<tablename>accounts</tablename>" +
						"<link_to>form51</link_to>" +
						"<title>Updated</title>" +
						"<notes>Access for "+username+"</notes>" +
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
			
			$("[id^='save_form51_']").click();
		}
		else
		{
			var salt='$2a$10$'+get_domain()+'1234567891234567891234';
			var salt_22=salt.substring(0, 29);
			
			var bcrypt = new bCrypt();
			bcrypt.hashpw(password, salt_22, function(newhash)
			{
				var data_xml="<accounts>" +
							"<id>"+data_id+"</id>" +
							"<username>"+username+"</username>" +
							"<password>"+newhash+"</password>" +
							"<status>active</status>" +
							"<last_updated>"+last_updated+"</last_updated>" +
							"</accounts>";
				var activity_xml="<activity>" +
							"<data_id>"+data_id+"</data_id>" +
							"<tablename>accounts</tablename>" +
							"<link_to>form51</link_to>" +
							"<title>Updated</title>" +
							"<notes>Access for "+username+"</notes>" +
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
				
				$("[id^='save_form51_']").click();
			}, function() {});
		}
	}
	else
	{
		$("#modal2").dialog("open");
	}
}


/**
 * @form Manage purchase bills
 * @param button
 */
function form53_approve_item(button)
{
	if(is_update_access('form53'))
	{
		$(button).hide();
		var form_id=$(button).attr('form');
		var form=document.getElementById(form_id);
		var bill_id=form.elements[5].value;
		form.elements[4].value='approved';
								
		var last_updated=get_my_time();
		var data_xml="<supplier_bills>" +
					"<id>"+bill_id+"</id>" +
					"<notes>approved</notes>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</supplier_bills>";	
		update_simple(data_xml);
	}
	else
	{
		$("#modal2").dialog("open");
	}
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
		$("#modal2").dialog("open");
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
		$("#modal2").dialog("open");
	}
}

/**
 * formNo 56
 * form Cash Register
 * @param button
 */
function form56_update_item(form)
{
	if(is_update_access('form56'))
	{
		var account=form.elements[0].value;
		var type=form.elements[1].value;
		var amount=form.elements[2].value;
		var notes=form.elements[3].value;
		var data_id=form.elements[4].value;
		var last_updated=get_my_time();
		var receiver=account;
		var giver="master";
		if(type=='received')
		{
			giver=account;
			receiver="master";
		}
		var data_xml="<cash_register>" +
					"<id>"+data_id+"</id>" +
					"<type>"+type+"</type>" +
					"<acc_name>"+account+"</acc_name>" +
					"<notes>"+notes+"</notes>" +
					"<amount>"+amount+"</amount>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</cash_register>";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>cash_register</tablename>" +
					"<link_to>form56</link_to>" +
					"<title>Updated</title>" +
					"<notes>Cash record of amount "+amount+"</notes>" +
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
		$("#modal2").dialog("open");
	}
}

/**
 * formNo 57
 * form Manage Services
 * @param button
 */
function form57_update_item(form)
{
	if(is_update_access('form57'))
	{
		var service=form.elements[0].value;
		var description=form.elements[1].value;
		var price=form.elements[2].value;
		var tax=form.elements[3].value;
		var data_id=form.elements[4].value;
		var last_updated=get_my_time();
		var data_xml="<services>" +
					"<id>"+data_id+"</id>" +
					"<name unique='yes'>"+service+"</name>" +
					"<description>"+description+"</description>" +
					"<price>"+price+"</price>" +
					"<tax>"+tax+"</tax>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</services>";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>services</tablename>" +
					"<link_to>form57</link_to>" +
					"<title>Updated</title>" +
					"<notes>Service "+service+"</notes>" +
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
		$("#modal2").dialog("open");
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
		var table='pre_requisites';
		var data_xml="<pre_requisites>" +
					"<id>"+data_id+"</id>" +
					"<name>"+service+"</name>" +
					"<type>service</type>" +
					"<requisite_type>"+type+"</requisite_type>" +
					"<requisite_name>"+requisite+"</requisite_name>" +
					"<quantity>"+quantity+"</quantity>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</pre_requisites>";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>pre_requisites</tablename>" +
					"<link_to>form58</link_to>" +
					"<title>Updated</title>" +
					"<notes>Pre-requisite for service "+service+"</notes>" +
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
		$("#modal2").dialog("open");
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
		$("#modal2").dialog("open");
	}
}

/**
 * formNo 60
 * form Product Attributes
 * @param button
 */
function form60_update_item(form)
{
	if(is_update_access('form60'))
	{
		var product=form.elements[0].value;
		var attribute=form.elements[1].value;
		var value=form.elements[2].value;
		var data_id=form.elements[3].value;
		var last_updated=get_my_time();
		var data_xml="<attributes>" +
					"<id>"+data_id+"</id>" +
					"<name>"+product+"</name>" +
					"<type>product</type>" +
					"<attribute>"+attribute+"</attribute>" +
					"<value>"+value+"</value>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</attributes>";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>attributes</tablename>" +
					"<link_to>form60</link_to>" +
					"<title>Updated</title>" +
					"<notes>Attribute "+attribute+" for product "+product+"</notes>" +
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
		$("#modal2").dialog("open");
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
		$("#modal2").dialog("open");
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
		$("#modal2").dialog("open");
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
		$("#modal2").dialog("open");
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
		$("#modal2").dialog("open");
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
		$("#modal2").dialog("open");
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
		
		$("[id^='save_form69']").each(function(index)
		{
			var subform_id=$(this).attr('form');
			var subform=document.getElementById(subform_id);
			if(!isNaN(parseFloat(subform.elements[7].value)))
				amount+=parseFloat(subform.elements[7].value);
			if(!isNaN(parseFloat(subform.elements[8].value)))			
				tax+=parseFloat(subform.elements[8].value);
			if(!isNaN(parseFloat(subform.elements[9].value)))			
				freight+=parseFloat(subform.elements[9].value);
			if(!isNaN(parseFloat(subform.elements[10].value)))			
				total+=parseFloat(subform.elements[10].value);
		});
	
		var total_row="<tr><td colspan='1' data-th='Total'>Total</td>" +
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
					"<order_num>"+order_num+"</order_num>" +
					"<channel>"+channel+"</channel>" +
					"<status>"+status+"</status>" +
					"<amount>"+amount+"</amount>" +
					"<tax>"+tax+"</tax>" +
					"<freight>"+freight+"</freight>" +
					"<total>"+total+"</total>" +
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
		if(is_online())
		{
			server_update_row(data_xml,activity_xml);
		}
		else
		{
			local_update_row(data_xml,activity_xml);
		}
		$("[id^='save_form69_']").click();
	}
	else
	{
		$("#modal2").dialog("open");
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
		$("#modal2").dialog("open");
	}
}


/**
 * @form Manage accounts
 * @param button
 */
function form71_update_item(form)
{
	if(is_update_access('form71'))
	{
		var name=form.elements[0].value;
		var type=form.elements[1].value;
		var description=form.elements[2].value;
		var data_id=form.elements[4].value;
		var last_updated=get_my_time();
		var data_xml="<accounts>" +
					"<id>"+data_id+"</id>" +
					"<acc_name>"+name+"</acc_name>" +
					"<description>"+description+"</description>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</accounts>";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>accounts</tablename>" +
					"<link_to>form71</link_to>" +
					"<title>Updated</title>" +
					"<notes>Account "+name+"</notes>" +
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
		$("#modal2").dialog("open");
	}
}


/**
 * @form New Bill
 * @param button
 */
function form72_update_form()
{
	if(is_create_access('form72'))
	{
		var form=document.getElementById("form72_master");
		
		var customer=form.elements['customer'].value;
		var bill_date=get_raw_time(form.elements['date'].value);
		var bill_num=form.elements['bill_num'].value;
		var data_id=form.elements['bill_id'].value;
		var transaction_id=form.elements['t_id'].value;
		
		var bt=get_session_var('title');
		$('#form72_share').show();
		$('#form72_share').click(function()
		{
			modal101_action(bt+' - Invoice# '+bill_num,customer,'customer',function (func) 
			{
				print_form72(func);
			});
		});

		var amount=0;
		var discount=0;
		var tax=0;
		var total=0;
		
		$("[id^='save_form72']").each(function(index)
		{
			var subform_id=$(this).attr('form');
			var subform=document.getElementById(subform_id);
			amount+=parseFloat(subform.elements[5].value);
			discount+=parseFloat(subform.elements[6].value);
			tax+=parseFloat(subform.elements[7].value);
			total+=parseFloat(subform.elements[8].value);			
		});

		var last_updated=get_my_time();
		
		var data_xml="<bills>" +
					"<id>"+data_id+"</id>" +
					"<customer_name>"+customer+"</customer_name>" +
					"<bill_date>"+bill_date+"</bill_date>" +
					"<amount>"+amount+"</amount>" +
					"<total>"+total+"</total>" +
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
		update_row(data_xml,activity_xml);
		update_simple(transaction_xml);
		
		var total_row="<tr><td colspan='3' data-th='Total'>Total</td>" +
				"<td>Amount:</br>Discount: </br>Tax: </br>Total: </td>" +
				"<td>Rs. "+amount+"</br>" +
				"Rs. "+discount+"</br>" +
				"Rs. "+tax+"</br>" +
				"Rs. "+total+"</td>" +
				"<td></td>" +
				"</tr>";
		$('#form72_foot').html(total_row);

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
					modal26_action(payments[y]);
				});
				break;
			}
		},payment_data);
	
		$("[id^='save_form72_']").click();
	}
	else
	{
		$("#modal2").dialog("open");
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
		$("#modal2").dialog("open");
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
		$("#modal2").dialog("open");
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
		$("#modal2").dialog("open");
	}
}

/**
 * @form De-duplication mapping
 * @param button
 */
function form80_update_form(button)
{
	if(is_update_access('form80'))
	{
		$("[id^='save_form80_']").click();
	}
	else
	{
		$("#modal2").dialog("open");
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
		$("#modal2").dialog("open");
	}
}


/**
 * @form Notifications
 * @param data_id
 * @param status
 */
function notifications_update(button,data_id,status)
{
	if(is_update_access('notif'))
	{
		var last_updated=get_my_time();
		var data_xml="<notifications>" +
					"<id>"+data_id+"</id>" +
					"<status>"+status+"</status>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</notifications>";
		if(is_online())
		{
			server_update_simple(data_xml);
		}
		else
		{
			local_update_simple(data_xml);
		}
		if(status=='closed')
		{
			$(button).parent().parent().hide();
		}
		if(status=='reviewed')
		{
			$(button).hide();
		}
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Store Areas
 * @param button
 */
function form83_update_item(form)
{
	if(is_update_access('form83'))
	{
		var name=form.elements[0].value;
		var owner=form.elements[1].value;
		var area_type=form.elements[2].value;
		var data_id=form.elements[3].value;
		var last_updated=get_my_time();
		var data_xml="<store_areas>" +
					"<id>"+data_id+"</id>" +
					"<owner>"+owner+"</owner>" +
					"<area_type>"+area_type+"</area_type>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</store_areas>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>store_areas</tablename>" +
					"<link_to>form83</link_to>" +
					"<title>Updated</title>" +
					"<notes>Owner for store area "+name+"</notes>" +
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
		$("#modal2").dialog("open");
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
		$("#modal2").dialog("open");
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
		$("#modal2").dialog("open");
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
		$("#modal2").dialog("open");
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
		$("#modal2").dialog("open");
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
					var task_id=get_new_key();
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
		$("#modal2").dialog("open");
	}
}

/**
 * @form Appointments
 * @param button
 */
function form89_update_item(form)
{
	if(is_update_access('form89'))
	{
		var name=form.elements[0].value;
		var assignee=form.elements[1].value;
		var schedule=get_raw_time(form.elements[2].value);
		var notes=form.elements[3].value;
		var status=form.elements[4].value;
		var data_id=form.elements[5].value;
		var last_updated=get_my_time();
		var data_xml="<appointments>" +
					"<id>"+data_id+"</id>" +
					"<customer>"+name+"</customer>" +
					"<assignee>"+assignee+"</assignee>" +
					"<schedule>"+schedule+"</schedule>" +
					"<status>"+status+"</status>" +
					"<notes>"+notes+"</notes>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</appointments>";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>appointments</tablename>" +
					"<link_to>form89</link_to>" +
					"<title>Updated</title>" +
					"<notes>Appointment with "+name+" assigned to "+assignee+"</notes>" +
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
		
		var message_string=name+" appointment with "+assignee+" @"+form.elements[2].value+"\nNotes:"+result.notes;
		message_string=encodeURIComponent(message_string);
		$("#form89_whatsapp_"+data_id).attr('href',"whatsapp://send?text="+message_string);
		$("#form89_whatsapp_"+data_id).show();

		for(var i=0;i<5;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Billing types
 * @formNo 90
 * @param button
 */
function form90_update_item(form)
{
	if(is_update_access('form90'))
	{
		var name=form.elements[0].value;
		var notes=form.elements[1].value;
		var data_id=form.elements[2].value;
		var last_updated=get_my_time();
		var data_xml="<bill_types>" +
					"<id>"+data_id+"</id>" +
					"<name>"+name+"</name>" +
					"<notes>"+notes+"</notes>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</bill_types>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>bill_types</tablename>" +
					"<link_to>form90</link_to>" +
					"<title>Updated</title>" +
					"<notes>Billing type "+name+"</notes>" +
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
		
		for(var i=0;i<2;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
	}
	else
	{
		$("#modal2").dialog("open");
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
		var freight=0;
		var tax=0;
		var total=0;
		
		$("[id^='save_form91']").each(function(index)
		{
			var subform_id=$(this).attr('form');
			var subform=document.getElementById(subform_id);
			amount+=parseFloat(subform.elements[6].value);
			tax+=parseFloat(subform.elements[7].value);
			freight+=parseFloat(subform.elements[9].value);
			total+=parseFloat(subform.elements[10].value);						
		});

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
					"<tax>"+tax+"</tax>" +
					"<transaction_id>"+transaction_id+"</transaction_id>" +
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
					"<td>Amount:</br>Tax: </br>Freight: </br>Total: </td>" +
					"<td>Rs. "+amount+"</br>" +
					"Rs. "+tax+"</br>" +
					"Rs. "+freight+"</br>" +
					"Rs. "+total+"</td>" +
					"<td></td>" +
					"</tr>";
		$('#form91_foot').html(total_row);

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
		
		$("[id^='save_form91_']").click();
	}
	else
	{
		$("#modal2").dialog("open");
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
		var payment_id=get_new_key();
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
		$("#modal2").dialog("open");
	}
}

/**
 * formNo 96
 * form Customer Attributes
 * @param button
 */
function form96_update_item(form)
{
	if(is_update_access('form96'))
	{
		var customer=form.elements[0].value;
		var attribute=form.elements[1].value;
		var value=form.elements[2].value;
		var data_id=form.elements[3].value;
		var last_updated=get_my_time();
		var data_xml="<attributes>" +
					"<id>"+data_id+"</id>" +
					"<name>"+customer+"</name>" +
					"<type>customer</type>" +
					"<attribute>"+attribute+"</attribute>" +
					"<value>"+value+"</value>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</attributes>";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>attributes</tablename>" +
					"<link_to>form96</link_to>" +
					"<title>Updated</title>" +
					"<notes>Attribute "+attribute+" for customer "+customer+"</notes>" +
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
		$("#modal2").dialog("open");
	}
}

/**
 * formNo 97
 * form supplier Attributes
 * @param button
 */
function form97_update_item(form)
{
	if(is_update_access('form97'))
	{
		var supplier=form.elements[0].value;
		var attribute=form.elements[1].value;
		var value=form.elements[2].value;
		var data_id=form.elements[3].value;
		var last_updated=get_my_time();
		var data_xml="<attributes>" +
					"<id>"+data_id+"</id>" +
					"<name>"+supplier+"</name>" +
					"<type>supplier</type>" +
					"<attribute>"+attribute+"</attribute>" +
					"<value>"+value+"</value>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</attributes>";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>attributes</tablename>" +
					"<link_to>form97</link_to>" +
					"<title>Updated</title>" +
					"<notes>Attribute "+attribute+" for supplier "+supplier+"</notes>" +
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
		$("#modal2").dialog("open");
	}
}

/**
 * formNo 98
 * form Staff Attributes
 * @param button
 */
function form98_update_item(form)
{
	if(is_update_access('form98'))
	{
		var staff=form.elements[0].value;
		var attribute=form.elements[1].value;
		var value=form.elements[2].value;
		var data_id=form.elements[3].value;
		var last_updated=get_my_time();
		var data_xml="<attributes>" +
					"<id>"+data_id+"</id>" +
					"<name>"+staff+"</name>" +
					"<type>staff</type>" +
					"<attribute>"+attribute+"</attribute>" +
					"<value>"+value+"</value>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</attributes>";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>attributes</tablename>" +
					"<link_to>form98</link_to>" +
					"<title>Updated</title>" +
					"<notes>Attribute "+attribute+" for staff "+staff+"</notes>" +
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
		$("#modal2").dialog("open");
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
		$("#modal2").dialog("open");
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
		$("#modal2").dialog("open");
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
		$("#modal2").dialog("open");
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
		$("#modal2").dialog("open");
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
		$("#modal2").dialog("open");
	}
}

/**
 * @form Project Tasks
 * @formNo 104
 * @param button
 */
function form104_update_item(form)
{
	if(is_update_access('form104'))
	{
		var project_id=document.getElementById('form104_master').elements[2].value;
		var task=form.elements[0].value;
		var assignee=form.elements[1].value;
		var start_time=get_raw_time(form.elements[2].value);
		var due_time=get_raw_time(form.elements[3].value);
		var status=form.elements[4].value;
		var data_id=form.elements[5].value;
		var last_updated=get_my_time();
		var data_xml="<task_instances>" +
					"<id>"+data_id+"</id>" +
					"<source_id>"+project_id+"</source_id>" +
					"<name>"+task+"</name>" +
					"<assignee>"+assignee+"</assignee>" +
					"<t_initiated>"+start_time+"</t_initiated>" +
					"<t_due>"+due_time+"</t_due>" +
					"<status>"+status+"</status>" +
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
		for(var i=0;i<6;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
	}
	else
	{
		$("#modal2").dialog("open");
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
		$("#modal2").dialog("open");
	}
}

/**
 * formNo 109
 * form Asset Attributes
 * @param button
 */
function form109_update_item(form)
{
	if(is_update_access('form60'))
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
		$("#modal2").dialog("open");
	}
}

/**
 * @form Create Reports
 * @param button
 */
function form111_update_form()
{
	if(is_update_access('form111'))
	{
		var form=document.getElementById("form111_master");

		var name=form.elements[1].value;
		var description=form.elements[2].value;
		var data_id=form.elements[3].value;
		var last_updated=get_my_time();
		var data_xml="<reports>" +
					"<id>"+data_id+"</id>" +
					"<name>"+name+"</name>" +
					"<description>"+description+"</description>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</reports>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>reports</tablename>" +
					"<link_to>form111</link_to>" +
					"<title>Updated</title>" +
					"<notes>Report "+name+"</notes>" +
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
	
		$("[id^='save_form111_']").click();
	}
	else
	{
		$("#modal2").dialog("open");
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

								var id=get_new_key();
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
				                
				            var bill_item_id=get_new_key();
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
							$("#modal7").dialog("open");
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
				var new_programs=array_unique(programs);
				new_programs.forEach(function(program)
				{
					var points=parseFloat(program.points_addition)*parseFloat(total);
					var loyalty_points_xml="<loyalty_points>"+
						"<id></id>"+
						"<points>"+points+"</points>"+
						"<date>"+get_my_date()+"</date>"+
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
		$("#modal2").dialog("open");
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

								var id=get_new_key();
								var rowsHTML="<tr>";
								rowsHTML+="<form id='form119_"+id+"'></form>";
									rowsHTML+="<td data-th='Product Name'>";
										rowsHTML+="<label id='form119_product_make_"+id+"'></label>";
										rowsHTML+="<br><v2></v2><textarea required form='form119_"+id+"' readonly='readonly'>"+free_product_name+"</textarea>";
										rowsHTML+="<img src='./images/add_image.png' class='add_image' title='Add new product' onclick='modal14_action();'>";
									rowsHTML+="</td>";
									rowsHTML+="<td data-th='Batch'>";
										rowsHTML+="<input type='text' required form='form119_"+id+"' value='"+free_batch+"'>";
										rowsHTML+="<img src='./images/add_image.png' class='add_image' title='Add new batch' onclick='modal22_action();'>";
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
							$("#modal7").dialog("open");
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
		$("#modal2").dialog("open");
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
		
		var total=0;
		var tax=0;
		var amount=0;
		var total_quantity=0;
		var total_quantity_in_rej=0;
		
		$("[id^='save_form122']").each(function(index)
		{
			var subform_id=$(this).attr('form');
			var subform=document.getElementById(subform_id);
			console.log(subform.elements[4].value);			
			if(subform.elements[10].value=='accepted')
			{
				if(!isNaN(parseFloat(subform.elements[7].value)))
					amount+=parseFloat(subform.elements[7].value);
				if(!isNaN(parseFloat(subform.elements[8].value)))
					tax+=parseFloat(subform.elements[8].value);
				if(!isNaN(parseFloat(subform.elements[4].value)))
					total_quantity+=subform.elements[4].value;			
			}
			if(!isNaN(parseFloat(subform.elements[4].value)))
				total_quantity_in_rej+=subform.elements[4].value;
		});
		
		total=amount+tax;
		
		var discount=0;
		var cst='no';
		if(form.elements['cst'].checked)
		{
			tax+=my_round(.02*amount,2);
			total+=my_round(.02*amount,2);
			cst='yes';
		}
	
		var total_row="<tr><td colspan='3' data-th='Total'>Total</td>" +
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
					"<discount>"+discount+"</discount>" +
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

		$("[id^='save_form122_']").click();
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * formNo 123
 * form Mandatory Attributes
 * @param button
 */
function form123_update_item(form)
{
	if(is_update_access('form123'))
	{
		var object=form.elements[0].value;
		var attribute=form.elements[1].value;
		var values=form.elements[2].value;
		var status=form.elements[3].value;
		var data_id=form.elements[4].value;
		var last_updated=get_my_time();
		var data_xml="<mandatory_attributes>" +
					"<id>"+data_id+"</id>" +
					"<object>"+object+"</object>" +
					"<attribute>"+attribute+"</attribute>" +
					"<value>"+values+"</value>"+
					"<status>"+status+"</status>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</mandatory_attributes>";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>mandatory_attributes</tablename>" +
					"<link_to>form123</link_to>" +
					"<title>Updated</title>" +
					"<notes>Mandatory attribute "+attribute+" for "+object+"</notes>" +
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
		$("#modal2").dialog("open");
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
		});
	}
	else
	{
		$("#modal2").dialog("open");
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
		
		if(is_online())
		{
			server_delete_simple(items_data);
		}
		else
		{
			local_delete_simple(items_data);
		}
		///////////////////////////////////
		
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

								var id=get_new_key();
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
							$("#modal7").dialog("open");
						}
					});
				}
				else if(offers[i].result_type=='service free')
				{
					var free_service_name=offers[i].free_service_name;	
					var id=get_new_key();
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
							var task_id=get_new_key();
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
		$("#modal2").dialog("open");
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
		$("#modal2").dialog("open");
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
		$("#modal2").dialog("open");
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
		$("#modal2").dialog("open");
	}
}


/**
 * @form Project Dashboard - Team
 * @formNo 135
 * @param button
 */
function form135_update_team(form)
{
	if(is_update_access('form135'))
	{
		var member=form.elements[0].value;
		var role=form.elements[1].value;
		var notes=form.elements[2].value;
		var status=form.elements[3].value;
		var data_id=form.elements[4].value;
		var last_updated=get_my_time();
		
		var data_xml="<project_team>" +
					"<id>"+data_id+"</id>" +
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
		for(var i=0;i<5;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Project Dashboard - Task
 * @formNo 135
 * @param button
 */
function form135_update_task(form)
{
	if(is_update_access('form135'))
	{
		var task=form.elements[0].value;
		var description=form.elements[1].value;
		var assignee=form.elements[2].value;
		var due_by=get_raw_time(form.elements[3].value);
		var status=form.elements[4].value;				
		var data_id=form.elements[5].value;
		var last_updated=get_my_time();
				
		var data_xml="<task_instances>" +
					"<id>"+data_id+"</id>" +
					"<assignee>"+assignee+"</assignee>" +
					"<name>"+task+"</name>" +
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
		$("#modal2").dialog("open");
	}
}


/**
 * @form Enter Supplier Bill (wholesale)
 * @param button
 */
function form136_update_form()
{
	if(is_update_access('form136'))
	{
		var form=document.getElementById("form136_master");
		
		var supplier=form.elements[1].value;
		var bill_id=form.elements[2].value;
		var bill_date=get_raw_time(form.elements[3].value);
		var entry_date=get_raw_time(form.elements[4].value);
		
		var total=0;
		var tax=0;
		var amount=0;
		
		$("[id^='save_form136']").each(function(index)
		{
			var subform_id=$(this).attr('form');
			var subform=document.getElementById(subform_id);
			total+=parseFloat(subform.elements[6].value);
			tax+=parseFloat(subform.elements[5].value);
		});

		var discount=0;
		amount=total-tax;
		
		var total_row="<tr><td colspan='3' data-th='Total'>Total</td>" +
				"<td>Amount:</br>Discount: </br>Tax: </br>Total: </td>" +
				"<td>Rs. "+amount+"</br>" +
				"Rs. "+discount+"</br>" +
				"Rs. "+tax+"</br>" +
				"Rs. "+total+"</td>" +
				"<td></td>" +
				"</tr>";
		$('#form136_foot').html(total_row);

		var notes=form.elements[5].value;
		var data_id=form.elements[6].value;
		var transaction_id=form.elements[7].value;
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
					"<notes>"+notes+"</notes>" +
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
						modal28_action(payments[y]);
					});
				}
				else
				{
					local_update_simple_func(payment_xml,function()
					{
						modal28_action(payments[y]);
					});
				}
				break;
			}
		},payment_data);
			
		$("[id^='save_form136_']").click();
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Project Expenses
 * @formNo 137
 * @param button
 */
function form137_approve_item(button)
{
	if(is_update_access('form137'))
	{
		var form_id=$(button).attr('form');
		var form=document.getElementById(form_id);	
		
		var project_id=document.getElementById('form137_master').elements['id'].value;
		form.elements[4].value='approved';		
		var status='approved';
		var data_id=form.elements[5].value;
		var last_updated=get_my_time();
		var data_xml="<expenses>" +
					"<id>"+data_id+"</id>" +
					"<status>"+status+"</status>" +
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
		form137_get_totals();
		$(button).hide();
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Project Expenses
 * @formNo 137
 * @param button
 */
function form137_reject_item(button)
{
	if(is_update_access('form137'))
	{
		var form_id=$(button).attr('form');
		var form=document.getElementById(form_id);	
		
		var project_id=document.getElementById('form137_master').elements['id'].value;
		form.elements[4].value='rejected';		
		var status='rejected';
		var data_id=form.elements[5].value;
		var last_updated=get_my_time();
		var data_xml="<expenses>" +
					"<id>"+data_id+"</id>" +
					"<status>"+status+"</status>" +
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
		form137_get_totals();
		$(button).hide();
	}
	else
	{
		$("#modal2").dialog("open");
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
		$("#modal2").dialog("open");
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
		$("#modal2").dialog("open");
	}
}

/**
 * @form Create Questionnaire
 * @formNo 142
 * @param button
 */
function form142_update_item(form)
{
	if(is_update_access('form142'))
	{
		var ques_id=document.getElementById("form142_master").elements['id'].value;

		var display_name=form.elements[0].value;
		var description=form.elements[1].value;
		var type=form.elements[2].value;

		var values="";
		var dynamic_values="";		
		if(type=='value list')
			values=form.elements[3].value;
		else if(type=='dynamic value list')
			dynamic_values="vyavsaay"+htmlentities(form.elements[3].value)+"vyavsaay";
		
		var order=form.elements[4].value;
		var weight=form.elements[5].value;
		var name='field'+order;
		var required='unchecked';
		if(form.elements[6].checked)
			required='checked';
		var data_id=form.elements[7].value;
		var last_updated=get_my_time();
					
		var data_xml="<ques_fields>" +
				"<id>"+data_id+"</id>" +
				"<ques_id>"+ques_id+"</ques_id>" +
				"<display_name>"+display_name+"</display_name>" +
				"<description>"+description+"</description>" +
				"<type>"+type+"</type>" +
				"<fvalues>"+values+"</fvalues>" +
				"<dynamic_values>"+dynamic_values+"</dynamic_values>"+				
				"<forder>"+order+"</forder>" +
				"<weight>"+weight+"</weight>" +
				"<freq>"+required+"</freq>"+
				"<last_updated>"+last_updated+"</last_updated>" +
				"</ques_fields>";	
		if(is_online())
		{
			server_update_simple(data_xml);
		}
		else
		{
			local_update_simple(data_xml);
		}	
		for(var i=0;i<7;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Create questionnaire
 * @param button
 */
function form142_update_form()
{
	if(is_update_access('form142'))
	{
		var master_form=document.getElementById("form142_master");
		var name=master_form.elements[1].value;
		var display_name=master_form.elements[2].value;
		var func=master_form.elements[3].value;
		var status=master_form.elements[4].value;
		var data_id=master_form.elements[5].value;
		var last_updated=get_my_time();
					
		var data_xml="<ques_struct>" +
				"<id>"+data_id+"</id>" +
				"<name>"+name+"</name>" +
				"<display_name>"+display_name+"</display_name>" +
				"<func>"+func+"</func>" +
				"<status>"+status+"</status>"+
				"<last_updated>"+last_updated+"</last_updated>" +
				"</ques_struct>";	
		var activity_xml="<activity>" +
				"<data_id>"+data_id+"</data_id>" +
				"<tablename>ques_struct</tablename>" +
				"<link_to>form143</link_to>" +
				"<title>Updated</title>" +
				"<notes>Questionnaire "+display_name+"</notes>" +
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
		
		$("[id^='save_form142_']").click();
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Manage questionnaire
 * @param button
 */
function form143_update_item(form)
{
	if(is_update_access('form143'))
	{
		var id=form.elements[0].value;
		var name=form.elements[1].value;
		var display_name=form.elements[2].value;
		var reviewer=form.elements[3].value;
		var approver=form.elements[4].value;
		var status=form.elements[5].value;
		var last_updated=get_my_time();
					
		var data_xml="<ques_struct>" +
				"<id>"+id+"</id>" +
				"<name>"+name+"</name>" +
				"<display_name>"+display_name+"</display_name>" +
				"<status>"+status+"</status>"+
				"<approver>"+approver+"</approver>"+
				"<reviewer>"+reviewer+"</reviewer>"+
				"<last_updated>"+last_updated+"</last_updated>" +
				"</ques_struct>";	
		var activity_xml="<activity>" +
				"<data_id>"+id+"</data_id>" +
				"<tablename>ques_struct</tablename>" +
				"<link_to>form143</link_to>" +
				"<title>Updated</title>" +
				"<notes>Questionnaire "+display_name+"</notes>" +
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
		$("#modal2").dialog("open");
	}
}

/**
 * @form Project Budgeting - Cost of tasks
 * @formNo 144
 * @param button
 */
function form144_update_task(form)
{
	if(is_update_access('form144'))
	{
		var project_id=document.getElementById('form144_master').elements['project_id'].value;
		var task=form.elements[0].value;
		var description=form.elements[1].value;
		var estimate=form.elements[2].value;
		var actual=form.elements[3].value;		
		var status=form.elements[4].value;
		var data_id=form.elements[5].value;
		var last_updated=get_my_time();
		var data_xml="<task_instances>" +
					"<id>"+data_id+"</id>" +
					"<status>"+status+"</status>" +
					"<name>"+task+"</name>" +
					"<est_expense>"+estimate+"</est_expense>" +
					"<expense>"+actual+"</expense>" +
					"<description>"+description+"</description>"+
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
		$("#modal2").dialog("open");
	}
}


/**
 * @form Project Budgeting - Expenses
 * @formNo 144
 * @param button
 */
function form144_update_expense(form)
{
	if(is_update_access('form144'))
	{
		var project_id=document.getElementById('form144_master').elements['project_id'].value;
		var person=form.elements[0].value;
		var amount=form.elements[1].value;
		var details=form.elements[2].value;
		var status=form.elements[3].value;		
		var data_id=form.elements[4].value;
		var last_updated=get_my_time();
		var data_xml="<expenses>" +
					"<id>"+data_id+"</id>" +
					"<source_id>"+project_id+"</source_id>" +
					"<source>project</source>"+
					"<status>"+status+"</status>" +
					"<person>"+person+"</person>" +
					"<amount>"+amount+"</amount>" +
					"<detail>"+details+"</detail>" +
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
		for(var i=0;i<4;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Store Movement
 * @param button
 */
function form145_dispatch_item(button)
{
	if(is_update_access('form145'))
	{
		var form_id=$(button).attr('form');
		var form=document.getElementById(form_id);

		var product_name=form.elements[0].value;
		var source=form.elements[3].value;
		form.elements[5].value='dispatched';
		
		var data_id=form.elements[6].value;
		var last_updated=get_my_time();
		var data_xml="<store_movement>" +
					"<id>"+data_id+"</id>" +
					"<status>dispatched</status>"+					
					"<last_updated>"+last_updated+"</last_updated>" +
					"</store_movement>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>store_movement</tablename>" +
					"<link_to>form145</link_to>" +
					"<title>Dispatched</title>" +
					"<notes>Product "+product_name+" from store "+source+"</notes>" +
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
		$(button).hide();
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Store Movement
 * @param button
 */
function form145_receive_item(button)
{
	if(is_update_access('form145'))
	{
		var form_id=$(button).attr('form');
		var form=document.getElementById(form_id);

		var product_name=form.elements[0].value;
		var target=form.elements[4].value;
		form.elements[5].value='received';
		
		var data_id=form.elements[6].value;
		var last_updated=get_my_time();
		var data_xml="<store_movement>" +
					"<id>"+data_id+"</id>" +
					"<status>received</status>"+					
					"<last_updated>"+last_updated+"</last_updated>" +
					"</store_movement>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>store_movement</tablename>" +
					"<link_to>form145</link_to>" +
					"<title>Received</title>" +
					"<notes>Product "+product_name+" at store "+target+"</notes>" +
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
		$(button).hide();
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Store Movement
 * @param button
 */
function form145_cancel_item(button)
{
	if(is_update_access('form145'))
	{
		var form_id=$(button).attr('form');
		var form=document.getElementById(form_id);

		var product_name=form.elements[0].value;
		var source=form.elements[3].value;
		form.elements[5].value='cancelled';
		
		var data_id=form.elements[6].value;
		var last_updated=get_my_time();
		var data_xml="<store_movement>" +
					"<id>"+data_id+"</id>" +
					"<status>cancelled</status>"+					
					"<last_updated>"+last_updated+"</last_updated>" +
					"</store_movement>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>store_movement</tablename>" +
					"<link_to>form145</link_to>" +
					"<title>Cancelled</title>" +
					"<notes>Movement of product "+product_name+" from store "+source+"</notes>" +
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
		$(button).hide();
	}
	else
	{
		$("#modal2").dialog("open");
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
		$("#modal2").dialog("open");
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
		$("#modal2").dialog("open");
	}
}

/**
 * @form Manage Roles
 * @param button
 */
function form147_update_item(button)
{
	if(is_update_access('form147'))
	{
		var form_id=$(button).attr('form');
		var form=document.getElementById(form_id);

		var role=form.elements[0].value;
		var desc=form.elements[1].value;
		var status=form.elements[2].value;
		var data_id=form.elements[3].value;
		var last_updated=get_my_time();
		var data_xml="<roles>" +
					"<id>"+data_id+"</id>" +
					"<role_name>"+role+"</role_name>" +
					"<description>"+desc+"</description>" +
					"<status>"+status+"</status>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</roles>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>roles</tablename>" +
					"<link_to>form147</link_to>" +
					"<title>Updated</title>" +
					"<notes>Role "+role+"</notes>" +
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
		$(button).hide();
	}
	else
	{
		$("#modal2").dialog("open");
	}
}


/**
 * @form Create Role
 * @param button
 */
function form148_update_item(form)
{
	if(is_update_access('form148'))
	{
		var master_form=document.getElementById('form148_master');
		var username=master_form.elements[1].value;
			
		var element_name=form.elements[0].getAttribute('data-i18n');
		element_name=element_name.substr(element_name.indexOf('.')+1);
		var re='unchecked';
		if(form.elements[1].checked)
			re='checked';
		var cr='unchecked';
		if(form.elements[2].checked)
			cr='checked';
		var up='unchecked';
		if(form.elements[3].checked)
			up='checked';
		var del='unchecked';
		if(form.elements[4].checked)
			del='checked';
		var data_id=form.elements[5].value;
		var element_id=form.elements[6].value;
		var last_updated=get_my_time();
		var data_xml="<access_control>" +
					"<id>"+data_id+"</id>" +
					"<username>"+username+"</username>" +
					"<element_id>"+element_id+"</element_id>" +
					"<element_name>"+element_name+"</element_name>" +
					"<re>"+re+"</re>" +
					"<cr>"+cr+"</cr>" +
					"<up>"+up+"</up>" +
					"<del>"+del+"</del>" +
					"<status>active</status>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</access_control>";	
		if(is_online())
		{
			server_update_simple(data_xml);
		}
		else
		{
			local_update_simple(data_xml);
		}	
		for(var i=0;i<7;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * formNo 148
 * form Create Role
 * @param button
 */
function form148_update_form()
{
	if(is_update_access('form148'))
	{
		var form=document.getElementById("form148_master");		
		$("[id^='save_form148_']").click();
	}
	else
	{
		$("#modal2").dialog("open");
	}
}


/**
 * @form Assign Roles
 * @param button
 */
function form149_update_item(button)
{
	if(is_update_access('form149'))
	{
		var form_id=$(button).attr('form');
		var form=document.getElementById(form_id);

		var role=form.elements[0].value;
		var username=form.elements[1].value;
		var status=form.elements[2].value;
		var data_id=form.elements[3].value;
		var last_updated=get_my_time();
		var data_xml="<roles>" +
					"<id>"+data_id+"</id>" +
					"<role_name>"+role+"</role_name>" +
					"<username>"+username+"</username>" +
					"<status>"+status+"</status>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</roles>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>user_role_mapping</tablename>" +
					"<link_to>form149</link_to>" +
					"<title>Updated</title>" +
					"<notes>Role mapping for "+username+"</notes>" +
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
		$(button).hide();
	}
	else
	{
		$("#modal2").dialog("open");
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
		$("#modal2").dialog("open");
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
		$("#modal2").dialog("open");
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
		$("#modal2").dialog("open");
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
		$("#modal2").dialog("open");
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

		var data_id=form.elements[0].value;
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
		$("#modal2").dialog("open");
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

		var data_id=form.elements[0].value;
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
		$("#modal2").dialog("open");
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
		
		var customer=form.elements[1].value;
		var quot_type=form.elements[2].value;
		var quot_date=get_raw_time(form.elements[3].value);
		var intro_notes=form.elements[4].value;
		
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
			amount+=Math.round(parseFloat(subform.elements[5].value));
			//total+=Math.round(parseFloat(subform.elements[7].value));
			//discount+=parseFloat(subform.elements[8].value);
		});
		
		var tax=Math.round((tax_rate*((amount-discount)/100))).toFixed(2);
		var total=Math.round(amount+tax-discount).toFixed(2);

		var data_id=form.elements[5].value;
		var last_updated=get_my_time();		
		
		var data_xml="<quotation>" +
					"<id>"+data_id+"</id>" +
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
					"<notes>Quotation Id "+data_id+"</notes>" +
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
		
		var total_row="<tr><td colspan='2' data-th='Total'>Total</td>" +
					"<td>Amount:</br>Discount: </br>Tax: @ <input type='number' value='"+tax_rate+"' title='specify tax rate' step='any' id='form153_tax' class='dblclick_editable'>%</br>Total: </td>" +
					"<td>Rs. "+amount.toFixed(2)+"</br>" +
					"Rs. <input type='number' value='"+discount.toFixed(2)+"' step='any' id='form153_discount' class='dblclick_editable'><br>" +
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
		$("#modal2").dialog("open");
	}
}

function form154_update_serial_numbers()
{
	$('#form154_body').find('tr').each(function(index)
	{
		$(this).find('td:nth-child(2)').html(index+1);
	});
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
		$("#modal2").dialog("open");
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
		$("#modal2").dialog("open");
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
		$("#modal2").dialog("open");
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
		$("#modal2").dialog("open");
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
						"<id>"+get_new_key()+"</id>" +
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
		$("#modal2").dialog("open");
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
		$("#modal2").dialog("open");
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
		$("#modal2").dialog("open");
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
		$("#modal2").dialog("open");
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
		$("#modal2").dialog("open");
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
		if(is_online())
		{
			server_update_simple(data_xml);
		}
		else
		{
			local_update_simple(data_xml);
		}
		for(var i=0;i<7;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
	}
	else
	{
		$("#modal2").dialog("open");
	}
}


/**
 * @form Put-away suggestions
 * @param button
 */
function form165_place_item(form)
{
	if(is_update_access('form165'))
	{
		var item=form.elements[0].value;
		var batch=form.elements[1].value;
		var storage=form.elements[3].value;
		var data_id=form.elements[4].value;
		var table_type=form.elements[5].value;
		var last_updated=get_my_time();
		var data_xml="<"+table_type+">" +
					"<id>"+data_id+"</id>" +
					"<storage>"+storage+"</storage>"+
					"<put_away_status>completed</put_away_status>"+
					"<last_updated>"+last_updated+"</last_updated>" +
					"</"+table_type+">";
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
		
		///////////adding store placement////////
		var storage_data="<area_utilization>" +
				"<id></id>" +
				"<name exact='yes'>"+storage+"</name>" +
				"<item_name exact='yes'>"+item+"</item_name>" +
				"<batch exact='yes'>"+batch+"</batch>" +
				"</area_utilization>";
		fetch_requested_data('',storage_data,function(placements)
		{
			if(placements.length===0 && storage!="")
			{
				var storage_xml="<area_utilization>" +
						"<id>"+get_new_key()+"</id>" +
						"<name>"+storage+"</name>" +
						"<item_name>"+item+"</item_name>" +
						"<batch>"+batch+"</batch>" +
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
	}
	else
	{
		$("#modal2").dialog("open");
	}
}


/**
 * @form Manage sale prices
 * @param button
 */
function form166_update_item(form)
{
	if(is_update_access('form166'))
	{
		var name=form.elements[0].value;
		var mrp=form.elements[1].value;
		var cost_price=form.elements[2].value;
		var sale_price=form.elements[3].value;
		var data_id=form.elements[4].value;
		var last_updated=get_my_time();
		var data_xml="<product_instances>" +
					"<id>"+data_id+"</id>" +
					"<product_name>"+name+"</product_name>" +
					"<batch>"+name+"</batch>" +
					"<mrp>"+mrp+"</mrp>"+
					"<cost_price>"+cost_price+"</cost_price>" +
					"<sale_price>"+sale_price+"</sale_price>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</product_instances>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>product_instances</tablename>" +
					"<link_to>form166</link_to>" +
					"<title>Updated</title>" +
					"<notes>Costing for item "+name+"</notes>" +
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
		$("#modal2").dialog("open");
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
		$("#modal2").dialog("open");
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
		var tax=form.elements[5].value;
		var data_id=form.elements[6].value;
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
		if(is_online())
		{
			server_update_row(data_xml,activity_xml);
			server_update_simple(pic_xml);
			server_create_simple(pic_xml);
		}
		else
		{
			local_update_row(data_xml,activity_xml);
			local_update_simple(pic_xml);
			local_create_simple(pic_xml);
		}	
		for(var i=0;i<6;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
	}
	else
	{
		$("#modal2").dialog("open");
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
		$("#modal2").dialog("open");
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
		$("#modal2").dialog("open");
	}
}

/**
 * @form Pricing Sheet
 * @formNo 172
 * @param button
 */
function form172_update_item(form)
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
		$("#modal2").dialog("open");
	}
}

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
		$("#modal2").dialog("open");
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
		$("#modal2").dialog("open");
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
		$("#modal2").dialog("open");
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
		$("#modal2").dialog("open");
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
		$("#modal2").dialog("open");
	}
}

/**
 * @form New Purchase Order
 * @param button
 */
function form178_update_form()
{
	if(is_update_access('form178'))
	{
		var form=document.getElementById("form178_master");
		var supplier=form.elements['supplier'].value;
		var order_date=get_raw_time(form.elements['date'].value);		
		var order_num=form.elements['order_num'].value;
		var status=form.elements['status'].value;
		var data_id=form.elements['order_id'].value;
		var save_button=form.elements['save'];
		
		$('#form178_share').show();
		$('#form178_share').click(function()
		{
			modal101_action('Purchase Order',supplier,'supplier',function (func) 
			{
				print_form178(func);
			});
		});
		
		var amount=0;
		var tax=0;
		var total=0;
		
		$("[id^='save_form178']").each(function(index)
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
						
		$('#form178_foot').html(total_row);

		var last_updated=get_my_time();		
		var data_xml="<purchase_orders>" +
					"<id>"+data_id+"</id>" +
					"<supplier>"+supplier+"</supplier>" +
					"<order_date>"+order_date+"</order_date>" +
					"<status>"+status+"</status>" +
					"<order_num>"+order_num+"</order_num>" +
					"<amount>"+amount+"</amount>"+
					"<tax>"+tax+"</tax>"+
					"<total>"+total+"</total>"+
					"<last_updated>"+last_updated+"</last_updated>" +
					"</purchase_orders>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>purchase_orders</tablename>" +
					"<link_to>form179</link_to>" +
					"<title>Created</title>" +
					"<notes>Purchase order # "+order_num+"</notes>" +
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
		$("[id^='save_form178_']").click();
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Manage Purchase orders
 * @param button
 */
function form179_update_item(form)
{
	if(is_update_access('form179'))
	{
		var order_num=form.elements[0].value;
		var order_date=get_raw_time(form.elements[1].value);
		var priority=form.elements[2].value;
		var supplier_name=form.elements[3].value;
		var status=form.elements[4].value;
		var data_id=form.elements[5].value;
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
					"<link_to>form179</link_to>" +
					"<title>Updated</title>" +
					"<notes>Purchase Order # "+order_num+"</notes>" +
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
		$("#modal2").dialog("open");
	}
}

/**
 * @form Create Sale Order (CPS)
 * @param button
 */
function form180_update_form()
{
	if(is_update_access('form180'))
	{
		var form=document.getElementById("form180_master");
		
		var customer=form.elements['customer'].value;
		var order_date=get_raw_time(form.elements['order_date'].value);		
		var status=form.elements['status'].value;
		var data_id=form.elements['order_id'].value;
		var order_num=form.elements['order_num'].value;
		var save_button=form.elements['save'];
		var last_updated=get_my_time();	
		
		var amount=0;
		var tax=0;
		var total=0;
		
		$("[id^='save_form180']").each(function(index)
		{
			var subform_id=$(this).attr('form');
			var subform=document.getElementById(subform_id);
			var row_id=subform.elements[8].value;
			if(!isNaN(parseFloat(subform.elements[5].value)))
				amount+=parseFloat(subform.elements[5].value);
			if(!isNaN(parseFloat(subform.elements[6].value)))			
				tax+=parseFloat(subform.elements[6].value);
			if(!isNaN(parseFloat(subform.elements[7].value)))			
				total+=parseFloat(subform.elements[7].value);
				
			var row_update_xml="<sale_order_items>"+
							"<id>"+row_id+"</id>"+
							"<bill_status>"+status+"</bill_status>"+
							"<last_updated>"+last_updated+"</last_updated>"+
							"</sale_order_items>";
			update_simple(row_update_xml);
		});
	
		var total_row="<tr><td colspan='1' data-th='Total'>Total</td>" +
							"<td>Amount:</br>Tax: </br>Total: </td>" +
							"<td>Rs. "+amount+"</br>" +
							"Rs. "+tax+"</br>" +
							"Rs. "+total+"</td>" +
							"<td></td>" +
							"</tr>";
		$('#form180_foot').html(total_row);

		var data_xml="<sale_orders>" +
					"<id>"+data_id+"</id>" +
					"<customer_name>"+customer+"</customer_name>" +
					"<order_date>"+order_date+"</order_date>" +
					"<order_num>"+order_num+"</order_num>" +
					"<status>"+status+"</status>" +
					"<amount>"+amount+"</amount>" +
					"<tax>"+tax+"</tax>" +
					"<total>"+total+"</total>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</sale_orders>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>sale_orders</tablename>" +
					"<link_to>form181</link_to>" +
					"<title>Updated</title>" +
					"<notes>Order # "+order_num+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		update_row(data_xml,activity_xml);

		$("[id^='save_form180_']").click();
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Manage Sale orders (CPS)
 * @param button
 */
function form181_update_item(form)
{
	if(is_update_access('form181'))
	{
		var order_num=form.elements[0].value;
		var customer_name=form.elements[1].value;
		var order_date=get_raw_time(form.elements[2].value);
		var status=form.elements[3].value;
		var data_id=form.elements[4].value;
		var last_updated=get_my_time();
		var data_xml="<sale_orders>" +
					"<id>"+data_id+"</id>" +
					"<customer_name>"+customer_name+"</customer_name>" +
					"<order_date>"+order_date+"</order_date>" +
					"<order_num>"+order_num+"</order_num>" +
					"<status>"+status+"</status>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</sale_orders>";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>sale_orders</tablename>" +
					"<link_to>form181</link_to>" +
					"<title>Updated</title>" +
					"<notes>Sale Order # "+order_num+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		update_row(data_xml,activity_xml);
			
		for(var i=0;i<4;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}

		var sale_items_xml="<sale_order_items>"+
					"<id></id>"+
					"<order_id>"+data_id+"</order_id>"+
					"</sale_order_items>";
		get_single_column_data(function (sale_items) 
		{
			for(var i=0;i<sale_items.length;i++)
			{
				var row_update_xml="<sale_order_items>"+
							"<id>"+sale_items[i]+"</id>"+
							"<bill_status>"+status+"</bill_status>"+
							"<last_updated>"+last_updated+"</last_updated>"+
							"</sale_order_items>";
				update_simple(row_update_xml);
			}
		},sale_items_xml);
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Update inventory (CPS)
 * @param button
 */
function form183_update_item(form)
{
	if(is_update_access('form183'))
	{
		var name=form.elements[0].value;
		var batch=form.elements[1].value;
		var manufacturing=get_raw_time(form.elements[2].value);
		var expiry=get_raw_time(form.elements[3].value);
		var data_id=form.elements[5].value;
		var last_updated=get_my_time();
		var data_xml="<product_instances>" +
					"<id>"+data_id+"</id>" +
					"<product_name>"+name+"</product_name>" +
					"<batch>"+batch+"</batch>" +
					"<manufacture_date>"+manufacturing+"</manufacture_date>"+
					"<expiry>"+expiry+"</expiry>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</product_instances>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>product_instances</tablename>" +
					"<link_to>form183</link_to>" +
					"<title>Updated</title>" +
					"<notes>Costing for batch number "+batch+" of "+name+"</notes>" +
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
		$("#modal2").dialog("open");
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
		if(is_online())
		{
			server_update_simple(data_xml);
		}
		else
		{
			local_update_simple(data_xml);
		}	
		
		for(var i=0;i<7;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

function form184_update_serial_numbers()
{
	$('#form184_body').find('tr').each(function(index)
	{
		$(this).find('td:nth-child(2)>input').attr('value',index+1);
	});
}

/**
 * @form Create production plan
 * @formNo 186
 * @param button
 */
function form186_update_item(form)
{
	if(is_update_access('form186'))
	{
		var master_form=document.getElementById("form186_master");		
		var plan_id=master_form.elements['plan_id'].value;
		
		var order=form.elements[0].value;
		var item=form.elements[1].value;
		var quantity=form.elements[2].value;
		var from=get_raw_time(form.elements[3].value);
		var to=get_raw_time(form.elements[4].value);
		var status=form.elements[5].value;
		var data_id=form.elements[6].value;
		var last_updated=get_my_time();
			
		var data_xml="<production_plan_items>" +
				"<id>"+data_id+"</id>" +
				"<order_no>"+order+"</order_no>" +
				"<item>"+item+"</item>" +
				"<quantity>"+quantity+"</quantity>" +
				"<from_time>"+from+"</from_time>" +
				"<to_time>"+to+"</to_time>" +
				"<status>"+status+"</status>" +
				"<plan_id>"+plan_id+"</plan_id>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</production_plan_items>";
	
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
		$("#modal2").dialog("open");
	}
}


/**
 * @form Create Production Plan
 * @param button
 */
function form186_update_form()
{
	if(is_update_access('form186'))
	{
		var form=document.getElementById("form186_master");
		
		var name=form.elements[1].value;
		var from=get_raw_time(form.elements[2].value);
		var to=get_raw_time(form.elements[3].value);
		var status=form.elements[4].value;
		var data_id=form.elements[5].value;
		var save_button=form.elements[6];
		var last_updated=get_my_time();
		
		var data_xml="<production_plan>" +
					"<id>"+data_id+"</id>" +
					"<name>"+name+"</name>" +
					"<from_time>"+from+"</from_time>" +
					"<to_time>"+to+"</to_time>" +
					"<status>"+status+"</status>"+
					"<last_updated>"+last_updated+"</last_updated>" +
					"</production_plan>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>production_plan</tablename>" +
					"<link_to>form189</link_to>" +
					"<title>Updated</title>" +
					"<notes>Production Plan "+name+"</notes>" +
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
			
		$("[id^='save_form186_']").click();
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

function form186_update_serial_numbers()
{
	$('#form186_body').find('tr').each(function(index)
	{
		$(this).find('td:nth-child(2)>input').attr('value',index+1);
	});
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
		$("#modal2").dialog("open");
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
 * @form Manage Production Plans
 * @formNo 189
 * @param button
 */
function form189_update_item(form)
{
	if(is_update_access('form189'))
	{
		var name=form.elements[0].value;
		var details=form.elements[1].value;
		var from=get_raw_time(form.elements[2].value);
		var to=get_raw_time(form.elements[3].value);
		var status=form.elements[4].value;
		var data_id=form.elements[5].value;
		var last_updated=get_my_time();
		
		var data_xml="<production_plan>" +
					"<id>"+data_id+"</id>" +
					"<name>"+name+"</name>" +
					"<details>"+details+"</details>" +
					"<from_time>"+from+"</from_time>" +
					"<to_time>"+to+"</to_time>" +
					"<status>"+status+"</status>"+
					"<last_updated>"+last_updated+"</last_updated>" +
					"</production_plan>";
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
		$("#modal2").dialog("open");
	}
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
		var status=form.elements[4].value;
		var data_id=form.elements[5].value;
		var last_updated=get_my_time();
		
		var data_xml="<sale_orders>" +
					"<id>"+data_id+"</id>" +
					"<customer_name>"+customer+"</customer_name>" +
					"<notes>"+details+"</notes>" +
					"<status>"+status+"</status>"+
					"<last_updated>"+last_updated+"</last_updated>" +
					"</sale_orders>";
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
		$("#modal2").dialog("open");
	}
}

/**
 * @form Manage Values list
 * @formNo 191
 * @param button
 */
function form191_update_item(form)
{
	if(is_update_access('form191'))
	{
		var value=form.elements[2].value;
		var status=form.elements[3].value;
		var data_id=form.elements[4].value;
		var last_updated=get_my_time();
		
		var data_xml="<values_list>" +
					"<id>"+data_id+"</id>" +
					"<name>"+value+"</name>" +
					"<status>"+status+"</status>"+
					"<last_updated>"+last_updated+"</last_updated>" +
					"</values_list>";
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
		$("#modal2").dialog("open");
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
						modal28_action(payments[y]);
					});
				}
				else
				{
					local_update_simple_func(payment_xml,function()
					{
						modal28_action(payments[y]);
					});
				}
				break;
			}
		},payment_data);
			
		$("[id^='save_form192_']").click();
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Inventory Adjust
 * @param button
 */
function form193_update_form()
{
	if(is_update_access('form193'))
	{
		var form=document.getElementById("form193_master");		
		var storage=form.elements['storage'].value;
		var items=[];

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
		var head_html="<tr><td>SKU</td><td>Item Name</td><td>Batch</td><td>Quantity</td></tr>";
		
		items.forEach(function(item)
		{
			body_html+="<tr><td>"+item.name+"</td><td>"+item.desc+"</td><td>"+item.batch+"</td><td>"+item.quantity+"</td></tr>";

			get_store_inventory(storage,item.name,item.batch,function(sys_quantity)
			{
				if(parseFloat(item.quantity)!=parseFloat(sys_quantity))
				{
					var quantity=parseFloat(item.quantity)-parseFloat(sys_quantity);
					var id=get_new_key();
					var last_updated=get_my_time();
					var data_xml="<inventory_adjust>" +
								"<id>"+id+"</id>" +
								"<batch>"+item.batch+"</batch>" +
								"<quantity>"+quantity+"</quantity>" +
								"<product_name>"+item.name+"</product_name>" +
								"<source>manual</source>" +
								"<storage>"+storage+"</storage>" +
								"<last_updated>"+last_updated+"</last_updated>" +
								"</inventory_adjust>";
					var activity_xml="<activity>" +
								"<data_id>"+id+"</data_id>" +
								"<tablename>inventory_adjust</tablename>" +
								"<link_to>report66</link_to>" +
								"<title>Updated</title>" +
								"<notes>Inventory of "+item.name+" for storage "+storage+"</notes>" +
								"<updated_by>"+get_name()+"</updated_by>" +
								"</activity>";
					if(is_online())
					{
						server_create_row(data_xml,activity_xml);
					}
					else
					{
						local_create_row(data_xml,activity_xml);
					}
				
					///////////adding store placement////////
					var storage_data="<area_utilization>" +
							"<id></id>" +
							"<name exact='yes'>"+storage+"</name>" +
							"<item_name exact='yes'>"+item.name+"</item_name>" +
							"<batch exact='yes'>"+item.batch+"</batch>" +
							"</area_utilization>";
					fetch_requested_data('',storage_data,function(placements)
					{
						if(placements.length===0 && storage!="")
						{
							var storage_xml="<area_utilization>" +
									"<id>"+get_new_key()+"</id>" +
									"<name>"+storage+"</name>" +
									"<item_name>"+item.name+"</item_name>" +
									"<batch>"+item.batch+"</batch>" +
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
					///////////////////////////////////	
				}
			});
		});
		
		$('#form193_head').html(head_html);
		$('#form193_body').html(body_html);

	}
	else
	{
		$("#modal2").dialog("open");
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
		$("#modal2").dialog("open");
	}
}

/**
 * @form Order details
 * @param button
 */
function form198_update_item()
{
	if(is_update_access('form198'))
	{
		var form=document.getElementById("form198_master");
		
		var awb_num=form.elements['awb_num'].value;
		var order_num=form.elements['order_num'].value;
		var type=form.elements['type'].value;
		var manifest_id=form.elements['manifest_id'].value;
		var merchant_name=form.elements['merchant_name'].value;
		var ship_to=form.elements['ship_to'].value;
		var address1=form.elements['address1'].value;
		var address2=form.elements['address2'].value;
		var city=form.elements['city'].value;
		var state=form.elements['state'].value;
		var pincode=form.elements['pincode'].value;
		var phone=form.elements['phone'].value;
		var telephone=form.elements['telephone'].value;
		var weight=form.elements['weight'].value;
		var d_value=form.elements['d_value'].value;
		var c_value=form.elements['c_value'].value;
		var vendor_code=form.elements['vendor_code'].value;
		var shipper_name=form.elements['shipper_name'].value;
		var r_address1=form.elements['r_address1'].value;
		var r_address2=form.elements['r_address2'].value;
		var r_address3=form.elements['r_address3'].value;
		var rpincode=form.elements['rpincode'].value;
		var len=form.elements['len'].value;
		var breadth=form.elements['breadth'].value;
		var height=form.elements['height'].value;
		var pieces=form.elements['pieces'].value;
		var c_account=form.elements['c_account'].value;
		var c_name=form.elements['c_name'].value;
		var manifest_type=form.elements['manifest_type'].value;
		var ddate=form.elements['ddate'].value;
		var notes=form.elements['notes'].value;
		var pickup_location=form.elements['pickup_location'].value;
		var pickup_by=form.elements['pickup_by'].value;
		var sku=form.elements['sku'].value;
		var product_name=form.elements['product_name'].value;
		var status=form.elements['status'].value;
		var current_location=form.elements['current_location'].value;
		var delivery_person=form.elements['delivery_person'].value;

		var id=form.elements['id'].value;
		var last_updated=get_my_time();
		var data_xml="<logistics_orders>" +
				"<id>"+id+"</id>" +
				"<awb_num>"+awb_num+"</awb_num>" +
				"<type>"+type+"</type>"+
                "<order_num>"+order_num+"</order_num>"+
                "<manifest_id>"+manifest_id+"</manifest_id>"+
                "<merchant_name>"+merchant_name+"</merchant_name>"+
                "<ship_to>"+ship_to+"</ship_to>"+
                "<address1>"+address1+"</address1>"+
                "<address2>"+address2+"</address2>"+
                "<city>"+city+"</city>"+
                "<state>"+state+"</state>"+
                "<pincode>"+pincode+"</pincode>"+
                "<phone>"+phone+"</phone>"+
                "<telephone>"+telephone+"</telephone>"+
                "<weight>"+weight+"</weight>"+
                "<declared_value>"+d_value+"</declared_value>"+
                "<collectable_value>"+c_value+"</collectable_value>"+
                "<vendor_code>"+vendor_code+"</vendor_code>"+
                "<shipper_name>"+shipper_name+"</shipper_name>"+
                "<return_address1>"+r_address1+"</return_address1>"+
                "<return_address2>"+r_address2+"</return_address2>"+
                "<return_address3>"+r_address3+"</return_address3>"+
                "<return_pincode>"+rpincode+"</return_pincode>"+
                "<len>"+len+"</len>"+
                "<breadth>"+breadth+"</breadth>"+
                "<height>"+height+"</height>"+
                "<pieces>"+pieces+"</pieces>"+
                "<carrier_account>"+c_account+"</carrier_account>"+
                "<carrier_name>"+c_name+"</carrier_name>"+
                "<manifest_type>"+manifest_type+"</manifest_type>"+
                "<import_date>"+get_raw_time(ddate)+"</import_date>"+
                "<notes>"+notes+"</notes>"+
                "<pickup_location>"+pickup_location+"</pickup_location>"+
                "<pickup_by>"+pickup_by+"</pickup_by>"+
                "<sku>"+sku+"</sku>"+
                "<product_name>"+product_name+"</product_name>"+
                "<status>"+status+"</status>"+
                "<current_location>"+current_location+"</current_location>"+
                "<delivery_person>"+delivery_person+"</delivery_person>"+
                "<last_updated>"+last_updated+"</last_updated>" +
				"</logistics_orders>";
		var activity_xml="<activity>" +
				"<data_id>"+id+"</data_id>" +
				"<tablename>logistics_orders</tablename>" +
				"<link_to>form198</link_to>" +
				"<title>Updated</title>" +
				"<notes>AWB # "+awb_num+"</notes>" +
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
		
		$('#form198_fieldset').html("Order details have been updated.");
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Logistics Incoming Items
 * @param button
 */
function form199_update_item(form)
{
	if(is_update_access('form199'))
	{
		var master_form=document.getElementById("form199_master");		
		var comments=master_form.elements['comments'].value;
		
		var awb_num=form.elements[0].value;
		var status='received';
		var id=form.elements[2].value;
		var last_updated=get_my_time();
		
		var old_order_history=form.elements[5].value;

		var order_history=JSON.parse(old_order_history);
		var history_object=new Object();
		history_object.timeStamp=get_my_time();
		history_object.details=comments;
		history_object.location=get_session_var('official_address');
		history_object.status=status;
		order_history.push(history_object);
		var order_history_string=JSON.stringify(order_history);		
		
		var data_xml="<logistics_orders>" +
					"<id>"+id+"</id>" +
					"<awb_num>"+awb_num+"</awb_num>" +
					"<status>"+status+"</status>" +
					"<comments>"+comments+"</comments>" +
					"<order_history>"+order_history_string+"</order_history>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</logistics_orders>";
		var activity_xml="<activity>" +
					"<data_id>"+id+"</data_id>" +
					"<tablename>logistics_orders</tablename>" +
					"<link_to>form198</link_to>" +
					"<title>Received</title>" +
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
		$("#modal2").dialog("open");
	}
}

function form200_update_serial_numbers()
{
	$('#form200_body').find('tr').each(function(index)
	{
		$(this).find('td:nth-child(2)').html(index+1);
	});
}

/**
 * @form Create DRS
 * @param button
 */
function form200_update_form()
{
	if(is_create_access('form200'))
	{
		var form=document.getElementById("form200_master");
		
		var drs_num=form.elements['drs_num'].value;
		var employee=form.elements['employee'].value;
		var ddate=get_raw_time(form.elements['date'].value);
		var data_id=form.elements['id'].value;
		
		$('#form200_share').show();
		$('#form200_share').click(function()
		{
			modal101_action('Delivery Run Sheet',employee,'staff',function (func) 
			{
				print_form200(func);
			});
		});

		var save_button=form.elements['save'];
		var last_updated=get_my_time();
		
		var data_xml="<drs>" +
					"<id>"+data_id+"</id>" +
					"<drs_num>"+drs_num+"</drs_num>"+
					"<employee>"+employee+"</employee>"+
					"<drs_time>"+ddate+"</drs_time>"+
					"<last_updated>"+last_updated+"</last_updated>" +
					"</drs>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>drs</tablename>" +
					"<link_to>form201</link_to>" +
					"<title>Updated</title>" +
					"<notes>DRS # "+drs_num+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		var num_data="<user_preferences>"+
					"<id></id>"+						
					"<name exact='yes'>drs_num</name>"+												
					"</user_preferences>";
		get_single_column_data(function (drs_num_ids)
		{
			if(drs_num_ids.length>0)
			{
				var num_xml="<user_preferences>"+
								"<id>"+drs_num_ids[0]+"</id>"+
								"<value>"+(parseInt(drs_num)+1)+"</value>"+
								"</user_preferences>";
				update_simple(num_xml);
				
			}
		},num_data);

		update_row(data_xml,activity_xml);
		

		$("[id^='save_form200_']").click();
	}
	else
	{
		$("#modal2").dialog("open");
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

		var order_history=JSON.parse(old_order_history);
		var history_object=new Object();
		history_object.timeStamp=get_my_time();
		history_object.details="In transit";
		history_object.location=target;
		history_object.status='transit';
		order_history.push(history_object);
		var order_history_string=JSON.stringify(order_history);		
		
		var data_xml="<logistics_orders>" +
					"<id>"+id+"</id>" +
					"<awb_num>"+awb_num+"</awb_num>" +
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
		$("#modal2").dialog("open");
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

		var order_history=JSON.parse(old_order_history);
		var history_object=new Object();
		history_object.timeStamp=get_my_time();
		history_object.details=comments;
		history_object.location=get_session_var('official_address');
		history_object.status=status;
		order_history.push(history_object);
		var order_history_string=JSON.stringify(order_history);		
		
		var data_xml="<logistics_orders>" +
					"<id>"+id+"</id>" +
					"<awb_num>"+awb_num+"</awb_num>" +
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
		$("#modal2").dialog("open");
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

		var order_history=JSON.parse(old_order_history);
		var history_object=new Object();
		history_object.timeStamp=get_my_time();
		history_object.details=comments;
		history_object.location="";
		history_object.status=status;
		order_history.push(history_object);
		var order_history_string=JSON.stringify(order_history);		
		
		var data_xml="<logistics_orders>" +
					"<id>"+id+"</id>" +
					"<awb_num>"+awb_num+"</awb_num>" +
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
		$("#modal2").dialog("open");
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

		var order_history=JSON.parse(old_order_history);
		var history_object=new Object();
		history_object.timeStamp=get_my_time();
		history_object.details=comments;
		history_object.location="";
		history_object.status=status;
		order_history.push(history_object);
		var order_history_string=JSON.stringify(order_history);		
		
		var data_xml="<logistics_orders>" +
					"<id>"+id+"</id>" +
					"<awb_num>"+awb_num+"</awb_num>" +
					"<status>"+status+"</status>" +
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
		$("#modal2").dialog("open");
	}
}

/**
 * @form Update inventory (aurilion)
 * @param button
 */
function form207_update_item(form)
{
	if(is_update_access('form1'))
	{
		var name=form.elements[0].value;
		var batch=form.elements[1].value;
		var expiry=get_raw_time(form.elements[2].value);
		var mrp=form.elements[3].value;
		var sp=form.elements[4].value;
		var cp=form.elements[5].value;
		var data_id=form.elements[8].value;
		var last_updated=get_my_time();
		var data_xml="<product_instances>" +
					"<id>"+data_id+"</id>" +
					"<product_name>"+name+"</product_name>" +
					"<batch>"+batch+"</batch>" +
					"<mrp>"+mrp+"</mrp>"+
					"<sale_price>"+sp+"</sale_price>"+
					"<cost_price>"+cp+"</cost_price>"+
					"<expiry>"+expiry+"</expiry>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</product_instances>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>product_instances</tablename>" +
					"<link_to>form207</link_to>" +
					"<title>Updated</title>" +
					"<notes>Batch number "+batch+" of "+name+"</notes>" +
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
		$("#modal2").dialog("open");
	}
}

/**
 * @form Treatment Plans
 * @formNo 208
 * @param button
 */
function form208_update_item(form)
{
	if(is_update_access('form189'))
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
		$("#modal2").dialog("open");
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
		$("#modal2").dialog("open");
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
		$("#modal2").dialog("open");
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
 * @form Update Logistics orders
 * @param button
 */
function form211_update_item(form)
{
	if(is_update_access('form211'))
	{
		var awb_num=form.elements[0].value;
		var status=form.elements[2].value;
		var remarks=form.elements[3].value;
		var id=form.elements[4].value;
		var last_updated=get_my_time();
		
		if(status!="")
		{
			var old_order_history=form.elements[6].value;
			var order_history=JSON.parse(old_order_history);
			var history_object=new Object();
			history_object.timeStamp=get_my_time();
			history_object.details=remarks;
			history_object.status=status;
			
			if(status=='received')
			{
				history_object.location=get_session_var('official_address');
			}
			else if(status=='pending')
			{
				history_object.location=get_session_var('official_address');
			}
			else if(status=='delivered')
			{
				history_object.location="";
			}
			else if(status=='undelivered')
			{
				history_object.location="";
			}
			
			order_history.push(history_object);
			var order_history_string=JSON.stringify(order_history);		
			
			var data_xml="<logistics_orders>" +
						"<id>"+id+"</id>" +
						"<status>"+status+"</status>" +
						"<comments>"+remarks+"</comments>" +
						"<order_history>"+order_history_string+"</order_history>" +
						"<last_updated>"+last_updated+"</last_updated>" +
						"</logistics_orders>";
			var activity_xml="<activity>" +
						"<data_id>"+id+"</data_id>" +
						"<tablename>logistics_orders</tablename>" +
						"<link_to>form198</link_to>" +
						"<title>Updated</title>" +
						"<notes>AWB # "+awb_num+"</notes>" +
						"<updated_by>"+get_name()+"</updated_by>" +
						"</activity>";
			update_row(data_xml,activity_xml);
			for(var i=0;i<4;i++)
			{
				$(form.elements[i]).attr('readonly','readonly');
			}
			
			$(form).off('submit');
			$(form).on('submit',function (e) 
			{
				e.preventDefault();
			});
			
		}
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Update Logistics orders (branches)
 * @param button
 */
function form212_update_item(form)
{
	if(is_update_access('form212'))
	{
		var awb_num=form.elements[0].value;
		var status=form.elements[1].value;
		var remarks=form.elements[2].value;
		var id=form.elements[3].value;
		var last_updated=get_my_time();

		var old_order_history=form.elements[5].value;
		var order_history=JSON.parse(old_order_history);
		var history_object=new Object();
		history_object.timeStamp=get_my_time();
		history_object.details=remarks;
		history_object.status=status;
		
		if(status=='received')
		{
			history_object.location=get_session_var('official_address');
		}
		else if(status=='pending')
		{
			history_object.location=get_session_var('official_address');
		}
		else if(status=='delivered')
		{
			history_object.location="";
		}
		else if(status=='undelivered')
		{
			history_object.location="";
		}
		
		order_history.push(history_object);
		var order_history_string=JSON.stringify(order_history);		
				
		var data_xml="<logistics_orders>" +
					"<id>"+id+"</id>" +
					"<awb_num>"+awb_num+"</awb_num>" +
					"<status>"+status+"</status>" +
					"<comments>"+remarks+"</comments>" +
					"<order_history>"+order_history_string+"</order_history>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</logistics_orders>";
		var activity_xml="<activity>" +
					"<data_id>"+id+"</data_id>" +
					"<tablename>logistics_orders</tablename>" +
					"<link_to>form198</link_to>" +
					"<title>Updated</title>" +
					"<notes>AWB # "+awb_num+"</notes>" +
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
		$("#modal2").dialog("open");
	}
}

/**
 * @form Sale leads (followups)
 * @param button
 */
function form213_update_item(form)
{
	if(is_update_access('form213'))
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
					"<link_to>form213</link_to>" +
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
		$("#modal2").dialog("open");
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
		$("#modal2").dialog("open");
	}
}

function form219_update_serial_numbers()
{
	$('#form219_body').find('tr').each(function(index)
	{
		$(this).find('td:nth-child(2)').html(index+1);
	});
	
	var total_amount=0;
	var collected_amount=0;
	
	$("[id^='save_form219']").each(function(index)
	{
		var subform_id=$(this).attr('form');
		var subform=document.getElementById(subform_id);
		
		if(!isNaN(parseFloat(subform.elements[3].value)))
		{
			total_amount+=parseFloat(subform.elements[3].value);
			if(subform.elements[6].value=='delivered')
				collected_amount+=parseFloat(subform.elements[3].value);
		}		
	});
	
	var form=document.getElementById("form219_master");
	form.elements['total'].value=total_amount;
	form.elements['collected'].value=collected_amount;		
}

/**
 * @form Create DRS
 * @param button
 */
function form219_update_form()
{
	if(is_create_access('form219'))
	{
		form219_update_serial_numbers();
		var form=document.getElementById("form219_master");
		
		var drs_num=form.elements['drs_num'].value;
		var employee=form.elements['employee'].value;
		var ddate=get_raw_time(form.elements['date'].value);
		var collectable_amount=form.elements['total'].value;
		var collected_amount=form.elements['collected'].value;
		var data_id=form.elements['id'].value;
		
		$('#form219_share').show();
		$('#form219_share').click(function()
		{
			modal101_action('Delivery Run Sheet',employee,'staff',function (func) 
			{
				print_form219(func);
			});
		});

		var save_button=form.elements['save'];
		var last_updated=get_my_time();
		
		var data_xml="<drs>" +
					"<id>"+data_id+"</id>" +
					"<drs_num>"+drs_num+"</drs_num>"+
					"<employee>"+employee+"</employee>"+
					"<collectable_amount>"+collectable_amount+"</collectable_amount>"+
					"<collected_amount>"+collected_amount+"</collected_amount>"+
					"<drs_time>"+ddate+"</drs_time>"+
					"<last_updated>"+last_updated+"</last_updated>" +
					"</drs>";
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>drs</tablename>" +
					"<link_to>form201</link_to>" +
					"<title>Updated</title>" +
					"<notes>DRS # "+drs_num+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
		var num_data="<user_preferences>"+
					"<id></id>"+						
					"<name exact='yes'>drs_num</name>"+												
					"</user_preferences>";
		get_single_column_data(function (drs_num_ids)
		{
			if(drs_num_ids.length>0)
			{
				var num_xml="<user_preferences>"+
								"<id>"+drs_num_ids[0]+"</id>"+
								"<value>"+(parseInt(drs_num)+1)+"</value>"+
								"</user_preferences>";
				if(is_online())
				{
					server_update_simple(num_xml);
				}
				else 
				{
					local_update_simple(num_xml);
				}
			}
		},num_data);

		if(is_online())
		{
			server_update_row(data_xml,activity_xml);
		}
		else
		{
			local_update_row(data_xml,activity_xml);
		}

		$("[id^='save_form219_']").click();
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * formNo 220
 * form Manage Projects (CPS)
 * @param button
 */
function form220_update_item(form)
{
	if(is_update_access('form220'))
	{
		var name=form.elements[0].value;
		var details=form.elements[1].value;
		var priority=form.elements[2].value;
		var start_date=get_raw_time(form.elements[3].value);
		var status=form.elements[4].value;
		var data_id=form.elements[5].value;
		var last_updated=get_my_time();
		var data_xml="<projects>" +
					"<id>"+data_id+"</id>" +
					"<name>"+name+"</name>" +
					"<priority>"+priority+"</priority>" +
					"<details>"+details+"</details>" +
					"<start_date>"+start_date+"</start_date>" +
					"<status>"+status+"</status>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</projects>";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>projects</tablename>" +
					"<link_to>form220</link_to>" +
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
		for(var i=0;i<5;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}
	}
	else
	{
		$("#modal2").dialog("open");
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
		$("#modal2").dialog("open");
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
		$("#modal2").dialog("open");
	}
}

/**
 * @form Testing
 * @param button
 */
function form224_update_item(form)
{
	if(is_update_access('form224'))
	{
		var test_id=form.elements[0].value;
		var item=form.elements[1].value;
		var details=form.elements[2].value;
		var next_due=get_raw_time(form.elements[3].value);
		var status=form.elements[4].value;
		var data_id=form.elements[5].value;
		var save_button=form.elements[6];
		var del_button=form.elements[7];
		var last_updated=get_my_time();
		var data_xml="<testing_process>" +
				"<id>"+data_id+"</id>" +
				"<item>"+item+"</item>" +
				"<test_id>"+test_id+"</test_id>" +
				"<details>"+details+"</details>" +
				"<next_due>"+next_due+"</next_due>" +
				"<status>"+status+"</status>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</testing_process>";	
	
		update_simple(data_xml);
		
		for(var i=0;i<5;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}		
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Create Bill (CPS)
 * @param button
 */
function form225_update_form()
{
	if(is_create_access('form225'))
	{
		var form=document.getElementById("form225_master");
		
		var customer=form.elements['customer'].value;
		var bill_date=get_raw_time(form.elements['date'].value);
		var bill_num=form.elements['bill_num'].value;
		var data_id=form.elements['bill_id'].value;
		var transaction_id=form.elements['t_id'].value;
		
		var bt=get_session_var('title');
		$('#form225_share').show();
		$('#form225_share').click(function()
		{
			modal101_action(bt+' - Invoice# '+bill_num,customer,'customer',function (func) 
			{
				print_form225(func);
			});
		});

		var amount=0;
		var discount=0;
		var tax=0;
		var total=0;
		
		$("[id^='save_form225']").each(function(index)
		{
			var subform_id=$(this).attr('form');
			var subform=document.getElementById(subform_id);
			amount+=parseFloat(subform.elements[5].value);
			discount+=parseFloat(subform.elements[6].value);
			tax+=parseFloat(subform.elements[7].value);
			total+=parseFloat(subform.elements[8].value);			
		});

		var last_updated=get_my_time();
		
		var data_xml="<bills>" +
					"<id>"+data_id+"</id>" +
					"<customer_name>"+customer+"</customer_name>" +
					"<bill_date>"+bill_date+"</bill_date>" +
					"<amount>"+amount+"</amount>" +
					"<total>"+total+"</total>" +
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
		update_row(data_xml,activity_xml);
		update_simple(transaction_xml);
		
		var total_row="<tr><td colspan='3' data-th='Total'>Total</td>" +
				"<td>Amount:</br>Discount: </br>Tax: </br>Total: </td>" +
				"<td>Rs. "+amount+"</br>" +
				"Rs. "+discount+"</br>" +
				"Rs. "+tax+"</br>" +
				"Rs. "+total+"</td>" +
				"<td></td>" +
				"</tr>";
		$('#form225_foot').html(total_row);

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
					modal26_action(payments[y]);
				});
				break;
			}
		},payment_data);
	
		$("[id^='save_form225_']").click();
	}
	else
	{
		$("#modal2").dialog("open");
	}
}

/**
 * @form Delivery Run
 * @param button
 */
function form226_update_item(form)
{
	if(is_update_access('form226'))
	{
		var person=form.elements[0].value;
		var date=get_raw_time(form.elements[1].value);
		var start=form.elements[2].value;
		var end=form.elements[3].value;
		var total=form.elements[4].value;
		var data_id=form.elements[5].value;
		var save_button=form.elements[6];
		var del_button=form.elements[7];
		var last_updated=get_my_time();
		var data_xml="<delivery_run>" +
				"<id>"+data_id+"</id>" +
				"<person>"+person+"</person>" +
				"<date>"+date+"</date>" +
				"<starting_km>"+start+"</starting_km>" +
				"<ending_km>"+end+"</ending_km>" +
				"<total_run>"+total+"</total_run>" +
				"<last_updated>"+last_updated+"</last_updated>" +
				"</delivery_run>";	
		
		update_simple(data_xml);
		
		for(var i=0;i<5;i++)
		{
			$(form.elements[i]).attr('readonly','readonly');
		}		
	}
	else
	{
		$("#modal2").dialog("open");
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
		$("#modal2").dialog("open");
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
		
		var data_id=form.elements['id'].value;
		var name=form.elements['name'].value;
		var description=form.elements['description'].value;
		var html_content=htmlentities(document.getElementById('form233_section').innerHTML);
		var save_button=form.elements['save'];
		var last_updated=get_my_time();
		
		var data_xml="<newsletter>" +
					"<id>"+data_id+"</id>" +
					"<name>"+name+"</name>" +
					"<description>"+description+"</description>" +
					"<html_content>"+html_content+"</html_content>" +
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
		$("#modal2").dialog("open");
	}
}

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
		$("#modal2").dialog("open");
	}
}


/**
 * @form Manage Products (without tax)
 * @param button
 */
function form234_update_item(form)
{
	if(is_update_access('form234'))
	{
		var name=form.elements[0].value;
		var make=form.elements[1].value;
		var description=form.elements[2].value;
		var data_id=form.elements[3].value;
		var last_updated=get_my_time();
		
		var data_xml="<product_master>" +
					"<id>"+data_id+"</id>" +
					"<make>"+make+"</make>" +
					"<name>"+name+"</name>" +
					"<description>"+description+"</description>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</product_master>";	
		var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>product_master</tablename>" +
					"<link_to>form234</link_to>" +
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
		$("#modal2").dialog("open");
	}
}

