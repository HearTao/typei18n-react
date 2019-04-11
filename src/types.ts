export interface Provider<L, T> {
  readonly lang: L
  readonly t: T
  setLanguage(lang: L): Promise<void> | void
}

export interface InjectionProps<L, T> {
  lang: L
  t: T
  setLanguage(lang: L): Promise<void>
}
