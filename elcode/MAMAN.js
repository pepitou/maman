var ctx;
var canvas;
var longClic;

var tryNb = 0;
var time = 0;
var timeStart = 0;
var timeEnd = 0;

var xmaman;
var ymaman;

var faceMatrix = new Array();
for (var i = 0; i < 4; i++) {
	faceMatrix[i] = new Array(0,0,0);
}

/****************************************GAMEPLAY***************************************************/

/*Determine l'emplacement sur la matrice de l'endroit clické*/
function detFaceClicked(coords){
	var x = coords.x - GRID_OFFSET;
	var y = coords.y - GRID_OFFSET;
	
	var i = Math.floor(x / SIZE_WIDTH_CELL);
	var j = Math.floor(y / SIZE_HEIGHT_CELL);

	var face = {i:null, j:null};
	face.i = i;
	face.j = j;
	
	if ((face.i>=0)&&(face.i<=3)&&(face.j>=0)&&(face.j<=2)) return (face);
	else return (null);
};


var press = function (e) {
	longClic = true;
	
	var totalOffsetX = 0;
	var totalOffsetY = 0;
	var canvasX = 0;
	var canvasY = 0;
	var currentElement = this;

	do{
		totalOffsetX += currentElement.offsetLeft;
		totalOffsetY += currentElement.offsetTop;
	}
	while(currentElement = currentElement.offsetParent)

	canvasX = e.pageX - totalOffsetX ;
	canvasY = e.pageY - totalOffsetY ;
	
	var currentFace = detFaceClicked({x:canvasX, y:canvasY});
	if (currentFace){
		if (faceMatrix[currentFace.i][currentFace.j].enabled) {
			faceMatrix[currentFace.i][currentFace.j].enabled = false;
			ctx.clearRect(currentFace.i*SIZE_WIDTH_CELL+GRID_OFFSET, currentFace.j*SIZE_HEIGHT_CELL+GRID_OFFSET, SIZE_WIDTH_CELL_PIX, SIZE_HEIGHT_CELL_PIX);
		}
		else{
			faceMatrix[currentFace.i][currentFace.j].enabled = true;
			faceMatrix[currentFace.i][currentFace.j].render(currentFace.i,currentFace.j);
		}
	}
	else printSentence();
	//console.log(generateAffirmation());
	//console.log(generateNegation());
	winOrLose();
}

function winOrLose(){
	var count = 0;
	for (i=0 ; i< CELL_NUMBER_PER_ROW ; i++){
		for (j=0 ; j< CELL_NUMBER_PER_COLUMN ; j++){  
			if (faceMatrix[i][j].enabled == false){
				count ++;
			}
		}
	}

	if (!localExecution && audioCompatible){
		if (count <= 3) audioIntensity.setIntensity(0);
		if ((count >3)&&(count<=7)) audioIntensity.setIntensity(1);
		if ((count >7)&&(count<=10)) audioIntensity.setIntensity(2);
		if (count >10) audioIntensity.setIntensity(3);
	}

	if (count>10){
		for (i=0 ; ((i< CELL_NUMBER_PER_ROW) && (gameEnded==false)) ; i++){
			for (j=0 ; j< CELL_NUMBER_PER_COLUMN ; j++){  
				if (faceMatrix[i][j].enabled == true){
					gameEnded = true;
					if ((i == xmaman)&&(j==ymaman)){
							doVictory();
					}
					else{
							doFailouse();
					}
				}
			}
	}
	}
}


function printSentence(){
	var rand = Math.floor(Math.random()*5); //0->4 = 5
	var txt = null;

	ctx.font = "19pt boum,Calibri,Geneva,Arial";
	ctx.strokeStyle = "rgb(218,217,220)";
	//ctx.fillStyle = "rgb(218,217,220)";
	ctx.fillStyle = "rgb(72,9,61)";
	ctx.lineWidth = 5;
	ctx.clearRect(10, 700, 1000, 1000);

	if (rand == 4){
		txt = generateAffirmation();
	}
	else{
		txt = generateNegation();
	}

	ctx.strokeText(txt, 100, 758);
	ctx.fillText(txt, 100, 758);

}

function init(){
	// On récupère l'objet canvas
	canvas = document.getElementById('gameCanvas');
	if (!canvas || !canvas.getContext) {
		return;
	}	
	canvas.addEventListener("mousedown", press, false);
	canvas.addEventListener("touchstart", press, false);

	// On récupère le contexte 2D
	ctx = canvas.getContext('2d');

	if (!ctx) {
		return;
	}

	ctx.globalAlpha = 1;
	
	try {
		ctxA = new webkitAudioContext();
		audioCompatible = true;
	}
	catch(e) {
		// ctxL.save();
		// 	ctxL.fillStyle = '#c9e726';
		// 	ctxL.fillText('Your browser is not compatible, sorry', 400,700);
		// 	ctxL.fillText('You can use Chrome', 435,720);
		// ctxL.restore();
	}
	
	//Clear du canvas
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	
	for (i=0 ; i< CELL_NUMBER_PER_ROW ; i++){
		for (j=0 ; j< CELL_NUMBER_PER_COLUMN ; j++){  
			faceMatrix[i][j] = new Face();
			faceMatrix[i][j].generate();
			faceMatrix[i][j].render(i,j);
		}
	}
	setTheMom();
	printSentence();
}

function startOST() {
	if (!localExecution && audioCompatible) audioIntensity.playPause();
}

function setTheMom(){
	xmaman = Math.floor(Math.random()*4);
	ymaman = Math.floor(Math.random()*3);
	faceMatrix[xmaman][ymaman].maman = true;
	console.log('maman : ' + xmaman + ' , ' + ymaman);
}

function generateAffirmation(){
	//Ma maman a :
	var	affirmation;
	var rand = Math.floor(Math.random()*6); //5 traits
	if (LANGUAGE == 'FR'){
		affirmation = 'Ma maman a ';
	}
	else{
		affirmation = 'My mom has ';
	}
	switch (rand) {
	 case 0:
	 	if (LANGUAGE == 'FR')  affirmation = affirmation + 'un ' + faceMatrix[xmaman][ymaman].fondTXT_FR[faceMatrix[xmaman][ymaman].fond];
	 	if (LANGUAGE == 'ENG')  affirmation = affirmation + 'a ' + faceMatrix[xmaman][ymaman].fondTXT_ENG[faceMatrix[xmaman][ymaman].fond];
	 break;

	 case 1:
	 	if (LANGUAGE == 'FR') affirmation = affirmation + 'un ' + faceMatrix[xmaman][ymaman].visageTXT_FR[faceMatrix[xmaman][ymaman].visage];
	 	if (LANGUAGE == 'ENG') affirmation = affirmation + 'a ' + faceMatrix[xmaman][ymaman].visageTXT_ENG[faceMatrix[xmaman][ymaman].visage];
	 break;

	 case 2:
	 	if (LANGUAGE == 'FR') affirmation = affirmation + 'une ' + faceMatrix[xmaman][ymaman].coiffureTXT_FR[faceMatrix[xmaman][ymaman].coiffure];
	 	if (LANGUAGE == 'ENG') affirmation = affirmation + '' + faceMatrix[xmaman][ymaman].coiffureTXT_ENG[faceMatrix[xmaman][ymaman].coiffure];
	 break;

	 case 3:
	 	if (LANGUAGE == 'FR') affirmation = affirmation + 'des ' + faceMatrix[xmaman][ymaman].yeuxTXT_FR[faceMatrix[xmaman][ymaman].yeux];
	 	if (LANGUAGE == 'ENG') affirmation = affirmation + '' + faceMatrix[xmaman][ymaman].yeuxTXT_ENG[faceMatrix[xmaman][ymaman].yeux];
	 break;

	 case 4:
		if (LANGUAGE == 'FR') affirmation = affirmation + 'un ' + faceMatrix[xmaman][ymaman].nezTXT_FR[faceMatrix[xmaman][ymaman].nez];
	 	if (LANGUAGE == 'ENG') affirmation = affirmation + 'a ' + faceMatrix[xmaman][ymaman].nezTXT_ENG[faceMatrix[xmaman][ymaman].nez];
	 break;

	 case 5:
	 	if (LANGUAGE == 'FR') affirmation = affirmation + 'une ' + faceMatrix[xmaman][ymaman].boucheTXT_FR[faceMatrix[xmaman][ymaman].bouche];
	 	if (LANGUAGE == 'ENG') affirmation = affirmation + 'a ' + faceMatrix[xmaman][ymaman].boucheTXT_ENG[faceMatrix[xmaman][ymaman].bouche];
	 break;

	 default: 
	 break;
	}
	return affirmation;
}

function generateNegation(){
	//Ma maman n'a pas :
	var rand = Math.floor(Math.random()*6); //5 traits

	if (LANGUAGE == 'FR'){
		var negation = 'Ma maman n\'a pas ';
	}
	else{
		var negation = 'My mom hasn\'t ';
	}

	switch (rand) {
	 case 0:
	 	var mamanTrait = faceMatrix[xmaman][ymaman].fond;

		do{
			var xRandMaman = Math.floor(Math.random()*4);
			var yRandMaman = Math.floor(Math.random()*3);
		}
		while (faceMatrix[xRandMaman][yRandMaman].fond == mamanTrait )

		var autreMamanTrait = faceMatrix[xRandMaman][yRandMaman].fond;
		if (LANGUAGE == 'FR') negation = negation + 'un ' + faceMatrix[xmaman][ymaman].fondTXT_FR[autreMamanTrait];
		if (LANGUAGE == 'ENG') negation = negation + 'a ' + faceMatrix[xmaman][ymaman].fondTXT_ENG[autreMamanTrait];
	 break;

	 case 1:
	 	var mamanTrait = faceMatrix[xmaman][ymaman].visage;

		do{
			var xRandMaman = Math.floor(Math.random()*4);
			var yRandMaman = Math.floor(Math.random()*3);
		}
		while (faceMatrix[xRandMaman][yRandMaman].visage == mamanTrait )

		var autreMamanTrait = faceMatrix[xRandMaman][yRandMaman].visage;
	 	if (LANGUAGE == 'FR') negation = negation + 'un ' + faceMatrix[xmaman][ymaman].visageTXT_FR[autreMamanTrait];
	 	if (LANGUAGE == 'ENG') negation = negation + 'a ' + faceMatrix[xmaman][ymaman].visageTXT_ENG[autreMamanTrait];
	 break;

	 case 2:
	 	var mamanTrait = faceMatrix[xmaman][ymaman].coiffure;

		do{
			var xRandMaman = Math.floor(Math.random()*4);
			var yRandMaman = Math.floor(Math.random()*3);
		}
		while (faceMatrix[xRandMaman][yRandMaman].coiffure == mamanTrait )

		var autreMamanTrait = faceMatrix[xRandMaman][yRandMaman].coiffure;
	 	if (LANGUAGE =='FR') negation = negation + 'une ' + faceMatrix[xmaman][ymaman].coiffureTXT_FR[autreMamanTrait];
	 	if (LANGUAGE == 'ENG') negation = negation + '' + faceMatrix[xmaman][ymaman].coiffureTXT_ENG[autreMamanTrait];
	 break;

	 case 3:
	 	var mamanTrait = faceMatrix[xmaman][ymaman].yeux;

		do{
			var xRandMaman = Math.floor(Math.random()*4);
			var yRandMaman = Math.floor(Math.random()*3);
		}
		while (faceMatrix[xRandMaman][yRandMaman].yeux == mamanTrait )

		var autreMamanTrait = faceMatrix[xRandMaman][yRandMaman].yeux;
	 	if (LANGUAGE == 'FR') negation = negation + 'des ' + faceMatrix[xmaman][ymaman].yeuxTXT_FR[autreMamanTrait];
	 	if (LANGUAGE == 'ENG') negation = negation + '' + faceMatrix[xmaman][ymaman].yeuxTXT_ENG[autreMamanTrait];
	 break;

	 case 4:
	 	var mamanTrait = faceMatrix[xmaman][ymaman].nez;

		do{
			var xRandMaman = Math.floor(Math.random()*4);
			var yRandMaman = Math.floor(Math.random()*3);
		}
		while (faceMatrix[xRandMaman][yRandMaman].nez == mamanTrait )

		var autreMamanTrait = faceMatrix[xRandMaman][yRandMaman].nez;
	 	if (LANGUAGE == 'FR') negation = negation + 'un ' + faceMatrix[xmaman][ymaman].nezTXT_FR[autreMamanTrait];
	 	if (LANGUAGE == 'ENG') negation = negation + 'a ' + faceMatrix[xmaman][ymaman].nezTXT_ENG[autreMamanTrait];
	 break;

	 case 5:
	 	var mamanTrait = faceMatrix[xmaman][ymaman].bouche;

		do{
			var xRandMaman = Math.floor(Math.random()*4);
			var yRandMaman = Math.floor(Math.random()*3);
		}
		while (faceMatrix[xRandMaman][yRandMaman].bouche == mamanTrait )

		var autreMamanTrait = faceMatrix[xRandMaman][yRandMaman].bouche;
	 	if (LANGUAGE == 'FR') negation = negation + 'une ' + faceMatrix[xmaman][ymaman].boucheTXT_FR[autreMamanTrait];
	 	if (LANGUAGE == 'ENG') negation = negation + 'a ' + faceMatrix[xmaman][ymaman].boucheTXT_ENG[autreMamanTrait];
	 break;

	 default: 
	 break;
	}
	return negation;
}

function changeLanguageTo(selectedLanguage){
	if (selectedLanguage == 'FR'){
		$("#flagButtonENG").fadeOut();
		$("#flagButtonFR").fadeIn();
		$("#LoadingBarContainer").removeClass("fr").addClass("eng");
		LANGUAGE = 'ENG';
	}
	else{
		$("#flagButtonFR").fadeOut();
		$("#flagButtonENG").fadeIn();
		$("#LoadingBarContainer").removeClass("eng").addClass("fr");
		LANGUAGE = 'FR';
	}
	printSentence();
}

function doVictory(){
	winOrLose = true;

	//Petit Clean du TXT
	ctx.clearRect(10, 700, 1000, 1000);
	ctx.strokeText('win, TROP SYMPA DAVOIR TROUVE MA MAMAN', 10, 750);
	ctx.fillText('win, TROP SYMPA DAVOIR TROUVE MA MAMAN', 10, 750);	

	//ctx.clearRect(0, 0, 1000, 1000);
	$("#doodle").prepend('<div id="EndingDiv"><canvas id="resultCanvas" oncontextmenu="return false;" width="800" height="800"></canvas></div>');
	
	if (LANGUAGE == 'FR') 
		$("#EndingDiv").addClass("frWin");
	else 
		$("#EndingDiv").addClass("engWin");

	faceMatrix[xmaman][ymaman].finalRender(true);
}

function doFailouse() {
	//Petit Clean du TXT
	ctx.clearRect(10, 700, 1000, 1000);
	ctx.strokeText('loser, j\'ai perdu ma maman', 10, 750);
	ctx.fillText('loser, j\'ai perdu ma maman', 10, 750);

	//ctx.clearRect(0, 0, 1000, 1000);
	$("#doodle").prepend('<div id="EndingDiv"><canvas id="resultCanvas" oncontextmenu="return false;" width="800" height="800"></canvas></div>');

	if (LANGUAGE == 'FR') 
		$("#EndingDiv").addClass("frLose");
	else 
		$("#EndingDiv").addClass("engLose");

	faceMatrix[xmaman][ymaman].finalRender(false);
}
