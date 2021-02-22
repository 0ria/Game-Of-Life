/**
 * @author Daniel Oria Martin
 * @mail alu0101027340@ull.edu.es
 * @date 11/04/2020
 * GitHub User: 0ria
 * Location: Escuela Superior Técnica de Ingenieria de La Laguna
 * Subject: Programacion de Aplicaciones Interactivas
 * Assignment: Práctica 8, El juego del Poker. 
 * Task: Hand class 
 * @brief programa que contiene la clase hand.
 * References:  Tasks:
 *              https://github.com/fsande/PAI-P08-Poker/blob/master/2019-2020_p08_Poker.md.
 */
'use strict';

let PokerHandsType;
let DecksType;
let noBrowser = false;

if (typeof require !== 'undefined') {
  PokerHandsType = require('./poker-hand.js').PokerHand;
  DecksType = require('./deck.js').Deck;
  noBrowser = true;
}
else {
  PokerHandsType = PokerHand;
  DecksType = Deck;
}

/**
 * @description Función que corresponde al ejercicio 2.1 genera una mano y dice si 
 *     existe una escalera
 */
function generateHands() {
  const NUMBEROFHANDS = 7;
  const CARDPERHAND = 7;
  let handsArray = [];
  let pokerHand = new PokerHandsType();
  let deck = new DecksType();
  let found = false;
  deck.generateDeck();
  deck.shuffle();
  pokerHand.moveCards(deck, CARDPERHAND);
  if (pokerHand.hasStraight())
    found = true;
  console.log('Output of exercise 2.1: ')
  if (found)
   console.log(' -  There is a Straight');
  else  
    console.log(' -  There is not a Straight');
}

/**
 * @description Función que brinda ayuda en caso de necesitarla
 */
function help() {
  console.log('This is the help menu');
  console.log(' Execute the program like this: node pokerGame.js [NUMBEROFHANDS]');
  console.log('The program will caculate the stadistics of each poker hand combination' +
      ' and will output them on console and into a JSON file');
}
/**
 * 
 * @param {Number} handsNumber Función que genera el objeto pokerHand al que se
 *     le pasará el número de manos recogido por línea de argumentos.
 *     Esta función solo se usa en caso de ser ejecutada mediante node en consola
 */
function generateStats(handsNumber) {
  generateHands();
  let pokerGame = new PokerHandsType();
  pokerGame.estimatePosibilities(handsNumber);
}
/**
 * @description Función principal del programa recoge argumentos por línea de 
 *    de comandos y trabaja con ellos.
 */
function main() {
  if (noBrowser) {
    if (process.argv[2] === '--help') {
      help();
      return 0;
    }
    if (process.argv.length < 3) {
      help();
    }
    else {
      generateStats(parseInt(process.argv[2], 10));
    }
  }
}

/**
 * @description Función que se ejecuta en caso de estar visualizando en web.
 *     Le pide al usuario el número de manos a generar y los muestra en la consola 
 *     del navegador
 */
function webStats() {
  let handsNumber = prompt('Enter the number of hands to use, around 70000 could start being slow ~10sec', 40000);
  let pokerGame = new PokerHandsType();
  pokerGame.estimatePosibilities(handsNumber);
  alert('Go to the browser console to check the results');
}

if (!noBrowser)
  webStats();

main();