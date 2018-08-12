import Set from 'renderer/models/Set';

export default class WordAccessor {
  get sets() { return this._sets; }
  get wordCount() { return this._sets.map((set) => set.wordCount).reduce((s1, s2) => s1 + s2, 0); }

  constructor(data) {
    this._sets = data.map((obj) => new Set(obj));
    this.sets.forEach((set) => {
      set.expand((id) => {
        return this.getWord(id);
      });
    });
  }

  getWord(id) {
    return this.getWords().find((word) => word.id === id);
  }

  getWords(skipSetIds = []) {
    return this.sets
      .filter((set) => skipSetIds.find((id) => id === set.id) === undefined)
      .map((set) => set.words)
      .reduce((l1, l2) => l1.concat(l2), []);
  }
}
