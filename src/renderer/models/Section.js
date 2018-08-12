import Refs from 'renderer/models/Refs';
import Word from 'renderer/models/Word';

export const SectionKey = {
  a: 'a', i: 'i', u: 'u', e: 'e', o: 'o',
  ka: 'ka', ki: 'ki', ku: 'ku', ke: 'ke', ko: 'ko',
  sa: 'sa', si: 'si', su: 'su', se: 'se', so: 'so',
  ta: 'ta', chi: 'chi', tsu: 'tsu', te: 'te', to: 'to',
  na: 'na', ni: 'ni', nu: 'nu', ne: 'ne', no: 'no',
  ha: 'ha', hi: 'hi', hu: 'hu', he: 'he', ho: 'ho',
  ma: 'ma', mi: 'mi', mu: 'mu', me: 'me', mo: 'mo',
  ya: 'ya', yu: 'yu', yo: 'yo',
  ra: 'ra', ri: 'ri', ru: 'ru', re: 're', ro: 'ro',
  wa: 'wa', wo: 'wo',
  '~e': '~e', '~na': '~na'
}

export default class Section {
  static keys = [
    SectionKey.a, SectionKey.i, SectionKey.u, SectionKey.e, SectionKey.o,
    SectionKey.ka, SectionKey.ki, SectionKey.ku, SectionKey.ke, SectionKey.ko,
    SectionKey.sa, SectionKey.si, SectionKey.su, SectionKey.se, SectionKey.so,
    SectionKey.ta, SectionKey.chi, SectionKey.tsu, SectionKey.te, SectionKey.to,
    SectionKey.na, SectionKey.ni, SectionKey.nu, SectionKey.ne, SectionKey.no,
    SectionKey.ha, SectionKey.hi, SectionKey.hu, SectionKey.he, SectionKey.ho,
    SectionKey.ma, SectionKey.mi, SectionKey.mu, SectionKey.me, SectionKey.mo,
    SectionKey.ya, SectionKey.yu, SectionKey.yo,
    SectionKey.ra, SectionKey.ri, SectionKey.ru, SectionKey.re, SectionKey.ro,
    SectionKey.wa, SectionKey.wo,
    SectionKey["~e"], SectionKey["~na"],
  ]

  get key() { return this._key; }
  get words() { return this._words; }
  get wordCount() { return this._words.length; }
  get hash() { return `${this._super.hash}_${this.key}`; }

  constructor(set, key, data) {
    this._super = set;
    this._key = key;
    this._words = data.map((obj) => {
      if (obj.refs) {
        return new Refs(obj.refs);
      } else {
        return new Word(this, obj);
      }
    });
  }

  expand(wordFinder) {
    this._words = this.words.map((item) => {
      if (item instanceof Refs) {
        return item.list.map((id) => {
          return wordFinder(id);
        });
      } else {
        return item;
      }
    }).reduce((array, item) => array.concat(item), []);
  }
}
