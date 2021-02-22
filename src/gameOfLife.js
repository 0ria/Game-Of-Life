/**
 * @author Daniel Oria Martin
 * @mail alu0101027340@ull.edu.es
 * @date 09/05/2020
 * GitHub User: 0ria
 * Location: Escuela Superior Técnica de Ingenieria de La Laguna
 * Subject: Programacion de Aplicaciones Interactivas
 * Assignment: Práctica 12, Game of Life.
 * Task: gameOfLife
 * @brief programa principal de la tarea.
 * References:  Tasks:
 *              https://github.com/fsande/PAI-P12-Life/blob/master/2019-2020_p12_Life.md.
 */
'use strict';

const CANVASRIGHT = document.getElementById('myCanvasRight');
const CTXR = CANVASRIGHT.getContext('2d');
const CANVASLEFT = document.getElementById('myCanvasLeft');
const CTXL = CANVASLEFT.getContext('2d');
const CANVASHEIGHT = parseInt(CANVASRIGHT.height, 10);
const CANVASWIDTH = parseInt(CANVASRIGHT.width, 10);
const BOXSIZE = CANVASRIGHT.width / 75;
let firstTime = true;
let timeToStop = false;
let generation = 0;
let velocity;
let board;

/**
 * @description Función que printea la generación actual y la velocidad
 */
function showStats() {
  CTXL.font = "20px Arial";
  CTXL.clearRect(0, 0, CANVASLEFT.width, CANVASLEFT.height);
  CTXL.fillText("Generation: " + generation, 343, 70);
}

/**
 * @description funcion que realiza un step suelto en caso de presionar
 *     el boton step del html
 */
function mainStep() {
  showStats();
  if (firstTime) {
    firstTime = false;
    let INITIALNUMBER = parseInt(document.getElementById('cellNum').value, 10);
    board = new Board(CANVASWIDTH, CANVASHEIGHT, BOXSIZE);
    
    board.createBoard();
    board.drawBoard();
    board.updateBoardAlives(INITIALNUMBER);
    generation++;
  }
  else {
    board.countNeighbours();
    board.updateBoard();
    generation++;
  }
}

/**
 * @description Función que pausa la ejecución
 */
function pause() {
  timeToStop = true;
}

/**
 * @description Función que lanza a ejectuar el algoritmo cuando el 
 *     boton start es pulsado, tomando como entrada el número de 
 *     células vivas y la velociad proporcionadas por el usuario
 *     en el html 
 *     
 */
async function mainStart() {
  timeToStop = false;
  while (!timeToStop) {
    generation++;
    showStats();
    velocity = parseInt(document.getElementById('velocity').value, 10);
    await sleep(velocity);
    if (firstTime) {
      firstTime = false;
      let INITIALNUMBER = parseInt(document.getElementById('cellNum').value, 10);
      board = new Board(CANVASWIDTH, CANVASHEIGHT, BOXSIZE);
      
      board.createBoard();
      board.drawBoard();
      board.updateBoardAlives(INITIALNUMBER);
    }
    else {
      board.countNeighbours();
      board.updateBoard();
    }
  }
}

/**
 * @description Función que printea los stats finales 
 */
function showFinalStats() {
  CTXL.font = "20px Arial";
  CTXL.clearRect(0, 0, CANVASLEFT.width, CANVASLEFT.height);
  CTXL.fillText("Last generation: " + generation, 300, 70);
  CTXL.fillText("Ending Alive Cells: " + board.getAliveNumber(), 277, 90);
}

/**
 * @description Función que resetea los cavnas
 */
function clear() {
  generation = 0;
  firstTime = true;
  board.killAll();
  CTXR.clearRect(0, 0, CANVASRIGHT.width, CANVASRIGHT .height);
  CTXL.clearRect(0, 0, CANVASLEFT.width, CANVASLEFT.height);
}

/**
 * @description Función que cuenta atrás para resetear el programa
 */
async function reset() {
  CTXL.font = "20px Arial";
  CTXL.fillText("Reseting Grid in:", 200, 110);
  let helpNumber = 360;
  for (let i = 3; i >= 0; i--) {
    await sleep(1000);
    CTXL.fillText(i, helpNumber , 110);
    helpNumber += 20;
  }
  clear();
}

/**
 * @description Función que es llamda al pulsar el boton end del html
 *     y que pausa y resetea el programa
 */
function end() {
  pause();
  showFinalStats();
  reset();
}

/**
 *
 * @param {Number} msToWait
 * @description Función que hace que el programa espere el tiempo indicado
 */
function sleep(msToWait) {
  return new Promise(resolve => setTimeout(resolve, msToWait));
}