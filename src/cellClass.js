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
const GRAYBACKGROUND = 'rgb(153, 153, 153)';

/**
 * @class Clase cell la cual contendra la posición de la misma, el estado y el 
 *     número de vecinos. 
 * @description Cada celula será alamcenada por la clase Board dentro de un array 
 *     que representará el tablero donde se trabajará
 */
class Cell {
  /**
   * 
   * @param {Number} posx Posicion x en el canvas 
   * @param {Number} posy Posicion y en el canvas
   * @param {Number} size Tamaño de cada cell
   * @param {Number} stat Estado de la celula, podrá ser 0 o 1
   */
  constructor(posx, posy, size, stat) {
    this.posX = posx;
    this.posY = posy;
    this.size = size;
    this.state = stat;
    this.neighbours = 0;
  }
  /**
   * 
   * @param {Number} stat Estado, puede ser 0 o 1
   * @description Setter para el estado 
   */
  setState(stat) {
    this.state = stat;
  }
  /**
   * 
   * @description Getter para el estado 
   * @returns atributo estado de la clase
   */
  getState() {
    return this.state;
  }
  /**
   * 
   * @param {Number} num Número de vecinos
   * @description Setter para el numero de vecinos
   */
  setNeighbours(num) {
    this.neighbours = num;
  }
  /**
   * @description Getter número de vecinos
   * @returns Número de vecinos
   */
  getNeighbours() {
    return this.neighbours;
  }
  /* istanbul ignore next */
  /**
   * @description Método que actualiza el color en el canvas de cada cell
   */
  updateState() {
    if (this.state === 0) {
      CTXR.beginPath();
      CTXR.fillStyle = GRAYBACKGROUND; // Mismo color que el fondo
      CTXR.fillRect(this.posX + 1, this.posY + 1, this.size - 2, this.size - 2);
    }
    if (this.state === 1) {
      CTXR.beginPath();
      CTXR.fillStyle = 'white';
      CTXR.fillRect(this.posX + 1, this.posY + 1, this.size - 2, this.size - 2);
    }
  }
  /* istanbul ignore next */
  /**
   * @description Método que dibuja cada casilla del canvas
   */
  draw() {
    CTXR.beginPath();
    CTXR.strokeStyle = 'black';
    CTXR.strokeRect(this.posX, this.posY, this.size, this.size);
    this.updateState();
  }
}

if (typeof exports !== 'undefined') {
  exports.Cell = Cell;
}