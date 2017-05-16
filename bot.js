var HTTPS = require('https');
var cool = require('cool-ascii-faces');

var botID = process.env.BOT_ID;

function respond() {
  //request contains parsed message from GroupMe
  var request = JSON.parse(this.req.chunks[0]),
      coolGuyRegex = /^\/cool guy$/;
  var navySealRegex = /^\/navy seal$/

  
  
  //Handle any '/' commands 
  if(request.text && navySealRegex.test(request.text)){
    //Navy Seal Copy Pasta
    this.res.writeHead(200);
    var message = 'What the fuck did you just fucking say about me, you little bitch? I’ll have you know I graduated top of my class in the Navy Seals, and I’ve been involved in numerous secret raids on Al-Quaeda, and I have over 300 confirmed kills. I am trained in gorilla warfare and I’m the top sniper in the entire US armed forces. You are nothing to me but just another target. I will wipe you the fuck out with precision the likes of which has never been seen before on this Earth, mark my fucking words. You think you can get away with saying that shit to me over the Internet? Think again, fucker. As we speak I am contacting my secret network of spies across the USA and your IP is being traced right now so you better prepare for the storm, maggot. The storm that wipes out the pathetic little thing you call your life. You’re fucking dead, kid. I can be anywhere, anytime, and I can kill you in over seven hundred ways, and that’s just with my bare hands. Not only am I extensively trained in unarmed combat, but I have access to the entire arsenal of the United States Marine Corps and I will use it to its full extent to wipe your miserable ass off the face of the continent, you little shit. If only you could have known what unholy retribution your little “clever” comment was about to bring down upon you, maybe you would have held your fucking tongue. But you couldn’t, you didn’t, and now you’re paying the price, you goddamn idiot. I will shit fury all over you and you will drown in it. You’re fucking dead, kiddo.';
    postMessage(message);
  }
  else if(request.text && coolGuyRegex.test(request.text)) {
    //Cool Guy Face
    this.res.writeHead(200);
    var message = cool();
    postMessage(message);
  } 

  //Randomly select a number out of 50
  //If we select 21, say that person is bad at smash
  var badAtSmashNum = Math.floor(Math.random() * (50 - 0)) + 0;

  if(badAtSmashNum == 21){
    this.res.writeHead(200);
    var message = request.name + ", you're bad at Smash";
    postMessage(message);
  }

  this.res.end();
}

/**
  Send a message to the group chat

  Params:

  -botResponse: the text we want to send to the chat
  */
function postMessage(botResponse) {
  var options, body, botReq;


  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  body = {
    "bot_id" : botID,
    "text" : botResponse
  };

  console.log('sending ' + botResponse + ' to ' + botID);

  botReq = HTTPS.request(options, function(res) {
      if(res.statusCode == 202) {
        //neat
      } else {
        console.log('rejecting bad status code ' + res.statusCode);
      }
  });

  botReq.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
  });
  botReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
  botReq.end(JSON.stringify(body));
}



exports.respond = respond;
