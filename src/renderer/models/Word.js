export default class Word {
  get id() { return this._id; }
  get text() { return this._text; }
  get readings() { return this._readings; }
  get furi() { return this._furi; }
  get level() { return this._level; }
  get meanings() { return this._meanings; }
  get hash() { return `${this._super.hash}_${this.id}`; }

  constructor(section, data) {
    this._super = section;
    this._id = data.id;
    this._text = data.word;
    this._readings = data.readings;
    this._furi = data.furi;
    this._level = data.level;
    this._meanings = data.meanings;
  }
}
