'use babel';

import MapQueriesView from './map-queries-view';
import { CompositeDisposable } from 'atom';

export default {

  mapQueriesView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.mapQueriesView = new MapQueriesView(state.mapQueriesViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.mapQueriesView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'map-queries:map': () => this.map(),
      'map-queries:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.mapQueriesView.destroy();
  },

  serialize() {
    return {
      mapQueriesViewState: this.mapQueriesView.serialize()
    };
  },

  map() {

    if(this.modalPanel.isVisible()) {
      return this.modalPanel.hide();
    }
    console.log('MapQueries was toggled!');
    var editor = atom.workspace.getActiveTextEditor();
    var rows = editor.getText().split('\n');
    var queries = [];

    for (var i = 0; i < rows.length; i++) {
      if(rows[i].indexOf("@media") != -1) {
        queries.push({ query: rows[i].slice(0, rows[i].indexOf(`{`)), line: i + 1 });
      }
    }
    console.log(queries);

    this.mapQueriesView.addQueries(queries);

    console.log(this.mapQueriesView);

    return this.modalPanel.show();
  },
  toggle() {
    console.log('toggle');
    if(this.modalPanel.isVisible()) {
      return this.modalPanel.hide();
    }
  }


};
