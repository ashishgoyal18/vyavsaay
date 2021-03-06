/**
 * @form Create Pamphlets
 * @formNo 2
 */
function form2_add_item()
{
	if(is_create_access('form2'))
	{
		var rowsHTML="";
		var id=vUtil.newKey();
		rowsHTML+="<tr>";
		rowsHTML+="<form id='form2_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Item Type'>";
				rowsHTML+="Type: <input type='text' form='form2_"+id+"' required value=''>";
				rowsHTML+="<br>Name: <input type='text' form='form2_"+id+"' class='dblclick_editable' required value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Detail'>";
				rowsHTML+="Detail: <textarea class='widebox' form='form2_"+id+"' class='dblclick_editable' required></textarea>";
				rowsHTML+="<br>Link: <textarea class='widebox' form='form2_"+id+"' class='dblclick_editable'></textarea>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Image'>";
				rowsHTML+="<output form='form2_"+id+"'></output>";
				rowsHTML+="<input type='file' form='form2_"+id+"'>";
				rowsHTML+="<br>Size: <input type='number' value='2' class='dblclick_editable' required form='form2_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form2_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='submit' class='submit_hidden' form='form2_"+id+"' id='save_form2_"+id+"' >";
				rowsHTML+="<input type='button' class='delete_icon' form='form2_"+id+"' id='delete_form2_"+id+"' onclick='$(this).parent().parent().remove();'>";
			rowsHTML+="</td>";
		rowsHTML+="</tr>";

		$('#form2_body').prepend(rowsHTML);

		var fields=document.getElementById("form2_"+id);
		var type_filter=fields.elements[0];
		var name_filter=fields.elements[1];
		var detail_filter=fields.elements[2];
		var link_filter=fields.elements[3];
		var pictureinfo=fields.elements[4];
		var picture=fields.elements[5];

		picture.addEventListener('change',function(evt)
		{
            vFileHandler.picture({evt:evt,size:'small',fsuccess:function(dataURL)
			{
				pictureinfo.innerHTML="<div class='figure'><img id='img_form2_"+id+"' src='"+dataURL+"'></div>";
			}});
		},false);

		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form2_create_item(fields);
		});

		set_static_value_list('newsletter_items','item_type',type_filter,function()
		{
			$(type_filter).focus();
		});

		$('textarea').autosize();
		longPressEditable($('.dblclick_editable'));
	}
	else
	{
		$("#modal2_link").click();
	}
}


/**
 * @form Create Service Bill
 * @formNo 10
 */
function form10_add_item()
{
	if(is_create_access('form10'))
	{
		var rowsHTML="";
		var id=vUtil.newKey();
		rowsHTML+="<tr>";
		rowsHTML+="<form id='form10_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Item'>";
				rowsHTML+="<input type='text' class='wideinput' required form='form10_"+id+"'>";
				rowsHTML+="<img src='./images/add_image.png' class='add_image' title='Add new service' id='form10_add_service_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Remark'>";
				rowsHTML+="<textarea form='form10_"+id+"'></textarea>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Quantity'>";
				rowsHTML+="<input type='number' step='1' form='form10_"+id+"' value='1'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Price'>";
				rowsHTML+="Unit Price: <input type='number' required form='form10_"+id+"' step='any'>";
				rowsHTML+="<br>Amount: <input type='number' readonly='readonly' step='any' form='form10_"+id+"' name='amount'>";
				rowsHTML+="<br>Discount: <input type='number' step='any' form='form10_"+id+"' name='discount' value='0'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form10_"+id+"' name='tax'>";
				rowsHTML+="<input type='hidden' form='form10_"+id+"' name='total'>";
				rowsHTML+="<input type='hidden' form='form10_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='button' class='submit_hidden' form='form10_"+id+"' id='save_form10_"+id+"' >";
				rowsHTML+="<input type='button' class='delete_icon' form='form10_"+id+"' id='delete_form10_"+id+"' onclick='$(this).parent().parent().remove();'>";
				rowsHTML+="<input type='submit' class='submit_hidden' form='form10_"+id+"'>";
				rowsHTML+="<input type='hidden' form='form10_"+id+"' name='tax_unit'>";
			rowsHTML+="</td>";
		rowsHTML+="</tr>";

		$('#form10_body').prepend(rowsHTML);

		var fields=document.getElementById("form10_"+id);
		var name_filter=fields.elements[0];
		var notes_filter=fields.elements[1];
		var quantity_filter=fields.elements[2];
		var price_filter=fields.elements[3];
		var amount_filter=fields.elements[4];
		var discount_filter=fields.elements[5];
		var tax_filter=fields.elements[6];
		var total_filter=fields.elements[7];
		var id_filter=fields.elements[8];
		var save_button=fields.elements[9];
		var tax_unit_filter=fields.elements[12];

		$(save_button).on("click", function(event)
		{
			event.preventDefault();
			form10_create_item(fields);
		});

		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form10_add_item();
		});

		var add_service=document.getElementById('form10_add_service_'+id);
		$(add_service).on('click',function()
		{
			modal20_action(function()
			{
				var service_data="<services>" +
						"<name></name>" +
						"</services>";
				set_my_value_list(service_data,name_filter,function ()
				{
					$(name_filter).focus();
				});
			});
		});

		var service_data="<services>" +
				"<name></name>" +
				"</services>";
		set_my_value_list(service_data,name_filter,function ()
		{
			$(name_filter).focus();
		});

		$(name_filter).on('blur',function(event)
		{
			notes_filter.value="";
			price_filter.value=0;
			total_filter.value=0;
			amount_filter.value=0;
			discount_filter.value=0;
			tax_filter.value=0;
			tax_unit_filter.value=0;

			var price_data="<services>" +
					"<price></price>" +
					"<tax></tax>" +
					"<name exact='yes'>"+name_filter.value+"</name>" +
					"</services>";

			fetch_requested_data('',price_data,function(prices)
			{
				if(prices.length>0)
				{
					price_filter.value=prices[0].price;
					tax_unit_filter.value=prices[0].tax;
					amount_filter.value=parseFloat(quantity_filter.value)*parseFloat(price_filter.value);
					tax_filter.value=parseFloat((parseFloat(tax_unit_filter.value)*(parseFloat(amount_filter.value)-parseFloat(discount_filter.value)))/100);
				}
				total_filter.value=parseFloat(amount_filter.value)+parseFloat(tax_filter.value)-parseFloat(discount_filter.value);
			});
		});
		$(quantity_filter).add(price_filter).add(discount_filter).on('blur',function ()
		{
			amount_filter.value=parseFloat(quantity_filter.value)*parseFloat(price_filter.value);
			tax_filter.value=parseFloat((parseFloat(tax_unit_filter.value)*(parseFloat(amount_filter.value)-parseFloat(discount_filter.value)))/100);
			total_filter.value=parseFloat(amount_filter.value)+parseFloat(tax_filter.value)-parseFloat(discount_filter.value);
		});
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form Create product Bill
 * @formNo 12
 */
function form12_add_item()
{
	if(is_create_access('form12'))
	{
		var rowsHTML="";
		var id=vUtil.newKey();
		rowsHTML+="<tr>";
		rowsHTML+="<form id='form12_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Product Name'>";
				rowsHTML+="<input type='text' required form='form12_"+id+"'>";
				rowsHTML+="<img src='./images/add_image.png' class='add_image' title='Add new product' id='form12_add_product_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Batch'>";
				rowsHTML+="<input type='text' required form='form12_"+id+"'>";
				rowsHTML+="<img src='./images/add_image.png' class='add_image' title='Add new batch' id='form12_add_batch_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Quantity'>";
				rowsHTML+="<input type='number' required form='form12_"+id+"' step='any'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Unit Price'>";
				rowsHTML+="<input type='number' required form='form12_"+id+"' step='any'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Total'>";
				rowsHTML+="<input type='number' required form='form12_"+id+"' step='any'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form12_"+id+"'>";
				rowsHTML+="<input type='hidden' form='form12_"+id+"'>";
				rowsHTML+="<input type='hidden' form='form12_"+id+"'>";
				rowsHTML+="<input type='hidden' form='form12_"+id+"'>";
				rowsHTML+="<input type='hidden' form='form12_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='button' class='submit_hidden' form='form12_"+id+"' id='save_form12_"+id+"' >";
				rowsHTML+="<input type='button' class='delete_icon' form='form12_"+id+"' id='delete_form12_"+id+"' onclick='$(this).parent().parent().remove();'>";
				rowsHTML+="<input type='hidden' form='form12_"+id+"'>";
				rowsHTML+="<input type='hidden' form='form12_"+id+"'>";
				rowsHTML+="<input type='submit' class='submit_hidden' form='form12_"+id+"'>";
			rowsHTML+="</td>";
		rowsHTML+="</tr>";

		$('#form12_body').prepend(rowsHTML);

		var fields=document.getElementById("form12_"+id);
		var name_filter=fields.elements[0];
		var batch_filter=fields.elements[1];
		var quantity_filter=fields.elements[2];
		var price_filter=fields.elements[3];
		var total_filter=fields.elements[4];
		var amount_filter=fields.elements[5];
		var discount_filter=fields.elements[6];
		var tax_filter=fields.elements[7];
		var offer_filter=fields.elements[8];
		var id_filter=fields.elements[9];
		var save_button=fields.elements[10];
		var free_product_filter=fields.elements[12];
		var free_product_quantity=fields.elements[13];

		$(save_button).on("click", function(event)
		{
			event.preventDefault();
			form12_create_item(fields);
		});

		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form12_add_item();
		});

		var add_product=document.getElementById('form12_add_product_'+id);
		$(add_product).on('click',function()
		{
			modal14_action(function()
			{
				var product_data="<product_master>" +
						"<name></name>" +
						"</product_master>";
				set_my_value_list(product_data,name_filter,function ()
				{
					$(name_filter).focus();
				});
			});
		});

		var product_data="<product_master>" +
				"<name></name>" +
				"</product_master>";
		set_my_value_list(product_data,name_filter,function ()
		{
			$(name_filter).focus();
		});

		var add_batch=document.getElementById('form12_add_batch_'+id);
		$(add_batch).on('click',function()
		{
			modal22_action(function()
			{
				var batch_data="<product_instances>" +
						"<batch></batch>" +
						"<product_name exact='yes'>"+name_filter.value+"</product_name>" +
						"</product_instances>";
				set_my_value_list(batch_data,batch_filter);
			});
		});

		$(name_filter).on('blur',function(event)
		{
			var batch_data="<product_instances>" +
					"<batch></batch>" +
					"<product_name exact='yes'>"+name_filter.value+"</product_name>" +
					"</product_instances>";
			set_my_value_list(batch_data,batch_filter);

			var last_batch_data="<bill_items count='1'>" +
					"<batch></batch>" +
					"<item_name exact='yes'>"+name_filter.value+"</item_name>" +
					"</bill_items>";
			get_single_column_data(function(data)
			{
				if(data.length>0)
				{
					batch_filter.value=data[0];

					var price_data="<product_instances count='1'>" +
							"<sale_price></sale_price>" +
							"<batch exact='yes'>"+batch_filter.value+"</batch>" +
							"<product_name exact='yes'>"+name_filter.value+"</product_name>" +
							"</product_instances>";
					set_my_value(price_data,price_filter);

					get_inventory(name_filter.value,batch_filter.value,function(quantity)
					{
						//$(quantity_filter).attr('max',quantity);
						$(quantity_filter).attr('min',"0");
						$(quantity_filter).attr('placeholder',quantity);
					});
				}

			},last_batch_data);

			quantity_filter.value="";
			total_filter.value=0;
			amount_filter.value=0;
			discount_filter.value=0;
			tax_filter.value=0;
			offer_filter.value="";
			free_product_filter.value="";
			free_product_quantity.value="";
		});

		$(batch_filter).on('blur',function(event){
			var price_data="<product_instances count='1'>" +
					"<sale_price></sale_price>" +
					"<batch exact='yes'>"+batch_filter.value+"</batch>" +
					"<product_name exact='yes'>"+name_filter.value+"</product_name>" +
					"</product_instances>";
			set_my_value(price_data,price_filter);

			get_inventory(name_filter.value,batch_filter.value,function(quantity)
			{
				//$(quantity_filter).attr('max',quantity);
				$(quantity_filter).attr('min',"0");
				$(quantity_filter).attr('placeholder',quantity);
			});

			quantity_filter.value="";
			total_filter.value=0;
			amount_filter.value=0;
			discount_filter.value=0;
			tax_filter.value=0;
			offer_filter.value="";
			free_product_filter.value="";
			free_product_quantity.value="";
		});

		$(quantity_filter).on('blur',function(event)
		{
			var amount=parseFloat(quantity_filter.value)*parseFloat(price_filter.value);
			amount_filter.value=amount;
			var offer_data="<offers>" +
					"<offer_type>product</offer_type>" +
					"<product_name exact='yes'>"+name_filter.value+"</product_name>" +
					"<batch array='yes'>"+batch_filter.value+"--all</batch>" +
					"<criteria_type></criteria_type>" +
					"<criteria_amount></criteria_amount>" +
					"<criteria_quantity></criteria_quantity>" +
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
					else if(a.criteria_quantity<b.criteria_quantity)
					{	return 1;}
					else
					{	return -1;}
				});

				for(var i in offers)
				{
					offer_filter.value=offers[i].offer_detail;
					if(offers[i].criteria_type=='min quantity crossed' && parseFloat(offers[i].criteria_quantity)<=parseFloat(quantity_filter.value))
					{
						if(offers[i].result_type=='discount')
						{
							if(offers[i].discount_percent!="" && offers[i].discount_percent!=0 && offers[i].discount_percent!="0")
							{
								discount_filter.value=parseFloat((amount*parseInt(offers[i].discount_percent))/100);
							}
							else
							{
								discount_filter.value=parseFloat(offers[i].discount_amount)*(Math.floor(parseFloat(quantity_filter.value)/parseFloat(offers[i].criteria_quantity)));
							}
						}
						else if(offers[i].result_type=='quantity addition')
						{
							if(offers[i].quantity_add_percent!="" && offers[i].quantity_add_percent!=0 && offers[i].quantity_add_percent!="0")
							{
								quantity_filter.value=parseFloat(quantity_filter.value)*(1+(parseFloat(offers[i].quantity_add_percent)/100));
							}
							else
							{
								quantity_filter.value=parseFloat(quantity_filter.value)+(parseFloat(offers[i].quantity_add_amount)*(Math.floor(parseFloat(quantity_filter.value)/parseFloat(offers[i].criteria_quantity))));
							}
						}
						else if(offers[i].result_type=='product free')
						{
							free_product_filter.value=offers[i].free_product_name;
							free_product_quantity.value=parseFloat(offers[i].free_product_quantity)*(Math.floor(parseFloat(quantity_filter.value)/parseFloat(offers[i].criteria_quantity)));
						}
						break;
					}
					else if(offers[i].criteria_type=='min amount crossed' && offers[i].criteria_amount<=amount)
					{
						if(offers[i].result_type=='discount')
						{
							if(offers[i].discount_percent!="" && offers[i].discount_percent!=0 && offers[i].discount_percent!="0")
							{
								discount_filter.value=parseFloat((amount*parseInt(offers[i].discount_percent))/100);
							}
							else
							{
								discount_filter.value=parseFloat(offers[i].discount_amount)*(Math.floor(parseFloat(amount_filter.value)/parseFloat(offers[i].criteria_amount)));
							}
						}
						else if(offers[i].result_type=='quantity addition')
						{
							if(offers[i].quantity_add_percent!="" && offers[i].quantity_add_percent!=0 && offers[i].quantity_add_percent!="0")
							{
								quantity_filter.value=parseFloat(quantity_filter.value)*(1+(parseFloat(offers[i].quantity_add_percent)/100));
							}
							else
							{
								quantity_filter.value=parseFloat(quantity_filter.value)+(parseFloat(offers[i].quantity_add_amount)*(Math.floor(parseFloat(amount_filter.value)/parseFloat(offers[i].criteria_amount))));
							}
						}
						else if(offers[i].result_type=='product free')
						{
							free_product_filter.value=offers[i].free_product_name;
							free_product_quantity.value=parseFloat(offers[i].free_product_quantity)*(Math.floor(parseFloat(amount_filter.value)/parseFloat(offers[i].criteria_amount)));
						}
						break;
					}
				}

				var tax_data="<product_master>" +
						"<name exact='yes'>"+name_filter.value+"</name>" +
						"<tax></tax>" +
						"</product_master>";
				fetch_requested_data('',tax_data,function(taxes)
				{
					taxes.forEach(function(tax)
					{
						tax_filter.value=parseFloat((parseFloat(tax.tax)*(amount-parseFloat(discount_filter.value)))/100);
					});

					total_filter.value=parseFloat(amount_filter.value)+parseFloat(tax_filter.value)-parseFloat(discount_filter.value);
				});

			});
		});
	}
	else
	{
		$("#modal2_link").click();
	}
}


/**
 * @form New Purchase Order
 * @formNo 24
 */
function form24_add_item()
{
	if(is_create_access('form24'))
	{
		var rowsHTML="";
		var id=vUtil.newKey();
		rowsHTML+="<tr>";
		rowsHTML+="<form id='form24_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Item Name'>";
				rowsHTML+="<input type='text' required form='form24_"+id+"' value=''>";
				rowsHTML+="<img src='./images/add_image.png' class='add_image' title='Add new product' id='form24_add_product_"+id+"'>";
				rowsHTML+="<br><textarea readonly='readonly' form='form24_"+id+"'></textarea>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Quantity'>";
				rowsHTML+="<input type='number' required form='form24_"+id+"' value='' step='any'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Make'>";
				rowsHTML+="Make: <input type='text' form='form24_"+id+"' readonly='readonly'>";
				rowsHTML+="<br>Supplier SKU: <input type='text' readonly='readonly' class='dblclick_editable' form='form24_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Price'>";
				rowsHTML+="MRP: <input type='number' required form='form24_"+id+"' value='' class='dblclick_editable' step='any' readonly='readonly'>";
				rowsHTML+="<br>Price: <input type='number' required form='form24_"+id+"' value='' step='any' readonly='readonly' class='dblclick_editable'>";
				rowsHTML+="<br>Amount: <input type='number' required readonly='readonly' form='form24_"+id+"' step='any'>";
				rowsHTML+="<br>Tax Rate: <input type='number' readonly='readonly' step='any' form='form24_"+id+"' name='tax_rate'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form24_"+id+"' name='tax'>";
				rowsHTML+="<input type='hidden' form='form24_"+id+"' name='total'>";
				rowsHTML+="<input type='hidden' form='form24_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='button' class='submit_hidden' form='form24_"+id+"' id='save_form24_"+id+"' >";
				rowsHTML+="<input type='button' class='delete_icon' form='form24_"+id+"' id='delete_form24_"+id+"' onclick='$(this).parent().parent().remove(); form24_get_totals();'>";
				rowsHTML+="<input type='submit' class='submit_hidden' form='form24_"+id+"'>";
			rowsHTML+="</td>";
		rowsHTML+="</tr>";

		$('#form24_body').prepend(rowsHTML);

		var master_form=document.getElementById("form24_master");
		var supplier_name_filter=master_form.elements['supplier'];
		var supplier_name=supplier_name_filter.value;
		var cst_checked=false;
		if(master_form.elements['cst'].checked)
			cst_checked=true;
		var fields=document.getElementById("form24_"+id);
		var name_filter=fields.elements[0];
		var desc_filter=fields.elements[1];
		var quantity_filter=fields.elements[2];
		var make_filter=fields.elements[3];
		var supplier_sku_filter=fields.elements[4];
		var mrp_filter=fields.elements[5];
		var price_filter=fields.elements[6];
		var amount_filter=fields.elements[7];
		var tax_rate_filter=fields.elements[8];
		var tax_filter=fields.elements[9];
		var total_filter=fields.elements[10];
		var id_filter=fields.elements[11];
		var save_button=fields.elements[12];

		$(save_button).on("click", function(event)
		{
			event.preventDefault();
			form24_create_item(fields);
		});

		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form24_add_item();
		});

		var product_data="<product_master>" +
				"<name></name>" +
				"</product_master>";
		set_my_value_list(product_data,name_filter,function ()
		{
			$(name_filter).focus();
		});

		var add_product=document.getElementById('form24_add_product_'+id);
		$(add_product).on('click',function()
		{
			modal114_action(function()
			{
				var product_data="<product_master>" +
						"<name></name>" +
						"</product_master>";
				set_my_value_list(product_data,name_filter,function ()
				{
					$(name_filter).focus();
				});
			});
		});

		$(name_filter).add(supplier_name_filter).on('blur',function(event)
		{
			var make_data="<product_master count='1'>" +
					"<make></make>" +
					"<tax></tax>"+
					"<description></description>"+
					"<name exact='yes'>"+name_filter.value+"</name>" +
					"</product_master>";
			fetch_requested_data('',make_data,function (makes)
			{
				if(makes.length>0)
				{
					make_filter.value=makes[0].make;
					desc_filter.value=makes[0].description;

					if(cst_checked)
					{
						tax_rate_filter.value=get_session_var('cst_rate');
					}
					else
					{
						tax_rate_filter.value=makes[0].tax;
					}
				}
			});

			var mrp_data="<product_instances>"+
						"<mrp></mrp>"+
						"<product_name exact='yes'>"+name_filter.value+"</product_name>"+
						"</product_instances>";
			get_single_column_data(function(mrps)
			{
				if(mrps.length>0)
				{
					mrp_filter.value=mrps[0];
				}
				else
				{
					mrp_filter.value="";
				}
				var margin_data="<supplier_item_mapping>" +
							"<margin></margin>"+
							"<supplier_sku></supplier_sku>"+
							"<supplier exact='yes'>"+supplier_name_filter.value+"</supplier>" +
							"<item exact='yes'>"+name_filter.value+"</item>"+
							"</supplier_item_mapping>";
				fetch_requested_data('',margin_data,function(margins)
				{
					if(margins.length>0)
					{
						supplier_sku_filter.value=margins[0].supplier_sku;
						price_filter.value=vUtil.round((parseFloat(mrp_filter.value)*(100-parseFloat(margins[0].margin))/100),2);
						amount_filter.value=Math.round(parseFloat(quantity_filter.value)*parseFloat(price_filter.value));
						tax_filter.value=Math.round(parseFloat(amount_filter.value)*(parseFloat(tax_rate_filter.value)/100));
						total_filter.value=Math.round(parseFloat(amount_filter.value)+parseFloat(tax_filter.value));
					}
					else
					{
						supplier_sku_filter.value="";
						price_filter.value="";
						amount_filter.value="";
						tax_filter.value="";
						total_filter.value="";
					}
				});
			},mrp_data);
		});

		$(quantity_filter).add(price_filter).on('blur',function(event)
		{
			amount_filter.value=Math.round(parseFloat(quantity_filter.value)*parseFloat(price_filter.value));
			tax_filter.value=Math.round(parseFloat(amount_filter.value)*(parseFloat(tax_rate_filter.value)/100));
			total_filter.value=Math.round(parseFloat(amount_filter.value)+parseFloat(tax_filter.value));
		});

		form24_get_totals();
		longPressEditable($('.dblclick_editable'));
		$('textarea').autosize();
	}
	else
	{
		$("#modal2_link").click();
	}
}


/**
 * @form Service pre-requisites
 * @formNo 58
 */
function form58_add_item()
{
	if(is_create_access('form58'))
	{
		var rowsHTML="";
		var id=vUtil.newKey();
		rowsHTML+="<tr>";
		rowsHTML+="<form id='form58_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Name'>";
				rowsHTML+="<input type='text' form='form58_"+id+"' value=''>";
				rowsHTML+="<img src='./images/add_image.png' class='add_image' title='Add new service' id='form58_add_service_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Requisite Type'>";
				rowsHTML+="<input type='text' form='form58_"+id+"' value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Requisite Name'>";
				rowsHTML+="<input type='text' form='form58_"+id+"' value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Quantity'>";
				rowsHTML+="<input type='number' form='form58_"+id+"' value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form58_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='submit' class='save_icon' form='form58_"+id+"' >";
				rowsHTML+="<input type='button' class='delete_icon' form='form58_"+id+"' onclick='$(this).parent().parent().remove();'>";
			rowsHTML+="</td>";
		rowsHTML+="</tr>";

		$('#form58_body').prepend(rowsHTML);
		var fields=document.getElementById("form58_"+id);
		var service_filter=fields.elements[0];
		var type_filter=fields.elements[1];
		var requisite_filter=fields.elements[2];

		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form58_create_item(fields);
		});

		var service_data="<services>" +
				"<name></name>" +
				"</services>";
		set_my_value_list(service_data,service_filter,function ()
		{
			$(service_filter).focus();
		});

		var add_service=document.getElementById('form58_add_service_'+id);
		$(add_service).on('click',function()
		{
			modal20_action(function()
			{
				var service_data="<services>" +
					"<name></name>" +
					"</services>";
				set_my_value_list(service_data,service_filter,function ()
				{
					$(service_filter).focus();
				});
			});
		});

		set_static_value_list('pre_requisites','requisite_type',type_filter);

		$(type_filter).on('blur',function(event)
		{
			var requisite_data="<product_master>" +
				"<name></name>" +
				"</product_master>";

			if(type_filter.value=='service')
			{
				var requisite_data="<services>" +
					"<name></name>" +
					"</services>";
			}
			else if(type_filter.value=='task')
			{
				var requisite_data="<task_type>" +
					"<name></name>" +
					"</task_type>";
			}
			else if(type_filter.value=='asset')
			{
				var requisite_data="<assets>" +
					"<name></name>" +
					"</assets>";
			}
			set_my_value_list(requisite_data,requisite_filter);
		});
	}
	else
	{
		$("#modal2_link").click();
	}
}


/**
 * @form Manage product pre-requisites
 * @formNo 59
 */
function form59_add_item()
{
	if(is_create_access('form59'))
	{
		var rowsHTML="";
		var id=vUtil.newKey();
		rowsHTML+="<tr>";
		rowsHTML+="<form id='form59_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Name'>";
				rowsHTML+="<input type='text' form='form59_"+id+"' value=''>";
				rowsHTML+="<img src='./images/add_image.png' class='add_image' title='Add new product' id='form59_add_product_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Requisite Type'>";
				rowsHTML+="<input type='text' form='form59_"+id+"' value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Required Material'>";
				rowsHTML+="<input type='text' form='form59_"+id+"' value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Quantity'>";
				rowsHTML+="<input type='number' form='form59_"+id+"' value='' step='any'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form59_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='submit' class='save_icon' form='form59_"+id+"' >";
				rowsHTML+="<input type='button' class='delete_icon' form='form59_"+id+"' onclick='$(this).parent().parent().remove();'>";
			rowsHTML+="</td>";
		rowsHTML+="</tr>";

		$('#form59_body').prepend(rowsHTML);
		var fields=document.getElementById("form59_"+id);
		var product_filter=fields.elements[0];
		var type_filter=fields.elements[1];
		var requisite_filter=fields.elements[2];

		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form59_create_item(fields);
		});

		var product_data="<product_master>" +
				"<name></name>" +
				"</product_master>";
		set_my_value_list(product_data,product_filter,function ()
		{
			$(product_filter).focus();
		});

		var add_product=document.getElementById('form59_add_product_'+id);
		$(add_product).on('click',function()
		{
			modal14_action(function()
			{
				var product_data="<product_master>" +
						"<name></name>" +
						"</product_master>";
				set_my_value_list(product_data,product_filter,function ()
				{
					$(product_filter).focus();
				});
			});
		});

		set_static_value_list('pre_requisites','requisite_type',type_filter);

		$(type_filter).on('blur',function(event)
		{
			var requisite_data="<product_master>" +
				"<name></name>" +
				"</product_master>";

			if(type_filter.value=='service')
			{
				var requisite_data="<services>" +
					"<name></name>" +
					"</services>";
			}
			else if(type_filter.value=='task')
			{
				var requisite_data="<task_type>" +
					"<name></name>" +
					"</task_type>";
			}
			set_my_value_list(requisite_data,requisite_filter);
		});
	}
	else
	{
		$("#modal2_link").click();
	}
}


/**
 * @form Service Attributes
 * @formNo 61
 */
function form61_add_item()
{
	if(is_create_access('form61'))
	{
		var rowsHTML="";
		var id=vUtil.newKey();
		rowsHTML+="<tr>";
		rowsHTML+="<form id='form61_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Name'>";
				rowsHTML+="<input type='text' form='form61_"+id+"' required>";
				rowsHTML+="<img src='./images/add_image.png' class='add_image' title='Add new service' id='form61_add_service_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Attribute'>";
				rowsHTML+="<input type='text' form='form61_"+id+"' required>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Value'>";
				rowsHTML+="<input type='text' form='form61_"+id+"' required>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form61_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='submit' class='save_icon' form='form61_"+id+"' >";
				rowsHTML+="<input type='button' class='delete_icon' form='form61_"+id+"' onclick='$(this).parent().parent().remove();'>";
			rowsHTML+="</td>";
		rowsHTML+="</tr>";

		$('#form61_body').prepend(rowsHTML);
		var fields=document.getElementById("form61_"+id);
		var service_filter=fields.elements[0];
		var attribute_filter=fields.elements[1];

		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form61_create_item(fields);
		});

		var service_data="<services>" +
				"<name></name>" +
				"</services>";
		set_my_value_list(service_data,service_filter,function ()
		{
			$(service_filter).focus();
		});

		var add_service=document.getElementById('form61_add_service_'+id);
		$(add_service).on('click',function()
		{
			modal20_action(function()
			{
				var service_data="<services>" +
						"<name></name>" +
						"</services>";
				set_my_value_list(service_data,service_filter,function ()
				{
					$(service_filter).focus();
				});
			});
		});

		var attribute_data="<attributes>" +
				"<attribute></attribute>" +
				"<type exact='yes'>service</type>" +
				"</attributes>";
		set_my_filter(attribute_data,attribute_filter);
	}
	else
	{
		$("#modal2_link").click();
	}
}


/**
 * @form Product reviews
 * @formNo 62
 */
function form62_add_item()
{
	if(is_create_access('form62'))
	{
		var rowsHTML="";
		var id=vUtil.newKey();
		rowsHTML+="<tr>";
		rowsHTML+="<form id='form62_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Name'>";
				rowsHTML+="<input type='text' form='form62_"+id+"' value=''>";
				rowsHTML+="<img src='./images/add_image.png' class='add_image' title='Add new product' id='form62_add_product_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Reviewer'>";
				rowsHTML+="<input type='text' form='form62_"+id+"' value=''>";
				rowsHTML+="<img src='./images/add_image.png' class='add_image' title='Add new customer' id='form62_add_customer_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Detail'>";
				rowsHTML+="<textarea form='form62_"+id+"'></textarea>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Rating'>";
				rowsHTML+="<input type='number' form='form62_"+id+"' min='1' max='5' value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form62_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='submit' class='save_icon' form='form62_"+id+"' >";
				rowsHTML+="<input type='button' class='delete_icon' form='form62_"+id+"' onclick='$(this).parent().parent().remove();'>";
			rowsHTML+="</td>";
		rowsHTML+="</tr>";

		$('#form62_body').prepend(rowsHTML);
		var fields=document.getElementById("form62_"+id);
		var product_filter=fields.elements[0];
		var reviewer_filter=fields.elements[1];
		var rating_filter=fields.elements[1];

		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form62_create_item(fields);
		});

		var product_data="<product_master>" +
				"<name></name>" +
				"</product_master>";
		set_my_value_list(product_data,product_filter,function ()
		{
			$(product_filter).focus();
		});

		var reviewer_data="<customers>" +
				"<acc_name></acc_name>" +
				"</customers>";
		set_my_filter(reviewer_data,reviewer_filter);

		var add_product=document.getElementById('form62_add_product_'+id);
		$(add_product).on('click',function()
		{
			modal14_action(function()
			{
				var product_data="<product_master>" +
						"<name></name>" +
						"</product_master>";
				set_my_value_list(product_data,product_filter,function ()
				{
					$(product_filter).focus();
				});
			});
		});

		var add_customer=document.getElementById('form62_add_customer_'+id);
		$(add_customer).on('click',function()
		{
			modal11_action(function()
			{
				var reviewer_data="<customers>" +
					"<acc_name></acc_name>" +
					"</customers>";
				set_my_filter(reviewer_data,reviewer_filter);
			});
		});
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form Service reviews
 * @formNo 63
 */
function form63_add_item()
{
	if(is_create_access('form63'))
	{
		var rowsHTML="";
		var id=vUtil.newKey();
		rowsHTML+="<tr>";
		rowsHTML+="<form id='form63_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Name'>";
				rowsHTML+="<input type='text' form='form63_"+id+"' value=''>";
				rowsHTML+="<img src='./images/add_image.png' class='add_image' title='Add new service' id='form63_add_product_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Reviewer'>";
				rowsHTML+="<input type='text' form='form63_"+id+"' value=''>";
				rowsHTML+="<img src='./images/add_image.png' class='add_image' title='Add new customer' id='form63_add_customer_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Detail'>";
				rowsHTML+="<textarea form='form63_"+id+"'></textarea>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Rating'>";
				rowsHTML+="<input type='number' form='form63_"+id+"' min='1' max='5' value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form63_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='submit' class='save_icon' form='form63_"+id+"' >";
				rowsHTML+="<input type='button' class='delete_icon' form='form63_"+id+"' onclick='$(this).parent().parent().remove();'>";
			rowsHTML+="</td>";
		rowsHTML+="</tr>";

		$('#form63_body').prepend(rowsHTML);
		var fields=document.getElementById("form63_"+id);
		var service_filter=fields.elements[0];
		var reviewer_filter=fields.elements[1];
		var rating_filter=fields.elements[1];

		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form63_create_item(fields);
		});

		var service_data="<services>" +
				"<name></name>" +
				"</services>";
		set_my_value_list(service_data,service_filter,function ()
		{
			$(service_filter).focus();
		});

		var reviewer_data="<customers>" +
				"<acc_name></acc_name>" +
				"</customers>";
		set_my_filter(reviewer_data,reviewer_filter);

		var add_service=document.getElementById('form63_add_service_'+id);
		$(add_service).on('click',function()
		{
			modal20_action(function()
			{
				var service_data="<services>" +
						"<name></name>" +
						"</services>";
				set_my_value_list(service_data,service_filter,function ()
				{
					$(service_filter).focus();
				});
			});
		});

		var add_customer=document.getElementById('form63_add_customer_'+id);
		$(add_customer).on('click',function()
		{
			modal11_action(function()
			{
				var reviewer_data="<customers>" +
					"<acc_name></acc_name>" +
					"</customers>";
				set_my_filter(reviewer_data,reviewer_filter);
			});
		});
	}
	else
	{
		$("#modal2_link").click();
	}
}


/**
 * @form Service Cross sells
 * @formNo 64
 */
function form64_add_item()
{
	if(is_create_access('form64'))
	{
		var rowsHTML="";
		var id=vUtil.newKey();
		rowsHTML+="<tr>";
		rowsHTML+="<form id='form64_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Name'>";
				rowsHTML+="<input type='text' form='form64_"+id+"' value=''>";
				rowsHTML+="<img src='./images/add_image.png' class='add_image' title='Add new service' id='form64_add_service_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Type'>";
				rowsHTML+="<input type='text' form='form64_"+id+"' value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Cross-sold Item'>";
				rowsHTML+="<input type='text' form='form64_"+id+"' value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form64_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='submit' class='save_icon' form='form64_"+id+"' >";
				rowsHTML+="<input type='button' class='delete_icon' form='form64_"+id+"' onclick='$(this).parent().parent().remove();'>";
			rowsHTML+="</td>";
		rowsHTML+="</tr>";

		$('#form64_body').prepend(rowsHTML);
		var fields=document.getElementById("form64_"+id);
		var service_filter=fields.elements[0];
		var type_filter=fields.elements[1];
		var cross_filter=fields.elements[2];

		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form64_create_item(fields);
		});

		var service_data="<services>" +
				"<name></name>" +
				"</services>";
		set_my_value_list(service_data,service_filter,function ()
		{
			$(service_filter).focus();
		});

		var add_service=document.getElementById('form64_add_service_'+id);
		$(add_service).on('click',function()
		{
			modal20_action(function()
			{
				var service_data="<services>" +
						"<name></name>" +
						"</services>";
				set_my_value_list(service_data,service_filter,function ()
				{
					$(service_filter).focus();
				});
			});
		});

		set_static_value_list('cross_sells','type',type_filter);

		$(type_filter).on('blur',function(event)
		{
			var cross_data="<product_master>" +
				"<name></name>" +
				"</product_master>";

			if(type_filter.value=='service')
			{
				cross_data="<services>" +
					"<name></name>" +
					"</services>";
			}
			set_my_value_list(cross_data,cross_filter);
		});
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form Product Cross sells
 * @formNo 66
 */
function form66_add_item()
{
	if(is_create_access('form66'))
	{
		var rowsHTML="";
		var id=vUtil.newKey();
		rowsHTML+="<tr>";
		rowsHTML+="<form id='form66_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Name'>";
				rowsHTML+="<input type='text' form='form66_"+id+"' value=''>";
				rowsHTML+="<img src='./images/add_image.png' class='add_image' title='Add new product' id='form66_add_product_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Type'>";
				rowsHTML+="<input type='text' form='form66_"+id+"' value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Cross-sold Item'>";
				rowsHTML+="<input type='text' form='form66_"+id+"' value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form66_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='submit' class='save_icon' form='form66_"+id+"' >";
				rowsHTML+="<input type='button' class='delete_icon' form='form66_"+id+"' onclick='$(this).parent().parent().remove();'>";
			rowsHTML+="</td>";
		rowsHTML+="</tr>";

		$('#form66_body').prepend(rowsHTML);
		var fields=document.getElementById("form66_"+id);
		var product_filter=fields.elements[0];
		var type_filter=fields.elements[1];
		var cross_filter=fields.elements[2];

		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form66_create_item(fields);
		});

		var product_data="<product_master>" +
				"<name></name>" +
				"</product_master>";
		set_my_value_list(product_data,product_filter,function ()
		{
			$(product_filter).focus();
		});

		var add_product=document.getElementById('form66_add_product_'+id);
		$(add_product).on('click',function()
		{
			modal14_action(function()
			{
				var product_data="<product_master>" +
						"<name></name>" +
						"</product_master>";
				set_my_value_list(product_data,product_filter,function ()
				{
					$(product_filter).focus();
				});
			});
		});

		set_static_value_list('cross_sells','type',type_filter);

		$(type_filter).on('blur',function(event)
		{
			var cross_data="<product_master>" +
				"<name></name>" +
				"</product_master>";

			if(type_filter.value=='service')
			{
				cross_data="<services>" +
					"<name></name>" +
					"</services>";
			}
			set_my_value_list(cross_data,cross_filter);
		});
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form New Sale Order
 * @formNo 69
 */
function form69_add_item()
{
	if(is_create_access('form69'))
	{

		var master_form=document.getElementById('form69_master');
		var channel_name=master_form.elements['channel'].value;
		var bill_type=master_form.elements['bill_type'].value;

		var id=vUtil.newKey();
		var rowsHTML="<tr>";
		rowsHTML+="<form id='form69_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Item'>";
				rowsHTML+="<input type='hidden' required form='form69_"+id+"' value=''>";
				rowsHTML+="<input type='hidden' required form='form69_"+id+"' value=''>";
				rowsHTML+="<input type='text' required form='form69_"+id+"' value=''>";
				rowsHTML+="<br>Name: <textarea required form='form69_"+id+"'></textarea>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Quantity'>";
				rowsHTML+="<input type='number' required form='form69_"+id+"' value='' step='any'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Notes'>";
				rowsHTML+="<b>SP</b>: Rs. <input type='number' class='dblclick_editable' form='form69_"+id+"' step='.01'>";
				rowsHTML+="<br><b>Freight</b>: Rs. <input type='number' class='dblclick_editable' form='form69_"+id+"' step='.01' value='0'>";
				rowsHTML+="<br><b>MRP</b>: Rs. <input type='number' readonly='readonly' class='dblclick_editable' form='form69_"+id+"' step='.01'>";
				rowsHTML+="<br><b>Amount</b>: Rs. <input type='number' readonly='readonly' form='form69_"+id+"' step='.01'>";
				rowsHTML+="<br><b>Tax</b>: Rs. <input type='number' readonly='readonly' form='form69_"+id+"' step='.01'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form69_"+id+"' name='total'>";
				rowsHTML+="<input type='hidden' form='form69_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='button' class='submit_hidden' form='form69_"+id+"' id='save_form69_"+id+"' >";
				rowsHTML+="<input type='button' class='delete_icon' form='form69_"+id+"' id='delete_form69_"+id+"' onclick='$(this).parent().parent().remove();'>";
				rowsHTML+="<input type='submit' class='submit_hidden' form='form69_"+id+"'>";
				rowsHTML+="<input type='hidden' form='form69_"+id+"' name='tax_rate'>";
				rowsHTML+="<input type='hidden' form='form69_"+id+"' name='freight_unit'>";
				rowsHTML+="<input type='hidden' form='form69_"+id+"' name='unit_price'>";
			rowsHTML+="</td>";
		rowsHTML+="</tr>";

		$('#form69_body').prepend(rowsHTML);

		var fields=document.getElementById("form69_"+id);
		var name_filter=fields.elements[2];
		var desc_filter=fields.elements[3];
		var quantity_filter=fields.elements[4];
		var sp_filter=fields.elements[5];
		var freight_filter=fields.elements[6];
		var mrp_filter=fields.elements[7];
		var amount_filter=fields.elements[8];
		var tax_filter=fields.elements[9];
		var total_filter=fields.elements[10];
		var id_filter=fields.elements[11];
		var save_button=fields.elements[12];
		var tax_unit_filter=fields.elements[15];
		var freight_unit_filter=fields.elements[16];
		var unit_price_filter=fields.elements[17];

		$(save_button).on("click", function(event)
		{
			event.preventDefault();
			form69_create_item(fields);
		});

		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form69_add_item();
		});

		var product_data="<product_master>" +
				"<name></name>" +
				"</product_master>";
		set_my_value_list(product_data,name_filter,function ()
		{
			$(name_filter).focus();
		});

		$(name_filter).on('blur',function(event)
		{
			if(name_filter.value!="")
			{
				var desc_data="<product_master>" +
							"<description></description>" +
							"<tax></tax>" +
							"<name exact='yes'>"+name_filter.value+"</name>" +
							"</product_master>";
				fetch_requested_data('',desc_data,function(descs)
				{
					if(descs.length>0)
					{
						desc_filter.value=descs[0].description;
						if(bill_type=='Retail-CST-C')
						{
							tax_unit_filter.value=get_session_var('cst_rate');
						}
						else
						{
							tax_unit_filter.value=descs[0].tax;
						}
					}


					var price_data="<channel_prices count='1'>"+
									"<sale_price></sale_price>"+
									"<freight></freight>"+
									"<mrp></mrp>"+
									"<channel exact='yes'>"+channel_name+"</channel>"+
									"<from_time upperbound='yes'>"+get_my_time()+"</from_time>"+
									"<item exact='yes'>"+name_filter.value+"</item>"+
									"</channel_prices>";
					fetch_requested_data('',price_data,function (prices)
					{
						if(prices.length>0)
						{
							mrp_filter.value=prices[0].mrp;
							sp_filter.value=prices[0].sale_price;
							freight_unit_filter.value=prices[0].freight;
							unit_price_filter.value=vUtil.round(parseFloat(sp_filter.value)/(1+parseFloat(tax_unit_filter.value)/100),2);
						}
					});
				});
			}
		});

		$(sp_filter).on('change blur',function(event)
		{
			unit_price_filter.value=vUtil.round(parseFloat(sp_filter.value)/(1+parseFloat(tax_unit_filter.value)/100),2);
			$(unit_price_filter).trigger('change');
		});

		$(quantity_filter).add(unit_price_filter).on('change',function(event)
		{
			amount_filter.value=vUtil.round(parseFloat(quantity_filter.value)*parseFloat(unit_price_filter.value),2);
			freight_filter.value=vUtil.round((parseFloat(freight_unit_filter.value)*parseFloat(quantity_filter.value)),2);

			tax_filter.value=vUtil.round(((parseFloat(tax_unit_filter.value)*(parseFloat(amount_filter.value)))/100),2);
			if(isNaN(parseFloat(tax_filter.value)))
				tax_filter.value=0;
			if(isNaN(parseFloat(freight_filter.value)))
				freight_filter.value=0;
			total_filter.value=Math.round(parseFloat(amount_filter.value)+parseFloat(tax_filter.value)+parseFloat(freight_filter.value));

		});

		$(freight_filter).on('change blur',function(event)
		{
			total_filter.value=Math.round(parseFloat(amount_filter.value)+parseFloat(tax_filter.value)+parseFloat(freight_filter.value));
		});

		$('textarea').autosize();
		longPressEditable($('.dblclick_editable'));

		form69_get_totals();
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form Sale Leads
 * @formNo 81
 */
function form81_add_item()
{
	if(is_create_access('form81'))
	{
		var rowsHTML="";
		var id=vUtil.newKey();
		rowsHTML+="<tr>";
		rowsHTML+="<form id='form81_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Customer'>";
				rowsHTML+="<input type='text' form='form81_"+id+"' required value=''>";
				rowsHTML+="<img src='./images/add_image.png' class='add_image' title='Add new customer' id='form81_add_customer_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Details'>";
				rowsHTML+="<textarea form='form81_"+id+"' class='dblclick_editable'></textarea>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Due Date'>";
				rowsHTML+="<input type='text' class='dblclick_editable' form='form81_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Identified By'>";
				rowsHTML+="<input type='text' form='form81_"+id+"'>";
				rowsHTML+="<img src='./images/add_image.png' class='add_image' title='Add new staff' id='form81_add_staff_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form81_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='submit' class='save_icon' form='form81_"+id+"'>";
				rowsHTML+="<input type='button' class='delete_icon' form='form81_"+id+"' onclick='$(this).parent().parent().remove();'>";
			rowsHTML+="</td>";
		rowsHTML+="</tr>";

		$('#form81_body').prepend(rowsHTML);
		longPressEditable($('.dblclick_editable'));

		var fields=document.getElementById("form81_"+id);
		var customer_filter=fields.elements[0];
		var detail_filter=fields.elements[1];
		var due_filter=fields.elements[2];
		var by_filter=fields.elements[3];

		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form81_create_item(fields);
		});

		var customer_data="<customers>" +
			"<acc_name></acc_name>" +
			"</customers>";
		set_my_value_list(customer_data,customer_filter,function ()
		{
			$(customer_filter).focus();
		});

		$(due_filter).datepicker();
		due_filter.value=get_my_past_date(parseFloat(get_my_time())+86400000);

		var staff_data="<staff>" +
				"<acc_name></acc_name>" +
				"</staff>";
		set_my_value_list(staff_data,by_filter);

		var add_customer=document.getElementById('form81_add_customer_'+id);
		$(add_customer).on('click',function()
		{
			modal11_action(function()
			{
				var customer_data="<customers>" +
					"<acc_name></acc_name>" +
					"</customers>";
				set_my_value_list(customer_data,customer_filter,function ()
				{
					$(customer_filter).focus();
				});
			});
		});

		var add_staff=document.getElementById('form81_add_staff_'+id);
		$(add_staff).on('click',function()
		{
			modal16_action(function()
			{
				var staff_data="<staff>" +
						"<acc_name></acc_name>" +
						"</staff>";
				set_my_value_list(staff_data,by_filter);
			});
		});

		$('textarea').autosize();
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form Scan Items
 * @formNo 82
 */
function form82_add_item()
{
	if(is_create_access('form82'))
	{
		var rowsHTML="";
		var id=vUtil.newKey();
		rowsHTML+="<tr>";
		rowsHTML+="<form id='row_form82_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Barcode'>";
				rowsHTML+="<input type='text' required form='row_form82_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Product'>";
				rowsHTML+="<input type='text' required form='row_form82_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Batch'>";
				rowsHTML+="<input type='text' required form='row_form82_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Unit Price'>";
				rowsHTML+="<input type='number' readonly='readonly' required form='row_form82_"+id+"' step='any'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='row_form82_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='button' class='delete_icon' form='row_form82_"+id+"' id='delete_form82_"+id+"' onclick='$(this).parent().parent().remove();'>";
				rowsHTML+="<input type='submit' form='row_form82_"+id+"' value='"+id+"'>";
			rowsHTML+="</td>";
		rowsHTML+="</tr>";

		$('#form82_body').prepend(rowsHTML);

		var fields=document.getElementById("row_form82_"+id);
		var code_filter=fields.elements[0];
		var product_filter=fields.elements[1];
		var batch_filter=fields.elements[2];
		var price_filter=fields.elements[3];
		var id_filter=fields.elements[4];

		$(code_filter).focus();

		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form82_add_item();
		});

		var product_data="<product_master>" +
				"<name></name>" +
				"</product_master>";
		set_my_value_list(product_data,product_filter);

		$(code_filter).on('blur',function(event)
		{
			var product_data="<product_master count='1'>" +
					"<name></name>" +
					"<bar_code exact='yes'>"+code_filter.value+"</bar_code>" +
					"</product_master>";
			get_single_column_data(function(product_name)
			{
				product_filter.value=product_name[0];

				var batch_data="<product_instances>" +
						"<batch></batch>" +
						"<product_name exact='yes'>"+product_filter.value+"</product_name>" +
						"</product_instances>";
				set_my_value_list(batch_data,batch_filter);

				var last_batch_data="<bill_items count='1'>" +
						"<batch></batch>" +
						"<item_name exact='yes'>"+product_filter.value+"</item_name>" +
						"</bill_items>";
				get_single_column_data(function(data)
				{
					if(data.length>0)
					{
						batch_filter.value=data[0];
						var price_data="<product_instances count='1'>" +
								"<sale_price></sale_price>" +
								"<batch exact='yes'>"+batch_filter.value+"</batch>" +
								"<product_name exact='yes'>"+product_filter.value+"</product_name>" +
								"</product_instances>";
						set_my_value(price_data,price_filter);
					}
				},last_batch_data);
			},product_data);
		});

		$(product_filter).on('change',function(event)
		{
			var batch_data="<product_instances>" +
					"<batch></batch>" +
					"<product_name exact='yes'>"+product_filter.value+"</product_name>" +
					"</product_instances>";
			set_my_value_list(batch_data,batch_filter);

			var last_batch_data="<bill_items count='1'>" +
					"<batch></batch>" +
					"<item_name exact='yes'>"+product_filter.value+"</item_name>" +
					"</bill_items>";
			get_single_column_data(function(data)
			{
				if(data.length>0)
				{
					batch_filter.value=data[0];
					var price_data="<product_instances count='1'>" +
							"<sale_price></sale_price>" +
							"<batch exact='yes'>"+batch_filter.value+"</batch>" +
							"<product_name exact='yes'>"+product_filter.value+"</product_name>" +
							"</product_instances>";
					set_my_value(price_data,price_filter);
				}
			},last_batch_data);
		});

		$(batch_filter).on('blur',function(event){
			var price_data="<product_instances count='1'>" +
					"<sale_price></sale_price>" +
					"<batch exact='yes'>"+batch_filter.value+"</batch>" +
					"<product_name exact='yes'>"+product_filter.value+"</product_name>" +
					"</product_instances>";
			set_my_value(price_data,price_filter);
		});

	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form Manage Subscriptions
 * @formNo 84
 */
function form84_add_item()
{
	if(is_create_access('form84'))
	{
		var rowsHTML="";
		var id=vUtil.newKey();
		rowsHTML+="<tr>";
		rowsHTML+="<form id='form84_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Customer'>";
				rowsHTML+="<input type='text' form='form84_"+id+"' required value=''>";
				rowsHTML+="<img src='./images/add_image.png' class='add_image' title='Add new customer' id='form84_add_customer_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Service'>";
				rowsHTML+="<input type='text' form='form84_"+id+"' required>";
				rowsHTML+="<img src='./images/add_image.png' class='add_image' title='Add new service' id='form84_add_service_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Status'>";
				rowsHTML+="<input type='text' class='dblclick_editable' form='form84_"+id+"' value='active'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Notes'>";
				rowsHTML+="<textarea form='form84_"+id+"' class='dblclick_editable'></textarea>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Last Bill'>";
				rowsHTML+="<textarea readonly='readonly' form='form84_"+id+"'></textarea>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form84_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='submit' class='save_icon' form='form84_"+id+"'>";
				rowsHTML+="<input type='button' class='delete_icon' form='form84_"+id+"' onclick='$(this).parent().parent().remove();'>";
			rowsHTML+="</td>";
		rowsHTML+="</tr>";

		$('#form84_body').prepend(rowsHTML);
		longPressEditable($('.dblclick_editable'));

		var fields=document.getElementById("form84_"+id);
		var customer_filter=fields.elements[0];
		var service_filter=fields.elements[1];
		var status_filter=fields.elements[2];

		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form84_create_item(fields);
		});

		var customer_data="<customers>" +
			"<acc_name></acc_name>" +
			"</customers>";
		set_my_value_list(customer_data,customer_filter,function ()
		{
			$(customer_filter).focus();
		});

		var service_data="<services>" +
			"<name></name>" +
			"</services>";
		set_my_value_list(service_data,service_filter);

		var add_customer=document.getElementById('form84_add_customer_'+id);
		$(add_customer).on('click',function()
		{
			modal11_action(function()
			{
				var customer_data="<customers>" +
					"<acc_name></acc_name>" +
					"</customers>";
				set_my_value_list(customer_data,customer_filter,function ()
				{
					$(customer_filter).focus();
				});
			});
		});

		var add_service=document.getElementById('form84_add_service_'+id);
		$(add_service).on('click',function()
		{
			modal20_action(function()
			{
				var service_data="<services>" +
					"<name></name>" +
					"</services>";
				set_my_value_list(service_data,service_filter);
			});
		});

		set_static_value_list('service_subscriptions','status',status_filter);
	}
	else
	{
		$("#modal2_link").click();
	}
}


/**
 * @form Manufacturing Schedule
 * @formNo 88
 */
function form88_add_item()
{
	if(is_create_access('form88'))
	{
		var rowsHTML="";
		var id=vUtil.newKey();
		rowsHTML+="<tr>";
		rowsHTML+="<form id='form88_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Product'>";
				rowsHTML+="<input type='text' form='form88_"+id+"' required value=''>";
				rowsHTML+="<img src='./images/add_image.png' class='add_image' title='Add new product' id='form88_add_product_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Process Notes'>";
				rowsHTML+="<textarea form='form88_"+id+"'></textarea>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Status'>";
				rowsHTML+="<input type='text' class='dblclick_editable' required form='form88_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Schedule'>";
				rowsHTML+="<input type='text' form='form88_"+id+"' class='dblclick_editable'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Iteraton Notes'>";
				rowsHTML+="<textarea form='form88_"+id+"'></textarea>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form88_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='submit' class='save_icon' form='form88_"+id+"' title='Save'>";
				rowsHTML+="<input type='button' class='delete_icon' form='form88_"+id+"' title='Delete' onclick='$(this).parent().parent().remove();'>";
				rowsHTML+="<input type='hidden' form='form88_"+id+"'>";
			rowsHTML+="</td>";
		rowsHTML+="</tr>";

		$('#form88_body').prepend(rowsHTML);
		longPressEditable($('.dblclick_editable'));

		var fields=document.getElementById("form88_"+id);
		var product_filter=fields.elements[0];
		var status_filter=fields.elements[2];
		var schedule_filter=fields.elements[3];

		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form88_create_item(fields);
		});

		var products_data="<product_master>" +
			"<name></name>" +
			"</product_master>";
		set_my_value_list(product_data,product_filter,function ()
		{
			$(product_filter).focus();
		});

		var add_product=document.getElementById('form88_add_product_'+id);
		$(add_product).on('click',function()
		{
			modal14_action(function()
			{
				var products_data="<product_master>" +
					"<name></name>" +
					"</product_master>";
				set_my_value_list(product_data,product_filter,function ()
				{
					$(product_filter).focus();
				});
			});
		});

		set_static_value_list('manufacturing_schedule','status',status_filter);
		$(schedule_filter).vdatetimepicker();
	}
	else
	{
		$("#modal2_link").click();
	}
}


/**
 * @form Create Bill(nikki)
 * @formNo 91
 */
function form91_add_item()
{
	var filter_fields=document.getElementById('form91_master');
	var bill_type=filter_fields.elements['bill_type'].value;
	var channel=filter_fields.elements['channel'].value;
	if(is_create_access('form91'))
	{
		var rowsHTML="";
		var id=vUtil.newKey();
		rowsHTML+="<tr>";
		rowsHTML+="<form id='form91_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Item'>";
				rowsHTML+="<input type='text' required form='form91_"+id+"'>";
				rowsHTML+="<br><textarea form='form91_"+id+"' readonly='readonly' class='dblclick_editable'></textarea>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Batch'>";
				rowsHTML+="<input type='text' required form='form91_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Quantity'>";
				rowsHTML+="<input type='number' min='0' required form='form91_"+id+"' step='any'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Rate'>";
				rowsHTML+="MRP: <input type='number' required readonly='readonly' form='form91_"+id+"' step='any'>";
				rowsHTML+="<br>Price: <input type='number' required readonly='readonly' form='form91_"+id+"' step='any'>";
				rowsHTML+="<br>Freight: <input type='number' step='any' form='form91_"+id+"' value='0'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Total'>";
				rowsHTML+="Amount: <input type='number' required readonly='readonly' form='form91_"+id+"' step='any'>";
				rowsHTML+="<br>Tax: <input type='number' required readonly='readonly' form='form91_"+id+"' step='any'>";
				rowsHTML+="<br>Total: <input type='number' step='any' readonly='readonly' required form='form91_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form91_"+id+"' name='storage'>";
				rowsHTML+="<input type='hidden' form='form91_"+id+"' step='.01' name='tax_unit'>";
				rowsHTML+="<input type='hidden' form='form91_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='button' class='submit_hidden' form='form91_"+id+"' id='save_form91_"+id+"' >";
				rowsHTML+="<input type='button' class='delete_icon' form='form91_"+id+"' id='delete_form91_"+id+"' onclick='$(this).parent().parent().remove();form91_get_totals();'>";
				rowsHTML+="<input type='hidden' form='form91_"+id+"' name='freight_unit'>";
				rowsHTML+="<input type='submit' class='submit_hidden' form='form91_"+id+"'>";
				rowsHTML+="<input type='hidden' form='form91_"+id+"' name='unbilled' value='no'>";
			rowsHTML+="</td>";
		rowsHTML+="</tr>";

		$('#form91_body').prepend(rowsHTML);

		var fields=document.getElementById("form91_"+id);
		var name_filter=fields.elements[0];
		var desc_filter=fields.elements[1];
		var batch_filter=fields.elements[2];
		var quantity_filter=fields.elements[3];
		var mrp_filter=fields.elements[4];
		var price_filter=fields.elements[5];
		var freight_filter=fields.elements[6];
		var amount_filter=fields.elements[7];
		var tax_filter=fields.elements[8];
		var total_filter=fields.elements[9];
		var storage_filter=fields.elements['storage'];
		var tax_unit_filter=fields.elements['tax_unit'];
		var id_filter=fields.elements[12];
		var save_button=fields.elements[13];
		var freight_unit_filter=fields.elements['freight_unit'];

		$(save_button).on("click", function(event)
		{
			event.preventDefault();
			form91_create_item(fields);
		});

		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form91_add_item();
		});

		var product_data="<product_master>" +
				"<name></name>" +
				"</product_master>";
		set_my_value_list(product_data,name_filter,function ()
		{
			$(name_filter).focus();
		});

		$(name_filter).on('blur',function(event)
		{
			var batch_data="<product_instances>" +
					"<batch></batch>" +
					"<product_name exact='yes'>"+name_filter.value+"</product_name>" +
					"</product_instances>";
			set_my_value_list(batch_data,batch_filter);

			var master_data="<product_master>" +
						"<description></description>"+
						"<name exact='yes'>"+name_filter.value+"</name>" +
						"<tax></tax>" +
						"</product_master>";
			fetch_requested_data('',master_data,function (products)
			{
				if(products.length>0)
				{
					if(bill_type=='Retail-CST-C')
					{
						tax_unit_filter.value=get_session_var('cst_rate');
					}
					else
					{
						tax_unit_filter.value=products[0].tax;
					}
					desc_filter.value=products[0].description;
				}
			});

			var last_batch_data="<bill_items count='1'>" +
					"<batch></batch>" +
					"<mrp></mrp>"+
					"<item_name exact='yes'>"+name_filter.value+"</item_name>" +
					"</bill_items>";
			fetch_requested_data('',last_batch_data,function(data)
			{
				if(data.length>0)
				{
					batch_filter.value=data[0].batch;
					mrp_filter.value=data[0].mrp;
					var price_data="<channel_prices count='1'>" +
								"<sale_price></sale_price>" +
								"<freight></freight>" +
								"<channel exact='yes'>"+channel+"</channel>" +
								//"<latest exact='yes'>yes</latest>" +
								"<from_time upperbound='yes'>"+get_my_time()+"</from_time>"+
								"<item exact='yes'>"+name_filter.value+"</item>" +
								"</channel_prices>";
					fetch_requested_data('',price_data,function (prices)
					{
						if(prices.length>0)
						{
							price_filter.value=prices[0].sale_price;
							freight_unit_filter.value=prices[0].freight;
						}
					});

					get_inventory(name_filter.value,batch_filter.value,function(quantity)
					{
						$(quantity_filter).attr('placeholder',quantity);
					});

					var its_storage_data="<area_utilization>"+
							"<name></name>"+
							"<item_name exact='yes'>"+name_filter.value+"</item_name>"+
							"<batch exact='yes'>"+batch_filter.value+"</batch>"+
							"</area_utilization>";
					get_single_column_data(function(storage_array)
					{
						var result_array=[];
						get_available_storage(name_filter.value,batch_filter.value,storage_array,1,result_array,function()
						{
							if(result_array.length>0)
							{
								storage_filter.value=result_array[0].storage;
							}
						});
					},its_storage_data);

				}
			});

			quantity_filter.value="";
			total_filter.value=0;
			amount_filter.value=0;
			tax_filter.value=0;
		});

		$(batch_filter).on('blur',function(event)
		{
			var its_storage_data="<area_utilization count='1'>"+
							"<name></name>"+
							"<item_name exact='yes'>"+name_filter.value+"</item_name>"+
							"<batch exact='yes'>"+batch_filter.value+"</batch>"+
							"</area_utilization>";
			get_single_column_data(function(storage_array)
			{
				var result_array=[];
				get_available_storage(name_filter.value,batch_filter.value,storage_array,1,result_array,function()
				{
					if(result_array.length>0)
					{
						storage_filter.value=result_array[0].storage;
					}
				});
			},its_storage_data);

			var mrp_data="<product_instances count='1'>"+
						"<mrp></mrp>"+
						"<product_name exact='yes'>"+name_filter.value+"</product_name>"+
						"<batch exact='yes'>"+batch_filter.value+"</batch>"+
						"</product_instances>";
			set_my_value(mrp_data,mrp_filter);

			var price_data="<channel_prices count='1'>" +
						"<sale_price></sale_price>" +
						"<freight></freight>" +
						"<channel exact='yes'>"+channel+"</channel>" +
						//"<latest exact='yes'>yes</latest>" +
						"<from_time upperbound='yes'>"+get_my_time()+"</from_time>"+
						"<item exact='yes'>"+name_filter.value+"</item>" +
						"</channel_prices>";
			fetch_requested_data('',price_data,function (prices)
			{
				if(prices.length>0)
				{
					price_filter.value=prices[0].sale_price;
					freight_unit_filter.value=prices[0].freight;
				}
			});

			get_inventory(name_filter.value,batch_filter.value,function(quantity)
			{
				$(quantity_filter).attr('placeholder',quantity);
			});

			quantity_filter.value="";
			total_filter.value=0;
			amount_filter.value=0;
			tax_filter.value=0;
		});

		$(quantity_filter).on('change blur',function(event)
		{
			var amount=parseFloat(quantity_filter.value)*parseFloat(price_filter.value);
			amount_filter.value=amount;
			freight_filter.value=vUtil.round((parseFloat(freight_unit_filter.value)*parseFloat(quantity_filter.value)),2);
			tax_filter.value=vUtil.round(((parseFloat(tax_unit_filter.value)*amount)/100),2);
			total_filter.value=Math.round(parseFloat(amount_filter.value)+parseFloat(tax_filter.value)+parseFloat(freight_filter.value));
		});

		$(freight_filter).on('change blur',function(event)
		{
			total_filter.value=Math.round(parseFloat(amount_filter.value)+parseFloat(tax_filter.value)+parseFloat(freight_filter.value));
		});

		form91_get_totals();
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form Manage Projects
 * @formNo 101
 */
function form101_add_item()
{
	if(is_create_access('form101'))
	{
		var rowsHTML="";
		var id=vUtil.newKey();
		rowsHTML+="<tr>";
		rowsHTML+="<form id='form101_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Project Name'>";
				rowsHTML+="<textarea required form='form101_"+id+"'></textarea>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Details'>";
				rowsHTML+="<textarea form='form101_"+id+"'></textarea>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Start Date'>";
				rowsHTML+="<input type='text' required form='form101_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Status'>";
				rowsHTML+="<input type='text' required form='form101_"+id+"' value='active'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form101_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='submit' class='save_icon' form='form101_"+id+"' >";
				rowsHTML+="<input type='button' class='delete_icon' form='form101_"+id+"' onclick='$(this).parent().parent().remove();'>";
			rowsHTML+="</td>";
		rowsHTML+="</tr>";

		$('#form101_body').prepend(rowsHTML);

		var fields=document.getElementById("form101_"+id);
		var name_filter=fields.elements[0];
		var start_filter=fields.elements[2];
		var status_filter=fields.elements[3];

		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form101_create_item(fields);
		});

		$(name_filter).focus();

		set_static_value_list('projects','status',status_filter);
		$(start_filter).datepicker();
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form Project Team
 * @formNo 102
 */
function form102_add_item()
{
	if(is_create_access('form102'))
	{
		var rowsHTML="";
		var id=vUtil.newKey();
		rowsHTML+="<tr>";
		rowsHTML+="<form id='form102_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Member'>";
				rowsHTML+="<input type='text' form='form102_"+id+"' required value=''>";
				rowsHTML+="<img src='./images/add_image.png' class='add_image' title='Add new staff' id='form102_add_staff_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Role'>";
				rowsHTML+="<textarea form='form102_"+id+"'></textarea>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Notes'>";
				rowsHTML+="<textarea form='form102_"+id+"'></textarea>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Status'>";
				rowsHTML+="<input type='text' form='form102_"+id+"' required value='active'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form102_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='submit' class='save_icon' form='form102_"+id+"' id='save_form102_"+id+"' >";
				rowsHTML+="<input type='button' class='delete_icon' form='form102_"+id+"' id='delete_form102_"+id+"' onclick='$(this).parent().parent().remove();'>";
			rowsHTML+="</td>";
		rowsHTML+="</tr>";

		$('#form102_body').prepend(rowsHTML);

		var fields=document.getElementById("form102_"+id);
		var member_filter=fields.elements[0];
		var status_filter=fields.elements[3];

		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form102_create_item(fields);
		});

		var staff_data="<staff>" +
			"<acc_name></acc_name>" +
			"</staff>";
		set_my_value_list(staff_data,member_filter,function ()
		{
			$(member_filter).focus();
		});

		var add_staff=document.getElementById('form102_add_staff_'+id);
		$(add_staff).on('click',function()
		{
			modal16_action(function()
			{
				var staff_data="<staff>" +
					"<acc_name></acc_name>" +
					"</staff>";
				set_my_value_list(staff_data,member_filter,function ()
				{
					$(member_filter).focus();
				});
			});
		});

		set_static_value_list('project_team','status',status_filter);
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form Project Phases
 * @formNo 103
 */
function form103_add_item()
{
	if(is_create_access('form103'))
	{
		var rowsHTML="";
		var id=vUtil.newKey();
		rowsHTML+="<tr>";
		rowsHTML+="<form id='form103_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Phase Name'>";
				rowsHTML+="<textarea form='form103_"+id+"' required></textarea>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Details'>";
				rowsHTML+="<textarea form='form103_"+id+"'></textarea>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Start Date'>";
				rowsHTML+="<input type='text' form='form103_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Due Date'>";
				rowsHTML+="<input type='text' form='form103_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Status'>";
				rowsHTML+="<input type='text' form='form103_"+id+"' required value='active'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form103_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='submit' class='save_icon' form='form103_"+id+"' id='save_form103_"+id+"' >";
				rowsHTML+="<input type='button' class='delete_icon' form='form103_"+id+"' id='delete_form103_"+id+"' onclick='$(this).parent().parent().remove();'>";
			rowsHTML+="</td>";
		rowsHTML+="</tr>";

		$('#form103_body').prepend(rowsHTML);

		var fields=document.getElementById("form103_"+id);
		var name_filter=fields.elements[0];
		var start_filter=fields.elements[2];
		var due_filter=fields.elements[3];
		var status_filter=fields.elements[4];

		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form103_create_item(fields);
		});

		$(name_filter).focus();

		$(start_filter).datepicker();
		$(due_filter).datepicker();
		set_static_value_list('project_phases','status',status_filter);
	}
	else
	{
		$("#modal2_link").click();
	}
}


/**
 * @form Asset Attributes
 * @formNo 109
 */
function form109_add_item()
{
	if(is_create_access('form109'))
	{
		var rowsHTML="";
		var id=vUtil.newKey();
		rowsHTML+="<tr>";
		rowsHTML+="<form id='form109_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Name'>";
				rowsHTML+="<input type='text' form='form109_"+id+"'>";
				rowsHTML+="<img src='./images/add_image.png' class='add_image' title='Add new asset' id='form109_add_asset_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Attribute'>";
				rowsHTML+="<input type='text' form='form109_"+id+"' value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Value'>";
				rowsHTML+="<input type='text' form='form109_"+id+"' value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form109_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='submit' class='save_icon' form='form109_"+id+"' >";
				rowsHTML+="<input type='button' class='delete_icon' form='form109_"+id+"' onclick='$(this).parent().parent().remove();'>";
			rowsHTML+="</td>";
		rowsHTML+="</tr>";

		$('#form109_body').prepend(rowsHTML);
		var fields=document.getElementById("form109_"+id);
		var asset_filter=fields.elements[0];
		var attribute_filter=fields.elements[1];

		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form109_create_item(fields);
		});

		var asset_data="<assets>" +
				"<name></name>" +
				"</assets>";
		set_my_value_list(asset_data,asset_filter,function ()
		{
			$(asset_filter).focus();
		});

		var add_asset=document.getElementById('form109_add_asset_'+id);
		$(add_asset).on('click',function()
		{
			modal10_action(function()
			{
				var asset_data="<assets>" +
						"<name></name>" +
						"</assets>";
				set_my_value_list(asset_data,asset_filter,function ()
				{
					$(asset_filter).focus();
				});
			});
		});

		var attribute_data="<attributes>" +
				"<attribute></attribute>" +
				"<type exact='yes'>asset</type>" +
				"</attributes>";
		set_my_filter(attribute_data,attribute_filter);
	}
	else
	{
		$("#modal2_link").click();
	}
}


/**
 * @form Add sale challan
 * @formNo 112
 */
function form112_add_item()
{
	if(is_create_access('form112'))
	{
		var rowsHTML="";
		var id=vUtil.newKey();
		rowsHTML+="<tr>";
		rowsHTML+="<form id='form112_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Item'>";
				rowsHTML+="<input type='text' form='form112_"+id+"' value=''>";
				rowsHTML+="<br>SKU: <input type='text' form='form112_"+id+"' required>";
				rowsHTML+="<br>Name: <input type='text' readonly='readonly' form='form112_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Batch'>";
				rowsHTML+="<input type='text' form='form112_"+id+"' required value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Quantity'>";
				rowsHTML+="<input type='number' form='form112_"+id+"' value='1' required step='any'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Amount'>";
				rowsHTML+="Unit Price: Rs. <input type='number' form='form112_"+id+"' required step='any'>";
				rowsHTML+="<br>MRP: Rs. <input type='number' readonly='readonly' form='form112_"+id+"' step='any'>";
				rowsHTML+="<br>Amount: Rs. <input type='number' readonly='readonly' form='form112_"+id+"' required step='any'>";
				rowsHTML+="<br>Tax: Rs. <input type='number' readonly='readonly' form='form112_"+id+"' required step='any'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Storage'>";
				rowsHTML+="<input type='text' form='form112_"+id+"' required>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form112_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='button' class='submit_hidden' form='form112_"+id+"' id='save_form112_"+id+"' >";
				rowsHTML+="<input type='button' class='delete_icon' form='form112_"+id+"' id='delete_form112_"+id+"' onclick='$(this).parent().parent().remove();'>";
				rowsHTML+="<input type='submit' class='submit_hidden' form='form112_"+id+"'>";
				rowsHTML+="<input type='hidden' form='form112_"+id+"' name='tax_unit'>";
			rowsHTML+="</td>";
		rowsHTML+="</tr>";

		$('#form112_body').prepend(rowsHTML);

		var fields=document.getElementById("form112_"+id);
		var barcode_filter=fields.elements[0];
		var name_filter=fields.elements[1];
		var desc_filter=fields.elements[2];
		var batch_filter=fields.elements[3];
		var quantity_filter=fields.elements[4];
		var unit_filter=fields.elements[5];
		var mrp_filter=fields.elements[6];
		var amount_filter=fields.elements[7];
		var tax_filter=fields.elements[8];
		var storage_filter=fields.elements[9];
		var save_button=fields.elements[11];
		var tax_unit_filter=fields.elements[14];

		$(barcode_filter).focus();

		$(save_button).on("click", function(event)
		{
			event.preventDefault();
			form112_create_item(fields);
		});
		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form112_add_item();
		});

		var products_data="<product_master>" +
			"<name></name>" +
			"</product_master>";

		set_my_value_list(products_data,name_filter);

		var storage_data="<store_areas>"+
						"<name></name>"+
						//"<area_type exact='yes'>"+get_session_var('storage_level')+"</area_type>"+
						"<area_type></area_type>"+
						"</store_areas>";
		set_my_value_list(storage_data,storage_filter);

		$(barcode_filter).on('blur',function()
		{
			if(barcode_filter.value!="" && barcode_filter.value!=null)
			{
				var item_data="<product_master>"+
							"<name></name>"+
							"<bar_code exact='yes'>"+barcode_filter.value+"</bar_code>"+
							"</product_master>";
				set_my_value(item_data,name_filter,function ()
				{
					$(name_filter).trigger('blur');
				});
				$(batch_filter).focus();
			}
		});

		$(barcode_filter).on('keydown',function (event)
		{
			if(event.keyCode == 13 )
			{
				event.preventDefault();
				$(barcode_filter).trigger('blur');
			}
		});

		$(name_filter).on('blur',function(event)
		{
			var desc_data="<product_master>" +
				"<description></description>" +
				"<name exact='yes'>"+name_filter.value+"</name>" +
				"</product_master>";
			set_my_value(desc_data,desc_filter);

			var batch_data="<product_instances>" +
				"<batch></batch>" +
				"<product_name exact='yes'>"+name_filter.value+"</product_name>" +
				"</product_instances>";
			set_my_value_list(batch_data,batch_filter);

			var tax_unit_data="<product_master>"+
							"<tax></tax>"+
							"<name exact='yes'>"+name_filter.value+"</name>"+
							"</product_master>";
			set_my_value(tax_unit_data,tax_unit_filter);

			var last_batch_data="<bill_items count='1'>" +
					"<batch></batch>" +
					"<item_name exact='yes'>"+name_filter.value+"</item_name>" +
					"</bill_items>";
			get_single_column_data(function(data)
			{
				if(data.length>0)
				{
					batch_filter.value=data[0];

					var its_storage_data="<area_utilization>"+
							"<name></name>"+
							"<item_name exact='yes'>"+name_filter.value+"</item_name>"+
							"<batch exact='yes'>"+batch_filter.value+"</batch>"+
							"</area_utilization>";
					get_single_column_data(function(storage_array)
					{
						var result_array=[];
						get_available_storage(name_filter.value,batch_filter.value,storage_array,1,result_array,function()
						{
							if(result_array.length>0)
							{
								storage_filter.value=result_array[0].storage;
							}
						});
					},its_storage_data);

					get_inventory(name_filter.value,batch_filter.value,function(quantity)
					{
						//$(quantity_filter).attr('max',quantity);
						$(quantity_filter).attr('min',"0");
						$(quantity_filter).attr('placeholder',quantity);
					});

					var mrp_data="<product_instances>"+
						"<mrp></mrp>"+
						"<product_name exact='yes'>"+name_filter.value+"</product_name>"+
						"<batch exact='yes'>"+batch_filter.value+"</batch>"+
						"</product_instances>";
					set_my_value(mrp_data,mrp_filter);


					var sale_price_data="<channel_prices>" +
									"<sale_price></sale_price>"+
									//"<latest exact='yes'>yes</latest>" +
									"<channel exact='yes'>Retail</channel>"+
									"<from_time upperbound='yes'>"+get_my_time()+"</from_time>"+
									"<item exact='yes'>"+name_filter.value+"</item>" +
									"</channel_prices>";
					set_my_value(sale_price_data,unit_filter,function ()
					{
						amount_filter.value=vUtil.round((parseFloat(quantity_filter.value)*parseFloat(unit_filter.value)),2);
						tax_filter.value=vUtil.round((parseFloat(amount_filter.value)*parseFloat(tax_unit_filter.value)/100),2);
					});
				}
			},last_batch_data);

		});

		$(batch_filter).on('blur',function(event)
		{
			var its_storage_data="<area_utilization>"+
							"<name></name>"+
							"<item_name exact='yes'>"+name_filter.value+"</item_name>"+
							"<batch exact='yes'>"+batch_filter.value+"</batch>"+
							"</area_utilization>";
			get_single_column_data(function(storage_array)
			{
				var result_array=[];
				get_available_storage(name_filter.value,batch_filter.value,storage_array,1,result_array,function()
				{
					if(result_array.length>0)
					{
						storage_filter.value=result_array[0].storage;
					}
				});
			},its_storage_data);

			var mrp_data="<product_instances>"+
				"<mrp></mrp>"+
				"<product_name exact='yes'>"+name_filter.value+"</product_name>"+
				"<batch exact='yes'>"+batch_filter.value+"</batch>"+
				"</product_instances>";
			set_my_value(mrp_data,mrp_filter);

			var sale_price_data="<channel_prices>" +
							"<sale_price></sale_price>"+
							//"<latest exact='yes'>yes</latest>" +
							"<channel exact='yes'>Retail</channel>"+
							"<from_time upperbound='yes'>"+get_my_time()+"</from_time>"+
							"<item exact='yes'>"+name_filter.value+"</item>" +
							"</channel_prices>";
			set_my_value(sale_price_data,unit_filter,function ()
			{
				amount_filter.value=vUtil.round((parseFloat(quantity_filter.value)*parseFloat(unit_filter.value)),2);
				tax_filter.value=vUtil.round((parseFloat(amount_filter.value)*parseFloat(tax_unit_filter.value)/100),2);
			});
		});

		$(quantity_filter).add(unit_filter).on('blur',function ()
		{
			amount_filter.value=vUtil.round((parseFloat(quantity_filter.value)*parseFloat(unit_filter.value)),2);
			tax_filter.value=vUtil.round((parseFloat(amount_filter.value)*parseFloat(tax_unit_filter.value)/100),2);
		});
	}
	else
	{
		$("#modal2_link").click();
	}
}


/**
 * @form Add purchase challans
 * @formNo 114
 */
function form114_add_item()
{
	if(is_create_access('form114'))
	{
		var supplier_name=document.getElementById('form114_master').elements['supplier'].value;
		var rowsHTML="";
		var id=vUtil.newKey();
		rowsHTML+="<tr>";
		rowsHTML+="<form id='form114_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Item'>";
				rowsHTML+="<input type='text' form='form114_"+id+"'>";
				rowsHTML+="<img src='./images/add_image.png' class='add_image' title='Add new item' id='form114_add_product_"+id+"'>";
				rowsHTML+="<br>SKU: <input type='text' form='form114_"+id+"' required>";
				rowsHTML+="<br>Name: <input type='text' readonly='readonly' form='form114_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Batch'>";
				rowsHTML+="<input type='text' form='form114_"+id+"' required>";
				rowsHTML+="<img src='./images/add_image.png' class='add_image' title='Add batch' id='form114_add_batch_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Quantity'>";
				rowsHTML+="<input type='number' form='form114_"+id+"' value='1' required step='any'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Amount'>";
				rowsHTML+="Unit Price: Rs. <input type='number' form='form114_"+id+"' required step='any'>";
				rowsHTML+="<br>Amount: Rs. <input type='number' readonly='readonly' form='form114_"+id+"' required step='any'>";
				rowsHTML+="<br>Tax: Rs. <input type='number' readonly='readonly' form='form114_"+id+"' required step='any'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Storage'>";
				rowsHTML+="<input type='text' form='form114_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form114_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='button' class='submit_hidden' form='form114_"+id+"' id='save_form114_"+id+"' >";
				rowsHTML+="<input type='button' class='delete_icon' form='form114_"+id+"' id='delete_form114_"+id+"' onclick='$(this).parent().parent().remove();'>";
				rowsHTML+="<input type='submit' class='submit_hidden' form='form114_"+id+"'>";
				rowsHTML+="<input type='hidden' form='form114_"+id+"' name='tax_unit'>";
			rowsHTML+="</td>";
		rowsHTML+="</tr>";

		$('#form114_body').prepend(rowsHTML);

		var fields=document.getElementById("form114_"+id);
		var barcode_filter=fields.elements[0];
		var name_filter=fields.elements[1];
		var desc_filter=fields.elements[2];
		var batch_filter=fields.elements[3];
		var quantity_filter=fields.elements[4];
		var unit_filter=fields.elements[5];
		var amount_filter=fields.elements[6];
		var tax_filter=fields.elements[7];
		var storage_filter=fields.elements[8];
		var save_button=fields.elements[10];
		var tax_unit_filter=fields.elements[13];

		$(barcode_filter).focus();

		$(save_button).on("click", function(event)
		{
			event.preventDefault();
			form114_create_item(fields);
		});

		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form114_add_item();
		});

		var products_data="<product_master>" +
			"<name></name>" +
			"</product_master>";
		set_my_value_list(products_data,name_filter);

		var add_product=document.getElementById('form114_add_product_'+id);
		$(add_product).on('click',function()
		{
			modal114_action(function()
			{
				var products_data="<product_master>" +
					"<name></name>" +
					"</product_master>";
				set_my_value_list(products_data,name_filter);
			});
		});

		var add_batch=document.getElementById('form114_add_batch_'+id);
		$(add_batch).on('click',function()
		{
			modal120_action(function()
			{
				var batch_data="<product_instances>" +
					"<batch></batch>" +
					"<product_name exact='yes'>"+name_filter.value+"</product_name>" +
					"</product_instances>";
				set_my_value_list(batch_data,batch_filter);
			},name_filter.value);
		});

		var storage_data="<store_areas>"+
						"<name></name>"+
						//"<area_type exact='yes'>"+get_session_var('storage_level')+"</area_type>"+
						"<area_type></area_type>"+
						"</store_areas>";
		set_my_value_list(storage_data,storage_filter);

		$(barcode_filter).on('blur',function()
		{
			var item_data="<product_master>"+
						"<name></name>"+
						"<bar_code exact='yes'>"+barcode_filter.value+"</bar_code>"+
						"</product_master>";
			set_my_value(item_data,name_filter,function ()
			{
				$(name_filter).trigger('blur');
			});
			$(batch_filter).focus();
		});

		$(barcode_filter).on('keydown',function (event)
		{
			if(event.keyCode == 13 )
			{
				event.preventDefault();
				$(barcode_filter).trigger('blur');
			}
		});

		$(name_filter).on('blur',function(event)
		{
			var desc_data="<product_master>" +
				"<description></description>" +
				"<name exact='yes'>"+name_filter.value+"</name>" +
				"</product_master>";
			set_my_value(desc_data,desc_filter);

			var batch_data="<product_instances>" +
				"<batch></batch>" +
				"<product_name exact='yes'>"+name_filter.value+"</product_name>" +
				"</product_instances>";
			set_my_value_list(batch_data,batch_filter);

			var tax_unit_data="<product_master>"+
							"<tax></tax>"+
							"<name exact='yes'>"+name_filter.value+"</name>"+
							"</product_master>";
			set_my_value(tax_unit_data,tax_unit_filter);

			var last_batch_data="<supplier_bill_items count='1'>" +
					"<batch></batch>" +
					"<product_name exact='yes'>"+name_filter.value+"</product_name>" +
					"</supplier_bill_items>";
			get_single_column_data(function(data)
			{
				if(data.length>0)
				{
					batch_filter.value=data[0];

					var its_storage_data="<supplier_bill_items>"+
							"<storage></storage>"+
							"<product_name exact='yes'>"+name_filter.value+"</product_name>"+
							"<batch exact='yes'>"+batch_filter.value+"</batch>"+
							"</supplier_bill_items>";
					set_my_value(its_storage_data,storage_filter);

					var mrp_data="<product_instances>"+
						"<mrp></mrp>"+
						"<product_name exact='yes'>"+name_filter.value+"</product_name>"+
						"<batch exact='yes'>"+batch_filter.value+"</batch>"+
						"</product_instances>";
					get_single_column_data(function(mrps)
					{
						var mrp_price=0;
						if(mrps.length>0)
						{
							mrp_price=parseFloat(mrps[0]);
						}

						var margin_data="<supplier_item_mapping>" +
									"<margin></margin>"+
									"<supplier_sku></supplier_sku>"+
									"<supplier exact='yes'>"+supplier_name+"</supplier>" +
									"<item exact='yes'>"+name_filter.value+"</item>"+
									"</supplier_item_mapping>";
						fetch_requested_data('',margin_data,function(margins)
						{
							if(margins.length>0)
							{
								unit_filter.value=vUtil.round((parseFloat(mrp_price)*(100-parseFloat(margins[0].margin))/100),2);
								amount_filter.value=Math.round(parseFloat(quantity_filter.value)*parseFloat(unit_filter.value));
								tax_filter.value=Math.round(parseFloat(amount_filter.value)*(parseFloat(tax_unit_filter.value)/100));
								//total_filter.value=Math.round(parseFloat(amount_filter.value)+parseFloat(tax_filter.value));
							}
							else
							{
								unit_filter.value="";
								amount_filter.value="";
								tax_filter.value="";
								//total_filter.value="";
							}
						});
					},mrp_data);

				}
			},last_batch_data);

		});

		$(batch_filter).on('blur',function(event)
		{
			var its_storage_data="<supplier_bill_items>"+
							"<storage></storage>"+
							"<product_name exact='yes'>"+name_filter.value+"</product_name>"+
							"<batch exact='yes'>"+batch_filter.value+"</batch>"+
							"</supplier_bill_items>";
			set_my_value(its_storage_data,storage_filter);

			var mrp_data="<product_instances>"+
						"<mrp></mrp>"+
						"<product_name exact='yes'>"+name_filter.value+"</product_name>"+
						"<batch exact='yes'>"+batch_filter.value+"</batch>"+
						"</product_instances>";
			get_single_column_data(function(mrps)
			{
				var mrp_price=0;
				if(mrps.length>0)
				{
					mrp_price=parseFloat(mrps[0]);
				}

				var margin_data="<supplier_item_mapping>" +
							"<margin></margin>"+
							"<supplier_sku></supplier_sku>"+
							"<supplier exact='yes'>"+supplier_name+"</supplier>" +
							"<item exact='yes'>"+name_filter.value+"</item>"+
							"</supplier_item_mapping>";
				fetch_requested_data('',margin_data,function(margins)
				{
					if(margins.length>0)
					{
						unit_filter.value=vUtil.round((parseFloat(mrp_price)*(100-parseFloat(margins[0].margin))/100),2);
						amount_filter.value=Math.round(parseFloat(quantity_filter.value)*parseFloat(unit_filter.value));
						tax_filter.value=Math.round(parseFloat(amount_filter.value)*(parseFloat(tax_unit_filter.value)/100));
						//total_filter.value=Math.round(parseFloat(amount_filter.value)+parseFloat(tax_filter.value));
					}
					else
					{
						unit_filter.value="";
						amount_filter.value="";
						tax_filter.value="";
						//total_filter.value="";
					}
				});
			},mrp_data);
		});

		$(quantity_filter).add(unit_filter).on('blur',function ()
		{
			amount_filter.value=vUtil.round((parseFloat(quantity_filter.value)*parseFloat(unit_filter.value)),2);
			tax_filter.value=vUtil.round((parseFloat(amount_filter.value)*parseFloat(tax_unit_filter.value)/100),2);
		});
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form Create Bill(loyalty)
 * @formNo 118
 */
function form118_add_item()
{
	var filter_fields=document.getElementById('form118_master');
	if(is_create_access('form118'))
	{
		var rowsHTML="";
		var id=vUtil.newKey();
		rowsHTML+="<tr>";
		rowsHTML+="<form id='form118_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Item'>";
				rowsHTML+="<input type='text' required form='form118_"+id+"'>";
				rowsHTML+="<img src='./images/add_image.png' class='add_image' title='Add new product' id='form118_add_product_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Batch'>";
				rowsHTML+="<input type='text' required form='form118_"+id+"'>";
				rowsHTML+="<img src='./images/add_image.png' class='add_image' title='Add new batch' id='form118_add_batch_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Quantity'>";
				rowsHTML+="<input type='number' min='0' required form='form118_"+id+"' step='any'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Unit Price'>";
				rowsHTML+="<input type='number' required readonly='readonly' form='form118_"+id+"' step='any'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Total'>";
				rowsHTML+="<input type='number' required readonly='readonly' form='form118_"+id+"' step='any'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form118_"+id+"'>";
				rowsHTML+="<input type='hidden' form='form118_"+id+"'>";
				rowsHTML+="<input type='hidden' form='form118_"+id+"'>";
				rowsHTML+="<input type='hidden' form='form118_"+id+"'>";
				rowsHTML+="<input type='hidden' form='form118_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='button' class='submit_hidden' form='form118_"+id+"' id='save_form118_"+id+"' >";
				rowsHTML+="<input type='button' class='delete_icon' form='form118_"+id+"' id='delete_form118_"+id+"' onclick='$(this).parent().parent().remove();'>";
				rowsHTML+="<input type='hidden' form='form118_"+id+"'>";
				rowsHTML+="<input type='hidden' form='form118_"+id+"'>";
				rowsHTML+="<input type='submit' class='submit_hidden' form='form118_"+id+"'>";
			rowsHTML+="</td>";
		rowsHTML+="</tr>";

		$('#form118_body').prepend(rowsHTML);

		var fields=document.getElementById("form118_"+id);
		var name_filter=fields.elements[0];
		var batch_filter=fields.elements[1];
		var quantity_filter=fields.elements[2];
		var price_filter=fields.elements[3];
		var total_filter=fields.elements[4];
		var amount_filter=fields.elements[5];
		var discount_filter=fields.elements[6];
		var tax_filter=fields.elements[7];
		var offer_filter=fields.elements[8];
		var id_filter=fields.elements[9];
		var save_button=fields.elements[10];
		var free_product_filter=fields.elements[12];
		var free_product_quantity=fields.elements[13];


		$(save_button).on("click", function(event)
		{
			event.preventDefault();
			form118_create_item(fields);
		});

		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form118_add_item();
		});

		var product_data="<product_master>" +
				"<name></name>" +
				"</product_master>";
		set_my_value_list(product_data,name_filter,function ()
		{
			$(name_filter).focus();
		});

		var add_product=document.getElementById('form118_add_product_'+id);
		$(add_product).on('click',function()
		{
			modal14_action(function()
			{
				var product_data="<product_master>" +
						"<name></name>" +
						"</product_master>";
				set_my_value_list(product_data,name_filter,function ()
				{
					$(name_filter).focus();
				});
			});
		});

		var add_batch=document.getElementById('form118_add_batch_'+id);
		$(add_batch).on('click',function()
		{
			modal22_action(function()
			{
				var batch_data="<product_instances>" +
					"<batch></batch>" +
					"<product_name exact='yes'>"+name_filter.value+"</product_name>" +
					"</product_instances>";
				set_my_value_list(batch_data,batch_filter);
			});
		});

		$(name_filter).on('blur',function(event)
		{
			var batch_data="<product_instances>" +
					"<batch></batch>" +
					"<product_name exact='yes'>"+name_filter.value+"</product_name>" +
					"</product_instances>";
			set_my_value_list(batch_data,batch_filter);

			var last_batch_data="<bill_items count='1'>" +
					"<batch></batch>" +
					"<item_name exact='yes'>"+name_filter.value+"</item_name>" +
					"</bill_items>";
			get_single_column_data(function(data)
			{
				if(data.length>0)
				{
					batch_filter.value=data[0];
					var price_data="<product_instances count='1'>" +
						"<sale_price></sale_price>" +
						"<batch exact='yes'>"+batch_filter.value+"</batch>" +
						"<product_name exact='yes'>"+name_filter.value+"</product_name>" +
						"</product_instances>";
					set_my_value(price_data,price_filter);

					get_inventory(name_filter.value,batch_filter.value,function(quantity)
					{
						$(quantity_filter).attr('placeholder',quantity);
					});
				}
			},last_batch_data);

			quantity_filter.value="";
			total_filter.value=0;
			amount_filter.value=0;
			discount_filter.value=0;
			tax_filter.value=0;
			offer_filter.value="";
			free_product_filter.value="";
			free_product_quantity.value="";
		});

		$(batch_filter).on('blur',function(event)
		{
			var price_data="<product_instances count='1'>" +
					"<sale_price></sale_price>" +
					"<batch exact='yes'>"+batch_filter.value+"</batch>" +
					"<product_name exact='yes'>"+name_filter.value+"</product_name>" +
					"</product_instances>";
			set_my_value(price_data,price_filter);

			get_inventory(name_filter.value,batch_filter.value,function(quantity)
			{
				$(quantity_filter).attr('placeholder',quantity);
			});

			quantity_filter.value="";
			total_filter.value=0;
			amount_filter.value=0;
			discount_filter.value=0;
			tax_filter.value=0;
			offer_filter.value="";
			free_product_filter.value="";
			free_product_quantity.value="";
		});

		$(quantity_filter).on('blur',function(event)
		{
			var amount=parseFloat(quantity_filter.value)*parseFloat(price_filter.value);
			amount_filter.value=amount;
			var offer_data="<offers>" +
					"<offer_type>product</offer_type>" +
					"<product_name exact='yes'>"+name_filter.value+"</product_name>" +
					"<batch array='yes'>"+batch_filter.value+"--all</batch>" +
					"<criteria_type></criteria_type>" +
					"<criteria_amount></criteria_amount>" +
					"<criteria_quantity></criteria_quantity>" +
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
					else if(a.criteria_quantity<b.criteria_quantity)
					{	return 1;}
					else
					{	return -1;}
				});

				for(var i in offers)
				{
					offer_filter.value=offers[i].offer_detail;
					if(offers[i].criteria_type=='min quantity crossed' && parseFloat(offers[i].criteria_quantity)<=parseFloat(quantity_filter.value))
					{
						if(offers[i].result_type=='discount')
						{
							if(offers[i].discount_percent!="" && offers[i].discount_percent!=0 && offers[i].discount_percent!="0")
							{
								discount_filter.value=parseFloat((amount*parseInt(offers[i].discount_percent))/100);
							}
							else
							{
								discount_filter.value=parseFloat(offers[i].discount_amount)*(Math.floor(parseFloat(quantity_filter.value)/parseFloat(offers[i].criteria_quantity)));
							}
						}
						else if(offers[i].result_type=='quantity addition')
						{
							if(offers[i].quantity_add_percent!="" && offers[i].quantity_add_percent!=0 && offers[i].quantity_add_percent!="0")
							{
								quantity_filter.value=parseFloat(quantity_filter.value)*(1+(parseFloat(offers[i].quantity_add_percent)/100));
							}
							else
							{
								quantity_filter.value=parseFloat(quantity_filter.value)+(parseFloat(offers[i].quantity_add_amount)*(Math.floor(parseFloat(quantity_filter.value)/parseFloat(offers[i].criteria_quantity))));
							}
						}
						else if(offers[i].result_type=='product free')
						{
							free_product_filter.value=offers[i].free_product_name;
							free_product_quantity.value=parseFloat(offers[i].free_product_quantity)*(Math.floor(parseFloat(quantity_filter.value)/parseFloat(offers[i].criteria_quantity)));
						}
						break;
					}
					else if(offers[i].criteria_type=='min amount crossed' && offers[i].criteria_amount<=amount)
					{
						if(offers[i].result_type=='discount')
						{
							if(offers[i].discount_percent!="" && offers[i].discount_percent!=0 && offers[i].discount_percent!="0")
							{
								discount_filter.value=parseFloat((amount*parseInt(offers[i].discount_percent))/100);
							}
							else
							{
								discount_filter.value=parseFloat(offers[i].discount_amount)*(Math.floor(parseFloat(amount_filter.value)/parseFloat(offers[i].criteria_amount)));
							}
						}
						else if(offers[i].result_type=='quantity addition')
						{
							if(offers[i].quantity_add_percent!="" && offers[i].quantity_add_percent!=0 && offers[i].quantity_add_percent!="0")
							{
								quantity_filter.value=parseFloat(quantity_filter.value)*(1+(parseFloat(offers[i].quantity_add_percent)/100));
							}
							else
							{
								quantity_filter.value=parseFloat(quantity_filter.value)+(parseFloat(offers[i].quantity_add_amount)*(Math.floor(parseFloat(amount_filter.value)/parseFloat(offers[i].criteria_amount))));
							}
						}
						else if(offers[i].result_type=='product free')
						{
							free_product_filter.value=offers[i].free_product_name;
							free_product_quantity.value=parseFloat(offers[i].free_product_quantity)*(Math.floor(parseFloat(amount_filter.value)/parseFloat(offers[i].criteria_amount)));
						}
						break;
					}
				}

				var tax_data="<product_master>" +
						"<name exact='yes'>"+name_filter.value+"</name>" +
						"<tax></tax>" +
						"</product_master>";
				fetch_requested_data('',tax_data,function(taxes)
				{
					taxes.forEach(function(tax)
					{
						tax_filter.value=parseFloat((parseFloat(tax.tax)*(amount-parseFloat(discount_filter.value)))/100);
					});

					total_filter.value=Math.round(parseFloat(amount_filter.value)+parseFloat(tax_filter.value)-parseFloat(discount_filter.value));
				});

			});
		});
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form Create Bill(wholesale)
 * @formNo 119
 */
function form119_add_item()
{
	var filter_fields=document.getElementById('form119_master');
	var bill_type=filter_fields.elements[2].value;
	var customer_name=filter_fields.elements[1].value;

	if(is_create_access('form119'))
	{
		var id=vUtil.newKey();
		var rowsHTML="<tr>";
		rowsHTML+="<form id='form119_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Product Name'>";
				rowsHTML+="<label id='form119_product_make_"+id+"'></label>";
				rowsHTML+="<br><v2></v2><input type='text' required form='form119_"+id+"' name='product_name'>";
				rowsHTML+="<img src='./images/add_image.png' class='add_image' title='Add new product' id='form119_add_product_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Batch'>";
				rowsHTML+="<input type='text' required form='form119_"+id+"' name='batch'>";
				rowsHTML+="<img src='./images/add_image.png' class='add_image' title='Add new batch' id='form119_add_batch_"+id+"'>";
				rowsHTML+="<br><v2>Expiry: </v2><label id='form119_exp_"+id+"'></label>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Quantity'>";
				rowsHTML+="<v1>Bought: </v1><input type='number' min='0' required form='form119_"+id+"' step='any' name='squantity'>";
				rowsHTML+="<br><v2>Free: </v2><input type='number' min='0' value='0' required form='form119_"+id+"' step='any' name='fquantity'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Price'>";
				rowsHTML+="<v1>Sale: </v1>Rs. <input type='number' required min='0' readonly='readonly' form='form119_"+id+"' step='any' name='unit_price'>";
				rowsHTML+="<br><v2>MRP: </v2>Rs. <input type='number' min='0' readonly='readonly' form='form119_"+id+"' step='any' name='mrp'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Total'>";
				rowsHTML+="<v1>Amount: </v1>Rs. <input type='number' required min='0' form='form119_"+id+"' readonly='readonly' step='any' name='amount'>";
				rowsHTML+="<input type='hidden' value='0' form='form119_"+id+"' readonly='readonly' name='discount'>";
				rowsHTML+="<br><v2>Tax: </v2>Rs. <input type='number' required min='0' value='0' form='form119_"+id+"' readonly='readonly' step='any' name='tax'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form119_"+id+"' name='total'>";
				rowsHTML+="<input type='hidden' form='form119_"+id+"' name='offer'>";
				rowsHTML+="<input type='hidden' form='form119_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='button' class='submit_hidden' form='form119_"+id+"' id='save_form119_"+id+"' >";
				rowsHTML+="<input type='button' class='delete_icon' form='form119_"+id+"' id='delete_form119_"+id+"' onclick='$(this).parent().parent().remove();'>";
				rowsHTML+="<input type='hidden' form='form119_"+id+"' name='free_product'>";
				rowsHTML+="<input type='hidden' form='form119_"+id+"' name='free_product_quantity'>";
				rowsHTML+="<input type='hidden' title='unbilled_item_id' form='form119_"+id+"' value='no'>";
				rowsHTML+="<input type='submit' class='submit_hidden' form='form119_"+id+"'>";
			rowsHTML+="</td>";
		rowsHTML+="</tr>";

		$('#form119_body').prepend(rowsHTML);

		var fields=document.getElementById("form119_"+id);
		var name_filter=fields.elements[0];
		var batch_filter=fields.elements[1];
		var squantity_filter=fields.elements[2];
		var fquantity_filter=fields.elements[3];
		var price_filter=fields.elements[4];
		var mrp_filter=fields.elements[5];
		var amount_filter=fields.elements[6];
		var discount_filter=fields.elements[7];
		var tax_filter=fields.elements[8];
		var total_filter=fields.elements[9];
		var offer_filter=fields.elements[10];
		var id_filter=fields.elements[11];
		var save_button=fields.elements[12];
		var free_product_filter=fields.elements[14];
		var free_product_quantity=fields.elements[15];

		var product_data="<product_master>" +
				"<name></name>" +
				"</product_master>";
		set_my_value_list(product_data,name_filter,function ()
		{
			$(name_filter).focus();
		});

		var add_product=document.getElementById('form119_add_product_'+id);
		$(add_product).on('click',function()
		{
			modal14_action(function()
			{
				var product_data="<product_master>" +
						"<name></name>" +
						"</product_master>";
				set_my_value_list(product_data,name_filter,function ()
				{
					$(name_filter).focus();
				});
			});
		});

		var add_batch=document.getElementById('form119_add_batch_'+id);
		$(add_batch).on('click',function()
		{
			modal22_action(function()
			{
				var batch_data="<product_instances>" +
					"<batch></batch>" +
					"<product_name exact='yes'>"+name_filter.value+"</product_name>" +
					"</product_instances>";
				set_my_value_list(batch_data,batch_filter);
			});
		});

		$(name_filter).on('keydown',function(e)
		{
			if(e.keyCode==118)
			{
				e.preventDefault();
				modal53_action(name_filter.value,customer_name);
			}
			else if(e.keyCode==117)
			{
				e.preventDefault();
				modal54_action(name_filter.value);
			}
		});

		$(save_button).on("click", function(event)
		{
			event.preventDefault();
			form119_create_item(fields);
		});

		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form119_add_item();
		});

		$(name_filter).on('blur',function(event)
		{
			var make_data="<product_master>" +
					"<make></make>" +
					"<name exact='yes'>"+name_filter.value+"</name>" +
					"</product_master>";
			get_single_column_data(function(data)
			{
				if(data.length>0)
				{
					document.getElementById('form119_product_make_'+id).innerHTML=data[0]+":";
				}
			},make_data);

			var batch_data="<product_instances>" +
					"<batch></batch>" +
					"<product_name exact='yes'>"+name_filter.value+"</product_name>" +
					"</product_instances>";
			set_my_value_list(batch_data,batch_filter);

			var last_batch_data="<bill_items count='1'>" +
					"<batch></batch>" +
					"<item_name exact='yes'>"+name_filter.value+"</item_name>" +
					"</bill_items>";
			get_single_column_data(function(data)
			{
				if(data.length>0)
				{
					batch_filter.value=data[0];

					if(bill_type=='undefined' || bill_type=='')
					{
						var price_data="<product_instances count='1'>" +
							"<sale_price></sale_price>" +
							"<batch exact='yes'>"+batch_filter.value+"</batch>" +
							"<product_name exact='yes'>"+name_filter.value+"</product_name>" +
							"</product_instances>";
						set_my_value(price_data,price_filter);
					}
					else
					{
						var price_data="<sale_prices count='1'>" +
								"<sale_price></sale_price>" +
								"<billing_type exact='yes'>"+bill_type+"</billing_type>" +
								"<batch exact='yes'>"+batch_filter.value+"</batch>" +
								"<product_name exact='yes'>"+name_filter.value+"</product_name>" +
								"</sale_prices>";
						set_my_value(price_data,price_filter);
					}
					get_inventory(name_filter.value,batch_filter.value,function(quantity)
					{
						$(squantity_filter).attr('placeholder',quantity);
					});

					var mrp_data="<product_instances count='1'>" +
							"<mrp></mrp>" +
							"<batch exact='yes'>"+batch_filter.value+"</batch>" +
							"<product_name exact='yes'>"+name_filter.value+"</product_name>" +
							"</product_instances>";
					set_my_value(mrp_data,mrp_filter);
				}
			},last_batch_data);

			squantity_filter.value="";
			total_filter.value=0;
			amount_filter.value=0;
			discount_filter.value=0;
			tax_filter.value=0;
			offer_filter.value="";
			free_product_filter.value="";
			free_product_quantity.value="";
		});

		$(batch_filter).on('blur',function(event)
		{
			var exp_data="<product_instances>" +
					"<expiry></expiry>" +
					"<product_name exact='yes'>"+name_filter.value+"</product_name>" +
					"<batch exact='yes'>"+batch_filter.value+"</batch>" +
					"</product_instances>";
			get_single_column_data(function(data)
			{
				if(data.length>0)
				{
					document.getElementById('form119_exp_'+id).innerHTML=get_my_past_date(data[0]);
				}
			},exp_data);

			if(bill_type=='undefined' || bill_type=='')
			{
				var price_data="<product_instances count='1'>" +
						"<sale_price></sale_price>" +
						"<batch exact='yes'>"+batch_filter.value+"</batch>" +
						"<product_name exact='yes'>"+name_filter.value+"</product_name>" +
						"</product_instances>";
				set_my_value(price_data,price_filter);
			}
			else
			{
				var price_data="<sale_prices count='1'>" +
						"<sale_price></sale_price>" +
						"<batch exact='yes'>"+batch_filter.value+"</batch>" +
						"<product_name exact='yes'>"+name_filter.value+"</product_name>" +
						"<billing_type>"+bill_type+"</billing_type>" +
						"</sale_prices>";
				set_my_value(price_data,price_filter);
			}

			var mrp_data="<product_instances count='1'>" +
					"<mrp></mrp>" +
					"<batch exact='yes'>"+batch_filter.value+"</batch>" +
					"<product_name exact='yes'>"+name_filter.value+"</product_name>" +
					"</product_instances>";
			set_my_value(mrp_data,mrp_filter);

			get_inventory(name_filter.value,batch_filter.value,function(quantity)
			{
				$(squantity_filter).attr('placeholder',quantity);
			});

			squantity_filter.value="";
			total_filter.value=0;
			amount_filter.value=0;
			discount_filter.value=0;
			tax_filter.value=0;
			offer_filter.value="";
			free_product_filter.value="";
			free_product_quantity.value="";
		});

		$(squantity_filter).on('blur',function(event)
		{
			var amount=vUtil.round(parseFloat(squantity_filter.value)*parseFloat(price_filter.value),2);
			amount_filter.value=amount;
			var offer_data="<offers>" +
					"<offer_type>product</offer_type>" +
					"<product_name exact='yes'>"+name_filter.value+"</product_name>" +
					"<batch array='yes'>"+batch_filter.value+"--all</batch>" +
					"<criteria_type></criteria_type>" +
					"<criteria_amount></criteria_amount>" +
					"<criteria_quantity></criteria_quantity>" +
					"<result_type></result_type>" +
					"<discount_percent></discount_percent>" +
					"<discount_amount></discount_amount>" +
					"<quantity_add_percent></quantity_add_percent>" +
					"<quantity_add_amount></quantity_add_amount>" +
					"<free_product_name></free_product_name>" +
					"<free_product_quantity></free_product_quantity>" +
					"<offer_detail></offer_detail>" +
					"<status array='yes'>--active--extended--</status>" +
					"</offers>";
			fetch_requested_data('',offer_data,function(offers)
			{
				offers.sort(function(a,b)
				{
					if(a.criteria_amount<b.criteria_amount)
					{	return 1;}
					else if(a.criteria_quantity<b.criteria_quantity)
					{	return 1;}
					else
					{	return -1;}
				});

				for(var i in offers)
				{
					offer_filter.value=offers[i].offer_detail;
					if(offers[i].criteria_type=='min quantity crossed' && parseFloat(offers[i].criteria_quantity)<=parseFloat(squantity_filter.value))
					{
						if(offers[i].result_type=='discount')
						{
							if(offers[i].discount_percent!="" && offers[i].discount_percent!=0 && offers[i].discount_percent!="0")
							{
								discount_filter.value=parseFloat((amount*parseInt(offers[i].discount_percent))/100);
							}
							else
							{
								discount_filter.value=parseFloat(offers[i].discount_amount)*(Math.floor(parseFloat(squantity_filter.value)/parseFloat(offers[i].criteria_quantity)));
							}
						}
						else if(offers[i].result_type=='quantity addition')
						{
							if(offers[i].quantity_add_percent!="" && offers[i].quantity_add_percent!=0 && offers[i].quantity_add_percent!="0")
							{
								fquantity_filter.value=parseFloat(squantity_filter.value)*(1+(parseFloat(offers[i].quantity_add_percent)/100));
							}
							else
							{
								fquantity_filter.value=parseFloat(squantity_filter.value)+(parseFloat(offers[i].quantity_add_amount)*(Math.floor(parseFloat(squantity_filter.value)/parseFloat(offers[i].criteria_quantity))));
							}
						}
						else if(offers[i].result_type=='product free')
						{
							free_product_filter.value=offers[i].free_product_name;
							free_product_quantity.value=parseFloat(offers[i].free_product_quantity)*(Math.floor(parseFloat(squantity_filter.value)/parseFloat(offers[i].criteria_quantity)));
						}
						break;
					}
					else if(offers[i].criteria_type=='min amount crossed' && offers[i].criteria_amount<=amount)
					{
						if(offers[i].result_type=='discount')
						{
							if(offers[i].discount_percent!="" && offers[i].discount_percent!=0 && offers[i].discount_percent!="0")
							{
								discount_filter.value=parseFloat((amount*parseInt(offers[i].discount_percent))/100);
							}
							else
							{
								discount_filter.value=parseFloat(offers[i].discount_amount)*(Math.floor(parseFloat(amount_filter.value)/parseFloat(offers[i].criteria_amount)));
							}
						}
						else if(offers[i].result_type=='quantity addition')
						{
							if(offers[i].quantity_add_percent!="" && offers[i].quantity_add_percent!=0 && offers[i].quantity_add_percent!="0")
							{
								fquantity_filter.value=parseFloat(squantity_filter.value)*(1+(parseFloat(offers[i].quantity_add_percent)/100));
							}
							else
							{
								fquantity_filter.value=parseFloat(squantity_filter.value)+(parseFloat(offers[i].quantity_add_amount)*(Math.floor(parseFloat(amount_filter.value)/parseFloat(offers[i].criteria_amount))));
							}
						}
						else if(offers[i].result_type=='product free')
						{
							free_product_filter.value=offers[i].free_product_name;
							free_product_quantity.value=parseFloat(offers[i].free_product_quantity)*(Math.floor(parseFloat(amount_filter.value)/parseFloat(offers[i].criteria_amount)));
						}
						break;
					}
				}

				var tax_data="<product_master>" +
						"<name exact='yes'>"+name_filter.value+"</name>" +
						"<tax></tax>" +
						"</product_master>";
				fetch_requested_data('',tax_data,function(taxes)
				{
					taxes.forEach(function(tax)
					{
						tax_filter.value=vUtil.round(parseFloat((parseFloat(tax.tax)*(amount-parseFloat(discount_filter.value)))/100),2);
					});

					total_filter.value=vUtil.round((parseFloat(amount_filter.value)+parseFloat(tax_filter.value)-parseFloat(discount_filter.value)),2);
				});
			});
		});
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form Adjust Loyalty Points
 * @formNo 121
 */
function form121_add_item()
{
	if(is_create_access('form121'))
	{
		var rowsHTML="";
		var id=vUtil.newKey();
		rowsHTML+="<tr>";
		rowsHTML+="<form id='form121_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Program Name'>";
				rowsHTML+="<input type='text' form='form121_"+id+"' required value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Customer'>";
				rowsHTML+="<input type='text' form='form121_"+id+"' required value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Points'>";
				rowsHTML+="<input type='number' form='form121_"+id+"' required step='any'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Date'>";
				rowsHTML+="<input type='text' form='form121_"+id+"' required>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Source'>";
				rowsHTML+="<input type='text' form='form121_"+id+"' value='Manual' required>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form121_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='submit' class='save_icon' form='form121_"+id+"' id='save_form121_"+id+"' >";
				rowsHTML+="<input type='button' class='delete_icon' form='form121_"+id+"' id='delete_form121_"+id+"' onclick='$(this).parent().parent().remove();'>";
			rowsHTML+="</td>";
		rowsHTML+="</tr>";

		$('#form121_body').prepend(rowsHTML);

		var fields=document.getElementById("form121_"+id);
		var name_filter=fields.elements[0];
		var customer_filter=fields.elements[1];
		var date_filter=fields.elements[3];

		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form121_create_item(fields);
		});

		var program_data="<loyalty_programs>" +
				"<name></name>" +
				"</loyalty_programs>";
		set_my_value_list(program_data,name_filter,function ()
		{
			$(name_filter).focus();
		});

		var customer_data="<customers>" +
			"<acc_name></acc_name>" +
			"</customers>";
		set_my_value_list(customer_data,customer_filter);
		$(date_filter).datepicker();
	}
	else
	{
		$("#modal2_link").click();
	}
}


/**
 * @form Enter Supplier Bill(unbilled items)
 * @formNo 122
 */
function form122_add_item()
{
	if(is_create_access('form122'))
	{
		var master_form=document.getElementById('form122_master');
		var supplier_name=master_form.elements['supplier'].value;
		var order_id=master_form.elements['order_id'].value;
		var bill_id=master_form.elements['bill_id'].value;
		var total_entries=0;
		$("[id^='save_form122']").each(function(index)
		{
			var subform_id=$(this).attr('form');
			var subform=document.getElementById(subform_id);
			total_entries+=1;
		});
		if(total_entries>0)
		{
			var save_button=master_form.elements['save'];
			$(save_button).click();
		}

		var cst_checked=false;
		if(master_form.elements['cst'].checked)
		{
			cst_checked=true;
		}

		var accepted_readonly="";
		var accepted_editable=get_session_var('grn_item_accept_editable');
		if(accepted_editable=='no')
		{
			accepted_readonly="readonly='readonly'";
		}
		var id=vUtil.newKey();
		var rowsHTML="<tr>";
		rowsHTML+="<form id='form122_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Item'>";
				rowsHTML+="<input type='text' required form='form122_"+id+"'>";
				rowsHTML+="<br><b>SKU</b>: <input type='text' form='form122_"+id+"' required>";
				rowsHTML+="<br><b>Name</b>: <textarea readonly='readonly' form='form122_"+id+"'></textarea>";
				rowsHTML+="<img src='./images/barcode.png' class='barcode_icon' title='Barcode' id='form122_bracode_image_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Batch'>";
				rowsHTML+="<input type='text' form='form122_"+id+"' required>";
				rowsHTML+="<img src='./images/add_image.png' class='add_image' title='Add batch' id='form122_add_batch_"+id+"'>";
				rowsHTML+="<br><b>Quantity</b>: <input type='number' form='form122_"+id+"' value='1' required step='any'>";
				rowsHTML+="<br><b>MRP</b>: <input type='number' form='form122_"+id+"' step='any'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Bill Price'>";
				rowsHTML+="<b>Unit Price</b>: Rs. <input type='number' form='form122_"+id+"' required step='any'>";
				rowsHTML+="<br><b>Amount</b>: Rs. <input type='number' readonly='readonly' form='form122_"+id+"' required step='any'>";
				rowsHTML+="<br><b>Tax</b>: Rs. <input type='number' readonly='readonly' form='form122_"+id+"' required step='any'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='PO Price'>";
				rowsHTML+="<b>Unit Price</b>: Rs. <input type='number' readonly='readonly' form='form122_"+id+"'>";
				rowsHTML+="<br><b>Amount</b>: Rs. <input type='number' readonly='readonly' form='form122_"+id+"'>";
				rowsHTML+="<br><b>Tax</b>: Rs. <input type='number' readonly='readonly' form='form122_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Check'>";
				rowsHTML+="<input type='text' form='form122_"+id+"' "+accepted_readonly+" value='accepted' required>";
				rowsHTML+=" <img id='form122_check_image_"+id+"' src='./images/green_circle.png' class='green_circle'>";
				rowsHTML+="<br><b>Comments</b>: <textarea form='form122_"+id+"'></textarea>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form122_"+id+"' name='storage'>";
				rowsHTML+="<input type='hidden' form='form122_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='button' class='submit_hidden' form='form122_"+id+"' id='save_form122_"+id+"' >";
				rowsHTML+="<input type='button' class='delete_icon' form='form122_"+id+"' id='delete_form122_"+id+"' onclick='$(this).parent().parent().remove();'>";
				rowsHTML+="<input type='submit' class='submit_hidden' form='form122_"+id+"'>";
				rowsHTML+="<input type='hidden' form='form122_"+id+"' name='tax_unit'>";
				rowsHTML+="<input type='hidden' form='form122_"+id+"' name='unbilled' value='no'>";
				rowsHTML+="<input type='hidden' form='form122_"+id+"' name='supplier_margin'>";
				rowsHTML+="<input type='hidden' form='form122_"+id+"' name='po_tax_rate'>";
			rowsHTML+="</td>";
		rowsHTML+="</tr>";

		$('#form122_body').prepend(rowsHTML);

		var fields=document.getElementById("form122_"+id);
		var barcode_filter=fields.elements[0];
		var name_filter=fields.elements[1];
		var desc_filter=fields.elements[2];
		var batch_filter=fields.elements[3];
		var quantity_filter=fields.elements[4];
		var mrp_filter=fields.elements[5];
		var unit_filter=fields.elements[6];
		var amount_filter=fields.elements[7];
		var tax_filter=fields.elements[8];
		var po_unit_filter=fields.elements[9];
		var po_amount_filter=fields.elements[10];
		var po_tax_filter=fields.elements[11];
		var qc_filter=fields.elements[12];
		var qc_comments_filter=fields.elements[13];
		var storage_filter=fields.elements[14];
		var save_button=fields.elements[16];
		var tax_unit_filter=fields.elements[19];
		var margin_filter=fields.elements[21];
		var po_tax_rate_filter=fields.elements[22];
		var qc_image=document.getElementById('form122_check_image_'+id);

		$(barcode_filter).focus();

		$(save_button).on("click", function(event)
		{
			event.preventDefault();
			form122_create_item(fields);
		});

		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form122_add_item();
		});

		set_static_value_list('supplier_bill_items','qc',qc_filter);

		var products_data="<product_master>" +
			"<name></name>" +
			"</product_master>";
		set_my_value_list(products_data,name_filter);

		var add_batch=document.getElementById('form122_add_batch_'+id);
		$(add_batch).on('click',function()
		{
			modal120_action(function()
			{
				var batch_data="<product_instances>" +
					"<batch></batch>" +
					"<product_name exact='yes'>"+name_filter.value+"</product_name>" +
					"</product_instances>";
				set_my_value_list(batch_data,batch_filter);
			},name_filter.value);
		});

		$(barcode_filter).on('blur',function()
		{
			if(barcode_filter.value!="" && barcode_filter.value!=null)
			{
				var item_data="<product_master>"+
							"<name></name>"+
							"<bar_code exact='yes'>"+barcode_filter.value+"</bar_code>"+
							"</product_master>";
				get_single_column_data(function (products)
				{
					if(products.length>0)
					{
						name_filter.value=products[0];
						$(name_filter).trigger('blur');
						$(batch_filter).focus();
					}
					else
					{
						modal116_action(barcode_filter.value);
						//$(barcode_filter).focus();
					}
				},item_data);
			}
		});

		$(barcode_filter).on('keydown',function (event)
		{
			if(event.keyCode == 13 )
			{
				event.preventDefault();
				$(barcode_filter).trigger('blur');
			}
		});

		$(qc_filter).on('blur',function(event)
		{
			if(qc_filter.value=='accepted')
			{
				qc_image.setAttribute('src','./images/green_circle.png');
				qc_image.setAttribute('class','green_circle');
			}
			else
			{
				qc_image.setAttribute('src','./images/red_circle.png');
				qc_image.setAttribute('class','red_circle');
			}
		});

		var smaller_barcodes=get_session_var('brands_small_barcode');
		$(name_filter).on('blur',function(event)
		{
			var po_item_data="<purchase_order_items>"+
							"<item_name exact='yes'>"+name_filter.value+"</item_name>"+
							"<quantity></quantity>"+
							"<price></price>"+
							"<amount></amount>"+
							"<tax></tax>"+
							"<tax_rate></tax_rate>"+
							"<order_id exact='yes'>"+order_id+"</order_id>"+
							"</purchase_order_items>";
			fetch_requested_data('',po_item_data,function(po_items)
			{
				if(po_items.length>0)
				{
					po_unit_filter.value=po_items[0].price;
					po_amount_filter.value=po_items[0].price;
					po_tax_rate_filter.value=po_items[0].tax_rate;
					po_tax_filter.value=parseFloat(po_items[0].tax_rate)*parseFloat(po_items[0].price)/100;
				}
				else
				{
					qc_filter.value='rejected';
					qc_comments_filter.value=qc_comments_filter.value+'\nThis item was not in purchase order';
					qc_image.setAttribute('src','./images/red_circle.png');
					qc_image.setAttribute('class','red_circle');
				}
			});

			var desc_data="<product_master>" +
				"<id></id>"+
				"<description></description>" +
				"<bar_code></bar_code>"+
				"<make></make>"+
				"<name exact='yes'>"+name_filter.value+"</name>" +
				"</product_master>";
			set_my_value(desc_data,desc_filter);
			fetch_requested_data('',desc_data,function(descriptions)
			{
				if(descriptions.length>0)
				{
					desc_filter.value=descriptions[0].description;
					if(descriptions[0].bar_code!="" && descriptions[0].bar_code!="null")
					{
						var barcode_image=document.getElementById('form122_bracode_image_'+id);
						$(barcode_image).off('click');
						$(barcode_image).on('click',function()
						{
							if(smaller_barcodes!=null && smaller_barcodes.indexOf(descriptions[0].make)>-1)
							{
								print_smaller_product_barcode(descriptions[0].bar_code,name_filter.value,desc_filter.value);
							}
							else
							{
								print_product_barcode(descriptions[0].bar_code,name_filter.value,desc_filter.value);
							}
						});
						barcode_filter.value=descriptions[0].bar_code;
					}
					else
					{
						var barcode_image=document.getElementById('form122_bracode_image_'+id);
						$(barcode_image).on('click',function()
						{
							modal139_action(descriptions[0].id,name_filter.value,desc_filter.value,$(this));
						});
					}
				}
			});
			var batch_data="<product_instances>" +
				"<batch></batch>" +
				"<product_name exact='yes'>"+name_filter.value+"</product_name>" +
				"</product_instances>";
			set_my_value_list(batch_data,batch_filter);

			if(cst_checked)
			{
				tax_unit_filter.value=get_session_var('cst_rate');
			}
			else
			{
				var tax_unit_data="<product_master>"+
								"<tax></tax>"+
								"<name exact='yes'>"+name_filter.value+"</name>"+
								"</product_master>";
				set_my_value(tax_unit_data,tax_unit_filter);
			}

			var last_batch_data="<supplier_bill_items count='1'>" +
					"<batch></batch>" +
					"<storage></storage>"+
					"<product_name exact='yes'>"+name_filter.value+"</product_name>" +
					"</supplier_bill_items>";
			fetch_requested_data('',last_batch_data,function(data)
			{
				if(data.length>0)
				{
					batch_filter.value=data[0].batch;
					/*
					var its_storage_data="<area_utilization>"+
							"<name></name>"+
							"<item_name exact='yes'>"+name_filter.value+"</item_name>"+
							"<batch exact='yes'>"+batch_filter.value+"</batch>"+
							"</area_utilization>";

					set_my_value(its_storage_data,storage_filter);
					*/
					var mrp_data="<product_instances>"+
						"<mrp></mrp>"+
						"<expiry></expiry>"+
						"<product_name exact='yes'>"+name_filter.value+"</product_name>"+
						"<batch exact='yes'>"+batch_filter.value+"</batch>"+
						"</product_instances>";
					fetch_requested_data('',mrp_data,function(mrps)
					{
						if(mrps.length>0)
						{
							mrp_filter.value=parseFloat(mrps[0].mrp);
							var expiry_time=parseFloat(mrps[0].expiry);
							var expiry_period=expiry_time-parseFloat(get_my_time());
							if(expiry_period<(86400000*45) && expiry_time!=0 && !isNaN(expiry_time))
							{
								qc_filter.value='rejected';
								qc_comments_filter.value=qc_comments_filter.value+'\nExpiry is less than 45 days';
								qc_image.setAttribute('src','./images/red_circle.png');
								qc_image.setAttribute('class','red_circle');
							}
						}

						var margin_data="<supplier_item_mapping>" +
									"<margin></margin>"+
									"<supplier_sku></supplier_sku>"+
									"<supplier exact='yes'>"+supplier_name+"</supplier>" +
									"<item exact='yes'>"+name_filter.value+"</item>"+
									"</supplier_item_mapping>";
						fetch_requested_data('',margin_data,function(margins)
						{
							if(margins.length>0)
							{
								margin_filter.value=margins[0].margin;
								unit_filter.value=vUtil.round((parseFloat(mrp_filter.value)*(100-parseFloat(margins[0].margin))/100),2);
								amount_filter.value=Math.round(parseFloat(quantity_filter.value)*parseFloat(unit_filter.value));
								tax_filter.value=Math.round(parseFloat(amount_filter.value)*(parseFloat(tax_unit_filter.value)/100));
								//total_filter.value=Math.round(parseFloat(amount_filter.value)+parseFloat(tax_filter.value));
							}
							else
							{
								unit_filter.value="";
								amount_filter.value="";
								tax_filter.value="";
								//total_filter.value="";
							}
						});
					});
				}
			});
		});

		$(batch_filter).on('blur',function(event)
		{
			/*
			var its_storage_data="<area_utilization>"+
							"<name></name>"+
							"<item_name exact='yes'>"+name_filter.value+"</item_name>"+
							"<batch exact='yes'>"+batch_filter.value+"</batch>"+
							"</area_utilization>";
			set_my_value(its_storage_data,storage_filter);
			*/
			var mrp_data="<product_instances>"+
				"<mrp></mrp>"+
				"<expiry></expiry>"+
				"<product_name exact='yes'>"+name_filter.value+"</product_name>"+
				"<batch exact='yes'>"+batch_filter.value+"</batch>"+
				"</product_instances>";
			fetch_requested_data('',mrp_data,function(mrps)
			{
				var mrp_price=0;
				if(mrps.length>0)
				{
					mrp_filter.value=parseFloat(mrps[0].mrp);
					var expiry_time=parseFloat(mrps[0].expiry);
					var expiry_period=expiry_time-parseFloat(get_my_time());
					if(expiry_period<(86400000*45) && expiry_time!=0 && !isNaN(expiry_time))
					{
						qc_filter.value='rejected';
						qc_comments_filter.value=qc_comments_filter.value+'\nExpiry is less than 45 days';
						qc_image.setAttribute('src','./images/red_circle.png');
						qc_image.setAttribute('class','red_circle');
					}
				}

				var margin_data="<supplier_item_mapping>" +
							"<margin></margin>"+
							"<supplier_sku></supplier_sku>"+
							"<supplier exact='yes'>"+supplier_name+"</supplier>" +
							"<item exact='yes'>"+name_filter.value+"</item>"+
							"</supplier_item_mapping>";
				fetch_requested_data('',margin_data,function(margins)
				{
					if(margins.length>0)
					{
						margin_filter.value=margins[0].margin;
						unit_filter.value=vUtil.round((parseFloat(mrp_filter.value)*(100-parseFloat(margins[0].margin))/100),2);
						amount_filter.value=Math.round(parseFloat(quantity_filter.value)*parseFloat(unit_filter.value));
						tax_filter.value=Math.round(parseFloat(amount_filter.value)*(parseFloat(tax_unit_filter.value)/100));
						//total_filter.value=Math.round(parseFloat(amount_filter.value)+parseFloat(tax_filter.value));
					}
					else
					{
						unit_filter.value="";
						amount_filter.value="";
						tax_filter.value="";
						//total_filter.value="";
					}
				});
			});
		});

		$(quantity_filter).on('blur',function ()
		{
			amount_filter.value=vUtil.round((parseFloat(quantity_filter.value)*parseFloat(unit_filter.value)),2);
			tax_filter.value=vUtil.round((parseFloat(amount_filter.value)*parseFloat(tax_unit_filter.value)/100),2);

			po_amount_filter.value=parseFloat(po_unit_filter.value)*parseFloat(quantity_filter.value);
			po_tax_filter.value=parseFloat(po_tax_rate_filter.value)*parseFloat(po_amount_filter.value)/100;

			var order_data="<purchase_orders>"+
				"<id>"+order_id+"</id>"+
				"<status array='yes'>--order placed--partially received--</status>"+
				"<bill_id></bill_id>"+
				"</purchase_orders>";

			fetch_requested_data('',order_data,function(pos)
			{
				var bill_id_string='--'+bill_id+"--";
				for(var i in pos)
				{
					bill_id_string+=pos[i].bill_id+"--";
				}

				var po_item_data="<purchase_order_items>"+
								"<item_name exact='yes'>"+name_filter.value+"</item_name>"+
								"<quantity></quantity>"+
								"<order_id exact='yes'>"+order_id+"</order_id>"+
								"</purchase_order_items>";
				fetch_requested_data('',po_item_data,function(po_items)
				{
					var total_order_item_quantity=0;
					for(var i in po_items)
					{
						total_order_item_quantity+=parseFloat(po_items[i].quantity);
					}

					var bill_item_data="<supplier_bill_items>"+
									"<quantity></quantity>"+
									"<bill_id array='yes'>"+bill_id_string+"</bill_id>"+
									"<qc exact='yes'>accepted</qc>"+
									"<product_name exact='yes'>"+name_filter.value+"</product_name>"+
									"</supplier_bill_items>";
					fetch_requested_data('',bill_item_data,function (bill_items)
					{
						var bill_quantity=0;
						for(var j in bill_items)
						{
							bill_quantity+=parseFloat(bill_items[j].quantity);
						}
						if(parseFloat(quantity_filter.value)>(total_order_item_quantity-bill_quantity))
						{
							qc_comments_filter.value=qc_comments_filter.value+'\nBill quantity is greater than the ordered quantity';
						}
					});
				});
			});
		});

		$(unit_filter).on('blur',function ()
		{
			amount_filter.value=vUtil.round((parseFloat(quantity_filter.value)*parseFloat(unit_filter.value)),2);
			tax_filter.value=vUtil.round((parseFloat(amount_filter.value)*parseFloat(tax_unit_filter.value)/100),2);

			var new_margin=100*(1-(parseFloat(unit_filter.value)/(parseFloat(mrp_filter.value)*(1-(parseFloat(tax_unit_filter.value))/100))));
			if(new_margin>parseFloat(margin_filter.value))
			{
				qc_filter.value='rejected';
				qc_comments_filter.value=qc_comments_filter.value+'\nSupplier margin is higher';
				qc_image.setAttribute('src','./images/red_circle.png');
				qc_image.setAttribute('class','red_circle');
			}
		});

		$('textarea').autosize();

	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form Enter Supplier Bill(unbilled items)
 * @formNo 122
 */
 /*
function form122_add_item()
{
	if(is_create_access('form122'))
	{
		var master_form=document.getElementById('form122_master');
		var supplier_name=master_form.elements['supplier'].value;
		var order_id=master_form.elements['order_id'].value;

		var id=vUtil.newKey();
		var rowsHTML="<tr>";
		rowsHTML+="<form id='form122_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Item'>";
				rowsHTML+="<input type='text' form='form122_"+id+"'>";
				rowsHTML+="<img src='./images/add_image.png' class='add_image' title='Add new item' id='form122_add_product_"+id+"'>";
				rowsHTML+="<br>SKU: <input type='text' form='form122_"+id+"' required>";
				rowsHTML+="<br>Name: <input type='text' readonly='readonly' form='form122_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Batch'>";
				rowsHTML+="<input type='text' form='form122_"+id+"' required>";
				rowsHTML+="<img src='./images/add_image.png' class='add_image' title='Add batch' id='form122_add_batch_"+id+"'>";
				rowsHTML+="<br>Quantity: <input type='number' form='form122_"+id+"' value='1' required step='any'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Amount'>";
				rowsHTML+="Unit Price: Rs. <input type='number' form='form122_"+id+"' required step='any'>";
				rowsHTML+="<br>Amount: Rs. <input type='number' readonly='readonly' form='form122_"+id+"' required step='any'>";
				rowsHTML+="<br>Tax: Rs. <input type='number' readonly='readonly' form='form122_"+id+"' required step='any'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Storage'>";
				rowsHTML+="<input type='text' form='form122_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Check'>";
				rowsHTML+="<input type='text' form='form122_"+id+"'>";
				rowsHTML+=" <img src='./images/green_circle.png' class='green_circle'>";
				rowsHTML+="<br>Comments: <textarea form='form122_"+id+"' readonly='readonly'></textarea>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form122_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='button' class='submit_hidden' form='form122_"+id+"' id='save_form122_"+id+"' >";
				rowsHTML+="<input type='button' class='delete_icon' form='form122_"+id+"' id='delete_form122_"+id+"' onclick='$(this).parent().parent().remove();'>";
				rowsHTML+="<input type='submit' class='submit_hidden' form='form122_"+id+"'>";
				rowsHTML+="<input type='hidden' form='form122_"+id+"' name='tax_unit'>";
				rowsHTML+="<input type='hidden' form='form122_"+id+"' name='unbilled' value='no'>";
			rowsHTML+="</td>";
		rowsHTML+="</tr>";

		$('#form122_body').prepend(rowsHTML);

		var fields=document.getElementById("form122_"+id);
		var barcode_filter=fields.elements[0];
		var name_filter=fields.elements[1];
		var desc_filter=fields.elements[2];
		var batch_filter=fields.elements[3];
		var quantity_filter=fields.elements[4];
		var unit_filter=fields.elements[5];
		var amount_filter=fields.elements[6];
		var tax_filter=fields.elements[7];
		var storage_filter=fields.elements[8];
		var qc_filter=fields.elements[9];
		var qc_comments_filter=fields.elements[10];
		var save_button=fields.elements[12];
		var tax_unit_filter=fields.elements[15];

		$(barcode_filter).focus();

		$(save_button).on("click", function(event)
		{
			event.preventDefault();
			form122_create_item(fields);
		});

		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form122_add_item();
		});

		var add_product=document.getElementById('form122_add_product_'+id);

		if(order_id!='' && order_id!='undefined')
		{
			var products_data="<purchase_order_items>" +
				"<item_name></item_name>" +
				"<order_id exact='yes'>"+order_id+"</order_id>"+
				"</purchase_order_items>";
			set_my_value_list(products_data,name_filter);

			$(add_product).hide();
		}
		else
		{
			var products_data="<product_master>" +
				"<name></name>" +
				"</product_master>";
			set_my_value_list(products_data,name_filter);

			$(add_product).on('click',function()
			{
				modal122_action(function()
				{
					var products_data="<product_master>" +
						"<name></name>" +
						"</product_master>";
					set_my_value_list(products_data,name_filter);
				});
			});
		}

		var add_batch=document.getElementById('form122_add_batch_'+id);
		$(add_batch).on('click',function()
		{
			modal120_action(function()
			{
				var batch_data="<product_instances>" +
					"<batch></batch>" +
					"<product_name exact='yes'>"+name_filter.value+"</product_name>" +
					"</product_instances>";
				set_my_value_list(batch_data,batch_filter);
			},name_filter.value);
		});

		var storage_data="<store_areas>"+
						"<name></name>"+
						//"<area_type exact='yes'>"+get_session_var('storage_level')+"</area_type>"+
						"<area_type></area_type>"+
						"</store_areas>";
		set_my_value_list(storage_data,storage_filter);

		$(barcode_filter).on('blur',function()
		{
			var item_data="<product_master>"+
						"<name></name>"+
						"<bar_code exact='yes'>"+barcode_filter.value+"</bar_code>"+
						"</product_master>";
			set_my_value(item_data,name_filter,function ()
			{
				$(name_filter).trigger('blur');
			});
			$(batch_filter).focus();
		});

		$(barcode_filter).on('keydown',function (event)
		{
			if(event.keyCode == 13 )
			{
				event.preventDefault();
				$(barcode_filter).trigger('blur');
			}
		});

		$(name_filter).on('blur',function(event)
		{
			var desc_data="<product_master>" +
				"<description></description>" +
				"<name exact='yes'>"+name_filter.value+"</name>" +
				"</product_master>";
			set_my_value(desc_data,desc_filter);

			var batch_data="<product_instances>" +
				"<batch></batch>" +
				"<product_name exact='yes'>"+name_filter.value+"</product_name>" +
				"</product_instances>";
			set_my_value_list(batch_data,batch_filter);

			var tax_unit_data="<product_master>"+
							"<tax></tax>"+
							"<name exact='yes'>"+name_filter.value+"</name>"+
							"</product_master>";
			set_my_value(tax_unit_data,tax_unit_filter);

			var last_batch_data="<supplier_bill_items count='1'>" +
					"<batch></batch>" +
					"<product_name exact='yes'>"+name_filter.value+"</product_name>" +
					"</supplier_bill_items>";
			get_single_column_data(function(data)
			{
				if(data.length>0)
				{
					batch_filter.value=data[0];

					var its_storage_data="<supplier_bill_items>"+
							"<storage></storage>"+
							"<product_name exact='yes'>"+name_filter.value+"</product_name>"+
							"<batch exact='yes'>"+batch_filter.value+"</batch>"+
							"</supplier_bill_items>";
					set_my_value(its_storage_data,storage_filter);

					var mrp_data="<product_instances>"+
						"<mrp></mrp>"+
						"<product_name exact='yes'>"+name_filter.value+"</product_name>"+
						"<batch exact='yes'>"+batch_filter.value+"</batch>"+
						"</product_instances>";
					get_single_column_data(function(mrps)
					{
						var mrp_price=0;
						if(mrps.length>0)
						{
							mrp_price=parseFloat(mrps[0]);
						}

						var margin_data="<attributes>" +
									"<value></value>"+
									"<type exact='yes'>supplier</type>"+
									"<attribute exact='yes'>Margin</attribute>" +
									"<name exact='yes'>"+supplier_name+"</name>" +
									"</attributes>";
						get_single_column_data(function(margins)
						{
							if(margins.length>0)
							{
								var tax_factor=(100-parseFloat(tax_unit_filter.value))/100;
								unit_filter.value=vUtil.round(tax_factor*(mrp_price*(100-parseFloat(margins[0]))/100),2);
								amount_filter.value=vUtil.round((parseFloat(quantity_filter.value)*parseFloat(unit_filter.value)),2);
								tax_filter.value=vUtil.round((parseFloat(amount_filter.value)*parseFloat(tax_unit_filter.value)/100),2);
							}
						},margin_data);
					},mrp_data);

				}
			},last_batch_data);

		});

		$(batch_filter).on('blur',function(event)
		{
			var its_storage_data="<supplier_bill_items>"+
							"<storage></storage>"+
							"<product_name exact='yes'>"+name_filter.value+"</product_name>"+
							"<batch exact='yes'>"+batch_filter.value+"</batch>"+
							"</supplier_bill_items>";
			set_my_value(its_storage_data,storage_filter);

			var mrp_data="<product_instances>"+
						"<mrp></mrp>"+
						"<product_name exact='yes'>"+name_filter.value+"</product_name>"+
						"<batch exact='yes'>"+batch_filter.value+"</batch>"+
						"</product_instances>";
			get_single_column_data(function(mrps)
			{
				var mrp_price=0;
				if(mrps.length>0)
				{
					mrp_price=parseFloat(mrps[0]);
				}

				var margin_data="<attributes>" +
							"<value></value>"+
							"<type exact='yes'>supplier</type>"+
							"<attribute exact='yes'>Margin</attribute>" +
							"<name exact='yes'>"+supplier_name+"</name>" +
							"</attributes>";
				get_single_column_data(function(margins)
				{
					if(margins.length>0)
					{
						var tax_factor=(100-parseFloat(tax_unit_filter.value))/100;
						unit_filter.value=vUtil.round(tax_factor*(mrp_price*(100-parseFloat(margins[0]))/100),2);
						amount_filter.value=vUtil.round((parseFloat(quantity_filter.value)*parseFloat(unit_filter.value)),2);
						tax_filter.value=vUtil.round((parseFloat(amount_filter.value)*parseFloat(tax_unit_filter.value)/100),2);
					}
				},margin_data);
			},mrp_data);
		});

		$(quantity_filter).add(unit_filter).on('blur',function ()
		{
			amount_filter.value=vUtil.round((parseFloat(quantity_filter.value)*parseFloat(unit_filter.value)),2);
			tax_filter.value=vUtil.round((parseFloat(amount_filter.value)*parseFloat(tax_unit_filter.value)/100),2);
		});
	}
	else
	{
		$("#modal2_link").click();
	}
}
*/


/**
 * @form Customer Accounts
 * @formNo 125
 */
function form125_add_item()
{
	if(is_create_access('form125'))
	{
		var rowsHTML="";
		var id=vUtil.newKey();
		rowsHTML+="<tr>";
		rowsHTML+="<form id='form125_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Customer'>";
				rowsHTML+="<input type='text' form='form125_"+id+"' required>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Username'>";
				rowsHTML+="<input type='text' form='form125_"+id+"' required>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Password'>";
				rowsHTML+="<input type='password' form='form125_"+id+"' required>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Status'>";
				rowsHTML+="<input type='text' form='form125_"+id+"' required>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form125_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='submit' class='save_icon' form='form125_"+id+"' >";
				rowsHTML+="<input type='button' class='delete_icon' form='form125_"+id+"' onclick='$(this).parent().parent().remove();'>";
			rowsHTML+="</td>";
		rowsHTML+="</tr>";

		$('#form125_body').prepend(rowsHTML);
		var fields=document.getElementById("form125_"+id);
		var customer_filter=fields.elements[0];
		var username_filter=fields.elements[1];
		var status_filter=fields.elements[3];

		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form125_create_item(fields);
		});

		var customer_data="<customers>"+
								"<acc_name></acc_name>"+
								"</customers>";
		set_my_value_list(customer_data,customer_filter,function ()
		{
			$(customer_filter).focus();
		});
		set_static_value_list('accounts','status',status_filter);

	}
	else
	{
		$("#modal2_link").click();
	}
}


/**
 * @form New Bill
 * @formNo 130
 */
function form130_add_product()
{
	if(is_create_access('form130'))
	{
		var rowsHTML="";
		var id=vUtil.newKey();
		rowsHTML+="<tr>";
		rowsHTML+="<form id='form130_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Item Name'>";
				rowsHTML+="<input type='text' required form='form130_"+id+"'>";
				rowsHTML+="<img src='./images/add_image.png' class='add_image' title='Add new product' id='form130_add_product_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Batch'>";
				rowsHTML+="<input type='text' required form='form130_"+id+"'>";
				rowsHTML+="<img src='./images/add_image.png' class='add_image' title='Add new batch' id='form130_add_batch_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Quantity'>";
				rowsHTML+="<input type='number' required form='form130_"+id+"' step='any'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Unit Price'>";
				rowsHTML+="<input type='number' required form='form130_"+id+"' step='any'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Total'>";
				rowsHTML+="<input type='number' required form='form130_"+id+"' step='any'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form130_"+id+"'>";
				rowsHTML+="<input type='hidden' form='form130_"+id+"'>";
				rowsHTML+="<input type='hidden' form='form130_"+id+"'>";
				rowsHTML+="<input type='hidden' form='form130_"+id+"'>";
				rowsHTML+="<input type='hidden' form='form130_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='button' class='submit_hidden' form='form130_"+id+"' id='save_form130_"+id+"' >";
				rowsHTML+="<input type='button' class='delete_icon' form='form130_"+id+"' id='delete_form130_"+id+"' onclick='$(this).parent().parent().remove();'>";
				rowsHTML+="<input type='hidden' form='form130_"+id+"'>";
				rowsHTML+="<input type='hidden' form='form130_"+id+"'>";
				rowsHTML+="<input type='hidden' form='form130_"+id+"'>";
				rowsHTML+="<input type='submit' class='submit_hidden' form='form130_"+id+"'>";
			rowsHTML+="</td>";
		rowsHTML+="</tr>";

		$('#form130_body').prepend(rowsHTML);

		var fields=document.getElementById("form130_"+id);
		var name_filter=fields.elements[0];
		var batch_filter=fields.elements[1];
		var quantity_filter=fields.elements[2];
		var price_filter=fields.elements[3];
		var total_filter=fields.elements[4];
		var amount_filter=fields.elements[5];
		var discount_filter=fields.elements[6];
		var tax_filter=fields.elements[7];
		var offer_filter=fields.elements[8];
		var id_filter=fields.elements[9];
		var save_button=fields.elements[10];
		var free_product_filter=fields.elements[12];
		var free_product_quantity=fields.elements[13];
		var free_service_filter=fields.elements[14];

		$(save_button).on("click", function(event)
		{
			event.preventDefault();
			form130_create_item(fields);
		});

		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form130_add_product();
		});

		var product_data="<product_master>" +
				"<name></name>" +
				"</product_master>";
		set_my_value_list(product_data,name_filter,function ()
		{
			$(name_filter).focus();
		});

		var add_product=document.getElementById('form130_add_product_'+id);
		$(add_product).on('click',function()
		{
			modal14_action(function()
			{
				var product_data="<product_master>" +
						"<name></name>" +
						"</product_master>";
				set_my_value_list(product_data,name_filter,function ()
				{
					$(name_filter).focus();
				});
			});
		});

		var add_batch=document.getElementById('form130_add_batch_'+id);
		$(add_batch).on('click',function()
		{
			modal22_action(function()
			{
				var batch_data="<product_instances>" +
					"<batch></batch>" +
					"<product_name exact='yes'>"+name_filter.value+"</product_name>" +
					"</product_instances>";
				set_my_value_list(batch_data,batch_filter);
			});
		});

		$(name_filter).on('blur',function(event)
		{
			var batch_data="<product_instances>" +
					"<batch></batch>" +
					"<product_name exact='yes'>"+name_filter.value+"</product_name>" +
					"</product_instances>";
			set_my_value_list(batch_data,batch_filter);

			var last_batch_data="<bill_items count='1'>" +
					"<batch></batch>" +
					"<item_name exact='yes'>"+name_filter.value+"</item_name>" +
					"</bill_items>";
			get_single_column_data(function(data)
			{
				if(data.length>0)
				{
					batch_filter.value=data[0];


					var price_data="<product_instances count='1'>" +
							"<sale_price></sale_price>" +
							"<batch exact='yes'>"+batch_filter.value+"</batch>" +
							"<product_name exact='yes'>"+name_filter.value+"</product_name>" +
							"</product_instances>";
					set_my_value(price_data,price_filter);

					get_inventory(name_filter.value,batch_filter.value,function(quantity)
					{
						//$(quantity_filter).attr('max',quantity);
						$(quantity_filter).attr('min',"0");
						$(quantity_filter).attr('placeholder',quantity);
					});
				}
			},last_batch_data);

			quantity_filter.value="";
			total_filter.value=0;
			amount_filter.value=0;
			discount_filter.value=0;
			tax_filter.value=0;
			offer_filter.value="";
			free_product_filter.value="";
			free_product_quantity.value="";
			free_service_filter.value="";
		});

		$(batch_filter).on('blur',function(event){
			var price_data="<product_instances count='1'>" +
					"<sale_price></sale_price>" +
					"<batch exact='yes'>"+batch_filter.value+"</batch>" +
					"<product_name exact='yes'>"+name_filter.value+"</product_name>" +
					"</product_instances>";
			set_my_value(price_data,price_filter);

			get_inventory(name_filter.value,batch_filter.value,function(quantity)
			{
				//$(quantity_filter).attr('max',quantity);
				$(quantity_filter).attr('min',"0");
				$(quantity_filter).attr('placeholder',quantity);
			});

			quantity_filter.value="";
			total_filter.value=0;
			amount_filter.value=0;
			discount_filter.value=0;
			tax_filter.value=0;
			offer_filter.value="";
			free_product_filter.value="";
			free_product_quantity.value="";
			free_service_filter.value="";
		});

		$(quantity_filter).on('blur',function(event)
		{
			var amount=parseFloat(quantity_filter.value)*parseFloat(price_filter.value);
			amount_filter.value=amount;
			var offer_data="<offers>" +
					"<offer_type>product</offer_type>" +
					"<product_name exact='yes'>"+name_filter.value+"</product_name>" +
					"<batch array='yes'>"+batch_filter.value+"--all</batch>" +
					"<criteria_type></criteria_type>" +
					"<criteria_amount></criteria_amount>" +
					"<criteria_quantity></criteria_quantity>" +
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
					else if(a.criteria_quantity<b.criteria_quantity)
					{	return 1;}
					else
					{	return -1;}
				});

				for(var i in offers)
				{
					offer_filter.value=offers[i].offer_detail;
					if(offers[i].criteria_type=='min quantity crossed' && parseFloat(offers[i].criteria_quantity)<=parseFloat(quantity_filter.value))
					{
						if(offers[i].result_type=='discount')
						{
							if(offers[i].discount_percent!="" && offers[i].discount_percent!=0 && offers[i].discount_percent!="0")
							{
								discount_filter.value=parseFloat((amount*parseInt(offers[i].discount_percent))/100);
							}
							else
							{
								discount_filter.value=parseFloat(offers[i].discount_amount)*(Math.floor(parseFloat(quantity_filter.value)/parseFloat(offers[i].criteria_quantity)));
							}
						}
						else if(offers[i].result_type=='quantity addition')
						{
							if(offers[i].quantity_add_percent!="" && offers[i].quantity_add_percent!=0 && offers[i].quantity_add_percent!="0")
							{
								quantity_filter.value=parseFloat(quantity_filter.value)*(1+(parseFloat(offers[i].quantity_add_percent)/100));
							}
							else
							{
								quantity_filter.value=parseFloat(quantity_filter.value)+(parseFloat(offers[i].quantity_add_amount)*(Math.floor(parseFloat(quantity_filter.value)/parseFloat(offers[i].criteria_quantity))));
							}
						}
						else if(offers[i].result_type=='product free')
						{
							free_product_filter.value=offers[i].free_product_name;
							free_product_quantity.value=parseFloat(offers[i].free_product_quantity)*(Math.floor(parseFloat(quantity_filter.value)/parseFloat(offers[i].criteria_quantity)));
						}
						else if(offers[i].result_type=='service free')
						{
							free_service_filter.value=offers[i].free_service_name;
						}
						break;
					}
					else if(offers[i].criteria_type=='min amount crossed' && offers[i].criteria_amount<=amount)
					{
						if(offers[i].result_type=='discount')
						{
							if(offers[i].discount_percent!="" && offers[i].discount_percent!=0 && offers[i].discount_percent!="0")
							{
								discount_filter.value=parseFloat((amount*parseInt(offers[i].discount_percent))/100);
							}
							else
							{
								discount_filter.value=parseFloat(offers[i].discount_amount)*(Math.floor(parseFloat(amount_filter.value)/parseFloat(offers[i].criteria_amount)));
							}
						}
						else if(offers[i].result_type=='quantity addition')
						{
							if(offers[i].quantity_add_percent!="" && offers[i].quantity_add_percent!=0 && offers[i].quantity_add_percent!="0")
							{
								quantity_filter.value=parseFloat(quantity_filter.value)*(1+(parseFloat(offers[i].quantity_add_percent)/100));
							}
							else
							{
								quantity_filter.value=parseFloat(quantity_filter.value)+(parseFloat(offers[i].quantity_add_amount)*(Math.floor(parseFloat(amount_filter.value)/parseFloat(offers[i].criteria_amount))));
							}
						}
						else if(offers[i].result_type=='product free')
						{
							free_product_filter.value=offers[i].free_product_name;
							free_product_quantity.value=parseFloat(offers[i].free_product_quantity)*(Math.floor(parseFloat(amount_filter.value)/parseFloat(offers[i].criteria_amount)));
						}
						else if(offers[i].result_type=='service free')
						{
							free_service_filter.value=offers[i].free_service_name;
						}

						break;
					}
				}

				var tax_data="<product_master>" +
						"<tax></tax>" +
						"<name exact='yes'>"+name_filter.value+"</name>" +
						"</product_master>";
				get_single_column_data(function(taxes)
				{
					taxes.forEach(function(tax)
					{
						tax_filter.value=parseFloat((parseFloat(tax)*(amount-parseFloat(discount_filter.value)))/100);
					});

					total_filter.value=parseFloat(amount_filter.value)+parseFloat(tax_filter.value)-parseFloat(discount_filter.value);
				},tax_data);

			});
		});
	}
	else
	{
		$("#modal2_link").click();
	}
}


/**
 * @form Create Bill
 * @formNo 130
 */
function form130_add_service()
{
	if(is_create_access('form130'))
	{
		var rowsHTML="";
		var id=vUtil.newKey();
		rowsHTML+="<tr>";
		rowsHTML+="<form id='form130_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Name'>";
				rowsHTML+="<input type='text' required form='form130_"+id+"'>";
				rowsHTML+="<img src='./images/add_image.png' class='add_image' title='Add new service' id='form130_add_service_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Person'>";
				rowsHTML+="<input type='text' form='form130_"+id+"'>";
				rowsHTML+="<img src='./images/add_image.png' class='add_image' title='Add new staff' id='form130_add_staff_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Notes'>";
				rowsHTML+="<textarea form='form130_"+id+"'></textarea>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Unit Price'>";
				rowsHTML+="<input type='number' required form='form130_"+id+"' step='any'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Total'>";
				rowsHTML+="<input type='number' required form='form130_"+id+"' step='any'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form130_"+id+"'>";
				rowsHTML+="<input type='hidden' form='form130_"+id+"'>";
				rowsHTML+="<input type='hidden' form='form130_"+id+"'>";
				rowsHTML+="<input type='hidden' form='form130_"+id+"'>";
				rowsHTML+="<input type='hidden' form='form130_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='button' class='submit_hidden' form='form130_"+id+"' id='save_form130_"+id+"' >";
				rowsHTML+="<input type='button' class='delete_icon' form='form130_"+id+"' id='delete_form130_"+id+"' onclick='$(this).parent().parent().remove();'>";
				rowsHTML+="<input type='hidden' form='form130_"+id+"'>";
				rowsHTML+="<input type='hidden' form='form130_"+id+"'>";
				rowsHTML+="<input type='hidden' form='form130_"+id+"'>";
				rowsHTML+="<input type='submit' class='submit_hidden' form='form130_"+id+"'>";
			rowsHTML+="</td>";
		rowsHTML+="</tr>";

		$('#form130_body').prepend(rowsHTML);

		var fields=document.getElementById("form130_"+id);
		var name_filter=fields.elements[0];
		var staff_filter=fields.elements[1];
		var notes_filter=fields.elements[2];
		var price_filter=fields.elements[3];
		var total_filter=fields.elements[4];
		var amount_filter=fields.elements[5];
		var discount_filter=fields.elements[6];
		var tax_filter=fields.elements[7];
		var offer_filter=fields.elements[8];
		var id_filter=fields.elements[9];
		var save_button=fields.elements[10];
		var free_product_filter=fields.elements[12];
		var free_product_quantity=fields.elements[13];
		var free_service_filter=fields.elements[14];

		$(save_button).on("click", function(event)
		{
			event.preventDefault();
			form130_create_item(fields);
		});

		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form130_add_service();
		});

		var service_data="<services>" +
				"<name></name>" +
				"</services>";
		set_my_value_list(service_data,name_filter,function ()
		{
			$(name_filter).focus();
		});

		var staff_data="<staff>" +
				"<acc_name></acc_name>" +
				"<status exact='yes'>active</status>" +
				"</staff>";
		set_my_value_list(staff_data,staff_filter);

		var add_service=document.getElementById('form130_add_service_'+id);
		$(add_service).on('click',function()
		{
			modal20_action(function()
			{
				var service_data="<services>" +
						"<name></name>" +
						"</services>";
				set_my_value_list(service_data,name_filter,function ()
				{
					$(name_filter).focus();
				});
			});
		});

		var add_staff=document.getElementById('form130_add_staff_'+id);
		$(add_staff).on('click',function()
		{
			modal16_action(function()
			{
				var staff_data="<staff>" +
						"<acc_name></acc_name>" +
						"<status exact='yes'>active</status>" +
						"</staff>";
				set_my_value_list(staff_data,staff_filter);
			});
		});

		$(name_filter).on('blur',function(event){
			notes_filter.value="";
			price_filter.value=0;
			total_filter.value=0;
			amount_filter.value=0;
			discount_filter.value=0;
			tax_filter.value=0;
			offer_filter.value="";
			free_product_filter.value="";
			free_product_quantity.value="";
			free_service_filter.value="";

			var price_data="<services>" +
					"<price></price>" +
					"<tax></tax>" +
					"<name exact='yes'>"+name_filter.value+"</name>" +
					"</services>";

			fetch_requested_data('',price_data,function(prices)
			{
				for(var a in prices)
				{
					price_filter.value=prices[a].price;
					var amount=parseFloat(prices[a].price);
					amount_filter.value=amount;
					var offer_data="<offers>" +
							"<offer_type>service</offer_type>" +
							"<criteria_type>min amount crossed</criteria_type>" +
							"<criteria_amount upperbound='yes'>"+amount+"</criteria_amount>" +
							"<service exact='yes'>"+name_filter.value+"</service>" +
							"<result_type></result_type>" +
							"<discount_percent></discount_percent>" +
							"<discount_amount></discount_amount>" +
							"<offer_detail></offer_detail>" +
							"<free_product_name></free_product_name>" +
							"<free_product_quantity></free_product_quantity>" +
							"<free_service_name></free_service_name>" +
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
							offer_filter.value=offers[i].offer_detail;
							if(offers[i].result_type=='discount')
							{
								if(offers[i].discount_percent!="" && offers[i].discount_percent!=0 && offers[i].discount_percent!="0")
								{
									discount_filter.value=parseFloat((amount*parseInt(offers[i].discount_percent))/100);
								}
								else
								{
									discount_filter.value=parseFloat(offers[i].discount_amount)*(Math.floor(parseFloat(amount_filter.value)/parseFloat(offers[i].criteria_amount)));
								}
							}
							else if(offers[i].result_type=='product free')
							{
								free_product_filter.value=offers[i].free_product_name;
								free_product_quantity.value=parseFloat(offers[i].free_product_quantity)*(Math.floor(parseFloat(quantity_filter.value)/parseFloat(offers[i].criteria_quantity)));
							}
							else if(offers[i].result_type=='service free')
							{
								free_service_filter.value=offers[i].free_service_name;
							}
							break;
						}
					});

					tax_filter.value=parseFloat((parseFloat(prices[a].tax)*(amount-parseFloat(discount_filter.value)))/100);
					break;
				}
				total_filter.value=parseFloat(amount_filter.value)+parseFloat(tax_filter.value)-parseFloat(discount_filter.value);
			});
		});
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form Service Dashboard - machine
 * @formNo 134
 */
function form134_add_machine()
{
	if(is_create_access('form134'))
	{
		var id=vUtil.newKey();
		var rowsHTML="<tr>";
		rowsHTML+="<form id='form134_machine_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Machine Type'>";
				rowsHTML+="<input type='text' form='form134_machine_"+id+"' required>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Machine'>";
				rowsHTML+="<input type='text' form='form134_machine_"+id+"' required>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Problem'>";
				rowsHTML+="<textarea form='form134_machine_"+id+"' required></textarea>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Closing Notes'>";
				rowsHTML+="<textarea form='form134_machine_"+id+"'></textarea>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Status'>";
				rowsHTML+="<input type='text' form='form134_machine_"+id+"' value='open' required>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form134_machine_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='submit' class='save_icon' form='form134_machine_"+id+"' >";
				rowsHTML+="<input type='button' class='delete_icon' form='form134_machine_"+id+"' onclick='$(this).parent().parent().remove();'>";
			rowsHTML+="</td>";
		rowsHTML+="</tr>";

		$('#form134_machine_body').prepend(rowsHTML);
		var fields=document.getElementById("form134_machine_"+id);
		var type_filter=fields.elements[0];
		var machine_filter=fields.elements[1];
		var status_filter=fields.elements[4];

		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form134_create_machine(fields);
		});

		set_static_filter('service_request_machines','machine_type',type_filter);
		set_static_filter('service_request_machines','machine',machine_filter);
		set_static_value_list('service_request_machines','status',status_filter);

		$(type_filter).focus();
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form Service Dashboard - team
 * @formNo 134
 */
function form134_add_team()
{
	if(is_create_access('form134'))
	{
		var id=vUtil.newKey();
		var rowsHTML="<tr>";
		rowsHTML+="<form id='form134_team_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Assignee'>";
				rowsHTML+="<input type='text' form='form134_team_"+id+"' required>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Phone'>";
				rowsHTML+="<input type='text' form='form134_team_"+id+"' readonly='readonly'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Email'>";
				rowsHTML+="<textarea form='form134_team_"+id+"' readonly='readonly'></textarea>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form134_team_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='submit' class='save_icon' form='form134_team_"+id+"' >";
				rowsHTML+="<input type='button' class='delete_icon' form='form134_team_"+id+"' onclick='$(this).parent().parent().remove();'>";
			rowsHTML+="</td>";
		rowsHTML+="</tr>";

		$('#form134_team_body').prepend(rowsHTML);
		var fields=document.getElementById("form134_team_"+id);
		var assignee_filter=fields.elements[0];
		var phone_filter=fields.elements[1];
		var email_filter=fields.elements[2];

		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form134_create_team(fields);
		});

		var assignee_data="<staff>"+
							"<acc_name></acc_name>"+
							"</staff>";
		set_my_value_list(assignee_data,assignee_filter,function ()
		{
			$(assignee_filter).focus();
		});

		$(assignee_filter).off('blur');
		$(assignee_filter).on('blur',function ()
		{
			var contact_data="<staff>"+
								"<phone></phone>"+
								"<email></email>"+
								"<acc_name exact='yes'>"+assignee_filter.value+"</acc_name>"+
								"</staff>";
			fetch_requested_data('',contact_data,function(contacts)
			{
				if(contacts.length>0)
				{
					phone_filter.value=contacts[0].phone;
					email_filter.value=contacts[0].email;
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
 * @form Service Dashboard - document
 * @formNo 134
 */
function form134_add_document()
{
	if(is_create_access('form134'))
	{
		var id=vUtil.newKey();
		var rowsHTML="<tr>";
		rowsHTML+="<form id='form134_document_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Document Name'>";
				rowsHTML+="<input type='text' form='form134_document_"+id+"' required>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='File'>";
				rowsHTML+="<a id='form134_document_url_"+id+"'><u>link</u></a><input type='file' form='form134_document_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form134_document_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='submit' class='save_icon' form='form134_document_"+id+"' >";
				rowsHTML+="<input type='button' class='delete_icon' form='form134_document_"+id+"' onclick='$(this).parent().parent().remove();'>";
			rowsHTML+="</td>";
		rowsHTML+="</tr>";

		$('#form134_document_body').prepend(rowsHTML);
		var fields=document.getElementById("form134_document_"+id);
		var name_filter=fields.elements[0];
		var docInfo=document.getElementById('form134_document_url_'+id);
		var fpicture=fields.elements[1];

		fpicture.addEventListener('change',function(evt)
		{
			vFileHandler.document({evt:evt,fsuccess:function(dataURL)
			{
				docInfo.setAttribute('href',dataURL);
			}});
		},false);

		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form134_create_document(fields);
		});

		$(name_filter).focus();
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form Service Dashboard - task
 * @formNo 134
 */
function form134_add_task()
{
	if(is_create_access('form134'))
	{
		var id=vUtil.newKey();
		var rowsHTML="<tr>";
		rowsHTML+="<form id='form134_task_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Task'>";
				rowsHTML+="<textarea form='form134_task_"+id+"'></textarea>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Assignee'>";
				rowsHTML+="<input type='text' form='form134_task_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Due By'>";
				rowsHTML+="<input type='text' form='form134_task_"+id+"' required>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='status'>";
				rowsHTML+="<input type='text' form='form134_task_"+id+"' value='pending'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form134_task_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='submit' class='save_icon' form='form134_task_"+id+"' >";
				rowsHTML+="<input type='button' class='delete_icon' form='form134_task_"+id+"' onclick='$(this).parent().parent().remove();'>";
			rowsHTML+="</td>";
		rowsHTML+="</tr>";

		$('#form134_task_body').prepend(rowsHTML);
		var fields=document.getElementById("form134_task_"+id);
		var desc_filter=fields.elements[0];
		var assignee_filter=fields.elements[1];
		var due_filter=fields.elements[2];
		var status_filter=fields.elements[3];

		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form134_create_task(fields);
		});

		$(desc_filter).focus();

		var assignee_data="<staff>"+
							"<acc_name></acc_name>"+
							"</staff>";
		set_my_value_list(assignee_data,assignee_filter);
		set_static_value_list('task_instances','status',status_filter);
		$(due_filter).datepicker();
	}
	else
	{
		$("#modal2_link").click();
	}
}



/**
 * @form Customer profiling
 * @formNo 139
 */
function form139_add_item()
{
	if(is_create_access('form139'))
	{
		var id=vUtil.newKey();
		var rowsHTML="<tr>";
		rowsHTML+="<form id='form139_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Customer'>";
				rowsHTML+="<input type='text' form='form139_"+id+"' required>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Facility'>";
				rowsHTML+="<textarea form='form139_"+id+"' required></textarea>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Location'>";
				rowsHTML+="<textarea form='form139_"+id+"' required></textarea>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Area'>";
				rowsHTML+="<textarea form='form139_"+id+"'></textarea>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Floors'>";
				rowsHTML+="<input type='number' step='any' form='form139_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form139_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='submit' class='save_icon' form='form139_"+id+"' >";
				rowsHTML+="<input type='button' class='delete_icon' form='form139_"+id+"' onclick='$(this).parent().parent().remove();'>";
			rowsHTML+="</td>";
		rowsHTML+="</tr>";

		$('#form139_body').prepend(rowsHTML);
		var fields=document.getElementById("form139_"+id);
		var customer_filter=fields.elements[0];

		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form139_create_item(fields);
		});

		var person_data="<customers>"+
						"<acc_name></acc_name>"+
						"</customers>";
		set_my_value_list(person_data,customer_filter,function ()
		{
			$(customer_filter).focus();
		});

	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form Supplier profiling
 * @formNo 140
 */
function form140_add_item()
{
	if(is_create_access('form140'))
	{
		var id=vUtil.newKey();
		var rowsHTML="<tr>";
		rowsHTML+="<form id='form140_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Supplier'>";
				rowsHTML+="<input type='text' form='form140_"+id+"' required>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Asset Type'>";
				rowsHTML+="<input type='text' form='form140_"+id+"' required>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Description'>";
				rowsHTML+="<textarea form='form140_"+id+"' required></textarea>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Location'>";
				rowsHTML+="<textarea form='form140_"+id+"' required></textarea>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Notes'>";
				rowsHTML+="<textarea form='form140_"+id+"'></textarea>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form140_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='submit' class='save_icon' form='form140_"+id+"' >";
				rowsHTML+="<input type='button' class='delete_icon' form='form140_"+id+"' onclick='$(this).parent().parent().remove();'>";
			rowsHTML+="</td>";
		rowsHTML+="</tr>";

		$('#form140_body').prepend(rowsHTML);
		var fields=document.getElementById("form140_"+id);
		var supplier_filter=fields.elements[0];
		var type_filter=fields.elements[1];

		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form140_create_item(fields);
		});

		var person_data="<suppliers>"+
						"<acc_name></acc_name>"+
						"</suppliers>";
		set_my_value_list(person_data,supplier_filter,function ()
		{
			$(supplier_filter).focus();
		});

		set_static_value_list('assets','type',type_filter);
	}
	else
	{
		$("#modal2_link").click();
	}
}


/**
 * @form Manufacturing
 * @formNo 146
 */
function form146_add_item()
{
	if(is_create_access('form146'))
	{
		var rowsHTML="";
		var id=vUtil.newKey();
		rowsHTML+="<tr>";
		rowsHTML+="<form id='form146_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Product'>";
				rowsHTML+="<input type='text' form='form146_"+id+"' required value=''>";
				rowsHTML+="<img src='./images/add_image.png' class='add_image' title='Add new product' id='form146_add_product_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Batch'>";
				rowsHTML+="<textarea form='form146_"+id+"' required></textarea>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Quantity'>";
				rowsHTML+="<input type='number' form='form146_"+id+"' step='any' required>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Schedule'>";
				rowsHTML+="<input type='text' form='form146_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Status'>";
				rowsHTML+="<input type='text' readonly='readonly' required form='form146_"+id+"' value='scheduled'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form146_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='submit' class='save_icon' form='form146_"+id+"' title='Save'>";
				rowsHTML+="<input type='button' class='delete_icon' form='form146_"+id+"' title='Delete' onclick='$(this).parent().parent().remove();'>";
				rowsHTML+="<input type='hidden' form='form146_"+id+"'>";
			rowsHTML+="</td>";
		rowsHTML+="</tr>";

		$('#form146_body').prepend(rowsHTML);
		longPressEditable($('.dblclick_editable'));

		var fields=document.getElementById("form146_"+id);
		var product_filter=fields.elements[0];
		var schedule_filter=fields.elements[3];
		var status_filter=fields.elements[4];

		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form146_create_item(fields);
		});

		var products_data="<product_master>" +
			"<name></name>" +
			"</product_master>";
		set_my_value_list(products_data,product_filter,function ()
		{
			$(product_filter).focus();
		});

		var add_product=document.getElementById('form146_add_product_'+id);
		$(add_product).on('click',function()
		{
			modal14_action(function()
			{
				var products_data="<product_master>" +
					"<name></name>" +
					"</product_master>";
				set_my_value_list(product_data,product_filter,function ()
				{
					$(product_filter).focus();
				});
			});
		});

		//set_static_value_list('manufacturing_schedule','status',status_filter);
		$(schedule_filter).datepicker();
	}
	else
	{
		$("#modal2_link").click();
	}
}


/**
 * @form Service Request billing - item
 * @formNo 151
 */
function form151_add_item()
{
	if(is_create_access('form151'))
	{
		var id=vUtil.newKey();
		var rowsHTML="<tr>";
		rowsHTML+="<form id='form151_item_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Item Name'>";
				rowsHTML+="<input type='text' form='form151_item_"+id+"' required>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Quantity'>";
				rowsHTML+="<input type='number' form='form151_item_"+id+"' min='0' required>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Amount'>";
				rowsHTML+="Estimated Rs. <input type='number' form='form151_item_"+id+"' min='0' readonly='readonly'>";
				rowsHTML+="<br>Actual Rs. <input type='number' form='form151_item_"+id+"' min='0'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Status'>";
				rowsHTML+="<input type='text' form='form151_item_"+id+"' readonly='readonly' value='requested'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form151_item_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='submit' class='save_icon' form='form151_item_"+id+"' >";
				rowsHTML+="<input type='button' class='delete_icon' form='form151_item_"+id+"' onclick='$(this).parent().parent().remove();'>";
				rowsHTML+="<input type='hidden' form='form151_item_"+id+"' value='"+id+"' name='price'>";
			rowsHTML+="</td>";
		rowsHTML+="</tr>";

		$('#form151_item_body').prepend(rowsHTML);
		var fields=document.getElementById("form151_item_"+id);
		var item_filter=fields.elements[0];
		var quantity_filter=fields.elements[1];
		var est_filter=fields.elements[2];
		var amount_filter=fields.elements[3];
		var status_filter=fields.elements[4];
		var price_filter=fields.elements[8];

		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form151_create_item(fields);
		});

		var item_data="<product_master>"+
					"<name></name>"+
					"</product_master>";
		set_my_value_list(item_data,item_filter,function ()
		{
			$(item_filter).focus();
		});

		$(item_filter).on('blur',function ()
		{
			var price_data="<product_instances>"+
							"<sale_price></sale_price>"+
							"<product_name exact='yes'>"+item_filter.value+"</product_name>"+
							"</product_instances>";
			get_single_column_data(function(prices)
			{
				if(prices.length>0)
				{
					prices.sort(function(a,b)
					{
						if(parseFloat(a)<parseFloat(b))
						{	return 1;}
						else
						{	return -1;}
					});

					price_filter.value=prices[0];
					est_filter.value=vUtil.round(parseFloat(price_filter.value)*parseFloat(quantity_filter.value),2);
					amount_filter.value=vUtil.round(parseFloat(price_filter.value)*parseFloat(quantity_filter.value),2);
				}
			},price_data);
		});

		$(quantity_filter).on('blur',function()
		{
			est_filter.value=vUtil.round(parseFloat(price_filter.value)*parseFloat(quantity_filter.value),2);
			amount_filter.value=vUtil.round(parseFloat(price_filter.value)*parseFloat(quantity_filter.value),2);
		});

		//set_static_value_list('service_request_items','status',status_filter);
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form Service Request billing - expenses
 * @formNo 151
 */
function form151_add_expense()
{
	if(is_create_access('form151'))
	{
		var id=vUtil.newKey();
		var rowsHTML="<tr>";
		rowsHTML+="<form id='form151_expense_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Person'>";
				rowsHTML+="<input type='text' form='form151_expense_"+id+"' required>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Amount'>";
				rowsHTML+="Rs. <input type='number' form='form151_expense_"+id+"' min='0' step='any' required>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Detail'>";
				rowsHTML+="<textarea form='form151_expense_"+id+"'></textarea>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Status'>";
				rowsHTML+="<input type='text' form='form151_expense_"+id+"' value='submitted'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form151_expense_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='submit' class='save_icon' form='form151_expense_"+id+"' >";
				rowsHTML+="<input type='button' class='delete_icon' form='form151_expense_"+id+"' onclick='$(this).parent().parent().remove();'>";
			rowsHTML+="</td>";
		rowsHTML+="</tr>";

		$('#form151_expense_body').prepend(rowsHTML);
		var fields=document.getElementById("form151_expense_"+id);
		var person_filter=fields.elements[0];
		var status_filter=fields.elements[3];

		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form151_create_expense(fields);
		});

		var person_data="<staff>"+
					"<acc_name></acc_name>"+
					"</staff>";
		set_my_value_list(person_data,person_filter,function ()
		{
			$(person_filter).focus();
		});

		set_static_value_list('expenses','status',status_filter);
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form Prepare Quotation
 * @formNo 153
 */
function form153_add_product()
{
	var filter_fields=document.getElementById('form153_master');
	var bill_type=filter_fields.elements['type'].value;
	var customer_name=filter_fields.elements['customer'].value;

	var hiring=false;
	if(filter_fields.elements[2].value=='Hiring')
	{	hiring=true;  }

	if(is_create_access('form153'))
	{
		var rowsHTML="";
		var id=vUtil.newKey();
		rowsHTML+="<tr>";
		rowsHTML+="<form id='form153_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Item'>";
				rowsHTML+="<input type='text' required form='form153_"+id+"'>";
				rowsHTML+="<br><textarea readonly='readonly' class='dblclick_editable' form='form153_"+id+"'></textarea>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Quantity'>";
				rowsHTML+="<input type='number' min='0' required form='form153_"+id+"' step='any'>";
				rowsHTML+="<input type='text' readonly='readonly' form='form153_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Unit Price'>";
				rowsHTML+="<input type='number' required form='form153_"+id+"' step='any'>";
				if(hiring)
				{	rowsHTML+="/day";  }
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Amount'>";
				//rowsHTML+="Tax: <input type='number' form='form153_"+id+"' step='any' value='0'>";
				rowsHTML+="<input type='number' required readonly='readonly' form='form153_"+id+"' step='any'>";
				if(hiring)
				{	rowsHTML+="/day";  }
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				//rowsHTML+="<input type='hidden' form='form153_"+id+"' value='0'>";
				//rowsHTML+="<input type='hidden' form='form153_"+id+"' value='0'>";
				rowsHTML+="<input type='hidden' form='form153_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='button' class='submit_hidden' form='form153_"+id+"' id='save_form153_"+id+"' >";
				rowsHTML+="<input type='button' class='delete_icon' form='form153_"+id+"' id='delete_form153_"+id+"' onclick='$(this).parent().parent().remove(); form153_get_totals();'>";
				rowsHTML+="<input type='submit' class='submit_hidden' form='form153_"+id+"'>";
				rowsHTML+="<input type='hidden' form='form153_"+id+"' value='product'>";
				//rowsHTML+="<input type='hidden' form='form153_"+id+"' name='tax_unit'>";
			rowsHTML+="</td>";
		rowsHTML+="</tr>";

		$('#form153_body').prepend(rowsHTML);

		longPressEditable($('.dblclick_editable'));
		$('textarea').autosize();

		var fields=document.getElementById("form153_"+id);
		var name_filter=fields.elements[0];
		var desc_filter=fields.elements[1];
		var quantity_filter=fields.elements[2];
		var unit_filter=fields.elements[3];
		var price_filter=fields.elements[4];
		//var tax_filter=fields.elements[5];
		var amount_filter=fields.elements[5];
		//var total_filter=fields.elements[7];
		//var discount_filter=fields.elements[8];
		var id_filter=fields.elements[6];
		var save_button=fields.elements[7];
		//var tax_unit_filter=fields.elements[14];

		$(save_button).on("click", function(event)
		{
			event.preventDefault();
			form153_create_item(fields);
		});

		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form153_add_product();
		});

		var product_data="<product_master>" +
				"<name></name>" +
				"</product_master>";

		set_my_value_list(product_data,name_filter,function ()
		{
			$(name_filter).focus();
		});

		$(name_filter).on('keydown',function(e)
		{
			if(e.keyCode==118)
			{
				e.preventDefault();
				modal57_action(name_filter.value,customer_name);
			}
		});

		$(name_filter).on('blur',function(event)
		{
			var desc_data="<product_master>"+
						"<description></description>"+
						"<name exact='yes'>"+name_filter.value+"</name>"+
						"</product_master>";
			set_my_value(desc_data,desc_filter);

			var unit_data="<attributes count='1'>" +
						"<value></value>" +
						"<type>product</type>"+
						"<attribute exact='yes'>unit</attribute>"+
						"<name exact='yes'>"+name_filter.value+"</name>" +
						"</attributes>";
			set_my_value(unit_data,unit_filter);

			if(bill_type=='undefined' || bill_type=='')
			{
				var price_data="<product_instances count='1'>" +
					"<sale_price></sale_price>" +
					"<product_name exact='yes'>"+name_filter.value+"</product_name>" +
					"</product_instances>";
				set_my_value(price_data,price_filter);
			}
			else
			{
				var price_data="<sale_prices count='1'>" +
						"<sale_price></sale_price>" +
						"<product_name exact='yes'>"+name_filter.value+"</product_name>" +
						"<billing_type>"+bill_type+"</billing_type>" +
						"</sale_prices>";
				set_my_value(price_data,price_filter);
			}

			if(bill_type=='' || bill_type=='Tax')
			{
				var hireable_data="<bill_items sum='yes'>"+
								"<quantity></quantity>"+
								"<hired exact='yes'>yes</hired>"+
								"<fresh exact='yes'>yes</fresh>"+
								"<item_name exact='yes'>"+name_filter.value+"</item_name>"+
								"</bill_items>";
				get_single_column_data(function(hireable_inventory)
				{
					var hi=0;
					if(hireable_inventory.length>0)
					{
						hi=hireable_inventory[0];
					}
					get_inventory(name_filter.value,'',function(inventory)
					{
						$(quantity_filter).attr('placeholder',(parseFloat(inventory)-parseFloat(hi)));
					});
				},hireable_data);
			}

			get_inventory(name_filter.value,'',function(quantity)
			{
				$(quantity_filter).attr('placeholder',quantity);
			});
		});


		$(price_filter).add(quantity_filter).on('blur',function(event)
		{
			var amount=parseFloat(quantity_filter.value)*parseFloat(price_filter.value);
			amount_filter.value=Math.round(amount).toFixed(2);

			//tax_filter.value=parseFloat((parseFloat(tax_unit_filter.value)*(amount-parseFloat(discount_filter.value)))/100);
			//total_filter.value=Math.round(parseFloat(amount_filter.value)+parseFloat(tax_filter.value)-parseFloat(discount_filter.value));
		});

		form153_get_totals();
	}
	else
	{
		$("#modal2_link").click();
	}
}


/**
 * @form Prepare Quotation
 * @formNo 153
 */
function form153_add_service()
{
	var filter_fields=document.getElementById('form153_master');
	var bill_type=filter_fields.elements['type'].value;
	var customer_name=filter_fields.elements['customer'].value;

	if(is_create_access('form153'))
	{
		var rowsHTML="";
		var id=vUtil.newKey();
		rowsHTML+="<tr>";
		rowsHTML+="<form id='form153_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Item'>";
				rowsHTML+="<input type='text' placeholder='Name for the service' 	required form='form153_"+id+"'>";
				rowsHTML+="<br><textarea placeholder='Add description..' class='dblclick_editable' form='form153_"+id+"'></textarea>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Quantity'>";
				rowsHTML+="<input type='number' readonly='readonly' value='1' required form='form153_"+id+"'>";
				rowsHTML+="<input type='text' readonly='readonly' value='job' form='form153_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Unit Price'>";
				rowsHTML+="<input type='number' required form='form153_"+id+"' step='any'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Amount'>";
				rowsHTML+="<input type='number' required readonly='readonly' form='form153_"+id+"' step='any'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form153_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='button' class='submit_hidden' form='form153_"+id+"' id='save_form153_"+id+"' >";
				rowsHTML+="<input type='button' class='delete_icon' form='form153_"+id+"' id='delete_form153_"+id+"' onclick='$(this).parent().parent().remove(); form153_get_totals();'>";
				rowsHTML+="<input type='submit' class='submit_hidden' form='form153_"+id+"'>";
				rowsHTML+="<input type='hidden' form='form153_"+id+"' value='service'>";
				//rowsHTML+="<input type='hidden' form='form153_"+id+"' name='tax_unit'>";
			rowsHTML+="</td>";
		rowsHTML+="</tr>";

		$('#form153_body').prepend(rowsHTML);

		longPressEditable($('.dblclick_editable'));
		$('textarea').autosize();

		var fields=document.getElementById("form153_"+id);
		var name_filter=fields.elements[0];
		var desc_filter=fields.elements[1];
		var quantity_filter=fields.elements[2];
		var price_filter=fields.elements[4];
		var amount_filter=fields.elements[5];
		var id_filter=fields.elements[6];
		var save_button=fields.elements[7];

		$(save_button).on("click", function(event)
		{
			event.preventDefault();
			form153_create_item(fields);
		});

		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form153_add_service();
		});

		$(name_filter).focus();

		$(name_filter).on('keydown',function(e)
		{
			if(e.keyCode==118)
			{
				e.preventDefault();
				modal57_action(name_filter.value,customer_name);
			}
		});

		$(price_filter).on('blur',function(event)
		{
			var amount=parseFloat(quantity_filter.value)*parseFloat(price_filter.value);
			amount_filter.value=Math.round(amount).toFixed(2);

			//tax_filter.value=parseFloat((parseFloat(tax_unit_filter.value)*amount)/100);
			//total_filter.value=Math.round(parseFloat(amount_filter.value)+parseFloat(tax_filter.value));
		});

		form153_get_totals();

	}
	else
	{
		$("#modal2_link").click();
	}
}


/**
 * @form Create bill (DLM)
 * @formNo 154
 */
function form154_add_product()
{
	var filter_fields=document.getElementById('form154_master');
	var bill_type=filter_fields.elements['bill_type'].value;
	var customer_name=filter_fields.elements['customer'].value;

	var hiring=false;
	if(bill_type=='Hiring')
	{	hiring=true;  }

	if(is_create_access('form154'))
	{
		if(hiring)
		{
			var id=vUtil.newKey();
			var rowsHTML="<tr>";
			rowsHTML+="<form id='form154_"+id+"' autocomplete='off'></form>";
				rowsHTML+="<td data-th='S.No.'>";
				rowsHTML+="</td>";
				rowsHTML+="<td data-th='Item'>";
					rowsHTML+="<input type='text' class='wideinput' required form='form154_"+id+"'>";
					rowsHTML+="<img src='./images/add_image.png' class='add_image' title='Add new product' id='form154_add_product_"+id+"'>";
					rowsHTML+="<fresh><br>Fresh: <input type='checkbox' form='form154_"+id+"'></fresh>";
				rowsHTML+="</td>";
				rowsHTML+="<td data-th='Quantity'>";
					rowsHTML+="<input type='number' min='0' required form='form154_"+id+"' step='any'> <b id='form154_unit_"+id+"'></b>";
				rowsHTML+="</td>";
				rowsHTML+="<td data-th='Date'>";
					rowsHTML+="From: <f1><input type='text' required form='form154_"+id+"'></f1>";
					rowsHTML+="<br>To: <f1><input type='text' required form='form154_"+id+"'></f1>";
					rowsHTML+="<br><f1><input type='number' readonly='readonly' form='form154_"+id+"'> days</f1>";
				rowsHTML+="</td>";
				rowsHTML+="<td data-th='Rate'>";
					rowsHTML+="<input type='number' required form='form154_"+id+"' step='any'>";
					rowsHTML+="/day";
				rowsHTML+="</td>";
				rowsHTML+="<td data-th='Amount'>";
					rowsHTML+="<input type='number' required readonly='readonly' form='form154_"+id+"' step='any'>";
				rowsHTML+="</td>";
				rowsHTML+="<td data-th='Action'>";
					rowsHTML+="<input type='hidden' form='form154_"+id+"' value='"+id+"'>";
					rowsHTML+="<input type='button' class='submit_hidden' form='form154_"+id+"' id='save_form154_"+id+"' >";
					rowsHTML+="<input type='button' class='delete_icon' form='form154_"+id+"' id='delete_form154_"+id+"' onclick='$(this).parent().parent().remove();form154_update_serial_numbers(); form154_get_totals();'>";
					rowsHTML+="<input type='submit' class='submit_hidden' form='form154_"+id+"'>";
					rowsHTML+="<input type='hidden' form='form154_"+id+"' value='product'>";
					//rowsHTML+="<input type='hidden' form='form154_"+id+"' name='tax_unit'>";
				rowsHTML+="</td>";
			rowsHTML+="</tr>";

			$('#form154_body').append(rowsHTML);

			longPressEditable($('.dblclick_editable'));
			$('textarea').autosize();

			var fields=document.getElementById("form154_"+id);
			var name_filter=fields.elements[0];
			var fresh=fields.elements[1];
			var quantity_filter=fields.elements[2];
			var from_filter=fields.elements[3];
			var to_filter=fields.elements[4];
			var days_filter=fields.elements[5];
			var price_filter=fields.elements[6];
			//var tax_filter=fields.elements[7];
			var amount_filter=fields.elements[7];
			//var total_filter=fields.elements[9];
			//var discount_filter=fields.elements[10];
			var id_filter=fields.elements[8];
			var save_button=fields.elements[9];
			//var tax_unit_filter=fields.elements[16];

			$(from_filter).datepicker();
			$(to_filter).datepicker();

			$(save_button).on("click", function(event)
			{
				event.preventDefault();
				form154_create_hiring_item(fields);
			});

			$(fields).on("submit", function(event)
			{
				event.preventDefault();
				form154_add_product();
			});

			var product_data="<product_master>" +
					"<name></name>" +
					"</product_master>";

			set_my_value_list(product_data,name_filter,function ()
			{
				$(name_filter).focus();
			});

			var add_product=document.getElementById('form154_add_product_'+id);
			$(add_product).on('click',function()
			{
				modal112_action(function()
				{
					var product_data="<product_master>" +
							"<name></name>" +
							"</product_master>";
					set_my_value_list(product_data,name_filter,function ()
					{
						$(name_filter).focus();
					});
				});
			});

			$(name_filter).on('keydown',function(e)
			{
				if(e.keyCode==118)
				{
					e.preventDefault();
					modal57_action(name_filter.value,customer_name);
				}
			});

			$(fresh).on('blur',function()
			{
				if(fresh.checked)
				{
					var hireable_data="<bill_items sum='yes'>"+
									"<quantity></quantity>"+
									"<hired exact='yes'>yes</hired>"+
									"<fresh exact='yes'>yes</fresh>"+
									"<item_name exact='yes'>"+name_filter.value+"</item_name>"+
									"</bill_items>";
					get_single_column_data(function(data)
					{
						var hireable_quantity=0;
						if(data.length>0)
						{
							hireable_quantity=parseFloat(data[0]);
						}
						get_inventory(name_filter.value,'',function(inventory)
						{
							$(quantity_filter).attr('placeholder',(parseFloat(inventory)-hireable_quantity));
						});
					},hireable_data);
				}
				else
				{
					console.log('fresh not checked');
					var hireable_data="<bill_items sum='yes'>"+
									"<quantity></quantity>"+
									"<hired exact='yes'>yes</hired>"+
									"<fresh exact='yes'>yes</fresh>"+
									"<item_name exact='yes'>"+name_filter.value+"</item_name>"+
									"</bill_items>";
					get_single_column_data(function(data)
					{
						console.log(data);
						var hireable_quantity=0;
						if(data.length>0)
						{
							hireable_quantity=parseFloat(data[0]);
						}
						var hired_data="<bill_items sum='yes'>"+
									"<quantity></quantity>"+
									"<hired exact='yes'>yes</hired>"+
									"<from_date upperbound='yes'>"+get_my_time()+"</from_date>"+
									"<to_date lowerbound='yes'>"+(parseFloat(get_my_time())+86400000)+"</to_date>"+
									"<item_name exact='yes'>"+name_filter.value+"</item_name>"+
									"</bill_items>";
						get_single_column_data(function(data2)
						{
							console.log(data2);

							var hired_quantity=0;
							if(data2.length>0)
							{
								hired_quantity=parseFloat(data2[0]);
							}
							$(quantity_filter).attr('placeholder',(hireable_quantity-hired_quantity));
						},hired_data);
					},hireable_data);
				}
			});

			$(name_filter).on('blur',function(event)
			{
				var unit_data="<attributes count='1'>"+
							"<value></value>"+
							"<attribute exact='yes'>unit</attribute>"+
							"<name exact='yes'>"+name_filter.value+"</name>"+
							"</attributes>";
				get_single_column_data(function(units)
				{
					//console.log(units);
					if(units.length>0)
						$('#form154_unit_'+id).html(units[0]);
				},unit_data);

				if(bill_type=='undefined' || bill_type=='')
				{
					var price_data="<product_instances count='1'>" +
						"<sale_price></sale_price>" +
						"<product_name exact='yes'>"+name_filter.value+"</product_name>" +
						"</product_instances>";
					set_my_value(price_data,price_filter);
				}
				else
				{
					var price_data="<sale_prices count='1'>" +
							"<sale_price></sale_price>" +
							"<product_name exact='yes'>"+name_filter.value+"</product_name>" +
							"<billing_type>"+bill_type+"</billing_type>" +
							"</sale_prices>";
					set_my_value(price_data,price_filter);
				}

				if(fresh.checked)
				{
					var hireable_data="<bill_items sum='yes'>"+
									"<quantity></quantity>"+
									"<hired exact='yes'>yes</hired>"+
									"<fresh exact='yes'>yes</fresh>"+
									"<item_name exact='yes'>"+name_filter.value+"</item_name>"+
									"</bill_items>";
					get_single_column_data(function(data)
					{
						var hireable_quantity=0;
						if(data.length>0)
						{
							hireable_quantity=parseFloat(data[0]);
						}
						get_inventory(name_filter.value,'',function(inventory)
						{
							$(quantity_filter).attr('placeholder',(parseFloat(inventory)-hireable_quantity));
						});
					},hireable_data);
				}
				else
				{
					var hireable_data="<bill_items sum='yes'>"+
									"<quantity></quantity>"+
									"<hired exact='yes'>yes</hired>"+
									"<fresh exact='yes'>yes</fresh>"+
									"<item_name exact='yes'>"+name_filter.value+"</item_name>"+
									"</bill_items>";
					get_single_column_data(function(data)
					{
						var hireable_quantity=0;
						if(data.length>0)
						{
							hireable_quantity=parseFloat(data[0]);
						}
						var hired_data="<bill_items sum='yes'>"+
									"<quantity></quantity>"+
									"<hired exact='yes'>yes</hired>"+
									"<from_date upperbound='yes'>"+get_my_time()+"</from_date>"+
									"<to_date lowerbound='yes'>"+(parseFloat(get_my_time())+86400000)+"</to_date>"+
									"<item_name exact='yes'>"+name_filter.value+"</item_name>"+
									"</bill_items>";
						get_single_column_data(function(data2)
						{
							var hired_quantity=0;
							if(data2.length>0)
							{
								hired_quantity=parseFloat(data[0]);
							}
							$(quantity_filter).attr('placeholder',(hireable_quantity-hired_quantity));
						},hired_data);
					},hireable_data);
				}

				/*
				var tax_data="<attributes>" +
						"<value></value>"+
						"<attribute exact='yes'>hiring tax rate</attribute>" +
						"<name exact='yes'>"+name_filter.value+"</name>" +
						"</attributes>";
				set_my_value(tax_data,tax_unit_filter);
				*/
				quantity_filter.value="";
				//total_filter.value=0;
				amount_filter.value=0;
				//discount_filter.value=0;
				//tax_filter.value=0;
			});

			$(from_filter).add(to_filter).add(price_filter).add(quantity_filter).on('change',function()
			{
				var days=0;
				if(to_filter!="" && from_filter!="" && parseFloat(to_filter.value)>=parseFloat(from_filter.value))
				{
					days=1+vUtil.round(((get_raw_time(to_filter.value)-get_raw_time(from_filter.value))/86400000),0);
				}
				days_filter.value=days;

				var amount=vUtil.round(parseFloat(quantity_filter.value)*parseFloat(price_filter.value)*days,2);
				amount_filter.value=Math.round(amount).toFixed(2);

				//tax_filter.value=vUtil.round(parseFloat((parseFloat(tax_unit_filter.value)*(amount-parseFloat(discount_filter.value)))/100),2);

				//total_filter.value=Math.round(parseFloat(amount_filter.value)+parseFloat(tax_filter.value)-parseFloat(discount_filter.value));
			});

			/*
			$(tax_filter).on('blur',function ()
			{
				total_filter.value=Math.round(parseFloat(amount_filter.value)+parseFloat(tax_filter.value)-parseFloat(discount_filter.value));
			});*/
		}
		else
		{
			var id=vUtil.newKey();
			var rowsHTML="<tr>";
			rowsHTML+="<form id='form154_"+id+"' autocomplete='off'></form>";
				rowsHTML+="<td data-th='S.No.'>";
				rowsHTML+="</td>";
				rowsHTML+="<td data-th='Item'>";
					rowsHTML+="<input type='text' class='wideinput' required form='form154_"+id+"'>";
					rowsHTML+="<img src='./images/add_image.png' class='add_image' title='Add new product' id='form154_add_product_"+id+"'>";
				rowsHTML+="</td>";
				rowsHTML+="<td data-th='Quantity'>";
					rowsHTML+="<input type='number' min='0' required form='form154_"+id+"' step='any'> <b id='form154_unit_"+id+"'></b>";
				rowsHTML+="</td>";
				rowsHTML+="<td data-th='Rate'>";
					rowsHTML+="<input type='number' required form='form154_"+id+"' step='any'>";
				rowsHTML+="</td>";
				rowsHTML+="<td data-th='Amount'>";
					rowsHTML+="<input type='number' required readonly='readonly' form='form154_"+id+"' step='any'>";
				rowsHTML+="</td>";
				rowsHTML+="<td data-th='Action'>";
					//rowsHTML+="<input type='hidden' form='form154_"+id+"' value='0'>";
					//rowsHTML+="<input type='hidden' form='form154_"+id+"' value='0'>";
					rowsHTML+="<input type='hidden' form='form154_"+id+"' value='"+id+"'>";
					rowsHTML+="<input type='button' class='submit_hidden' form='form154_"+id+"' id='save_form154_"+id+"' >";
					rowsHTML+="<input type='button' class='delete_icon' form='form154_"+id+"' id='delete_form154_"+id+"' onclick='$(this).parent().parent().remove();form154_update_serial_numbers(); form154_get_totals();'>";
					rowsHTML+="<input type='submit' class='submit_hidden' form='form154_"+id+"'>";
					rowsHTML+="<input type='hidden' form='form154_"+id+"' value='product'>";
					//rowsHTML+="<input type='hidden' form='form154_"+id+"' name='tax_unit'>";
				rowsHTML+="</td>";
			rowsHTML+="</tr>";

			$('#form154_body').append(rowsHTML);

			longPressEditable($('.dblclick_editable'));
			$('textarea').autosize();

			var fields=document.getElementById("form154_"+id);
			var name_filter=fields.elements[0];
			var quantity_filter=fields.elements[1];
			var price_filter=fields.elements[2];
			//var tax_filter=fields.elements[3];
			var amount_filter=fields.elements[3];
			//var total_filter=fields.elements[5];
			//var discount_filter=fields.elements[6];
			var id_filter=fields.elements[4];
			var save_button=fields.elements[5];
			//var tax_unit_filter=fields.elements[12];

			$(save_button).on("click", function(event)
			{
				event.preventDefault();
				form154_create_product(fields);
			});

			$(fields).on("submit", function(event)
			{
				event.preventDefault();
				form154_add_product();
			});

			var add_product=document.getElementById('form154_add_product_'+id);
			$(add_product).on('click',function()
			{
				modal112_action(function()
				{
					var product_data="<product_master>" +
							"<name></name>" +
							"</product_master>";
					set_my_value_list(product_data,name_filter,function ()
					{
						$(name_filter).focus();
					});
				});
			});

			var product_data="<product_master>" +
					"<name></name>" +
					"</product_master>";

			set_my_value_list(product_data,name_filter,function ()
			{
				$(name_filter).focus();
			});

			$(name_filter).on('keydown',function(e)
			{
				if(e.keyCode==118)
				{
					e.preventDefault();
					modal57_action(name_filter.value,customer_name);
				}
			});

			$(name_filter).on('blur',function(event)
			{
				var unit_data="<attributes count='1'>"+
							"<value></value>"+
							"<attribute exact='yes'>unit</attribute>"+
							"<name exact='yes'>"+name_filter.value+"</name>"+
							"</attributes>";
				get_single_column_data(function(units)
				{
					if(units.length>0)
						$('#form154_unit_'+id).html(units[0]);
				},unit_data);


				if(bill_type=='undefined' || bill_type=='')
				{
					var price_data="<product_instances count='1'>" +
						"<sale_price></sale_price>" +
						"<product_name exact='yes'>"+name_filter.value+"</product_name>" +
						"</product_instances>";
					set_my_value(price_data,price_filter);
				}
				else
				{
					var price_data="<sale_prices count='1'>" +
							"<sale_price></sale_price>" +
							"<product_name exact='yes'>"+name_filter.value+"</product_name>" +
							"<billing_type>"+bill_type+"</billing_type>" +
							"</sale_prices>";
					set_my_value(price_data,price_filter);
				}

				var hireable_data="<bill_items sum='yes'>"+
								"<quantity></quantity>"+
								"<hired exact='yes'>yes</hired>"+
								"<fresh exact='yes'>yes</fresh>"+
								"<item_name exact='yes'>"+name_filter.value+"</item_name>"+
								"</bill_items>";
				get_single_column_data(function(data)
				{
					var hireable_quantity=0;
					if(data.length>0)
					{
						hireable_quantity=parseFloat(data[0]);
					}
					get_inventory(name_filter.value,'',function(inventory)
					{
						$(quantity_filter).attr('placeholder',(parseFloat(inventory)-hireable_quantity));
					});
				},hireable_data);

/*
				var tax_data="<product_master>" +
						"<tax></tax>" +
						"<name exact='yes'>"+name_filter.value+"</name>" +
						"</product_master>";
				set_my_value(tax_data,tax_unit_filter);
*/
				quantity_filter.value="";
				//total_filter.value=0;
				amount_filter.value=0;
				//discount_filter.value=0;
				//tax_filter.value=0;
			});

			$(price_filter).add(quantity_filter).on('blur',function(event)
			{
				var amount=parseFloat(quantity_filter.value)*parseFloat(price_filter.value);
				amount_filter.value=Math.round(amount).toFixed(2);

				//tax_filter.value=vUtil.round(parseFloat((parseFloat(tax_unit_filter.value)*(amount-parseFloat(discount_filter.value)))/100),2);
				//total_filter.value=Math.round(parseFloat(amount_filter.value)+parseFloat(tax_filter.value)-parseFloat(discount_filter.value));
			});
			/*
			$(tax_filter).on('blur',function()
			{
				total_filter.value=Math.round(parseFloat(amount_filter.value)+parseFloat(tax_filter.value)-parseFloat(discount_filter.value));
			});
			*/
		}
		form154_update_serial_numbers();
		form154_get_totals();
	}
	else
	{
		$("#modal2_link").click();
	}
}


/**
 * @form Create bill (dlmc)
 * @formNo 154
 */
function form154_add_service()
{
	var filter_fields=document.getElementById('form154_master');
	var bill_type=filter_fields.elements['bill_type'].value;
	var customer_name=filter_fields.elements['customer'].value;

	var hiring=false;

	if(is_create_access('form154'))
	{
		var id=vUtil.newKey();
		var rowsHTML="<tr>";
		rowsHTML+="<form id='form154_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='S.No.'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Item'>";
				rowsHTML+="<textarea form='form154_"+id+"'></textarea>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Quantity'>";
				rowsHTML+="<input type='number' readonly='readonly' value='1' required form='form154_"+id+"'> <b id='form154_unit_"+id+"'>job</b>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Rate'>";
				rowsHTML+="<input type='number' required form='form154_"+id+"' step='any'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Amount'>";
				//rowsHTML+="<v1>Tax: <input type='number' step='any' form='form154_"+id+"' value='0'>";
				rowsHTML+="<input type='number' required readonly='readonly' form='form154_"+id+"' step='any'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				//rowsHTML+="<input type='hidden' form='form154_"+id+"' value='0'>";
				//rowsHTML+="<input type='hidden' form='form154_"+id+"' value='0'>";
				rowsHTML+="<input type='hidden' form='form154_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='button' class='submit_hidden' form='form154_"+id+"' id='save_form154_"+id+"' >";
				rowsHTML+="<input type='button' class='delete_icon' form='form154_"+id+"' id='delete_form154_"+id+"' onclick='$(this).parent().parent().remove();form154_update_serial_numbers(); form154_get_totals();'>";
				rowsHTML+="<input type='submit' class='submit_hidden' form='form154_"+id+"'>";
				rowsHTML+="<input type='hidden' form='form154_"+id+"' value='service'>";
				rowsHTML+="<input type='hidden' form='form154_"+id+"' name='tax_unit' value='0.14'>";
			rowsHTML+="</td>";
		rowsHTML+="</tr>";

		$('#form154_body').append(rowsHTML);

		longPressEditable($('.dblclick_editable'));
		$('textarea').autosize();

		var fields=document.getElementById("form154_"+id);
		var name_filter=fields.elements[0];
		var quantity_filter=fields.elements[1];
		var price_filter=fields.elements[2];
		//var tax_filter=fields.elements[3];
		var amount_filter=fields.elements[3];
		//var total_filter=fields.elements[5];
		//var discount_filter=fields.elements[6];
		var id_filter=fields.elements[4];
		var save_button=fields.elements[5];
		//var tax_unit_filter=fields.elements[9];

		$(save_button).on("click", function(event)
		{
			event.preventDefault();
			form154_create_service(fields);
		});

		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form154_add_service();
		});

		$(name_filter).focus();

		$(price_filter).on('blur',function(event)
		{
			var amount=parseFloat(quantity_filter.value)*parseFloat(price_filter.value);
			amount_filter.value=Math.round(amount).toFixed(2);
			//tax_filter.value=vUtil.round(parseFloat((parseFloat(tax_unit_filter.value)*amount)),2);
			//total_filter.value=Math.round(parseFloat(amount_filter.value)+parseFloat(tax_filter.value));
		});
		/*
		$(tax_filter).on('blur',function ()
		{
			total_filter.value=Math.round(parseFloat(amount_filter.value)+parseFloat(tax_filter.value));
		});
		*/
		form154_update_serial_numbers();
		form154_get_totals();

	}
	else
	{
		$("#modal2_link").click();
	}
}


/**
 * @form Store Placement (DLM)
 * @formNo 156
 */
function form156_add_item()
{
	if(is_create_access('form156'))
	{
		var rowsHTML="";
		var id=vUtil.newKey();
		rowsHTML+="<tr>";
		rowsHTML+="<form id='form156_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Item Name'>";
				rowsHTML+="<input type='text' form='form156_"+id+"' value=''>";
				rowsHTML+="<img src='./images/add_image.png' class='add_image' title='Add new product' id='form156_add_product_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Store Area'>";
				rowsHTML+="<input type='text' form='form156_"+id+"' value=''>";
				rowsHTML+="<img src='./images/add_image.png' class='add_image' title='Add new storage' id='form156_add_storage_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Quantity'>";
				rowsHTML+="<input type='number' readonly='readonly' form='form156_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form156_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='submit' class='save_icon' form='form156_"+id+"' >";
				rowsHTML+="<input type='button' class='delete_icon' form='form156_"+id+"' onclick='$(this).parent().parent().remove();'>";
			rowsHTML+="</td>";
		rowsHTML+="</tr>";

		$('#form156_body').prepend(rowsHTML);

		var fields=document.getElementById("form156_"+id);
		var product_filter=fields.elements[0];
		var area_filter=fields.elements[1];
		var quantity_filter=fields.elements[2];

		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form156_create_item(fields);
		});

		var products_data="<product_master>" +
				"<name></name>" +
				"</product_master>";
		set_my_value_list(products_data,product_filter,function ()
		{
			$(product_filter).focus();
		});

		var add_product=document.getElementById('form156_add_product_'+id);
		$(add_product).on('click',function()
		{
			modal112_action(function()
			{
				var product_data="<product_master>" +
						"<name></name>" +
						"</product_master>";
				set_my_value_list(products_data,product_filter,function ()
				{
					$(product_filter).focus();
				});
			});
		});


		var add_storage=document.getElementById('form156_add_storage_'+id);
		$(add_storage).on('click',function()
		{
			modal35_action(function()
			{
				var area_data="<store_areas>" +
				"<name></name>" +
				"<area_type exact='yes'>storage</area_type>" +
				"</store_areas>";
				set_my_value_list(area_data,area_filter);
			});
		});

		var area_data="<store_areas>" +
				"<name></name>" +
				"<area_type exact='yes'>storage</area_type>" +
				"</store_areas>";

		set_my_value_list(area_data,area_filter);

		$(product_filter).on('blur',function ()
		{
			get_store_inventory(area_filter.value,product_filter.value,'',function(inventory)
			{
				$(quantity_filter).attr('max',inventory);
			});
		});

		$(area_filter).on('blur',function ()
		{
			get_store_inventory(area_filter.value,product_filter.value,'',function(inventory)
			{
				$(quantity_filter).attr('max',inventory);
			});
		});
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form Store movement (DLM)
 * @formNo 157
 */
function form157_add_item()
{
	if(is_create_access('form157'))
	{
		var rowsHTML="";
		var id=vUtil.newKey();
		rowsHTML+="<tr>";
		rowsHTML+="<form id='form157_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Product'>";
				rowsHTML+="<input type='text' required form='form157_"+id+"'>";
				rowsHTML+="<img src='./images/add_image.png' class='add_image' title='Add new product' id='form157_add_product_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Quantity'>";
				rowsHTML+="<input type='number' required form='form157_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Store'>";
				rowsHTML+="Source: <input type='text' required form='form157_"+id+"'>";
				rowsHTML+="<br>Target: <input type='text' required form='form157_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Status'>";
				rowsHTML+="<input type='text' readonly='readonly' required form='form157_"+id+"' value='pending'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form157_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='hidden' form='form157_"+id+"' required name='receiver'>";
				rowsHTML+="<input type='submit' class='save_icon' form='form157_"+id+"'>";
				rowsHTML+="<input type='button' class='delete_icon' form='form157_"+id+"' onclick='$(this).parent().parent().remove();'>";
				rowsHTML+="<input type='button' class='generic_icon' form='form157_"+id+"' value='Dispatch' onclick='form157_dispatch_item($(this));'>";
			rowsHTML+="</td>";
		rowsHTML+="</tr>";

		$('#form157_body').prepend(rowsHTML);
		var fields=document.getElementById("form157_"+id);
		var product_filter=fields.elements[0];
		var quantity_filter=fields.elements[1];
		var source_filter=fields.elements[2];
		var target_filter=fields.elements[3];
		var status_filter=fields.elements[4];
		var receiver_filter=fields.elements[6];
		var save_button=fields.elements[7];
		var dispatch_button=fields.elements[9];

		$(dispatch_button).hide();

		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			var receiver_data="<store_areas>" +
				"<owner></owner>"+
				"<name exact='yes'>"+target_filter.value+"</name>" +
				"</store_areas>";
			//console.log(receiver_data);
			get_single_column_data(function(data)
			{
				if(data.length>0)
				{
					receiver_filter.value=data[0];
				}
				form157_create_item(fields);
			},receiver_data);
		});

		var product_data="<product_master>" +
				"<name></name>" +
				"</product_master>";
		set_my_value_list(product_data,product_filter,function ()
		{
			$(product_filter).focus();
		});

		var add_product=document.getElementById('form157_add_product_'+id);
		$(add_product).on('click',function()
		{
			modal112_action(function()
			{
				var product_data="<product_master>" +
						"<name></name>" +
						"</product_master>";
				set_my_value_list(product_data,product_filter,function ()
				{
					$(product_filter).focus();
				});
			});
		});

		var source_data="<store_areas>" +
				"<name></name>" +
				"<owner>"+get_account_name()+"</owner>"+
				"</store_areas>";
		set_my_value_list(source_data,source_filter);

		$(source_filter).on('blur',function ()
		{
			get_store_inventory(source_filter.value,product_filter.value,'',function(inventory)
			{
				$(quantity_filter).attr('max',inventory);
			});
		});

		var target_data="<store_areas>" +
				"<name></name>" +
				"</store_areas>";
		set_my_value_list(target_data,target_filter);

		set_static_value_list('store_movement','status',status_filter);

	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form Enter Purchase Bill (DLM)
 * @formNo 158
 */
function form158_add_item()
{
	if(is_create_access('form158'))
	{
		var filter_fields=document.getElementById('form158_master');
		var imported=filter_fields.elements['imported'].checked;

		var rowsHTML="";
		var id=vUtil.newKey();
		rowsHTML+="<tr>";
		rowsHTML+="<form id='form158_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Item'>";
				rowsHTML+="<input type='text' class='wideinput' required form='form158_"+id+"'>";
				rowsHTML+="<img src='./images/add_image.png' class='add_image' title='Add new product' id='form158_add_product_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Quantity'>";
				rowsHTML+="<input type='number' step='any' required form='form158_"+id+"'> <b id='form158_unit_"+id+"'></b>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Amount'>";
				rowsHTML+="Unit Price: <input type='number' form='form158_"+id+"' step='any'>";
				rowsHTML+="<br>Amount: <input type='number' form='form158_"+id+"' value='' readonly='readonly' step='any'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Storage'>";
				rowsHTML+="<input type='text' form='form158_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form158_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='button' class='submit_hidden' form='form158_"+id+"' id='save_form158_"+id+"' >";
				rowsHTML+="<input type='button' class='delete_icon' form='form158_"+id+"' id='delete_form158_"+id+"' onclick='$(this).parent().parent().remove();form158_get_totals();'>";
				rowsHTML+="<input type='submit' class='submit_hidden' form='form158_"+id+"'>";
			rowsHTML+="</td>";
		rowsHTML+="</tr>";

		$('#form158_body').append(rowsHTML);

		var fields=document.getElementById("form158_"+id);
		var name_filter=fields.elements[0];
		var quantity_filter=fields.elements[1];
		var price_filter=fields.elements[2];
		var amount_filter=fields.elements[3];
		var storage_filter=fields.elements[4];
		var id_filter=fields.elements[5];
		var save_button=fields.elements[6];
		//var tax_unit_filter=fields.elements[8];

		$(save_button).on("click", function(event)
		{
			event.preventDefault();
			form158_create_item(fields);
		});

		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form158_add_item();
		});

		var product_data="<product_master>" +
				"<name></name>" +
				"</product_master>";
		set_my_value_list(product_data,name_filter,function ()
		{
			$(name_filter).focus();
		});

		var add_product=document.getElementById('form158_add_product_'+id);
		$(add_product).on('click',function()
		{
			modal112_action(function()
			{
				var product_data="<product_master>" +
						"<name></name>" +
						"</product_master>";
				set_my_value_list(product_data,name_filter,function ()
				{
					$(name_filter).focus();
				});
			});
		});

		var storage_data="<store_areas>" +
					"<name></name>" +
					"<owner></owner>"+
					"<area_type exact='yes'>storage</area_type>" +
					"</store_areas>";
		fetch_requested_data('',storage_data,function(storages)
		{
			var form=fields;
			var datalist=document.createElement('datalist');
			var element_array=[];
			storages.forEach(function(d)
			{
				var option=document.createElement('option');
				option.setAttribute('value',d.name);
				element_array.push(d.name);
				datalist.appendChild(option);
				if(d.owner==get_account_name())
				{
					storage_filter.value=d.name;
				}
			});

			var list_id=storage_filter.getAttribute('list');
			if(list_id=='' || list_id==null)
			{
				list_id="list_"+vUtil.newKey();
				storage_filter.setAttribute("list",list_id);
			}
			else
			{
				var oldlist=document.getElementById(list_id);
				form.removeChild(oldlist);
			}

			form.appendChild(datalist);
			datalist.setAttribute('id',list_id);

			$(storage_filter).off("change");
			$(storage_filter).on("change",function(event)
			{
				var found = $.inArray($(this).val(), element_array) > -1;
				if(!found)
				{
		            $(this).val('');
		        }
			});
		});

		set_my_value_list(storage_data,storage_filter,function()
		{
			var store_value_data="<store_areas count='1'>" +
				"<name></name>" +
				"<owner>"+get_account_name()+"</owner>"+
				"<area_type exact='yes'>storage</area_type>" +
				"</store_areas>";
			set_my_value(store_value_data,storage_filter);
		});

		$(name_filter).on('blur',function(event)
		{
			var unit_data="<attributes count='1'>"+
							"<value></value>"+
							"<attribute exact='yes'>unit</attribute>"+
							"<name exact='yes'>"+name_filter.value+"</name>"+
							"</attributes>";
			get_single_column_data(function(units)
			{
				if(units.length>0)
					$('#form158_unit_'+id).html(units[0]);
			},unit_data);

			var price_data="<supplier_bill_items count='1'>" +
					"<unit_price></unit_price>" +
					"<product_name exact='yes'>"+name_filter.value+"</product_name>" +
					"</supplier_bill_items>";
			set_my_value(price_data,price_filter);
		});

		$(quantity_filter).add(price_filter).on('blur',function(event)
		{
			//tax_filter.value=vUtil.round((parseFloat(tax_unit_filter.value)*parseFloat(quantity_filter.value)*parseFloat(price_filter.value)/100),2);
			var amount=(parseFloat(price_filter.value)*parseFloat(quantity_filter.value));
			amount_filter.value=Math.round(amount);
		});
		form158_get_totals();
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form checklist Items
 * @formNo 161
 */
function form161_add_item()
{
	if(is_create_access('form161'))
	{
		var rowsHTML="";
		var id=vUtil.newKey();
		rowsHTML+="<tr>";
		rowsHTML+="<form id='form161_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Checkpoint'>";
				rowsHTML+="<input type='text' form='form161_"+id+"' required>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Desired Result'>";
				rowsHTML+="<textarea form='form161_"+id+"' class='dblclick_editable' required></textarea>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Status'>";
				rowsHTML+="<input type='text' form='form161_"+id+"' required>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form161_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='submit' class='save_icon' form='form161_"+id+"' title='Save'>";
				rowsHTML+="<input type='button' class='delete_icon' form='form161_"+id+"' title='Delete' onclick='$(this).parent().parent().remove();'>";
			rowsHTML+="</td>";
		rowsHTML+="</tr>";

		$('#form161_body').prepend(rowsHTML);
		longPressEditable($('.dblclick_editable'));

		var fields=document.getElementById("form161_"+id);
		var cp_filter=fields.elements[0];
		var status_filter=fields.elements[2];

		$(cp_filter).focus();
		set_static_value_list('checklist_items','status',status_filter);

		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form161_create_item(fields);
		});
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form Product checklist
 * @formNo 162
 */
function form162_add_item()
{
	if(is_create_access('form162'))
	{
		var rowsHTML="";
		var id=vUtil.newKey();
		rowsHTML+="<tr>";
		rowsHTML+="<form id='form162_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Item'>";
				rowsHTML+="<input type='text' form='form162_"+id+"' required>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Checkpoint'>";
				rowsHTML+="<input type='text' form='form162_"+id+"' required>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Desired Result'>";
				rowsHTML+="<textarea form='form162_"+id+"' class='dblclick_editable' required></textarea>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form162_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='submit' class='save_icon' form='form162_"+id+"' title='Save'>";
				rowsHTML+="<input type='button' class='delete_icon' form='form162_"+id+"' title='Delete' onclick='$(this).parent().parent().remove();'>";
			rowsHTML+="</td>";
		rowsHTML+="</tr>";

		$('#form162_body').prepend(rowsHTML);
		longPressEditable($('.dblclick_editable'));

		var fields=document.getElementById("form162_"+id);
		var item_filter=fields.elements[0];
		var cp_filter=fields.elements[1];
		var result_filter=fields.elements[2];

		var item_data="<product_master>"+
					"<name></name>"+
					"</product_master>";
		set_my_value_list(item_data,item_filter,function ()
		{
			$(item_filter).focus();
		});

		var cp_data="<checklist_items>"+
					"<checkpoint></checkpoint>"+
					"</checklist_items>";
		set_my_value_list(cp_data,cp_filter);

		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form162_create_item(fields);
		});
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form Storage Structure
 * @formNo 167
 */
function form167_add_item()
{
	if(is_create_access('form167'))
	{
		var rowsHTML="";
		var id=vUtil.newKey();
		rowsHTML+="<tr>";
		rowsHTML+="<form id='form167_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Type'>";
				rowsHTML+="<input type='text' required form='form167_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Parent'>";
				rowsHTML+="<input type='text' form='form167_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Default Dimensions'>";
				rowsHTML+="Length: <input type='number' step='any' form='form167_"+id+"'>";
				rowsHTML+="<br>Breadth: <input type='number' step='any' form='form167_"+id+"'>";
				rowsHTML+="<br>Height: <input type='number' step='any' form='form167_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Unit'>";
				rowsHTML+="<input type='text' required value='m' form='form167_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form167_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='submit' class='save_icon' form='form167_"+id+"'>";
				rowsHTML+="<input type='button' class='delete_icon' form='form167_"+id+"' onclick='$(this).parent().parent().remove();'>";
			rowsHTML+="</td>";
		rowsHTML+="</tr>";

		$('#form167_body').prepend(rowsHTML);
		var fields=document.getElementById("form167_"+id);
		var type_filter=fields.elements[0];
		var parent_filter=fields.elements[1];
		var length_filter=fields.elements[2];
		var breadth_filter=fields.elements[3];
		var height_filter=fields.elements[4];
		var unit_filter=fields.elements[5];
		var save_button=fields.elements[7];

		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form167_create_item(fields);
		});

		$(type_filter).focus();

		var parent_data="<storage_structure>" +
				"<name></name>" +
				"</storage_structure>";
		set_my_value_list(parent_data,parent_filter);

		set_static_value_list('dimensions','unit',unit_filter);
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form Manage Channels
 * @formNo 171
 */
function form171_add_item()
{
	if(is_create_access('form171'))
	{
		var rowsHTML="";
		var id=vUtil.newKey();
		rowsHTML+="<tr>";
		rowsHTML+="<form id='form171_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Name'>";
				rowsHTML+="<input type='text' form='form171_"+id+"' required value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Details'>";
				rowsHTML+="<textarea form='form171_"+id+"'></textarea>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Dead Weight Factor'>";
				rowsHTML+="<input type='number' step='any' form='form171_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form171_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='submit' class='save_icon' form='form171_"+id+"' title='Save'>";
				rowsHTML+="<input type='button' class='delete_icon' form='form171_"+id+"' title='Delete' onclick='$(this).parent().parent().remove();'>";
			rowsHTML+="</td>";
		rowsHTML+="</tr>";

		$('#form171_body').prepend(rowsHTML);
		longPressEditable($('.dblclick_editable'));

		var fields=document.getElementById("form171_"+id);
		var name_filter=fields.elements[0];

		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form171_create_item(fields);
		});

		$(name_filter).focus();
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form Pricing Sheet
 * @formNo 172
 */
function form172_add_item()
{
	if(is_create_access('form172'))
	{
		var id=vUtil.newKey();
		var rowsHTML="<tr>";
			rowsHTML+="<form id='form172_"+id+"'></form>";
				rowsHTML+="<td data-th='Channel'>";
					rowsHTML+="<input type='text' style='width:100px;' form='form172_"+id+"'>";
				rowsHTML+="</td>";
				rowsHTML+="<td data-th='Item'>";
					rowsHTML+="<b>SKU</b>: <input required type='text' form='form172_"+id+"'>";
					rowsHTML+="<br><b>From</b>: <input required type='text' form='form172_"+id+"'>";
				rowsHTML+="</td>";
				rowsHTML+="<td data-th='Price'>";
					rowsHTML+="<b>MRP</b>: Rs. <input type='number' step='any' form='form172_"+id+"'>";
					rowsHTML+="<br><b>Disc.</b>: Rs. <input type='number' step='any' form='form172_"+id+"'>";
					rowsHTML+="<br><b>SP</b>: Rs. <input type='number' required step='any' form='form172_"+id+"'>";
					rowsHTML+="<br><b>Freight</b>: Rs. <input type='number' required step='any' form='form172_"+id+"' value='0'>";
				rowsHTML+="</td>";
				rowsHTML+="<td data-th='Channel Charges'>";
					rowsHTML+="<b>Comm.</b>: <input type='number' style='width:40px;' required step='any' form='form172_"+id+"' value='0'> %";
					rowsHTML+="<br><b>Comm.</b>: Rs. <input type='number' step='any' readonly='readonly' required form='form172_"+id+"' value='0'>";
					rowsHTML+="<br><b>Pickup</b>: Rs. <input type='number' style='width:60px;' required step='any' form='form172_"+id+"' value='0'>";
					rowsHTML+="<br><b>Others</b>: Rs. <input type='number' style='width:60px;' required step='any' form='form172_"+id+"' value='0'>";
					rowsHTML+="<br><b>S. Tax</b>: Rs. <input type='number' style='width:60px;' readonly='readonly' required step='any' form='form172_"+id+"' value='0'>";
					rowsHTML+="<br><b>Total</b>: Rs. <input type='number' style='width:60px;' readonly='readonly' required step='any' form='form172_"+id+"' value='0'>";
				rowsHTML+="</td>";
				rowsHTML+="<td data-th='Profit'>";
					rowsHTML+="<b>CP</b>: Rs. <input type='number' step='any' form='form172_"+id+"'>";
					rowsHTML+="<br><b>Profit</b>: Rs. <input type='number' step='any' readonly='readonly' form='form172_"+id+"'>";
					rowsHTML+="<br><b>Profit (MRP)</b>: <input type='number' style='width:40px;' step='any' readonly='readonly' form='form172_"+id+"'> %";
					rowsHTML+="<br><b>Profit (SP)</b>: <input type='number' style='width:40px;' step='any' readonly='readonly' form='form172_"+id+"'> %";
				rowsHTML+="</td>";
				rowsHTML+="<td data-th='Action'>";
					rowsHTML+="<input type='hidden' form='form172_"+id+"' value='"+id+"'>";
					rowsHTML+="<input type='submit' class='save_icon' form='form172_"+id+"' title='Save'>";
					rowsHTML+="<input type='button' class='delete_icon' form='form172_"+id+"' title='Delete' onclick='$(this).parent().parent().remove();'>";
				rowsHTML+="</td>";
		rowsHTML+="</tr>";

		$('#form172_body').prepend(rowsHTML);

		var fields=document.getElementById("form172_"+id);
		var channel_filter=fields.elements[0];
		var name_filter=fields.elements[1];
		var from_filter=fields.elements[2];
		var mrp_filter=fields.elements[3];
		var discount_filter=fields.elements[4];
		var sp_filter=fields.elements[5];
		var freight_filter=fields.elements[6];
		var commission_filter=fields.elements[7];
		var commission_charges_filter=fields.elements[8];
		var pickup_filter=fields.elements[9];
		var other_filter=fields.elements[10];
		var tax_filter=fields.elements[11];
		var total_charges_filter=fields.elements[12];
		var cp_filter=fields.elements[13];
		var profit_filter=fields.elements[14];
		var profit_mrp_filter=fields.elements[15];
		var profit_sp_filter=fields.elements[16];

		var channel_data="<sale_channels>"+
						"<name></name>"+
						"</sale_channels>";
		set_my_value_list(channel_data,channel_filter,function ()
		{
			$(channel_filter).focus();
		});

		var item_data="<product_master>"+
						"<name></name>"+
						"</product_master>";
		set_my_value_list(item_data,name_filter);

		$(from_filter).vdatetimepicker();

		$(name_filter).on('blur',function ()
		{
			var mrp_data="<product_instances>"+
						"<mrp></mrp>"+
						"<product_name exact='yes'>"+name_filter.value+"</product_name>"+
						"</product_instances>";
			set_my_value(mrp_data,mrp_filter,function()
			{
				$(mrp_filter).trigger('change');
			});

			var cp_data="<supplier_bill_items count='1'>"+
						"<unit_price></unit_price>"+
						"<quantity></quantity>"+
						"<product_name exact='yes'>"+name_filter.value+"</product_name>"+
						"</supplier_bill_items>";
			set_my_value(cp_data,cp_filter,function ()
			{
				$(cp_filter).trigger('change');
			});

			var cat_data="<category_sku_mapping>"+
						"<cat_type></cat_type>"+
						"<cat_name></cat_name>"+
						"<channel exact='yes'>"+channel_filter.value+"</channel>"+
						"<sku exact='yes'>"+name_filter.value+"</sku>"+
						"</category_sku_mapping>";
			fetch_requested_data('',cat_data,function (cats)
			{
				if(cats.length>0)
				{
					var comm_data="<channel_category>"+
								"<commission></commission>"+
								"<channel exact='yes'>"+channel_filter.value+"</channel>"+
								"<type exact='yes'>"+cats[0].cat_type+"</type>"+
								"<name exact='yes'>"+cats[0].cat_name+"</name>"+
								"</channel_category>";
					set_my_value(comm_data,commission_filter,function ()
					{
						var pickup_data="<pickup_charges>"+
										"<min_charges></min_charges>"+
										"<max_charges></max_charges>"+
										"<channel exact='yes'>"+channel_filter.value+"</channel>"+
										"<pincode exact='yes'>all</pincode>"+
										"</pickup_charges>";
						fetch_requested_data('',pickup_data,function(pickups)
						{
							var average_pickup=(parseFloat(pickups[0].min_charges)+parseFloat(pickups[0].max_charges))/2;
							pickup_filter.value=Math.max(parseFloat(pickups[0].min_charges),average_pickup);
							$(pickup_filter).trigger('change');
							$(commission_filter).trigger('change');
						});
					});
				}
				else
				{
					commission_filter.value=0;
					var pickup_data="<pickup_charges>"+
									"<min_charges></min_charges>"+
									"<max_charges></max_charges>"+
									"<channel exact='yes'>"+channel_filter.value+"</channel>"+
									"<pincode exact='yes'>all</pincode>"+
									"</pickup_charges>";
					fetch_requested_data('',pickup_data,function(pickups)
					{
						var average_pickup=(parseFloat(pickups[0].min_charges)+parseFloat(pickups[0].max_charges))/2;
						pickup_filter.value=Math.max(parseFloat(pickups[0].min_charges),average_pickup);
						$(pickup_filter).trigger('change');
						$(commission_filter).trigger('change');
					});
				}
			});
		});

		$(commission_filter).add(sp_filter).on('change',function ()
		{
			commission_charges_filter.value=vUtil.round((parseFloat(commission_filter.value)*parseFloat(sp_filter.value)/100),2);
			$(commission_charges_filter).trigger('change');
		});

		$(commission_charges_filter).add(pickup_filter).add(other_filter).on('change',function ()
		{
			tax_filter.value=vUtil.round((parseFloat(get_session_var('service_tax_rate'))*(parseFloat(other_filter.value)+parseFloat(commission_charges_filter.value)+parseFloat(pickup_filter.value))/100),2);
			total_charges_filter.value=parseFloat(other_filter.value)+parseFloat(commission_charges_filter.value)+parseFloat(pickup_filter.value)+parseFloat(tax_filter.value);
			$(total_charges_filter).trigger('change');
		});

		$(discount_filter).on('change',function()
		{
			sp_filter.value=parseFloat(mrp_filter.value)-parseFloat(discount_filter.value);
			$(sp_filter).trigger('change');
		});

		$(sp_filter).add(freight_filter).add(cp_filter).add(total_charges_filter).on('change',function ()
		{
			profit_filter.value=vUtil.round((parseFloat(sp_filter.value)+parseFloat(freight_filter.value)-parseFloat(total_charges_filter.value)-parseFloat(cp_filter.value)),2);
			$(profit_filter).trigger('change');
		});

		$(profit_filter).add(sp_filter).add(mrp_filter).on('change',function()
		{
			profit_mrp_filter.value=vUtil.round((parseFloat(profit_filter.value)/parseFloat(mrp_filter.value)*100),2);
			profit_sp_filter.value=vUtil.round((parseFloat(profit_filter.value)/parseFloat(sp_filter.value)*100),2);
		});

		$(fields).on("submit",function(event)
		{
			event.preventDefault();
			form172_create_item(fields);
		});

		longPressEditable($('.dblclick_editable'));
		$('textarea').autosize();
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form SKU mappings
 * @formNo 173
 */
function form173_add_item()
{
	if(is_create_access('form173'))
	{
		var rowsHTML="";
		var id=vUtil.newKey();
		rowsHTML+="<tr>";
		rowsHTML+="<form id='form173_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Channel'>";
				rowsHTML+="<input type='text' form='form173_"+id+"' required>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Channel SKU'>";
				rowsHTML+="<input type='text' form='form173_"+id+"' required>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Vendor SKU'>";
				rowsHTML+="<input type='text' form='form173_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='System SKU'>";
				rowsHTML+="<input type='text' form='form173_"+id+"' required>";
				rowsHTML+="<br>Name: <textarea readonly='readonly' form='form173_"+id+"'></textarea>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form173_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='submit' class='save_icon' form='form173_"+id+"' title='Save'>";
				rowsHTML+="<input type='button' class='delete_icon' form='form173_"+id+"' title='Delete' onclick='$(this).parent().parent().remove();'>";
			rowsHTML+="</td>";
		rowsHTML+="</tr>";

		$('#form173_body').prepend(rowsHTML);
		longPressEditable($('.dblclick_editable'));

		var fields=document.getElementById("form173_"+id);
		var channel_filter=fields.elements[0];
		var system_sku_filter=fields.elements[3];
		var description_filter=fields.elements[4];

		var channel_data="<sale_channels>"+
						"<name></name>"+
						"</sale_channels>";
		set_my_value_list(channel_data,channel_filter,function ()
		{
			$(channel_filter).focus();
		});

		var sku_data="<product_master>"+
					"<name></name>"+
					"</product_master>";
		set_my_value_list(sku_data,system_sku_filter);

		$(system_sku_filter).on('blur',function ()
		{
			var description_data="<product_master>"+
								"<description></description>"+
								"<name exact='yes'>"+system_sku_filter.value+"</name>"+
								"</product_master>";
			set_my_value(description_data,description_filter);
		});

		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form173_create_item(fields);
		});
	}
	else
	{
		$("#modal2_link").click();
	}
}


/**
 * @form Pickup Charges
 * @formNo 174
 */
function form174_add_item()
{
	if(is_create_access('form174'))
	{
		var rowsHTML="";
		var id=vUtil.newKey();
		rowsHTML+="<tr>";
		rowsHTML+="<form id='form174_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Channel'>";
				rowsHTML+="<input type='text' form='form174_"+id+"' required>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Pincode'>";
				rowsHTML+="<input type='number' form='form174_"+id+"' required>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Minimum'>";
				rowsHTML+="<input type='number' step='.01' min='0' value='0' form='form174_"+id+"' required>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Maximum'>";
				rowsHTML+="<input type='number' step='.01' min='0' value='0' form='form174_"+id+"' required>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Weight Factor'>";
				rowsHTML+="<input type='number' step='.01' form='form174_"+id+"' value='0' required>Rs./gm";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form174_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='submit' class='save_icon' form='form174_"+id+"' title='Save'>";
				rowsHTML+="<input type='button' class='delete_icon' form='form174_"+id+"' title='Delete' onclick='$(this).parent().parent().remove();'>";
			rowsHTML+="</td>";
		rowsHTML+="</tr>";

		$('#form174_body').prepend(rowsHTML);
		longPressEditable($('.dblclick_editable'));

		var fields=document.getElementById("form174_"+id);
		var channel_filter=fields.elements[0];
		var pincode_filter=fields.elements[3];

		var channel_data="<sale_channels>"+
						"<name></name>"+
						"</sale_channels>";
		set_my_value_list(channel_data,channel_filter,function ()
		{
			$(channel_filter).focus();
		});

		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form174_create_item(fields);
		});

	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form Channel Category
 * @formNo 175
 */
function form175_add_item()
{
	if(is_create_access('form175'))
	{
		var rowsHTML="";
		var id=vUtil.newKey();
		rowsHTML+="<tr>";
		rowsHTML+="<form id='form175_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Channel'>";
				rowsHTML+="<input type='text' form='form175_"+id+"' required>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Type'>";
				rowsHTML+="<input type='text' form='form175_"+id+"' required>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Name'>";
				rowsHTML+="<input type='text' form='form175_"+id+"' required>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Parent'>";
				rowsHTML+="<input type='text' form='form175_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Commission'>";
				rowsHTML+="<input type='number' step='.01' form='form175_"+id+"' required>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form175_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='submit' class='save_icon' form='form175_"+id+"' title='Save'>";
				rowsHTML+="<input type='button' class='delete_icon' form='form175_"+id+"' title='Delete' onclick='$(this).parent().parent().remove();'>";
			rowsHTML+="</td>";
		rowsHTML+="</tr>";

		$('#form175_body').prepend(rowsHTML);
		longPressEditable($('.dblclick_editable'));

		var fields=document.getElementById("form175_"+id);
		var channel_filter=fields.elements[0];
		var type_filter=fields.elements[1];
		var name_filter=fields.elements[2];
		var parent_filter=fields.elements[3];
		var commission_filter=fields.elements[4];

		var channel_data="<sale_channels>"+
						"<name></name>"+
						"</sale_channels>";
		set_my_value_list(channel_data,channel_filter);
		set_static_value_list('channel_category','type',type_filter);

		var parent_data="<channel_category>"+
					"<name></name>"+
					"<type exact='yes'>category</type>"+
					"</channel_category>";
		set_my_value_list(parent_data,parent_filter);

		$(parent_filter).on('blur',function()
		{
			var commission_data="<channel_category>"+
								"<commission></commission>"+
								"<name exact='yes'>"+parent_filter.value+"</name>"+
								"<channel exact='yes'>"+channel_filter.value+"</channel>"+
								"</channel_category>";
			set_my_value(commission_data,commission_filter);
		});

		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form175_create_item(fields);
		});

		$(name_filter).focus();
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form Category Item Mapping
 * @formNo 176
 */
function form176_add_item()
{
	if(is_create_access('form176'))
	{
		var id=vUtil.newKey();
		var rowsHTML="<tr>";
			rowsHTML+="<form id='form176_"+id+"'></form>";
				rowsHTML+="<td data-th='Channel'>";
					rowsHTML+="<input type='text' form='form176_"+id+"' required>";
				rowsHTML+="</td>";
				rowsHTML+="<td data-th='Type'>";
					rowsHTML+="<input type='text' class='dblclick_editable' form='form176_"+id+"'>";
				rowsHTML+="</td>";
				rowsHTML+="<td data-th='Category'>";
					rowsHTML+="<input type='text' class='dblclick_editable' form='form176_"+id+"'>";
				rowsHTML+="</td>";
				rowsHTML+="<td data-th='Item'>";
					rowsHTML+="<input type='text' form='form176_"+id+"' required>";
					rowsHTML+="<br><textarea readonly='readonly' form='form176_"+id+"'></textarea>";
				rowsHTML+="</td>";
				rowsHTML+="<td data-th='Action'>";
					rowsHTML+="<input type='hidden' form='form176_"+id+"' value='"+id+"'>";
					rowsHTML+="<input type='submit' class='save_icon' form='form176_"+id+"' title='Save'>";
				rowsHTML+="</td>";
		rowsHTML+="</tr>";

		$('#form176_body').prepend(rowsHTML);

		var fields=document.getElementById("form176_"+id);
		var channel_filter=fields.elements[0];
		var type_filter=fields.elements[1];
		var category_filter=fields.elements[2];
		var item_filter=fields.elements[3];
		var desc_filter=fields.elements[4];

		var channel_data="<sale_channels>"+
						"<name></name>"+
						"</sale_channels>";
		set_my_value_list(channel_data,channel_filter,function ()
		{
			$(channel_filter).focus();
		});

		set_static_value_list('category_sku_mapping','cat_type',type_filter);

		$(type_filter).on('blur',function()
		{
			var category_data="<channel_category>"+
							"<name></name>"+
							"<type exact='yes'>"+type_filter.value+"</type>"+
							"<channel exact='yes'>"+channel_filter.value+"</channel>"+
							"</channel_category>";
			set_my_value_list(category_data,category_filter);
		});

		var item_data="<product_master>"+
					"<name></name>"+
					"</product_master>";
		set_my_value_list(item_data,item_filter);

		$(item_filter).on('blur',function ()
		{
			var desc_data="<product_master>"+
					"<description></description>"+
					"<name exact='yes'>"+item_filter.value+"</name>"+
					"</product_master>";
			set_my_value(desc_data,desc_filter);
		});

		$(fields).on("submit",function(event)
		{
			event.preventDefault();
			form176_create_item(fields);
		});
	}
	else
	{
		$("#modal2_link").click();
	}
}


/**
 * @form Prioritization Parameters
 * @formNo 177
 */
function form177_add_item()
{
	if(is_create_access('form177'))
	{
		var rowsHTML="";
		var id=vUtil.newKey();
		rowsHTML+="<tr>";
		rowsHTML+="<form id='form177_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Type'>";
				rowsHTML+="<input type='text' form='form177_"+id+"' required>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Parameter'>";
				rowsHTML+="<input type='text' form='form177_"+id+"' required>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Values'>";
				rowsHTML+="<textarea title='Use ; to differentiate values' form='form177_"+id+"'></textarea>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Threshold'>";
				rowsHTML+="<input type='number' step='any' form='form177_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form177_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='submit' class='save_icon' form='form177_"+id+"' title='Save'>";
				rowsHTML+="<input type='button' class='delete_icon' form='form177_"+id+"' title='Delete' onclick='$(this).parent().parent().remove();'>";
			rowsHTML+="</td>";
		rowsHTML+="</tr>";

		$('#form177_body').prepend(rowsHTML);
		longPressEditable($('.dblclick_editable'));

		var fields=document.getElementById("form177_"+id);
		var type_filter=fields.elements[0];
		var name_filter=fields.elements[1];

		set_static_value_list('prioritization_parameters','type',type_filter,function ()
		{
			$(type_filter).focus();
		});

		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form177_create_item(fields);
		});

	}
	else
	{
		$("#modal2_link").click();
	}
}


/**
 * @form Production Steps
 * @formNo 184
 */
function form184_add_item()
{
	if(is_create_access('form184'))
	{
		var rowsHTML="";
		var id=vUtil.newKey();
		rowsHTML+="<tr>";
		rowsHTML+="<form id='form184_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Order'>";
				rowsHTML+="<input type='text' form='form184_"+id+"' required readonly='readonly'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Step'>";
				rowsHTML+="<textarea form='form184_"+id+"' required></textarea>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Details'>";
				rowsHTML+="Time Estimate: <input type='number' step='any' class='dblclick_editable' title='Estimate of hours spent per piece of item production' form='form184_"+id+"'>";
				rowsHTML+="<br>Default Assignee: <input type='text' class='dblclick_editable'  form='form184_"+id+"'>";
				rowsHTML+="<br>Notes: <textarea class='dblclick_editable' form='form184_"+id+"'></textarea>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Type'>";
				rowsHTML+="<input type='text' form='form184_"+id+"' required>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Status'>";
				rowsHTML+="<input type='text' form='form184_"+id+"' required value='active'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form184_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='submit' class='save_icon' form='form184_"+id+"' title='Save' id='save_form184_"+id+"'>";
				rowsHTML+="<input type='button' class='delete_icon' form='form184_"+id+"' title='Delete' onclick='$(this).parent().parent().remove();'>";
			rowsHTML+="</td>";
		rowsHTML+="</tr>";

		$('#form184_body').append(rowsHTML);
		longPressEditable($('.dblclick_editable'));

		var fields=document.getElementById("form184_"+id);
		var step_filter=fields.elements[1];
		var assignee_filter=fields.elements[3];
		var type_filter=fields.elements[5];
		var status_filter=fields.elements[6];

		var assignee_data="<staff>"+
							"<acc_name></acc_name>"+
							"<status exact='yes'>active</status>"+
							"</staff>";
		set_my_value_list(assignee_data,assignee_filter);

		set_static_value_list('business_processes','type',type_filter);
		set_static_value_list('business_processes','status',status_filter);

		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form184_create_item(fields);
		});

		$(step_filter).focus();
		form184_update_serial_numbers();
	}
	else
	{
		$("#modal2_link").click();
	}
}


/**
 * @form Testing Steps
 * @formNo 187
 */
function form187_add_item()
{
	if(is_create_access('form187'))
	{
		var rowsHTML="";
		var id=vUtil.newKey();
		rowsHTML+="<tr>";
		rowsHTML+="<form id='form187_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Order'>";
				rowsHTML+="<input type='text' form='form187_"+id+"' required readonly='readonly'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Step'>";
				rowsHTML+="<textarea form='form187_"+id+"' required></textarea>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Details'>";
				rowsHTML+="Time Estimate: <input type='number' step='any' class='dblclick_editable' title='Estimate of hours spent per piece of item testing' form='form187_"+id+"'>";
				rowsHTML+="<br>Default Assignee: <input type='text' class='dblclick_editable'  form='form187_"+id+"'>";
				rowsHTML+="<br>Notes: <textarea class='dblclick_editable' form='form187_"+id+"'></textarea>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Status'>";
				rowsHTML+="<input type='text' form='form187_"+id+"' required value='active'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form187_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='submit' class='save_icon' form='form187_"+id+"' title='Save' id='save_form187_"+id+"'>";
				rowsHTML+="<input type='button' class='delete_icon' form='form187_"+id+"' title='Delete' onclick='$(this).parent().parent().remove();'>";
			rowsHTML+="</td>";
		rowsHTML+="</tr>";

		$('#form187_body').append(rowsHTML);
		longPressEditable($('.dblclick_editable'));

		var fields=document.getElementById("form187_"+id);
		var step_filter=fields.elements[1];
		var assignee_filter=fields.elements[3];
		var status_filter=fields.elements[5];

		var assignee_data="<staff>"+
							"<acc_name></acc_name>"+
							"<status exact='yes'>active</status>"+
							"</staff>";
		set_my_value_list(assignee_data,assignee_filter);

		set_static_value_list('business_processes','status',status_filter);

		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form187_create_item(fields);
		});

		$(step_filter).focus();
		form187_update_serial_numbers();
	}
	else
	{
		$("#modal2_link").click();
	}
}


/**
 * @form Enter Purchase Bill (Laundry)
 * @formNo 192
 */
function form192_add_item()
{
	if(is_create_access('form192'))
	{
		var id=vUtil.newKey();
		var rowsHTML="<tr>";
		rowsHTML+="<form id='form192_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Item'>";
				rowsHTML+="<input type='text' required form='form192_"+id+"'>";
				rowsHTML+="<img src='./images/add_image.png' class='add_image' title='Add new product' id='form192_add_product_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Quantity'>";
				rowsHTML+="<input type='number' step='any' required form='form192_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Price'>";
				rowsHTML+="<input type='number' form='form192_"+id+"' step='any'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Amount'>";
				rowsHTML+="Amount: <input type='number' readonly='readonly' form='form192_"+id+"' value='' step='any'>";
				rowsHTML+="<br>Tax: <input type='number' readonly='readonly' form='form192_"+id+"' value='' step='any'>";
				rowsHTML+="<br>Total: <input type='number' readonly='readonly' required form='form192_"+id+"' step='any'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form192_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='button' class='submit_hidden' form='form192_"+id+"' id='save_form192_"+id+"' >";
				rowsHTML+="<input type='button' class='delete_icon' form='form192_"+id+"' id='delete_form192_"+id+"' onclick='$(this).parent().parent().remove();'>";
				rowsHTML+="<input type='hidden' form='form192_"+id+"'>";
				rowsHTML+="<input type='submit' class='submit_hidden' form='form192_"+id+"'>";
			rowsHTML+="</td>";
		rowsHTML+="</tr>";

		$('#form192_body').append(rowsHTML);

		var fields=document.getElementById("form192_"+id);
		var name_filter=fields.elements[0];
		var quantity_filter=fields.elements[1];
		var price_filter=fields.elements[2];
		var amount_filter=fields.elements[3];
		var tax_filter=fields.elements[4];
		var total_filter=fields.elements[5];
		var id_filter=fields.elements[6];
		var save_button=fields.elements[7];
		var tax_unit_filter=fields.elements[9];

		$(save_button).on("click", function(event)
		{
			event.preventDefault();
			form192_create_item(fields);
		});

		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form192_add_item();
		});

		var product_data="<product_master>" +
				"<name></name>" +
				"</product_master>";
		set_my_value_list(product_data,name_filter,function ()
		{
			$(name_filter).focus();
		});

		var add_product=document.getElementById('form192_add_product_'+id);
		$(add_product).on('click',function()
		{
			modal112_action(function()
			{
				var product_data="<product_master>" +
						"<name></name>" +
						"</product_master>";
				set_my_value_list(product_data,name_filter,function ()
				{
					$(name_filter).focus();
				});
			});
		});

		$(name_filter).on('blur',function(event)
		{
			var price_data="<supplier_bill_items count='1'>" +
					"<unit_price></unit_price>" +
					"<product_name exact='yes'>"+name_filter.value+"</product_name>" +
					"</supplier_bill_items>";
			set_my_value(price_data,price_filter);

			var tax_data="<product_master>"+
						"<tax></tax>"+
						"<name exact='yes'>"+name_filter.value+"</name>"+
						"</product_master>";
			set_my_value(tax_data,tax_unit_filter);
		});

		$(quantity_filter).add(price_filter).on('blur',function(event)
		{
			amount_filter.value=vUtil.round((parseFloat(quantity_filter.value)*parseFloat(price_filter.value)),2);
			tax_filter.value=vUtil.round((parseFloat(amount_filter.value)*parseFloat(tax_unit_filter.value)/100),2);
			var total=parseFloat(amount_filter.value)+parseFloat(tax_filter.value);
			total_filter.value=vUtil.round(total,0);
		});
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form Update Stock
 * @formNo 193
 */
function form193_add_item()
{
	if(is_create_access('form193'))
	{
		var id=vUtil.newKey();
		var rowsHTML="<tr>";
		rowsHTML+="<form id='193form193_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td id='form193_barcode_"+id+"' data-th='Barcode'>";
				rowsHTML+="<input type='text' form='193form193_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Item'>";
				rowsHTML+="SKU: <input type='text' required form='193form193_"+id+"'>";
				rowsHTML+="<br>Name: <textarea form='193form193_"+id+"' readonly='readonly'></textarea>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Batch'>";
				rowsHTML+="<input type='text' required form='193form193_"+id+"'>";
				rowsHTML+="<img src='./images/add_image.png' class='add_image' title='Add batch' id='form193_add_batch_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Quantity'>";
				rowsHTML+="1";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='submit' class='submit_hidden' form='193form193_"+id+"' id='save_form193_"+id+"' >";
				rowsHTML+="<input type='button' class='delete_icon' form='193form193_"+id+"' id='delete_form193_"+id+"' onclick='$(this).parent().parent().remove();form193_get_totals();'>";
			rowsHTML+="</td>";
		rowsHTML+="</tr>";

		$('#form193_body').prepend(rowsHTML);

		var fields=document.getElementById("193form193_"+id);
		var barcode_filter=fields.elements[0];
		var name_filter=fields.elements[1];
		var desc_filter=fields.elements[2];
		var batch_filter=fields.elements[3];

		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form193_get_totals();
			form193_add_item();
		});

		$(barcode_filter).focus();

		var product_data="<product_master>" +
				"<name></name>" +
				"</product_master>";
		set_my_value_list(product_data,name_filter);

		var smaller_barcodes=get_session_var('brands_small_barcode');

		$(name_filter).off('blur');
		$(name_filter).on('blur',function(event)
		{
			var desc_data="<product_master>"+
						"<description></description>"+
						"<bar_code></bar_code>"+
						"<make></make>"+
						"<name exact='yes'>"+name_filter.value+"</name>"+
						"</product_master>";
			fetch_requested_data('',desc_data,function (descs)
			{
				if(descs.length>0)
				{
					desc_filter.value=descs[0].description;
					barcode_filter.value=descs[0].bar_code;
					var barcode_td=document.getElementById('form193_barcode_'+id);

					if(barcode_filter.value!="")
					{

						if(smaller_barcodes!=null && smaller_barcodes.indexOf(descs[0].make)>-1)
						{
							$(barcode_td).append("<img src='./images/barcode.png' class='barcode_icon' title='Print Barcode - "+descs[0].bar_code+"' onclick=\"print_smaller_product_barcode('"+descs[0].bar_code+"','"+name_filter.value+"','"+descs[0].description+"');\">");
						}
						else
						{
							$(barcode_td).append("<img src='./images/barcode.png' class='barcode_icon' title='Print Barcode - "+descs[0].bar_code+"' onclick=\"print_product_barcode('"+descs[0].bar_code+"','"+name_filter.value+"','"+descs[0].description+"');\">");
						}
					}
					else
					{
						var string=""+get_my_time();
						modal116_action(string,name_filter.value);
						if(smaller_barcodes!=null && smaller_barcodes.indexOf(descs[0].make)>-1)
						{
							$(barcode_td).append("<img src='./images/barcode.png' class='barcode_icon' title='Print Barcode - "+string+"' onclick=\"print_smaller_product_barcode('"+string+"','"+name_filter.value+"','"+descs[0].description+"');\">");
						}
						else
						{
							$(barcode_td).append("<img src='./images/barcode.png' class='barcode_icon' title='Print Barcode - "+string+"' onclick=\"print_product_barcode('"+string+"','"+name_filter.value+"','"+descs[0].description+"');\">");
						}
					}
				}
			});

			var batch_data="<product_instances>"+
						"<batch></batch>"+
						"<product_name exact='yes'>"+name_filter.value+"</product_name>"+
						"</product_instances>";
			set_my_value_list(batch_data,batch_filter);

			var rows_length=$('#form193_body').find('tr').length;

			var first_batch_match=false;
			$("[id^='193form193_']").each(function (index)
			{
				if((index!=0 || rows_length==1) && this.elements[1].value==name_filter.value && !first_batch_match)
				{
					batch_filter.value=this.elements[3].value;
					first_batch_match=true;
					if(batch_filter.value=="")
					{
						batch_filter.value=name_filter.value;
						$(batch_filter).focus();
						if(rows_length!=1)
						{
							$('#form193_body>tr:first').remove();
						}
					}
				}
			});
		});

		var add_batch=document.getElementById('form193_add_batch_'+id);
		$(add_batch).on('click',function()
		{
			modal120_action(function()
			{
				var batch_data="<product_instances>" +
					"<batch></batch>" +
					"<product_name exact='yes'>"+name_filter.value+"</product_name>" +
					"</product_instances>";
				set_my_value_list(batch_data,batch_filter);
			},name_filter.value,'required');
		});

		$(barcode_filter).off('keydown');
		$(barcode_filter).on('keydown',function (event)
		{
			if(event.keyCode == 13 )
			{
				event.preventDefault();

				var item_data="<product_master count='1'>"+
							"<name></name>"+
							"<description></description>"+
							"<bar_code exact='yes'>"+barcode_filter.value+"</bar_code>"+
							"</product_master>";
				fetch_requested_data('',item_data,function (products)
				{
					if(products.length>0)
					{
						desc_filter.value=products[0].description;
						name_filter.value=products[0].name;

						var batch_data="<product_instances>"+
									"<batch></batch>"+
									"<product_name exact='yes'>"+name_filter.value+"</product_name>"+
									"</product_instances>";
						set_my_value_list(batch_data,batch_filter);

						var rows_length=$('#form193_body').find('tr').length;

						var first_batch_match=false;
						$("[id^='193form193_']").each(function (index)
						{
							if((index!=0 || rows_length==1) && this.elements[1].value==name_filter.value && !first_batch_match)
							{
								batch_filter.value=this.elements[3].value;
								first_batch_match=true;
								//return false;
							}
						});

						if(batch_filter.value=="")
						{
							batch_filter.value=name_filter.value;
							$(batch_filter).focus();
						}
						else
						{
							form193_get_totals();
							form193_add_item();
						}
					}
					else
					{
						modal116_action(barcode_filter.value);
						barcode_filter.value="";
					}
				});
			}
		});
	}
	else
	{
		$("#modal2_link").click();
	}
}


/**
 * @form Exchanges
 * @formNo 202
 */
function form202_add_item()
{
	if(is_create_access('form202'))
	{
		var id=vUtil.newKey();
		var rowsHTML="<tr>";
		rowsHTML+="<form id='form202_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='AWB #'>";
				rowsHTML+="<input type='text' required form='form202_"+id+"' oninvalid=\"setCustomValidity('This AWB # is invalid')\">";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Order #'>";
				rowsHTML+="<input type='text' form='form202_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Address'>";
				rowsHTML+="<textarea readonly='readonly' form='form202_"+id+"'></textarea>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form202_"+id+"'>";
				rowsHTML+="<input type='submit' class='submit_hidden' form='form202_"+id+"' id='save_form202_"+id+"' >";
				rowsHTML+="<input type='button' class='delete_icon' form='form202_"+id+"' id='delete_form202_"+id+"' onclick='form202_delete_item($(this))'>";
				rowsHTML+="<input type='hidden' form='form202_"+id+"' name='order_history'>";
			rowsHTML+="</td>";
		rowsHTML+="</tr>";

		$('#form202_body').prepend(rowsHTML);

		var fields=document.getElementById("form202_"+id);
		var awb_filter=fields.elements[0];
		var order_filter=fields.elements[1];
		var address_filter=fields.elements[2];
		var id_filter=fields.elements[3];
		var order_history=fields.elements[6];

		$(fields).on("submit", function(event)
		{
			event.preventDefault();

			var double_entry=0;
			$("[id^='save_form202']").each(function(index)
			{
				var subform_id=$(this).attr('form');
				var subform=document.getElementById(subform_id);

				if(subform.elements[0].value==awb_filter.value)
					double_entry+=1;
			});

			if(double_entry<2)
			{
				form202_add_item();
			}
			else
			{
				awb_filter.value="";
				$("#modal65_link").click();
			}
		});

		$(awb_filter).focus();

		$(awb_filter).on('keydown',function (event)
		{
			if(event.keyCode == 13 )
			{
				event.preventDefault();

				var double_entry=0;
				$("[id^='save_form202']").each(function(index)
				{
					var subform_id=$(this).attr('form');
					var subform=document.getElementById(subform_id);

					if(subform.elements[0].value==awb_filter.value)
						double_entry+=1;
				});

				if(double_entry<2)
				{
					var order_data="<logistics_orders count='1'>"+
							"<id></id>"+
							"<order_num></order_num>"+
							"<address1></address1>"+
							"<address2></address2>"+
							"<city></city>"+
							"<pincode></pincode>"+
							"<order_history></order_history>"+
							"<status array='yes'>--picked--not received--</status>"+
							"<awb_num exact='yes'>"+awb_filter.value+"</awb_num>"+
							"</logistics_orders>";
					fetch_requested_data('',order_data,function(orders)
					{
						if(orders.length>0)
						{
							address_filter.value=orders[0].address1+", "+orders[0].address2+", "+orders[0].city+"-"+orders[0].pincode;
							order_filter.value=orders[0].order_num;
							id_filter.value=orders[0].id;
							order_history.value=orders[0].order_history;
							form202_update_item(fields);
							form202_add_item();
						}
						else
						{
							address_filter.value="";
							order_filter.value="";
							id_filter.value="";
							order_history.value="";
							awb_filter.value="";
							$("#modal65_link").click();
						}
					});
				}
				else
				{
					awb_filter.value="";
					$("#modal65_link").click();
				}

			}
		});

		$('textarea').autosize();
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form Pending Logistics Orders
 * @formNo 204
 */
function form204_add_item()
{
	if(is_create_access('form204'))
	{
		var id=vUtil.newKey();
		var rowsHTML="<tr>";
		rowsHTML+="<form id='form204_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='AWB #'>";
				rowsHTML+="<input type='text' required form='form204_"+id+"' oninvalid=\"setCustomValidity('This AWB # is invalid')\">";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Order #'>";
				rowsHTML+="<input type='text' form='form204_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form204_"+id+"'>";
				rowsHTML+="<input type='submit' class='submit_hidden' form='form204_"+id+"' id='save_form204_"+id+"' >";
				rowsHTML+="<input type='button' class='delete_icon' form='form204_"+id+"' id='delete_form204_"+id+"' onclick='form204_delete_item($(this))'>";
				rowsHTML+="<input type='hidden' form='form204_"+id+"' name='order_history'>";
			rowsHTML+="</td>";
		rowsHTML+="</tr>";

		$('#form204_body').prepend(rowsHTML);

		var fields=document.getElementById("form204_"+id);
		var awb_filter=fields.elements[0];
		var order_filter=fields.elements[1];
		var id_filter=fields.elements[2];
		var order_history=fields.elements[5];

		$(fields).on("submit", function(event)
		{
			event.preventDefault();

			var double_entry=0;
			$("[id^='save_form204']").each(function(index)
			{
				var subform_id=$(this).attr('form');
				var subform=document.getElementById(subform_id);

				if(subform.elements[0].value==awb_filter.value)
					double_entry+=1;
			});

			if(double_entry<2)
			{
				form204_add_item();
			}
			else
			{
				awb_filter.value="";
				$("#modal65_link").click();
			}
		});

		$(awb_filter).focus();

		$(awb_filter).on('keydown',function (event)
		{
			if(event.keyCode == 13 )
			{
				event.preventDefault();

				var double_entry=0;
				$("[id^='save_form204']").each(function(index)
				{
					var subform_id=$(this).attr('form');
					var subform=document.getElementById(subform_id);

					if(subform.elements[0].value==awb_filter.value)
						double_entry+=1;
				});

				if(double_entry<2)
				{
					var order_data="<logistics_orders count='1'>"+
							"<id></id>"+
							"<order_num></order_num>"+
							"<order_history></order_history>"+
							"<status exact='yes'>out for delivery</status>"+
							"<awb_num exact='yes'>"+awb_filter.value+"</awb_num>"+
							"</logistics_orders>";
					fetch_requested_data('',order_data,function(orders)
					{
						if(orders.length>0)
						{
							order_filter.value=orders[0].order_num;
							id_filter.value=orders[0].id;
							order_history.value=orders[0].order_history;
							form204_update_item(fields);
							form204_add_item();
						}
						else
						{
							order_filter.value="";
							id_filter.value="";
							order_history.value="";
							awb_filter.value="";
							$("#modal65_link").click();
						}
					});
				}
				else
				{
					awb_filter.value="";
					$("#modal65_link").click();
				}

			}
		});
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form unDelivered Logistics Orders
 * @formNo 205
 */
function form205_add_item()
{
	if(is_create_access('form205'))
	{
		var id=vUtil.newKey();
		var rowsHTML="<tr>";
		rowsHTML+="<form id='form205_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='AWB #'>";
				rowsHTML+="<input type='text' required form='form205_"+id+"' oninvalid=\"setCustomValidity('This AWB # is invalid')\">";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Order #'>";
				rowsHTML+="<input type='text' form='form205_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form205_"+id+"'>";
				rowsHTML+="<input type='submit' class='submit_hidden' form='form205_"+id+"' id='save_form205_"+id+"' >";
				rowsHTML+="<input type='button' class='delete_icon' form='form205_"+id+"' id='delete_form205_"+id+"' onclick='form205_delete_item($(this));'>";
				rowsHTML+="<input type='hidden' form='form205_"+id+"' name='order_history'>";
			rowsHTML+="</td>";
		rowsHTML+="</tr>";

		$('#form205_body').prepend(rowsHTML);

		var fields=document.getElementById("form205_"+id);
		var awb_filter=fields.elements[0];
		var order_filter=fields.elements[1];
		var id_filter=fields.elements[2];
		var order_history=fields.elements[5];

		$(fields).on("submit", function(event)
		{
			event.preventDefault();

			var double_entry=0;
			$("[id^='save_form205']").each(function(index)
			{
				var subform_id=$(this).attr('form');
				var subform=document.getElementById(subform_id);

				if(subform.elements[0].value==awb_filter.value)
					double_entry+=1;
			});

			if(double_entry<2)
			{
				form205_add_item();
			}
			else
			{
				awb_filter.value="";
				$("#modal65_link").click();
			}
		});


		$(awb_filter).focus();

		$(awb_filter).on('keydown',function (event)
		{
			if(event.keyCode == 13 )
			{
				event.preventDefault();

				var double_entry=0;
				$("[id^='save_form205']").each(function(index)
				{
					var subform_id=$(this).attr('form');
					var subform=document.getElementById(subform_id);

					if(subform.elements[0].value==awb_filter.value)
						double_entry+=1;
				});

				if(double_entry<2)
				{
					var order_data="<logistics_orders count='1'>"+
							"<id></id>"+
							"<order_num></order_num>"+
							"<order_history></order_history>"+
							"<status exact='yes'>out for delivery</status>"+
							"<awb_num exact='yes'>"+awb_filter.value+"</awb_num>"+
							"</logistics_orders>";
					fetch_requested_data('',order_data,function(orders)
					{
						if(orders.length>0)
						{
							order_filter.value=orders[0].order_num;
							id_filter.value=orders[0].id;
							order_history.value=orders[0].order_history;
							form205_update_item(fields);
							form205_add_item();
						}
						else
						{
							order_filter.value="";
							id_filter.value="";
							order_history.value="";
							awb_filter.value="";
							$("#modal65_link").click();
						}
					});
				}
				else
				{
					awb_filter.value="";
					$("#modal65_link").click();
				}

			}
		});
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form delivered Logistics Orders
 * @formNo 206
 */
function form206_add_item()
{
	if(is_create_access('form206'))
	{
		var id=vUtil.newKey();
		var rowsHTML="<tr>";
		rowsHTML+="<form id='form206_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='AWB #'>";
				rowsHTML+="<input type='text' required form='form206_"+id+"' oninvalid=\"setCustomValidity('This AWB # is invalid')\">";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Order #'>";
				rowsHTML+="<input type='text' form='form206_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form206_"+id+"'>";
				rowsHTML+="<input type='submit' class='submit_hidden' form='form206_"+id+"' id='save_form206_"+id+"' >";
				rowsHTML+="<input type='button' class='delete_icon' form='form206_"+id+"' id='delete_form206_"+id+"' onclick='form206_delete_item($(this));'>";
				rowsHTML+="<input type='hidden' form='form206_"+id+"' name='order_history'>";
			rowsHTML+="</td>";
		rowsHTML+="</tr>";

		$('#form206_body').prepend(rowsHTML);

		var fields=document.getElementById("form206_"+id);
		var awb_filter=fields.elements[0];
		var order_filter=fields.elements[1];
		var id_filter=fields.elements[2];
		var order_history=fields.elements[5];

		$(fields).on("submit", function(event)
		{
			event.preventDefault();

			var double_entry=0;
			$("[id^='save_form206']").each(function(index)
			{
				var subform_id=$(this).attr('form');
				var subform=document.getElementById(subform_id);

				if(subform.elements[0].value==awb_filter.value)
					double_entry+=1;
			});

			if(double_entry<2)
			{
				form206_add_item();
			}
			else
			{
				awb_filter.value="";
				$("#modal65_link").click();
			}
		});

		$(awb_filter).focus();

		$(awb_filter).on('keydown',function (event)
		{
			if(event.keyCode == 13 )
			{
				event.preventDefault();

				var double_entry=0;
				$("[id^='save_form206']").each(function(index)
				{
					var subform_id=$(this).attr('form');
					var subform=document.getElementById(subform_id);

					if(subform.elements[0].value==awb_filter.value)
						double_entry+=1;
				});

				if(double_entry<2)
				{
					var order_data="<logistics_orders count='1'>"+
							"<id></id>"+
							"<order_num></order_num>"+
							"<order_history></order_history>"+
							"<status exact='yes'>out for delivery</status>"+
							"<awb_num exact='yes'>"+awb_filter.value+"</awb_num>"+
							"</logistics_orders>";
					fetch_requested_data('',order_data,function(orders)
					{
						if(orders.length>0)
						{
							order_filter.value=orders[0].order_num;
							id_filter.value=orders[0].id;
							order_history.value=orders[0].order_history;
							form206_update_item(fields);
							form206_add_item();
						}
						else
						{
							order_filter.value="";
							id_filter.value="";
							order_history.value="";
							awb_filter.value="";
							$("#modal65_link").click();
						}
					});
				}
				else
				{
					awb_filter.value="";
					$("#modal65_link").click();
				}

			}
		});
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form Treatment Plan Items
 * @formNo 209
 */
function form209_add_item()
{
	if(is_create_access('form209'))
	{
		var filter_fields=document.getElementById('form209_master');

		var id=vUtil.newKey();
		var rowsHTML="<tr>";
		rowsHTML+="<form id='form209_"+id+"'></form>";
			rowsHTML+="<td data-th='Order'>";
				rowsHTML+="<input type='number' readonly='readonly' form='form209_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Item'>";
				rowsHTML+="<input type='text' form='form209_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Details'>";
				rowsHTML+="<textarea class='dblclick_editable' form='form209_"+id+"'></textarea>";
				rowsHTML+="<br><div id='form209_documents_"+id+"'></div>";
				rowsHTML+="<input type='button' form='form209_"+id+"' value='Add document' class='generic_icon'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Schedule'>";
				rowsHTML+="From: <input type='text' class='dblclick_editable' form='form209_"+id+"'>";
				rowsHTML+="<br>To: <input type='text' class='dblclick_editable' form='form209_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Status'>";
				rowsHTML+="<input type='text' form='form209_"+id+"' class='dblclick_editable' value='pending'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form209_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='button' class='save_icon' form='form209_"+id+"' id='save_form209_"+id+"'>";
				rowsHTML+="<input type='button' class='delete_icon' form='form209_"+id+"' id='delete_form209_"+id+"' onclick='form209_delete_item($(this));'>";
			rowsHTML+="</td>";
		rowsHTML+="</tr>";

		$('#form209_body').prepend(rowsHTML);
		var fields=document.getElementById('form209_'+id);
		var item_filter=fields.elements[1];
		var doc_filter=fields.elements[3];
		var from_filter=fields.elements[4];
		var to_filter=fields.elements[5];
		var status_filter=fields.elements[6];
		var save_button=fields.elements[8];

		$(item_filter).focus();

		$(doc_filter).on('click',function ()
		{
			modal144_action('treatment_plan_items',id,function (url,doc_name)
			{
				var docHTML="<a href='"+url+"' download='"+doc_name+"'><u>"+doc_name+"</u></a><br>";
				var doc_container=document.getElementById('form209_documents_'+id);
				$(doc_container).append(docHTML);
			});
		});

		$(from_filter).datepicker();
		$(to_filter).datepicker();
		set_static_value_list('treatment_plan_items','status',status_filter);

		$(save_button).on('click',function (event)
		{
			event.preventDefault();
			form209_create_item(fields);
		});

		form209_update_serial_numbers();
	}
	else
	{
		$("#modal2_link").click();
	}
}


/**
 * @form Create manifest
 * @formNo 215
 */
function form215_add_item()
{
	if(is_create_access('form215'))
	{
		var id=vUtil.newKey();
		var rowsHTML="<tr>";
		rowsHTML+="<form id='form215_"+id+"'></form>";
			rowsHTML+="<td data-th='S.No.'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Bill Id'>";
				rowsHTML+="<input type='text' form='form215_"+id+"' oninvalid=\"setCustomValidity('This Bill id is invalid')\">";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Invoice #'>";
				rowsHTML+="<br><input type='text' required readonly='readonly' form='form215_"+id+"' oninvalid=\"setCustomValidity('This Invoice # is invalid')\">";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Order #'>";
				rowsHTML+="<input type='text' required readonly='readonly' form='form215_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Channel'>";
				rowsHTML+="<input type='text' required readonly='readonly' form='form215_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form215_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='button' class='submit_hidden' form='form215_"+id+"' id='save_form215_"+id+"'>";
				rowsHTML+="<input type='button' class='delete_icon' form='form215_"+id+"' id='delete_form215_"+id+"' onclick='$(this).parent().parent().remove(); form215_update_serial_numbers();'>";
				rowsHTML+="<input type='submit' class='submit_hidden' form='form215_"+id+"'>";
			rowsHTML+="</td>";
		rowsHTML+="</tr>";

		$('#form215_body').prepend(rowsHTML);

		var item_form=document.getElementById('form215_'+id);
		var bill_id_filter=item_form.elements[0];
		var invoice_filter=item_form.elements[1];
		var order_filter=item_form.elements[2];
		var channel_filter=item_form.elements[3];
		var id_filter=item_form.elements[4];
		var save_button=item_form.elements[5];

		$(item_form).on("submit", function(event)
		{
			event.preventDefault();
			var total_entries=0;
			var double_entry=0;
			$("[id^='save_form215']").each(function(index)
			{
				var subform_id=$(this).attr('form');
				var subform=document.getElementById(subform_id);
				total_entries+=1;
				if(subform.elements[0].value==bill_id_filter.value && bill_id_filter.value!="")
					double_entry+=1;
			});

			if(total_entries==1)
			{
				form215_create_form(function()
				{
					if(double_entry<2)
					{
						form215_create_item(item_form);
						form215_add_item();
					}
					else
					{
						bill_id_filter.value="";
						$("#modal65_link").click();
					}
				});
			}
			else
			{
				if(double_entry<2)
				{
					form215_create_item(item_form);
					form215_add_item();
				}
				else
				{
					bill_id_filter.value="";
					$("#modal65_link").click();
				}
			}
		});

		$(bill_id_filter).focus();

		$(bill_id_filter).on('keydown',function (event)
		{
			if(event.keyCode == 13 )
			{
				event.preventDefault();

				var total_entries=0;
				var double_entry=0;
				$("[id^='save_form215']").each(function(index)
				{
					var subform_id=$(this).attr('form');
					var subform=document.getElementById(subform_id);

					total_entries+=1;

					if(subform.elements[0].value==bill_id_filter.value && bill_id_filter.value!="")
						double_entry+=1;
				});

				if(total_entries==1)
				{
					form215_create_form(function ()
					{
						if(double_entry<2)
						{
							var orders_data="<bills count='1'>"+
											"<id>"+bill_id_filter.value+"</id>"+
											"<bill_num></bill_num>" +
											"<order_num></order_num>" +
											"<status></status>"+
											"<channel></channel>" +
											"</bills>";
							//console.log(orders_data);
							fetch_requested_data('',orders_data,function (orders)
							{
								//console.log(orders);
								if(orders.length>0 && orders[0].status!='dispatched')
								{
									invoice_filter.value=orders[0].bill_num;
									channel_filter.value=orders[0].channel;
									order_filter.value=orders[0].order_num;
									id_filter.value=orders[0].id;
									form215_create_item(item_form);
									form215_add_item();
								}
								else
								{
									invoice_filter.value="";
									channel_filter.value="";
									order_filter.value="";
									id_filter.value=vUtil.newKey();
									bill_id_filter.value="";
									$("#modal65_link").click();
								}
							});
						}
						else
						{
							bill_id_filter.value="";
							$("#modal65_link").click();
						}
					});
				}
				else
				{
					if(double_entry<2)
					{
						var orders_data="<bills count='1'>"+
										"<id>"+bill_id_filter.value+"</id>"+
										"<bill_num></bill_num>" +
										"<order_num></order_num>" +
										"<channel></channel>" +
										"</bills>";
						//console.log(orders_data);
						fetch_requested_data('',orders_data,function (orders)
						{
							//console.log(orders);
							if(orders.length>0 && orders[0].status!='dispatched')
							{
								invoice_filter.value=orders[0].bill_num;
								channel_filter.value=orders[0].channel;
								order_filter.value=orders[0].order_num;
								id_filter.value=orders[0].id;
								form215_create_item(item_form);
								form215_add_item();
							}
							else
							{
								invoice_filter.value="";
								channel_filter.value="";
								order_filter.value="";
								id_filter.value=vUtil.newKey();
								bill_id_filter.value="";
								$("#modal65_link").click();
							}
						});
					}
					else
					{
						bill_id_filter.value="";
						$("#modal65_link").click();
					}
				}
			}
		});

		$('textarea').autosize();
		form215_update_serial_numbers();
	}
	else
	{
		$("#modal2_link").click();
	}
}


/**
 * @form SKU Mapping (Supplier)
 * @formNo 217
 */
function form217_add_item()
{
	if(is_create_access('form217'))
	{
		var rowsHTML="";
		var id=vUtil.newKey();
		rowsHTML+="<tr>";
		rowsHTML+="<form id='form217_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Supplier'>";
				rowsHTML+="<input type='text' form='form217_"+id+"' required>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Item'>";
				rowsHTML+="<input type='text' form='form217_"+id+"' required>";
				rowsHTML+="<br><textarea readonly='readonly' form='form217_"+id+"'></textarea>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Supplier SKU'>";
				rowsHTML+="<input type='text' form='form217_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Margin'>";
				rowsHTML+="<input type='number' step='any' form='form217_"+id+"' required>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form217_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='submit' class='save_icon' form='form217_"+id+"' >";
				rowsHTML+="<input type='button' class='delete_icon' form='form217_"+id+"' onclick='$(this).parent().parent().remove();'>";
			rowsHTML+="</td>";
		rowsHTML+="</tr>";

		$('#form217_body').prepend(rowsHTML);
		var fields=document.getElementById("form217_"+id);
		var supplier_filter=fields.elements[0];
		var product_filter=fields.elements[1];
		var desc_filter=fields.elements[2];

		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form217_create_item(fields);
		});

		var product_data="<product_master>" +
				"<name></name>" +
				"</product_master>";
		set_my_value_list(product_data,product_filter);

		$(product_filter).on('blur',function ()
		{
			var desc_data="<product_master>"+
						"<description></description>"+
						"<name exact='yes'>"+product_filter.value+"</name>"+
						"</product_master>";
			set_my_value(desc_data,desc_filter);
		});

		var supplier_data="<suppliers>" +
				"<acc_name></acc_name>" +
				"</suppliers>";
		set_my_value_list(supplier_data,supplier_filter,function ()
		{
			$(supplier_filter).focus();
		});

		$('textarea').autosize();
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form New Purchase Order (Aurilion)
 * @formNo 222
 */
function form222_add_item()
{
	if(is_create_access('form222'))
	{
		var rowsHTML="";
		var id=vUtil.newKey();
		rowsHTML+="<tr>";
		rowsHTML+="<form id='form222_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Item'>";
				rowsHTML+="<input type='text' required form='form222_"+id+"' value=''>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Quantity'>";
				rowsHTML+="<input type='number' required form='form222_"+id+"' value='' step='any'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Make'>";
				rowsHTML+="<input type='text' form='form222_"+id+"' readonly='readonly'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Price'>";
				rowsHTML+="MRP: <input type='number' required form='form222_"+id+"' value='' step='any' readonly='readonly'>";
				rowsHTML+="<br>Price: <input type='number' required form='form222_"+id+"' value='' step='any' readonly='readonly' class='dblclick_editable'>";
				rowsHTML+="<br>Amount: <input type='number' required readonly='readonly' form='form222_"+id+"' step='any'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form222_"+id+"' name='tax'>";
				rowsHTML+="<input type='hidden' form='form222_"+id+"' name='total'>";
				rowsHTML+="<input type='hidden' form='form222_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='button' class='submit_hidden' form='form222_"+id+"' id='save_form222_"+id+"' >";
				rowsHTML+="<input type='button' class='delete_icon' form='form222_"+id+"' id='delete_form222_"+id+"' onclick='$(this).parent().parent().remove(); form222_get_totals();'>";
				rowsHTML+="<input type='submit' class='submit_hidden' form='form222_"+id+"'>";
				rowsHTML+="<input type='hidden' form='form222_"+id+"' name='tax_rate'>";
			rowsHTML+="</td>";
		rowsHTML+="</tr>";

		$('#form222_body').prepend(rowsHTML);

		var master_form=document.getElementById("form222_master");
		var supplier_name_filter=master_form.elements['supplier'];
		var supplier_name=supplier_name_filter.value;

		var fields=document.getElementById("form222_"+id);
		var name_filter=fields.elements[0];
		var quantity_filter=fields.elements[1];
		var make_filter=fields.elements[2];
		var mrp_filter=fields.elements[3];
		var price_filter=fields.elements[4];
		var amount_filter=fields.elements[5];
		var tax_filter=fields.elements[6];
		var total_filter=fields.elements[7];
		var id_filter=fields.elements[8];
		var save_button=fields.elements[9];
		var tax_rate_filter=fields.elements[12];

		$(save_button).on("click", function(event)
		{
			event.preventDefault();
			form222_create_item(fields);
		});

		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form222_add_item();
		});

		var product_data="<product_master>" +
				"<name></name>" +
				"</product_master>";
		set_my_value_list(product_data,name_filter,function ()
		{
			$(name_filter).focus();
		});

		var add_product=document.getElementById('form222_add_product_'+id);
		$(add_product).on('click',function()
		{
			modal14_action(function()
			{
				var product_data="<product_master>" +
						"<name></name>" +
						"</product_master>";
				set_my_value_list(product_data,name_filter,function ()
				{
					$(name_filter).focus();
				});
			});
		});

		$(name_filter).on('blur',function(event)
		{
			var make_data="<product_master count='1'>" +
					"<make></make>" +
					"<tax></tax>"+
					"<name exact='yes'>"+name_filter.value+"</name>" +
					"</product_master>";
			fetch_requested_data('',make_data,function (makes)
			{
				if(makes.length>0)
				{
					make_filter.value=makes[0].make;
					tax_rate_filter.value=makes[0].tax;
				}
			});

			var mrp_data="<product_instances>"+
						"<mrp></mrp>"+
						"<cost_price></cost_price>"
						"<product_name exact='yes'>"+name_filter.value+"</product_name>"+
						"</product_instances>";
			fetch_requested_data('',mrp_data,function(mrps)
			{
				if(mrps.length>0)
				{
					mrp_filter.value=mrps[0].mrp;
					price_filter.value=mrps[0].cost_price;
				}
				else
				{
					mrp_filter.value="";
					price_filter.value="";
				}
			});

			amount_filter.value="";
			tax_filter.value="";
			total_filter.value="";
		});

		$(quantity_filter).add(price_filter).on('blur',function(event)
		{
			amount_filter.value=Math.round(parseFloat(quantity_filter.value)*parseFloat(price_filter.value));
			tax_filter.value=Math.round(parseFloat(amount_filter.value)*(parseFloat(tax_rate_filter.value)/100));
			total_filter.value=Math.round(parseFloat(amount_filter.value)+parseFloat(tax_filter.value));
		});

		form222_get_totals();
		longPressEditable($('.dblclick_editable'));
	}
	else
	{
		$("#modal2_link").click();
	}
}



/**
 * @form Demo
 * @formNo 228
 */
function form228_add_item()
{
	if(is_create_access('form228'))
	{
		var rowsHTML="";
		var id=vUtil.newKey();
		rowsHTML+="<tr>";
		rowsHTML+="<form id='form228_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Item'>";
				rowsHTML+="<input type='text' form='form228_"+id+"' required>";
				rowsHTML+="<img src='./images/add_image.png' class='add_image' title='Add new product' id='form228_add_product_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Quantity'>";
				rowsHTML+="<input type='number' step='any' required form='form228_"+id+"'>";
				rowsHTML+="<input type='hidden' form='form228_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Customer'>";
				rowsHTML+="<input type='text' form='form228_"+id+"'>";
				rowsHTML+="<img src='./images/add_image.png' class='add_image' id='form228_add_customer_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Date' required>";
				rowsHTML+="<input type='text' form='form228_"+id+"' value='"+vTime.date()+"'>";
				rowsHTML+="<input type='hidden' form='form228_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form228_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='submit' class='save_icon' form='form228_"+id+"' >";
				rowsHTML+="<input type='button' class='delete_icon' form='form228_"+id+"' onclick='$(this).parent().parent().remove();'>";
			rowsHTML+="</td>";
		rowsHTML+="</tr>";

		$('#form228_body').prepend(rowsHTML);
		var fields=document.getElementById("form228_"+id);
		var item_filter=fields.elements[0];
		var customer_filter=fields.elements[3];
		var date_filter=fields.elements[4];

		$(date_filter).datepicker();

		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form228_create_item(fields);
		});

		var product_data="<product_master>" +
				"<name></name>" +
				"</product_master>";
		set_my_value_list(product_data,item_filter,function ()
		{
			$(item_filter).focus();
		});

		var add_product=document.getElementById('form228_add_product_'+id);
		$(add_product).on('click',function()
		{
			modal174_action(function()
			{
				var product_data="<product_master>" +
						"<name></name>" +
						"</product_master>";
				set_my_value_list(product_data,item_filter,function ()
				{
					$(item_filter).focus();
				});
			});
		});

		var customer_data="<accounts>" +
				"<acc_name></acc_name>" +
				"</accounts>";
		set_my_value_list(customer_data,customer_filter);

		var add_customer=document.getElementById('form228_add_customer_'+id);
		$(add_customer).on('click',function()
		{
			modal11_action(function()
			{
				var customer_data="<customers>" +
						"<acc_name></acc_name>" +
						"</customers>";
				set_my_value_list(customer_data,customer_filter,function ()
				{
					$(customer_filter).focus();
				});
			});
		});

		$('textarea').autosize();
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form Hire
 * @formNo 229
 */
function form229_add_item()
{
	if(is_create_access('form229'))
	{
		var rowsHTML="";
		var id=vUtil.newKey();
		rowsHTML+="<tr>";
		rowsHTML+="<form id='form229_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Item'>";
				rowsHTML+="<input type='text' form='form229_"+id+"' required>";
				rowsHTML+="<img src='./images/add_image.png' class='add_image' title='Add new product' id='form229_add_product_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Quantity'>";
				rowsHTML+="<input type='number' step='any' required form='form229_"+id+"'>";
				rowsHTML+="<input type='hidden' form='form229_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Customer'>";
				rowsHTML+="<input type='text' form='form229_"+id+"'>";
				rowsHTML+="<img src='./images/add_image.png' class='add_image' id='form229_add_customer_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Date' required>";
				rowsHTML+="<input type='text' form='form229_"+id+"' value='"+vTime.date()+"'>";
				rowsHTML+="<input type='hidden' form='form229_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form229_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='submit' class='save_icon' form='form229_"+id+"' >";
				rowsHTML+="<input type='button' class='delete_icon' form='form229_"+id+"' onclick='$(this).parent().parent().remove();'>";
			rowsHTML+="</td>";
		rowsHTML+="</tr>";

		$('#form229_body').prepend(rowsHTML);
		var fields=document.getElementById("form229_"+id);
		var item_filter=fields.elements[0];
		var customer_filter=fields.elements[3];
		var date_filter=fields.elements[4];

		$(date_filter).datepicker();

		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form229_create_item(fields);
		});

		var product_data="<product_master>" +
				"<name></name>" +
				"</product_master>";
		set_my_value_list(product_data,item_filter,function ()
		{
			$(item_filter).focus();
		});

		var add_product=document.getElementById('form229_add_product_'+id);
		$(add_product).on('click',function()
		{
			modal174_action(function()
			{
				var product_data="<product_master>" +
						"<name></name>" +
						"</product_master>";
				set_my_value_list(product_data,item_filter,function ()
				{
					$(item_filter).focus();
				});
			});
		});

		var customer_data="<accounts>" +
				"<acc_name></acc_name>" +
				"</accounts>";
		set_my_value_list(customer_data,customer_filter);

		var add_customer=document.getElementById('form229_add_customer_'+id);
		$(add_customer).on('click',function()
		{
			modal11_action(function()
			{
				var customer_data="<customers>" +
						"<acc_name></acc_name>" +
						"</customers>";
				set_my_value_list(customer_data,customer_filter,function ()
				{
					$(customer_filter).focus();
				});
			});
		});

		$('textarea').autosize();
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form In-out
 * @formNo 230
 */
function form230_add_item()
{
	if(is_create_access('form230'))
	{
		var rowsHTML="";
		var id=vUtil.newKey();
		rowsHTML+="<tr>";
		rowsHTML+="<form id='form230_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Item'>";
				rowsHTML+="<input type='text' form='form230_"+id+"' required>";
				rowsHTML+="<img src='./images/add_image.png' class='add_image' title='Add new product' id='form230_add_product_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Quantity'>";
				rowsHTML+="<input type='number' step='any' required form='form230_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Type'>";
				rowsHTML+="<input type='text' form='form230_"+id+"' required>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='For/From'>";
				rowsHTML+="<input type='text' form='form230_"+id+"' required>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='To/From'>";
				rowsHTML+="<input type='text' form='form230_"+id+"'>";
				rowsHTML+="<img src='./images/add_image.png' class='add_image' id='form230_add_customer_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Details'>";
				rowsHTML+="Date: <input type='text' required readonly='readonly' form='form230_"+id+"' value='"+vTime.date()+"'>";
				rowsHTML+="<br><textarea placeholder='Notes' form='form230_"+id+"'></textarea>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form230_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='submit' class='save_icon' form='form230_"+id+"' >";
				rowsHTML+="<input type='button' class='delete_icon' form='form230_"+id+"' onclick='$(this).parent().parent().remove();'>";
			rowsHTML+="</td>";
		rowsHTML+="</tr>";

		$('#form230_body').prepend(rowsHTML);
		var fields=document.getElementById("form230_"+id);
		var item_filter=fields.elements[0];
		var issue_filter=fields.elements[2];
		var hiring_filter=fields.elements[3];
		var customer_filter=fields.elements[4];
		var date_filter=fields.elements[5];

		$(date_filter).datepicker();

		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form230_create_item(fields);
		});

		var product_data="<product_master>" +
				"<name></name>" +
				"</product_master>";
		set_my_value_list(product_data,item_filter,function ()
		{
			$(item_filter).focus();
		});

		var add_product=document.getElementById('form230_add_product_'+id);
		$(add_product).on('click',function()
		{
			modal174_action(function()
			{
				var product_data="<product_master>" +
						"<name></name>" +
						"</product_master>";
				set_my_value_list(product_data,item_filter,function ()
				{
					$(item_filter).focus();
				});
			});
		});

		set_static_value_list('bill_items','issue_type',issue_filter);
		set_static_value_list('bill_items','hiring_type',hiring_filter);

		var customer_data="<accounts>" +
				"<acc_name></acc_name>" +
				"</accounts>";
		set_my_value_list(customer_data,customer_filter);

		var add_customer=document.getElementById('form230_add_customer_'+id);
		$(add_customer).on('click',function()
		{
			modal11_action(function()
			{
				var customer_data="<accounts>" +
						"<acc_name></acc_name>" +
						"</accounts>";
				set_my_value_list(customer_data,customer_filter,function ()
				{
					$(customer_filter).focus();
				});
			});
		});

		$('textarea').autosize();
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form Prescription Items
 * @formNo 231
 */
function form231_add_item()
{
	if(is_create_access('form231'))
	{
		var filter_fields=document.getElementById('form231_master');

		var rowsHTML="";
		var id=vUtil.newKey();
		rowsHTML+="<tr>";
		rowsHTML+="<form id='form231_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Type'>";
				rowsHTML+="<input type='text' readonly='readonly' form='form231_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Item'>";
				rowsHTML+="<input type='text' required form='form231_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Strength'>";
				rowsHTML+="<input type='text' required form='form231_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Frequency'>";
				rowsHTML+="<input type='text' required form='form231_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Days'>";
				rowsHTML+="<input type='number' form='form231_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form231_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='button' class='save_icon' form='form231_"+id+"' id='save_form231_"+id+"' >";
				rowsHTML+="<input type='button' class='delete_icon' form='form231_"+id+"' id='delete_form231_"+id+"' onclick='$(this).parent().parent().remove();'>";
			rowsHTML+="</td>";
		rowsHTML+="</tr>";

		$('#form231_body').append(rowsHTML);

		var fields=document.getElementById("form231_"+id);
		var type_filter=fields.elements[0];
		var item_filter=fields.elements[1];
		var strength_filter=fields.elements[2];
		var frequency_filter=fields.elements[3];
		var save_button=fields.elements[6];

		$(save_button).on("click", function(event)
		{
			event.preventDefault();
			form231_create_item(fields);
		});

		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form231_add_item();
		});

		var product_data="<product_master>" +
				"<name></name>" +
				"</product_master>";
		set_my_value_list(product_data,item_filter,function ()
		{
			$(item_filter).focus();
		});

		set_static_value_list('prescription_items','frequency',frequency_filter);

		$(item_filter).on('blur',function ()
		{
			var type_data="<attributes>"+
						"<value></value>"+
						"<attribute exact='yes'>type</attribute>"+
						"<type exact='yes'>product</type>"+
						"<name exact='yes'>"+item_filter.value+"</name>"+
						"</attributes>";
			set_my_value(type_data,type_filter);
		});
	}
	else
	{
		$("#modal2_link").click();
	}
}


/**
 * @form Add Stock
 * @formNo 244
 */
function form244_add_item()
{
	if(is_create_access('form244'))
	{
		var id=vUtil.newKey();
		var rowsHTML="<tr>";
		rowsHTML+="<form id='244form244_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td id='form244_barcode_"+id+"' data-th='Barcode'>";
				rowsHTML+="<input type='text' form='244form244_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Item'>";
				rowsHTML+="SKU: <input type='text' required form='244form244_"+id+"'>";
				rowsHTML+="<br>Name: <textarea form='244form244_"+id+"' readonly='readonly'></textarea>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Batch'>";
				rowsHTML+="<input type='text' required form='244form244_"+id+"'>";
				rowsHTML+="<img src='./images/add_image.png' class='add_image' title='Add batch' id='form244_add_batch_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Quantity'>";
				rowsHTML+="1";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='submit' class='submit_hidden' form='244form244_"+id+"' id='save_form244_"+id+"' >";
				rowsHTML+="<input type='button' class='delete_icon' form='244form244_"+id+"' id='delete_form244_"+id+"' onclick='$(this).parent().parent().remove();form244_get_totals();'>";
			rowsHTML+="</td>";
		rowsHTML+="</tr>";

		$('#form244_body').prepend(rowsHTML);

		var fields=document.getElementById("244form244_"+id);
		var barcode_filter=fields.elements[0];
		var name_filter=fields.elements[1];
		var desc_filter=fields.elements[2];
		var batch_filter=fields.elements[3];

		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form244_get_totals();
			form244_add_item();
		});

		$(barcode_filter).focus();

		var product_data="<product_master>" +
				"<name></name>" +
				"</product_master>";
		set_my_value_list(product_data,name_filter);

		var smaller_barcodes=get_session_var('brands_small_barcode');

		$(name_filter).off('blur');
		$(name_filter).on('blur',function(event)
		{
			var desc_data="<product_master>"+
						"<description></description>"+
						"<bar_code></bar_code>"+
						"<make></make>"+
						"<name exact='yes'>"+name_filter.value+"</name>"+
						"</product_master>";
			fetch_requested_data('',desc_data,function (descs)
			{
				if(descs.length>0)
				{
					desc_filter.value=descs[0].description;
					barcode_filter.value=descs[0].bar_code;
					var barcode_td=document.getElementById('form244_barcode_'+id);

					if(barcode_filter.value!="")
					{

						if(smaller_barcodes!=null && smaller_barcodes.indexOf(descs[0].make)>-1)
						{
							$(barcode_td).append("<img src='./images/barcode.png' class='barcode_icon' title='Print Barcode - "+descs[0].bar_code+"' onclick=\"print_smaller_product_barcode('"+descs[0].bar_code+"','"+name_filter.value+"','"+descs[0].description+"');\">");
						}
						else
						{
							$(barcode_td).append("<img src='./images/barcode.png' class='barcode_icon' title='Print Barcode - "+descs[0].bar_code+"' onclick=\"print_product_barcode('"+descs[0].bar_code+"','"+name_filter.value+"','"+descs[0].description+"');\">");
						}

					}
					else
					{
						var string=""+get_my_time();
						modal116_action(string,name_filter.value);
						if(smaller_barcodes!=null && smaller_barcodes.indexOf(descs[0].make)>-1)
						{
							$(barcode_td).append("<img src='./images/barcode.png' class='barcode_icon' title='Print Barcode - "+string+"' onclick=\"print_smaller_product_barcode('"+string+"','"+name_filter.value+"','"+descs[0].description+"');\">");
						}
						else
						{
							$(barcode_td).append("<img src='./images/barcode.png' class='barcode_icon' title='Print Barcode - "+string+"' onclick=\"print_product_barcode('"+string+"','"+name_filter.value+"','"+descs[0].description+"');\">");
						}

					}
				}
			});

			var batch_data="<product_instances>"+
						"<batch></batch>"+
						"<product_name exact='yes'>"+name_filter.value+"</product_name>"+
						"</product_instances>";
			set_my_value_list(batch_data,batch_filter);

			var rows_length=$('#form244_body').find('tr').length;

			var first_batch_match=false;
			$("[id^='244form244_']").each(function (index)
			{
				if((index!=0 || rows_length==1) && this.elements[1].value==name_filter.value && !first_batch_match)
				{
					batch_filter.value=this.elements[3].value;
					first_batch_match=true;
					if(batch_filter.value=="")
					{
						batch_filter.value=name_filter.value;
						$(batch_filter).focus();
						if(rows.length!=1)
						{
							$('#form244_body>tr:first').remove();
						}
					}
					//	return false;
				}
			});
		});

		var add_batch=document.getElementById('form244_add_batch_'+id);
		$(add_batch).on('click',function()
		{
			modal120_action(function()
			{
				var batch_data="<product_instances>" +
					"<batch></batch>" +
					"<product_name exact='yes'>"+name_filter.value+"</product_name>" +
					"</product_instances>";
				set_my_value_list(batch_data,batch_filter);
			},name_filter.value,'required');
		});

		$(barcode_filter).off('keydown');
		$(barcode_filter).on('keydown',function (event)
		{
			if(event.keyCode == 13 )
			{
				event.preventDefault();

				var item_data="<product_master count='1'>"+
							"<name></name>"+
							"<description></description>"+
							"<bar_code exact='yes'>"+barcode_filter.value+"</bar_code>"+
							"</product_master>";
				fetch_requested_data('',item_data,function (products)
				{
					if(products.length>0)
					{
						desc_filter.value=products[0].description;
						name_filter.value=products[0].name;

						var batch_data="<product_instances>"+
									"<batch></batch>"+
									"<product_name exact='yes'>"+name_filter.value+"</product_name>"+
									"</product_instances>";
						set_my_value_list(batch_data,batch_filter);

						var rows_length=$('#form244_body').find('tr').length;

						var first_batch_match=false;
						$("[id^='244form244_']").each(function (index)
						{
							if((index!=0 || rows_length==1) && this.elements[1].value==name_filter.value && !first_batch_match)
							{
								batch_filter.value=this.elements[3].value;
								first_batch_match=true;
								//	return false;
							}
						});
						if(batch_filter.value=="")
						{
							batch_filter.value=name_filter.value;
							$(batch_filter).focus();
						}
						else
						{
							form244_get_totals();
							form244_add_item();
						}
					}
					else
					{
						modal116_action(barcode_filter.value);
						barcode_filter.value="";
					}
				});
			}
		});
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form SKU Components
 * @formNo 245
 */
function form245_add_item()
{
	if(is_create_access('form245'))
	{
		var id=vUtil.newKey();
		var rowsHTML="<tr>";
		rowsHTML+="<form id='form245_"+id+"'></form>";
			rowsHTML+="<td data-th='S.No.'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='SKU'>";
				rowsHTML+="<input type='text' required form='form245_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Item Name'>";
				rowsHTML+="<textarea readonly='readonly' form='form245_"+id+"'></textarea>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Quantity'>";
				rowsHTML+="<input type='number' step='any' required form='form245_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form245_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='button' class='submit_hidden' form='form245_"+id+"' id='save_form245_"+id+"'>";
				rowsHTML+="<input type='button' class='delete_icon' form='form245_"+id+"' id='delete_form245_"+id+"' onclick='$(this).parent().parent().remove(); form245_update_serial_numbers();'>";
				rowsHTML+="<input type='submit' class='submit_hidden' form='form245_"+id+"'>";
			rowsHTML+="</td>";
		rowsHTML+="</tr>";

		$('#form245_body').prepend(rowsHTML);

		var item_form=document.getElementById('form245_'+id);
		var item_filter=item_form.elements[0];
		var item_desc=item_form.elements[1];
		var quantity_filter=item_form.elements[2];
		var save_button=item_form.elements[4];

		$(save_button).on('click',function (e)
		{
			e.preventDefault();
			form245_create_item(item_form);
		});

		$(item_form).on("submit", function(event)
		{
			event.preventDefault();
			form245_add_item();
		});

		var item_data="<product_master>" +
				"<name></name>" +
				"</product_master>";
		set_my_value_list(item_data,item_filter,function ()
		{
			$(item_filter).focus();
		});

		$(item_filter).on('blur',function ()
		{
			var desc_data="<product_master count='1'>" +
				"<description></description>"+
				"<name exact='yes'>"+item_filter.value+"</name>" +
				"</product_master>";
			set_my_value(desc_data,item_desc);
		});

		$('textarea').autosize();
		form245_update_serial_numbers();
	}
	else
	{
		$("#modal2_link").click();
	}
}



/**
 * @form Create Transit bag
 * @formNo 248
 */
function form248_add_item()
{
	if(is_create_access('form248'))
	{
		var id=vUtil.newKey();
		var rowsHTML="<tr>";
		rowsHTML+="<form id='form248_"+id+"'></form>";
			rowsHTML+="<td data-th='S.No.'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='AWB #'>";
				rowsHTML+="<input type='text' required form='form248_"+id+"' oninvalid=\"setCustomValidity('This AWB # is invalid')\">";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Address'>";
				rowsHTML+="<textarea readonly='readonly' form='form248_"+id+"'></textarea>";
				rowsHTML+="<br><b>Phone</b>: <input type='text' readonly='readonly' form='form248_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Details'>";
				rowsHTML+="<b>Weight</b>: <input type='number' step='any' readonly='readonly' form='form248_"+id+"'>";
				rowsHTML+="<br><b>LBH</b>: <input type='text' readonly='readonly' form='form248_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Status'>";
				rowsHTML+="<input type='text' readonly='readonly' form='form248_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form248_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='button' class='submit_hidden' form='form248_"+id+"' id='save_form248_"+id+"'>";
				rowsHTML+="<input type='button' class='delete_icon' form='form248_"+id+"' id='delete_form248_"+id+"' onclick='$(this).parent().parent().remove(); form248_update_serial_numbers();'>";
				rowsHTML+="<input type='hidden' form='form248_"+id+"' value='' name='order_history'>";
			rowsHTML+="</td>";
		rowsHTML+="</tr>";

		$('#form248_body').prepend(rowsHTML);

		var item_form=document.getElementById('form248_'+id);
		var awb_filter=item_form.elements[0];
		var address_filter=item_form.elements[1];
		var phone_filter=item_form.elements[2];
		var weight_filter=item_form.elements[3];
		var lbh_filter=item_form.elements[4];
		var status_filter=item_form.elements[5];
		var id_filter=item_form.elements[6];
		var save_button=item_form.elements[7];
		var history_filter=item_form.elements[9];

		var new_bag=true;
		var saved=document.getElementById('form248_master').elements['saved'].value;
		if(saved=='yes')
		{
			new_bag=false;
		}

		$(item_form).on("submit", function(event)
		{
			event.preventDefault();
			var total_entries=0;
			var double_entry=0;
			$("[id^='save_form248']").each(function(index)
			{
				var subform_id=$(this).attr('form');
				var subform=document.getElementById(subform_id);
				total_entries+=1;
				if(subform.elements[0].value==awb_filter.value)
					double_entry+=1;
			});

			if(total_entries==1 && new_bag)
			{
				form248_create_form(function()
				{
					if(double_entry<2)
					{
						form248_create_item(item_form);
						form248_add_item();
					}
					else
					{
						awb_filter.value="";
						$("#modal65_link").click();
					}
				});
			}
			else
			{
				if(double_entry<2)
				{
					form248_create_item(item_form);
					form248_add_item();
				}
				else
				{
					awb_filter.value="";
					$("#modal65_link").click();
				}
			}
		});

		$(awb_filter).focus();

		$(awb_filter).on('keydown',function (event)
		{
			if(event.keyCode == 13 )
			{
				event.preventDefault();

				var total_entries=0;
				var double_entry=0;
				$("[id^='save_form248']").each(function(index)
				{
					var subform_id=$(this).attr('form');
					var subform=document.getElementById(subform_id);

					total_entries+=1;

					if(subform.elements[0].value==awb_filter.value)
						double_entry+=1;
				});

				if(total_entries==1 && new_bag)
				{
					form248_create_form(function ()
					{
						if(double_entry<2)
						{
							var orders_data="<logistics_orders count='1'>"+
											"<id></id>"+
											"<address1></address1>"+
											"<address2></address2>"+
											"<city></city>"+
											"<pincode></pincode>"+
											"<awb_num exact='yes'>"+awb_filter.value+"</awb_num>" +
											"<manifest_type></manifest_type>" +
											"<order_num></order_num>" +
											"<merchant_name></merchant_name>" +
											"<ship_to></ship_to>" +
											"<phone></phone>" +
											"<weight></weight>" +
											"<lbh></lbh>" +
											"<pieces></pieces>" +
											"<drs_num></drs_num>" +
											"<status array='yes'>--received--undelivered--pending--</status>"+
											"<order_history></order_history>"+
											"</logistics_orders>";
							//console.log(orders_data);
							fetch_requested_data('',orders_data,function (orders)
							{
								//console.log(orders);
								if(orders.length>0)
								{
									address_filter.value=orders[0].ship_to+"\n"+orders[0].address1+", "+orders[0].address2+", "+orders[0].city+"-"+orders[0].pincode;
									phone_filter.value=orders[0].phone;
									weight_filter.value=orders[0].weight;
									lbh_filter.value=orders[0].lbh;
									status_filter.value=orders[0].status;
									id_filter.value=orders[0].id;
									history_filter.value=orders[0].order_history;
									form248_create_item(item_form);
									form248_add_item();
								}
								else
								{
									address_filter.value="";
									phone_filter.value="";
									weight_filter.value="";
									lbh_filter.value="";
									status_filter.value="";
									id_filter.value="";
									history_filter.value="";
									awb_filter.value="";
									$("#modal65_link").click();
								}
							});
						}
						else
						{
							awb_filter.value="";
							$("#modal65_link").click();
						}
					});
				}
				else
				{
					if(double_entry<2)
					{
						var orders_data="<logistics_orders count='1'>"+
										"<id></id>"+
										"<address1></address1>"+
										"<address2></address2>"+
										"<city></city>"+
										"<pincode></pincode>"+
										"<awb_num exact='yes'>"+awb_filter.value+"</awb_num>" +
										"<manifest_type></manifest_type>" +
										"<order_num></order_num>" +
										"<merchant_name></merchant_name>" +
										"<ship_to></ship_to>" +
										"<phone></phone>" +
										"<weight></weight>" +
										"<lbh></lbh>" +
										"<pieces></pieces>" +
										"<drs_num></drs_num>" +
										"<status array='yes'>--received--undelivered--pending--</status>"+
										"<order_history></order_history>"+
										"</logistics_orders>";
						//console.log(orders_data);
						fetch_requested_data('',orders_data,function (orders)
						{
							//console.log(orders);
							if(orders.length>0)
							{
								address_filter.value=orders[0].ship_to+"\n"+orders[0].address1+", "+orders[0].address2+", "+orders[0].city+"-"+orders[0].pincode;
								phone_filter.value=orders[0].phone;
								weight_filter.value=orders[0].weight;
								lbh_filter.value=orders[0].lbh;
								status_filter.value=orders[0].status;
								id_filter.value=orders[0].id;
								history_filter.value=orders[0].order_history;
								form248_create_item(item_form);
								form248_add_item();
							}
							else
							{
								address_filter.value="";
								phone_filter.value="";
								weight_filter.value="";
								lbh_filter.value="";
								status_filter.value="";
								id_filter.value="";
								awb_filter.value="";
								history_filter.value="";
								$("#modal65_link").click();
							}
						});
					}
					else
					{
						awb_filter.value="";
						$("#modal65_link").click();
					}
				}
			}
		});
		$('textarea').autosize();
		form248_update_serial_numbers();
	}
	else
	{
		$("#modal2_link").click();
	}
}


/**
 * @form Create MTS
 * @formNo 250
 */
function form250_add_item()
{
	if(is_create_access('form250'))
	{
		var id=vUtil.newKey();
		var rowsHTML="<tr>";
		rowsHTML+="<form id='form250_"+id+"'></form>";
			rowsHTML+="<td data-th='S.No.'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Bag #'>";
				rowsHTML+="<input type='text' required form='form250_"+id+"' oninvalid=\"setCustomValidity('This Bag # is invalid')\">";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='LBH'>";
				rowsHTML+="<input type='text' readonly='readonly' form='form250_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Weight'>";
				rowsHTML+="<input type='number' step='any' readonly='readonly' form='form250_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='# orders'>";
				rowsHTML+="<input type='number' step='any' readonly='readonly' form='form250_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form250_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='button' class='submit_hidden' form='form250_"+id+"' id='save_form250_"+id+"'>";
				rowsHTML+="<input type='button' class='delete_icon' form='form250_"+id+"' id='delete_form250_"+id+"' onclick='$(this).parent().parent().remove(); form250_update_serial_numbers();'>";
			rowsHTML+="</td>";
		rowsHTML+="</tr>";

		$('#form250_body').prepend(rowsHTML);

		var item_form=document.getElementById('form250_'+id);
		var bag_filter=item_form.elements[0];
		var lbh_filter=item_form.elements[1];
		var weight_filter=item_form.elements[2];
		var num_filter=item_form.elements[3];
		var id_filter=item_form.elements[4];
		var save_button=item_form.elements[5];

		var new_mts=true;
		var saved=document.getElementById('form250_master').elements['saved'].value;
		var branch=document.getElementById('form250_master').elements['branch'].value;
		if(saved=='yes')
		{
			new_mts=false;
		}

		$(item_form).on("submit", function(event)
		{
			event.preventDefault();
			var total_entries=0;
			var double_entry=0;
			$("[id^='save_form250']").each(function(index)
			{
				var subform_id=$(this).attr('form');
				var subform=document.getElementById(subform_id);
				total_entries+=1;
				if(subform.elements[0].value==bag_filter.value)
					double_entry+=1;
			});

			if(total_entries==1 && new_mts)
			{
				//console.log(new_mts+" --");
				form250_create_form(function()
				{
					if(double_entry<2)
					{
						form250_create_item(item_form);
						form250_add_item();
					}
					else
					{
						bag_filter.value="";
						$("#modal65_link").click();
					}
				});
			}
			else
			{
				if(double_entry<2)
				{
					form250_create_item(item_form);
					form250_add_item();
				}
				else
				{
					bag_filter.value="";
					$("#modal65_link").click();
				}
			}
		});

		$(bag_filter).focus();

		$(bag_filter).on('keydown',function (event)
		{
			if(event.keyCode == 13 )
			{
				event.preventDefault();

				var total_entries=0;
				var double_entry=0;
				$("[id^='save_form250']").each(function(index)
				{
					var subform_id=$(this).attr('form');
					var subform=document.getElementById(subform_id);

					total_entries+=1;

					if(subform.elements[0].value==bag_filter.value)
						double_entry+=1;
				});

				if(total_entries==1 && new_mts)
				{
					form250_create_form(function ()
					{
						if(double_entry<2)
						{
							var orders_data="<transit_bags count='1'>"+
											"<id></id>"+
											"<bag_num exact='yes'>"+bag_filter.value+"</bag_num>" +
											"<lbh></lbh>" +
											"<weight></weight>" +
											"<status></status>" +
											"<num_orders></num_orders>" +
											"<mts></mts>" +
											"<branch>"+branch+"</branch>"+
											"</transit_bags>";
							//console.log(orders_data);
							fetch_requested_data('',orders_data,function (orders)
							{
								//console.log(orders);
								if(orders.length>0 && (orders[0].mts=="" || orders[0].mts=="null" || orders[0].mts==null))
								{
									lbh_filter.value=orders[0].lbh;
									weight_filter.value=orders[0].weight;
									id_filter.value=orders[0].id;
									num_filter.value=orders[0].num_orders;
									form250_create_item(item_form);
									form250_add_item();
								}
								else
								{
									bag_filter.value="";
									lbh_filter.value="";
									weight_filter.value="";
									id_filter.value="";
									num_filter.value="";
									$("#modal65_link").click();
								}
							});
						}
						else
						{
							bag_filter.value="";
							$("#modal65_link").click();
						}
					});
				}
				else
				{
					if(double_entry<2)
					{
						var orders_data="<transit_bags count='1'>"+
										"<id></id>"+
										"<bag_num exact='yes'>"+bag_filter.value+"</bag_num>" +
										"<lbh></lbh>" +
										"<weight></weight>" +
										"<status></status>" +
										"<num_orders></num_orders>" +
										"<mts></mts>" +
										"<branch>"+branch+"</branch>"+
										"</transit_bags>";
						//console.log(orders_data);
						fetch_requested_data('',orders_data,function (orders)
						{
							//console.log(orders);
							if(orders.length>0 && (orders[0].mts=="" || orders[0].mts=="null" || orders[0].mts==null))
							{
								lbh_filter.value=orders[0].lbh;
								weight_filter.value=orders[0].weight;
								id_filter.value=orders[0].id;
								num_filter.value=orders[0].num_orders;
								form250_create_item(item_form);
								form250_add_item();
							}
							else
							{
								bag_filter.value="";
								lbh_filter.value="";
								weight_filter.value="";
								id_filter.value="";
								num_filter.value="";
								$("#modal65_link").click();
							}
						});
					}
					else
					{
						bag_filter.value="";
						$("#modal65_link").click();
					}
				}
			}
		});

		$('textarea').autosize();
		form250_update_serial_numbers();
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form Vendor Leads
 * @formNo 252
 */
function form252_add_item()
{
	if(is_create_access('form252'))
	{
		var rowsHTML="";
		var id=vUtil.newKey();
		rowsHTML+="<tr>";
		rowsHTML+="<form id='form252_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Customer'>";
				rowsHTML+="<input type='text' form='form252_"+id+"' required value=''>";
				rowsHTML+="<img src='./images/add_image.png' class='add_image' title='Add new customer' id='form252_add_customer_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Details'>";
				rowsHTML+="<textarea form='form252_"+id+"' class='dblclick_editable'></textarea>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Due Date'>";
				rowsHTML+="<input type='text' class='dblclick_editable' form='form252_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Identified By'>";
				rowsHTML+="<input type='text' form='form252_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form252_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='submit' class='save_icon' form='form252_"+id+"'>";
				rowsHTML+="<input type='button' class='delete_icon' form='form252_"+id+"' onclick='$(this).parent().parent().remove();'>";
				rowsHTML+="<input type='button' class='generic_icon' form='form252_"+id+"' value='Follow-up' onclick='modal134_action();'>";
			rowsHTML+="</td>";
		rowsHTML+="</tr>";

		$('#form252_body').prepend(rowsHTML);
		longPressEditable($('.dblclick_editable'));

		var fields=document.getElementById("form252_"+id);
		var customer_filter=fields.elements[0];
		var detail_filter=fields.elements[1];
		var due_filter=fields.elements[2];
		var by_filter=fields.elements[3];

		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form252_create_item(fields);
		});

		var customer_data="<customers>" +
			"<acc_name></acc_name>" +
			"</customers>";
		set_my_value_list(customer_data,customer_filter,function ()
		{
			$(customer_filter).focus();
		});

		$(due_filter).datepicker();
		due_filter.value=get_my_past_date(parseFloat(get_my_time())+86400000);

		var staff_data="<staff>" +
				"<acc_name></acc_name>" +
				"</staff>";
		set_my_value_list(staff_data,by_filter);

		var add_customer=document.getElementById('form252_add_customer_'+id);
		$(add_customer).on('click',function()
		{
			modal161_action('Vendor',function()
			{
				var customer_data="<customers>" +
					"<acc_name></acc_name>" +
					"</customers>";
				set_my_value_list(customer_data,customer_filter,function ()
				{
					$(customer_filter).focus();
				});
			});
		});

		$('textarea').autosize();
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form Customer Leads
 * @formNo 253
 */
function form253_add_item()
{
	if(is_create_access('form253'))
	{
		var rowsHTML="";
		var id=vUtil.newKey();
		rowsHTML+="<tr>";
		rowsHTML+="<form id='form253_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Customer'>";
				rowsHTML+="<input type='text' form='form253_"+id+"' required value=''>";
				rowsHTML+="<img src='./images/add_image.png' class='add_image' title='Add new customer' id='form253_add_customer_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Details'>";
				rowsHTML+="<textarea form='form253_"+id+"' class='dblclick_editable'></textarea>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Due Date'>";
				rowsHTML+="<input type='text' class='dblclick_editable' form='form253_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Identified By'>";
				rowsHTML+="<input type='text' form='form253_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form253_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='submit' class='save_icon' form='form253_"+id+"'>";
				rowsHTML+="<input type='button' class='delete_icon' form='form253_"+id+"' onclick='$(this).parent().parent().remove();'>";
				rowsHTML+="<input type='button' class='generic_icon' form='form253_"+id+"' value='Follow-up' onclick='modal134_action();'>";
			rowsHTML+="</td>";
		rowsHTML+="</tr>";

		$('#form253_body').prepend(rowsHTML);
		longPressEditable($('.dblclick_editable'));

		var fields=document.getElementById("form253_"+id);
		var customer_filter=fields.elements[0];
		var detail_filter=fields.elements[1];
		var due_filter=fields.elements[2];
		var by_filter=fields.elements[3];

		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form253_create_item(fields);
		});

		var customer_data="<customers>" +
			"<acc_name></acc_name>" +
			"</customers>";
		set_my_value_list(customer_data,customer_filter,function ()
		{
			$(customer_filter).focus();
		});

		$(due_filter).datepicker();
		due_filter.value=get_my_past_date(parseFloat(get_my_time())+86400000);

		var staff_data="<staff>" +
				"<acc_name></acc_name>" +
				"</staff>";
		set_my_value_list(staff_data,by_filter);

		var add_customer=document.getElementById('form253_add_customer_'+id);
		$(add_customer).on('click',function()
		{
			modal161_action('Customer',function()
			{
				var customer_data="<customers>" +
					"<acc_name></acc_name>" +
					"</customers>";
				set_my_value_list(customer_data,customer_filter,function ()
				{
					$(customer_filter).focus();
				});
			});
		});

		$('textarea').autosize();
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form Telecalling Leads
 * @formNo 254
 */
function form254_add_item()
{
	if(is_create_access('form254'))
	{
		var rowsHTML="";
		var id=vUtil.newKey();
		rowsHTML+="<tr>";
		rowsHTML+="<form id='form254_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Customer'>";
				rowsHTML+="<input type='text' form='form254_"+id+"' required value=''>";
				rowsHTML+="<img src='./images/add_image.png' class='add_image' title='Add new customer' id='form254_add_customer_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Details'>";
				rowsHTML+="<textarea form='form254_"+id+"' class='dblclick_editable'></textarea>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Due Date'>";
				rowsHTML+="<input type='text' class='dblclick_editable' form='form254_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Identified By'>";
				rowsHTML+="<input type='text' form='form254_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form254_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='submit' class='save_icon' form='form254_"+id+"'>";
				rowsHTML+="<input type='button' class='delete_icon' form='form254_"+id+"' onclick='$(this).parent().parent().remove();'>";
				rowsHTML+="<input type='button' class='generic_icon' form='form254_"+id+"' value='Follow-up' onclick='modal134_action();'>";
			rowsHTML+="</td>";
		rowsHTML+="</tr>";

		$('#form254_body').prepend(rowsHTML);
		longPressEditable($('.dblclick_editable'));

		var fields=document.getElementById("form254_"+id);
		var customer_filter=fields.elements[0];
		var detail_filter=fields.elements[1];
		var due_filter=fields.elements[2];
		var by_filter=fields.elements[3];

		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form254_create_item(fields);
		});

		var customer_data="<customers>" +
			"<acc_name></acc_name>" +
			"</customers>";
		set_my_value_list(customer_data,customer_filter,function ()
		{
			$(customer_filter).focus();
		});

		$(due_filter).datepicker();
		due_filter.value=get_my_past_date(parseFloat(get_my_time())+86400000);

		var staff_data="<staff>" +
				"<acc_name></acc_name>" +
				"</staff>";
		set_my_value_list(staff_data,by_filter);

		var add_customer=document.getElementById('form254_add_customer_'+id);
		$(add_customer).on('click',function()
		{
			modal161_action('Telecalling',function()
			{
				var customer_data="<customers>" +
					"<acc_name></acc_name>" +
					"</customers>";
				set_my_value_list(customer_data,customer_filter,function ()
				{
					$(customer_filter).focus();
				});
			});
		});

		$('textarea').autosize();
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form Marketing Leads
 * @formNo 255
 */
function form255_add_item()
{
	if(is_create_access('form255'))
	{
		var rowsHTML="";
		var id=vUtil.newKey();
		rowsHTML+="<tr>";
		rowsHTML+="<form id='form255_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Customer'>";
				rowsHTML+="<input type='text' form='form255_"+id+"' required value=''>";
				rowsHTML+="<img src='./images/add_image.png' class='add_image' title='Add new customer' id='form255_add_customer_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Details'>";
				rowsHTML+="<textarea form='form255_"+id+"' class='dblclick_editable'></textarea>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Due Date'>";
				rowsHTML+="<input type='text' class='dblclick_editable' form='form255_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Identified By'>";
				rowsHTML+="<input type='text' form='form255_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form255_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='submit' class='save_icon' form='form255_"+id+"'>";
				rowsHTML+="<input type='button' class='delete_icon' form='form255_"+id+"' onclick='$(this).parent().parent().remove();'>";
				rowsHTML+="<input type='button' class='generic_icon' form='form255_"+id+"' value='Follow-up' onclick='modal134_action();'>";
			rowsHTML+="</td>";
		rowsHTML+="</tr>";

		$('#form255_body').prepend(rowsHTML);
		longPressEditable($('.dblclick_editable'));

		var fields=document.getElementById("form255_"+id);
		var customer_filter=fields.elements[0];
		var detail_filter=fields.elements[1];
		var due_filter=fields.elements[2];
		var by_filter=fields.elements[3];

		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form255_create_item(fields);
		});

		var customer_data="<customers>" +
			"<acc_name></acc_name>" +
			"</customers>";
		set_my_value_list(customer_data,customer_filter,function ()
		{
			$(customer_filter).focus();
		});

		$(due_filter).datepicker();
		due_filter.value=get_my_past_date(parseFloat(get_my_time())+86400000);

		var staff_data="<staff>" +
				"<acc_name></acc_name>" +
				"</staff>";
		set_my_value_list(staff_data,by_filter);

		var add_customer=document.getElementById('form255_add_customer_'+id);
		$(add_customer).on('click',function()
		{
			modal161_action('Marketing',function()
			{
				var customer_data="<customers>" +
					"<acc_name></acc_name>" +
					"</customers>";
				set_my_value_list(customer_data,customer_filter,function ()
				{
					$(customer_filter).focus();
				});
			});
		});

		$('textarea').autosize();
	}
	else
	{
		$("#modal2_link").click();
	}
}


/**
 * @form Purchase Leads
 * @formNo 273
 */
function form273_add_item()
{
	if(is_create_access('form273'))
	{
		var rowsHTML="";
		var id=vUtil.newKey();
		rowsHTML+="<tr>";
		rowsHTML+="<form id='form273_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Supplier'>";
				rowsHTML+="<input type='text' form='form273_"+id+"' required>";
				rowsHTML+="<img src='./images/add_image.png' class='add_image' title='Add new supplier' id='form273_add_supplier_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Item'>";
				rowsHTML+="<b>Model</b>:<input type='text' class='dblclick_editable' form='form273_"+id+"'>";
				rowsHTML+="<br><b>Company</b>:<input type='text' class='dblclick_editable' form='form273_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Price'>";
				rowsHTML+="<b>Price</b>:<input type='text' class='dblclick_editable' form='form273_"+id+"'>";
				rowsHTML+="<br><b>Quantity</b><input type='number' required value='1' step='any' class='dblclick_editable' form='form273_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Comments'>";
				rowsHTML+="<textarea form='form273_"+id+"' class='dblclick_editable'></textarea>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Date'>";
				rowsHTML+="<input type='text' form='form273_"+id+"' readonly='readonly' required value='"+vTime.date()+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form273_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='submit' class='save_icon' form='form273_"+id+"'>";
				rowsHTML+="<input type='button' class='delete_icon' form='form273_"+id+"' onclick='$(this).parent().parent().remove();'>";
				rowsHTML+="<input type='button' class='generic_icon' form='form273_"+id+"' value='Follow-up' onclick='modal166_action();'>";
			rowsHTML+="</td>";
		rowsHTML+="</tr>";

		$('#form273_body').prepend(rowsHTML);

		var fields=document.getElementById("form273_"+id);
		var supplier_filter=fields.elements[0];
		var item_filter=fields.elements[1];
		var company_filter=fields.elements[2];
		var price_filter=fields.elements[3];
		var comment_filter=fields.elements[5];
		var date_filter=fields.elements[6];

		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form273_create_item(fields);
		});

		$(item_filter).on('keydown',function(e)
		{
			if(e.keyCode==118)
			{
				e.preventDefault();
				modal173_action(item_filter.value);
			}
		});

		var names_data=new Object();
			names_data.data_store='suppliers';
			names_data.indexes=[{index:'acc_name'}];
			names_data.return_column='acc_name';
		set_my_value_list_json(names_data,supplier_filter,function ()
		{
			$(supplier_filter).focus();
		});

		var item_data=new Object();
			item_data.data_store='product_master';
			item_data.indexes=[{index:'name'}];
			item_data.return_column='name';
		set_my_value_list_json(item_data,item_filter);

		$(item_filter).on('blur',function ()
		{
			var company_data=new Object();
				company_data.count=1;
				company_data.data_store='product_master';
				company_data.indexes=[{index:'name',exact:item_filter.value}];
				company_data.return_column='make';
			set_my_value_json(company_data,company_filter);
		});

		$(date_filter).datepicker();

		var add_supplier=document.getElementById('form273_add_supplier_'+id);
		$(add_supplier).on('click',function()
		{
			modal13_action(function()
			{
				var names_data=new Object();
					names_data.data_store='suppliers';
					names_data.indexes=[{index:'acc_name'}];
					names_data.return_column='acc_name';
				set_my_value_list_json(names_data,supplier_filter,function ()
				{
					$(supplier_filter).focus();
				});
			});
		});

		$('textarea').autosize();
		longPressEditable($('.dblclick_editable'));
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form In-out (POOJAELEC)
 * @formNo 275
 */
function form275_add_item()
{
	if(is_create_access('form275'))
	{
		var id=vUtil.newKey();
		var rowsHTML="<tr>";
		rowsHTML+="<form id='form275_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Item'>";
				rowsHTML+="<input type='text' form='form275_"+id+"' required>";
				rowsHTML+="<img src='./images/add_image.png' class='add_image' title='Add new product' id='form275_add_product_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Quantity'>";
				rowsHTML+="<input type='number' step='any' required form='form275_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Type'>";
				rowsHTML+="<input type='text' form='form275_"+id+"' required>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='To/From'>";
				rowsHTML+="<input type='text' form='form275_"+id+"'>";
				rowsHTML+="<img src='./images/add_image.png' class='add_image' id='form275_add_customer_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Details'>";
				rowsHTML+="Date: <input type='text' required readonly='readonly' form='form275_"+id+"' value='"+vTime.date()+"'>";
				rowsHTML+="<br><textarea placeholder='Notes' form='form275_"+id+"'></textarea>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form275_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='submit' class='save_icon' form='form275_"+id+"' >";
				rowsHTML+="<input type='button' class='delete_icon' form='form275_"+id+"' onclick='$(this).parent().parent().remove();'>";
			rowsHTML+="</td>";
		rowsHTML+="</tr>";

		$('#form275_body').prepend(rowsHTML);
		var fields=document.getElementById("form275_"+id);
		var item_filter=fields.elements[0];
		var issue_filter=fields.elements[2];
		var customer_filter=fields.elements[3];
		var date_filter=fields.elements[4];

		$(date_filter).datepicker();

		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form275_create_item(fields);
		});

		var product_data="<product_master>" +
				"<name></name>" +
				"</product_master>";
		set_my_value_list(product_data,item_filter,function ()
		{
			$(item_filter).focus();
		});

		var add_product=document.getElementById('form275_add_product_'+id);
		$(add_product).on('click',function()
		{
			modal177_action(function()
			{
				var product_data="<product_master>" +
						"<name></name>" +
						"</product_master>";
				set_my_value_list(product_data,item_filter,function ()
				{
					$(item_filter).focus();
				});
			});
		});

		set_static_value_list('bill_items','issue_type',issue_filter);

		var customer_data="<accounts>" +
				"<acc_name></acc_name>" +
				"</accounts>";
		set_my_value_list(customer_data,customer_filter);

		var add_customer=document.getElementById('form275_add_customer_'+id);
		$(add_customer).on('click',function()
		{
			modal11_action(function()
			{
				var customer_data="<accounts>" +
						"<acc_name></acc_name>" +
						"</accounts>";
				set_my_value_list(customer_data,customer_filter,function ()
				{
					$(customer_filter).focus();
				});
			});
		});

		$('textarea').autosize();
	}
	else
	{
		$("#modal2_link").click();
	}
}



/**
 * @form Buyer Leads
 * @formNo 289
 */
function form289_add_item()
{
	if(is_create_access('form289'))
	{
		var rowsHTML="";
		var id=vUtil.newKey();
		rowsHTML+="<tr>";
		rowsHTML+="<form id='form289_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Customer'>";
				rowsHTML+="<input type='text' form='form289_"+id+"' required>";
				rowsHTML+="<img src='./images/add_image.png' class='add_image' title='Add new customer' id='form289_add_customer_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Item'>";
				rowsHTML+="<b>Model</b>:<input type='text' class='dblclick_editable' form='form289_"+id+"'>";
				rowsHTML+="<br><b>Company</b>:<input type='text' class='dblclick_editable' form='form289_"+id+"'>";
				rowsHTML+="<br><b>Price</b>:<input type='text' class='dblclick_editable' form='form289_"+id+"'>";
				rowsHTML+="<br><b>Quantity</b><input type='number' step='any' required value='1' class='dblclick_editable' form='form289_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='PoC'>";
				rowsHTML+="<input type='text' form='form289_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Comments'>";
				rowsHTML+="<textarea form='form289_"+id+"' class='dblclick_editable'></textarea>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Date'>";
				rowsHTML+="<input type='text' form='form289_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form289_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='submit' class='save_icon' form='form289_"+id+"'>";
				rowsHTML+="<input type='button' class='delete_icon' form='form289_"+id+"' onclick='$(this).parent().parent().remove();'>";
			rowsHTML+="</td>";
		rowsHTML+="</tr>";

		$('#form289_body').prepend(rowsHTML);

		var fields=document.getElementById("form289_"+id);
		var customer_filter=fields.elements[0];
		var item_filter=fields.elements[1];
		var company_filter=fields.elements[2];
		var price_filter=fields.elements[3];
		var staff_filter=fields.elements[5];
		var comment_filter=fields.elements[6];
		var date_filter=fields.elements[7];

		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form289_create_item(fields);
		});

		$(item_filter).on('keydown',function(e)
		{
			//console.log(e.keyCode);
			if(e.keyCode==118)
			{
				e.preventDefault();
				modal173_action(item_filter.value);
			}
		});

		var names_data=new Object();
			names_data.data_store='customers';
			names_data.indexes=[{index:'acc_name'}];
			names_data.return_column='acc_name';
		set_my_value_list_json(names_data,customer_filter,function ()
		{
			$(customer_filter).focus();
		});

		var item_data=new Object();
			item_data.data_store='product_master';
			item_data.indexes=[{index:'name'}];
			item_data.return_column='name';
		set_my_value_list_json(item_data,item_filter);

		$(item_filter).on('blur',function ()
		{
			var company_data=new Object();
				company_data.count=1;
				company_data.data_store='product_master';
				company_data.indexes=[{index:'name',exact:item_filter.value}];
				company_data.return_column='make';
			set_my_value_json(company_data,company_filter);
		});

		var staff_data=new Object();
			staff_data.data_store='staff';
			staff_data.indexes=[{index:'acc_name'}];
			staff_data.return_column='acc_name';
		set_my_value_list_json(staff_data,staff_filter);

		$(date_filter).datepicker();

		var add_customer=document.getElementById('form289_add_customer_'+id);
		$(add_customer).on('click',function()
		{
			modal11_action(function()
			{
				var names_data=new Object();
					names_data.data_store='customers';
					names_data.indexes=[{index:'acc_name'}];
					names_data.return_column='acc_name';
				set_my_value_list_json(names_data,customer_filter,function ()
				{
					$(customer_filter).focus();
				});
			});
		});

		$('textarea').autosize();
		longPressEditable($('.dblclick_editable'));
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form Cities
 * @formNo 290
 */
function form290_add_item()
{
	if(is_create_access('form290'))
	{
		var id=vUtil.newKey();
		var rowsHTML="<tr>";
		rowsHTML+="<form id='form290_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Cities'>";
				rowsHTML+="<input type='text' form='form290_"+id+"' required>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='State'>";
				rowsHTML+="<input type='text' form='form290_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Country'>";
				rowsHTML+="<input type='text' form='form290_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form290_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='submit' class='save_icon' form='form290_"+id+"'>";
				rowsHTML+="<input type='button' class='delete_icon' form='form290_"+id+"' onclick='$(this).parent().parent().remove();'>";
			rowsHTML+="</td>";
		rowsHTML+="</tr>";

		$('#form290_body').prepend(rowsHTML);

		var fields=document.getElementById("form290_"+id);
		var city_filter=fields.elements[0];
		var state_filter=fields.elements[1];
		var country_filter=fields.elements[2];

		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form290_create_item(fields);
		});

		$(city_filter).focus();

		var names_data=new Object();
			names_data.data_store='cities_data';
			names_data.indexes=[{index:'state'}];
			names_data.return_column='state';
		set_my_filter_json(names_data,state_filter);

		var item_data=new Object();
			item_data.data_store='cities_data';
			item_data.indexes=[{index:'country'}];
			item_data.return_column='country';
		set_my_filter_json(item_data,country_filter);

		$('textarea').autosize();
		longPressEditable($('.dblclick_editable'));
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form Create bill (Sehgal)
 * @formNo 294
 */
function form294_add_item()
{
	var filter_fields=document.getElementById('form294_master');
	var bill_type=filter_fields.elements['tax_type'].value;
	var customer_name=filter_fields.elements['customer'].value;

	if(is_create_access('form294'))
	{
		var id=vUtil.newKey();
		var rowsHTML="<tr>";
		rowsHTML+="<form id='form294_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='S.No.'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Item'>";
				rowsHTML+="<input type='text' class='wideinput' required form='form294_"+id+"'>";
				rowsHTML+="<img src='./images/add_image.png' class='add_image' title='Add new item' id='form294_add_product_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Quantity'>";
				rowsHTML+="<input type='number' min='0' required form='form294_"+id+"' step='any'> <b id='form294_unit_"+id+"'></b>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Price'>";
				rowsHTML+="<b>Rate</b>: Rs. <input type='number' required form='form294_"+id+"' step='any'>";
				rowsHTML+="<br><b>Amount</b>: Rs. <input type='number' required readonly='readonly' form='form294_"+id+"' step='any'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Store'>";
				rowsHTML+="<input type='text' required form='form294_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form294_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='button' class='submit_hidden' form='form294_"+id+"' id='save_form294_"+id+"' >";
				rowsHTML+="<input type='button' class='delete_icon' form='form294_"+id+"' id='delete_form294_"+id+"' onclick='$(this).parent().parent().remove();form294_update_serial_numbers(); form294_get_totals();'>";
				rowsHTML+="<input type='submit' class='submit_hidden' form='form294_"+id+"'>";
			rowsHTML+="</td>";
		rowsHTML+="</tr>";

		$('#form294_body').append(rowsHTML);

		longPressEditable($('.dblclick_editable'));
		$('textarea').autosize();

		var fields=document.getElementById("form294_"+id);
		var name_filter=fields.elements[0];
		var quantity_filter=fields.elements[1];
		var price_filter=fields.elements[2];
		var amount_filter=fields.elements[3];
		var storage_filter=fields.elements[4];
		var id_filter=fields.elements[5];
		var save_button=fields.elements[6];

		$(save_button).on("click", function(event)
		{
			event.preventDefault();
			form294_create_item(fields);
		});

		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form294_add_item();
		});

		var add_product=document.getElementById('form294_add_product_'+id);
		$(add_product).on('click',function()
		{
			modal112_action(function()
			{
				var product_data="<product_master>" +
						"<name></name>" +
						"</product_master>";
				set_my_value_list(product_data,name_filter,function ()
				{
					$(name_filter).focus();
				});
			});
		});

		var product_data="<product_master>" +
				"<name></name>" +
				"</product_master>";

		set_my_value_list(product_data,name_filter,function ()
		{
			$(name_filter).focus();
		});

		var store_data="<store_areas>" +
				"<name></name>" +
				"</store_areas>";
		set_my_value_list(store_data,storage_filter);

		$(name_filter).on('keydown',function(e)
		{
			if(e.keyCode==118)
			{
				e.preventDefault();
				modal83_action(name_filter.value);
			}
		});

		$(name_filter).on('blur',function(event)
		{
			var unit_data="<attributes count='1'>"+
						"<value></value>"+
						"<attribute exact='yes'>Unit</attribute>"+
						"<name exact='yes'>"+name_filter.value+"</name>"+
						"</attributes>";
			get_single_column_data(function(units)
			{
				if(units.length>0)
					$('#form294_unit_'+id).html(units[0]);
			},unit_data);


			if(bill_type=='undefined' || bill_type=='')
			{
				var price_data="<product_instances count='1'>" +
					"<sale_price></sale_price>" +
					"<product_name exact='yes'>"+name_filter.value+"</product_name>" +
					"</product_instances>";
				set_my_value(price_data,price_filter);
			}
			else
			{
				var price_data="<sale_prices count='1'>" +
						"<sale_price></sale_price>" +
						"<product_name exact='yes'>"+name_filter.value+"</product_name>" +
						"<billing_type>"+bill_type+"</billing_type>" +
						"</sale_prices>";
				set_my_value(price_data,price_filter);
			}

			get_inventory(name_filter.value,'',function(inventory)
			{
				$(quantity_filter).attr('placeholder',parseFloat(inventory));
			});

			quantity_filter.value="";
			amount_filter.value=0;
		});

		$(price_filter).add(quantity_filter).on('blur',function(event)
		{
			var amount=parseFloat(quantity_filter.value)*parseFloat(price_filter.value);
			amount_filter.value=vUtil.round(amount,2);
		});

		form294_update_serial_numbers();
		form294_get_totals();
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form Create Purchase bill (Sehgal)
 * @formNo 295
 */
function form295_add_item()
{
	var filter_fields=document.getElementById('form295_master');
	var supplier_name=filter_fields.elements['supplier'].value;

	if(is_create_access('form295'))
	{
		var id=vUtil.newKey();
		var rowsHTML="<tr>";
		rowsHTML+="<form id='form295_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='S.No.'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Item'>";
				rowsHTML+="<input type='text' class='wideinput' required form='form295_"+id+"'>";
				rowsHTML+="<img src='./images/add_image.png' class='add_image' title='Add new item' id='form295_add_product_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Quantity'>";
				rowsHTML+="<input type='number' min='0' required form='form295_"+id+"' step='any'> <b id='form295_unit_"+id+"'></b>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Price'>";
				rowsHTML+="<b>Rate</b>: Rs. <input type='number' required form='form295_"+id+"' step='any'>";
				rowsHTML+="<br><b>Amount</b>: Rs. <input type='number' required readonly='readonly' form='form295_"+id+"' step='any'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Store'>";
				rowsHTML+="<input type='text' required form='form295_"+id+"'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form295_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='button' class='submit_hidden' form='form295_"+id+"' id='save_form295_"+id+"' >";
				rowsHTML+="<input type='button' class='delete_icon' form='form295_"+id+"' id='delete_form295_"+id+"' onclick='$(this).parent().parent().remove();form295_update_serial_numbers(); form295_get_totals();'>";
				rowsHTML+="<input type='submit' class='submit_hidden' form='form295_"+id+"'>";
			rowsHTML+="</td>";
		rowsHTML+="</tr>";

		$('#form295_body').append(rowsHTML);

		longPressEditable($('.dblclick_editable'));
		$('textarea').autosize();

		var fields=document.getElementById("form295_"+id);
		var name_filter=fields.elements[0];
		var quantity_filter=fields.elements[1];
		var price_filter=fields.elements[2];
		var amount_filter=fields.elements[3];
		var storage_filter=fields.elements[4];
		var id_filter=fields.elements[5];
		var save_button=fields.elements[6];

		$(save_button).on("click", function(event)
		{
			event.preventDefault();
			form295_create_item(fields);
		});

		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form295_add_item();
		});

		var add_product=document.getElementById('form295_add_product_'+id);
		$(add_product).on('click',function()
		{
			modal112_action(function()
			{
				var product_data="<product_master>" +
						"<name></name>" +
						"</product_master>";
				set_my_value_list(product_data,name_filter,function ()
				{
					$(name_filter).focus();
				});
			});
		});

		var product_data="<product_master>" +
				"<name></name>" +
				"</product_master>";
		set_my_value_list(product_data,name_filter,function ()
		{
			$(name_filter).focus();
		});

		var store_data="<store_areas>" +
				"<name></name>" +
				"</store_areas>";
		set_my_value_list(store_data,storage_filter);

		$(name_filter).on('keydown',function(e)
		{
			if(e.keyCode==118)
			{
				e.preventDefault();
				modal83_action(name_filter.value);
			}
		});

		$(name_filter).on('blur',function(event)
		{
			var unit_data="<attributes count='1'>"+
						"<value></value>"+
						"<attribute exact='yes'>Unit</attribute>"+
						"<name exact='yes'>"+name_filter.value+"</name>"+
						"</attributes>";
			get_single_column_data(function(units)
			{
				if(units.length>0)
					$('#form295_unit_'+id).html(units[0]);
			},unit_data);


			quantity_filter.value="";
			amount_filter.value=0;
		});

		$(price_filter).add(quantity_filter).on('blur',function(event)
		{
			var amount=parseFloat(quantity_filter.value)*parseFloat(price_filter.value);
			amount_filter.value=vUtil.round(amount,2);
		});

		form295_update_serial_numbers();
		form295_get_totals();
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form New Purchase Order (Sehgal)
 * @formNo 296
 */
function form296_add_item()
{
	if(is_create_access('form296'))
	{
		var rowsHTML="";
		var id=vUtil.newKey();
		rowsHTML+="<tr>";
		rowsHTML+="<form id='form296_"+id+"' autocomplete='off'></form>";
			rowsHTML+="<td data-th='Item Name'>";
				rowsHTML+="<input type='text' required form='form296_"+id+"' value=''>";
				rowsHTML+="<img src='./images/add_image.png' class='add_image' title='Add new product' id='form296_add_product_"+id+"'>";
				rowsHTML+="<br><textarea readonly='readonly' form='form296_"+id+"'></textarea>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Quantity'>";
				rowsHTML+="<input type='number' required form='form296_"+id+"' value='' step='any'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Make'>";
				rowsHTML+="<input type='text' form='form296_"+id+"' readonly='readonly'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Price'>";
				rowsHTML+="MRP: <input type='number' required form='form296_"+id+"' value='' class='dblclick_editable' step='any' readonly='readonly'>";
				rowsHTML+="<br>Price: <input type='number' required form='form296_"+id+"' value='' step='any' class='dblclick_editable'>";
				rowsHTML+="<br>Amount: <input type='number' required readonly='readonly' form='form296_"+id+"' step='any'>";
				rowsHTML+="<br>Tax Rate: <input type='number' step='any' form='form296_"+id+"' name='tax_rate'>";
			rowsHTML+="</td>";
			rowsHTML+="<td data-th='Action'>";
				rowsHTML+="<input type='hidden' form='form296_"+id+"' name='tax'>";
				rowsHTML+="<input type='hidden' form='form296_"+id+"' name='total'>";
				rowsHTML+="<input type='hidden' form='form296_"+id+"' value='"+id+"'>";
				rowsHTML+="<input type='button' class='submit_hidden' form='form296_"+id+"' id='save_form296_"+id+"' >";
				rowsHTML+="<input type='button' class='delete_icon' form='form296_"+id+"' id='delete_form296_"+id+"' onclick='$(this).parent().parent().remove(); form296_get_totals();'>";
				rowsHTML+="<input type='submit' class='submit_hidden' form='form296_"+id+"'>";
			rowsHTML+="</td>";
		rowsHTML+="</tr>";

		$('#form296_body').prepend(rowsHTML);

		var master_form=document.getElementById("form296_master");
		var fields=document.getElementById("form296_"+id);
		var name_filter=fields.elements[0];
		var desc_filter=fields.elements[1];
		var quantity_filter=fields.elements[2];
		var make_filter=fields.elements[3];
		var mrp_filter=fields.elements[4];
		var price_filter=fields.elements[5];
		var amount_filter=fields.elements[6];
		var tax_rate_filter=fields.elements[7];
		var tax_filter=fields.elements[8];
		var total_filter=fields.elements[9];
		var id_filter=fields.elements[10];
		var save_button=fields.elements[11];

		$(save_button).on("click", function(event)
		{
			event.preventDefault();
			form296_create_item(fields);
		});

		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form296_add_item();
		});

		var product_data="<product_master>" +
				"<name></name>" +
				"</product_master>";
		set_my_value_list(product_data,name_filter,function ()
		{
			$(name_filter).focus();
		});

		var add_product=document.getElementById('form296_add_product_'+id);
		$(add_product).on('click',function()
		{
			modal114_action(function()
			{
				var product_data="<product_master>" +
						"<name></name>" +
						"</product_master>";
				set_my_value_list(product_data,name_filter,function ()
				{
					$(name_filter).focus();
				});
			});
		});

		$(name_filter).on('blur',function(event)
		{
			var make_data="<product_master count='1'>" +
					"<make></make>" +
					"<tax></tax>"+
					"<description></description>"+
					"<name exact='yes'>"+name_filter.value+"</name>" +
					"</product_master>";
			fetch_requested_data('',make_data,function (makes)
			{
				if(makes.length>0)
				{
					make_filter.value=makes[0].make;
					desc_filter.value=makes[0].description;
					tax_rate_filter.value=makes[0].tax;
				}
			});

			var mrp_data="<product_instances>"+
						"<mrp></mrp>"+
						"<product_name exact='yes'>"+name_filter.value+"</product_name>"+
						"</product_instances>";
			fetch_requested_data('',mrp_data,function(mrps)
			{
				if(mrps.length>0)
				{
					price_filter.value=mrps[0].cost_price;
					mrp_filter.value=mrps[0].mrp;
				}
				else
				{
					price_filter.value="";
					mrp_filter.value="";
				}
			});
		});

		$(quantity_filter).add(price_filter).add(tax_rate_filter).on('blur',function(event)
		{
			amount_filter.value=Math.round(parseFloat(quantity_filter.value)*parseFloat(price_filter.value));
			tax_filter.value=Math.round(parseFloat(amount_filter.value)*(parseFloat(tax_rate_filter.value)/100));
			total_filter.value=Math.round(parseFloat(amount_filter.value)+parseFloat(tax_filter.value));
		});

		form296_get_totals();
		longPressEditable($('.dblclick_editable'));
		$('textarea').autosize();
	}
	else
	{
		$("#modal2_link").click();
	}
}


/**
 * @form Convert QR Data
 * @formNo 302
 */
function form302_add_item()
{
	if(is_create_access('form302'))
	{
		var id=vUtil.newKey();

			var rowsHTML="<tr>";
				rowsHTML+="<form id='form302_"+id+"'></form>";
					rowsHTML+="<td data-th='Source'>";
						rowsHTML+="<textarea form='form302_"+id+"' required></textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Format'>";
						rowsHTML+="<textarea form='form302_"+id+"' class='dblclick_editable'></textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Conversion Function'>";
						rowsHTML+="<textarea form='form302_"+id+"' class='dblclick_editable'></textarea>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Pending Records'>";
						rowsHTML+="<input type='number' readonly='readonly' form='form302_"+id+"'>";
					rowsHTML+="</td>";
					rowsHTML+="<td data-th='Action'>";
						rowsHTML+="<input type='hidden' form='form302_"+id+"' value='"+id+"'>";
						rowsHTML+="<input type='submit' class='save_icon' form='form302_"+id+"' title='Save'>";
						rowsHTML+="<input type='button' class='delete_icon' form='form302_"+id+"' title='Delete' onclick='$(this).parent().parent().remove();'>";
					rowsHTML+="</td>";
			rowsHTML+="</tr>";

		$('#form302_body').append(rowsHTML);
		var fields=document.getElementById("form302_"+id);
		var source_filter=fields.elements[0];

		$(source_filter).focus();

		$(fields).on("submit", function(event)
		{
			event.preventDefault();
			form302_create_item(fields);
		});

		longPressEditable($('.dblclick_editable'));
		$('textarea').autosize();
	}
	else
	{
		$("#modal2_link").click();
	}
}
