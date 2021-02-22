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

/**
 * @description Clase Hand con distintas funcionalidades implementadas
 */
class Hand {
  /**
   * 
   * @param {String} name El nombre que se le quiere dar a la mano
   * @description Constructor de la clase crea una mano vacía y le asigna el nombre
   */
  constructor(name) {
    this.cards = [];
    this.label = name;
  }
  /**
   * 
   * @param {Object} card Objeto Card
   * @description Método que añade a la mano una carta que se le pasa
   */
  addCard(card) {
    this.cards.push(card);
  }
  /**
   * @description Método que quita la primera carta de la mano
   * @returns Objecto carta que se ha eliminado
   */
  popCard() {
    let shiftedCard = this.cards.shift();
    return shiftedCard;
  }
  /**
   * 
   * @param {Object} deck Objeto Deck
   * @param {Number} numberCards Número de cartas a mover a la mano
   * @description Este método quita cartas del mazo y las añade a la mano
   */
  moveCards(deck, numberCards) {
    for (let i = 0; i < numberCards; i++) {
      this.cards.push(deck.popCard());
    }
  }
  /**
   * @description Método que ordena las cartas de la mano usando el método
   *     compare de la clase Card
   */
  sort() {
    this.cards.sort(function(a, b) {
      if (a.compare(b))
        return 1;
      if (!a.compare(b))
        return -1;
      return 0;
    });
  }
}

if (typeof exports !== 'undefined') {
  exports.Hand = Hand;
}