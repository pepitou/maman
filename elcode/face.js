function Face() {
  this.fond = 1;
  this.visage = 1;
  this.coiffure = 1;
  this.yeux = 1;
  this.nez = 1;
  this.bouche = 1;

  //Optional
  this.lunettes = 0;
  this.couvrechef = 0;
  this.barbe = 0;
  this.moustache = 0;
  this.boucleoreille = 0;

  this.enabled = true;
  this.maman = false;

  this.fondTXT_FR = new Array('','fond bleu','fond gris','fond jaune','fond vert');
  this.fondTXT_ENG = new Array('','blue background','grey background','yellow background','green background');

  this.visageTXT_FR = new Array('','visage bleu','visage vert','visage violet sombrement pointu', 'visage marron goitre', 'visage rond rouge', 'visage rose menton pointu');
  this.visageTXT_ENG = new Array('','blue face','green face','spiky dark violet face', 'brown old face', 'round violet face', 'pinky face');

  this.coiffureTXT_FR = new Array('','coiffe de rihanna','coiffure lisse et rougeoyante','coiffe blonde frisee', 'coiffure crepu chatain', 'coiffure longue et lisse', 'coiffure verte', 'coiffure en chignon noir', 'coiffe frisee rouge', 'cheveulure affro a patte longue');
  this.coiffureTXT_ENG = new Array('','rihanna\'s hairstyle','smooth and reddening hairstyle','blond curly hairstyle', 'brown frizzy hair', 'very long smooth white hair', 'green hair', 'black bun', 'curly red hair', 'red brown affro hairstyle');

  this.yeuxTXT_FR = new Array('','plein de petit yeux d\'ALIEN', 'yeux serpents', 'yeux oiseaux', 'yeux defonce a feuille', 'gros yeux rose/vert', 'yeux globuleux de feu', 'yeux reprobateurs rouges', 'yeux en croix de buche', 'yeux Aztec', 'yeux reprobateur allongees cernes');
  this.yeuxTXT_ENG = new Array('','a lot of little alien eyes', 'snakes in the eyes', 'birdy eyes', 'stoned eyes', 'pinky green big eyes', 'round fire eyes', 'red reprobatory eyes', 'woodstyle eyes', 'Aztec eyes', 'wierd blue and red eyes');

  this.nezTXT_FR = new Array('','nez long triangule', 'nez allonge au trait fin', 'nez tripode','nez anus', 'nez epais avec deux points', 'nez revolvers', 'nez de squelette', 'nez tribal', 'nez grosse narine rouge', 'gros nez oriental', 'nez caca', 'nez genre egyptien');
  this.nezTXT_ENG = new Array('','long triangle nose', 'fine black lined nose', 'tripod nose','anus nose', 'big nose with 2 dot', 'guns nose', 'skull nose', 'tribal nose', 'red nostril nose', 'big oriental nose', 'shitty nose', 'egyptian like nose');

  this.boucheTXT_FR = new Array('','bouche droite et rouge', 'bouche fine asiatique', 'bouche souriante verte et jaune', 'bonne grosse bouche rouge', 'bouche a langue gluante', 'bouche mauvaise rose et moustachue', 'bouche petite moue rouge', 'bouche squelettiquement noire', 'bouche d\'Aztec souriante');
  this.boucheTXT_ENG = new Array('','horizontal red mouth', 'fine asian mouth', 'smily yellow and green mouth', 'big pulpy red mouth', 'mouth with a sticky tonge', 'bad pinky mouth with a red mustache', 'little red mouth', 'skull mouth', 'Aztec smily mouth');
}

Face.prototype.generate = function() {
  //Fond 1/4
  this.fond = Math.floor(Math.random()*4)+ 1;

  //Visage 1/6
  this.visage = Math.floor(Math.random()*6)+ 1;

  //Coiffure 1/9
  this.coiffure = Math.floor(Math.random()*9)+ 1;

  //Yeux 1/10
  this.yeux = Math.floor(Math.random()*10)+ 1;

  //Nez 1/12
   this.nez = Math.floor(Math.random()*12)+ 1;

  //Bouche 1/9
  this.bouche = Math.floor(Math.random()*9)+ 1;

  //Une chance sur 11 d'avoir un accessoire
  this.accessoire = Math.floor(Math.random()*11) + 1;
  if (this.accessoire == 5){
    this.accessoire = Math.floor(Math.random()*11) + 1;
  }
  else this.accessoire = 0;
}

Face.prototype.render = function(i,j) {

  if (this.enabled){
    var spriteFond  = ASSET_MANAGER.getAsset('eyescandy/elements/fond' + this.fond +'.png');
    var spriteVisage = ASSET_MANAGER.getAsset('eyescandy/elements/visage' + this.visage +'.png');
    var spriteCoiffure = ASSET_MANAGER.getAsset('eyescandy/elements/coiffure' + this.coiffure +'.png');
    var spriteYeux = ASSET_MANAGER.getAsset('eyescandy/elements/yeux' + this.yeux +'.png');
    var spriteNez = ASSET_MANAGER.getAsset('eyescandy/elements/nez' + this.nez +'.png');
    var spriteBouche = ASSET_MANAGER.getAsset('eyescandy/elements/bouche' + this.bouche +'.png');

    try{
      ctx.drawImage(spriteFond, i*SIZE_WIDTH_CELL+GRID_OFFSET, j*SIZE_HEIGHT_CELL+GRID_OFFSET, SIZE_WIDTH_CELL_PIX, SIZE_HEIGHT_CELL_PIX);
      ctx.drawImage(spriteVisage, i*SIZE_WIDTH_CELL+GRID_OFFSET, j*SIZE_HEIGHT_CELL+GRID_OFFSET, SIZE_WIDTH_CELL_PIX, SIZE_HEIGHT_CELL_PIX);
      ctx.drawImage(spriteCoiffure, i*SIZE_WIDTH_CELL+GRID_OFFSET, j*SIZE_HEIGHT_CELL+GRID_OFFSET, SIZE_WIDTH_CELL_PIX, SIZE_HEIGHT_CELL_PIX);
      ctx.drawImage(spriteYeux, i*SIZE_WIDTH_CELL+GRID_OFFSET, j*SIZE_HEIGHT_CELL+GRID_OFFSET, SIZE_WIDTH_CELL_PIX, SIZE_HEIGHT_CELL_PIX);
      ctx.drawImage(spriteNez, i*SIZE_WIDTH_CELL+GRID_OFFSET, j*SIZE_HEIGHT_CELL+GRID_OFFSET, SIZE_WIDTH_CELL_PIX, SIZE_HEIGHT_CELL_PIX);
      ctx.drawImage(spriteBouche, i*SIZE_WIDTH_CELL+GRID_OFFSET, j*SIZE_HEIGHT_CELL+GRID_OFFSET, SIZE_WIDTH_CELL_PIX, SIZE_HEIGHT_CELL_PIX);

      ctx.beginPath();
      ctx.strokeStyle="#b90939";   
      ctx.lineWidth="1";   
      ctx.rect(i*SIZE_WIDTH_CELL+GRID_OFFSET, j*SIZE_HEIGHT_CELL+GRID_OFFSET, SIZE_WIDTH_CELL_PIX, SIZE_HEIGHT_CELL_PIX);
      ctx.stroke();
    }
    catch(e){
      console.log(e.toString());
    }

    if (this.accessoire > 0){
      var spriteAccessoire = ASSET_MANAGER.getAsset('eyescandy/elements/accessoire' + this.accessoire +'.png');
      ctx.drawImage(spriteAccessoire, i*SIZE_WIDTH_CELL+GRID_OFFSET, j*SIZE_HEIGHT_CELL+GRID_OFFSET, SIZE_WIDTH_CELL_PIX, SIZE_HEIGHT_CELL_PIX);
    }
  }
}

Face.prototype.finalRender = function(winOrLose){
  // On récupère l'objet canvas
  canvasFinal = document.getElementById('resultCanvas');
  if (!canvasFinal || !canvasFinal.getContext) {
    return;
  } 

  // On récupère le contexte 2D
  ctxF = canvasFinal.getContext('2d');

  if (!ctxF) {
    return;
  }

    var spriteFond  = ASSET_MANAGER.getAsset('eyescandy/elements/fond' + this.fond +'.png');
    var spriteVisage = ASSET_MANAGER.getAsset('eyescandy/elements/visage' + this.visage +'.png');
    var spriteCoiffure = ASSET_MANAGER.getAsset('eyescandy/elements/coiffure' + this.coiffure +'.png');
    var spriteYeux = ASSET_MANAGER.getAsset('eyescandy/elements/yeux' + this.yeux +'.png');
    var spriteNez = ASSET_MANAGER.getAsset('eyescandy/elements/nez' + this.nez +'.png');
    var spriteBouche = ASSET_MANAGER.getAsset('eyescandy/elements/bouche' + this.bouche +'.png');

    try{
      ctxF.drawImage(spriteFond, 208, 188, 390, 456);
      ctxF.drawImage(spriteVisage, 208, 188, 390, 456);
      ctxF.drawImage(spriteCoiffure, 208, 188, 390, 456);
      ctxF.drawImage(spriteYeux,208, 188, 390, 456);
      ctxF.drawImage(spriteNez, 208, 188, 390, 456);
      ctxF.drawImage(spriteBouche, 208, 188, 390, 456);

      // ctxF.beginPath();
      // ctxF.strokeStyle="#b90939";   
      // ctxF.lineWidth="1";   
      // ctxF.rect(208, 188, 390, 456);
      // ctxF.stroke();
    }
    catch(e){
      console.log(e.toString());
    }

    if (winOrLose){
      //Victoire
      var spriteEnd  = ASSET_MANAGER.getAsset('eyescandy/ui/win.png');
      ctxF.drawImage(spriteEnd, 198, -10, 404, 100);

    }
    else{
      //Defaite
      var spriteEnd = ASSET_MANAGER.getAsset('eyescandy/ui/lose.png');
      ctxF.drawImage(spriteEnd, 164, -10, 472, 100);
    }
    
}
