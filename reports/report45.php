<div id='report45' class='report_detail'>
	<form id='report45_header'>
		<fieldset>
		<legend>Select filter</legend>
			Select Product<input type="text" form='report45_header'/>
			Select Batch<input type="text" form='report45_header'/>
			<input type="button" value='Locate' onclick="report45_ini();" />
		</fieldset>
	</form>
	</br>
	<div style='width:90%;height:90%'>
		<div><b>Legend</b><div id="report45_legend" style='display: block;'></div></div>
		<canvas id="report45_canvas" class='report_sizing'></canvas>
	</div>
</div>