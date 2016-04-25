function save_mode(){
	mode_xml = '	<program id="'+$('#current_mode_id').text()+'" type="'+$('#current_mode_type').text()+'">\n';
	mode_xml += '		<name value="'+$('#current_mode_name').text()+'" />\n'
	$('.channel').each(function(){
		id = $(this).attr('id').split('_');
		id = id[1];
		if(id == 0){
			mode_xml += '		<channel id="'+id+'">\n'
			mode_xml += '			<trigger value="'+$('#channel_'+id+'_trigger').val()+'" />\n'
			mode_xml += '			<function value="'+$('#channel_'+id+'_function').val()+'" />\n'
			mode_xml += '			<idle value="'+$('#channel_'+id+'_idle').val()+'" />\n'
			mode_xml += '		</channel>\n'
		}else{
			mode_xml += '		<default>\n'
			mode_xml += '			<trigger value="'+$('#channel_'+id+'_trigger').val()+'" />\n'
			mode_xml += '			<function value="'+$('#channel_'+id+'_function').val()+'" />\n'
			mode_xml += '			<idle value="'+$('#channel_'+id+'_idle').val()+'" />\n'
			mode_xml += '		</default>\n'
		}
	});
	mode_xml += '	</program>\n';
	$.ajax({
	  type: "POST",
	  url: './php/functions.php',
	  data: {mode:mode_xml},
	  success: function(res){alert('saved');},
	  dataType: 'text'
	});
}