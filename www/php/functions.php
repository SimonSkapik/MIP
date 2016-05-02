<?php
if(isset($_POST['mode'])){
	$xml_name = "programs.xml";
	$xml_file = fopen($xml_name, 'w') or die("can't open file");
	fwrite($xml_file, '<?xml version="1.0" encoding="UTF-8"?>'.PHP_EOL);
	fwrite($xml_file, '<programs>'.PHP_EOL);
	fwrite($xml_file, $_POST['mode']);
	fwrite($xml_file, '</programs>');
	fclose($xml_file);
}

if(isset($_POST['load'])){
	$xml_name = "programs.xml";
	echo file_get_contents ($xml_name);
}
