/**
 * @author Daniel Oria Martin
 * @mail alu0101027340@ull.edu.es
 * @date 11/04/2020
 * GitHub User: 0ria
 * Location: Escuela Superior Técnica de Ingenieria de La Laguna
 * Subject: Programacion de Aplicaciones Interactivas
 * Assignment: Práctica 8, El juego del Poker. 
 * Task: Card class 
 * @brief programa que contiene la clase card.
 * References:  Tasks:
 *              https://github.com/fsande/PAI-P08-Poker/blob/master/2019-2020_p08_Poker.md.
 */
'use strict';
const HEARTS = 'Hearts';
const CLUBS = 'Clubs';
const DIAMONDS = 'Diamonds';
const SPADES = 'Spades';
const JACK = 11;
const QUEEN = 12;
const KING = 13;
const ACE = 1;
const ALLSUITS = ['Clubs', 'Diamonds', 'Hearts', 'Spades'];
const ALLVALUES = [ACE, 2, 3, 4, 5, 6, 7, 8, 9, 10, JACK, QUEEN, KING]

/**
 * @description Class Card en la que se crean cartas y se imeplemtan distintas 
 *     funcionalidades, 
 */
class Card {
  /**
   * 
   * @param {String} suit El palo de la carta 
   * @param {Number} rank El valor de la carta
   * @description Constructor de la clase el cual inicializa la carta a los
   *    parámetros que se le pasan, por defecto, el dos de tréboles.
   */
  constructor(suit = "Clubs", rank = 2) {
    this.suit = suit;
    this.rank = rank;
    this.wholeName = this.rank + ' of ' + this.suit;
    this.check = 0; // Este atributo se usará en algunos metodos de búsqueda de combinaciones 
  }
  /**
   * @description Función que devuelve el nombre de la carta completo
   * @returns String con el nombre de la carta
   */
  toString() {
    return this.wholeName;
  }
  /**
   * 
   * @param {Object} otherCard Objecto carta
   * @description Compara dos cartas y devuelve un booleano
   * @returns Devuelve true si la invocante es mayor, y false en caso contrario
   */
  compare(otherCard) {
    let cardValue = 0;
    let otherCardValue = 0;
    for (let i = 0; i < ALLSUITS.length; i++) {
      if (this.suit === ALLSUITS[i])
        cardValue = i;
      if (otherCard.suit === ALLSUITS[i])
        otherCardValue = i;
    }
    if (cardValue > otherCardValue) {
      return true;
    }
    else if (cardValue < otherCardValue) {
      return false;
    }
    else if (this.rank > otherCard.rank) {
      return true;
    }
    else if (this.rank < otherCard.rank) {
      return false;
    }
    else {
      return false;
    }
  }
}

if (typeof exports !== 'undefined') {
  exports.Card = Card;
  exports.Ranks = ALLVALUES;
  exports.Suits = ALLSUITS;
}