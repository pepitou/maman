var localExecution = false;

var audioCompatible = false;

var LANGUAGE = 'ENG';
var helpOnScreen = true;
var gameEnded = false;

var audioIntensity;
var intensity = 0;
var intensityPeriod = 200;
var intensityProgress = 0;

/** GRID PARAMETERS **/
var CELL_NUMBER_PER_ROW = 4;
var CELL_NUMBER_PER_COLUMN = 3;

var SIZE_HEIGHT_CELL_PIX = 228;
var SIZE_WIDTH_CELL_PIX = 195;

var SIZE_INTER_CELL = 3;

var SIZE_HEIGHT_CELL = SIZE_HEIGHT_CELL_PIX + SIZE_INTER_CELL;
var SIZE_WIDTH_CELL = SIZE_WIDTH_CELL_PIX + SIZE_INTER_CELL;

var SIZE_WIDTH_TAB_PIX = (SIZE_WIDTH_CELL_PIX * CELL_NUMBER_PER_ROW) + (SIZE_INTER_CELL * (CELL_NUMBER_PER_ROW-1));
var SIZE_HEIGHT_TAB_PIX = (SIZE_HEIGHT_CELL_PIX * CELL_NUMBER_PER_COLUMN) + (SIZE_INTER_CELL * (CELL_NUMBER_PER_COLUMN-1));


var GRID_OFFSET = Math.floor((800 - SIZE_WIDTH_TAB_PIX)/2);