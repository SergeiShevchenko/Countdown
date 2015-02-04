
var letterWidth = 50;
var letterHeight = 60;
var letterMargin = 10;
var letnum = 1;
var letters = [];
var picked=0;
var vowelNames = ["A","E","U","I","O"];
var vowelFrequency = [9,13,3,7,8];
var vowels = [];
var consonantNames = ["B","C","D","F","G","H","J","K", "L", "M","N","P","R","S","T","Q","W","X","V","Y","Z"];
var consonantFrequency = [2,3,5,3,2,6,1,1,4,3,7,2,6,7,9,1,3,1,1,2,1];
var consonants = [];
var controls = [];
var xStart = 40;
var yStart = 30;
var xPickedStart = 40;
var yPickedStart = 200;
var score = 0;
var result = [];
var string ="";
var buttonWidth = 120;
var buttonHeight = 20;
var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");
var gameAlert = "";
var longestAlert = "";
var longestWords = "";
var colorButton = 'rgb(8,68,128)';
var colorButtonDisabled = 'rgb(212,212,212)';
var colorScreen = 'rgb(56, 109, 194)';
var colorLetterBox = 'rgb(86,158,194)';
var colorLetterStroke = 'rgb(0,36,98)';
var colorLetter = 'rgb(25,70,128)';
var colorScoreBox = 'rgb(38,179,238)';
var colorScoreStroke = 'rgb(0,36,98)';


canvas.addEventListener('click', function(event) {
    var x = event.pageX - canvas.offsetLeft,
        y = event.pageY - canvas.offsetTop;
	handleClick(x,y);
}, false);



function Letter(name, number, x, y)
{
	this.name = name;
	this.number = number;
	this.x = x;
	this.y = y;
	this.pickedNumber = -1;
}			

function Control(name, x, y, w, h)
{
	this.name = name;
	this.x = x;
	this.y = y;
	this.width = w;
	this.height = h;
	this.enabled = true;
}

function addLettersToTheSet()
{
	for (var i=0; i<vowelNames.length; i++)
	{
		for (var j=0; j<vowelFrequency[i]; j++)
		{
			vowels.push(vowelNames[i]);
		}
	}
	for (var i=0; i<consonantNames.length; i++)
	{
		for (var j=0; j<consonantFrequency[i]; j++)
		{
			consonants.push(consonantNames[i]);
		}
	}
}

function addVowel()
{
	var num = Math.floor(Math.random() * vowels.length);
	var let = new Letter(vowels[num],letters.length, xStart+letters.length*(letterWidth+letterMargin), yStart);
	letters.push(let);
	//draw();
}

function addConsonant()
{
	var num = Math.floor(Math.random() * consonants.length);
	var let = new Letter(consonants[num],letters.length, xStart+letters.length*(letterWidth+letterMargin), yStart);
	letters.push(let);
	//draw();
}


function draw()
{	
	// CLEAR SCREEN
	context.fillStyle = colorScreen;
	context.fillRect(0,0,canvas.width,canvas.height);
	context.globalAplha = 0.85;				
	
	// RECTANGLES OF LETTER SETS
	context.fillStyle = colorLetterBox;				
	var halfMargin = letterMargin/2;
	context.fillRect(xStart-halfMargin, yStart-halfMargin,(letterWidth+letterMargin)*9, letterHeight+letterMargin);
	context.fillRect(xPickedStart-halfMargin, yPickedStart-halfMargin,(letterWidth+letterMargin)*9, letterHeight+letterMargin);
	
	// STROKES OF LETTER SETS
	context.beginPath();
    context.rect(xStart-halfMargin, yStart-halfMargin,(letterWidth+letterMargin)*9, letterHeight+letterMargin);
    context.lineWidth = 5;
    context.strokeStyle = colorLetterStroke;
    context.stroke();
    
    context.beginPath();
    context.rect(xPickedStart-halfMargin, yPickedStart-halfMargin,(letterWidth+letterMargin)*9, letterHeight+letterMargin);
    context.stroke();
    
    //SCORE rectangle fill
	context.fillStyle = colorScoreBox;				
	context.fillRect(canvas.width-3*letterWidth+letterMargin, yStart+letterHeight+2*letterMargin,(letterWidth+letterMargin)*1.4, letterHeight+letterMargin);
	
	//SCORE rectangle stroke
	context.beginPath();
    context.rect(canvas.width-3*letterWidth+letterMargin, yStart+letterHeight+2*letterMargin,(letterWidth+letterMargin)*1.4, letterHeight+letterMargin);
	context.lineWidth = 5;
    context.strokeStyle = colorScoreStroke;
    context.stroke();
    
	// SCORE text
	context.textAlign = "center";
	context.textBaseline="top"; 
	context.fillStyle = "white";				
	context.font = "21px Lucida Console";
	context.fillText("SCORE", canvas.width-2*letterWidth, yStart+letterHeight+2*letterMargin);
	context.font = "40px Lucida Console";
	context.fillText(score, canvas.width-2*letterWidth, yStart+1.8*letterHeight);

	// GAME alert text	    	
	context.textAlign = "left";
	context.font = "21px Lucida Console";
	context.fillStyle = "white";
	context.fillText(gameAlert, xPickedStart, yPickedStart+letterHeight+4*letterMargin+buttonHeight);	
    context.fillText(longestAlert, xPickedStart, yPickedStart+letterHeight+7*letterMargin+buttonHeight);	

	
	// LETTERS
	for (var i=0; i<letters.length;i++)
	{
		var letter = letters[i];	
		context.fillStyle = colorLetter;
		context.fillRect(letter.x, letter.y,letterWidth,letterHeight);
		context.textBaseline = "top";
		context.font = "60px Lucida Console";
		context.fillStyle = "white"
		context.fillText(letter.name,letter.x+5,letter.y);
	}				
	
    	
    // CONTROLS
    

	for (var i=0; i<controls.length;i++)
	{
		var contr = controls[i];	
		
		if (contr.enabled) 
			roundRect(context, contr.x,contr.y,contr.width, contr.height, 5, colorButton, true)
		else 					
			roundRect(context, contr.x,contr.y,contr.width, contr.height, 5, colorButtonDisabled, true)
	
		context.fillStyle = "white";
		context.textBaseline = "middle";
		context.font = "20px Lucida Console";					
		context.textAlign = "center";

		context.fillText(contr.name, contr.x+contr.width/2, contr.y+contr.height/2);
	}
}

function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
  if (typeof stroke == "undefined" ) {
    stroke = true;
  }
  if (typeof radius === "undefined") {
    radius = 5;
  }
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
  if (stroke) {
    ctx.stroke();
  }
  if (fill) {
  	ctx.fillStyle = fill;
    ctx.fill();
  }        
}

function startGame(clearScores)
{				
	controls = [];				
	letters = [];
	vowels = [];
	consonants = [];
	addLettersToTheSet();
	gameAlert = "";
	longestAlert = "";
	if (clearScores)
	{
		gameAlert = "";
		score = 0;
	}
	var vow = new Control("Vowel", canvas.width-(buttonWidth+10)*2, canvas.height-buttonHeight*5, buttonWidth, buttonHeight);
	var cons = new Control("Consonant", canvas.width-(buttonWidth+10)*1, canvas.height-buttonHeight*5, buttonWidth, buttonHeight);
	var startAgain = new Control("Start again", canvas.width-(buttonWidth+40), canvas.height-buttonHeight*2, buttonWidth+30, buttonHeight);
	var submitSolution = new Control("Submit solution", xPickedStart, yPickedStart + letterHeight+2*letterMargin, buttonWidth*1.6, buttonHeight);
	controls.push(vow);
	controls.push(cons);
	controls.push(startAgain);
	controls.push(submitSolution);
	controls[3].enabled = false;
	draw();
}

startGame();

function httpGet(word)
{
	$.get(
	    "http://jeffchenga.esy.es/dist/words.php",
	    {functionname : 'is', arguments : word},
	    function(data) {
	       gotAnswer(data);
	    }
	);
}

function gotAnswer(str)
{
	if (str=="yes")
	{
		gameAlert = "Yes! You score " + result.length + " points with \""+string+"\"!\n";		
		score+=result.length;
		//startGame(false);
	}					
	else
	{
		gameAlert = "Unfortunately, \""+string+"\" is not a word.";
		//startGame(false);
	}
	longestAlert = "You could make: " + longestWords;
	var halfMargin = letterMargin/2;
	var next = new Control("NEXT ROUND", xPickedStart-halfMargin, yPickedStart-halfMargin,(letterWidth+letterMargin)*9, letterHeight+letterMargin);
	controls.push(next);	
	controls[3].enabled = false; 
	for (var i=0; i<letters.length;i++)
	{
		var letter = letters[i];
		letter.pickedNumber = -1;
		letter.x = xStart+letter.number*(letterWidth+letterMargin);
		letter.y = yStart;
	}
	
	draw();
}

function gameIsOn()
{
	controls[0].enabled = false;
	controls[1].enabled = false;
	controls[3].enabled = true;
	
	var word = "";
	for (var i=0; i<letters.length; i++)
	{
		word += letters[i].name;
	}
				
	
	$.get(
	    "http://jeffchenga.esy.es/dist/trimWords.php",
	    {
	    	functionname : 'biggest', letters : word.toLowerCase()},
	    	function(data) {
	       		gotBiggestWords(data);
	    	}
	);
}

function gotBiggestWords(words)
{
	longestWords = words;
	//alert(words);
}

function handleClick(x,y)
{
	for (var i=0; i<controls.length;i++)
	{
		var control = controls[i];
		if ((x>=control.x)&&(x<=control.x+control.width)&&(y>=control.y)&&(y<=control.y+control.height)&&control.enabled)
		{
			if (control.name=="Vowel")
				addVowel();
			else if (control.name == "Consonant")
				addConsonant();
			else if (control.name == "Start again")
			{
				startGame(true);
			}
			else if (control.name == "NEXT ROUND")
			{
				startGame(false);
			}
			
			if (control.name == "Submit solution")
			{
				result = [];
				for (var i=0; i<letters.length; i++)
				{
					var letter = letters[i];
					if (letter.pickedNumber!=-1)
						result[letter.pickedNumber]=letter.name;
				}
				string="";
				for (var i=0; i<result.length; i++)
				{
					if (result[i])
						string += result[i];
				}
				
				if (string=="")
				{
					gameAlert = "A word consists at least of one letter.";
					break;
				}
				//alert("Word:" + string+", " + result.length + " letters long.");
				else
				{
					httpGet(string.toLowerCase());
				}
				
			}			
			else 
			{
				if (letters.length==9)
					gameIsOn();
			}
		}
	}
    for (var i=0;i<letters.length;i++)
    {
    	var letter = letters[i];
    	if ((x>=letter.x)&&(x<=letter.x+letterWidth)&&(y>=letter.y)&&(y<=letter.y+letterHeight))
    	{
    		if (letter.pickedNumber==-1)
    		{
    			var picked = 0;

    			for (var p=0; p<letters.length; p++)
    			{
    				var found = false;
	    			for (var j=0; j<letters.length; j++)
	    			{
	    				if (letters[j].pickedNumber==p)
	    				{
	    					found = true;
	    					break;
	    				}
	    			}
	    			if (!found)
	    			{
	    				picked = p;
	    				break;
	    			}
    			}
    			
	    		letter.pickedNumber = picked;	
	    		letter.x = xPickedStart+letter.pickedNumber*(letterWidth+letterMargin);
	    		letter.y = yPickedStart;
    		}
    		else
    		{
    			letter.pickedNumber = -1;
    			letter.x = xStart+letter.number*(letterWidth+letterMargin);
	    		letter.y = yStart;
    		}
    	}
    }
    draw();
}