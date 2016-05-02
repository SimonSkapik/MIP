<!doctype html>
<html lang="cz">
	<head>
		<meta charset="utf-8">

		<title>Inteligent Lights</title>
		<meta name="description" content="Inteligent Lights">
		<meta name="author" content="Simon Skapik">

		<link rel="stylesheet" href="css/default.css">
		<script src="js/jquery-2.2.0.min.js"></script>
		<script src="js/script.js"></script>

	  <!--[if lt IE 9]>
		<script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
	  <![endif]-->
	</head>

	<body>

		<div id="all">
			
			<div id="header">
				<h1>Inteligent Lights</h1>
			</div>
			
			<div id="content">
				<table>
					<tbody>
						<tr>
							<td id="mode_list_td">
								<div id="mode_list">
									<h4>Active Modes:</h4>
									<ul id="active"></ul>
									<h4>Disabled Modes:</h4>
									<ul id="disabled"></ul>
								</div>
							</td>
							<td>
								<div id="toolbar">
									<label for="new_mode_name">Name: </label><input type="text" name="new_mode_name" id="new_mode_name" value="" /> 
									<label for="new_mode_type">Type: </label>
									<select id="new_mode_type">
										<option selected="selected" value="static">Static</option>
										<option value="timeframe">Timeframe</option>
									</select>
									<input type="button" name="new_mode" id="new_mode" value="New Mode" /> | 
									<div id="toolbar_static" class="hidden disp_inline">
										<input type="button" name="add_channel" value="Add Channel" />
									</div>
									<div id="toolbar_timeframe" class="hidden disp_inline">
										<input type="button" name="add_change" value="Add Change" />
									</div> | 
									<div id="toolbar_save" class="disp_inline">
										<input type="button" onclick="save_mode();" name="save" value="Save" />
										<input type="button" name="activate" value="Activate" />
									</div>
								</div>
								<div id="workspace">
									<h3 id="mode_info"><span id="current_mode_id">1</span> - <span id="current_mode_name">Test Mode</span> (<span id="current_mode_type">static</span>)</h3>
								
									<div class="channel" id="channel_0">
										<h3>Default</h3>
										<label for="channel_0_trigger">Trigger: </label><br />
										<select name="channel_0_trigger" id="channel_0_trigger">
											<option selected="selected" value="0">Allways</option>
											<option value="1">Input 1</option>
											<option value="2">Input 2</option>
										</select><br />
										<label for="channel_0_function">Function: </label><br />
										<input name="channel_0_function" id="channel_0_function" value="1.0" type="range" min="0.0" max="1.0" step="0.1"/><br />
										<label for="channel_0_idle">Idle: </label><br />
										<input name="channel_0_idle" id="channel_0_idle" value="0.0" type="range" min="0.0" max="1.0" step="0.1"/><br />
									</div>
									
									<div class="block_separator"></div>
									
									<div class="channel" id="channel_1">
										<h3>Channel 1</h3>
										<label for="channel_1_trigger">Trigger: </label><br />
										<select name="channel_1_trigger" id="channel_1_trigger">
											<option selected="selected" value="0">Allways</option>
											<option value="1">Input 1</option>
											<option value="2">Input 2</option>
										</select><br />
										<label for="channel_1_function">Function: </label><br />
										<input name="channel_1_function" id="channel_1_function" value="1.0" type="range" min="0.0" max="1.0" step="0.1"/><br />
										<label for="channel_1_idle">Idle: </label><br />
										<input name="channel_1_idle" id="channel_1_idle" value="0.0" type="range" min="0.0" max="1.0" step="0.1"/><br />
									</div>
									
									<div class="channel" id="channel_2">
										<h3>Channel 2</h3>
										<label for="channel_2_trigger">Trigger: </label><br />
										<select name="channel_2_trigger" id="channel_2_trigger">
											<option selected="selected" value="0">Allways</option>
											<option value="1">Input 1</option>
											<option value="2">Input 2</option>
										</select><br />
										<label for="channel_2_function">Function: </label><br />
										<input name="channel_2_function" id="channel_2_function" value="1.0" type="range" min="0.0" max="1.0" step="0.1"/><br />
										<label for="channel_2_idle">Idle: </label><br />
										<input name="channel_2_idle" id="channel_2_idle" value="0.0" type="range" min="0.0" max="1.0" step="0.1"/><br />
									</div>
									
									<div class="channel" id="channel_3">
										<h3>Channel 3</h3>
										<label for="channel_3_trigger">Trigger: </label><br />
										<select name="channel_3_trigger" id="channel_3_trigger">
											<option selected="selected" value="0">Allways</option>
											<option value="1">Input 1</option>
											<option value="2">Input 2</option>
										</select><br />
										<label for="channel_3_function">Function: </label><br />
										<input name="channel_3_function" id="channel_3_function" value="1.0" type="range" min="0.0" max="1.0" step="0.1"/><br />
										<label for="channel_3_idle">Idle: </label><br />
										<input name="channel_3_idle" id="channel_3_idle" value="0.0" type="range" min="0.0" max="1.0" step="0.1"/><br />
									</div>
									
									<div class="channel" id="channel_4">
										<h3>Channel 4</h3>
										<label for="channel_4_trigger">Trigger: </label><br />
										<select name="channel_4_trigger" id="channel_4_trigger">
											<option selected="selected" value="0">Allways</option>
											<option value="1">Input 1</option>
											<option value="2">Input 2</option>
										</select><br />
										<label for="channel_4_function">Function: </label><br />
										<input name="channel_4_function" id="channel_4_function" value="1.0" type="range" min="0.0" max="1.0" step="0.1"/><br />
										<label for="channel_4_idle">Idle: </label><br />
										<input name="channel_4_idle" id="channel_4_idle" value="0.0" type="range" min="0.0" max="1.0" step="0.1"/><br />
									</div>
									
									<div class="channel" id="channel_5">
										<h3>Channel 5</h3>
										<label for="channel_5_trigger">Trigger: </label><br />
										<select name="channel_5_trigger" id="channel_5_trigger">
											<option selected="selected" value="0">Allways</option>
											<option value="1">Input 1</option>
											<option value="2">Input 2</option>
										</select><br />
										<label for="channel_5_function">Function: </label><br />
										<input name="channel_5_function" id="channel_5_function" value="1.0" type="range" min="0.0" max="1.0" step="0.1"/><br />
										<label for="channel_5_idle">Idle: </label><br />
										<input name="channel_5_idle" id="channel_5_idle" value="0.0" type="range" min="0.0" max="1.0" step="0.1"/><br />
									</div>
									
								</div>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>

	</body>
</html>