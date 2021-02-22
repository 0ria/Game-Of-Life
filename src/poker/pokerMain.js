/**
 * @author Daniel Oria Martin
 * @mail alu0101027340@ull.edu.es
 * @date 09/05/2020
 * GitHub User: 0ria
 * Location: Escuela Superior Técnica de Ingenieria de La Laguna
 * Subject: Programacion de Aplicaciones Interactivas
 * Assignment: Práctica 12, Game of Life.
 * Task: cellClass
 * @brief programa que contiene la clase grid la cual crea el tablero.
 * References:  Tasks:
 *              https://github.com/fsande/PAI-P12-Life/blob/master/2019-2020_p12_Life.md.
 */
'use strict';

const CANVASRIGHT = document.getElementById('myCanvasUp');
const CTXU = CANVASRIGHT.getContext('2d');
const CANVASLEFT = document.getElementById('myCanvasDown');
const CTXD = CANVASLEFT.getContext('2d');
let arrayImg = [];
CANVASRIGHT.addEventListener('mousedown', turnCard);
//const twoClubs = document.getElementById('2C');

let PokerHandsMod;
let DecksTypeMod;
let CardTypeMod;

if (typeof require !== 'undefined') {
  PokerHandsMod = require('./poker-hand.js').PokerHand;
  DecksTypeMod = require('./deck.js').Deck;
  CardTypeMod = require('./card.js').Card
}
else {
  PokerHandsMod = PokerHand;
  DecksTypeMod = Deck;
  CardTypeMod = Card;
}

/**
 * 
 * @param {Object} hand Objecto que contiene todas las manos
 * @param {Object} context Contexto del canvas donde se pintará
 * @description Función que pinta cartas al canvas
 */
async function printHandOnCanvas(hand, context) {
  console.log(hand);
  context.font = "20px Arial";
  context.fillText("Jugador 1" , 820, 20);
  CTXD.font = "20px Arial";
  CTXD.fillText("Jugador 2" , 820, 20);

 let offsetX = 100;
 for (let element of hand) {
   let img = new Image();
   img.src = element.name + '.png';
   let object = {
     img: img,
     pos: offsetX
   };
   arrayImg.push(object);
   await sleep(250);
   context.drawImage(img, offsetX, 40, 200, 300);
   offsetX += 360;
  }
}

/**
 * 
 * @param {Object} event 
 * @description Método que gira cartas
 */
function turnCard(event) {
  let posX = Math.floor(event.offsetX);
  let finalCordX = 0;
  console.log(posX);
  for (let element of arrayImg) {
    if (posX > element.pos)
      finalCordX = element.pos;
    else break;
  }
  console.log(finalCordX);
  let img = new Image();
  img.src = 'gray_back.png';
  CTXU.drawImage(img, finalCordX, 40, 200, 300);
}

/**
 * 
 * @param {Object} hand Objecto que cotiene una mano de cartas
 * @description Método que arregla los nombres de las cartas de manera que 
 *     se puedan printear mas tarde
 * @returns retrona un objecto que contiene cada carta con su nombre
 */
function transformToImgName(hand) {
  let array = [];
  let suit = '';
  let newRank = '';
  //console.log(hand);
  for (let element of hand.cards) {
    suit = element.suit[0];
    if (element.rank > 10) {
      if (element.rank === 11)
        newRank = 'J';
      if (element.rank === 12)
        newRank = 'Q';
      if (element.rank === 13)
        newRank = 'K';
    }
    else if (element.rank === 1){
      newRank = 'A';
    }
    else newRank = element.rank
    let object = {
      card: element,
      name: newRank + suit
    };
    array.push(object);
    suit = '';
  }
  console.log(array);
  return array;
}

/**
 * @description Método principal del programa
 */
function main() {
  let pokerHandUp = new PokerHandsMod;
  let pokerHandDown = new PokerHandsMod;
  let deck = new DecksTypeMod;
  deck.generateDeck();
  deck.shuffle();
  pokerHandUp.moveCards(deck, 5);
  pokerHandDown.moveCards(deck, 5);
  let card = new Card;
  let firstHand = transformToImgName(pokerHandUp);
  let secondHand = transformToImgName(pokerHandDown);
  printHandOnCanvas(firstHand, CTXU);

}

main();

/**
 *
 * @param {Number} msToWait
 * @description Función que hace que el programa espere el tiempo indicado
 */
function sleep(msToWait) {
  return new Promise(resolve => setTimeout(resolve, msToWait));
}