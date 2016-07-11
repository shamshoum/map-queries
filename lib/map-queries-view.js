'use babel';

import { Point } from 'atom';

export default class MapQueriesView {

  constructor(serializedState) {
    // Create root element
    this.element = document.createElement('div');
    this.element.classList.add('map-queries');

    console.log(this.element.children);

    // Create message element
    const queries = document.createElement('div');
    queries.classList.add('query-list');
    this.element.appendChild(queries);
  }

  // Returns an object that can be retrieved when package is activated
  serialize() {}

  // Tear down any state and detach
  destroy() {
    this.element.remove();
  }

  getElement() {
    return this.element;
  }

  addQueries(queries) {

    var queryList = this.element.children[0];

    for (let i = 0; i < queries.length; i++) {
      var query = document.createElement('div');
      query.innerHTML = queries[i].query + " " + queries[i].line;
      let line = queries[i].line - 1;
      query.onclick = function() {
        var editor = atom.workspace.getActiveTextEditor();
        position = new Point(line, 0);
        editor.setCursorBufferPosition(position);
      };
      queryList.appendChild(query);
    }

  };

}
