<?php
use Ratchet\Server\IoServer;
use Ratchet\Http\HttpServer;
use Ratchet\WebSocket\WsServer;

require_once __DIR__ . "/config.php";
require_once __DIR__ . "/vendor/autoload.php";
require_once __DIR__ . "/class.chat.php";
  
$server = IoServer::factory(
  new HttpServer(
    new WsServer(
      new AdvancedChatServer()
    )
  ),
  9000
);
$server->run();
