<!DOCTYPE html>
<html>
  <head>
    <script src="http://lab.subinsb.com/projects/jquery/core/jquery-2.1.1.js"></script>
    <script src="http://lab.subinsb.com/projects/jquery/voice/recorder.js"></script>
    <script src="http://lab.subinsb.com/projects/jquery/voice/jquery.voice.min.js"></script>
    
    <script src="cdn/ws.js"></script>
    <script src="cdn/time.js"></script>
    <script src="cdn/chat.js"></script>
    <link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
    <link href="cdn/chat.css" rel="stylesheet"/>
    <title>Chat</title>
  </head>
  <body>
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <center><h1>First Page HQ</h1></center>
        </div>
      </div>
      <div class="row">
        <div class="chatWindow col-md-12">
          
            <div style="display: none;postion: absolute;">
              <input type="file" id="photoFile" accept="image/*" />
              <audio src="cdn/message.wav" controls="false" id="notification"></audio>
            </div>
            <div class="col-md-2 users"></div>
            <div class="col-md-10 chatbox">
              <div class="topbar">
                <p>Status:<a href="javascript:;"><b><span id="status" title="Click to Login/Logout">Offline</span></b></a></p>
              </div>
              <div class="chat">
                <div class="msgs"></div>
                <form id="msgForm">
                  <textarea name="msg" placeholder="Type message here...."></textarea>
                  <a class="button" id="voice" title="Click to start recording message"></a>
                  <a class="button" id="photo" title="Type in a message and choose image to send"></a>
                </form>
              </div>
              <div class="login text-center">
                <p>Type in your name to start chatting !</p>
                <form id="loginForm">
                  <input type="text" value="" />
                  <button>Submit</button>
                </form>
              </div>
            </div>
        </div>
      </div>
    </div>
  </body>
</html>
