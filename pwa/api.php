<?php 
  header('Access-Control-Allow-Origin: *');
  $p = array('age' => ($_GET['age'] + rand(3,9)));
  sleep(2);
  echo json_encode($p);
?>
