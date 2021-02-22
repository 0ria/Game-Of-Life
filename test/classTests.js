/**
 * @author Daniel Oria Martin
 * @mail alu0101027340@ull.edu.es
 * @date 09/05/2020
 * GitHub User: 0ria
 * Location: Escuela Superior Técnica de Ingenieria de La Laguna
 * Subject: Programacion de Aplicaciones Interactivas
 * Assignment: Práctica 12, Game of Life.
 * Task: test
 * @brief programa que contiene los test de las clases usadas en el ejercicio.
 * References:  Tasks:
 *              https://github.com/fsande/PAI-P12-Life/blob/master/2019-2020_p12_Life.md.
 */
'use strict';

let expect;
let CellClass;
let BoardClass;

if (typeof require !== 'undefined') {
  CellClass = require('../src/cellClass.js').Cell;
  BoardClass = require('../src/gridClass.js').Board;
  expect = require('chai').expect;
}
else {
  CellClass = Cell;
  BoardClass = Board;
  expect = chai.expect;
}

//const assert = chai.expect;
//const expect = chai.expect;

describe('Testing Cell class Methods:', () => {
  let cell;
  beforeEach(function() {
    cell = new CellClass(100, 100, 50, 1);
  });
  it('Testing constructor.', function() {
    expect(cell.posX).to.equal(100);
    expect(cell.posY).to.equal(100);
    expect(cell.size).to.equal(50);
    expect(cell.state).to.equal(1);
  });
  it('Testing state setter.', function() {
    cell.setState(4);
    expect(cell.state).to.equal(4);
  });
  it('Testing state getter.', function() {
    cell.setState(4);
    expect(4).to.equal(cell.getState());
  });
  it('Testing neighbour setter.', function() {
    cell.setNeighbours(6);
    expect(cell.neighbours).to.equal(6);
  });
  it('Testing neighbour getter.', function() {
    cell.setNeighbours(4);
    expect(4).to.equal(cell.getNeighbours());
  });
});

describe('Testing Board class Methods:', () => {
  let board;
  beforeEach(function() {
    board = new BoardClass(500, 500, 50);
  });
  it('Testing constructor.', function() {
    expect(board.sizeX).to.equal(500);
    expect(board.sizeY).to.equal(500);
    expect(board.eachBoxSize).to.equal(50);
  });
  it('Creating board.', function() {
    expect(board.cellArray).to.eql([]);
    board.createBoard();
    expect(board.cellArray).to.not.eql([]);
  });
  it('testing getAliveNumber method.', function() {
    board.createBoard();
    board.cellArray[5].setState(1);
    board.cellArray[20].setState(1);
    board.cellArray[30].setState(1);
    expect(board.getAliveNumber()).to.equal(3);
  });
  it('testing KillAll method.', function() {
    board.createBoard();
    board.cellArray[5].setState(1);
    board.cellArray[20].setState(1);
    board.cellArray[30].setState(1);
    expect(board.getAliveNumber()).to.equal(3);
    board.killAll();
    expect(board.getAliveNumber()).to.equal(0);
  });
  it('Counting neighbours of an especific cell.', function() {
    let newBoard = new BoardClass(1100, 822, 1100 / 75);
    newBoard.createBoard();
    newBoard.cellArray[500].setState(1);
    newBoard.cellArray[501].setState(1);
    newBoard.cellArray[502].setState(1);
    expect(newBoard.countExactNumber(501)).to.equal(2);
  });
});