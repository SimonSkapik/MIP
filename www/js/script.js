
var all_programs = $("");
var active_programs = $("");
var dis_programs = $("");

function init(modes){
	all_programs = $(modes);
	active_programs = all_programs.find('program[active="true"]');
	dis_programs = all_programs.find('program[active="false"]');
	$('#mode_list ul').empty();
	active_programs.each(function(){
		$('#mode_list ul#active').append('<li class="pointer" onclick="load_mode('+$(this).attr('id')+')">'+$(this).find('name').attr('value')+'</li>');
	});
	dis_programs.each(function(){
		$('#mode_list ul#disabled').append('<li class="pointer" onclick="load_mode('+$(this).attr('id')+')">'+$(this).find('name').attr('value')+'</li>');
	});
}

function load_mode(mode_id){
	mode = all_programs.find('program[id="'+mode_id+'"]');
	
}

function save_mode(){
	mode_xml = '	<program active="true" id="'+$('#current_mode_id').text()+'" type="'+$('#current_mode_type').text()+'">\n';
	mode_xml += '		<name value="'+$('#current_mode_name').text()+'" />\n'
	$('.channel').each(function(){
		id = $(this).attr('id').split('_');
		id = id[1];
		if(id > 0){
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
	all_programs.append(mode_xml);
	console.log(all_programs);
	$.ajax({
	  type: "POST",
	  url: './php/functions.php',
	  data: {mode:all_programs.html()},
	  success: function(res){load_modes();alert('saved');},
	  dataType: 'xml'
	});
}

function load_modes(){
	$.ajax({
	  type: "POST",
	  url: './php/functions.php',
	  data: {load:'load'},
	  success: function(res){init(res);},
	  dataType: 'text'
	});
}

$(document).ready(function(){
	
	load_modes();
	
});