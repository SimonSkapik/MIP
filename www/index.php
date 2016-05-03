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
									<input type="button" name="new_mode" id="new_mode" onclick="new_mode();" value="New Mode" /> | 
									<div id="toolbar_timeframe" class="hidden disp_inline">
										<input type="button" name="add_change" onclick="add_change();" value="Add Change" />
										 FL: <input type="text" name="frame_length" id="frame_length" size="3" value="5" />
										 P: <input type="text" name="period" id="period" size="3" value="10" />
									</div> 
									<div class="disp_inline">
										<input type="button" onclick="delete_mode();" id="delete_mode" name="delete" value="Delete" />
									</div> | 
									<div id="toolbar_save" class="disp_inline">
										<input type="button" onclick="save_mode();" name="save" value="Save" />
									</div>
								</div>
								<div id="workspace">
									
								</div>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>

	</body>
</html>