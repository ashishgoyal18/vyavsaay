<div id='form82' class='function_detail'>
	<form id='form82_master'>
		<fieldset>
			<label>Customer <img src='./images/add_image.png' class='add_image' title='Add new customer' onclick='modal11_action();'></br>
			<input type='text' required></label>
			<label>Bill Date</br><input type='text' required></label>
			<input type='hidden' name='bill_id'>
			<input type='hidden' name='offer'>
			<input type='hidden' name='transaction'>
			<input type='button' title='Save Bill' class='save_icon'>
			<input type='button' title='Print Bill' class='print_icon' onclick='form82_print_form();'>
			<input type='button' id='form82_share' class='share_icon' style='display:none;'>
			<input type='submit' class='submit_hidden'>
		</fieldset>
	</form>
	<table class='rwd-table'>
		<thead>
			<tr>
				<form id='form82_header'></form>
					<th>Barcode</th>
					<th>Product</th>
					<th>Batch</th>
					<th>Unit Price</th>
					<th><input type='button' form='form82_header' title='Add item' class='add_icon' onclick='form82_add_item();'></th>
			</tr>
		</thead>
		<tbody id='form82_body'>
		</tbody>
		<tfoot id='form82_foot'>
		</tfoot>
	</table>
</div>