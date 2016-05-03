
var all_programs = $("");
var active_programs = $("");
var dis_programs = $("");
var work_programs = $("");
var next_id = 0;
var editing = false;

$(document).ready(function(){
	$('#delete_mode').attr('disabled','disabled');
});


function init(modes){
	// Load saved modes
	all_programs = $(modes);
	console.log(all_programs);
	active_programs = all_programs.find('program[active="true"]');
	dis_programs = all_programs.find('program[active="false"]');
	// Rewrite modes list
	$('#mode_list ul').empty();
	active_programs.each(function(){
		next_id = Math.max($(this).attr('id'),next_id);
		$('#mode_list ul#active').append('<li class="pointer" onclick="load_mode('+$(this).attr('id')+')">'+$(this).find('name').attr('value')+'</li>');
	});
	dis_programs.each(function(){
		next_id = Math.max($(this).attr('id'),next_id);
		$('#mode_list ul#disabled').append('<li class="pointer" onclick="load_mode('+$(this).attr('id')+')">'+$(this).find('name').attr('value')+'</li>');
	});
	next_id += 1;
}

function load_mode(mode_id){
	mode = all_programs.find('program[id="'+mode_id+'"]');
	switch($(mode).attr('type')){
		case 'static':{
			setup_workspace('static', $(mode).attr('id'), $(mode).find('name').attr('value'), $(mode).attr('active'));
			def = $(mode).find('default');
			$('#channel_0_trigger').val($($(def).find('trigger')).attr('value'));
			$('#channel_0_function').val($($(def).find('function')).attr('value'));
			$('#channel_0_idle').val($($(def).find('idle')).attr('value'));
			channels = $(mode).find('channel');
			$(channels).each(function(){
				id = $(this).attr('id');
				$('#channel_'+id+'_trigger').val($($(this).find('trigger')).attr('value'));
				$('#channel_'+id+'_function').val($($(this).find('function')).attr('value'));
				$('#channel_'+id+'_idle').val($($(this).find('idle')).attr('value'));
			});
		}break;
		case 'timeframe':{
			setup_workspace('timeframe', $(mode).attr('id'), $(mode).find('name').attr('value'), $(mode).attr('active'));
			def = $(mode).find('default');
			$('#def_function').val($($(def).find('function')).attr('value'));
			changes = $(mode).find('change');
			$(changes).each(function(){
				time = $(this).attr('time');
				f1 = $($(this).find('channel[id="1"] function')).attr('value');
				f2 = $($(this).find('channel[id="2"] function')).attr('value');
				f3 = $($(this).find('channel[id="3"] function')).attr('value');
				f4 = $($(this).find('channel[id="4"] function')).attr('value');
				f5 = $($(this).find('channel[id="5"] function')).attr('value');
				load_change(time, f1, f2, f3, f4, f5);
			});
		}break;
		default:{
			alert('Mode Type Error!');
		}
	}
	editing = true;
	$('#delete_mode').removeAttr('disabled');
}

function setup_workspace(type, id, name, active){
	switch(type){
		case 'static':{
			$('#toolbar_timeframe').addClass('hidden');
			$('#workspace').empty();
			if(active == 'true'){
				active_check = 'checked="checked"';
			}else{
				active_check = '';
			}
			$('#workspace').html('<h3 id="mode_info"><span id="current_mode_id">'+id+'</span> - <span id="current_mode_name">'+name+'</span> (<span id="current_mode_type">'+type+'</span>) | <input type="checkbox" name="current_mode_active" id="current_mode_active" '+active_check+' /><label for="current_mode_active" >Active</label></h3>');
			for(i = 0; i < 6; i++){
				block = '<div class="channel" id="channel_'+i+'">';
				if(i == 0){
					block += '<h3>Default</h3>';
				}else{
					block += '<h3>Channel '+i+'</h3>';
				}
				block += '\
					<label for="channel_'+i+'_trigger">Trigger: </label><br />\
					<select name="channel_'+i+'_trigger" id="channel_'+i+'_trigger">\
						<option selected="selected" value="0">Allways</option>\
						<option value="1">Input 1</option>\
						<option value="2">Input 2</option>\
					</select><br />\
					<label for="channel_'+i+'_function">Function: </label><br />\
					<input name="channel_'+i+'_function" id="channel_'+i+'_function" value="1.0" type="range" min="0.0" max="1.0" step="0.1"/><br />\
					<label for="channel_'+i+'_idle">Idle: </label><br />\
					<input name="channel_'+i+'_idle" id="channel_'+i+'_idle" value="0.0" type="range" min="0.0" max="1.0" step="0.1"/><br />\
				</div>';
				if(i == 0){
					block += '<div class="block_separator"></div>';
				}
				$('#workspace').append(block);
			}
		}break;
		case 'timeframe':{
			$('#toolbar_timeframe').removeClass('hidden');
			$('#workspace').empty();
			if(active == 'true'){
				active_check = 'checked="checked"';
			}else{
				active_check = '';
			}
			$('#workspace').html('<h3 id="mode_info"><span id="current_mode_id">'+id+'</span> - <span id="current_mode_name">'+name+'</span> (<span id="current_mode_type">'+type+'</span>) | <input type="checkbox" name="current_mode_active" id="current_mode_active" '+active_check+' /><label for="current_mode_active" >Active</label></h3>');
			block = '<div class="change default">';
			block += '<h3>Default</h3>';
			block += '<label for="def_function">All: </label>\
					<input name="def_function" id="def_function" value="0.0" type="range" min="0.0" max="1.0" step="0.1"/><br />';
			block += '</div>';
			block += '<div class="block_separator"></div>';
			$('#workspace').append(block);
		}break;
		default:{
			$('#workspace').empty();
		}
	}
}

function new_mode(){
	switch($('#new_mode_type').val()){
		case 'static':{
			setup_workspace('static', next_id, $('#new_mode_name').val(), 'true');
		}break;
		case 'timeframe':{
			setup_workspace('timeframe', next_id, $('#new_mode_name').val(), 'false');
		}break;
		default:{
			alert('Mode Type Error!');
		}
	}
	editing = false;
	$('#delete_mode').attr('disabled','disabled');
}

function save_mode(){
	if(editing){
		edit_mode();
	}else{
		add_mode();
	}
	programs = work_programs;
	$.ajax({
	  type: "POST",
	  url: './php/functions.php',
	  data: {mode:programs},
	  success: function(res){load_modes();alert('saved');editing = true;$('#delete_mode').removeAttr('disabled');},
	  dataType: 'xml'
	});
}

function add_change(){
	block = '<div class="change">';
	block += '<input type="button" name="delete_change" class="delete_change" onclick="del_change(this);" value="X" />';
	block += '<label for="time">frame</label>\
			<input name="time" value="0" type="number" min="0" max="'+$('#period').val()+'" step="1"/><br /><br />\
			<label for="channel_1_function">Ch 1:</label>\
			<input name="channel_1_function" value="0.0" type="range" min="0.0" max="1.0" step="0.1"/><br />\
			<label for="channel_2_function">Ch 2:</label>\
			<input name="channel_2_function" value="0.0" type="range" min="0.0" max="1.0" step="0.1"/><br />\
			<label for="channel_3_function">Ch 3:</label>\
			<input name="channel_3_function" value="0.0" type="range" min="0.0" max="1.0" step="0.1"/><br />\
			<label for="channel_4_function">Ch 4:</label>\
			<input name="channel_4_function" value="0.0" type="range" min="0.0" max="1.0" step="0.1"/><br />\
			<label for="channel_5_function">Ch 5:</label>\
			<input name="channel_5_function" value="0.0" type="range" min="0.0" max="1.0" step="0.1"/><br />';
	block += '</div>';
	$('#workspace').append(block);
}

function load_change(time, f1, f2, f3, f4, f5){
	block = '<div class="change">';
	block += '<input type="button" name="delete_change" class="delete_change" onclick="del_change(this);" value="X" />';
	block += '<label for="time">frame</label>\
			<input name="time" value="'+time+'" type="number" min="0" max="'+$('#period').val()+'" step="1"/><br /><br />\
			<label for="channel_1_function">Ch 1:</label>\
			<input name="channel_1_function" value="'+f1+'" type="range" min="0.0" max="1.0" step="0.1"/><br />\
			<label for="channel_2_function">Ch 2:</label>\
			<input name="channel_2_function" value="'+f2+'" type="range" min="0.0" max="1.0" step="0.1"/><br />\
			<label for="channel_3_function">Ch 3:</label>\
			<input name="channel_3_function" value="'+f3+'" type="range" min="0.0" max="1.0" step="0.1"/><br />\
			<label for="channel_4_function">Ch 4:</label>\
			<input name="channel_4_function" value="'+f4+'" type="range" min="0.0" max="1.0" step="0.1"/><br />\
			<label for="channel_5_function">Ch 5:</label>\
			<input name="channel_5_function" value="'+f5+'" type="range" min="0.0" max="1.0" step="0.1"/><br />';
	block += '</div>';
	$('#workspace').append(block);
}

function del_change(t){
	$(t).parent().remove();
}

function add_mode(){
	switch($('#current_mode_type').text()){
		case 'static':{
			mode_xml = '	<program active="'+$('#current_mode_active').prop('checked')+'" id="'+$('#current_mode_id').text()+'" type="'+$('#current_mode_type').text()+'">\n';
			mode_xml += '		<name value="'+$('#current_mode_name').text()+'" />\n'
			$('.channel').each(function(){
				id = $(this).attr('id').split('_');
				id = id[1];
				if(id > 0){
					mode_xml += '		<channel id="'+id+'">\n';
					mode_xml += '			<trigger value="'+$('#channel_'+id+'_trigger').val()+'" />\n';
					mode_xml += '			<function value="'+$('#channel_'+id+'_function').val()+'" />\n';
					mode_xml += '			<idle value="'+$('#channel_'+id+'_idle').val()+'" />\n';
					mode_xml += '		</channel>\n';
				}else{
					mode_xml += '		<default>\n';
					mode_xml += '			<trigger value="'+$('#channel_'+id+'_trigger').val()+'" />\n';
					mode_xml += '			<function value="'+$('#channel_'+id+'_function').val()+'" />\n';
					mode_xml += '			<idle value="'+$('#channel_'+id+'_idle').val()+'" />\n';
					mode_xml += '		</default>\n';
				}
			});
			mode_xml += '	</program>\n';
			work_programs = $('<div>').append(all_programs.find('program').clone()).html()+mode_xml;
		}break;
		case 'timeframe':{
			mode_xml = '	<program active="'+$('#current_mode_active').prop('checked')+'" id="'+$('#current_mode_id').text()+'" type="'+$('#current_mode_type').text()+'">\n';
			mode_xml += '		<name value="'+$('#current_mode_name').text()+'" />\n'
			mode_xml += '		<framelength value="'+$('#frame_length').val()+'" />\n'
			mode_xml += '		<period value="'+$('#period').val()+'" />\n'
			$('.change').each(function(){
				if($(this).hasClass('default')){
					mode_xml += '		<default>\n';
					mode_xml += '			<function value="'+$('#def_function').val()+'" />\n';
					mode_xml += '		<\default>\n';
				}else{
					time = $(this).children('input[name="time"]').val();
					mode_xml += '		<change time="'+time+'">\n'
					for(j = 1; j < 6; j++){
						value = $(this).children('input[name="channel_'+j+'_function"]').val();
						mode_xml += '			<channel id="'+j+'">\n';
						mode_xml += '				<function value="'+value+'" />\n';
						mode_xml += '			</channel>\n';
					}
					mode_xml += '		</change>\n';
				}
			});
			mode_xml += '	</program>\n';
			work_programs = $('<div>').append(all_programs.find('program').clone()).html()+mode_xml;
		}break;
		default:{
			alert('Mode Type Error!');
		}
	}
}

function delete_mode(){
	id = $('#current_mode_id').text();
	edited = all_programs.find('program[id="'+id+'"]');
	$(edited).remove();
	programs = $('<div>').append(all_programs.find('program').clone()).html();
	$.ajax({
	  type: "POST",
	  url: './php/functions.php',
	  data: {mode:programs},
	  success: function(res){load_modes();alert('deleted');$('#workspace').empty();editing = true;$('#delete_mode').removeAttr('disabled');},
	  dataType: 'xml'
	});
}

function edit_mode(){
	id = $('#current_mode_id').text();
	edited = all_programs.find('program[id="'+id+'"]');
	$(edited).remove();
	add_mode()
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