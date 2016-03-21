function log(m){
  console.log(m);
}
String.prototype.linkify = function() {

  // http://, https://, ftp://
  var urlPattern = /\b(?:https?|ftp):\/\/[a-z0-9-+&@#\/%?=~_|!:,.;]*[a-z0-9-+&@#\/%=~_|]/gim;

  // www. sans http:// or https://
  var pseudoUrlPattern = /(^|[^\/])(www\.[\S]+(\b|$))/gim;

  // Email addresses
  var emailAddressPattern = /[\w.]+@[a-zA-Z_-]+?(?:\.[a-zA-Z]{2,6})+/gim;

  return this
    .replace(urlPattern, '<a target="_blank" href="$&">$&</a>')
    .replace(pseudoUrlPattern, '$1<a target="_blank" href="http://$2">$2</a>')
    .replace(emailAddressPattern, '<a target="_blank" href="mailto:$&">$&</a>');
};

window.prevKeyCode, window.checkConnection = "";

window.scrollToBottom = function(){
  scrollHeight = $(".chatWindow .chatbox .msgs")[0].scrollHeight || 0;
  $(".chatWindow .chatbox .msgs").animate({
    scrollTop : scrollHeight
  }, 0);
  Fr.timeago();
};

window.connect = function(){
  // ws-subins.rhcloud.com:8000

  //window.ws = $.websocket("ws://ws-subins.rhcloud.com:8000/?service=advanced-chat", {
    window.ws = $.websocket('ws://localhost:9000?service=advanced-chat', {
    open: function() {
      clearInterval(checkConnection);
      $(".chatWindow .chatbox #status").text("Online");
    },
    close: function() {
      if($(".chatWindow .chatbox #status").text() == "Online"){
        $(".chatWindow .chatbox #status").click();
        window.checkConnection = setInterval(function(){
          connect();
        }, 20000);
      }
      $(".chatWindow .chatbox #status").text("Offline");
    },
    events: {
      fetch: function(e) {
        
      },
      onliners: function(e){
        $(".chatWindow .users").html('');

        var user_id = Object.keys(e.data)[Object.keys(e.data).length - 1];

        $.each(e.data, function(i, elem){
          if(i!== Object.keys(e.data)[Object.keys(e.data).length - 1])
            $(".chatWindow .users").append("<div class='user'><a href='#"+user_id+"_"+i+"'>"+ elem +"</a></div>");
        });
      },
      single: function(e){
        elem = e.data;
        attachmentURL = typeof elem.file_name != "undefined" ? window.location.href + "uploads/" + elem.file_name : "";
        
        if(elem.type == "text"){
          html = "<div class='msg' id='"+ elem.id +"'><div class='name'>"+ elem.name.substring(0, 1) +"</div><div class='msgc'><div>"+ elem.msg.linkify() +"</div><div class='posted'><span class='timeago'>"+ elem.posted +"</span> by "+ elem.name +"</div></div></div>";
          
          if(typeof elem.append != "undefined"){
            $(".msgs .msg:last").remove();
          }
          
          if(typeof elem.earlier_msg == "undefined"){
            $(".chatWindow .chat .msgs").append(html);
            scrollToBottom();
          }else{
            $(".chatWindow .chat .msgs #load_earlier_messages").remove();
            $(".chatWindow .chat .msgs .msg:first").before(html);
          }
        }else if(elem.type == "img"){
          html = "<div class='msg' id='"+ elem.id +"'><div class='name'>"+ elem.name.substring(0, 1) +"</div><div class='msgc'><div>"+ elem.msg.linkify() +"</div><div class='extra'><a target='_blank' href='"+ attachmentURL +"'><img src='"+ attachmentURL +"' /></a></div><div class='posted'><span class='timeago'>"+ elem.posted +"</span> by "+ elem.name +"</div></div></div>";
          
          $(".chatWindow .chat .msgs").append(html);
          scrollToBottom();
        }else if(elem.type == "audio"){
          html = "<div class='msg' id='"+ elem.id +"'><div class='name'>"+ elem.name.substring(0, 1) +"</div><div class='msgc'><div>"+ elem.msg.linkify() +"</div><div class='extra'><audio controls='controls' src=\""+ attachmentURL +"\"></audio></div><div class='posted'><span class='timeago'>"+ elem.posted +"</span> by "+ elem.name +"</div></div></div>";

          $(".chatWindow .chat .msgs").append(html);
          scrollToBottom();
        }else if(elem.type == "more_messages"){
          $(".chatWindow .chat .msgs .msg:first").before("<a id='load_earlier_messages'>Load Earlier Messages...</a>");
        }
        if(window.user != elem.name){
          $(".chatWindow #notification")[0].play();
        }
        Fr.timeago();
      },
      register: function(e){
        if(e.data == "taken"){
          window.user = "";
          alert("Name already in use. Try another name");
        }else{
          $(".chatWindow .login").fadeOut(1000, function(){
            $(".chatWindow .chat").fadeIn(1000, function(){
              scrollToBottom();
              $(".chatWindow .chat #msgForm input[type=text]").focus();
            });
          });
        }
      }
    }
  });
};

$(document).ready(function(){
  connect();
  
  $(document).on("click", "#load_earlier_messages", function(){
    ws.send("fetch", {"id" : $(".msgs .msg:first").attr("id")});
  });
  
  $(".chatWindow .chatbox .topbar #fullscreen").on("click", function(){
    if($(".chatWindow").hasClass("fullscreen")){
      $("#content").css("min-width", 600);
      $(".chatWindow").removeClass("fullscreen");
    }else{
      $("#content").css("min-width", 0);
      $(".chatWindow").addClass("fullscreen");
    }
  });
  
  $(".chatWindow .chat #msgForm textarea").on("keydown", function(e){
    if(e.keyCode == 13 && prevKeyCode != 16){
      e.preventDefault();
      $(".chatWindow .chat #msgForm").submit();
    }
    prevKeyCode = e.keyCode;
  });
  
  $(".chatWindow .chat #msgForm").on("submit", function(e){
    e.preventDefault();
    var form = $(this);
    var val   = $(this).find("textarea").val();
    
    if(val != ""){
      ws.send("send", {"type" : "text", "msg": val});
      form[0].reset();
    }
  });

  $(".chatWindow .login #loginForm").on("submit", function(e){
    e.preventDefault();
    var val  = $(this).find("input[type=text]").val();
    
    if(val != ""){
      window.user = val;
      ws.send("register", {"name": val});
    }else{
      alert("Come on, type in a name");
    }
  });
  
  $(".chatWindow .chatbox #status").on("click", function(){
    if($(this).text() == "Offline"){
      connect();
    }else{
      ws.close();
      $(".chatWindow .chat").fadeOut(1000, function(){
        $(".chatWindow .login").fadeIn(1000, function(){
          $(".chatWindow .msgs, .chatWindow .users").html('');
          $(".chatWindow .login #loginForm input[type=text]").focus();
        });
      });
    }
  });
  
  $(".chatWindow .chatbox #photo").on("click", function(){
    $(".chatWindow #photoFile").click();
  });
  
  $(".chatWindow #photoFile").change(function(){
    if(typeof $(".chatWindow #photoFile")[0].files[0] != "undefined"){
      file = $(".chatWindow #photoFile")[0].files[0];
      
      fd = new FormData();
      fd.append('file', file);
      
      $.ajax({
        xhr: function() {
          var xhr = new window.XMLHttpRequest();

          xhr.upload.addEventListener("progress", function(evt) {
            if(evt.lengthComputable) {
              var percentComplete = evt.loaded / evt.total;
              percentComplete = parseInt(percentComplete * 100);
              console.log(percentComplete);
              $("#msgForm").css({background : "linear-gradient(90deg, #009bcd "+ percentComplete +"%, white 0%)"});
            }
          }, false);
          return xhr;
        },
        //url: "http://demos.dev/php/advanced-chat-websocket/upload.php",
        url: "upload.php",
        type: "POST",
        data: fd,
        processData: false,
        contentType: false,
        success: function(result) {
          $("#msgForm").css({background : ""});
          val  = $("#msgForm").find("textarea").val();
          if(result != ""){
            ws.send("send", {"type" : "img", "msg" : val, "file_name" : result});
            $("#msgForm").find("textarea").val('');
          }
        }
      });
    }
  });
  
  timeoutId = 0;
  $('.chatWindow #voice').on("click", function() {
    $that = $(this);
    if($that.hasClass("active")){
      $.voice.export(function(blob){
        val  = $("#msgForm").find("textarea").val();
        
        var fd = new FormData();
        fd.append('file', blob);

        $.ajax({
          xhr: function() {
            var xhr = new window.XMLHttpRequest();

            xhr.upload.addEventListener("progress", function(evt) {
              if(evt.lengthComputable) {
                var percentComplete = evt.loaded / evt.total;
                percentComplete = parseInt(percentComplete * 100);
                $("#msgForm").css({background : "linear-gradient(90deg, #009bcd "+ percentComplete +"%, white 0%)"});
              }
            }, false);
            return xhr;
          },
          //url: "http://demos.dev/php/advanced-chat-websocket/upload.php",
          url: "upload.php",
          type: "POST",
          data: fd,
          processData: false,
          contentType: false,
          success: function(result) {
            $("#msgForm").css({background : ""});
            val  = $("#msgForm").find("textarea").val();
            ws.send("send", {"type" : "audio", "msg" : val, "file_name" : result});
            $("#msgForm").find("textarea").val('');
          }
        });
      }, "blob");
      $.voice.stop();
      $that.removeClass("active");
    }else{
      $.voice.record(false, function(){
        $that.addClass("active");
      });
    }
  });
  $('#msgForm > textarea').focus( function() {
    $('#msgForm ').addClass('active-msg');
  });

  $('#msgForm > textarea').blur( function() {
    $('#msgForm ').removeClass('active-msg');
  });
});
