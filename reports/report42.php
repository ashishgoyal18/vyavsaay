<div id='report42' class='tab-pane'>
	<form id='report42_header' autocomplete="off">
		<fieldset>
			<label>Customer<br><input type='text' name='customer'></label>
			<label>Start Date<br><input type='text' name='start'></label>
			<label>End Date<br><input type='text' name='end'></label>
			<label>
				<input type='button' value='Refresh' name='refresh' onclick='report42_ini();' class='generic_icon'>
				<input type='button' title='Print' class='print_icon'>
			</label>
		</fieldset>
	</form>
	<table class='rwd-table'>
		<thead>
			<tr>
				<th>Customer</th>
				<th>Order #</th>
				<th>Rating</th>
				<th>Comments</th>
			</tr>
		</thead>
		<tbody id='report42_body'>
		</tbody>
	</table>
	
	<script>

function report42_header_ini()
{	
	var form=document.getElementById('report42_header');
	var customer_filter=form.elements['customer'];
	var start_filter=form.elements['start'];
	var end_filter=form.elements['end'];	
	var refresh_button=form.elements['refresh'];	
	
	var customer_data="<customers>" +
			"<acc_name></acc_name>" +
			"</customers>";
	set_my_filter(customer_data,customer_filter);

	$(start_filter).datepicker();
	$(end_filter).datepicker();
}

function report42_ini()
{
	show_loader();
	
	var form=document.getElementById('report42_header');
	var customer=form.elements[1].value;
	var start_date=form.elements[2].value;
	var end_date=form.elements[3].value;
	
	$('#report42_body').html("");
	var rowsHTML="";
	
	var feedback_data="<feedback>" +
			"<provider>"+customer+"</provider>" +
			"<order_num></order_num>"+			
			"<detail></detail>" +
			"<rating></rating>" +
			"<date lowerbound='yes'>"+get_raw_time(start_date)+"</date>" +
			"<date upperbound='yes'>"+(get_raw_time(end_date)+86400000)+"</date>" +
			"</feedback>";

	fetch_requested_data('report42',feedback_data,function(feedbacks)
	{
		feedbacks.forEach(function(feedback)
		{
			rowsHTML+="<tr>";
				rowsHTML+="<td data-th='Customer'>";
					rowsHTML+=feedback.provider;
				rowsHTML+="</td>";
				rowsHTML+="<td data-th='Order #'>";
					rowsHTML+=feedback.order_num+"<br>Date: "+get_my_past_date(feedback.date);
				rowsHTML+="</td>";
				rowsHTML+="<td data-th='Rating'>";
					rowsHTML+=feedback.rating;
				rowsHTML+="</td>";
				rowsHTML+="<td data-th='Comments'>";
					rowsHTML+=feedback.detail;
				rowsHTML+="</td>";
			rowsHTML+="</tr>";
		});
		$('#report42_body').html(rowsHTML);
		
		var print_button=form.elements[5];
		print_tabular_report('report42','Feedback',print_button);
		
		hide_loader();
	});	
};
	
	</script>
</div>