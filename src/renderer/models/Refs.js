export default class Refs {
  get list() { return this._list; }

  constructor(data) {
    this._list = data;
  }
}
