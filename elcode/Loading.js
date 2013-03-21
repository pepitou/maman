/*Only sounds 4 now*/
var ASSET_MANAGER = new window.AssetManager();

var ctxA;
var bufferAudio = null;
var loadingProgress = 0;


function load(){
	startLoadWebSite();
}

function incrementLoading(finish){
	
	if (!finish){
		eltBar = document.getElementById("loadingBar")
		
		loadingProgress ++;

		eltBar.innerHTML = loadingProgress + "%";
	}
	else {
		eltBar = document.getElementById("loadingBar")
		

		eltBar.innerHTML = "100% Loaded!";
	}
}

function startLoadWebSite(){
	incrementLoading();
	loadImages();
}

function loadImages(){
	for (i=1 ; i < 5 ; i++){
		ASSET_MANAGER.queueDownload('eyescandy/elements/fond'+ i +'.png');
	}

	for (i=1 ; i < 7 ; i++){
		ASSET_MANAGER.queueDownload('eyescandy/elements/visage'+ i +'.png');
	}

	for (i=1 ; i < 10 ; i++){
		ASSET_MANAGER.queueDownload('eyescandy/elements/coiffure'+ i +'.png');
	}

	for (i=1 ; i < 11 ; i++){
		ASSET_MANAGER.queueDownload('eyescandy/elements/yeux'+ i +'.png');
	}

	for (i=1 ; i < 13 ; i++){
		ASSET_MANAGER.queueDownload('eyescandy/elements/nez'+ i +'.png');
	}

	for (i=1 ; i < 10 ; i++){
		ASSET_MANAGER.queueDownload('eyescandy/elements/bouche'+ i +'.png');
	}

	for (i=1 ; i < 12 ; i++){
		ASSET_MANAGER.queueDownload('eyescandy/elements/accessoire'+ i +'.png');
	}

	
	ASSET_MANAGER.queueDownload('eyescandy/ui/win.png');
	ASSET_MANAGER.queueDownload('eyescandy/ui/lose.png');

	// ASSET_MANAGER.queueDownload('eyescandy/elements/barbe1.png');

	// ASSET_MANAGER.queueDownload('eyescandy/elements/moustache1.png');

	// ASSET_MANAGER.queueDownload('eyescandy/elements/boucleoreille1.png');

		
	ASSET_MANAGER.downloadAll(function() {
		incrementLoading();
		buildUI();
	});
}

function buildUI(){
	$('#container').append('<div id="header"></div>');

	$('#container').append('<div id="content"></div>');
		$('#content').append('<div id="gameContainer"></div>');
			$('#gameContainer').append('<canvas id="gameCanvas" oncontextmenu="return false;" width="800" height="800"></canvas>');
	
	$('#content').append('<div id="flagButtonENG"></div>');
	$('#content').append('<div id="flagButtonFR"></div>');

	$('#content').append('<div id="soundButton"></div>');
	$('#content').append('<div id="soundButtonOff" style="display : none"></div>');

	$('#content').append('<div id="helpbutton"></div>');
	$('#content').append('<div id="html5Logo"></div>');


	$("#resetButton").click(function() {
	  //Reset !
		for (var i = 0; i < 16; i++) {
			for (var j = 0; j < 16; j++){
				coconutMatrix[i][j] = 0;
			}
		}
		commander = false;
		LIGHT_color = 'rgba(255,127,0,0.07)' //ORANGE
	});

	function bonusModeCommander(){
		$('#loadingCanvas').fadeOut('slow');
		commander = true;
	}

	preloadGame();
}

function preloadGame(){
	init();
	if (!localExecution && audioCompatible){ 
		loadSounds();
	} else {
		finishedLoading();
	}
}

function loadSounds(){
  ctxA = new webkitAudioContext();
  audioIntensity = new BackgroundIntensity(ctxA);
}

function finishedLoading() {
	startOST();

	$('#LoadingBarContainer').append('<div id="quitHelpButton"></div>').fadeIn('slow');
	
	$('#quitHelpButton').click(function(){
		/*Afficher le jeu suite à l'aide, mais pas démarrer un nouveau jeu*/
		startGame();
	});

	$('#flagButtonFR').click(function(){
		changeLanguageTo("ENG");
	});
	
	$('#flagButtonENG').click(function(){
		changeLanguageTo("FR");	
	});

	$('#soundButton').click(function(){
		$("#soundButton").fadeOut();
		$("#soundButtonOff").fadeIn();
		if (!localExecution) audioIntensity.playPause();
	});

	$('#LoadingBarContainer').click(function(){
		/*Afficher le jeu suite à l'aide, mais pas démarrer un nouveau jeu*/
		startGame();
	});

	$('#soundButtonOff').click(function(){
		$("#soundButtonOff").fadeOut();
		$("#soundButton").fadeIn();
		if (!localExecution && audioCompatible) audioIntensity.playPause();
	});

	$('#helpbutton').click(function(){
		if (!helpOnScreen){
			helpOnScreen=true;
			$('#LoadingBarContainer').fadeIn();
		}
		else {
			helpOnScreen=false;
			$('#LoadingBarContainer').fadeOut();
		}
	});

	incrementLoading(true);
}

function startGame(){
	if (helpOnScreen) helpOnScreen=false;
	$('#LoadingBarContainer').fadeOut();
}

/*TODO
DONE Peaufiner loading

DONE Fin de partie
	TODO Nb try

TODO LANGUAGE

DONE ACCESSOIRES

TODO Gameplay

DONE Smooth AIDE
*/