let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let randomChosenColour;
let userClickedPattern = [];
let level = 0;
let started = false;

//press any key to start the game
$(document).keypress(function () {
  if (!started) {
    nextSequence();
    $("#level-title").text("Level" + level);
    started = true;
  }
});

//pc indicate the next colour by blink effect and sound effect 
function nextSequence() {

  //reset the userClickedPattern to an empty array ready for the next level.
  userClickedPattern = [];

  //UI update
  level += 1;
  $("#level-title").text("Level" + level);

  //random number => color
  let randomNumber = Math.floor(Math.random() * 4);
  console.log(randomNumber);

  randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  //blink effect
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  //sound effect
  playSound(randomChosenColour);
}

$(".btn").click(function () {

  //get id from button object
  let userChosenColour = $(this).attr("id");

  //create click pattern
  userClickedPattern.push(userChosenColour);

  //console.log(userClickedPattern)

  //play corresponding sound
  playSound(userChosenColour);

  //add press visual effect
  animatePress(userChosenColour);

  //call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
  checkAnswer(userClickedPattern.length - 1);
});


//play sound function
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//press animate function
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);

}

function checkAnswer(currentLevel) {

  // check if the most recent user answer is the same as the game pattern. 
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");

    //check if user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
    if (userClickedPattern.length === gamePattern.length) {

      //call nextSequence() after a 1000 millisecond delay.
      setTimeout(function () {
        nextSequence();
      }, 1000);

    } 
  }
  else {
    console.log("wrong");
    //play wrong sound
    playSound("wrong");

    //web background turn red for 200ms
    $("body").addClass("game-over");
    setTimeout(function(){$("body").removeClass("game-over")}, 200);

    //UI indication for restart
    $("#level-title").text("Game Over. Press Any Key to Restart.");

    //reset game
    startOver();
  }
}

//when user gets wrong, reset game
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}