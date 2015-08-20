// Global Variables //
var require;
var Bot = require('bot');
var PF = require('pathfinding');
//var bot = new Bot('7l8u02n4', 'arena', 'http://vindinium.org');
var bot = new Bot('329kxzak', 'arena', 'http://24.6.28.217:9000');
var goDir;
var i;
var _this;
var findPath;
var yourBot;
var Promise = require('bluebird');

// Function that causes my code to run //
Bot.prototype.botBrain = function() {
    return new Promise(function(resolve, reject) {
        _this = bot;
        
        // Variables //
        var enemyBots = [bot.bot1, bot.bot2, bot.bot3, bot.bot4];
            enemyBots.splice(bot.yourBot.id - 1, 1);
        var enemyMines = [];
            if(bot.yourBot.id != 1) enemyMines = enemyMines.concat(bot.bot1mines);
            if(bot.yourBot.id != 2) enemyMines = enemyMines.concat(bot.bot2mines);
            if(bot.yourBot.id != 3) enemyMines = enemyMines.concat(bot.bot3mines);
            if(bot.yourBot.id != 4) enemyMines = enemyMines.concat(bot.bot4mines);
        var myPos = [bot.yourBot.pos.x, bot.yourBot.pos.y];
        var closestMine = bot.freeMines[0];
        var Taverns = bot.taverns[0];
        var allMines = enemyMines.length + bot.freeMines.length;
        var closeEnemyMine = enemyMines[0];
        var lowestEnemy = enemyBots[0];
        var rand = Math.floor(Math.random() * 3);
        var dirs = ["north", "south", "east", "west"];
        
        // This Code finds the nearest Free Mine and goes in that direction by default //
        for(i = 0; i < bot.freeMines.length; i++) {
            if(bot.findDistance(myPos, closestMine) > bot.findDistance(myPos, bot.freeMines[i])) {
                closestMine = bot.freeMines[i];
            }
        }
        bot.goDir = bot.findPath(myPos, closestMine);
        
        // This Code finds the nearest Tavern and goes in that direction if my life is <= 35 // 
        if(bot.yourBot.life <= 35) {
            for(i = 0; i < bot.taverns.length; i++) {
                if(bot.findDistance(myPos, Taverns) > bot.findDistance(myPos, bot.taverns[i])) {
                    Taverns = bot.taverns[i];
                }
            }
            console.log("Sodam");
            bot.goDir = bot.findPath(myPos, Taverns);
        }
        
        // This Code takes two drinks if my life is <= 80 //
        else if((bot.findDistance(myPos, Taverns) === 2) && (bot.yourBot.life <= 80)) {
            console.log("Sodam2");
            bot.goDir = bot.findPath(myPos, Taverns);
            }
        
        // This Code attacks enemy mines when there are <= 30% of mines left //
        else if (bot.freeMines.length <= 0.3 * allMines){
            for(i = 0; i < enemyMines.length; i++) {
                if(bot.findDistance(myPos, closeEnemyMine) > bot.findDistance(myPos, enemyMines[i])) {
                    closeEnemyMine = enemyMines[i];
                }
            }
            console.log("Takeo");
            bot.goDir = bot.findPath(myPos, closeEnemyMine);
        }
        
        // This code attacks enemies with less than double my health when there are <= 25% of mines left and my life <= 60 //
        else if (bot.freeMines.length <= 0.25 * allMines && bot.yourBot.life >= 60){
            for (i = 0; i <  enemyBots.length; i++){
                if (bot.yourBot.life > enemyBots[i].life * 2){
                    lowestEnemy = enemyBots[i];
                }
            }
            console.log("Killgrave");
            bot.goDir = bot.findPath(myPos, [lowestEnemy.pos.x, lowestEnemy.pos.y]);
        }
        
        // This code moves in a random direcion if my bot is not moving //
//         else if (bot.goDir === "none"){
//             bot.goDir = dirs[rand];
//         }
       
        // DON'T REMOVE ANYTHING BELOW THIS LINE //
        resolve();
    });
};
bot.runGame();