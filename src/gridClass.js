/**
 * @author Daniel Oria Martin
 * @mail alu0101027340@ull.edu.es
 * @date 09/05/2020
 * GitHub User: 0ria
 * Location: Escuela Superior Técnica de Ingenieria de La Laguna
 * Subject: Programacion de Aplicaciones Interactivas
 * Assignment: Práctica 12, Game of Life.
 * Task: gridClass
 * @brief programa que contiene la clase grid la cual crea el tablero.
 * References:  Tasks:
 *              https://github.com/fsande/PAI-P12-Life/blob/master/2019-2020_p12_Life.md.
 */
'use strict';
const COUNTROWAUX = 59;
const COUNTCOLUMNAUX = 1;
const LASTPOSAUX = 62;
let CellObject
if (typeof require !== 'undefined') {
  CellObject = require('../src/cellClass.js').Cell;
}
else {
  CellObject = Cell;
}

/**
 * @class Clase Board simboliza todo el universo en el que se moverán las
 *     distintas células
 * @description Contiene las células dentro de un array que simboliza el tablero
 *     y con el que se trabajará a lo largo del ejercicio
 */
class Board {
  /**
   * 
   * @param {Number} totalWidth Tamaño del ancho del canvas
   * @param {Number} totalHeight Tamaño del alto del canvas
   * @param {Number} boxsize Tamaño de cada casilla (cada célula)
   */
  constructor(totalWidth, totalHeight, boxsize) {
    this.sizeX = totalWidth;
    this.sizeY = totalHeight;
    this.eachBoxSize = boxsize;
    this.cellArray = [];
  }
  /**
   * @description Método que crea el tablero y almacena cada célula dentro del 
   *     array. Los bucles comienzan y termian en esos valores de manera que 
   *     por fuera del canvas se crea una fila y columna extra por cada lado
   *     y asi al recorrer en busca de vecinas en las células de los bordes 
   *     no habrá problema al acceder a las posiciónes que quedan fuera del 
   *     canvas 
   */
  createBoard() {
    for (let i = - this.eachBoxSize; i < this.sizeX + this.eachBoxSize; i += this.eachBoxSize) {
      for (let j = - this.eachBoxSize; j < this.sizeY + this.eachBoxSize; j += this.eachBoxSize) {
        let cell = new CellObject(i, j, this.eachBoxSize, 0);
        this.cellArray.push(cell);
      }
    }
  }
  /* istanbul ignore next */
  /**
   * @description Método que dibuja el board al canvas
   */
  drawBoard() {
    for (let element of this.cellArray)
      element.draw();
  }
  /**
   * @description Método que checkea el número de células vivas que hay
   * @returns Retorna el número de células vivas
   */
  getAliveNumber() {
    let sum = 0;
    for (let element of this.cellArray)
      sum += element.getState();
    return sum;
  }
  /**
   * @description Método que mata a todas las células (estado = 0)
   */
  killAll() {
    for (let element of this.cellArray)
      element.state = 0;
  }
  /**
   * @description Método que es llamado despues de el de actualizarVecinas
   *     actualizando asi en cada célula el canvas
   */
  updateBoard() {
    for (let element of this.cellArray) {
      element.updateState();
    }
  }
  /* istanbul ignore next */
  /**
   * 
   * @param {number} cellsAlive Número de celulas vivas al empezar
   * @description Este método se llama cuando se pulsa start por primera vez
   *     generando aleatoriamente el número de celulas que se pasan 
   *     en el tablero 
   */
  updateBoardAlives(cellsAlive) {
    for (let i = 0; i < cellsAlive; i++) {
      let postition = Math.floor(Math.random() * (this.cellArray.length - COUNTROWAUX - LASTPOSAUX + 1) + 0);
      this.cellArray[postition].state = 1;
    }
    this.updateBoard();
  }
  /**
   * 
   * @param {Number} pos Posición de la célula en el array
   * @description Método que cuenta las vecinas en la misma fila que la
   *     célula que se esta evaluando
   */
  countNeighboursInRow(pos) {
    return (this.cellArray[pos + COUNTROWAUX].getState() + this.cellArray[pos - COUNTROWAUX].getState());
  }
  /**
   * 
   * @param {Number} pos Posición de la célula en el array
   * @description Método que cuenta las vecinas en la misma columna que
   *     la célula que se está evaluando
   */
  countNeighboursInColumn(pos) {
    return (this.cellArray[pos + COUNTCOLUMNAUX].getState() + this.cellArray[pos - COUNTCOLUMNAUX].getState());
  }
  /**
   * 
   * @param {Number} pos Posición de la célula en el array
   * @description Método que cuenta las vecinas en las diagonales
   */
  countNeighboursInDiagonal(pos) {
    return (this.cellArray[pos + COUNTROWAUX + COUNTCOLUMNAUX].getState() + 
            this.cellArray[pos + COUNTROWAUX - COUNTCOLUMNAUX].getState() + 
            this.cellArray[pos - COUNTROWAUX + COUNTCOLUMNAUX].getState() + 
            this.cellArray[pos - COUNTROWAUX - COUNTCOLUMNAUX].getState());
  }
  /**
   * 
   * @param {Number} cellPos Posición de la célula en el array
   * @description Método que llama a los distintos método que recuenta
   *     el número de celulas vivas al rededor y suma el total
   */
  countExactNumber(cellPos) {
    return (this.countNeighboursInRow(cellPos) + this.countNeighboursInColumn(cellPos) + this.countNeighboursInDiagonal(cellPos));
  }
  /* istanbul ignore next */
  /**
   * @description Método que cuenta las células vecinas y mas tarde actualiza
   *     el estado de las células teniendo en cuenta las vecinas contadas
   */
  countNeighbours() {
    for (let i = COUNTROWAUX + 1; i < this.cellArray.length - COUNTROWAUX - LASTPOSAUX; i++) {
      this.cellArray[i].setNeighbours(this.countExactNumber(i));
    }
    for (let element of this.cellArray) {
      if (element.getNeighbours() === 3 && element.getState() === 0) 
        element.setState(1);
      else if (((element.getNeighbours() === 2) || (element.getNeighbours() === 3)) && element.getState() === 1)
        element.setState(1);
      else
        element.setState(0);
    }
  }
}

if (typeof exports !== 'undefined') {
  exports.Board = Board;
}