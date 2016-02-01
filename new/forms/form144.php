<div id='form144' class='tab-pane'>
	<form id='form144_master' autocomplete="off">
		<fieldset>
			<label>Project Name<br><input type='text' name='project' required></label>
			<label>Budget Estimate<br>Rs. <input type='number' name='estimate' readonly='readonly'></label>
			<label>Budget Actuals<br>Rs. <input type='number' name='actual' readonly='readonly'></label>
			<label>Hours Spent<br><input type='number' name='hours' readonly='readonly'></label>
			<label>	<input type='button' title='Save' name='save' class='save_icon'></label>
			<label>
				<input type='hidden' name='project_id'>	
				<input type='submit' class='submit_hidden'>	
			</label>	
		</fieldset>
	</form>

	<br>
	<b>Cost of Tasks</b>	
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form144_task_header'></form>
					<th>Phase </th>
					<th>Task </th>
					<th>Amount </th>
					<th>Status </th>
					<th></th>
			</tr>
		</thead>
		<tbody id='form144_task_body'>
		</tbody>
	</table>
	
	<br>
	<b>Expenses</b>	
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form144_expense_header'></form>
					<th>Person </th>
					<th>Amount </th>
					<th>Detail </th>
					<th>Status </th>
					<th><input type='button' class='add_icon' form='form144_expense_header' title='Add expense' onclick='form144_add_expense();'></th>
			</tr>
		</thead>
		<tbody id='form144_expense_body'>
		</tbody>
	</table>
</div>