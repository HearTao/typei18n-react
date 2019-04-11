export type Language = 'en-US' | 'zh-CN'
export type RootType = {
  test: {
    hehe: string
    what: string
  }
}
export declare class I18nProvider {
  private maps
  private _lang
  constructor(maps: Record<Language, RootType>, _lang: Language)
  readonly lang: Language
  setLanguage(lang: Language): void
  readonly t: RootType
}
declare const provider: I18nProvider
export default provider
