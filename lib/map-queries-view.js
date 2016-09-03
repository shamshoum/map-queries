'use babel';

import { Point } from 'atom'

export default class MapQueriesView {

  constructor(serializedState) {
    // Create root element
    this.element = document.createElement('div');
    this.element.classList.add('map-queries');

    console.log(this.element.children);

    // var searchInput = document.createElement("atom-text-editor");
    // searchInput.classList.add("editor");
    // searchInput.setAttribute("mini", "");
    // searchInput.classList.add("mini");
    // this.element.appendChild(searchInput);

    console.log(this.element.children);

    // Query list
    const queries = document.createElement('ol');
    queries.classList.add("query-list", "list-group");
    this.element.appendChild(queries);

    console.log(this.element.children);
  }

  // Returns an object that can be retrieved when package is activated
  serialize() {

  }

  // Tear down any state and detach
  destroy() {
    this.element.remove();
  }

  getElement() {
    return this.element;
  }

  addQueries(queries) {

    var queryList = this.element.children[0];
    queryList.innerHTML = "";

    for (let i = 0; i < queries.length; i++) {
      var query = document.createElement('li');
      query.innerHTML = queries[i].query + " " + queries[i].line;
      let line = queries[i].line - 1;
      query.onclick = function(event) {
        var editor = atom.workspace.getActiveTextEditor();
        position = new Point(line, 0);
        editor.setCursorBufferPosition(position);
      };
      queryList.appendChild(query);
    }

  };

}
