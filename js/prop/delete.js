/**
 * @form Create Newsletter
 * @param button
 */
function form2_delete_item(button)
{
	if(is_delete_access('form2'))
	{
		modal115_action(function()
		{
			var form_id=$(button).attr('form');
			var form=document.getElementById(form_id);

			var data_id=form.elements[7].value;
			var data_xml="<newsletter_items>" +
						"<id>"+data_id+"</id>" +
						"</newsletter_items>";
			if(is_online())
			{
				server_delete_simple(data_xml);
			}
			else
			{
				local_delete_simple(data_xml);
			}
			$(button).parent().parent().remove();
		});
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
function form5_delete_item(button)
{
	if(is_delete_access('form5'))
	{
		modal115_action(function()
		{
			var form_id=$(button).attr('form');
			var form=document.getElementById(form_id);

			var name=form.elements[0].value;
			var type=form.elements[1].value;
			var description=form.elements[2].value;
			var data_id=form.elements[3].value;
			var last_updated=get_my_time();
			var data_xml="<assets>" +
						"<id>"+data_id+"</id>" +
						"<name>"+name+"</name>" +
						"<type>"+type+"</type>" +
						"</assets>";
			var activity_xml="<activity>" +
						"<data_id>"+data_id+"</data_id>" +
						"<tablename>assets</tablename>" +
						"<link_to>form5</link_to>" +
						"<title>Deleted</title>" +
						"<notes>Asset "+name+"</notes>" +
						"<updated_by>"+get_name()+"</updated_by>" +
						"</activity>";
			if(is_online())
			{
				server_delete_row(data_xml,activity_xml);
			}
			else
			{
				local_delete_row(data_xml,activity_xml);
			}
			$(button).parent().parent().remove();
		});
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form Create Service Bill
 * @param button
 */
function form10_delete_item(button)
{
	if(is_delete_access('form10'))
	{
		modal115_action(function()
		{
			//console.log('deleting form10_item');
			var bill_id=document.getElementById("form10_master").elements['bill_id'].value;

			var form_id=$(button).attr('form');
			var form=document.getElementById(form_id);
			var data_id=form.elements[8].value;

			var data_xml="<bill_items>" +
						"<id>"+data_id+"</id>" +
						"<bill_id>"+bill_id+"</bill_id>" +
						"</bill_items>";
			delete_simple(data_xml);

			$(button).parent().parent().remove();
		});
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
function form12_delete_item(button)
{
	if(is_delete_access('form12'))
	{
		modal115_action(function()
		{
			var bill_id=document.getElementById("form12_master").elements[4].value;

			var form_id=$(button).attr('form');
			var form=document.getElementById(form_id);
			var data_id=form.elements[9].value;

			var data_xml="<bill_items>" +
						"<id>"+data_id+"</id>" +
						"<bill_id>"+bill_id+"</bill_id>" +
						"</bill_items>";
			delete_simple(data_xml);

			$(button).parent().parent().remove();
		});
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
function form14_delete_item(button)
{
	if(is_delete_access('form14'))
	{
		modal115_action(function()
		{
			var form_id=$(button).attr('form');
			var form=document.getElementById(form_id);

			var name=form.elements[0].value;
			var assignee=form.elements[1].value;
			var status=form.elements[3].value;
			var data_id=form.elements[4].value;
			var data_xml="<task_instances>" +
						"<id>"+data_id+"</id>" +
						"<name>"+name+"</name>" +
						"<assignee>"+assignee+"</assignee>" +
						"<status>"+status+"</status>" +
						"</task_instances>";
			var activity_xml="<activity>" +
						"<data_id>"+data_id+"</data_id>" +
						"<tablename>task_instances</tablename>" +
						"<link_to>form14</link_to>" +
						"<title>Deleted</title>" +
						"<notes>Task "+name+" assigned to "+assignee+"</notes>" +
						"<updated_by>"+get_name()+"</updated_by>" +
						"</activity>";
			delete_row(data_xml,activity_xml);

			$(button).parent().parent().remove();
		});
	}
	else
	{
		$("#modal2_link").click();
	}
}


/**
 * @form Manage customer returns
 * @param button
 */
function form16_delete_item(button)
{
	if(is_delete_access('form16'))
	{
		modal115_action(function()
		{
			var form_id=$(button).attr('form');
			var form=document.getElementById(form_id);

			var order_num=form.elements[0].value;
			var customer=form.elements[2].value;
			var data_id=form.elements[5].value;
			var transaction_id=form.elements[8].value;
			var edit_button=form.elements[6].value;

			var last_updated=get_my_time();
			var return_xml="<customer_returns>" +
						"<id>"+data_id+"</id>" +
						"<status>cancelled</status>" +
						"</customer_returns>";
			var activity_xml="<activity>" +
						"<data_id>"+data_id+"</data_id>" +
						"<tablename>customer_returns</tablename>" +
						"<link_to>form16</link_to>" +
						"<title>Cancelled</title>" +
						"<notes>Return for order # "+order_num+" for customer "+customer+"</notes>" +
						"<updated_by>"+get_name()+"</updated_by>" +
						"</activity>";
			var transaction_xml="<transactions>" +
					"<id>"+transaction_id+"</id>" +
					"</transactions>";

			update_row(return_xml,activity_xml);
			delete_simple(transaction_xml);

			$(button).parent().parent().attr('style','opacity:0.5');
			$(button).parent().parent().attr('title','This bill was cancelled');
			$(button).hide();
			$(edit_button).hide();

			var payment_xml="<payments>" +
					"<id></id>" +
					"<bill_id exact='yes'>"+data_id+"</bill_id>" +
					"<status array='yes'>--pending--cancelled--</status>" +
					"<transaction_id></transaction_id>" +
					"</payments>";
			fetch_requested_data('',payment_xml,function(payments)
			{
				for(var x in payments)
				{
					var pt_xml="<transactions>" +
							"<id>"+payments[x].transaction_id+"</id>" +
							"</transactions>";
					var pay_xml="<payments>" +
							"<id>"+payments[x].id+"</id>" +
							"<bill_id></bill_id>" +
							"<transaction_id></transaction_id>" +
							"</payments>";

					delete_simple(pay_xml);
					delete_simple(pt_xml);
					break;
				}
			});

			var items_data="<customer_return_items>" +
					"<return_id>"+data_id+"</return_id>" +
					"</customer_return_items>";
			var discard_xml="<discarded>" +
					"<source_id>"+data_id+"</source_id>" +
					"<source>sale return</source>" +
					"</discarded>";

			delete_simple(items_data);
			delete_simple(discard_xml);

		});
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
function form24_delete_item(button)
{
	if(is_delete_access('form24'))
	{
		modal115_action(function()
		{
			var form_id=$(button).attr('form');
			var form=document.getElementById(form_id);

			var data_id=form.elements[11].value;
			var data_xml="<purchase_order_items>" +
						"<id>"+data_id+"</id>" +
						"</purchase_order_items>";
			delete_simple(data_xml);

			$(button).parent().parent().remove();
		});
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
function form35_delete_item(button)
{
	if(is_delete_access('form35'))
	{
		modal115_action(function()
		{
			var form_id=$(button).attr('form');
			var form=document.getElementById(form_id);

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
						"</offers>";
			var activity_xml="<activity>" +
						"<data_id>"+data_id+"</data_id>" +
						"<tablename>offers</tablename>" +
						"<link_to>form35</link_to>" +
						"<title>Deleted</title>" +
						"<notes>Offer "+offer_name+"</notes>" +
						"<updated_by>"+get_name()+"</updated_by>" +
						"</activity>";
			delete_row(data_xml,activity_xml);
			$(button).parent().parent().remove();
		});
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form Manage Purchase Orders
 * @param button
 */
function form43_delete_item(button)
{
	if(is_delete_access('form43'))
	{
		modal115_action(function()
		{
			var form_id=$(button).attr('form');
			var form=document.getElementById(form_id);

			var order_num=form.elements[0].value;
			var supplier_name=form.elements[1].value;
			var data_id=form.elements[8].value;
			var last_updated=get_my_time();
			var data_xml="<purchase_orders>" +
						"<id>"+data_id+"</id>" +
						"</purchase_orders>";
			var activity_xml="<activity>" +
						"<data_id>"+data_id+"</data_id>" +
						"<tablename>purchase_orders</tablename>" +
						"<link_to>form43</link_to>" +
						"<title>Deleted</title>" +
						"<notes>Purchase order no "+order_num+" for supplier "+supplier_name+"</notes>" +
						"<updated_by>"+get_name()+"</updated_by>" +
						"</activity>";
			var other_delete="<purchase_order_items>" +
					"<order_id>"+data_id+"</order_id>" +
					"</purchase_order_items>";
			delete_row(data_xml,activity_xml);
			delete_simple(other_delete);
			$(button).parent().parent().remove();
		});
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
function form58_delete_item(button)
{
	if(is_delete_access('form58'))
	{
		modal115_action(function()
		{
			var form_id=$(button).attr('form');
			var form=document.getElementById(form_id);
			var data_json={data_store:'pre_requisites',
 							data:[{index:'id',value:form.elements[4].value}],
 							log:'yes',
 							log_data:{title:"Deleted",notes:"Pre-requisite for service "+form.elements[0].value,link_to:"form58"}};
			delete_json(data_json);
			$(button).parent().parent().remove();
		});
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
function form59_delete_item(button)
{
	if(is_delete_access('form59'))
	{
		modal115_action(function()
		{
			var form_id=$(button).attr('form');
			var form=document.getElementById(form_id);

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
						"</"+table+">";
			var activity_xml="<activity>" +
						"<data_id>"+data_id+"</data_id>" +
						"<tablename>"+table+"</tablename>" +
						"<link_to>form59</link_to>" +
						"<title>Deleted</title>" +
						"<notes>Pre-requisite for product "+product+"</notes>" +
						"<updated_by>"+get_name()+"</updated_by>" +
						"</activity>";
			if(is_online())
			{
				server_delete_row(data_xml,activity_xml);
			}
			else
			{
				local_delete_row(data_xml,activity_xml);
			}
			$(button).parent().parent().remove();
		});
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
function form61_delete_item(button)
{
	if(is_delete_access('form61'))
	{
		modal115_action(function()
		{
			var form_id=$(button).attr('form');
			var form=document.getElementById(form_id);

			var service=form.elements[0].value;
			var attribute=form.elements[1].value;
			var value=form.elements[2].value;
			var data_id=form.elements[3].value;
			var last_updated=get_my_time();
			var data_xml="<attributes>" +
						"<id>"+data_id+"</id>" +
						"<name>"+service+"</name>" +
						"<type>service</type>" +
						"<attribute>"+attribute+"</attribute>" +
						"<value>"+value+"</value>" +
						"</attributes>";
			var activity_xml="<activity>" +
						"<data_id>"+data_id+"</data_id>" +
						"<tablename>attributes</tablename>" +
						"<link_to>form61</link_to>" +
						"<title>Deleted</title>" +
						"<notes>Attribute "+attribute+" for service "+service+"</notes>" +
						"<updated_by>"+get_name()+"</updated_by>" +
						"</activity>";
			if(is_online())
			{
				server_delete_row(data_xml,activity_xml);
			}
			else
			{
				local_delete_row(data_xml,activity_xml);
			}
			$(button).parent().parent().remove();
		});
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
function form62_delete_item(button)
{
	if(is_delete_access('form62'))
	{
		modal115_action(function()
		{
			var form_id=$(button).attr('form');
			var form=document.getElementById(form_id);

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
						"</"+table+">";
			var activity_xml="<activity>" +
						"<data_id>"+data_id+"</data_id>" +
						"<tablename>"+table+"</tablename>" +
						"<link_to>form62</link_to>" +
						"<title>Deleted</title>" +
						"<notes>Review for product "+product+"</notes>" +
						"<updated_by>"+get_name()+"</updated_by>" +
						"</activity>";
			if(is_online())
			{
				server_delete_row(data_xml,activity_xml);
			}
			else
			{
				local_delete_row(data_xml,activity_xml);
			}
			$(button).parent().parent().remove();
		});
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
function form63_delete_item(button)
{
	if(is_delete_access('form63'))
	{
		modal115_action(function()
		{
			var form_id=$(button).attr('form');
			var form=document.getElementById(form_id);

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
						"</reviews>";
			var activity_xml="<activity>" +
						"<data_id>"+data_id+"</data_id>" +
						"<tablename>reviews</tablename>" +
						"<link_to>form63</link_to>" +
						"<title>Deleted</title>" +
						"<notes>Review for service "+service+"</notes>" +
						"<updated_by>"+get_name()+"</updated_by>" +
						"</activity>";
			if(is_online())
			{
				server_delete_row(data_xml,activity_xml);
			}
			else
			{
				local_delete_row(data_xml,activity_xml);
			}
			$(button).parent().parent().remove();
		});
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
function form64_delete_item(button)
{
	if(is_delete_access('form64'))
	{
		modal115_action(function()
		{
			var form_id=$(button).attr('form');
			var form=document.getElementById(form_id);

			var service=form.elements[0].value;
			var cross_type=form.elements[1].value;
			var cross_name=form.elements[2].value;
			var data_id=form.elements[3].value;
			var last_updated=get_my_time();
			var data_xml="<cross_sells>" +
						"<id>"+data_id+"</id>" +
						"<name>"+service+"</name>" +
						"<type>service</type>" +
						"<cross_type>"+cross_type+"</cross_type>" +
						"<cross_name>"+cross_name+"</cross_name>" +
						"</cross_sells>";
			var activity_xml="<activity>" +
						"<data_id>"+data_id+"</data_id>" +
						"<tablename>cross_sells</tablename>" +
						"<link_to>form64</link_to>" +
						"<title>Deleted</title>" +
						"<notes>Cross selling of "+cross_name+" with service "+service+"</notes>" +
						"<updated_by>"+get_name()+"</updated_by>" +
						"</activity>";
			if(is_online())
			{
				server_delete_row(data_xml,activity_xml);
			}
			else
			{
				local_delete_row(data_xml,activity_xml);
			}
			$(button).parent().parent().remove();
		});
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
function form66_delete_item(button)
{
	if(is_delete_access('form66'))
	{
		modal115_action(function()
		{
			var form_id=$(button).attr('form');
			var form=document.getElementById(form_id);

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
						"</"+table+">";
			var activity_xml="<activity>" +
						"<data_id>"+data_id+"</data_id>" +
						"<tablename>"+table+"</tablename>" +
						"<link_to>form66</link_to>" +
						"<title>Deleted</title>" +
						"<notes>Cross selling of "+cross_name+" for product "+product+"</notes>" +
						"<updated_by>"+get_name()+"</updated_by>" +
						"</activity>";
			if(is_online())
			{
				server_delete_row(data_xml,activity_xml);
			}
			else
			{
				local_delete_row(data_xml,activity_xml);
			}
			$(button).parent().parent().remove();
		});
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
function form69_delete_item(button)
{
	if(is_delete_access('form69'))
	{
		modal115_action(function()
		{
			var form_id=$(button).attr('form');
			var form=document.getElementById(form_id);

			var data_id=form.elements[11].value;
			var last_updated=get_my_time();
			var data_xml="<sale_order_items>" +
						"<id>"+data_id+"</id>" +
						"</sale_order_items>";
			delete_simple(data_xml);
			$(button).parent().parent().remove();
		});
	}
	else
	{
		$("#modal2_link").click();
	}
}


/**
 * @form Manage Sale Orders
 * @param button
 */
function form70_delete_item(button)
{
	if(is_delete_access('form70'))
	{
		modal115_action(function()
		{
			var form_id=$(button).attr('form');
			var form=document.getElementById(form_id);

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
						"</sale_orders>";
			var activity_xml="<activity>" +
						"<data_id>"+data_id+"</data_id>" +
						"<tablename>sale_orders</tablename>" +
						"<link_to>form70</link_to>" +
						"<title>Deleted</title>" +
						"<notes>Sale Order no "+data_id+" for customer "+customer_name+"</notes>" +
						"<updated_by>"+get_name()+"</updated_by>" +
						"</activity>";
			var other_delete="<sale_order_items>" +
					"<order_id>"+data_id+"</order_id>" +
					"</sale_order_items>";
			delete_row(data_xml,activity_xml);
			delete_simple(other_delete);
			$(button).parent().parent().remove();
		});
	}
	else
	{
		$("#modal2_link").click();
	}
}


/**
 * @form manage Task types
 * @param button
 */
function form79_delete_item(button)
{
	if(is_delete_access('form79'))
	{
		modal115_action(function()
		{
			var form_id=$(button).attr('form');
			var form=document.getElementById(form_id);
			var task=form.elements[0].value;
			var data_id=form.elements[3].value;
			var data_xml="<task_type>" +
						"<id>"+data_id+"</id>" +
						"<name>"+task+"</name>" +
						"</task_type>";
			var activity_xml="<activity>" +
						"<data_id>"+data_id+"</data_id>" +
						"<tablename>task_type</tablename>" +
						"<link_to>form79</link_to>" +
						"<title>Deleted</title>" +
						"<notes>Task type "+task+"</notes>" +
						"<updated_by>"+get_name()+"</updated_by>" +
						"</activity>";

			if(is_online())
			{
				server_delete_row(data_xml,activity_xml);
			}
			else
			{
				local_delete_row(data_xml,activity_xml);
			}
			$(button).parent().parent().remove();
		});
	}
	else
	{
		$("#modal2_link").click();
	}
}


/**
 * @form Sale Leads
 * @param button
 */
function form81_delete_item(button)
{
	if(is_delete_access('form81'))
	{
		modal115_action(function()
		{
			var form_id=$(button).attr('form');
			var form=document.getElementById(form_id);
			var customer=form.elements[0].value;
			var data_id=form.elements[4].value;
			var data_xml="<sale_leads>" +
						"<id>"+data_id+"</id>" +
						"<customer>"+customer+"</customer>" +
						"</sale_leads>";
			var activity_xml="<activity>" +
						"<data_id>"+data_id+"</data_id>" +
						"<tablename>sale_leads</tablename>" +
						"<link_to>form81</link_to>" +
						"<title>Delete</title>" +
						"<notes>Sale lead for customer "+customer+"</notes>" +
						"<updated_by>"+get_name()+"</updated_by>" +
						"</activity>";
			if(is_online())
			{
				server_delete_row(data_xml,activity_xml);
			}
			else
			{
				local_delete_row(data_xml,activity_xml);
			}
			$(button).parent().parent().remove();
		});
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
function form84_delete_item(button)
{
	if(is_delete_access('form84'))
	{
		modal115_action(function()
		{
			var form_id=$(button).attr('form');
			var form=document.getElementById(form_id);

			var customer=form.elements[0].value;
			var service=form.elements[1].value;
			var data_id=form.elements[5].value;
			var last_updated=get_my_time();
			var data_xml="<service_subscriptions>" +
						"<id>"+data_id+"</id>" +
						"<customer>"+customer+"</customer>" +
						"<service>"+service+"</service>" +
						"</service_subscriptions>";
			var activity_xml="<activity>" +
						"<data_id>"+data_id+"</data_id>" +
						"<tablename>service_subscriptions</tablename>" +
						"<link_to>form84</link_to>" +
						"<title>Deleted</title>" +
						"<notes>Service "+service+" subscription for customer "+customer+"</notes>" +
						"<updated_by>"+get_name()+"</updated_by>" +
						"</activity>";
			if(is_online())
			{
				server_delete_row(data_xml,activity_xml);
			}
			else
			{
				local_delete_row(data_xml,activity_xml);
			}
			$(button).parent().parent().remove();
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
function form87_delete_item(button)
{
	if(is_delete_access('form87'))
	{
		modal115_action(function()
		{
			var form_id=$(button).attr('form');
			var form=document.getElementById(form_id);

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
						"</product_master>";
			var activity_xml="<activity>" +
						"<data_id>"+data_id+"</data_id>" +
						"<tablename>product_master</tablename>" +
						"<link_to>form87</link_to>" +
						"<title>Deleted</title>" +
						"<notes>Product "+name+" from inventory</notes>" +
						"<updated_by>"+get_name()+"</updated_by>" +
						"</activity>";
			var other_delete="<product_instances>" +
					"<product_name>"+name+"</product_name>" +
					"</product_instances>";
			var other_delete2="<documents>" +
					"<doc_type>product</doc_type>" +
					"<target_id>"+data_id+"</target_id>" +
					"</documents>";
			var other_delete3="<pre_requisites>" +
					"<name>"+name+"</name>" +
					"<type>product</type>" +
					"</pre_requisites>";
			var other_delete4="<attributes>" +
					"<name>"+name+"</name>" +
					"<type>product</type>" +
					"</attributes>";
			var other_delete5="<cross_sells>" +
					"<name>"+name+"</name>" +
					"<type>product</type>" +
					"</cross_sells>";
			var other_delete6="<reviews>" +
					"<name>"+name+"</name>" +
					"<type>product</type>" +
					"</reviews>";

			if(is_online())
			{
				server_delete_row(data_xml,activity_xml);
				server_delete_simple(other_delete);
				server_delete_simple(other_delete2);
				server_delete_simple(other_delete3);
				server_delete_simple(other_delete4);
				server_delete_simple(other_delete5);
				server_delete_simple(other_delete6);
			}
			else
			{
				local_delete_row(data_xml,activity_xml);
				local_delete_simple(other_delete);
				local_delete_simple(other_delete2);
				local_delete_simple(other_delete3);
				local_delete_simple(other_delete4);
				local_delete_simple(other_delete5);
				local_delete_simple(other_delete6);
			}
			$(button).parent().parent().remove();
		});
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
function form88_delete_item(button)
{
	if(is_delete_access('form88'))
	{
		modal115_action(function()
		{
			var form_id=$(button).attr('form');
			var form=document.getElementById(form_id);

			var product=form.elements[0].value;
			var status=form.elements[2].value;
			var data_id=form.elements[5].value;
			var data_xml="<manufacturing_schedule>" +
						"<id>"+data_id+"</id>" +
						"<product>"+product+"</product>" +
						"<status>"+status+"</status>" +
						"</manufacturing_schedule>";
			var activity_xml="<activity>" +
						"<data_id>"+data_id+"</data_id>" +
						"<tablename>manufacturing_schedule</tablename>" +
						"<link_to>form88</link_to>" +
						"<title>Delete</title>" +
						"<notes>Manufacturing schedule for product "+product+"</notes>" +
						"<updated_by>"+get_name()+"</updated_by>" +
						"</activity>";
			if(is_online())
			{
				server_delete_row(data_xml,activity_xml);
			}
			else
			{
				local_delete_row(data_xml,activity_xml);
			}
			$(button).parent().parent().remove();
		});
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form Create bill(multiple registers)
 * @formNo 91
 * @param button
 */
function form91_delete_item(button)
{
	if(is_delete_access('form91'))
	{
		modal115_action(function()
		{
			var bill_id=document.getElementById("form91_master").elements['bill_id'].value;

			var form_id=$(button).attr('form');
			var form=document.getElementById(form_id);
			var data_id=form.elements[12].value;

			var data_xml="<bill_items>" +
						"<id>"+data_id+"</id>" +
						"<bill_id>"+bill_id+"</bill_id>" +
						"</bill_items>";
			delete_simple(data_xml);

			$(button).parent().parent().remove();
			form91_get_totals();
		});
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
function form93_delete_item(button)
{
	if(is_delete_access('form93'))
	{
		modal115_action(function()
		{
			var form_id=$(button).attr('form');
			var form=document.getElementById(form_id);

			var account=form.elements[0].value;
			var type=form.elements[1].value;
			var amount=form.elements[2].value;
			var data_id=form.elements[5].value;
			var adjective="to";
			if(type=='taken')
			{
				adjective="from";
			}
			var loan_xml="<loans>" +
						"<id>"+data_id+"</id>" +
						"</loans>";
			var activity_xml="<activity>" +
						"<data_id>"+data_id+"</data_id>" +
						"<tablename>loans</tablename>" +
						"<link_to>form93</link_to>" +
						"<title>Deleted</title>" +
						"<notes>Loan of amount Rs. "+amount+" "+type+" "+adjective+" "+account+"</notes>" +
						"<updated_by>"+get_name()+"</updated_by>" +
						"</activity>";
			delete_row(loan_xml,activity_xml);
			$(button).parent().parent().remove();

			var payment_type="paid";
			if(type=='taken')
			{
				payment_type='received';
			}
			var payment_data="<payments>" +
					"<id></id>" +
					"<acc_name exact='yes'>"+account+"</acc_name>" +
					"<type>"+payment_type+"</type>" +
					"<bill_id exact='yes'>"+data_id+"</bill_id>" +
					"<total_amount>"+amount+"</total_amount>" +
					"</payments>";
			fetch_requested_data('',payment_data,function(payments)
			{
				for(var i in payments)
				{
					var transaction2_xml="<transactions>" +
								"<id>"+payments[i].id+"</id>" +
								"<amount>"+amount+"</amount>" +
								"</transactions>";
					var payment_xml="<payments>" +
								"<id>"+payments[i].id+"</id>" +
								"<total_amount>"+amount+"</total_amount>" +
								"</payments>";
					delete_simple(payment_xml);
					delete_simple(transaction2_xml);

					break;
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
 * @form Manage Projects
 * @param button
 */
function form101_delete_item(button)
{
	if(is_delete_access('form101'))
	{
		modal115_action(function()
		{
			var form_id=$(button).attr('form');
			var form=document.getElementById(form_id);

			var name=form.elements[0].value;
			var data_id=form.elements[4].value;
			var last_updated=get_my_time();
			var data_xml="<projects>" +
						"<id>"+data_id+"</id>" +
						"<name>"+name+"</name>" +
						"</projects>";
			var activity_xml="<activity>" +
						"<data_id>"+data_id+"</data_id>" +
						"<tablename>projects</tablename>" +
						"<link_to>form101</link_to>" +
						"<title>Deleted</title>" +
						"<notes>Project "+name+"</notes>" +
						"<updated_by>"+get_name()+"</updated_by>" +
						"</activity>";
			var other_delete="<project_team>" +
					"<project_id>"+data_id+"</project_id>" +
					"</project_team>";
			var other_delete2="<project_phases>" +
					"<project_id>"+data_id+"</project_id>" +
					"</project_phases>";
			var other_delete3="<task_instances>" +
					"<source_id>"+data_id+"</source_id>" +
					"<source>projects</source>" +
					"</task_instances>";
			var access_xml="<data_access>" +
					"<tablename>projects</tablename>" +
					"<record_id>"+data_id+"</record_id>" +
					"</data_access>";
			delete_row(data_xml,activity_xml);
			delete_simple(other_delete);
			delete_simple(other_delete2);
			delete_simple(other_delete3);
			delete_simple(access_xml);
			$(button).parent().parent().remove();
		});
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form Project Team
 * @param button
 */
function form102_delete_item(button)
{
	if(is_delete_access('form102'))
	{
		modal115_action(function()
		{
			var form_id=$(button).attr('form');
			var form=document.getElementById(form_id);

			var name=form.elements[0].value;
			var data_id=form.elements[4].value;
			var last_updated=get_my_time();
			var data_xml="<project_team>" +
						"<id>"+data_id+"</id>" +
						"</project_team>";
			var access_xml="<data_access>" +
					"<tablename>project_team</tablename>" +
					"<record_id>"+data_id+"</record_id>" +
					"</data_access>";
			delete_simple(data_xml);
			delete_simple(access_xml);
			$(button).parent().parent().remove();
		});
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form Project Phases
 * @param button
 */
function form103_delete_item(button)
{
	if(is_delete_access('form103'))
	{
		modal115_action(function()
		{
			var form_id=$(button).attr('form');
			var form=document.getElementById(form_id);

			var name=form.elements[0].value;
			var data_id=form.elements[5].value;
			var last_updated=get_my_time();
			var data_xml="<project_phases>" +
						"<id>"+data_id+"</id>" +
						"</project_phases>";
			var access_xml="<data_access>" +
					"<tablename>project_phases</tablename>" +
					"<record_id>"+data_id+"</record_id>" +
					"</data_access>";
			delete_simple(data_xml);
			delete_simple(access_xml);
			$(button).parent().parent().remove();
		});
	}
	else
	{
		$("#modal2_link").click();
	}
}



/**
 * @form Manage Sale Orders (multi-register)
 * @param button
 */
function form108_delete_item(button)
{
	if(is_delete_access('form108'))
	{
		modal115_action(function()
		{
			var form_id=$(button).attr('form');
			var form=document.getElementById(form_id);

			var data_id=form.elements['id'].value;
			var customer_name=form.elements[2].value;
			var last_updated=get_my_time();
			var data_xml="<sale_orders>" +
						"<id>"+data_id+"</id>" +
						"</sale_orders>";
			var activity_xml="<activity>" +
						"<data_id>"+data_id+"</data_id>" +
						"<tablename>sale_orders</tablename>" +
						"<link_to>form108</link_to>" +
						"<title>Deleted</title>" +
						"<notes>Sale Order # "+data_id+" for customer "+customer_name+"</notes>" +
						"<updated_by>"+get_name()+"</updated_by>" +
						"</activity>";
			var other_delete="<sale_order_items>" +
					"<order_id>"+data_id+"</order_id>" +
					"</sale_order_items>";
			delete_row(data_xml,activity_xml);
			delete_simple(other_delete);

			$(button).parent().parent().remove();
		});
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
function form109_delete_item(button)
{
	if(is_delete_access('form109'))
	{
		modal115_action(function()
		{
			var form_id=$(button).attr('form');
			var form=document.getElementById(form_id);

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
						"</attributes>";
			var activity_xml="<activity>" +
						"<data_id>"+data_id+"</data_id>" +
						"<tablename>attributes</tablename>" +
						"<link_to>form109</link_to>" +
						"<title>Deleted</title>" +
						"<notes>Attribute "+attribute+" for asset "+asset+"</notes>" +
						"<updated_by>"+get_name()+"</updated_by>" +
						"</activity>";
			delete_row(data_xml,activity_xml);
			$(button).parent().parent().remove();
		});
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form Add unbilled sale items
 * @param button
 */
function form112_delete_item(button)
{
	if(is_delete_access('form112'))
	{
		modal115_action(function()
		{
			var form_id=$(button).attr('form');
			var form=document.getElementById(form_id);

			var data_id=form.elements[10].value;
			var data_xml="<unbilled_sale_items>" +
						"<id>"+data_id+"</id>" +
						"</unbilled_sale_items>";
			if(is_online())
			{
				server_delete_simple(data_xml);
			}
			else
			{
				local_delete_simple(data_xml);
			}
			$(button).parent().parent().remove();
		});
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form Manage unbilled sale items
 * @param button
 */
function form113_delete_item(button)
{
	if(is_delete_access('form113'))
	{
		modal115_action(function()
		{
			var form_id=$(button).attr('form');
			var form=document.getElementById(form_id);

			var data_id=form.elements[6].value;
			var data_xml="<unbilled_sale_items>" +
						"<id>"+data_id+"</id>" +
						"</unbilled_sale_items>";
			if(is_online())
			{
				server_delete_simple(data_xml);
			}
			else
			{
				local_delete_simple(data_xml);
			}
			$(button).parent().parent().remove();
		});
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form Add unbilled purchase items
 * @param button
 */
function form114_delete_item(button)
{
	if(is_delete_access('form114'))
	{
		modal115_action(function()
		{
			var form_id=$(button).attr('form');
			var form=document.getElementById(form_id);

			var data_id=form.elements[9].value;
			var data_xml="<unbilled_purchase_items>" +
						"<id>"+data_id+"</id>" +
						"</unbilled_purchase_items>";
			if(is_online())
			{
				server_delete_simple(data_xml);
			}
			else
			{
				local_delete_simple(data_xml);
			}
			$(button).parent().parent().remove();
		});
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form Manage unbilled purchase items
 * @param button
 */
function form115_delete_item(button)
{
	if(is_delete_access('form115'))
	{
		modal115_action(function()
		{
			var form_id=$(button).attr('form');
			var form=document.getElementById(form_id);

			var data_id=form.elements[6].value;
			var data_xml="<unbilled_purchase_items>" +
						"<id>"+data_id+"</id>" +
						"</unbilled_purchase_items>";
			if(is_online())
			{
				server_delete_simple(data_xml);
			}
			else
			{
				local_delete_simple(data_xml);
			}
			$(button).parent().parent().remove();
		});
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form Manage Loyalty programs
 * @param button
 */
function form116_delete_item(button)
{
	if(is_delete_access('form116'))
	{
		modal115_action(function()
		{
			var form_id=$(button).attr('form');
			var form=document.getElementById(form_id);
			var program_name=form.elements[0].value;
			var tier=form.elements[2].value;
			var data_id=form.elements[5].value;
			var data_xml="<loyalty_programs>" +
						"<id>"+data_id+"</id>" +
						"</loyalty_programs>";
			var delete2_xml="<loyalty_customers>" +
					"<program_name>"+program_name+"</program_name>" +
					"<tier>"+tier+"</tier>" +
					"</loyalty_customers>";

			if(is_online())
			{
				server_delete_simple(data_xml);
				server_delete_simple(delete2_xml);
			}
			else
			{
				local_delete_simple(data_xml);
				local_delete_simple(delete2_xml);
			}
			$(button).parent().parent().remove();
		});
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form Create bill(loyalty)
 * @formNo 118
 * @param button
 */
function form118_delete_item(button)
{
	if(is_delete_access('form118'))
	{
		modal115_action(function()
		{
			var bill_id=document.getElementById("form118_master").elements[4].value;
			var form_id=$(button).attr('form');
			var form=document.getElementById(form_id);
			var data_id=form.elements[9].value;
			var data_xml="<bill_items>" +
						"<id>"+data_id+"</id>" +
						"<bill_id>"+bill_id+"</bill_id>" +
						"</bill_items>";
			if(is_online())
			{
				server_delete_simple(data_xml);
			}
			else
			{
				local_delete_simple(data_xml);
			}
			$(button).parent().parent().remove();
		});
	}
	else
	{
		$("#modal2_link").click();
	}
}


/**
 * @form Create bill(multiple registers, unbilled items)
 * @formNo 119
 * @param button
 */
function form119_delete_item(button)
{
	if(is_delete_access('form119'))
	{
		modal115_action(function()
		{
			var bill_id=document.getElementById("form119_master").elements[6].value;
			var form_id=$(button).attr('form');
			var form=document.getElementById(form_id);
			var data_id=form.elements[11].value;

			var data_xml="<bill_items>" +
						"<id>"+data_id+"</id>" +
						"<bill_id>"+bill_id+"</bill_id>" +
						"</bill_items>";
			if(is_online())
			{
				server_delete_simple(data_xml);
			}
			else
			{
				local_delete_simple(data_xml);
			}

			$(button).parent().parent().remove();
		});
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * formNo 121
 * form Adjust Loyalty Points
 * @param button
 */
function form121_delete_item(button)
{
	if(is_delete_access('form121'))
	{
		modal115_action(function()
		{
			var form_id=$(button).attr('form');
			var form=document.getElementById(form_id);

			var program=form.elements[0].value;
			var customer=form.elements[1].value;
			var points=form.elements[2].value;
			var date=form.elements[3].value;
			var source=form.elements[4].value;
			var data_id=form.elements[5].value;
			var data_xml="<loyalty_points>" +
					"<id>"+data_id+"</id>" +
					"</loyalty_points>";
			var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>loyalty_points</tablename>" +
					"<link_to>form121</link_to>" +
					"<title>Deleted</title>" +
					"<notes>"+points+" Loyalty points from "+customer+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";
			if(is_online())
			{
				server_delete_row(data_xml,activity_xml);
			}
			else
			{
				local_delete_row(data_xml,activity_xml);
			}
			$(button).parent().parent().remove();
		});
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
function form122_delete_item(button)
{
	if(is_delete_access('form122'))
	{
		modal115_action(function()
		{
			var form_id=$(button).attr('form');
			var form=document.getElementById(form_id);

			var data_id=form.elements[15].value;
			var data_xml="<supplier_bill_items>" +
						"<id>"+data_id+"</id>" +
						"</supplier_bill_items>";
			var return_xml="<supplier_return_items>" +
						"<id>"+data_id+"</id>" +
						"</supplier_return_items>";
			delete_simple(data_xml);
			delete_simple(return_xml);

			$(button).parent().parent().remove();
		});
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
function form125_delete_item(button)
{
	if(is_delete_access('form125'))
	{
		modal115_action(function()
		{
			var form_id=$(button).attr('form');
			var form=document.getElementById(form_id);

			var customer=form.elements[0].value;
			var username=form.elements[1].value;
			var data_id=form.elements[4].value;
			var data_xml="<accounts>" +
						"<id>"+data_id+"</id>" +
						"</accounts>";
			var activity_xml="<activity>" +
						"<data_id>"+data_id+"</data_id>" +
						"<tablename>accounts</tablename>" +
						"<link_to>form125</link_to>" +
						"<title>Deleted</title>" +
						"<notes>Account for "+username+"</notes>" +
						"<updated_by>"+get_name()+"</updated_by>" +
						"</activity>";
			if(is_online())
			{
				server_delete_row(data_xml,activity_xml);
			}
			else
			{
				local_delete_row(data_xml,activity_xml);
			}
			$(button).parent().parent().remove();
		});
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form Issues List
 * @param button
 */
function form126_delete_item(button)
{
	if(is_delete_access('form126'))
	{
		modal115_action(function()
		{
			var form_id=$(button).attr('form');
			var form=document.getElementById(form_id);
			var data_id=form.elements[0].value;
			var data_xml="<issues>" +
						"<id>"+data_id+"</id>" +
						"</issues>";
			var activity_xml="<activity>" +
						"<data_id>"+data_id+"</data_id>" +
						"<tablename>issues</tablename>" +
						"<link_to>form126</link_to>" +
						"<title>Deleted</title>" +
						"<notes>Deleted issue number "+data_id+"</notes>" +
						"<updated_by>"+get_name()+"</updated_by>" +
						"</activity>";
			var other_delete="<solutions>" +
						"<issue_id>"+data_id+"</issue_id>" +
						"</solutions>";

			if(is_online())
			{
				server_delete_row(data_xml,activity_xml);
				server_delete_simple(other_delete);
			}
			else
			{
				local_delete_row(data_xml,activity_xml);
				local_delete_simple(other_delete);
			}
			$(button).parent().parent().remove();
		});
	}
	else
	{
		$("#modal2_link").click();
	}
}


/**
 * @form Manage Service Requests
 * @param button
 */
function form128_delete_item(button)
{
	if(is_delete_access('form128'))
	{
		modal115_action(function()
		{
			var form_id=$(button).attr('form');
			var form=document.getElementById(form_id);
			var data_id=form.elements[0].value;
			var data_xml="<service_requests>" +
						"<id>"+data_id+"</id>" +
						"</service_requests>";
			var activity_xml="<activity>" +
						"<data_id>"+data_id+"</data_id>" +
						"<tablename>service_requests</tablename>" +
						"<link_to>form128</link_to>" +
						"<title>Deleted</title>" +
						"<notes>Deleted SR# "+data_id+"</notes>" +
						"<updated_by>"+get_name()+"</updated_by>" +
						"</activity>";
			var access_xml="<data_access>" +
					"<tablename>service_requests</tablename>" +
					"<record_id>"+data_id+"</record_id>" +
					"</data_access>";
			var machine_xml="<service_request_machines>" +
					"<request_id>"+data_id+"</request_id>" +
					"</service_request_machines>";
			var team_xml="<service_request_team>" +
					"<request_id>"+data_id+"</request_id>" +
					"</service_request_team>";
			var document_xml="<documents>" +
					"<target_id>"+data_id+"</target_id>" +
					"<doc_type>service request</doc_type>"+
					"</documents>";
			var task_xml="<task_instances>" +
					"<source_id>"+data_id+"</source_id>" +
					"<source>service request</source>"+
					"</task_instances>";
			var item_xml="<service_request_items>" +
					"<request_id>"+data_id+"</request_id>" +
					"</service_request_items>";
			var expense_xml="<expenses>" +
					"<source_id>"+data_id+"</source_id>" +
					"<source>service request</source>"+
					"</expenses>";

			if(is_online())
			{
				server_delete_row(data_xml,activity_xml);
				server_delete_simple(access_xml);
				server_delete_simple(machine_xml);
				server_delete_simple(team_xml);
				server_delete_simple(document_xml);
				server_delete_simple(task_xml);
				server_delete_simple(item_xml);
				server_delete_simple(expense_xml);
			}
			else
			{
				local_delete_row(data_xml,activity_xml);
				local_delete_simple(access_xml);
				local_delete_simple(machine_xml);
				local_delete_simple(team_xml);
				local_delete_simple(document_xml);
				local_delete_simple(task_xml);
				local_delete_simple(item_xml);
				local_delete_simple(expense_xml);
			}
			$(button).parent().parent().remove();
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
function form130_delete_item(button)
{
	if(is_delete_access('form130'))
	{
		modal115_action(function()
		{
			var bill_id=document.getElementById("form130_master").elements[3].value;

			var form_id=$(button).attr('form');
			var form=document.getElementById(form_id);
			var name=form.elements[0].value;
			var data_id=form.elements[9].value;

			if(isNaN(form.elements[2].value))
			{
				var data_xml="<bill_items>" +
						"<id>"+data_id+"</id>" +
						"<bill_id>"+bill_id+"</bill_id>" +
						"</bill_items>";
				var task_xml="<task_instances>" +
						"<source></source>" +
						"<source_id>"+data_id+"</source_id>" +
						"</task_instances>";
				if(is_online())
				{
					server_delete_simple(data_xml);
					server_delete_simple(task_xml);
				}
				else
				{
					local_delete_simple(data_xml);
					local_delete_simple(task_xml);
				}
			}
			else
			{
				var data_xml="<bill_items>" +
						"<id>"+data_id+"</id>" +
						"<bill_id>"+bill_id+"</bill_id>" +
						"</bill_items>";
				if(is_online())
				{
					server_delete_simple(data_xml);
				}
				else
				{
					local_delete_simple(data_xml);
				}

			}
			$(button).parent().parent().remove();
		});
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
function form131_delete_item(button)
{
	if(is_delete_access('form131'))
	{
		modal115_action(function()
		{
			var form_id=$(button).attr('form');
			var form=document.getElementById(form_id);

			var name=form.elements[0].value;
			var assignee=form.elements[1].value;
			var status=form.elements[3].value;
			var data_id=form.elements[4].value;
			var data_xml="<task_instances>" +
						"<id>"+data_id+"</id>" +
						"<name>"+name+"</name>" +
						"<assignee>"+assignee+"</assignee>" +
						"<status>"+status+"</status>" +
						"</task_instances>";
			var activity_xml="<activity>" +
						"<data_id>"+data_id+"</data_id>" +
						"<tablename>task_instances</tablename>" +
						"<link_to>form131</link_to>" +
						"<title>Deleted</title>" +
						"<notes>Task "+name+" assigned to "+assignee+"</notes>" +
						"<updated_by>"+get_name()+"</updated_by>" +
						"</activity>";
			if(is_online())
			{
				server_delete_row(data_xml,activity_xml);
			}
			else
			{
				local_delete_row(data_xml,activity_xml);
			}
			$(button).parent().parent().remove();
		});
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form Service documents
 * @param button
 */
function form133_delete_item(button)
{
	if(is_delete_access('form133'))
	{
		modal115_action(function()
		{
			var form_id=$(button).attr('form');
			var form=document.getElementById(form_id);

			var data_id=form.elements[4].value;
			var last_updated=get_my_time();
			var data_xml="<documents>" +
					"<id>"+data_id+"</id>"+
					"<doc_type>service request</doc_type>" +
					"</documents>";

			if(is_online())
			{
				server_delete_simple(data_xml);
			}
			else
			{
				local_delete_simple(data_xml);
			}
			$(button).parent().parent().remove();
		});
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * formNo 134
 * form Service Dashboard - machine
 * @param button
 */
function form134_delete_machine(button)
{
	if(is_delete_access('form134'))
	{
		modal115_action(function()
		{
			var master_fields=document.getElementById('form134_master');
			var request_id=master_fields.elements[1].value;

			var form_id=$(button).attr('form');
			var form=document.getElementById(form_id);
			var data_id=form.elements[5].value;
			var data_xml="<service_request_machines>" +
						"<id>"+data_id+"</id>" +
						"</service_request_machines>";
			var activity_xml="<activity>" +
						"<data_id>"+data_id+"</data_id>" +
						"<tablename>service_request_machines</tablename>" +
						"<link_to>form134</link_to>" +
						"<title>Removed</title>" +
						"<notes>Machine from SR# "+request_id+"</notes>" +
						"<updated_by>"+get_name()+"</updated_by>" +
						"</activity>";
			if(is_online())
			{
				server_delete_row(data_xml,activity_xml);
			}
			else
			{
				local_delete_row(data_xml,activity_xml);
			}
			$(button).parent().parent().remove();
		});
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * formNo 134
 * form Service Dashboard - team
 * @param button
 */
function form134_delete_team(button)
{
	if(is_delete_access('form134'))
	{
		modal115_action(function()
		{
			var master_fields=document.getElementById('form134_master');
			var request_id=master_fields.elements[1].value;

			var form_id=$(button).attr('form');
			var form=document.getElementById(form_id);
			var assignee=form.elements[0].value;
			var data_id=form.elements[3].value;
			var data_xml="<service_request_team>" +
						"<id>"+data_id+"</id>" +
						"<request_id>"+request_id+"</request_id>"+
						"</service_request_team>";
			var activity_xml="<activity>" +
						"<data_id>"+data_id+"</data_id>" +
						"<tablename>service_request_team</tablename>" +
						"<link_to>form134</link_to>" +
						"<title>Removed</title>" +
						"<notes>Assignee from SR# "+request_id+"</notes>" +
						"<updated_by>"+get_name()+"</updated_by>" +
						"</activity>";
			var access_xml="<data_access>" +
						"<record_id>"+request_id+"</record_id>" +
						"<tablename>service_requests</tablename>" +
						"<user>"+assignee+"</user>" +
						"</data_access>";

			if(is_online())
			{
				server_delete_row(data_xml,activity_xml);
				server_delete_simple(access_xml);
			}
			else
			{
				local_delete_row(data_xml,activity_xml);
				local_delete_simple(access_xml);
			}
			$(button).parent().parent().remove();
		});
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * formNo 134
 * form Service Dashboard - document
 * @param button
 */
function form134_delete_document(button)
{
	if(is_delete_access('form134'))
	{
		modal115_action(function()
		{
			var master_fields=document.getElementById('form134_master');
			var request_id=master_fields.elements[1].value;

			var form_id=$(button).attr('form');
			var form=document.getElementById(form_id);
			var data_id=form.elements[2].value;
			var data_xml="<documents>" +
						"<id>"+data_id+"</id>" +
						"<target_id>"+request_id+"</target_id>"+
						"</documents>";
			var activity_xml="<activity>" +
						"<data_id>"+data_id+"</data_id>" +
						"<tablename>documents</tablename>" +
						"<link_to>form134</link_to>" +
						"<title>Deleted</title>" +
						"<notes>Document for SR# "+request_id+"</notes>" +
						"<updated_by>"+get_name()+"</updated_by>" +
						"</activity>";
			if(is_online())
			{
				server_delete_row(data_xml,activity_xml);
			}
			else
			{
				local_delete_row(data_xml,activity_xml);
			}
			$(button).parent().parent().remove();
		});
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * formNo 134
 * form Service Dashboard - Task
 * @param button
 */
function form134_delete_task(button)
{
	if(is_delete_access('form134'))
	{
		modal115_action(function()
		{
			var master_fields=document.getElementById('form134_master');
			var request_id=master_fields.elements[1].value;

			var form_id=$(button).attr('form');
			var form=document.getElementById(form_id);
			var data_id=form.elements[4].value;
			var data_xml="<task_instances>" +
						"<id>"+data_id+"</id>" +
						"</task_instances>";
			var activity_xml="<activity>" +
						"<data_id>"+data_id+"</data_id>" +
						"<tablename>task_instances</tablename>" +
						"<link_to>form134</link_to>" +
						"<title>Deleted</title>" +
						"<notes>Task for SR# "+request_id+"</notes>" +
						"<updated_by>"+get_name()+"</updated_by>" +
						"</activity>";
			if(is_online())
			{
				server_delete_row(data_xml,activity_xml);
			}
			else
			{
				local_delete_row(data_xml,activity_xml);
			}
			$(button).parent().parent().remove();
		});
	}
	else
	{
		$("#modal2_link").click();
	}
}


/**
 * @form Customer Profiling
 * @param button
 */
function form139_delete_item(button)
{
	if(is_delete_access('form139'))
	{
		modal115_action(function()
		{
			var form_id=$(button).attr('form');
			var form=document.getElementById(form_id);
			var data_id=form.elements[5].value;

			var data_xml="<assets>" +
						"<id>"+data_id+"</id>" +
						"</assets>";
			if(is_online())
			{
				server_delete_simple(data_xml);
			}
			else
			{
				local_delete_simple(data_xml);
			}

			$(button).parent().parent().remove();
		});
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form Supplier Profiling
 * @param button
 */
function form140_delete_item(button)
{
	if(is_delete_access('form140'))
	{
		modal115_action(function()
		{
			var form_id=$(button).attr('form');
			var form=document.getElementById(form_id);
			var data_id=form.elements[5].value;

			var data_xml="<assets>" +
						"<id>"+data_id+"</id>" +
						"</assets>";
			if(is_online())
			{
				server_delete_simple(data_xml);
			}
			else
			{
				local_delete_simple(data_xml);
			}

			$(button).parent().parent().remove();
		});
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
function form146_delete_item(button)
{
	if(is_delete_access('form146'))
	{
		modal115_action(function()
		{
			var form_id=$(button).attr('form');
			var form=document.getElementById(form_id);

			var product=form.elements[0].value;
			var data_id=form.elements[5].value;
			var data_xml="<manufacturing_schedule>" +
						"<id>"+data_id+"</id>" +
						"</manufacturing_schedule>";
			var activity_xml="<activity>" +
						"<data_id>"+data_id+"</data_id>" +
						"<tablename>manufacturing_schedule</tablename>" +
						"<link_to>form146</link_to>" +
						"<title>Deleted</title>" +
						"<notes>Manufacturing schedule for product "+product+"</notes>" +
						"<updated_by>"+get_name()+"</updated_by>" +
						"</activity>";
			if(is_online())
			{
				server_delete_row(data_xml,activity_xml);
			}
			else
			{
				local_delete_row(data_xml,activity_xml);
			}
			$(button).parent().parent().remove();
		});
	}
	else
	{
		$("#modal2_link").click();
	}
}



/**
 * formNo 151
 * form Service Request billing - Item
 * @param button
 */
function form151_delete_item(button)
{
	if(is_delete_access('form151'))
	{
		modal115_action(function()
		{
			var master_fields=document.getElementById('form151_master');
			var request_id=master_fields.elements[1].value;

			var form_id=$(button).attr('form');
			var form=document.getElementById(form_id);
			var data_id=form.elements[5].value;
			var data_xml="<service_request_items>" +
						"<id>"+data_id+"</id>" +
						"</service_request_items>";
			var activity_xml="<activity>" +
						"<data_id>"+data_id+"</data_id>" +
						"<tablename>service_request_items</tablename>" +
						"<link_to>form151</link_to>" +
						"<title>Deleted</title>" +
						"<notes>Service item for SR# "+request_id+"</notes>" +
						"<updated_by>"+get_name()+"</updated_by>" +
						"</activity>";
			if(is_online())
			{
				server_delete_row(data_xml,activity_xml);
			}
			else
			{
				local_delete_row(data_xml,activity_xml);
			}
			$(button).parent().parent().remove();
		});
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * formNo 151
 * form Service Dashboard - Expense
 * @param button
 */
function form151_delete_expense(button)
{
	if(is_delete_access('form151'))
	{
		modal115_action(function()
		{
			var master_fields=document.getElementById('form151_master');
			var request_id=master_fields.elements[1].value;

			var form_id=$(button).attr('form');
			var form=document.getElementById(form_id);
			var data_id=form.elements[4].value;
			var data_xml="<expenses>" +
						"<id>"+data_id+"</id>" +
						"</expenses>";
			var activity_xml="<activity>" +
						"<data_id>"+data_id+"</data_id>" +
						"<tablename>expenses</tablename>" +
						"<link_to>form151</link_to>" +
						"<title>Deleted</title>" +
						"<notes>Expense for SR# "+request_id+"</notes>" +
						"<updated_by>"+get_name()+"</updated_by>" +
						"</activity>";
			delete_row(data_xml,activity_xml);

			$(button).parent().parent().remove();
		});
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
function form152_delete_item(button)
{
	if(is_delete_access('form152'))
	{
		modal115_action(function()
		{
			var form_id=$(button).attr('form');
			var form=document.getElementById(form_id);

			var quot_num=form.elements[0].value;
			var data_id=form.elements[5].value;
			var customer=form.elements[2].value;
			var bill_xml="<quotation>" +
						"<id>"+data_id+"</id>" +
						"</quotation>";
			var activity_xml="<activity>" +
						"<data_id>"+data_id+"</data_id>" +
						"<tablename>quotation</tablename>" +
						"<link_to>form152</link_to>" +
						"<title>Deleted</title>" +
						"<notes>Quotation # "+quot_num+" for customer "+customer+"</notes>" +
						"<updated_by>"+get_name()+"</updated_by>" +
						"</activity>";

			delete_row(bill_xml,activity_xml);
			$(button).parent().parent().remove();


			var items_data="<quotation_items>" +
					"<id></id>" +
					"<quotation_id exact='yes'>"+data_id+"</quotation_id>" +
					"</quotation_items>";

			delete_simple(items_data);

		});
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
function form153_delete_item(button)
{
	if(is_delete_access('form153'))
	{
		modal115_action(function()
		{
			var quot_id=document.getElementById("form153_master").elements[5].value;

			var form_id=$(button).attr('form');
			var form=document.getElementById(form_id);
			var data_id=form.elements[6].value;

			var data_xml="<quotation_items>" +
						"<id>"+data_id+"</id>" +
						"<quotation_id>"+quot_id+"</quotation_id>" +
						"</quotation_items>";
			if(is_online())
			{
				server_delete_simple(data_xml);
			}
			else
			{
				local_delete_simple(data_xml);
			}

			$(button).parent().parent().remove();
		});
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form Create Bills (DLM)
 * @formNo 154
 * @param button
 */
function form154_delete_item(button)
{
	if(is_delete_access('form154'))
	{
		modal115_action(function()
		{
			var bill_id=document.getElementById("form154_master").elements['bill_id'].value;

			var form_id=$(button).attr('form');
			var form=document.getElementById(form_id);
			var data_id=form.elements[4].value;

			var data_xml="<bill_items>" +
						"<id>"+data_id+"</id>" +
						"<bill_id>"+bill_id+"</bill_id>" +
						"</bill_items>";
			delete_simple(data_xml);

			$(button).parent().parent().remove();
			form154_update_serial_numbers();
		});
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form Create Bills (DLM)
 * @formNo 154
 * @param button
 */
function form154_delete_service_item(button)
{
	if(is_delete_access('form154'))
	{
		modal115_action(function()
		{
			var bill_id=document.getElementById("form154_master").elements['bill_id'].value;

			var form_id=$(button).attr('form');
			var form=document.getElementById(form_id);
			var data_id=form.elements[4].value;

			var data_xml="<bill_items>" +
						"<id>"+data_id+"</id>" +
						"<bill_id>"+bill_id+"</bill_id>" +
						"</bill_items>";
			if(is_online())
			{
				server_delete_simple(data_xml);
			}
			else
			{
				local_delete_simple(data_xml);
			}

			$(button).parent().parent().remove();
			form154_update_serial_numbers();
		});
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form Create Bills (DLM)
 * @formNo 154
 * @param button
 */
function form154_delete_hiring_item(button)
{
	if(is_delete_access('form154'))
	{
		modal115_action(function()
		{
			var bill_id=document.getElementById("form154_master").elements['bill_id'].value;

			var form_id=$(button).attr('form');
			var form=document.getElementById(form_id);
			var data_id=form.elements[8].value;

			var data_xml="<bill_items>" +
						"<id>"+data_id+"</id>" +
						"<bill_id>"+bill_id+"</bill_id>" +
						"</bill_items>";
			if(is_online())
			{
				server_delete_simple(data_xml);
			}
			else
			{
				local_delete_simple(data_xml);
			}

			$(button).parent().parent().remove();
		});
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
function form156_delete_item(button)
{
	if(is_delete_access('form156'))
	{
		modal115_action(function()
		{
			var form_id=$(button).attr('form');
			var form=document.getElementById(form_id);

			var product_name=form.elements[0].value;
			var name=form.elements[1].value;
			var data_id=form.elements[3].value;
			var last_updated=get_my_time();
			var data_xml="<area_utilization>" +
						"<id>"+data_id+"</id>" +
						"<item_name>"+product_name+"</item_name>" +
						"<name>"+name+"</name>" +
						"</area_utilization>";
			var activity_xml="<activity>" +
						"<data_id>"+data_id+"</data_id>" +
						"<tablename>area_utilization</tablename>" +
						"<link_to>form156</link_to>" +
						"<title>Removed</title>" +
						"<notes>Item "+product_name+" from storage area "+name+"</notes>" +
						"<updated_by>"+get_name()+"</updated_by>" +
						"</activity>";
			delete_row(data_xml,activity_xml);
			$(button).parent().parent().remove();
		});
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form Store movement (DLM)
 * @formNo form157
 */
function form157_delete_item(button)
{
	if(is_delete_access('form157'))
	{
		modal115_action(function()
		{
			var form_id=$(button).attr('form');
			var form=document.getElementById(form_id);

			var data_id=form.elements[5].value;

			var data_xml="<store_movement>" +
					"<id>"+data_id+"</id>" +
					"</store_movement>";
			delete_simple(data_xml);
			$(button).parent().parent().remove();
		});
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form Enter Purchase Bill (DLM)
 * @formNo form158
 */
function form158_delete_item(button)
{
	if(is_delete_access('form158'))
	{
		modal115_action(function()
		{
			var master_form=document.getElementById("form158_master");
			var bill_id=master_form.elements['bill_id'].value;
			var imported=master_form.elements['imported'].checked;

			var form_id=$(button).attr('form');
			var form=document.getElementById(form_id);

			var data_id=form.elements[5].value;

			var data_xml="<supplier_bill_items>" +
						"<id>"+data_id+"</id>" +
						"<bill_id>"+bill_id+"</bill_id>" +
						"</supplier_bill_items>";
			delete_simple(data_xml);

			$(button).parent().parent().remove();
		});
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form Checklist items
 * @formNo form161
 */
function form161_delete_item(button)
{
	if(is_delete_access('form161'))
	{
		modal115_action(function()
		{
			var form_id=$(button).attr('form');
			var form=document.getElementById(form_id);

			var cp=form.elements[0].value;
			var data_id=form.elements[3].value;

			var data_xml="<checklist_items>" +
						"<id>"+data_id+"</id>" +
						"</checklist_items>";
			var activity_xml="<activity>" +
						"<data_id>"+data_id+"</data_id>" +
						"<tablename>checklist_items</tablename>" +
						"<link_to>form161</link_to>" +
						"<title>Deleted</title>" +
						"<notes>Checkpoint "+cp+" for products</notes>" +
						"<updated_by>"+get_name()+"</updated_by>" +
						"</activity>";
			var mapping_xml="<checklist_mapping>"+
							"<checkpoint exact='yes'>"+cp+"</checkpoint>"+
							"</checklist_mapping>";
			if(is_online())
			{
				server_delete_row(data_xml,activity_xml);
			}
			else
			{
				local_delete_row(data_xml,activity_xml);
			}

			$(button).parent().parent().remove();
		});
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form Checklist mapping
 * @formNo form162
 */
function form162_delete_item(button)
{
	if(is_delete_access('form162'))
	{
		modal115_action(function()
		{
			var form_id=$(button).attr('form');
			var form=document.getElementById(form_id);

			var item=form.elements[0].value;
			var cp=form.elements[1].value;
			var data_id=form.elements[3].value;

			var data_xml="<checklist_mapping>" +
						"<id>"+data_id+"</id>" +
						"</checklist_mapping>";
			var activity_xml="<activity>" +
						"<data_id>"+data_id+"</data_id>" +
						"<tablename>checklist_mapping</tablename>" +
						"<link_to>form162</link_to>" +
						"<title>Deleted</title>" +
						"<notes>Checkpoint "+cp+" for product "+item+"</notes>" +
						"<updated_by>"+get_name()+"</updated_by>" +
						"</activity>";
			if(is_online())
			{
				server_delete_row(data_xml,activity_xml);
			}
			else
			{
				local_delete_row(data_xml,activity_xml);
			}

			$(button).parent().parent().remove();
		});
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form Storage Structure
 * @formNo form167
 */
function form167_delete_item(button)
{
	if(is_delete_access('form167'))
	{
		modal115_action(function()
		{
			var form_id=$(button).attr('form');
			var form=document.getElementById(form_id);

			var name=form.elements[0].value;
			var data_id=form.elements[6].value;

			var data_xml="<storage_structure>" +
						"<id>"+data_id+"</id>" +
						"</storage_structure>";
			var activity_xml="<activity>" +
						"<data_id>"+data_id+"</data_id>" +
						"<tablename>storage_structure</tablename>" +
						"<link_to>form167</link_to>" +
						"<title>Removed</title>" +
						"<notes>Storage type of "+name+" from structure</notes>" +
						"<updated_by>"+get_name()+"</updated_by>" +
						"</activity>";
			if(is_online())
			{
				server_delete_row(data_xml,activity_xml);
			}
			else
			{
				local_delete_row(data_xml,activity_xml);
			}

			$(button).parent().parent().remove();
		});
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
function form169_delete_item(button)
{
	if(is_delete_access('form169'))
	{
		modal115_action(function()
		{
			var form_id=$(button).attr('form');
			var form=document.getElementById(form_id);

			var name=form.elements[0].value;
			var description=form.elements[1].value;
			var make=form.elements[2].value;
			var data_id=form.elements[7].value;
			var last_updated=get_my_time();
			var data_xml="<product_master>" +
						"<id>"+data_id+"</id>" +
						"</product_master>";
			var activity_xml="<activity>" +
						"<data_id>"+data_id+"</data_id>" +
						"<tablename>product_master</tablename>" +
						"<link_to>form169</link_to>" +
						"<title>Deleted</title>" +
						"<notes>Product "+name+"</notes>" +
						"<updated_by>"+get_name()+"</updated_by>" +
						"</activity>";
			var other_delete="<product_instances>" +
					"<product_name>"+name+"</product_name>" +
					"</product_instances>";
			var other_delete2="<documents>" +
					"<doc_type>product_master</doc_type>" +
					"<target_id>"+data_id+"</target_id>" +
					"</documents>";
			var other_delete3="<pre_requisites>" +
					"<name>"+name+"</name>" +
					"<type>product</type>" +
					"</pre_requisites>";
			var other_delete4="<attributes>" +
					"<name exact='yes'>"+name+"</name>" +
					"<type>product</type>" +
					"</attributes>";
			var other_delete5="<cross_sells>" +
					"<name>"+name+"</name>" +
					"<type>product</type>" +
					"</cross_sells>";
			var other_delete6="<reviews>" +
					"<name>"+name+"</name>" +
					"<type>product</type>" +
					"</reviews>";

			delete_row(data_xml,activity_xml);
			delete_simple(other_delete);
			delete_simple(other_delete2);
			delete_simple(other_delete3);
			delete_simple(other_delete4);
			delete_simple(other_delete5);
			delete_simple(other_delete6);
			$(button).parent().parent().remove();
		});
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
function form170_delete_item(button)
{
	if(is_delete_access('form170'))
	{
		modal115_action(function()
		{
			var form_id=$(button).attr('form');
			var form=document.getElementById(form_id);

			var name=form.elements[0].value;
			var data_id=form.elements[7].value;
			var last_updated=get_my_time();
			var data_xml="<store_areas>" +
						"<id>"+data_id+"</id>" +
						"<name>"+name+"</name>" +
						"</store_areas>";
			var activity_xml="<activity>" +
						"<data_id>"+data_id+"</data_id>" +
						"<tablename>store_areas</tablename>" +
						"<link_to>form170</link_to>" +
						"<title>Deleted</title>" +
						"<notes>Storage area "+name+"</notes>" +
						"<updated_by>"+get_name()+"</updated_by>" +
						"</activity>";
			if(is_online())
			{
				server_delete_row(data_xml,activity_xml);
			}
			else
			{
				local_delete_row(data_xml,activity_xml);
			}
			$(button).parent().parent().remove();
		});
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
function form171_delete_item(button)
{
	if(is_delete_access('form171'))
	{
		modal115_action(function()
		{
			var form_id=$(button).attr('form');
			var form=document.getElementById(form_id);

			var name=form.elements[0].value;
			var data_id=form.elements[3].value;
			var data_xml="<sale_channels>" +
						"<id>"+data_id+"</id>" +
						"<name>"+name+"</name>" +
						"</sale_channels>";
			var activity_xml="<activity>" +
						"<data_id>"+data_id+"</data_id>" +
						"<tablename>sale_channels</tablename>" +
						"<link_to>form171</link_to>" +
						"<title>Deleted</title>" +
						"<notes>Sale channel "+name+"</notes>" +
						"<updated_by>"+get_name()+"</updated_by>" +
						"</activity>";
			var sku_xml="<sku_mapping>" +
						"<channel exact='yes'>"+name+"</channel>" +
						"</sku_mapping>";
			var channel_prices_xml="<channel_prices>" +
						"<channel exact='yes'>"+name+"</channel>" +
						"</channel_prices>";
			var pickup_xml="<pickup_charges>" +
						"<channel exact='yes'>"+name+"</channel>" +
						"</pickup_charges>";
			var category_xml="<channel_category>" +
						"<channel exact='yes'>"+name+"</channel>" +
						"</channel_category>";
			var cat_sku_xml="<category_sku_mapping>" +
						"<channel exact='yes'>"+name+"</channel>" +
						"</category_sku_mapping>";
			var time_xml="<user_preferences>" +
						"<id>"+data_id+"</id>" +
						"<name unique='yes'>"+name+"_order_time_limit</name>" +
						"<type>accounting</type>"+
						"</user_preferences>";

			delete_row(data_xml,activity_xml);
			delete_simple(pickup_xml);
			delete_simple(sku_xml);
			delete_simple(channel_prices_xml);
			delete_simple(category_xml);
			delete_simple(cat_sku_xml);
			delete_simple(time_xml);
			$(button).parent().parent().remove();
		});
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form Channel Pricing
 * @formNo 172
 * @param button
 */
function form172_delete_item(button)
{
	if(is_delete_access('form172'))
	{
		modal115_action(function()
		{
			var form_id=$(button).attr('form');
			var form=document.getElementById(form_id);

			var channel=form.elements[0].value;
			var name=form.elements[1].value;
			var data_id=form.elements[17].value;
			var data_xml="<channel_prices>" +
						"<id>"+data_id+"</id>" +
						"</channel_prices>";
			var activity_xml="<activity>" +
						"<data_id>"+data_id+"</data_id>" +
						"<tablename>channel_prices</tablename>" +
						"<link_to>form172</link_to>" +
						"<title>Deleted</title>" +
						"<notes>Channel pricing for "+name+" for "+channel+"</notes>" +
						"<updated_by>"+get_name()+"</updated_by>" +
						"</activity>";
			delete_row(data_xml,activity_xml);
			$(button).parent().parent().remove();
		});
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form SKU mappings
 * @param button
 */
function form173_delete_item(button)
{
	if(is_delete_access('form173'))
	{
		modal115_action(function()
		{
			var form_id=$(button).attr('form');
			var form=document.getElementById(form_id);

			var channel=form.elements[0].value;
			var system_sku=form.elements[3].value;
			var data_id=form.elements[5].value;
			var last_updated=get_my_time();
			var data_xml="<sku_mapping>" +
						"<id>"+data_id+"</id>" +
						"</sku_mapping>";
			var activity_xml="<activity>" +
						"<data_id>"+data_id+"</data_id>" +
						"<tablename>sku_mapping</tablename>" +
						"<link_to>form173</link_to>" +
						"<title>Deleted</title>" +
						"<notes>Mapping of "+system_sku+" for channel "+channel+"</notes>" +
						"<updated_by>"+get_name()+"</updated_by>" +
						"</activity>";

			delete_row(data_xml,activity_xml);
			$(button).parent().parent().remove();
		});
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form Pickup Charges
 * @param button
 */
function form174_delete_item(button)
{
	if(is_delete_access('form174'))
	{
		modal115_action(function()
		{
			var form_id=$(button).attr('form');
			var form=document.getElementById(form_id);

			var channel=form.elements[0].value;
			var pincode=form.elements[1].value;
			var data_id=form.elements[5].value;
			var last_updated=get_my_time();
			var data_xml="<pickup_charges>" +
						"<id>"+data_id+"</id>" +
						"</pickup_charges>";
			var activity_xml="<activity>" +
						"<data_id>"+data_id+"</data_id>" +
						"<tablename>pickup_charges</tablename>" +
						"<link_to>form174</link_to>" +
						"<title>Deleted</title>" +
						"<notes>Pickup charges record for pincode "+pincode+" for channel "+channel+"</notes>" +
						"<updated_by>"+get_name()+"</updated_by>" +
						"</activity>";
			if(is_online())
			{
				server_delete_row(data_xml,activity_xml);
			}
			else
			{
				local_delete_row(data_xml,activity_xml);
			}
			$(button).parent().parent().remove();
		});
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form Channel Category
 * @param button
 */
function form175_delete_item(button)
{
	if(is_delete_access('form175'))
	{
		modal115_action(function()
		{
			var form_id=$(button).attr('form');
			var form=document.getElementById(form_id);

			var channel=form.elements[0].value;
			var name=form.elements[2].value;
			var data_id=form.elements[5].value;
			var last_updated=get_my_time();
			var data_xml="<channel_category>" +
						"<id>"+data_id+"</id>" +
						"</channel_category>";
			var activity_xml="<activity>" +
						"<data_id>"+data_id+"</data_id>" +
						"<tablename>channel_category</tablename>" +
						"<link_to>form175</link_to>" +
						"<title>Deleted</title>" +
						"<notes>Category "+name+" for channel "+channel+"</notes>" +
						"<updated_by>"+get_name()+"</updated_by>" +
						"</activity>";
			if(is_online())
			{
				server_delete_row(data_xml,activity_xml);
			}
			else
			{
				local_delete_row(data_xml,activity_xml);
			}
			$(button).parent().parent().remove();
		});
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form Prioritization Parameters
 * @param button
 */
function form177_delete_item(button)
{
	if(is_delete_access('form177'))
	{
		modal115_action(function()
		{
			var form_id=$(button).attr('form');
			var form=document.getElementById(form_id);

			var type=form.elements[0].value;
			var name=form.elements[1].value;
			var data_id=form.elements[4].value;
			var last_updated=get_my_time();
			var data_xml="<prioritization_parameters>" +
						"<id>"+data_id+"</id>" +
						"</prioritization_parameters>";
			var activity_xml="<activity>" +
						"<data_id>"+data_id+"</data_id>" +
						"<tablename>prioritization_parameters</tablename>" +
						"<link_to>form177</link_to>" +
						"<title>Deleted</title>" +
						"<notes>"+name+" parameter for prioritization of "+type+"s</notes>" +
						"<updated_by>"+get_name()+"</updated_by>" +
						"</activity>";
			if(is_online())
			{
				server_delete_row(data_xml,activity_xml);
			}
			else
			{
				local_delete_row(data_xml,activity_xml);
			}
			$(button).parent().parent().remove();
		});
	}
	else
	{
		$("#modal2_link").click();
	}
}


/**
 * @form Production Steps
 * @param button
 */
function form184_delete_item(button)
{
	if(is_delete_access('form184'))
	{
		modal115_action(function()
		{
			var form_id=$(button).attr('form');
			var form=document.getElementById(form_id);

			var name=form.elements[1].value;
			var data_id=form.elements[7].value;
			var last_updated=get_my_time();
			var data_xml="<business_processes>" +
						"<id>"+data_id+"</id>" +
						"</business_processes>";
			var activity_xml="<activity>" +
						"<data_id>"+data_id+"</data_id>" +
						"<tablename>business_processes</tablename>" +
						"<link_to>form184</link_to>" +
						"<title>Deleted</title>" +
						"<notes>"+name+" from production process steps</notes>" +
						"<updated_by>"+get_name()+"</updated_by>" +
						"</activity>";
			if(is_online())
			{
				server_delete_row(data_xml,activity_xml);
			}
			else
			{
				local_delete_row(data_xml,activity_xml);
			}
			$(button).parent().parent().remove();
		});
	}
	else
	{
		$("#modal2_link").click();
	}
}


/**
 * @form Testing Steps
 * @param button
 */
function form187_delete_item(button)
{
	if(is_delete_access('form187'))
	{
		modal115_action(function()
		{
			var form_id=$(button).attr('form');
			var form=document.getElementById(form_id);

			var name=form.elements[1].value;
			var data_id=form.elements[6].value;
			var last_updated=get_my_time();
			var data_xml="<business_processes>" +
						"<id>"+data_id+"</id>" +
						"</business_processes>";
			var activity_xml="<activity>" +
						"<data_id>"+data_id+"</data_id>" +
						"<tablename>business_processes</tablename>" +
						"<link_to>form187</link_to>" +
						"<title>Deleted</title>" +
						"<notes>"+name+" from testing process steps</notes>" +
						"<updated_by>"+get_name()+"</updated_by>" +
						"</activity>";
			if(is_online())
			{
				server_delete_row(data_xml,activity_xml);
			}
			else
			{
				local_delete_row(data_xml,activity_xml);
			}
			$(button).parent().parent().remove();
		});
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form Track Testing
 * @param button
 */
function form188_delete_item(button)
{
	if(is_delete_access('form188'))
	{
		modal115_action(function()
		{
			var form_id=$(button).attr('form');
			var form=document.getElementById(form_id);

			var name=form.elements[0].value;
			var data_id=form.elements[5].value;
			var data_xml="<task_instances>" +
						"<id>"+data_id+"</id>" +
						"</task_instances>";
			var activity_xml="<activity>" +
						"<data_id>"+data_id+"</data_id>" +
						"<tablename>task_instances</tablename>" +
						"<link_to>form188</link_to>" +
						"<title>Deleted</title>" +
						"<notes>"+name+" task</notes>" +
						"<updated_by>"+get_name()+"</updated_by>" +
						"</activity>";
			if(is_online())
			{
				server_delete_row(data_xml,activity_xml);
			}
			else
			{
				local_delete_row(data_xml,activity_xml);
			}
			$(button).parent().parent().remove();
		});
	}
	else
	{
		$("#modal2_link").click();
	}
}


/**
 * @form Orders (laundry)
 * @param button
 */
function form190_delete_item(button)
{
	if(is_delete_access('form190'))
	{
		modal115_action(function()
		{
			var form_id=$(button).attr('form');
			var form=document.getElementById(form_id);

			var customer_name=form.elements[0].value;
			var data_id=form.elements[5].value;
			var data_xml="<sale_orders>" +
						"<id>"+data_id+"</id>" +
						"</sale_orders>";
			var task_xml="<task_instances>" +
						"<id>"+data_id+"</id>" +
						"</task_instances>";
			if(is_online())
			{
				server_delete_simple(data_xml);
				server_delete_simple(task_xml);
			}
			else
			{
				local_delete_simple(data_xml);
				local_delete_simple(task_xml);
			}
			$(button).parent().parent().remove();
		});
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form Enter Purchase Bill (Laundry)
 * @formNo form192
 */
function form192_delete_item(button)
{
	if(is_delete_access('form192'))
	{
		modal115_action(function()
		{
			var master_form=document.getElementById("form192_master");
			var bill_id=master_form.elements[5].value;

			var form_id=$(button).attr('form');
			var form=document.getElementById(form_id);

			var data_id=form.elements[6].value;

			var data_xml="<supplier_bill_items>" +
						"<id>"+data_id+"</id>" +
						"<bill_id>"+bill_id+"</bill_id>" +
						"</supplier_bill_items>";
			if(is_online())
			{
				server_delete_simple(data_xml);
			}
			else
			{
				local_delete_simple(data_xml);
			}

			$(button).parent().parent().remove();
		});
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form LetterHead
 * @param button
 */
function form195_delete_item(button)
{
	if(is_delete_access('form195'))
	{
		modal115_action(function()
		{
			var form_id=$(button).attr('form');
			var form=document.getElementById(form_id);

			var data_id=form.elements[3].value;
			var data_xml="<letterheads>" +
						"<id>"+data_id+"</id>" +
						"</letterheads>";
			if(is_online())
			{
				server_delete_simple(data_xml);
			}
			else
			{
				local_delete_simple(data_xml);
			}
			$(button).parent().parent().remove();
		});
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
function form202_delete_item(button)
{
	if(is_update_access('form202'))
	{
		var master_form=document.getElementById("form202_master");
		var target=master_form.elements['target'].value;

		var form_id=$(button).attr('form');
		var form=document.getElementById(form_id);

		var awb_num=form.elements[0].value;
		var status='received';
		var id=form.elements[3].value;
		var last_updated=get_my_time();
		if(id!="")
		{
			var data_xml="<logistics_orders>" +
						"<id>"+id+"</id>" +
						//"<awb_num>"+awb_num+"</awb_num>" +
						"<status>"+status+"</status>" +
						"<current_location></current_location>"+
						"<last_updated>"+last_updated+"</last_updated>" +
						"</logistics_orders>";
			var activity_xml="<activity>" +
						"<data_id>"+id+"</data_id>" +
						"<tablename>logistics_orders</tablename>" +
						"<link_to>form198</link_to>" +
						"<title>Cancelled Transfer</title>" +
						"<notes>AWB # "+awb_num+" to "+target+"</notes>" +
						"<updated_by>"+get_name()+"</updated_by>" +
						"</activity>";
			update_row(data_xml,activity_xml);
		}
		$(button).parent().parent().remove();
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form Logistics Pending Orders
 * @param button
 */
function form204_delete_item(button)
{
	if(is_update_access('form204'))
	{
		var form_id=$(button).attr('form');
		var form=document.getElementById(form_id);

		var awb_num=form.elements[0].value;
		var status='out for delivery';
		var id=form.elements[2].value;
		var last_updated=get_my_time();
		if(id!="")
		{
			var data_xml="<logistics_orders>" +
						"<id>"+id+"</id>" +
						//"<awb_num>"+awb_num+"</awb_num>" +
						"<status>"+status+"</status>" +
						"<last_updated>"+last_updated+"</last_updated>" +
						"</logistics_orders>";
			var activity_xml="<activity>" +
						"<data_id>"+id+"</data_id>" +
						"<tablename>logistics_orders</tablename>" +
						"<link_to>form198</link_to>" +
						"<title>Unmarked</title>" +
						"<notes>AWB # "+awb_num+" from pending</notes>" +
						"<updated_by>"+get_name()+"</updated_by>" +
						"</activity>";
			update_row(data_xml,activity_xml);
		}
		$(button).parent().parent().remove();
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form Logistics delivered Orders
 * @param button
 */
function form205_delete_item(button)
{
	if(is_update_access('form205'))
	{
		var form_id=$(button).attr('form');
		var form=document.getElementById(form_id);

		var awb_num=form.elements[0].value;
		var status='out for delivery';
		var id=form.elements[2].value;
		var last_updated=get_my_time();
		if(id!="")
		{
			var data_xml="<logistics_orders>" +
						"<id>"+id+"</id>" +
						//"<awb_num>"+awb_num+"</awb_num>" +
						"<status>"+status+"</status>" +
						"<last_updated>"+last_updated+"</last_updated>" +
						"</logistics_orders>";
			var activity_xml="<activity>" +
						"<data_id>"+id+"</data_id>" +
						"<tablename>logistics_orders</tablename>" +
						"<link_to>form198</link_to>" +
						"<title>Unmarked</title>" +
						"<notes>AWB # "+awb_num+" from undelivered</notes>" +
						"<updated_by>"+get_name()+"</updated_by>" +
						"</activity>";
			update_row(data_xml,activity_xml);
		}
		$(button).parent().parent().remove();
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form Logistics Pending Orders
 * @param button
 */
function form206_delete_item(button)
{
	if(is_update_access('form206'))
	{
		var form_id=$(button).attr('form');
		var form=document.getElementById(form_id);

		var awb_num=form.elements[0].value;
		var status='out for delivery';
		var id=form.elements[2].value;
		var last_updated=get_my_time();
		if(id!="")
		{
			var data_xml="<logistics_orders>" +
						"<id>"+id+"</id>" +
						//"<awb_num>"+awb_num+"</awb_num>" +
						"<status>"+status+"</status>" +
						"<last_updated>"+last_updated+"</last_updated>" +
						"</logistics_orders>";
			var activity_xml="<activity>" +
						"<data_id>"+id+"</data_id>" +
						"<tablename>logistics_orders</tablename>" +
						"<link_to>form198</link_to>" +
						"<title>Unmarked</title>" +
						"<notes>AWB # "+awb_num+" from delivered</notes>" +
						"<updated_by>"+get_name()+"</updated_by>" +
						"</activity>";
			update_row(data_xml,activity_xml);
		}
		$(button).parent().parent().remove();
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form Treatment plans
 * @param button
 */
function form208_delete_item(button)
{
	if(is_delete_access('form208'))
	{
		modal115_action(function()
		{
			var form_id=$(button).attr('form');
			var form=document.getElementById(form_id);

			var plan_num=form.elements[0].value;
			var data_id=form.elements[5].value;
			var last_updated=get_my_time();
			var data_xml="<treatment_plans>" +
						"<id>"+data_id+"</id>" +
						"</treatment_plans>";
			var activity_xml="<activity>" +
						"<data_id>"+data_id+"</data_id>" +
						"<tablename>treatment_plans</tablename>" +
						"<link_to>form208</link_to>" +
						"<title>Deleted</title>" +
						"<notes>Treatment plan # "+plan_num+"</notes>" +
						"<updated_by>"+get_name()+"</updated_by>" +
						"</activity>";

			var items_xml="<treatment_plan_items>" +
						"<id></id>"+
						"<plan_id exact='yes'>"+data_id+"</plan_id>" +
						"</treatment_plan_items>";

			delete_row(data_xml,activity_xml);
			delete_simple(items_xml);

			$(button).parent().parent().remove();
		});
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form Create production plan
 * @param button
 */
function form209_delete_item(button)
{
	if(is_delete_access('form209'))
	{
		modal115_action(function()
		{
			var form_id=$(button).attr('form');
			var form=document.getElementById(form_id);

			var data_id=form.elements[7].value;
			var last_updated=get_my_time();
			var data_xml="<treatment_plan_items>" +
						"<id>"+data_id+"</id>" +
						"</treatment_plan_items>";
			delete_simple(data_xml);

			$(button).parent().parent().remove();
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
function form215_delete_item(button)
{
	if(is_delete_access('form215'))
	{
		modal115_action(function()
		{
			var form_id=$(button).attr('form');
			var form=document.getElementById(form_id);

			var data_id=form.elements[4].value;
			var last_updated=get_my_time();
			var data_xml="<bills>" +
						"<id>"+data_id+"</id>" +
						"<manifest_num></manifest_num>"+
						"<manifest_id></manifest_id>"+
						"<status></status>"+
						"<last_updated>"+last_updated+"</last_updated>" +
						"</bills>";
			update_simple(data_xml);
			$(button).parent().parent().remove();
			form215_update_serial_numbers();
		});
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * formNo 217
 * form SKU Mapping (Supplier)
 * @param button
 */
function form217_delete_item(button)
{
	if(is_delete_access('form217'))
	{
		modal115_action(function()
		{
			var form_id=$(button).attr('form');
			var form=document.getElementById(form_id);

			var data_id=form.elements[5].value;
			var last_updated=get_my_time();
			var data_xml="<supplier_item_mapping>" +
						"<id>"+data_id+"</id>" +
						"</supplier_item_mapping>";
			if(is_online())
			{
				server_delete_simple(data_xml);
			}
			else
			{
				local_delete_simple(data_xml);
			}
			$(button).parent().parent().remove();
		});
	}
	else
	{
		$("#modal2_link").click();
	}
}


/**
 * @form Manage Purchase Orders (Aurilion)
 * @param button
 */
function form223_delete_item(button)
{
	if(is_delete_access('form223'))
	{
		modal115_action(function()
		{
			var form_id=$(button).attr('form');
			var form=document.getElementById(form_id);

			var order_num=form.elements[0].value;
			var supplier_name=form.elements[1].value;
			var data_id=form.elements[4].value;
			var last_updated=get_my_time();
			var data_xml="<purchase_orders>" +
						"<id>"+data_id+"</id>" +
						"</purchase_orders>";
			var activity_xml="<activity>" +
						"<data_id>"+data_id+"</data_id>" +
						"<tablename>purchase_orders</tablename>" +
						"<link_to>form223</link_to>" +
						"<title>Deleted</title>" +
						"<notes>Purchase order no "+order_num+" for supplier "+supplier_name+"</notes>" +
						"<updated_by>"+get_name()+"</updated_by>" +
						"</activity>";
			var other_delete="<purchase_order_items>" +
					"<order_id>"+data_id+"</order_id>" +
					"</purchase_order_items>";
			delete_row(data_xml,activity_xml);
			delete_simple(other_delete);
			$(button).parent().parent().remove();
		});
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
function form222_delete_item(button)
{
	if(is_delete_access('form222'))
	{
		modal115_action(function()
		{
			var form_id=$(button).attr('form');
			var form=document.getElementById(form_id);

			var data_id=form.elements[8].value;
			var data_xml="<purchase_order_items>" +
						"<id>"+data_id+"</id>" +
						"</purchase_order_items>";
			if(is_online())
			{
				server_delete_simple(data_xml);
			}
			else
			{
				local_delete_simple(data_xml);
			}
			$(button).parent().parent().remove();
		});
	}
	else
	{
		$("#modal2_link").click();
	}
}


/**
 * formNo 228
 * form Demo
 * @param button
 */
function form228_delete_item(button)
{
	if(is_delete_access('form228'))
	{
		modal115_action(function()
		{
			var form_id=$(button).attr('form');
			var form=document.getElementById(form_id);

			var item=form.elements[0].value;
			var data_id=form.elements[6].value;
			var last_updated=get_my_time();
			var data_xml="<bill_items>" +
						"<id>"+data_id+"</id>" +
						"</bill_items>";
			var activity_xml="<activity>" +
						"<data_id>"+data_id+"</data_id>" +
						"<tablename>bill_items</tablename>" +
						"<link_to>form228</link_to>" +
						"<title>Deleted</title>" +
						"<notes>Demo entry for "+item+"</notes>" +
						"<updated_by>"+get_name()+"</updated_by>" +
						"</activity>";
			var data2_xml="<bill_items>" +
						"<issue_id>"+data_id+"</issue_id>" +
						"</bill_items>";

			delete_row(data_xml,activity_xml);
			delete_simple(data2_xml);
			$(button).parent().parent().remove();
		});
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * formNo 229
 * form Hire
 * @param button
 */
function form229_delete_item(button)
{
	if(is_delete_access('form229'))
	{
		modal115_action(function()
		{
			var form_id=$(button).attr('form');
			var form=document.getElementById(form_id);

			var item=form.elements[0].value;
			var data_id=form.elements[6].value;
			var last_updated=get_my_time();
			var data_xml="<bill_items>" +
						"<id>"+data_id+"</id>" +
						"</bill_items>";
			var activity_xml="<activity>" +
						"<data_id>"+data_id+"</data_id>" +
						"<tablename>bill_items</tablename>" +
						"<link_to>form229</link_to>" +
						"<title>Deleted</title>" +
						"<notes>Hire entry for "+item+"</notes>" +
						"<updated_by>"+get_name()+"</updated_by>" +
						"</activity>";
			var data2_xml="<bill_items>" +
						"<issue_id>"+data_id+"</issue_id>" +
						"</bill_items>";

			delete_row(data_xml,activity_xml);
			delete_simple(data2_xml);
			$(button).parent().parent().remove();
		});
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * formNo 230
 * form In-out
 * @param button
 */
function form230_delete_item(button)
{
	if(is_delete_access('form230'))
	{
		modal115_action(function()
		{
			var form_id=$(button).attr('form');
			var form=document.getElementById(form_id);

			var item=form.elements[0].value;
			var issue_type=form.elements[2].value;
			var data_id=form.elements[7].value;
			var last_updated=get_my_time();
			var data_xml="<bill_items>" +
						"<id>"+data_id+"</id>" +
						"</bill_items>";
			var activity_xml="<activity>" +
						"<data_id>"+data_id+"</data_id>" +
						"<tablename>bill_items</tablename>" +
						"<link_to>form230</link_to>" +
						"<title>Deleted</title>" +
						"<notes>"+issue_type+" entry for "+item+"</notes>" +
						"<updated_by>"+get_name()+"</updated_by>" +
						"</activity>";
			delete_row(data_xml,activity_xml);
			$(button).parent().parent().remove();
		});
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form Create Prescriptions
 * @param button
 */
function form231_delete_item(button)
{
	if(is_delete_access('form231'))
	{
		modal115_action(function()
		{
			var form_id=$(button).attr('form');
			var form=document.getElementById(form_id);

			var data_id=form.elements[5].value;
			var last_updated=get_my_time();
			var data_xml="<prescription_items>" +
						"<id>"+data_id+"</id>" +
						"</prescription_items>";
			delete_simple(data_xml);
			$(button).parent().parent().remove();
		});
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form Manage Prescriptions
 * @param button
 */
function form232_delete_item(button)
{
	if(is_delete_access('form232'))
	{
		modal115_action(function()
		{
			var form_id=$(button).attr('form');
			var form=document.getElementById(form_id);

			var pres_num=form.elements[0].value;
			var patient=form.elements[2].value;
			var data_id=form.elements[5].value;
			var last_updated=get_my_time();
			var data_xml="<prescriptions>" +
						"<id>"+data_id+"</id>" +
						"</prescriptions>";
			var activity_xml="<activity>" +
						"<data_id>"+data_id+"</data_id>" +
						"<tablename>prescriptions</tablename>" +
						"<link_to>form232</link_to>" +
						"<title>Deleted</title>" +
						"<notes>Prescription # "+pres_num+" for "+patient+"</notes>" +
						"<updated_by>"+get_name()+"</updated_by>" +
						"</activity>";
			delete_row(data_xml,activity_xml);

			var items_xml="<prescription_items>" +
						"<id></id>"+
						"<p_id exact='yes'>"+data_id+"</p_id>" +
						"</prescription_items>";
			delete_simple(items_xml);

			$(button).parent().parent().remove();
		});
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form Manage Products (grid)
 * @param button
 */
function form235_delete_item(button)
{
	if(is_delete_access('form235'))
	{
		modal115_action(function()
		{
			var form_id=$(button).attr('form');
			var form=document.getElementById(form_id);

			var name=form.elements[3].value;
			var make=form.elements[4].value;
			var description=form.elements[2].value;
			var tax=form.elements[5].value;
			var data_id=form.elements[7].value;
			var last_updated=get_my_time();
			var data_xml="<product_master>" +
						"<id>"+data_id+"</id>" +
						"</product_master>";
			var activity_xml="<activity>" +
						"<data_id>"+data_id+"</data_id>" +
						"<tablename>product_master</tablename>" +
						"<link_to>form235</link_to>" +
						"<title>Deleted</title>" +
						"<notes>Product "+name+" from inventory</notes>" +
						"<updated_by>"+get_name()+"</updated_by>" +
						"</activity>";
			var other_delete="<product_instances>" +
					"<product_name>"+name+"</product_name>" +
					"</product_instances>";
			var other_delete2="<documents>" +
					"<doc_type>product_master</doc_type>" +
					"<target_id>"+data_id+"</target_id>" +
					"</documents>";
			var other_delete3="<pre_requisites>" +
					"<name>"+name+"</name>" +
					"<type>product</type>" +
					"</pre_requisites>";
			var other_delete4="<attributes>" +
					"<name exact='yes'>"+name+"</name>" +
					"<type>product</type>" +
					"</attributes>";
			var other_delete5="<cross_sells>" +
					"<name>"+name+"</name>" +
					"<type>product</type>" +
					"</cross_sells>";
			var other_delete6="<reviews>" +
					"<name>"+name+"</name>" +
					"<type>product</type>" +
					"</reviews>";

			delete_row(data_xml,activity_xml);
			delete_simple(other_delete);
			delete_simple(other_delete2);
			delete_simple(other_delete3);
			delete_simple(other_delete4);
			delete_simple(other_delete5);
			delete_simple(other_delete6);

			$(button).parent().parent().parent().remove();
		});
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form Manage manifests
 * @param button
 */
function form236_delete_item(button)
{
	if(is_delete_access('form236'))
	{
		modal115_action(function()
		{
			var form_id=$(button).attr('form');
			var form=document.getElementById(form_id);

			var drs_num=form.elements[0].value;
			var data_id=form.elements[3].value;
			var data_xml="<drs>" +
						"<id>"+data_id+"</id>" +
						"</drs>";
			var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>drs</tablename>" +
					"<link_to>form236</link_to>" +
					"<title>Delete</title>" +
					"<notes>Manifest # "+drs_num+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";

			var drs_items_xml="<bills>"+
							"<id></id>"+
							"<manifest_num exact='yes'>"+drs_num+"</manifest_num>"+
							"</bills>";
			get_single_column_data(function(drs_items)
			{
				var data_xml="<bills>";
				var counter=1;
				var last_updated=get_my_time();

				drs_items.forEach(function(drs_item)
				{
					if((counter%500)===0)
					{
						data_xml+="</bills><separator></separator><bills>";
					}

					counter+=1;

					data_xml+="<row>" +
							"<id>"+drs_item+"</id>" +
							"<manifest_num></manifest_num>" +
							"<manifest_id></manifest_id>" +
							"<last_updated>"+last_updated+"</last_updated>" +
							"</row>";
				});
				data_xml+="</bills>";
				//console.log(data_xml);
				update_batch(data_xml);

			},drs_items_xml);

			delete_row(data_xml,activity_xml);
			$(button).parent().parent().remove();
		});
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form SKU components
 * @param button
 */
function form245_delete_item(button)
{
	if(is_delete_access('form245'))
	{
		modal115_action(function()
		{
			var form_id=$(button).attr('form');
			var form=document.getElementById(form_id);

			var data_id=form.elements[3].value;

			var pre_requisites_xml="<pre_requisites>"+
							"<id>"+data_id+"</id>"+
							"</pre_requisites>";
			delete_simple(pre_requisites_xml);

			$(button).parent().parent().remove();
		});
	}
	else
	{
		$("#modal2_link").click();
	}
}


/**
 * formNo 248
 * form Create Transit Bags
 * @param button
 */
function form248_delete_item(button)
{
	if(is_delete_access('form248'))
	{
		modal115_action(function()
		{
			var form_id=$(button).attr('form');
			var form=document.getElementById(form_id);

			var data_id=form.elements[4].value;
			var last_updated=get_my_time();
			var data_xml="<logistics_orders>" +
						"<id>"+data_id+"</id>" +
						"<status>received</status>" +
						"<bag_num></bag_num>"+
						"<bag_id></bag_id>"+
						"<branch></branch>"+
						"<last_updated>"+last_updated+"</last_updated>" +
						"</logistics_orders>";
			update_simple(data_xml);
			$(button).parent().parent().remove();
			form248_update_serial_numbers();
		});
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form Manage Transit Bags
 * @param button
 */
function form249_delete_item(button)
{
	if(is_delete_access('form249'))
	{
		modal115_action(function()
		{
			var form_id=$(button).attr('form');
			var form=document.getElementById(form_id);

			var bag_num=form.elements[0].value;
			var data_id=form.elements[4].value;
			var data_xml="<transit_bags>" +
						"<id>"+data_id+"</id>" +
						"</transit_bags>";
			var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>transit_bags</tablename>" +
					"<link_to>form249</link_to>" +
					"<title>Delete</title>" +
					"<notes>Bag # "+bag_num+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";

			var bag_items_xml="<logistics_orders>"+
							"<id></id>"+
							"<status exact='yes'>in-transit</status>"+
							"<bag_num exact='yes'>"+bag_num+"</bag_num>"+
							"</logistics_orders>";
			get_single_column_data(function(bag_items)
			{
				var data_xml="<logistics_orders>";
				var counter=1;
				var last_updated=get_my_time();

				bag_items.forEach(function(bag_item)
				{
					if((counter%500)===0)
					{
						data_xml+="</logistics_orders><separator></separator><logistics_orders>";
					}

					counter+=1;

					data_xml+="<row>" +
							"<id>"+bag_item+"</id>" +
							"<bag_num></bag_num>" +
							"<bag_id></bag_id>" +
							"<status>received</status>"+
							"<last_updated>"+last_updated+"</last_updated>" +
							"</row>";
				});
				data_xml+="</logistics_orders>";
				//console.log(data_xml);
				update_batch(data_xml);

			},bag_items_xml);

			delete_row(data_xml,activity_xml);
			$(button).parent().parent().remove();
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
function form250_delete_item(button)
{
	if(is_delete_access('form250'))
	{
		modal115_action(function()
		{
			var form_id=$(button).attr('form');
			var form=document.getElementById(form_id);

			var data_id=form.elements[4].value;
			var last_updated=get_my_time();
			var data_xml="<transit_bags>" +
						"<id>"+data_id+"</id>" +
						"<status>pending</status>" +
						"<mts></mts>"+
						"<mts_id></mts_id>"+
						"<last_updated>"+last_updated+"</last_updated>" +
						"</transit_bags>";
			update_simple(data_xml);
			$(button).parent().parent().remove();
			form250_update_serial_numbers();
		});
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
function form251_delete_item(button)
{
	if(is_delete_access('form251'))
	{
		modal115_action(function()
		{
			var form_id=$(button).attr('form');
			var form=document.getElementById(form_id);

			var mts=form.elements[0].value;
			var data_id=form.elements[4].value;
			var data_xml="<mts>" +
						"<id>"+data_id+"</id>" +
						"</mts>";
			var activity_xml="<activity>" +
					"<data_id>"+data_id+"</data_id>" +
					"<tablename>mts</tablename>" +
					"<link_to>form251</link_to>" +
					"<title>Deleted</title>" +
					"<notes>MTS # "+mts+"</notes>" +
					"<updated_by>"+get_name()+"</updated_by>" +
					"</activity>";

			var bag_items_xml="<transit_bags>"+
							"<id></id>"+
							"<status exact='yes'>in-transit</status>"+
							"<mts exact='yes'>"+mts+"</mts>"+
							"</transit_bags>";

			get_single_column_data(function(bag_items)
			{
				var data_xml="<transit_bags>";
				var counter=1;
				var last_updated=get_my_time();

				bag_items.forEach(function(bag_item)
				{
					if((counter%500)===0)
					{
						data_xml+="</transit_bags><separator></separator><transit_bags>";
					}

					counter+=1;

					data_xml+="<row>" +
							"<id>"+bag_item+"</id>" +
							"<mts></mts>" +
							"<mts_id></mts_id>" +
							"<status>pending</status>"+
							"<last_updated>"+last_updated+"</last_updated>" +
							"</row>";
				});
				data_xml+="</transit_bags>";
				//console.log(data_xml);
				update_batch(data_xml);

			},bag_items_xml);

			delete_row(data_xml,activity_xml);
			$(button).parent().parent().remove();
		});
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form Vendor Leads
 * @param button
 */
function form252_delete_item(button)
{
	if(is_delete_access('form252'))
	{
		modal115_action(function()
		{
			var form_id=$(button).attr('form');
			var form=document.getElementById(form_id);
			var customer=form.elements[0].value;
			var data_id=form.elements[4].value;
			var data_xml="<sale_leads>" +
						"<id>"+data_id+"</id>" +
						"<customer>"+customer+"</customer>" +
						"</sale_leads>";
			var activity_xml="<activity>" +
						"<data_id>"+data_id+"</data_id>" +
						"<tablename>sale_leads</tablename>" +
						"<link_to>form252</link_to>" +
						"<title>Delete</title>" +
						"<notes>Lead for customer "+customer+"</notes>" +
						"<updated_by>"+get_name()+"</updated_by>" +
						"</activity>";
			delete_row(data_xml,activity_xml);
			$(button).parent().parent().remove();
		});
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form Customer Leads
 * @param button
 */
function form253_delete_item(button)
{
	if(is_delete_access('form253'))
	{
		modal115_action(function()
		{
			var form_id=$(button).attr('form');
			var form=document.getElementById(form_id);
			var customer=form.elements[0].value;
			var data_id=form.elements[4].value;
			var data_xml="<sale_leads>" +
						"<id>"+data_id+"</id>" +
						"<customer>"+customer+"</customer>" +
						"</sale_leads>";
			var activity_xml="<activity>" +
						"<data_id>"+data_id+"</data_id>" +
						"<tablename>sale_leads</tablename>" +
						"<link_to>form253</link_to>" +
						"<title>Delete</title>" +
						"<notes>Lead for customer "+customer+"</notes>" +
						"<updated_by>"+get_name()+"</updated_by>" +
						"</activity>";
			delete_row(data_xml,activity_xml);
			$(button).parent().parent().remove();
		});
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form Telecalling Leads
 * @param button
 */
function form254_delete_item(button)
{
	if(is_delete_access('form254'))
	{
		modal115_action(function()
		{
			var form_id=$(button).attr('form');
			var form=document.getElementById(form_id);
			var customer=form.elements[0].value;
			var data_id=form.elements[4].value;
			var data_xml="<sale_leads>" +
						"<id>"+data_id+"</id>" +
						"<customer>"+customer+"</customer>" +
						"</sale_leads>";
			var activity_xml="<activity>" +
						"<data_id>"+data_id+"</data_id>" +
						"<tablename>sale_leads</tablename>" +
						"<link_to>form254</link_to>" +
						"<title>Delete</title>" +
						"<notes>Lead for customer "+customer+"</notes>" +
						"<updated_by>"+get_name()+"</updated_by>" +
						"</activity>";
			delete_row(data_xml,activity_xml);
			$(button).parent().parent().remove();
		});
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form Marketing Leads
 * @param button
 */
function form255_delete_item(button)
{
	if(is_delete_access('form255'))
	{
		modal115_action(function()
		{
			var form_id=$(button).attr('form');
			var form=document.getElementById(form_id);
			var customer=form.elements[0].value;
			var data_id=form.elements[4].value;
			var data_xml="<sale_leads>" +
						"<id>"+data_id+"</id>" +
						"<customer>"+customer+"</customer>" +
						"</sale_leads>";
			var activity_xml="<activity>" +
						"<data_id>"+data_id+"</data_id>" +
						"<tablename>sale_leads</tablename>" +
						"<link_to>form255</link_to>" +
						"<title>Delete</title>" +
						"<notes>Lead for customer "+customer+"</notes>" +
						"<updated_by>"+get_name()+"</updated_by>" +
						"</activity>";
			delete_row(data_xml,activity_xml);
			$(button).parent().parent().remove();
		});
	}
	else
	{
		$("#modal2_link").click();
	}
}


/**
 * @form Purchase Leads
 * @param button
 */
function form273_delete_item(button)
{
	if(is_delete_access('form273'))
	{
		modal115_action(function()
		{
			var form_id=$(button).attr('form');
			var form=document.getElementById(form_id);
			var supplier=form.elements[0].value;
			var data_id=form.elements[7].value;
			var data_xml="<purchase_leads>" +
						"<id>"+data_id+"</id>" +
						"</purchase_leads>";
			var activity_xml="<activity>" +
						"<data_id>"+data_id+"</data_id>" +
						"<tablename>purchase_leads</tablename>" +
						"<link_to>form273</link_to>" +
						"<title>Deleted</title>" +
						"<notes>Purchase lead from "+supplier+"</notes>" +
						"<updated_by>"+get_name()+"</updated_by>" +
						"</activity>";
			delete_row(data_xml,activity_xml);
			$(button).parent().parent().remove();
		});
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
function form275_delete_item(button)
{
	if(is_delete_access('form275'))
	{
		modal115_action(function()
		{
			var form_id=$(button).attr('form');
			var form=document.getElementById(form_id);

			var item=form.elements[0].value;
			var issue_type=form.elements[2].value;
			var data_id=form.elements[6].value;
			var last_updated=get_my_time();
			var data_xml="<bill_items>" +
						"<id>"+data_id+"</id>" +
						"</bill_items>";
			var activity_xml="<activity>" +
						"<data_id>"+data_id+"</data_id>" +
						"<tablename>bill_items</tablename>" +
						"<link_to>form275</link_to>" +
						"<title>Deleted</title>" +
						"<notes>"+issue_type+" entry for "+item+"</notes>" +
						"<updated_by>"+get_name()+"</updated_by>" +
						"</activity>";
			delete_row(data_xml,activity_xml);
			$(button).parent().parent().remove();
		});
	}
	else
	{
		$("#modal2_link").click();
	}
}


/**
 * @form Buyer Leads
 * @param button
 */
function form289_delete_item(button)
{
	if(is_delete_access('form289'))
	{
		modal115_action(function()
		{
			var form_id=$(button).attr('form');
			var form=document.getElementById(form_id);
			var customer=form.elements[0].value;
			var data_id=form.elements[8].value;
			var data_xml="<sale_leads>" +
						"<id>"+data_id+"</id>" +
						"</sale_leads>";
			var activity_xml="<activity>" +
						"<data_id>"+data_id+"</data_id>" +
						"<tablename>sale_leads</tablename>" +
						"<link_to>form289</link_to>" +
						"<title>Deleted</title>" +
						"<notes>Sale lead from "+customer+"</notes>" +
						"<updated_by>"+get_name()+"</updated_by>" +
						"</activity>";
			var follow_xml="<followups>"+
			            "<source_id>"+data_id+"</source_id>"+
		    			"</followups>";

			delete_row(data_xml,activity_xml);
			delete_simple(follow_xml);

			$(button).parent().parent().remove();
		});
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form Cities
 * @param button
 */
function form290_delete_item(button)
{
	if(is_delete_access('form290'))
	{
		modal115_action(function()
		{
			var form_id=$(button).attr('form');
			var form=document.getElementById(form_id);
			var data_id=form.elements[3].value;
			var data_xml="<cities_data>" +
						"<id>"+data_id+"</id>" +
						"</cities_data>";

			delete_simple(data_xml);
			$(button).parent().parent().remove();
		});
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form Create Bills (Sehgal)
 * @formNo 294
 * @param button
 */
function form294_delete_item(button)
{
	if(is_delete_access('form294'))
	{
		modal115_action(function()
		{
			var form_id=$(button).attr('form');
			var form=document.getElementById(form_id);
			var data_id=form.elements[5].value;

			var data_xml="<bill_items>" +
						"<id>"+data_id+"</id>" +
						"</bill_items>";
			delete_simple(data_xml);

			$(button).parent().parent().remove();
			form294_update_serial_numbers();
		});
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form Create Purchase Bills (Sehgal)
 * @formNo 295
 * @param button
 */
function form295_delete_item(button)
{
	if(is_delete_access('form295'))
	{
		modal115_action(function()
		{
			var form_id=$(button).attr('form');
			var form=document.getElementById(form_id);
			var data_id=form.elements[5].value;

			var data_xml="<supplier_bill_items>" +
						"<id>"+data_id+"</id>" +
						"</supplier_bill_items>";
			delete_simple(data_xml);

			$(button).parent().parent().remove();
			form295_update_serial_numbers();
		});
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form Manage Purchase Orders (Sehgal)
 * @param button
 */
function form297_delete_item(button)
{
	if(is_delete_access('form297'))
	{
		modal115_action(function()
		{
			var form_id=$(button).attr('form');
			var form=document.getElementById(form_id);

			var order_num=form.elements[0].value;
			var supplier_name=form.elements[1].value;
			var data_id=form.elements[4].value;
			var last_updated=get_my_time();
			var data_xml="<purchase_orders>" +
						"<id>"+data_id+"</id>" +
						"</purchase_orders>";
			var activity_xml="<activity>" +
						"<data_id>"+data_id+"</data_id>" +
						"<tablename>purchase_orders</tablename>" +
						"<link_to>form297</link_to>" +
						"<title>Deleted</title>" +
						"<notes>Purchase order # "+order_num+" for supplier "+supplier_name+"</notes>" +
						"<updated_by>"+get_name()+"</updated_by>" +
						"</activity>";
			var other_delete="<purchase_order_items>" +
					"<order_id>"+data_id+"</order_id>" +
					"</purchase_order_items>";
			delete_row(data_xml,activity_xml);
			delete_simple(other_delete);
			$(button).parent().parent().remove();
		});
	}
	else
	{
		$("#modal2_link").click();
	}
}

/**
 * @form Create Purchase Order (Sehgal)
 * @param button
 */
function form296_delete_item(button)
{
	if(is_delete_access('form296'))
	{
		modal115_action(function()
		{
			var form_id=$(button).attr('form');
			var form=document.getElementById(form_id);

			var data_id=form.elements[10].value;
			var data_xml="<purchase_order_items>" +
						"<id>"+data_id+"</id>" +
						"</purchase_order_items>";
			delete_simple(data_xml);

			$(button).parent().parent().remove();
		});
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
function form300_delete_item(button)
{
	if(is_delete_access('form300'))
	{
		modal115_action(function()
		{
			var form_id=$(button).attr('form');
			var form=document.getElementById(form_id);

			var name=form.elements[0].value;
			var data_id=form.elements[7].value;
			var data_xml="<product_master>" +
						"<id>"+data_id+"</id>" +
						"</product_master>";
			var activity_xml="<activity>" +
						"<data_id>"+data_id+"</data_id>" +
						"<tablename>product_master</tablename>" +
						"<link_to>form300</link_to>" +
						"<title>Deleted</title>" +
						"<notes>Product "+name+"</notes>" +
						"<updated_by>"+get_name()+"</updated_by>" +
						"</activity>";
			var other_delete="<product_instances>" +
					"<product_name>"+name+"</product_name>" +
					"</product_instances>";
			var other_delete2="<documents>" +
					"<doc_type>product_master</doc_type>" +
					"<target_id>"+data_id+"</target_id>" +
					"</documents>";
			var other_delete4="<attributes>" +
					"<name exact='yes'>"+name+"</name>" +
					"<type>product</type>" +
					"</attributes>";

			delete_row(data_xml,activity_xml);
			delete_simple(other_delete);
			delete_simple(other_delete2);
			delete_simple(other_delete4);
			$(button).parent().parent().remove();
		});
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
function form302_delete_item(button)
{
	if(is_delete_access('form302'))
	{
		modal115_action(function()
		{
			var form_id=$(button).attr('form');
			var form=document.getElementById(form_id);

			var data_id=form.elements[4].value;
			var data_xml="<qr_contexts>" +
						"<id>"+data_id+"</id>" +
						"</qr_contexts>";
			delete_simple(data_xml);

			$(button).parent().parent().remove();
		});
	}
	else
	{
		$("#modal2_link").click();
	}
}
