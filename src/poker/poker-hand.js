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

let DefaultHand;
let DefaultDeck;
let notOnBrowser = false;
let fs;

if (typeof require !== 'undefined') {
  DefaultHand = require('./hand.js').Hand;
  DefaultDeck = require('./deck.js').Deck;
  fs = require("fs");
  notOnBrowser = true;
}
else {
  DefaultDeck = Deck;
  DefaultHand = Hand;
}

/**
 * @description Class PokerHand que hereda de la clase hand
 */
class PokerHand extends DefaultHand {
  /**
   * @description Constructor que crea la mano vacía
   */
  constructor() {
    super();
    this.cards = [];
  }
  /**
   * @description Método que dice si hay una escalera en la mano.
   *     Para ello la ordena, y se la recorre de cierta manera comparando
   *     un valor con su valor anterior
   * @returns Devuelve un booleano a true si encuentra la escalera y a 
   *     false en caso contrario
   */
  hasStraight() {
    let arrayNumbers = [];
    for (let i = 0; i < this.cards.length; i++) {
      arrayNumbers.push(this.cards[i].rank);
    }
    arrayNumbers.sort((a, b) => a - b);
    let count = 1;
    for (let i = 0; i < arrayNumbers.length; i++) {
      if (arrayNumbers[i] === arrayNumbers[i - 1] + 1) {
        count++;
        if (count === 5)
          return true;
      }
      else {
        count = 1;
      }
    }
    return false;
  }
  /**
   * @description Método que compara si existen dos cartas iguales 
   *     en la mano
   * @return Retrona true en caso de encontrala y false en caso contrario
   */
  hasPair() {
    for (let i = 0; i < this.cards.length; i++) {
      for (let j = i + 1; j < this.cards.length; j++) {
        if (this.cards[i].rank === this.cards[j].rank) {
          return true;
        }
      }
    }
    return false;
  }
  /**
   * @description Método que busca si hay dobles parejas en la mano.
   * @returns Retrona true en caso de encontralas y false en caso contrario 
   */
  hasTwoPair() {
    for (let i = 0; i < this.cards.length; i++) {
      this.cards[i].check = 0;
    }
    let pairs = 0;
    for (let i = 0; i < this.cards.length; i++) {
      for (let j = i + 1; j < this.cards.length; j++) {
        if (this.cards[i].rank === this.cards[j].rank && this.cards[i].check === 0) {
          pairs++;
          this.cards[i].check = 1;
          this.cards[j].check = 1;
          if (pairs === 2)
            return true;
        }
      }
    }
    return false;
  }
  /**
   * @description Método que busca tríos en la mano
   * @returns Retrona true en caso de encontralo y false en caso contrario
   */
  hasThreeOfaKind() {
    for (let i = 0; i < this.cards.length; i++)
      for (let j = i + 1; j < this.cards.length; j++)
        if (this.cards[i].rank === this.cards[j].rank)
          for (let z = j + 1; z < this.cards.length; z++)
            if (this.cards[z].rank === this.cards[j].rank)
              return true;
    return false;
  }
  /**
   * @description Método que busca si 5 cartas de la mano son del mismo palo
   * @returns Retrona true en caso de encontralas y false en caso contrario
   */
  hasFlush() {
    let count = 1;
    this.sort();
    for (let i = 0; i < this.cards.length - 1; i++) {
      if (this.cards[i].suit === this.cards[i + 1].suit) {
        count++;
        if (count === 5)
          return true;
      }
      else count = 1;
    }
    return false;
  }
  /**
   * @description Método que busca un full en la mano, es decir, un trío y
   *     una pareja
   * @returns Retrona true en caso de encontralo y false en caso contrario
   */
  hasFullHouse() {
    let pairs = 0;
    let threeOfA = 0;
    for (let i = 0; i < this.cards.length; i++) {
      for (let j = i + 1; j < this.cards.length; j++) {
        if (this.cards[i].rank === this.cards[j].rank && this.cards[i].check === 0) {
          for (let z = j + 1; z < this.cards.length; z++) {
            if (this.cards[z].rank === this.cards[j].rank) {
              threeOfA++;
              this.cards[i].check = 1;
              this.cards[j].check = 1;
              this.cards[z].check = 1;
              if (pairs === 1 && threeOfA === 1)
                return true;
              break;
            }
          }
          if (this.cards[i].check === 0) {
            pairs++;
            this.cards[i].check = 1;
            this.cards[j].check = 1;
            if (pairs === 1 && threeOfA === 1)
              return true;
          }
        }
      }
    }
    return false;
  }
  /**
   * @description Método que busca cuatro cartas iguales en la mano
   * @returns Retrona true en caso de encontralas y false en caso contrario
   */
  hasFourOfaKind() {
    for (let i = 0; i < this.cards.length; i++)
      for (let j = i + 1; j < this.cards.length; j++)
        if (this.cards[i].rank === this.cards[j].rank)
          for (let z = j + 1; z < this.cards.length; z++)
            if (this.cards[z].rank === this.cards[j].rank)
              for (let m = z + 1; m < this.cards.length; m++)
                if (this.cards[m].rank === this.cards[z].rank)
                  return true;
    return false;
  }
  /**
   * @description Método que busca una escalera de 5 cartas y que todas
   *     sean del mismo palo, expluyendo la escalera real
   * @returns Retrona true en caso de encontrala y false en caso contrario
   */
  hasStraightFlush() {
    let count = 1;
    this.sort();
    for (let i = 0; i < this.cards.length - 1; i++) {
      if (this.cards[i].suit === this.cards[i + 1].suit &&
        this.cards[i].rank === this.cards[i + 1].rank - 1) {
        count++;
        if (count === 5)
          return true;
      }
      else count = 1;
    }
    return false;
  }
  /**
   * @description Método que busca la escalera real en la mano.
   *     Todas las cartas del mismo palo y además la escalera empezando
   *     por el 10 y acabando por el As
   * @returns Retrona true en caso de encontrala y false en caso contrario
   */
  hasRoyalFlush() {
    let arrayRoyal = [1, 10, 11, 12, 13];
    let count = 0;
    this.sort();
    for (let i = 0; i < this.cards.length - 1; i++) {
      if (this.cards[i].suit === this.cards[i + 1].suit &&
        this.cards[i].rank === arrayRoyal[count]) {
          count++; 
          if (count === 4)
          return true;
      }
      else count = 0;
      }
      return false;
  }
  /**
   * @description Método que clasifica una mano viendo lo que contiene.
   *     Actualiza el atributo pribado label nombrando asi la mano con  
   *     el resultado
   */
  classify() {
    if (this.hasRoyalFlush())
      this.label = 'Royal Flush';
    else if (this.hasStraightFlush())
      this.label = 'Straight Flush';
    else if (this.hasFourOfaKind())
      this.label = 'Four of a Kind';
    else if (this.hasFullHouse())
      this.label = 'Full House';
    else if (this.hasFlush())
      this.label = 'Flush';
    else if (this.hasStraight())
      this.label = 'Straight';
    else if (this.hasThreeOfaKind())
      this.label = 'Three of a Kind';
    else if (this.hasTwoPair())
      this.label = 'Two Pair';
    else if (this.hasPair())
      this.label = 'Pair';
  }
  /**
   * 
   * @param {Number} iterations Número de manos que se desea comprobar
   * @description Método que, dando un número de manos a comprobar,
   *     Baraja, reparte y clasifica las manos y calcula los distintos 
   *     porcentajes de que salgan las combinaciones.
   *     En caso de estar ejecutando en consola también suelta los resultados
   *     a un fichero .json llamado statistics.json
   */
  estimatePosibilities(iterations) {
    let statsArray = generateStatsArray();
    let deck = new DefaultDeck();
    deck.generateDeck();
    let pokerHand = new PokerHand();
    for (let i = 0; i < iterations; i++) {
      deck.shuffle();
      pokerHand.moveCards(deck, 7);
      pokerHand.classify();
      for (let stat of statsArray) {
        if (stat.label === pokerHand.label) {
          stat.count++;
        }
      }
      while (pokerHand.cards.length != 0) {
        deck.addCard(pokerHand.popCard());
      }
    }
    for (let stat of statsArray) {
      stat.percentage = ((stat.count / iterations) * 100).toFixed(4);
      stat.percentage = stat.percentage + '%';
    }
    console.log(statsArray);
    if (notOnBrowser)
      this.convertResultToJSON(statsArray);
  }
  convertResultToJSON(result) {
    let json = JSON.stringify(result, null, " ");
    fs.writeFileSync("statistics.json", json);
  }
}

/**
 * @description Método que genera el array de objectos en el que 
 *     se actualizaran los resultados para ser mostrados
 * @returns Array de Objetos 
 */
function generateStatsArray() {
  let stats = [{label: 'Royal Flush', count: 0},
      {label: 'Straight Flush', count: 0},
      {label: 'Four of a Kind', count: 0},
      {label: 'Full House', count: 0},
      {label: 'Flush', count: 0},
      {label: 'Straight', count: 0},
      {label: 'Three of a Kind', count: 0},
      {label: 'Two Pair', count: 0},
      {label: 'Pair', count: 0}];
  return stats;
}

if (typeof exports !== 'undefined') {
  exports.PokerHand = PokerHand;
}