<div class='modal_forms'>	
	<div id="modal1" title="Enter password again">
		<form>
			<input type="password" id="modal1_pass" required>
			<input type="submit" class='modal_submit' tabindex="-1" style="position:absolute; top:-1000px">
		</form>
	</div>
	

	<div id="modal8" title="Add new Offer">
		<form id='modal8_form' autocomplete="off">
			<fieldset>
				<label>Name: <input type='text' required></label><br>
				<label>End Date: <input type='text'></label><br>
				<label>Type: <input type='text' required></label><br>
				<label>Product name: <input type="text"></label><br>
				<label>Batch: <input type="text"></label>
				<label><input type='checkbox'>Select All batches</label><br>
				<label>Service: <input type="text"></label><br>
				<label>Applicability Criteria: <input type="text" required></label><br>
				<label>Criteria Amount: Rs. <input type="number"></label><br>
				<label>Criteria Quantity: <input type="number"></label><br>
				<label>Incentive: <input type="text" required></label><br>
				<label>%: <input type="number"></label>
				<label>Rs: <input type="number"></label><br>
				<label>%: <input type="number"></label>
				<label>Quantity: <input type="number"></label><br>
				<label>Free product name: <input type="text"></label><br>
				<label>Free product quantity: <input type="number"></label><br>			
				<label>Free service name: <input type="text"></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<div id="modal9" title="Add document">
		<form id='modal9_form' autocomplete="off">
			<fieldset>
				<label>Request Id: <input type="text" required></label><br>
				<label>Document Name: <input type="text"></label><br>
				<label>File: <a id='modal9_url'>link</a>
						<input type="file"></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>
	
	<div id="modal10" title="Add new asset">
		<form id='modal10_form' autocomplete="off">
			<fieldset>
				<label>Name: <input type='text' required></label><br>
				<label>Type: <input type='text' required></label><br>
				<label>Description: <textarea></textarea></label><br>
				<label id='modal10_attributes'></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>
	
	<div id="modal11" title="Add new customer">
		<form id='modal11_form' autocomplete="off">
			<fieldset>
				<label>Name: <input type='text' required></label><br>
				<label>Phone: <input type="tel"></label><br>
				<label>Email: <input type="text"></label><br>
				<label>Address: <textarea></textarea></label><br>
				<label>Pincode: <input type="number"></label><br>
				<label>City: <input type="text"></label><br>
				<label>State: <input type="text"></label><br>
				<label>Country: <input type="text"></label><br>
				<label>Notes: <textarea></textarea></label><br>
				<label id='modal11_attributes'></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>
	
	<div id="modal12" title="Add new account">
		<form id='modal12_form' autocomplete="off">
			<fieldset>
				<label>Name: <input type='text' required></label><br>
				<label>Description: <textarea></textarea></label><br>
				<label id='modal12_attributes'></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>
	
	<div id="modal13" title="Add new supplier">
		<form id='modal13_form' autocomplete="off">
			<fieldset>
				<label>Name: <input type='text' required></label><br>
				<label>Phone: <input type="text"></label><br>
				<label>Email: <input type="text"></label><br>
				<label>Address: <textarea></textarea></label><br>
				<label>Pincode: <input type="number"></label><br>
				<label>City: <input type="text"></label><br>
				<label>State: <input type="text"></label><br>
				<label>Country: <input type="text"></label><br>
				<label>Notes: <textarea></textarea></label><br>
				<label id='modal13_attributes'></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>
	
	<div id="modal14" title="Add new product">
		<form id='modal14_form' autocomplete="off">
			<fieldset>
				<label>Name: <input type="text" required></label><br>
				<label>Make: <input type="text"></label><br>
				<label>Description: <textarea></textarea></label><br>
				<label>Picture: <output></output>
								<input type='file' style='display:none'>
								<input type='button' class='generic_red_icon' value='Select Picture'></label><br>
				<label>Tax (%): <input type="number" step='any'></label><br>
				<label>Bar Code: <input type="text"></label>
				<label><input type='checkbox'>Auto generate</label><br>
				<label id='modal14_attributes'></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>
	
	<div id="modal15" title="Provide feedback">
		<form id='modal15_form' autocomplete="off">
			<fieldset>
				<label>Feedback provider: <input type='text' required></label><br>
				<label>Detail: <textarea></textarea></label><br>
				<label>Type: <input type="text" required></label><br>
				<label>Rating: <input type="text" required></label><br>
				<label>Date: <input type="text" required></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>
	
	<div id="modal16" title="Add new staff">
		<form id='modal16_form' autocomplete="off">
			<fieldset>
				<label>Name: <input type='text' required></label><br>
				<label>UserName: <input type='text' title='only alphanumeric characters'></label><br>
				<label>Phone: <input type="text"></label><br>
				<label>Email: <input type="text"></label><br>
				<label>Address: <textarea></textarea></label><br>
				<label>Pincode: <input type="number"></label><br>
				<label>City: <input type="text"></label><br>
				<label>State: <input type="text"></label><br>
				<label>Country: <input type="text"></label><br>
				<label id='modal16_attributes'></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>
	
	<div id="modal17" title="Add staff details">
		<form id='modal17_form' autocomplete="off">
			<fieldset>
				<label>Address: <input type="text"></label><br>
				<label>Pincode: <input type="number"></label><br>
				<label>City: <input type="text"></label><br>
				<label>State: <input type="text"></label><br>
				<label>Country: <input type="text"></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>
	
	<div id="modal18" title="Add task type">
		<form id='modal18_form' autocomplete="off">
			<fieldset>
				<label>Name: <input type="text" required></label><br>
				<label>Description: <textarea></textarea></label><br>
				<label>Estimated Hours: <input type="number" step='any' required></label><br>
				<label id='modal18_attributes'></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>
	
	<div id="modal19" title="Copy product">
		<form id='modal19_form' autocomplete="off">
			<fieldset>
				<label>Name: <input type="text" required></label><br>
				<label>Make: <input type="text"></label><br>
				<label>Description: <textarea></textarea></label><br>
				<label>Picture: <output></output>
								<input type="file"></label><br>
				<label>Tax (%): <input type="number"></label><br>
				<label>Bar Code: <input type="text" required></label>
				<label><input type='checkbox'>Auto generate</label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>
	
	<div id="modal20" title="Add new service">
		<form id='modal20_form' autocomplete="off">
			<fieldset>
				<label>Name: <input type="text" required></label><br>
				<label>Description: <textarea></textarea></label><br>
				<label>Tax (%): <input type="number" step='any'></label><br>
				<label>Price: <input type="number"></label><br>
				<label id='modal20_attributes'></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>
	
	<div id="modal21" title="Copy service">
		<form id='modal21_form' autocomplete="off">
			<fieldset>
				<label>Name: <input type="text"></label><br>
				<label>Description: <textarea></textarea></label><br>
				<label>Tax (%): <input type="number"></label><br>
				<label>Price: <input type="number"></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>
	
	<div id="modal22" title="Add new batch">
		<form id='modal22_form' autocomplete="off">
			<fieldset>
				<label>Product Name: <input type="text" required></label><br>
				<label>Batch: <input type='text' required></label><br>
				<label>Manufacturing Date: <input type="text"></label><br>
				<label>Expiry Date: <input type="text"></label><br>
				<label>MRP: Rs. <input type="number" step='any'></label><br>
				<label>Purchase price: Rs. <input type="number" step='any' required></label><br>
				<label>Default Sale Price: Rs. <input type="number" step='any' required></label><br>
				<label id='modal22_billings'></label>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>
	
	<div id="modal23" title="Data Import">
		<form id='modal23_form' autocomplete="off">
			<fieldset>
				<input type="button" value='Download import template' class='modal_submit'>
				<br>
				<br>
				<br>
				<b>Import pre-filled template</b><br>
				<label><input type="radio" name='upload_option' value='new'>Create New Records</label><br>
				<label><input type="radio" name='upload_option' value='existing' checked>Update existing Records</label><br>
				<input type="file" required value='Select file' accept=".csv" style='display:none'>
				<input type='button' class='generic_red_icon' value='Select File'>
				<br>
				<output name='selected_file'></output><br>
				<input type="submit" value='Import' class='modal_submit'>
			</fieldset>
		</form>
	</div>
	
	<div id="modal24" title="Update Customer Address">
		<form id='modal24_form' autocomplete="off">
			<fieldset>
				<label>Address: <textarea></textarea></label><br>
				<label>Pincode: <input type="number"></label><br>
				<label>City: <input type="text" required></label><br>
				<label>State: <input type="text"></label><br>
				<label>Country: <input type="text"></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>
	
	<div id="modal25" title="Update Supplier Address">
		<form id='modal25_form' autocomplete="off">
			<fieldset>
				<label>Address: <textarea></textarea></label><br>
				<label>Pincode: <input type="number"></label><br>
				<label>City: <input type="text" required></label><br>
				<label>State: <input type="text"></label><br>
				<label>Country: <input type="text"></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>
	
	<div id="modal26" title="Payment Details">
		<form id='modal26_form' autocomplete="off">
			<fieldset>
				<label>Paid by: <input type='text' required readonly='readonly'></label><br>
				<label>Total Amount: Rs. <input type="number" required readonly='readonly' step='any'></label><br>
				<label>Amount Paid: Rs. <input type="number" required step='any'></label><br>
				<label>Due Date: <input type="text"></label><br>
				<label>Mode of Payment: <input type="text"></label><br>
				<label>Status: <input type="text"></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>
	
	<div id="modal27" title="Order product">
		<form id='modal27_form' autocomplete="off">
			<fieldset>
				<label>Product Name: <input type='text' required readonly='readonly'></label><br>
				<label>Make: <input type="text" required readonly='readonly'></label><br>
				<label>Cost Price: Rs. <input type="number" step='any' readonly='readonly'></label><br>
				<label>Quantity: <input type="number" step='any' requried></label><br>
				<label>Supplier: <input type="text" required></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<div id="modal28" title="Payment Details">
		<form id='modal28_form' autocomplete="off">
			<fieldset>
				<label>Paid to: <input type='text' required readonly='readonly'></label><br>
				<label>Total Amount: Rs. <input type="number" required step='any'></label><br>
				<label>Amount Paid: Rs. <input type="number" required step='any'></label><br>
				<label>Due Date: <input type="text"></label><br>
				<label>Mode of Payment: <input type="text"></label><br>
				<label>Status: <input type="text"></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>
	
	<div id="modal29" title="Payment Details">
		<form id='modal29_form' autocomplete="off">
			<fieldset>
				<label>Bill Id: <input type='text' readonly='readonly'></label><br>
				<label>Date: <input type="text" readonly='readonly'></label><br>
				<label>Mode of Payment: <input type="text"></label><br>
				<label>Due Date: <input type="text"></label><br>
				<label>Closing Notes: <textarea></textarea></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>
	
	<div id="modal30" title="Add Receipt">
		<form id='modal30_form' autocomplete="off">
			<fieldset>
				<label>Receipt Id: <input type='text' required></label><br>
				<label>Account: <input type="text" required></label><br>
				<label>Receipt Amount: Rs. <input type="number" min='0' step='any' required></label><br>
				<label>Balance <input type="text" readonly='readonly'></label><br>
				<input type="hidden" name='type'>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>
	
	<div id="modal31" title="Delete Receipt">
		<form id='modal31_form' autocomplete="off">
			<fieldset>
				<label>Receipt Id: <input type='text' required></label><br>
				<label>Account: <input type="text" readonly='readonly' required></label><br>
				<label>Balance <input type="text" readonly='readonly'></label><br>
				<label>Receipt Amount: Rs. <input type="number" step='any' readonly='readonly' required></label><br>
				<input type="submit" value='Delete' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<div id="modal32" title="Add task">
		<form id='modal32_form' autocomplete="off">
			<fieldset>
				<label>Task: <input type='text' required></label><br>
				<label>Assignee: <input type="text"></label><br>
				<label>Due time: <input type="text"></label><br>
				<label>Status: <input type="text" required value='pending'></label><br>
				<input type='hidden'>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<div id="modal33" title="Update task">
		<form id='modal33_form' autocomplete="off">
			<fieldset>
				<label>Task: <input type='text' readonly="readonly" required></label><br>
				<label>Assignee: <input type="text"></label><br>
				<label>Due time: <input type="text"></label><br>
				<label>Status: <input type="text" required value='pending'></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>
	
	<div id="modal35" title="Add Store Area">
		<form id='modal35_form' autocomplete="off">
			<fieldset>
				<label>Name: <input type='text' required></label><br>
				<label>Owner: <input type='text'></label><br>
				<label id='modal35_attributes'></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<div id="modal36" title="Add appointment">
		<form id='modal36_form' autocomplete="off">
			<fieldset>
				<label>Customer: <input type='text' required></label><br>
				<label>Assignee: <input type="text"></label><br>
				<label>Schedule: <input type="text" required></label><br>
				<label>Hours: <input type="number" required value='1' step='any'></label><br>
				<label>Notes: <textarea></textarea></label><br>
				<label>Status: <input type="text" required value='pending'></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<div id="modal37" title="Update appointment">
		<form id='modal37_form' autocomplete="off">
			<fieldset>
				<label>Customer: <input type='text' required></label><br>
				<label>Assignee: <input type="text"></label><br>
				<label>Notes: <textarea></textarea></label><br>
				<label>Status: <input type="text" required value='pending'></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>
	
	<div id="modal38" title="Update sale price">
		<form id='modal38_form' autocomplete="off">
			<fieldset>
				<label>Default Sale Price: Rs. <input type="number" step='any' required></label><br>
				<label id='modal38_billings'></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<div id="modal39" title="Add loan">
		<form id='modal39_form' autocomplete="off">
			<fieldset>
				<label>Type: <input type='text' required></label><br>
				<label>Account: <input type="text" required></label><br>
				<label>Loan amount: Rs. <input type='number' min='0' required step='any'></label><br>
				<label>Date initiated: <input type="text" required></label><br>
				<label>Repayment method: <input type="text" required></label><br>
				<label>Interest rate(%): <input type="number" step='any' min='0'></label><br>
				<label>Interest period(in days): <input type="number" min='0'></label><br>
				<label>Interest is: <input type="text"></label><br>
				<label>EMI: Rs. <input type="number" step='any' min='0'></label><br>
				<label>EMI period(in days): <input type="number" min='0'></label><br>
				<label>Number of EMIs: <input type="number" min='0'></label><br>
				<label id='modal39_attributes'></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<div id="modal40" title="Discard item">
		<form id='modal40_form' autocomplete="off">
			<fieldset>
				<label>Item: <input type='text' required></label><br>
				<label>Batch: <input type="text" required></label><br>
				<label>Quantity: <input type='number' required></label><br>
				<label>Storage: <input type='text'></label><br>
				<label>Reason: <textarea></textarea></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<div id="modal41" title="Close Payments">
		<form id='modal41_form' autocomplete="off">
			<fieldset>
				<label>Account: <input type='text' readonly='readonly' required></label><br>
				<label>Balance: Rs. <input type="text" readonly='readonly' required></label><br>
				<label>Counter Payment <input type='number' step='2' value='0' required></label><br>
				<label>Closing Notes: <textarea></textarea></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<div id="modal42" title="Bill Type">
		<form id='modal42_form' autocomplete="off">
			<fieldset>
				<label>Bill Type: <input type='text' required></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>
	
	<div id="modal43" title="Add task">
		<form id='modal43_form' autocomplete="off">
			<fieldset>
				<label>Phase: <input type='text' required></label><br>
				<label>Task: <input type="text"></label><br>
				<label>Assignee: <input type="text"></label><br>
				<label>Due time: <input type="text"></label><br>
				<label>Status: <input type="text" required value='pending'></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>
	
	<div id="modal44" title="Share">
		<form id='modal44_form' autocomplete="off">
			<fieldset>
				<label>Choose Client: <input type='text' required value='gmail'></label><br>
				<label>Recipient Email: <input type="text"></label><br>
				<label>Recipient Name: <input type="text" readonly='readonly'></label><br>
				<input type="submit" value='Send' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<div id="modal45" title="Add new loyalty program">
		<form id='modal45_form' autocomplete="off">
			<fieldset>
				<label>Name: <input type='text' required></label><br>
				<label>Type: <input type='text' required></label><br>
				<label>Tier: <input type='text' required></label><br>
				<label title='Minimum points for tier qualification'>Tier Criteria(min.): <input type="number" step='any' required></label><br>
				<label title='Maximum points for tier qualification'>Tier Criteria(max.): <input type="number" step='any' required></label><br>
				<label title='Minimum points to redeem'>Redemption Criteria(max.): <input type="number" step='any'></label><br>
				<label title='Points per rupee spent'>Points Addition: <input type="number" step='any' required></label>
				<label title='% discount on purchases'>Discount: <input type="number" step='any'></label><br>
				<label title='Cashback per earned point'>Cashback: Rs. <input type="number" step='any'></label><br>
				<label title='Reward product on fulfilment of tier criteria'>Reward Product: <input type="text"></label><br>
				<label>Status: <input type="text" requried></label><br>
				<label id='modal45_attributes'></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>
	
	<div id="modal46" title="Update loyalty program">
		<form id='modal46_form' autocomplete="off">
			<fieldset>
				<label title='Minimum points for tier qualification'>Tier Criteria(min.): <input type="number" step='any' required></label><br>
				<label title='Maximum points for tier qualification'>Tier Criteria(max.): <input type="number" step='any' required></label><br>
				<label title='Minimum points to redeem'>Redemption Criteria(max.): <input type="number" step='any'></label><br>
				<label title='Points per rupee spent'>Points Addition: <input type="number" step='any' required></label>
				<label title='% discount on purchases'>Discount: <input type="number" step='any'></label><br>
				<label title='Cashback per earned point'>Cashback: Rs. <input type="number" step='any'></label><br>
				<label title='Reward product on fulfilment of tier criteria'>Reward Product: <input type="text"></label><br>
				<label>Status: <input type="text" requried></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<div id="modal47" title="Add service request">
		<form id='modal47_form' autocomplete="off">
			<fieldset>
				<label>Request Id: <input type="text" readonly='readonly'></label><br>
				<label>Customer: <input type='text' required></label><br>
				<label>Reported By: <textarea required readonly="readonly"></textarea></label><br>
				<label>Problem Type: <input type='text'></label><br>
				<label>Problem Detail: <textarea required></textarea></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>
	
	<div id="modal48" title="Add solution">
		<form id='modal48_form' autocomplete="off">
			<fieldset>
				<label>Issue Id: <input type="text" readonly='readonly'></label><br>
				<label>Solution Detail: <textarea required></textarea></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<div id="modal49" title="Add issue">
		<form id='modal49_form'>
			<fieldset>
				<label>Issue Id: <input type="text" readonly='readonly'></label><br>
				<label>Short Description: <textarea required></textarea></label><br>
				<label>Detail: <textarea></textarea></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>
	
	<div id="modal50" title="Sending Mails">
		<a href='' id='modal50_sendmail'>Send mails through Gmail</a>
	</div>
	
	<div id="modal51" title="Merging Records">
		Merging records.
		Please don't close this window immediately.
	</div>
	
	
	<div id="modal53" title="Scheme to customer">
		<table id='modal53_table'>
		</table>
	</div>
	
	<div id="modal54" title="Scheme from supplier">
		<table id='modal54_table'>
		</table>
	</div>

	<div id="modal55" title="Server Db backup">
	</div>

	<div id="modal57" title="Pricing History">
		Previous Bills
		<table id='modal57_bill_table'>
		</table>
		<br>
		Previous Quotations
		<table id='modal57_quot_table'>
		</table>	
	</div>

	<div id="modal83" title="Store Inventory">
		<table id='modal83_inventory_table' class="plain_table">
		</table>
	</div>
	
	<div id="modal84" title="Design Preview">
		<div id='modal84_preview'></div>
	</div>

	<div id="modal101" title="Email Document">
		<form id='modal101_form' autocomplete="off">
			<fieldset>
				<label>To: <input type='text' readonly="readonly"></label><br>
				<label>Email: <textarea required title='Separate email IDs with semicolon(;)'></textarea></label><br>
				<label>Subject: <textarea></textarea></label><br>
				<input type='hidden'>
				<input type="submit" value='Send' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<div id="modal102" title="Re-assign">
		<form id='modal102_form' autocomplete="off">
			<fieldset>
				<label>Request Id: <input type='text' readonly="readonly"></label><br>
				<label>Assignee: <input type='text' required></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<div id="modal103" title="Close service request">
		<form id='modal103_form' autocomplete="off">
			<fieldset>
				<label>Request Id: <input type='text' readonly="readonly"></label><br>
				<label>Closing notes: <textarea required></textarea></label><br>
				<label>Status: <input type='text' required></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<div id="modal104" title="Close machine service">
		<form id='modal104_form' autocomplete="off">
			<fieldset>
				<label>Machine: <input type='text' readonly="readonly"></label><br>
				<label>Closing notes: <textarea required></textarea></label><br>
				<label>Status: <input type='text' required></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<div id="modal105" title="Add Schedule">
		<form id='modal105_form' autocomplete="off">
			<fieldset>
				<label>Name: <input type='text'></label><br>
				<label>Details: <textarea required></textarea></label><br>
				<label>Start Time: <input type='text' required></label><br>
				<label>End Time: <input type='text' required></label><br>
				<label>Status: <input type='text' required value='inactive'></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<div id="modal106" title="Add Ledger Entry">
		<form id='modal106_form' autocomplete="off">
			<fieldset>
				<label>Account: <input type='text' name='account' required></label><br>
				<label>Date: <input type='text' name='date' required></label><br>
				<label>Particulars: <textarea name='particulars' required></textarea></label><br>
				<label>Type: <input type='text' name='type' required></label><br>
				<label>Amount: <input type='number' name='amount' step='2' required></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>
	
	<div id="modal107" title="Update Schedule">
		<form id='modal107_form' autocomplete="off">
			<fieldset>
				<label>Name: <input type='text'></label><br>
				<label>Details: <textarea required></textarea></label><br>
				<label>Start Time: <input type='text' required></label><br>
				<label>End Time: <input type='text' required></label><br>
				<label>Status: <input type='text' required></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<div id="modal108" title="Workflow Assignees (Record Level)">
		<form id='modal108_form' autocomplete="off">
			<fieldset>
				<label>Access Type: <input type='text' required></label><br>
				<label>User Field: <input required type='text'></label><br>
				<label>User: <input type='text'></label><br>
				<label>User Field: <input type='text'></label><br>
				<label>Criteria Field: <input type='text'></label><br>
				<label>Criteria Value: <input type='text'></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<div id="modal109" title="Workflow Assignees">
		<form id='modal109_form' autocomplete="off">
			<fieldset>
				<label>Access Type: <input type='text' required></label><br>
				<label>User Field: <input required type='text'></label><br>
				<label>User: <input type='text'></label><br>
				<label>User Field: <input type='text'></label><br>
				<label>Criteria Field: <input type='text'></label><br>
				<label>Criteria Value: <input type='text'></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<div id="modal110" title="Add to Inventory">
		<form id='modal110_form' autocomplete="off">
			<fieldset>
				<label>Manufacturing Date: <input type='text'></label><br>
				<label>Expiry Date: <input type='text'></label><br>
				<label>Cost Price: <input type='text'></label><br>
				<label>Sales Price: <input type='text'></label><br>
				<label>Store: <input type='text'></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>
	
	<div id="modal111" title="Log location">
		<form id='modal111_form' autocomplete="off">
			<fieldset>
				<label>Location: <textarea></textarea></label><br>
				<label>Name: <textarea readonly='readonly'></textarea></label><br>
				<label>Time: <input type="text" readonly='readonly'></label><br>
				<label>Latitude: <input type="text" readonly='readonly'></label><br>
				<label>Longitude: <input type="text" readonly='readonly'></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<div id="modal112" title="Add new product">
		<form id='modal112_form' autocomplete="off">
			<fieldset>
				<label>Name: <input type="text" required></label><br>
				<label>Make: <input type="text"></label><br>
				<label>Description: <textarea></textarea></label><br>
				<label>Picture: <output></output>
								<input type='file' style='display:none'>
								<input type='button' class='generic_red_icon' value='Select Picture'></label><br>
				<label>Tax (%): <input type="number" step='any'></label><br>
				<label>Cost Price: <input type="number" step='any'></label><br>
				<label>Sale Price: <input type="number" step='any'></label><br>
				<label id='modal112_attributes'></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<div id="modal113" title="Add Store Area">
		<form id='modal113_form' autocomplete="off">
			<fieldset>
				<label>Name: <input type='text' required></label><br>
				<label>Type: <input type='text' required></label><br>
				<label>Parent: <input type="text"></label><br>
				<label>Owner: <input type="text"></label><br>
				<label>Length: <input type="number"></label><br>
				<label>Breadth: <input type="number"></label><br>
				<label>Height: <input type="number"></label><br>
				<label>Unit: <input type="text"></label><br>
				<label id='modal113_attributes'></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<div id="modal114" title="Add new product">
		<form id='modal114_form' autocomplete="off">
			<fieldset>
				<label>SKU: <input type="text" required></label><br>
				<label>Name: <textarea></textarea></label><br>
				<label>Brand: <textarea></textarea></label><br>
				<label>Picture: <output></output>
								<input type='file' style='display:none'>
								<input type='button' class='generic_red_icon' value='Select Picture'></label><br>
				<label>Tax (%): <input type="number" step='any'></label><br>
				<label>Length: <input type="number" step='any'></label><br>
				<label>Breadth: <input type="number" step='any'></label><br>
				<label>Height: <input type="number" step='any'></label><br>
				<label>Volume: <input type="number" step='any'></label><br>
				<label>Unit: <input type="text"></label><br>
				<label>Weight(in gms): <input type="number" step='any'></label><br>
				<label>Packing: <textarea></textarea></label><br>
				<label>Bar Code: <input type="text"></label>
				<label><input type='checkbox'>Auto generate</label><br>
				<label id='modal114_attributes'></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<a href='#modal115' data-toggle="modal" id='modal115_link'></a>
	<div id="modal115" class="modal fade draggable-modal" role="basic" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <form id='modal115_form' autocomplete="off">                               
	            	<div class="modal-header">
                    	<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                    	<h4 class="modal-title">Delete Confirmation</h4>
                	</div>
	                <div class="modal-body">
		               <div class="scroller" style="height:100px;" data-always-visible="1" data-rail-visible1="1">
		         			Are you sure, you want to delete this record?
					      </div>
		             </div>
	             	<div class="modal-footer">
	               	<button type="submit" class="btn red" form='modal115_form' name='yes'>Yes</button>
	               	<button type="button" class="btn green" name='no' form="modal115_form" data-dismiss='modal'>No</button>
	             	</div>
                </form>
            </div>
        </div>
    </div>

	<div id="modal116" title="Map Barcode">
		<form id='modal116_form' autocomplete="off">
			<fieldset>
				<label>Barcode: <input type='text' readonly='readonly' required name='barcode'>
				<img src='./images/barcode.png' id='modal116_barcode_img' class='barcode_icon'>
				</label><br>
				<label>SKU: <input type="text" required name='sku'></label><br>
				<label>Name: <textarea name='name'></textarea></label><br>
				<input type='hidden' name='id'>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<div id="modal117" title="Add task">
		<form id='modal117_form' autocomplete="off">
			<fieldset>
				<label>Task: <input type='text' required></label><br>
				<label>Details: <textarea></textarea></label><br>
				<label>Assignee: <input type="text"></label><br>
				<label>Due time: <input type="text"></label><br>
				<label>Status: <input type="text" required value='pending'></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<div id="modal118" title="New order">
		<form id='modal118_form' autocomplete="off">
			<fieldset>
				<label>Phone: <input type='text' name='phone'></label><br>
				<label>Name: <input type='text' name='name' required></label><br>
				<label>Credit: Rs. <input type="number" name='credit' step='any' readonly="readonly"></label><br>
				<label>Address: <input type='text' name='address'></label><br>
				<label>Notes: <textarea name='notes'></textarea></label><br>
				<label>Email: <textarea name='email'></textarea></label><br>
				<input type='hidden' name='new_old'>
				<input type='hidden' name='acc_name'>
				<input type='hidden' name='customer_id'>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<div id="modal119" title="Assignee">
		<form id='modal119_form' autocomplete="off">
			<fieldset>
				<label>Name: <input type='text' required></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<div id="modal120" title="Add new batch">
		<form id='modal120_form' autocomplete="off">
			<fieldset>
				<label>Item: <input type="text" required></label><br>
				<label>Batch: <input type='text' required></label><br>
				<label>Expiry: <input type="text" required></label><br>
				<label>MRP: Rs. <input type="number" step='any' required min=".1"></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>
	
	<div id="modal121" title="Offline Storage Deletion">
		Any unsynced data will be lost if you delete offline storage. Please re-enter your password to continue.
		<br>
		<form id='modal121_form' autocomplete="off">
			<input type="password" name='pass' required>
			<input type="submit" class='modal_submit' value='Delete'>
		</form>
	</div>

	<div id="modal122" title="Update Inventory">
		<form id='modal122_form' autocomplete="off">
			<fieldset>
				<label>Item: <input type="text" required readonly="readonly"></label><br>
				<label>Fresh: <input type='number' step='any' required></label><br>
				<label>Hireable: <input type="number" step='any' required></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<div id="modal123" title="Add LetterHead">
		<form id='modal123_form' autocomplete="off">
			<fieldset>
				<label>Name: <input type="text" required></label><br>
				<label>Date: <input type="text"></label><br>
				<label>To: <textarea></textarea></label><br>
				<label>Subject: <textarea></textarea></label><br>
				<label>Salutation: <textarea></textarea></label><br>
				<label>Content: <textarea></textarea></label><br>
				<label>Signature: <textarea></textarea></label><br>
				<label>Footer: <textarea></textarea></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>
	
	<div id="modal124" title="Send SMS">
		<form id='modal124_form' autocomplete="off">
			<fieldset>
				<label>To: <input type='text' name='to' readonly="readonly"></label><br>
				<label>Phone: <input type='text' name='phone' required></label><br>
				<label>SMS: <textarea name='sms'></textarea></label><br>
				<input type='hidden'>				
				<input type="submit" value='Send' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<div id="modal125" title="List of suppliers">
		<form id='modal125_form' autocomplete="off">
			<fieldset>
				<label id='modal125_suppliers'></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<div id="modal126" title="Priority suppliers">
		Scores of applicable suppliers
		<br>
		<form id='modal126_form' autocomplete="off">
			<fieldset>
				<label id='modal126_suppliers'></label><br>
				<input type="button" name='cancel' value='Cancel' class='modal_submit'>
				<input type="button" name='assign' value='Assign' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<div id="modal127" title="Print Laundry Tags">
		Do you want to print tags?
		<br>
		<br>
		<br>		
		<form id='modal127_form' autocomplete="off">
			<fieldset>
				<input type="button" value='Yes' class='modal_submit'>
				<input type="button" value='No' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<div id="modal128" title="Add Order">
		<form id='modal128_form' autocomplete="off">
			<fieldset>
				<label>AWB #: <input name='awb' type="text" required></label><br>
				<label>Type: <input name='type' type="text"></label><br>
				<label>Order #: <input name='order' type='text'></label><br>
				<label>Channel: <input name='channel' type='text'></label><br>
				<label>Customer Name: <input name='merchant' type='text'></label><br>
				<label>Consignee: <input name='shipto' type='text'></label><br>
				<label>Address: <textarea name='address'></textarea></label><br>
				<label>City: <input name='city' type='text'></label><br>
				<label>Pincode: <input name='pincode' type='text'></label><br>
				<label>Phone: <input name='phone' type='text'></label><br>
				<label>Weight: <input name='weight' type='text'></label><br>
				<label>Declared Value: <input name='d_value' type='number'></label><br>
				<label>Collectable Value: <input name='c_value' type='number'></label><br>
				<label>Return Address: <input name='raddress' type='text'></label><br>
				<input type="submit" value='Save' name='save' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<div id="modal129" title="Add DRS Items">
		<form id='modal129_form' autocomplete="off">
			<fieldset>
				<label>Address: <input name='address' type="text"></label><br>
				<label>City: <input name='city' type="text"></label><br>
				<label>Pincode: <input name='pincode' type='text'></label><br>
				<input type="submit" value='Save' name='save' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<div id="modal130" title="Delete Cache">
		Do you want to cleared browser cache? (There will be no impact on your saved data.) 
		<br>
		<b>Please refresh the browser again after the cache is cleared.</b>
		<br>
		<form id='modal130_form' autocomplete="off">
			<input type="submit" class='modal_submit' value='Delete'>
		</form>
	</div>

	<div id="modal131" title="Issue GRN without QC">
		<form id='modal131_form' autocomplete="off">
			<fieldset>
				<label>Order #: <input readonly='readonly' name='order_num' type="text"></label><br>
				<label>Order Quantity: <input readonly='readonly' name='o_quantity' type="number" step='any'></label><br>
				<label>Received Quantity: <input name='r_quantity' required type='number' step='any'></label><br>
				<input type="button" value='Print & Save' name='print' class='modal_submit'>
				<input type="submit" value='Save' name='save' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<div id="modal132" title="Refresh Tab">
		Any unsaved data will be lost. Do you want to carry on?
		<br>
		<form id='modal132_form' autocomplete="off">
			<input type="submit" class='modal_submit' value='Yes'>
			<input type="button" class='modal_submit' value='No'>
		</form>
	</div>

	<div id="modal133" title="Analyze Order">
		<label id='modal133_order_id'>Order #:</label><br>	
		<table id='modal133_item_table'>
		</table>
		<br>
		<br>
		<form id='modal133_form' autocomplete="off">
			<label>Bill Type: <input type='text' required></label><br>
			<input type="submit" class='modal_submit' value='Bill'>
			<input type="button" class='modal_submit' value='Cancel'>
		</form>				
	</div>
	
	<div id="modal134" title="Follow-up Details">
		<form id='modal134_form' autocomplete="off">
			<fieldset>
				<label>Date: <input readonly='readonly' name='date' required type="text"></label><br>
				<label>Response: <input name='response' autofocus required type="text"></label><br>
				<label>Details: <textarea name='details'></textarea></label><br>
				<label>Next Followup Date: <input name='next_date' type="text"></label><br>
				<input type="submit" value='Save' name='save' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<div id="modal135" title="Set User Preferences">
		<form id='modal135_form' autocomplete="off">
			<fieldset>
				<label>Type: <input name='type' required readonly='readonly' class='dblclick_editable' type="text"></label><br>
				<label>Name: <input name='name' required type="text"></label><br>
				<label>Display Name: <textarea name='display_name' required></textarea></label><br>
				<label>Value: <textarea name='value'></textarea></label><br>
				<input type="submit" value='Save' name='save' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<div id="modal136" title="Add form/report">
		<form id='modal136_form' autocomplete="off">
			<fieldset>
				<label>Type: <input name='type' required readonly='readonly' class='dblclick_editable' type="text"></label><br>
				<label>Name: <input name='name' required type="text"></label><br>
				<label>Display Name: <textarea name='display_name' required></textarea></label><br>
				<label>Tables: <textarea name='tables'></textarea></label><br>
				<input type="submit" value='Save' name='save' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<div id="modal137" title="View Bills">
		<br>		
		<table id='modal137_item_table'>
		</table>
		<br>
		<br>
		<form id='modal137_form'>
			<input type="button" class='modal_submit' id='modal137_cancel' value='Cancel' onclick="$('#modal137').dialog('close');">
		</form>	
	</div>

	<div id="modal138" title="Import Sale Orders">
		<form id='modal138_form' autocomplete="off">
			<fieldset>
				<input type="button" value='Download import template' class='modal_submit'>
				<br>
				<br>
				<br>
				<b>Import pre-filled template</b><br>
				Channel: <input type="text" required><br>
				<input type="file" required value='Select file' accept=".csv" style='display:none'>
				<input type='button' class='generic_red_icon' value='Select File'>
				<br>
				<output name='selected_file'></output><br>
				<input type="submit" value='Import' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<div id="modal139" title="Assign Barcode">
		<form id='modal139_form' autocomplete="off">
			<fieldset>
				<label>SKU: <input type="text" readonly="readonly" name='sku'></label><br>
				<label>Name: <textarea name='name' readonly="readonly"></textarea></label><br>
				<label>Barcode: <input type='text' required name='barcode'>
				<img src='./images/barcode.png' id='modal139_barcode_img' class='barcode_icon'>
				</label><br>
				<label>Auto-generate: <input type='checkbox' name='check'></label>
				<input type='hidden' name='id'>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<div id="modal140" title="Import Purchase Orders">
		<form id='modal140_form' autocomplete="off">
			<fieldset>
				<input type="button" value='Download import template' class='modal_submit'>
				<br>
				<br>
				<br>
				<b>Import pre-filled template</b><br>
				<input type="file" required value='Select file' accept=".csv" style='display:none'>
				<input type='button' class='generic_red_icon' value='Select File'>
				<br>				
				<output name='selected_file'></output><br>
				<input type="submit" value='Import' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<div id="modal141" title="Product Ready">
		<form id='modal141_form' autocomplete="off">
			<fieldset>
				<label>Quantity: <input type='number' step='any' name='quantity' readonly="readonly"></label><br>
				<label>Storage: <input type='text' name='storage' required></label><br>
				<label>Batch: <input type='text' name='batch' required></label><br>
				<label>Sale Price: <input type='text' name='price' required></label><br>
				<label id='modal141_raw'></label><br>
				<input type='hidden' name='new_batch'>
				<input type="submit" class='modal_submit' name='save' value='Save'>
				<input type="button" class='modal_submit' name='cancel' value='Cancel'>
			</fieldset>
		</form>
	</div>

	<div id="modal142" title="Add new batch">
		<form id='modal142_form' autocomplete="off">
			<fieldset>
				<label>Item: <input type="text" required></label><br>
				<label>Batch: <input type='text' required></label><br>
				<label>Expiry: <input type="text"></label><br>
				<label>MRP: Rs. <input type="number" step='any'></label><br>
				<label>Cost Price: Rs. <input type="number" step='any'></label><br>
				<label>Sale Price: Rs. <input type="number" step='any'></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<div id="modal143" title="Update Inventory">
		<form id='modal143_form' autocomplete="off">
			<fieldset>
				<label>Item: <input type="text" required readonly="readonly"></label><br>
				<label>Batch: <input type="text" required readonly="readonly"></label><br>
				<label>Fresh: <input type='number' step='any' required></label><br>
				<label>In-Use: <input type="number" step='any' required></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<div id="modal144" title="Add document">
		<form id='modal144_form' autocomplete="off">
			<fieldset>
				<label>Document Name: <input type="text"></label><br>
				<label>File: <a id='modal144_url'>link</a>
						<input type="file"></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<div id="modal145" title="Update Contact">
		<form id='modal145_form' autocomplete="off">
			<fieldset>
				<label>Name: <input readonly='readonly' type='text' required></label><br>
				<label>Phone: <input type="tel"></label><br>
				<label>Email: <input type="text"></label><br>
				<label>Address: <textarea></textarea></label><br>
				<label>Pincode: <input type="number"></label><br>
				<label>City: <input type="text"></label><br>
				<label>State: <input type="text"></label><br>
				<label id='modal145_attributes'></label><br>
				<input type="hidden" name='id'>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<div id="modal146" title="Add Test Results">
		<form id='modal146_form' autocomplete="off">
			<fieldset>
				<label>Date: <input type="text" required readonly='readonly'></label><br>
				<label>Result: <input type="text" required></label><br>
				<label>Details: <textarea></textarea></label><br>
				<label>Document: <a id='modal146_url'>link</a>
						<input type="file"></label><br>
				<label>Next Test Date: <input type="text"></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<div id="modal147" title="Return Items">
		<form id='modal147_form' autocomplete="off">
			<fieldset>
				<label>Date: <input type="text" required readonly='readonly'></label><br>
				<label>Item: <input type="text" required></label><br>
				<label>Quantity: <input type='number' required></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>
	
	<div id="modal148" title="Import Outstation Orders">
		<form id='modal148_form' autocomplete="off">
			<fieldset>
				<input type="button" value='Download import template' class='modal_submit'>
				<br>
				<br>
				<br>
				<b>Import pre-filled template</b><br>
				<input type="file" required value='Select file' accept=".csv" style='display:none'>
				<input type='button' class='generic_red_icon' value='Select File'>
				<br>				
				<output name='selected_file'></output><br>
				<input type="submit" value='Import' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<div id="modal149" title="Import Manifest">
		<form id='modal149_form' autocomplete="off">
			<fieldset>
				<input type="button" value='Download import template' class='modal_submit'>
				<br>
				<br>
				<br>
				<b>Import pre-filled template</b><br>
				<label>Channel: <input type="text" required></label><br>
				<label>Type: <input type="text" required></label><br>
				<input type="file" required value='Select file' accept=".csv" style='display:none'>
				<input type='button' class='generic_red_icon' value='Select File'>
				<br>
				<output name='selected_file'></output><br>
				<input type="submit" value='Import' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<div id="modal150" title="Scan Picked Items">
		<form id='modal150_form' autocomplete="off">
			<fieldset>
				<label>Scan Barcode: <input type="text" name='barcode' required></label>
				<input type="submit" class='submit_hidden'>
				<input type="button" value='Save Pickings' name='save' class='modal_submit'>
			</fieldset>
		</form>
		<table id='modal150_table' class='plain_table'>
		</table>		
	</div>

	<div id="modal151" title="Bag Number">
		<form id='modal151_form' autocomplete="off">
			<fieldset>
				<label>Order #: <input type="text" name='order_num' readonly='readonly' required></label>
				<label>Bag #: <input type="text" name='bag_num' readonly='readonly' required></label>
				<input type="submit" value='Close' name='save' class='modal_submit'>
			</fieldset>
		</form>
	</div>
	
	<div id="modal152" title="Scan item to place">
		<form id='modal152_form' autocomplete="off">
			<fieldset>
				<label>Scan Barcode: <input type="text" name='barcode' required></label>
				<input type="submit" class='submit_hidden'>
				<input type="button" value='Save Placements' name='save' class='modal_submit'>
			</fieldset>
		</form>
		<table id='modal152_table' style='display:none;'>
		<table id='modal152_table2' class='plain_table'>
		</table>		
	</div>

	<div id="modal153" title="Close Sale Lead">
		Are you sure you want to close this lead?
		<br>
		<br>
		<form id='modal153_form' autocomplete="off">
			<fieldset>
				<input type="submit" class='modal_submit' name='yes' value='Yes'>
				<input type="button" class='modal_submit' name='no' value='No'>
			</fieldset>
		</form>
	</div>

	<div id="modal154" title="View Invoices">
		<br>		
		<table id='modal154_item_table'>
		</table>
		<br>
		<br>
		<form id='modal154_form'>
			<input type="button" class='modal_submit' id='modal154_cancel' value='Cancel' onclick="$('#modal154').dialog('close');">
		</form>	
	</div>

	<div id="modal155" title="Add Receipt">
		<form id='modal155_form' autocomplete="off">
			<fieldset>
				<label>Receipt Id: <input type='text' name='receipt_id' readonly="readonly" required></label><br>
				<label>Date: <input type="text" name='date' required></label><br>
				<label>Account: <input type="text" name='account' required></label><br>
				<label>Narration: <textarea name='narration'></textarea></label><br>
				<label>Receipt Amount: Rs. <input type="number" min='0' step='any' name='amount' required></label><br>
				<label>Balance <input type="text" readonly='readonly' name='balance'></label><br>
				<input type="hidden" name='type'>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>
	
	<div id="modal156" title="Add new batch">
		<form id='modal156_form' autocomplete="off">
			<fieldset>
				<label>Item: <input type="text" required></label><br>
				<label>Batch: <input type='text' required></label><br>
				<label>Manufacturing: <input type="text"></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<div id="modal157" title="Item Rejection">
		Are you sure, you want to reject this item?
		<br>
		<br>
		<form id='modal157_form' autocomplete="off">
			<fieldset>
				<label>Reason for Rejection: <input type="text" name='reason' required></label> 
				<input type="submit" value='Yes' name='yes' class='modal_submit'>
				<input type="button" value='No' name='no' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<div id="modal158" title="Update Invoice">
		Are you sure, you want to update the invoice to proceed with the dispatch of packed items?
		<br>
		<br>
		<br>		
		<form id='modal158_form' autocomplete="off">
			<fieldset>
				<input type="button" value='Yes' class='modal_submit'>
				<input type="button" value='No' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<div id="modal159" title="Analyze Order">
		<label id='modal159_order_id'>Order #:</label><br>	
		<table id='modal159_item_table'>
		</table>
		<br>
		<br>
		<form id='modal159_form' autocomplete="off">
			<input type="submit" class='modal_submit' name='bill' value='Bill'>
			<input type="button" class='modal_submit' name='cancel' value='Cancel'>
		</form>				
	</div>

	<div id="modal160" title="Import Unsynced Data">
		<form id='modal160_form' autocomplete="off">
			<fieldset>
				<br>
				<br>				
				<input type="file" required value='Select file' accept=".csv" style='display:none'>
				<input type='button' class='generic_red_icon' value='Select File'>
				<br>
				<output name='selected_file'></output><br>
				<input type="submit" value='Import' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<div id="modal161" title="Add new customer">
		<form id='modal161_form' autocomplete="off">
			<fieldset>
				<label>Category: <input type='text' class='modal161_attributes' name='Category'></label><br>
				<label>Sub-Category: <input type='text' class='modal161_attributes' name='Sub-Category'></label><br>
				<label>Organization Name: <input type='text' required></label><br>
				<label>Phone: <input type="tel"></label><br>
				<label>Email: <input type="text"></label><br>
				<label>Address: <textarea></textarea></label><br>
				<label>Pincode: <input type="number"></label><br>
				<label>City: <input type="text"></label><br>
				<label>Website: <input type="text" class='modal161_attributes' name='Website'></label><br>
				<label>Contact Person: <input type="text" class='modal161_attributes' name='Contact'></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>
	
	<div id="modal162" title="Close Picking">
		<form id='modal162_form' autocomplete="off">
			<fieldset>
				<label>SKU: <input type='text' readonly='readonly' name='sku'></label><br>
				<label>Item Name: <textarea readonly='readonly' name='item_name'></textarea></label><br>
				<label>Batch: <input type='text' readonly='readonly' required name='batch'></label><br>
				<label>Storage: <input type="text" readonly='readonly' required name='storage'></label><br>
				<label>To Pick: <input type="text" readonly='readonly' name='topick'></label><br>
				<label>Picked: <input type="text" name='picked'></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>
	
	<div id="modal163" title="Mass Put-away">
		<form id='modal163_form' autocomplete="off">
			<fieldset>
				<label>SKU: <input type='text' readonly='readonly' name='sku'></label><br>
				<label>Batch: <input type='text' readonly='readonly' required name='batch'></label><br>
				<label>Storage: <input type="text" required name='storage'></label><br>
				<label>To Place: <input type="text" readonly='readonly' name='toplace'></label><br>
				<label>Placed: <input type="text" name='placed'></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>
	
	<div id="modal164" title="Import Aborted">
		<form id='modal164_form' autocomplete="off"></form>
		<div id='modal164_div'></div>
	</div>

	<a href='#modal165' data-toggle="modal" id='modal165_link'></a>
	<div id="modal165" class="modal fade draggable-modal" role="basic" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-full">
            <div class="modal-content">
                <form id='modal165_form' autocomplete="off">                               
	            	<div class="modal-header">
                    	<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                    	<h4 class="modal-title">Function</h4>
                	</div>
	                <div class="modal-body">
		               <div class="scroller" style="height:180px;" data-always-visible="1" data-rail-visible1="1">
		                 <div class="row">
									<div class="col-sm-12 col-md-4">Function Name</div>
					     			<div class="col-sm-12 col-md-8"><input type='text' form='modal165_form' name='name'></div>
					     		</div>
		                  <div class="row">
								    <div class="col-sm-12 col-md-12">Function Definition</div>
					     			<div class="col-sm-12 col-md-12"><textarea form='modal165_form' name='def'></textarea></div>
					     		</div>
		               </div>
		             </div>
	             	<div class="modal-footer">
	               	<input type="submit" class="btn green" form='modal165_form' name='save' value='Save'>
	             	</div>
                </form>
            </div>
        </div>
    </div>

	
	<div id="modal166" title="Follow-up Details">
		<form id='modal166_form' autocomplete="off">
			<fieldset>
				<label>Date: <input readonly='readonly' name='date' required type="text"></label><br>
				<label>Response: <input name='response' autofocus required type="text"></label><br>
				<label>Details: <textarea name='details'></textarea></label><br>
				<label>Valid Upto Date: <input name='next_date' type="text"></label><br>
				<input type="submit" value='Save' name='save' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<div id="modal167" title="Update Contact">
		<form id='modal167_form' autocomplete="off">
			<fieldset>
				<label>Name: <input readonly='readonly' type='text' required></label><br>
				<label>Phone: <input type="tel"></label><br>
				<label>Email: <input type="text"></label><br>
				<label>Address: <textarea></textarea></label><br>
				<label>Pincode: <input type="number"></label><br>
				<label>City: <input type="text"></label><br>
				<label>State: <input type="text"></label><br>
				<label id='modal167_attributes'></label><br>
				<input type="hidden" name='id'>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<div id="modal168" title="Close Purchase Lead">
		Are you sure you want to close this lead?
		<br>
		<br>
		<form id='modal168_form' autocomplete="off">
			<fieldset>
				<input type="submit" class='modal_submit' name='yes' value='Yes'>
				<input type="button" class='modal_submit' name='no' value='No'>
			</fieldset>
		</form>
	</div>

	<div id="modal169" title="Search Return Columns">
		<form id='modal169_form' autocomplete="off">
			<fieldset>
				<input type="button" class='add_icon' name='add_button'>
				<input type="button" class='delete_icon' name='delete_button'>
				<div id='modal169_columns'></div><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<div id="modal170" title="Import Disaptch Information">
		<form id='modal170_form' autocomplete="off">
			<fieldset>
				<input type="file" required value='Select file' accept=".csv" style='display:none'>
				<input type='button' class='generic_red_icon' value='Select File'>
				<br>
				<output name='selected_file'></output><br>
				<input type="submit" value='Import' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<div id="modal171" title="Email Document">
		<form id='modal171_form' autocomplete="off">
			<fieldset>
				<label>To: <input type='text' readonly="readonly"></label><br>
				<label>Email: <textarea required title='Separate email IDs with semicolon(;)'></textarea></label><br>
				<label>Subject: <textarea></textarea></label><br>
				<label>Body: <textarea></textarea></label><br>
				<input type='hidden'>
				<input type="submit" value='Send' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<div id="modal172" title="Add Receipt">
		<form id='modal172_form' autocomplete="off">
			<fieldset>
				<label>Receipt Id: <input type='text' name='receipt_id' required></label><br>
				<label>Date: <input type="text" name='date' required></label><br>
				<label>Account: <input type="text" name='account' required></label><br>
				<label>Narration: <textarea name='narration'></textarea></label><br>
				<label>Receipt Amount: Rs. <input type="number" min='0' step='any' name='amount' required></label><br>
				<label>Balance <input type="text" readonly='readonly' name='balance'></label><br>
				<input type="hidden" name='type'>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<div id="modal173" title="Inventory">
		<form id='modal173_form' autocomplete="off">
			<fieldset>
				<label>Item: <input type='text' readonly='readonly' name='item_name'></label><br>
				<label>Stock Qty: <input type="number" step='any' readonly='readonly' name='stock'></label><br>
				<label>Seller Qty: <input type="number" step='any' readonly='readonly' name='seller'></label><br>
				<label>Buyer Qty: <input type="number" step='any' readonly='readonly' name='buyer'></label><br>
				<input type="button" value='Ok' name='ok' class='modal_submit'>
			</fieldset>
		</form>
	</div>
	
	<div id="modal174" title="Add new product">
		<form id='modal174_form' autocomplete="off">
			<fieldset>
				<label>Name: <input type="text" required></label><br>
				<label>Make: <input type="text"></label><br>
				<label>Description: <textarea></textarea></label><br>
				<label>Picture: <output></output>
								<input type='file' style='display:none'>
								<input type='button' class='generic_red_icon' value='Select Picture'></label><br>
				<label>MRP: <input type="number" step='any'></label><br>
				<label>Discount: <input type="number" step='any'></label><br>
				<label>Sale Price: <input type="number" step='any'></label><br>
				<label>Cost Price: <input type="number" step='any'></label><br>
				<label id='modal174_attributes'></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<div id="modal175" title="Add Newsletter Component">
		<form id='modal175_form' autocomplete="off">
			<fieldset>
				<label>Name: <input type="text" name='nname' required></label><br>
				<label>Template: <input type="text" name='tname' required></label><br>
				<label id='modal175_markers'></label><br>
				<input type="hidden" name='html_code'>
				<input type="hidden" name='t_id'>
				<input type="submit" value='Add' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<div id="modal176" title="Add Image">
		<form id='modal176_form' autocomplete="off">
			<fieldset>
				<label>Name: <input type="text" required></label><br>
				<label>Picture: <output></output>
								<input type='file' style='display:none'>
								<input type='button' class='generic_red_icon' value='Select Image'></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<div id="modal177" title="Add new product">
		<form id='modal177_form' autocomplete="off">
			<fieldset>
				<label>Model: <input type="text" required></label><br>
				<label>Company: <input type="text"></label><br>
				<label>Category: <input type="text"></label><br>
				<label>Description: <textarea></textarea></label><br>
				<label>Picture: <output></output>
								<input type='file' style='display:none'>
								<input type='button' class='generic_red_icon' value='Select Picture'></label><br>
				<label>MRP: <input type="number" step='any'></label><br>
				<label>Discount: <input type="number" step='any'></label><br>
				<label>Sale Price: <input type="number" step='any'></label><br>
				<label>Cost Price: <input type="number" step='any'></label><br>
				<label id='modal177_attributes'></label><br>
				<input type="submit" value='Save' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<a href='#modal178' data-toggle="modal" id='modal178_link'></a>
	<div id="modal178" class="modal fade draggable-modal" role="basic" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-full">
            <div class="modal-content">
                <form id='modal178_form' autocomplete="off">                               
	            	<div class="modal-header">
                    	<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                    	<h4 class="modal-title">Notification Function</h4>
                	</div>
	                <div class="modal-body">
		               <div class="scroller" style="height:180px;" data-always-visible="1" data-rail-visible1="1">
		                 <div class="row">
									<div class="col-sm-12 col-md-4">Function Name</div>
					     			<div class="col-sm-12 col-md-8"><input type='text' form='modal178_form' name='name'></div>
					     		</div>
		                  <div class="row">
								    <div class="col-sm-12 col-md-12">Function Definition</div>
					     			<div class="col-sm-12 col-md-12"><textarea form='modal178_form' name='def'></textarea></div>
					     		</div>
		               </div>
		             </div>
	             	<div class="modal-footer">
	               	<input type="submit" class="btn green" form='modal178_form' name='save' value='Save'>
	             	</div>
                </form>
            </div>
        </div>
    </div>

	<div id="modal179" title="Update Newsletter Component">
		<form id='modal179_form' autocomplete="off">
			<fieldset>
				<label>Name: <input type="text" name='nname' required></label><br>
				<label id='modal179_markers'></label><br>
				<input type="hidden" name='html_code'>
				<input type="hidden" name='t_id'>
				<input type="submit" value='Update' class='modal_submit'>
			</fieldset>
		</form>
	</div>

	<a href='#modal180' data-toggle="modal" id='modal180_link'></a>
	<div id="modal180" class="modal fade draggable-modal" role="basic" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-full">
            <div class="modal-content">
                <form id='modal180_form' autocomplete="off">                               
	            	<div class="modal-header">
                    	<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                    	<h4 class="modal-title">HTML Code</h4>
                	</div>
	                <div class="modal-body">
		               <div class="scroller" style="height:180px;" data-always-visible="1" data-rail-visible1="1">
		                 <div class="row">
								    <div class="col-sm-12 col-md-12">Code</div>
					     			<div class="col-sm-12 col-md-12"><textarea form='modal180_form' name='code'></textarea></div>
					     		</div>
		               </div>
		             </div>
	             	<div class="modal-footer">
	               	<input type="submit" class="btn green" form='modal180_form' name='save' value='Save'>
	             	</div>
                </form>
            </div>
        </div>
    </div>

	<a href='#modal181' data-toggle="modal" id='modal181_link'></a>
	<div id="modal181" class="modal fade draggable-modal" role="basic" tabindex="-1" aria-hidden="true">
     <div class="modal-dialog modal-full">
         <div class="modal-content">
            <form id='modal181_form' autocomplete="off">                               
	            <div class="modal-header">
                  	<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                 	<h4 class="modal-title">Preview</h4>
               </div>
	            <div class="modal-body">
		            <div class="scroller" style="height:181px;" data-always-visible="1" data-rail-visible1="1">
		               	Preview <br><output name='picture'></output>
								<input type='file' style='display:none;' name='file_hidden'>
								<br><button type='button' class='btn red' name='dummy'>Select Image</button>
					   </div>
		         </div>
	            <div class="modal-footer">
	            	<input type="submit" class="btn green" form='modal181_form' name='save' value='Save'>
	         	</div>
         	</form>
      	</div>
   	</div>
	</div>

	<a href='#modal182' data-toggle="modal" id='modal182_link'></a>
	<div id="modal182" class="modal fade draggable-modal bs-modal-lg" role="basic" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <form id='modal182_form' autocomplete="off">                               
	            	<div class="modal-header">
                    	<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                    	<h4 class="modal-title">Change Password</h4>
                	</div>
                    <div class="modal-body">
	                    <div class="scroller" style="height:180px;" data-always-visible="1" data-rail-visible1="1">
	                  <div class="row">
								<div class="col-sm-12 col-md-4">Current Password</div>
				     			<div class="col-sm-12 col-md-8"><input type="password" form='modal182_form' name='current_pass' required class="form-control"></div>
				     		</div>
	                  <div class="row">
							    <div class="col-sm-12 col-md-4">New Password</div>
				     			<div class="col-sm-12 col-md-8"><input type="password" form='modal182_form' name='new_pass' required class="form-control"></div>
				     		</div>
	                  <div class="row">
							    <div class="col-sm-12 col-md-4">Retype Password</div>
				     			<div class="col-sm-12 col-md-8"><input type="password" form='modal182_form' name='re_pass' required class="form-control" onkeyup="modal182_verify_password($(this));"></div>
				     		</div>
				     		<div class="row">
								<div class="verify col-md-12 col-lg-12" style='color:#c44030;'></div>
					     	</div>
	                    </div>
	                </div>
	                <div class="modal-footer">
	                    <input type="submit" class="btn green" form='modal182_form' name='save' value='Save' disabled="true">
	                </div>
                </form>
            </div>
        </div>
       <script>
		function modal182_verify_password(button)
		{
			var form_id=$(button).attr('form');
			var form=document.getElementById(form_id);
			var new_pass=form.elements['new_pass'].value;
			var re_pass=form.elements['re_pass'].value;
			if(new_pass==re_pass)
			{
				$(form).find('.verify').html('Match!');
				form.elements['save'].disabled=false;
			}
			else
			{
				$(form).find('.verify').html('Passwords do not match!');				
			}
		}
		</script>
    </div>
    

	<a href='#modal183' data-toggle="modal" id='modal183_link'></a>
	<div id="modal183" class="modal fade draggable-modal bs-modal-lg" role="basic" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <form id='modal183_form' autocomplete="off">                               
	            	<div class="modal-header">
                    	<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                    	<h4 class="modal-title">Email</h4>
                	</div>
                    <div class="modal-body">
	               <div class="scroller" style="height:180px;" data-always-visible="1" data-rail-visible1="1">
	                 <div class="row">
								<div class="col-sm-12 col-md-4">Email</div>
				     			<div class="col-sm-12 col-md-8"><textarea form='modal183_form' name='email' required></textarea></div>
				     		</div>
	                  <div class="row">
							    <div class="col-sm-12 col-md-4">Subject</div>
				     			<div class="col-sm-12 col-md-8"><textarea form='modal183_form' name='subject' required></textarea></div>
				     		</div>
	               </div>
	                </div>
	                <div class="modal-footer">
	                    <input type="submit" class="btn green" form='modal183_form' name='save' value='Send'>
	                </div>
                </form>
            </div>
        </div>
    </div>

	<a href='#modal184' data-toggle="modal" id='modal184_link'></a>
	<div id="modal184" class="modal fade draggable-modal" role="dialog" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-full">
            <div class="modal-content">
                <form id='modal184_form' autocomplete="off">                               
	            	<div class="modal-header">
                    	<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                    	<h4 class="modal-title">Box Content</h4>
                	</div>
	                <div class="modal-body">
		               <div class="scroller" style="height:180px;" data-always-visible="1" data-rail-visible1="1">
		                  <div class="row">
								    <div class="col-sm-12 col-md-12">HTML Content</div>
					     			<div class="col-sm-12 col-md-12"><textarea form='modal184_form' name='content'></textarea></div>
					     		</div>
		               </div>
		             </div>
	             	<div class="modal-footer">
	               	<input type="submit" class="btn green" form='modal184_form' name='save' value='Save'>
	             	</div>
                </form>
            </div>
        </div>
    </div>

	<a href='#modal185' data-toggle="modal" id='modal185_link'></a>
	<div id="modal185" class="modal fade draggable-modal" role="basic" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-full">
            <div class="modal-content">
                <form id='modal185_form' autocomplete="off">                               
	            	<div class="modal-header">
                    	<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                    	<h4 class="modal-title">Box Function</h4>
                	</div>
	                <div class="modal-body">
		               <div class="scroller" style="height:180px;" data-always-visible="1" data-rail-visible1="1">
		                 <div class="row">
									<div class="col-sm-12 col-md-4">Function Name</div>
					     			<div class="col-sm-12 col-md-8"><input type='text' form='modal185_form' name='name'></div>
					     		</div>
		                  <div class="row">
								    <div class="col-sm-12 col-md-12">Function Definition</div>
					     			<div class="col-sm-12 col-md-12"><textarea form='modal185_form' name='def'></textarea></div>
					     		</div>
		               </div>
		             </div>
	             	<div class="modal-footer">
	               	<input type="submit" class="btn green" form='modal185_form' name='save' value='Save'>
	             	</div>
                </form>
            </div>
        </div>
    </div>

	<a href='#modal186' data-toggle="modal" id='modal186_link'></a>
	<div id="modal186" class="modal fade draggable-modal" role="dialog" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-full">
            <div class="modal-content">
                <form id='modal186_form' autocomplete="off">                               
	            	<div class="modal-header">
                    	<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                    	<h4 class="modal-title">Overwrite Function</h4>
                	</div>
	                <div class="modal-body">
		               <div class="scroller" style="height:180px;" data-always-visible="1" data-rail-visible1="1">
		                  <div class="row">
								    <div class="col-sm-12 col-md-12">Function Definition</div>
					     			<div class="col-sm-12 col-md-12"><textarea form='modal186_form' name='content'></textarea></div>
					     		</div>
		               </div>
		             </div>
	             	<div class="modal-footer">
	               	<input type="submit" class="btn green" form='modal186_form' name='save' value='Save'>
	             	</div>
                </form>
            </div>
        </div>
    </div>

	<a href='#modal187' data-toggle="modal" id='modal187_link'></a>
	<div id="modal187" class="modal fade draggable-modal" role="dialog" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <form id='modal187_form' autocomplete="off">                               
	            	<div class="modal-header">
                    	<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                    	<h4 class="modal-title">Add table</h4>
                	</div>
	                <div class="modal-body">
		               <div class="scroller" style="height:180px;" data-always-visible="1" data-rail-visible1="1">
		                  <div class="row">
								   <div class="col-sm-12 col-md-4">Table Name</div>
					     			<div class="col-sm-12 col-md-8"><input type='text' form='modal187_form' required name='table'></div>
					     		</div>
		               </div>
		             </div>
	             	<div class="modal-footer">
	               	<button type="submit" class="btn green" form='modal187_form' name='save'>Create</button>
	               	<button type="button" class="btn red" form='modal187_form' data-dismiss='modal' name='cancel'>Cancel</button>
	             	</div>
                </form>
            </div>
        </div>
    </div>

	<a href='#modal188' data-toggle="modal" id='modal188_link'></a>
	<div id="modal188" class="modal fade draggable-modal" role="dialog" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <form id='modal188_form' autocomplete="off">                               
	            	<div class="modal-header">
                    	<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                    	<h4 class="modal-title">Add Column</h4>
                	</div>
	                <div class="modal-body">
		               <div class="scroller" style="height:180px;" data-always-visible="1" data-rail-visible1="1">
		                  <div class="row">
								   <div class="col-sm-12 col-md-4">Table Name</div>
					     			<div class="col-sm-12 col-md-8"><input type='text' form='modal188_form' readonly='readonly' name='table'></div>
					     		</div>
		                  <div class="row">
								   <div class="col-sm-12 col-md-4">Column Name</div>
					     			<div class="col-sm-12 col-md-8"><input type='text' form='modal188_form' required name='colname'></div>
					     		</div>
		                  <div class="row">
								   <div class="col-sm-12 col-md-4">Column Type</div>
					     			<div class="col-sm-12 col-md-8"><input type='text' form='modal188_form' required name='coltype'></div>
					     		</div>
		               </div>
		             </div>
	             	<div class="modal-footer">
	               	<button type="submit" class="btn green" form='modal188_form' name='save'>Add</button>
	               	<button type="button" class="btn red" form='modal188_form' data-dismiss='modal' name='cancel'>Cancel</button>
	             	</div>
                </form>
            </div>
        </div>
    </div>

	<a href='#modal189' data-toggle="modal" id='modal189_link'></a>
	<div id="modal189" class="modal fade draggable-modal" role="dialog" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <form id='modal189_form' autocomplete="off">                               
	            	<div class="modal-header">
                    	<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                    	<h4 class="modal-title">Change Column Type</h4>
                	</div>
	                <div class="modal-body">
		               <div class="scroller" style="height:180px;" data-always-visible="1" data-rail-visible1="1">
		                  <div class="row">
								   <div class="col-sm-12 col-md-4">Table Name</div>
					     			<div class="col-sm-12 col-md-8"><input type='text' form='modal189_form' readonly='readonly' name='table'></div>
					     		</div>
		                  <div class="row">
								   <div class="col-sm-12 col-md-4">Column Name</div>
					     			<div class="col-sm-12 col-md-8"><input type='text' form='modal189_form' readonly="readonly" name='colname'></div>
					     		</div>
		                  <div class="row">
								   <div class="col-sm-12 col-md-4">Column Type</div>
					     			<div class="col-sm-12 col-md-8"><input type='text' form='modal189_form' required name='coltype'></div>
					     		</div>
		               </div>
		             </div>
	             	<div class="modal-footer">
	               	<button type="submit" class="btn green" form='modal189_form' name='save'>Change</button>
	               	<button type="button" class="btn red" form='modal189_form' data-dismiss='modal' name='cancel'>Cancel</button>
	             	</div>
                </form>
            </div>
        </div>
    </div>

</div>