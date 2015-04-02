<div id='form135' class='function_detail'>
	<form id='form135_master'>
		<fieldset>
			<label>Project Name<br><input type='text' readonly="readonly"></label>
			<label>Description<br><input type='text' readonly="readonly"></label>
			<label>Status<br><input type='text' readonly="readonly"></label>
			<input type='submit' title='Save' class='save_icon'>
			<input type='button' title='Print' class='print_icon' onclick='form135_print_form($(this));'>
		</fieldset>
	</form>

	<div id='form135_gantt'>
	</div>
	
	<br>	
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form135_team_header'></form>
					<th>Assignee</th>
					<th>Role</th>
					<th>Status</th>
					<th><input type='button' class='add_icon' form='form135_team_header' title='Add assignee' onclick='form135_add_team();'></th>
			</tr>
		</thead>
		<tbody id='form135_team_body'>
		</tbody>
	</table>

	<br>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form135_document_header'></form>
					<th>Document Name</th>
					<th>File </th>
					<th><input type='button' class='add_icon' form='form135_document_header' title='Add document' onclick='form135_add_document();'></th>			
			</tr>
		</thead>
		<tbody id='form135_document_body'>
		</tbody>
	</table>

	<br>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form135_task_header'></form>
					<th>Task</th>
					<th>Description</th>
					<th>Assignee </th>
					<th>Due By </th>
					<th>Status </th>
					<th><input type='button' class='add_icon' form='form135_task_header' title='Add task' onclick='form135_add_task();'></th>
			</tr>
		</thead>
		<tbody id='form135_task_body'>
		</tbody>
	</table>

	<br>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form135_asset_header'></form>
					<th>Asset Name </th>
					<th>Quantity </th>
					<th>Owner </th>
					<th>Status </th>
					<th><input type='button' class='add_icon' form='form135_asset_header' title='Add item' onclick='form135_add_asset();'></th>
			</tr>
		</thead>
		<tbody id='form135_asset_body'>
		</tbody>
	</table>

	<br>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form135_expense_header'></form>
					<th>Person </th>
					<th>Amount </th>
					<th>Detail </th>
					<th>Status </th>
					<th><input type='button' class='add_icon' form='form135_expense_header' title='Add expense' onclick='form135_add_expense();'></th>
			</tr>
		</thead>
		<tbody id='form135_expense_body'>
		</tbody>
	</table>

</div>