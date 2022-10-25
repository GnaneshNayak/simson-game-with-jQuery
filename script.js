let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = []; ///random by nextsqence
let userClickedPattern = [];
let started = false;
let level = 0;

$(document).keypress(function () {
  if (!started) {
    $("#level-title").text(`level ${level}`);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function () {
  let userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  //   console.log(userClickedPattern);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  //   console.log(`userClickedPattern.length - 1 ${userClickedPattern.length - 1}`);
  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
  //   console.log(`gamePattern[currentLevel] ${gamePattern[currentLevel]}`);
  //   console.log(
  //     ` userClickedPattern[currentLevel] ${userClickedPattern[currentLevel]}`
  //   );
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 1000);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function nextSequence() {
  //   userClickedPattern = [];
  level++;
  $("#level-title").text(`level ${level}`);
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $(`#${randomChosenColour}`).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  animatePress(randomChosenColour);
  //   console.log(gamePattern);
}

function playSound(name) {
  let audio = new Audio(`sounds/${name}.mp3`);
  audio.play();
}

function animatePress(currentColour) {
  $(`#${currentColour}`).addClass("pressed");
  setTimeout(function () {
    $(`#${currentColour}`).removeClass("pressed");
  }, 500);
}

function startOver() {
  level = 0;
  started = false;
  userClickedPattern = [];
  gamePattern = [];
}
