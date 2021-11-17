

var started = false;

var level = 0; // Level name starts from 0

var userClickedPattern = []; // pattern created by user

var gamePattern = []; // random pattern by game

var buttonColours = [ // array with buton colors
  "red",
  "blue",
  "green",
  "yellow"
]

//listening a keypress to start a game

$(document).on("keydown", function(){
  if (!started) {
    $("#level-title").text("level " + level);
    nextSequence();
    started = true;
  }
});

//User's pattern

$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  //2. Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {

    //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");

      //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
      if (userClickedPattern.length === gamePattern.length){

        //5. Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    } else {
  var audio = new Audio("sounds/wrong.mp3");
  audio.play();
  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 200);
  $("#level-title").text("Gave Over, Press Any Key to Restart");
  startOver();

}

}


function nextSequence() {

userClickedPattern = [];

level++;

$("#level-title").text("level " + level);

var randomNumber = Math.floor(Math.random() * 4);

var randomChosenColour = buttonColours[randomNumber];

gamePattern.push(randomChosenColour);

$("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

playSound(randomChosenColour);

};

function playSound(name) {

  var audio = new Audio ("sounds/" + name + ".mp3");
  audio.play();

};

// animating button
function animatePress(color) {

$("#" + color).addClass("pressed");
setTimeout(function() {
  $("#" + color).removeClass("pressed");
}, 100);

};

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
};
