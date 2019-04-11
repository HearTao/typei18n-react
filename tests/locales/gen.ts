export type Language = 'en-US' | 'zh-CN'
export type RootType = {
  test: {
    hehe: string
    what: string
  }
}
export class I18nProvider {
  constructor(
    private maps: Record<Language, RootType>,
    private _lang: Language
  ) {}
  get lang() {
    return this._lang
  }
  public setLanguage(lang: Language) {
    this._lang = lang
  }
  public get t() {
    return this.maps[this.lang]
  }
}
const provider = new I18nProvider(
  {
    'en-US': {
      test: {
        hehe: 'Hehe?',
        what: 'What?'
      }
    },
    'zh-CN': {
      test: {
        hehe: '\u5475\u5475?',
        what: '\u6C83\u7279?'
      }
    }
  } as Record<Language, RootType>,
  'en-US'
)
export default provider
