var Bot = require('bot');
var PF = require('pathfinding');
var bot = new Bot('igim2ji0', 'training', 'http://24.6.28.217:9000');
var goDir;
var Promise = require('bluebird');
Bot.prototype.botBrain = function() {
    return new Promise(function(resolve, reject) {
            _this = bot;
        
        // Write your bot below Here//
            var myPos = [bot.yourBot.pos.x, bot.yourBot.pos.y];
        
        var rand = Math.floor(Math.random() * 3);
        var dirs = ["north", "south", "east", "west"];
        bot.goDir = dirs[rand];
        
        
        // DON'T REMOVE ANYTHING BELOW THIS LINE //
        resolve();
    });
}
bot.runGame();