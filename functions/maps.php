<div id='maps_main'>
	<?php
		echo "<ul>";
			if(strpos($_SESSION['forms'],'form41')!==false)
				echo "<li><a id='form41_link' href='#form41' onclick='form41_ini();' data-i18n='form.verify_addresses'></a></li>";
			if(strpos($_SESSION['reports'],'report31')!==false)
				echo "<li><a id='report31_link' href='#report31' onclick='report31_header_ini(); report31_ini();' data-i18n='form.customer_map_by_credit'></a></li>";
			if(strpos($_SESSION['reports'],'report35')!==false)
				echo "<li><a id='report35_link' href='#report35' onclick='report35_header_ini(); report35_ini();' data-i18n='form.customer_map_by_products'></a></li>";
			if(strpos($_SESSION['reports'],'report32')!==false)
				echo "<li><a id='report32_link' href='#report32' onclick='report32_header_ini(); report32_ini();' data-i18n='form.staff_map'></a></li>";
			if(strpos($_SESSION['reports'],'report33')!==false)
				echo "<li><a id='report33_link' href='#report33' onclick='report33_header_ini(); report33_ini();' data-i18n='form.supplier_map_by_debit'></a></li>";
			if(strpos($_SESSION['reports'],'report36')!==false)
				echo "<li><a id='report36_link' href='#report36' onclick='report36_header_ini(); report36_ini();' data-i18n='form.supplier_map_by_products'></a></li>";
		echo "</ul>";

		if(strpos($_SESSION['forms'],'form41')!==false)
			include "forms/form41.php";
		if(strpos($_SESSION['reports'],'report31')!==false)
			include "reports/report31.php";
		if(strpos($_SESSION['reports'],'report35')!==false)
			include "reports/report35.php";
		if(strpos($_SESSION['reports'],'report32')!==false)
			include "reports/report32.php";
		if(strpos($_SESSION['reports'],'report33')!==false)
			include "reports/report33.php";
		if(strpos($_SESSION['reports'],'report36')!==false)
			include "reports/report36.php";
	?>
	
	<script>
	!function(){
		$("#maps_main").tabs({
			heightStyle:"fill",
			show:"slide"});
		}();
	</script>

</div>