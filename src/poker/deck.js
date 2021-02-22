/**
 * @author Daniel Oria Martin
 * @mail alu0101027340@ull.edu.es
 * @date 11/04/2020
 * GitHub User: 0ria
 * Location: Escuela Superior Técnica de Ingenieria de La Laguna
 * Subject: Programacion de Aplicaciones Interactivas
 * Assignment: Práctica 8, El juego del Poker. 
 * Task: Deck class 
 * @brief programa que contiene la clase deck.
 * References:  Tasks:
 *              https://github.com/fsande/PAI-P08-Poker/blob/master/2019-2020_p08_Poker.md.
 */
'use strict';

let CardObject;
let CardRanks;
let CardSuits;
//let HandOfPoker;

if (typeof require !== 'undefined') {
  CardObject = require('./card.js').Card;
  CardRanks = require('./card.js').Ranks;
  CardSuits = require('./card.js').Suits;
  //HandOfPoker = require('./poker-hand.js').PokerHand
}
else {
  CardObject = Card;
  CardRanks = ALLVALUES;
  CardSuits = ALLSUITS;
  //PokerHand = PokerHand;
}

/**
 * @description Clase Deck, almacena un mazo de poker de 52 cartas y 
 *     se implementan distintas funcionalidades
 */
class Deck {
  /**
   * @description Constructor de la clase inicializa el atributo privado
   *     mazo a vacío
   */
  constructor() {
    this.deck = [];
  }
  /**
   * @description Método que genera un deck completo de poker (Sin Jokers)
   *     y actualiza el atributo privado mazo
   */
  generateDeck() {
    for (let i = 0; i < CardSuits.length; i++) {
      for (let j = 0; j < CardRanks.length; j++) {
        this.deck.push(new CardObject(CardSuits[i], CardRanks[j]));
      }
    }
  }
  /**
   * @description Método que quita la primera carta del mazo
   * @returns La carta que se ha quitado
   */
  popCard() {
    let shiftedCard = this.deck.shift();
    return shiftedCard;
  }
  /**
   * 
   * @param {Object} newCard Objecto Card
   * @description Añade al mazo de cartas la carta que se le pasa
   */
  addCard(newCard) {
    this.deck.push(newCard);
  }
  /**
   * @description Método que baraja el mazo de forma aleatoria
   */
  shuffle() {
    const SHUFFLEITERATIONS = 1000;
    for (let i = 0; i < SHUFFLEITERATIONS; i++) {
      let firstLocation = Math.floor((Math.random() * this.deck.length));
      let secondLocation = Math.floor((Math.random() * this.deck.length));
      let temp = this.deck[firstLocation];
      this.deck[firstLocation] = this.deck[secondLocation];
      this.deck[secondLocation] = temp;
    }
  }
  /**
   * @description Método que ordena el mazo usando al función compare de 
   *    la clase Card
   */
  sort() {
    this.deck.sort(function(a, b) {
      if (a.compare(b))
        return 1;
      if (!a.compare(b))
        return -1;
      return 0;
    });
  }
};

if (typeof exports !== 'undefined') {
  exports.Deck = Deck;
}