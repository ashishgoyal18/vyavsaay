function form24_get_totals()
{
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

	var form=document.getElementById("form24_master");

/*	if(form.elements['cst'].checked)
	{
		tax+=.02*amount;
		total+=.02*amount;
	}
*/
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
}

function form69_get_totals()
{
	var total_quantity=0;
	var amount=0;
	var freight=0;
	var tax=0;
	var total=0;

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
	freight=vUtil.round(freight,2);
	tax=vUtil.round(tax,2);
	total=vUtil.round(total,2);

	var total_row="<tr><td colspan='1' data-th='Total'>Total Quantity: "+total_quantity+"</td>" +
						"<td>Amount:</br>Tax: <br>Freight: </br>Total: </td>" +
						"<td>Rs. "+amount+"</br>" +
						"Rs. "+tax+"</br>" +
						"Rs. "+freight+"</br>" +
						"Rs. "+total+"</td>" +
						"<td></td>" +
						"</tr>";
	$('#form69_foot').html(total_row);
}


function form91_get_totals()
{
	var amount=0;
	var tax_name="VAT";
	var tax_array=[];
	var freight=0;
	var total=0;
	var total_quantity=0;

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
		if(!isNaN(parseFloat(subform.elements[6].value)))
		{
			freight+=parseFloat(subform.elements[6].value);
		}
		if(!isNaN(parseFloat(subform.elements[9].value)))
		{
			total+=parseFloat(subform.elements[9].value);
		}
	});

	var form=document.getElementById("form91_master");

	if(form.elements['bill_type'].value=='Retail-CST' || form.elements['bill_type'].value=='Retail-CST-C')
	{
		tax_name="CST";
	}

	var tax_string="";
	var tax="";
	for(var x in tax_array)
	{
		tax_array[x]=vUtil.round(tax_array[x],2);
		tax_string+=tax_name+" @"+x+"%: <br>";
		tax+="Rs. "+tax_array[x]+": <br>";
	}

	amount=vUtil.round(amount,2);
	freight=vUtil.round(freight,2);
	total=vUtil.round(total,2);

	var total_row="<tr><td colspan='3' data-th='Total'>Total Quantity: "+total_quantity+"</td>" +
							"<td>Amount:</br>"+tax_string+"Freight: </br>Total: </td>" +
							"<td>Rs. "+amount+"</br>" +tax+
							"Rs. "+freight+"</br>" +
							"Rs. <vyavsaay_p id='form91_final_total'>"+total+"</vyavsaay_p></td>" +
							"<td></td>" +
							"</tr>";
	$('#form91_foot').html(total_row);
}

function form122_get_totals()
{
	var total=0;
	var tax=0;
	var amount=0;
	var total_accepted=0;
	var total_quantity=0;

	$("[id^='save_form122']").each(function(index)
	{
		var subform_id=$(this).attr('form');
		var subform=document.getElementById(subform_id);
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
}


function form153_get_totals()
{
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

		if(isNaN(parseFloat(subform.elements[5].value)))
			amount+=0;
		else
			amount+=vUtil.round(parseFloat(subform.elements[5].value),0);
	});

	var tax=vUtil.round((tax_rate*((amount-discount)/100)),0);
	var total=vUtil.round(amount+tax-discount,0);

	var total_row="<tr><td colspan='2' data-th='Total'>Total</td>" +
					"<td>Amount:</br>Discount: </br>Tax:@ <input type='number' value='"+tax_rate+"' title='specify tax rate' step='any' id='form153_tax' class='dblclick_editable'>% </br>Total: </td>" +
					"<td>Rs. "+amount+"</br>" +
					"Rs. <input type='number' value='"+discount+"' step='any' id='form153_discount' class='dblclick_editable'></br>" +
					"Rs. "+tax+"<br>" +
					"Rs. "+total+"</td>" +
					"<td></td>" +
					"</tr>";

	$('#form153_foot').html(total_row);
	longPressEditable($('.dblclick_editable'));
}

function form154_update_serial_numbers()
{
	$('#form154_body').find('tr').each(function(index)
	{
		$(this).find('td:nth-child(2)').html(index+1);
	});
}

function form154_get_totals()
{
	var form=document.getElementById("form154_master");

	var bill_type=form.elements['bill_type'].value;
	var tax_type=form.elements['tax_type'].value;

	var tax_text="VAT";
	if(tax_type=='CST' || tax_type=='Retail Central')
	{
		tax_text="CST";
	}

	var hiring=false;
	if(bill_type=='Hiring')
		hiring=true;

	var amount=0;
	var discount=0;
	var cartage=0;
	var tax_rate=0;

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
			if(isNaN(parseFloat(subform.elements[7].value)))
				amount+=0;
			else
				amount+=Math.round(parseFloat(subform.elements[7].value));
		}
		else if(bill_type=='Installation' || bill_type=='Repair')
		{
			if(isNaN(parseFloat(subform.elements[3].value)))
				amount+=0;
			else
				amount+=Math.round(parseFloat(subform.elements[3].value));
		}
		else
		{
			if(isNaN(parseFloat(subform.elements[3].value)))
				amount+=0;
			else
				amount+=Math.round(parseFloat(subform.elements[3].value));
		}
	});

	var tax=Math.round((tax_rate*((amount-discount)/100)));
	var total=Math.round(amount+tax-discount+cartage).toFixed(2);

	form.elements['bill_total'].value=total;

	var total_row="<tr><td colspan='3' data-th='Total'>Total</td>" +
				"<td>Amount:<disc><br>Discount: </disc><br>"+tax_text+":@ <input type='number' value='"+tax_rate+"' step='any' id='form154_tax' class='dblclick_editable'>% <br>Cartage: <br>Total: </td>" +
				"<td>Rs. "+amount.toFixed(2)+"</br>" +
				"<disc_amount>Rs. <input type='number' value='"+discount.toFixed(2)+"' step='any' id='form154_discount' class='dblclick_editable'></br></disc_amount>" +
				"Rs. "+tax.toFixed(2)+" <br>" +
				"Rs. <input type='number' value='0.00' step='any' id='form154_cartage' class='dblclick_editable'></br>" +
				"Rs. "+total+"</td>" +
				"<td></td>" +
				"</tr>";
	if(hiring)
	{
		total_row="<tr><td colspan='4' data-th='Total'>Total</td>" +
				"<td>Amount:<disc><br>Discount: </disc><br>Service Tax:@ <input type='number' value='"+tax_rate+"' step='any' id='form154_tax' class='dblclick_editable'>% <br>Cartage: <br>Total: </td>" +
				"<td>Rs. "+amount.toFixed(2)+"</br>" +
				"<disc_amount>Rs. <input type='number' value='"+discount.toFixed(2)+"' step='any' id='form154_discount' class='dblclick_editable'><br><disc_amount>" +
				"Rs. "+tax.toFixed(2)+" <br>" +
				"Rs. <input type='number' value='0.00' step='any' id='form154_cartage' class='dblclick_editable'></br>" +
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
				"Rs. <input type='number' value='0.00' step='any' id='form154_cartage' class='dblclick_editable'></br>" +
				"Rs. "+total+"</td>" +
				"<td></td>" +
				"</tr>";
	}

	$('#form154_foot').html(total_row);
	longPressEditable($('.dblclick_editable'));
}

function form158_get_totals()
{
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
}


/**
 * @form Put Away
 * @formNo 165
 * @param button
 */
function form165_get_totals()
{
	var master_form=document.getElementById('form165_master');

	var total_tbp=0;
	var total_placed=0;

	$("[id^='row_form165_']").each(function(index)
	{
		if(!isNaN(parseFloat(this.elements[2].value)))
		{
			total_tbp+=parseFloat(this.elements[2].value);
		}
		if(!isNaN(parseFloat(this.elements[3].value)))
		{
			total_placed+=parseFloat(this.elements[3].value);
		}

	});

	master_form.elements['pending_count'].value=total_tbp-total_placed;
}


function form184_update_serial_numbers()
{
	$('#form184_body').find('tr').each(function(index)
	{
		$(this).find('td:nth-child(2)>input').attr('value',index+1);
	});
}


function form193_get_totals()
{
	//console.log('getting totals');
	var total_quantity=0;

	$("[id^='save_form193']").each(function(index)
	{
		var subform_id=$(this).attr('form');
		var subform=document.getElementById(subform_id);

		if(subform.elements[1].value!="")
		{
			total_quantity+=1;
		}
	});

	var fields=document.getElementById('form193_master');
	fields.elements['q_scanned'].value=total_quantity;
}


function form222_get_totals()
{
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
}


function form244_get_totals()
{
	var total_quantity=0;

	$("[id^='save_form244']").each(function(index)
	{
		var subform_id=$(this).attr('form');
		var subform=document.getElementById(subform_id);

		if(subform.elements[1].value!="")
		{
			total_quantity+=1;
		}
	});

	var fields=document.getElementById('form244_master');
	fields.elements['q_scanned'].value=total_quantity;
}

function form248_update_serial_numbers()
{
	$('#form248_body').find('tr').each(function(index)
	{
		$(this).find('td:nth-child(2)').html(index+1);
	});

	var num_orders=0;
	var weight=0;
	$("[id^='save_form248']").each(function(index)
	{
		var subform_id=$(this).attr('form');
		var subform=document.getElementById(subform_id);

		if(subform.elements[0].value!="")
		{
			num_orders+=1;
		}
		if(!isNaN(parseFloat(subform.elements[3].value)))
		{
			weight+=parseFloat(subform.elements[3].value);
		}
	});

	var form=document.getElementById("form248_master");
	form.elements['num_orders'].value=num_orders;
	form.elements['weight'].value=vUtil.round(weight,4);
}

function form250_update_serial_numbers()
{
	$('#form250_body').find('tr').each(function(index)
	{
		$(this).find('td:nth-child(2)').html(index+1);
	});

	var num_bags=0;
	var num_orders=0;
	var weight=0;
	$("[id^='save_form250']").each(function(index)
	{
		var subform_id=$(this).attr('form');
		var subform=document.getElementById(subform_id);

		if(subform.elements[0].value!="")
		{
			num_bags+=1;
		}
		if(!isNaN(parseFloat(subform.elements[3].value)))
		{
			num_orders+=parseFloat(subform.elements[3].value);
		}
		if(!isNaN(parseFloat(subform.elements[2].value)))
		{
			weight+=parseFloat(subform.elements[2].value);
		}
	});

	var form=document.getElementById("form250_master");
	form.elements['num_orders'].value=num_orders;
	form.elements['num_bags'].value=num_bags;
	form.elements['weight'].value=weight;
}


function form294_update_serial_numbers()
{
	$('#form294_body').find('tr').each(function(index)
	{
		$(this).find('td:nth-child(2)').html(index+1);
	});
}

function form294_get_totals()
{
	var form=document.getElementById("form294_master");

	var bill_type=form.elements['tax_type'].value;

	var amount=0;
	var discount=0;
	var cartage=0;
	var tax_rate=0;

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
			amount+=parseFloat(subform.elements[3].value);
	});

	var amount=vUtil.round(amount,2);
	var tax=vUtil.round((tax_rate*((amount-discount)/100)),2);
	var total=vUtil.round(amount+tax-discount+cartage,0);

	var total_row="<tr><td colspan='3' data-th='Total'>Total</td>" +
				"<td>Amount:<disc><br>Discount: </disc><br>Tax:@ <input type='number' value='"+tax_rate+"' step='any' id='form294_tax' class='dblclick_editable'>% <br>Cartage: <br>Total: </td>" +
				"<td>Rs. "+amount+"</br>" +
				"<disc_amount>Rs. <input type='number' value='"+discount+"' step='any' id='form294_discount' class='dblclick_editable'></br></disc_amount>" +
				"Rs. "+tax+" <br>" +
				"Rs. <input type='number' value='0.00' step='any' id='form294_cartage' class='dblclick_editable'></br>" +
				"Rs. "+total+"</td>" +
				"<td></td>" +
				"</tr>";

	$('#form294_foot').html(total_row);
	longPressEditable($('.dblclick_editable'));
}

function form295_update_serial_numbers()
{
	$('#form295_body').find('tr').each(function(index)
	{
		$(this).find('td:nth-child(2)').html(index+1);
	});
}

function form295_get_totals()
{
	var form=document.getElementById("form295_master");

	var amount=0;
	var discount=0;
	var cartage=0;
	var tax_rate=0;

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
			amount+=parseFloat(subform.elements[3].value);
	});

	var amount=vUtil.round(amount,2);
	var tax=vUtil.round((tax_rate*((amount-discount)/100)),2);
	var total=vUtil.round(amount+tax-discount+cartage,0);

	var total_row="<tr><td colspan='3' data-th='Total'>Total</td>" +
				"<td>Amount:<disc><br>Discount: </disc><br>Tax:@ <input type='number' value='"+tax_rate+"' step='any' id='form295_tax' class='dblclick_editable'>% <br>Cartage: <br>Total: </td>" +
				"<td>Rs. "+amount+"</br>" +
				"<disc_amount>Rs. <input type='number' value='"+discount+"' step='any' id='form295_discount' class='dblclick_editable'></br></disc_amount>" +
				"Rs. "+tax+" <br>" +
				"Rs. <input type='number' value='0.00' step='any' id='form295_cartage' class='dblclick_editable'></br>" +
				"Rs. "+total+"</td>" +
				"<td></td>" +
				"</tr>";

	$('#form295_foot').html(total_row);
	longPressEditable($('.dblclick_editable'));
}

function form296_get_totals()
{
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

	var form=document.getElementById("form296_master");

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
}
