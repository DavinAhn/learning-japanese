import Section from './Section';

export default class Set {
  get id() { return this._id; }
  get sections() { return this._sections; }
  get words() { return this.sections.map((section) => section.words).reduce((array, words) => array.concat(words), []); }
  get wordCount() { return this.words.length; }
  get hash() { return `${this.id}`; }

  constructor(data) {
    this._id = data.id;
    this._keys = Section.keys
      .map((key) => data[key] ? key : '')
      .filter((key) => key.length > 0);
    this._sections = this._keys
      .map((key) => new Section(this, key, data[key]));
  }

  expand(wordFinder) {
    this.sections.forEach((section) => section.expand(wordFinder));
  }
}
