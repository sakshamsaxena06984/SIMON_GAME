
var game_color=["red","blue","green","yellow"];

var game_pattern=[];



var user_choose_color=[];

// for initializing the game
var started=false;
//initializing the Level
var level=0;

$(document).keypress(function() {
    if (!started) {
  
      //3. The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
  });


$(".btn").click(function(){

    //pick user choose color here
    var user_choose_color_name=$(this).attr("id");

    //push user chose color in user_choose_color array
    
    user_choose_color.push(user_choose_color_name);
    play_sound(user_choose_color_name);

    animatePress(user_choose_color_name);

    checkAnswer(user_choose_color.length-1);
});


//1. Create a new function called checkAnswer(), it should take one input with the name currentLevel
function checkAnswer(currentLevel) {

    //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if (game_pattern[currentLevel] === user_choose_color[currentLevel]) {

      console.log("success");

      //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
      if (user_choose_color.length === game_pattern.length){

        //5. Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    } else {

      console.log("wrong");

      //1. In the sounds folder, there is a sound called wrong.mp3, play this sound if the user got one of the answers wrong.
      play_sound("wrong");

      //2. In the styles.css file, there is a class called "game-over", apply this class to the body of the website when the user gets one of the answers wrong and then remove it after 200 milliseconds.
      $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      //3. Change the h1 title to say "Game Over, Press Any Key to Restart" if the user got the answer wrong.
      $("#level-title").text("Game Over, Press Any Key to Restart");

      //2. Call startOver() if the user gets the sequence wrong.
      startOver();

    }

}

function nextSequence() {
    user_choose_color=[];

    //4. Inside nextSequence(), increase the level by 1 every time nextSequence() is called.
    level++;
  
    //5. Inside nextSequence(), update the h1 with this change in the value of level.
    $("#level-title").text("Level " + level);
  
    //find the random number between 0 to 3(included)
    var random_number=Math.floor(Math.random()*4);

    //take color via game_color array
    var color_name=game_color[random_number];

    //put above color in game_pattern array
    game_pattern.push(color_name);

    //use J-Query selector
    $("#"+color_name).fadeIn(100).fadeOut(100).fadeIn(100);

    //for play the sound ,,apply the play_sound function

    play_sound(color_name);
  }


//play the sound in game
function play_sound(color_name1){

    var tone=new Audio("sounds/"+color_name1+".mp3");
    tone.play();

}


function animatePress(currentColor) {

    //2. Use jQuery to add this pressed class to the button that gets clicked inside animatePress().
    $("#" + currentColor).addClass("pressed");
  
    //3. use Google/Stackoverflow to figure out how you can use Javascript to remove the pressed class after a 100 milliseconds.
    setTimeout(function () {
      $("#" + currentColor).removeClass("pressed");
    }, 100);
  }


  //1. Create a new function called startOver().
function startOver() {

  //3. Inside this function, you'll need to reset the values of level, gamePattern and started variables.
  level = 0;
  game_pattern = [];
  started = false;
}
