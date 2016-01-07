<div id='form301' class='function_detail'>
	<form id='form301_master' autocomplete="off" class='questionnaire_form' style="border:none;">
		<label>Source: <input type='text' name='source' class='widebox' required></label>
		<label><input type='submit' name='capture' value='Scan' class='generic_icon'></label>		
		<label><input type='button' name='cancel' value='Cancel' class='generic_red_icon' onclick='form301_cancel_capture();'></label>		
	
		<label><canvas id="form301_canvas" style="width:500px;height:500px;float:left;"></canvas></label>
		<label><video id='form301_video' style='display:none;' width="500" height="500" autoplay></video></label>
	</form>
	
	<script type="text/javascript" src="./JavaScripts/open/jsqrcode/grid.js"></script>
	<script type="text/javascript" src="./JavaScripts/open/jsqrcode/version.js"></script>
	<script type="text/javascript" src="./JavaScripts/open/jsqrcode/detector.js"></script>
	<script type="text/javascript" src="./JavaScripts/open/jsqrcode/formatinf.js"></script>
	<script type="text/javascript" src="./JavaScripts/open/jsqrcode/errorlevel.js"></script>
	<script type="text/javascript" src="./JavaScripts/open/jsqrcode/bitmat.js"></script>
	<script type="text/javascript" src="./JavaScripts/open/jsqrcode/datablock.js"></script>
	<script type="text/javascript" src="./JavaScripts/open/jsqrcode/bmparser.js"></script>
	<script type="text/javascript" src="./JavaScripts/open/jsqrcode/datamask.js"></script>
	<script type="text/javascript" src="./JavaScripts/open/jsqrcode/rsdecoder.js"></script>
	<script type="text/javascript" src="./JavaScripts/open/jsqrcode/gf256poly.js"></script>
	<script type="text/javascript" src="./JavaScripts/open/jsqrcode/gf256.js"></script>
	<script type="text/javascript" src="./JavaScripts/open/jsqrcode/decoder.js"></script>
	<script type="text/javascript" src="./JavaScripts/open/jsqrcode/qrcode.js"></script>
	<script type="text/javascript" src="./JavaScripts/open/jsqrcode/findpat.js"></script>
	<script type="text/javascript" src="./JavaScripts/open/jsqrcode/alignpat.js"></script>
	<script type="text/javascript" src="./JavaScripts/open/jsqrcode/databr.js"></script>
	<script type="text/javascript">
	
	form301_stream = null;
	form301_capture_handle = false;
	
	function form301_create_item(data)
	{
		if(is_create_access('form302'))
		{
			var form=document.getElementById('form301_master');
			var source=form.elements['source'].value;
			var data_id=get_new_key();
			var last_updated=get_my_time();
			var data_xml="<qr_scans>" +
					"<id>"+data_id+"</id>" +
					"<data unique='yes'>"+data+"</data>" +
					"<source>"+source+"</source>" +
					"<time>"+last_updated+"</time>" +
					"<status>pending</status>" +
					"<last_updated>"+last_updated+"</last_updated>" +
					"</qr_scans>";	
		
			create_simple(data_xml);
			
			$("#modal86").dialog("open");
		}
		else
		{
			$("#modal2").dialog("open");			
		}
	}
	
	function form301_cancel_capture() 
	{
		if(form301_stream)
		{
			form301_stream.stop();
			form301_capture_handle=false;
		}
	}

	function form301_capture() 
	{
	    var canvas = document.getElementById('form301_canvas');
	    var video = document.getElementById('form301_video');
		var context = canvas.getContext('2d');
		
		if(form301_stream)
		{
			console.log('streaming');
			//form301_stream.start();
			try
			{		
		    	context.drawImage(video,0,0);
				try 
				{
					qrcode.callback=form301_create_item;		
					qrcode.decode();
	    			form301_stream.stop();
				}
				catch (e) 
				{
					if(form301_capture_handle)
						setTimeout(form301_capture,500);
				}			
	    	}
	    	catch(e)
	    	{
				if(form301_capture_handle)
		    		setTimeout(form301_capture,500);
	    	}
	 	}
	}
	 
	function form301_header_ini()
	{           
		var video = document.getElementById('form301_video');
		
		window.navigator = window.navigator || {};
	    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || null;

		var constraints={video:true};
		MediaStreamTrack.getSources(function(sourceInfos) 
		{
	              var videoSourceId;
	              for (var i = 0; i != sourceInfos.length; ++i) {
	                var sourceInfo = sourceInfos[i];
	                if(sourceInfo.kind == "video" && sourceInfo.facing == "environment") {
	                  videoSourceId = sourceInfo.id;
	                }
	              }
	              constraints = {
	                audio: false,
	                video: {
	                  optional: [{sourceId: videoSourceId}]
	                }
	              };
	    });

/*	
		navigator.getUserMedia({video: true}, function(stream) 
		{
		    video.src = window.URL.createObjectURL(stream);
	    	form301_stream = stream;
	  	},function (e) {
	  		console.log('error');
	  	});   
*/	  	
	  	var filter_fields=document.getElementById('form301_master');
		var source_filter=filter_fields.elements['source'];
		
		var source_data=new Object();
			source_data.data_store='qr_contexts';
			source_data.indexes=[{index:'source'}];		
			source_data.return_column='source';
		set_my_value_list_json(source_data,source_filter);	
		
		$(filter_fields).off('submit');
		$(filter_fields).on('submit',function (e) 
		{
			e.preventDefault();
			form301_capture_handle=true;
			
			navigator.getUserMedia(constraints, function(stream) 
			{
			    video.src = window.URL.createObjectURL(stream);
		    	form301_stream = stream;
		  	},function (e) {
		  		console.log('error');
		  	});   
	  	
			form301_capture();
		});
	}
</script>

</div>