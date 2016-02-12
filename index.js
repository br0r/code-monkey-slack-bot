var Slack = require('slack-client');
var config = require('./config');

var slackToken = config.token;

var autoReconnect = true;
var autoMark = true;

var slack = new Slack(slackToken, autoReconnect, autoMark);

var getMsg = function() {
  var messages = [
    'I can haz banana?',
    'Monkey monkey!',
    'Work work.',
    'Ooh ooh ahh ahh',
    'Ooog?',
    'Monkey solve buggs',
    'Monkey get up, get coffee',
    'Ooog, booring meeting.',
    'Manager gorilla.',
    'Code monkey like me.',
    'Code monkey like you.'
  ];
  var rand = Math.floor(Math.random() * messages.length);
  return messages[rand];
};

slack.on('open', function() {
  console.log('Connected', slack.team.name, 'as', slack.self.name);
});

slack.on('message', function(message) {
  console.log('got message', message.text);
  var channel = slack.getChannelGroupOrDMByID(message.channel);
  var msg = getMsg();
  if (typeof message.text !== 'undefined' && message.text.toLowerCase().indexOf('monkey') !== -1) {
    console.log('matched msg');
    channel.send(msg);
  } else if (channel.is_im === true) {
    console.log('got im');
    channel.send(msg);
  }

});

slack.login();
