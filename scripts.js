//setting up the lets


let sentences = ['ten ate neite ate nee enet ite ate inet ent eate', 'Too ato too nOt enot one totA not anot tOO aNot', 'oat itain oat tain nate eate tea anne inant nean', 'itant eate anot eat nato inate eat anot tain eat', 'nee ene ate ite tent tiet ent ine ene ete ene ate'];
let target = $("#target-letter");
let sentence = $("#sentence");
let sentenceCounter = 0;
let letterCounter = 0;
let letterString = sentences[sentenceCounter].toString();
let letterStringLength = letterString.length
let wrongLetters = 0;
let startTime;
let endTime;
let minutes;
let sentenceCount = sentences.length;
let letterCount = sentences.join('').split('').length;
let wordCount = sentences.join(' ').split(' ').length;
let averageWordLength = letterCount/wordCount;
let wordsPerMinute;
let gameActiveCount = false;

sentence.html(letterString);

target.html(letterString[letterCounter])

$("#keyboard-upper-container").hide();
      
$( document).keydown(function (e) {
    if (e.keyCode == 16) {
        $("#keyboard-lower-container").hide();
        $("#keyboard-upper-container").show();
    }
  });

$( document ).keyup(function (e) {
    if (e.keyCode == 16) {
        $("#keyboard-lower-container").show();
        $("#keyboard-upper-container").hide();
    }
  });



$(document).keypress(function (e) {
    let currentKey = e.which;
    
    if (gameActiveCount === false && sentenceCounter < sentenceCount) {
      startTime = Date.now();
      gameActiveCount = true;
    }
    
    inputKey(e)

  
    $('#' + currentKey).css("background-color", "yellow")
    setTimeout(function () {
      $('#' + currentKey).css("background-color", "")
    }, 120);
    
  });

function inputKey(e) {
   
  if (gameActiveCount === true) {
        let currentLetter = target.html();
        let currentKey = e.which;
        let expectedKey = currentLetter.charCodeAt();
        if (currentKey == expectedKey) { checknextLetter() } else { wrongLetter() };
  }
      };


function checknextLetter() {
 
    $('#yellow-block').animate({left: "+=18px"}, 10);
    $('#feedback').append('<span class="glyphicon glyphicon glyphicon-ok"></span>');
  
  if (letterCounter > letterStringLength - 2) {
    refreshSentence();
    } else {
       letterCounter += 1;
       target.html(letterString[letterCounter]); 
    };
  }



function wrongLetter(){
    
    wrongLetters += 1
    $('#yellow-block').animate({left: "+=18px"}, 10);
    $('#feedback').append('<span class="glyphicon glyphicon glyphicon-remove"></span>');
  if (letterCounter > letterStringLength - 2) {refreshSentence();
    } else {
   
       letterCounter += 1;
       target.html(letterString[letterCounter]); 
    };
    };


function refreshSentence(){
    
    sentenceCounter += 1
  
    if (sentenceCounter < sentenceCount) {
  
       $( "#feedback" ).empty()
       letterString = sentences[sentenceCounter].toString();
       letterStringLength = letterString.length
       sentence.html(letterString);
       target.html(letterString[0])
       letterCounter = 0;
       $('#yellow-block').animate({left: "20px"});
  
  
    } else {
      gameActiveCount = false;
      endTime = Date.now();
      minutes = (endTime - startTime) / 1000 / 60;
      wordsPerMinute = (letterCount - wrongLetters) / averageWordLength / minutes;
       $('#yellow-block').animate({opacity: "0%"}, 1500);
       $( "#sentence" ).empty()
       $( "#target-letter" ).empty()
       $("#button-group").append('<button id="clickNewGame">Play Again!</button>');
       $("#clickNewGame").on("click", function(){
        location.reload();
       })
       $( "#sentence" ).html("<p>Your words per minute: " +  wordsPerMinute.toFixed(2) + " </p>")
    }
   
  }