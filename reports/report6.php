<div id='report6' class='report_detail'>
	<form id='report6_header'>
		<fieldset>
			<legend>Select Filters</legend>
			<label>Due date</br><input type='text' required></label>
			<label>Customer</br><input type='text' title='If this field is left blank, top 10 customers will be shown'></label>
			<input type='submit' value='Refresh'>
			<input type='button' title='Print' class='print_icon'>
		</fieldset>
	</form>
	</br>
	<div style="min-height:365px;">
		<div><b>Legend</b><div id="report6_legend" style='display: block;'></div></div>
		<canvas id="report6_canvas" class='report_sizing'></canvas>
	</div>
</div>