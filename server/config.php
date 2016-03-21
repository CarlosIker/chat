<?php
/**
 * http://subinsb.com/php-websocket-advanced-chat
 */
ini_set("display_errors","on");
$docRoot  = realpath(dirname(__FILE__));

if( !isset($dbh) ){
  session_start();
  date_default_timezone_set("UTC");
  $musername = "root";
  $mpassword = "";
  $hostname  = "localhost";
  $dbname    = "cdcol";
  $port      = "3306";
  /*
  $musername = "dnacellr";
  $mpassword = "magl.osb";
  $hostname  = "localhost";
  $dbname    = "chat";
  $port      = "3306";
*/
  $dbh = new PDO("mysql:dbname={$dbname};host={$hostname};port={$port}", $musername, $mpassword);
  /**
   * Change The Credentials to connect to database.
   */
}
?>
