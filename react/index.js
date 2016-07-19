import React from 'react'
import { render } from 'react-dom'
import Board from './modules/Board'
import cells from './modules/cells'

window.router = {
  callbacks: [],
  subscribe: function(callback) {
    this.callbacks.push(callback);
  },
  publish: function(number) {
    this.callbacks.map(function(callback){
      callback(number);
    })
  }
};

render((
  <Board cells={cells} router={window.router} />
), document.getElementById('board-container'))
