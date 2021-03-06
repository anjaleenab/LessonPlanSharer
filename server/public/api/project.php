<?php
define('INTERNAL', true);

require_once('db_connection.php');
require_once('functions.php');

if(!$conn) {
  throw new Exception('connection failed');
}

$method = $_SERVER['REQUEST_METHOD'];

switch($method) {
  case 'GET':
    require('project_get.php');
    break;
  case 'POST':
    require('project_add.php');
    break;
  case 'PATCH':
    require('project_patch_rate.php');
    break;
  case 'PUT':
    require('project_update.php');
    break;
  case 'DELETE':
    require('project_delete.php');
    break;
  default:
    throw new Exception('Cannot ' . $method . ' /api/project.php');
}

?>
