<?php

define('ROOT_DIR', $_SERVER['SERVER_NAME'].$_SERVER['REQUEST_URI']);
// define('ROOT_DIR', $_SERVER);


// $main_root  = "http://".$_SERVER['HTTP_HOST'];
// $main_root .= str_replace(basename($_SERVER['SCRIPT_NAME']),"",$_SERVER['SCRIPT_NAME']);
// define('BASE_URL', $main_root);

define('BASE_URL', "http://localhost/task-handler/");
define('API_URL', "http://localhost:3000/api/");