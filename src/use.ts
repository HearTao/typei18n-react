import {
  createElement,
  createContext,
  ReactChild,
  Children,
  useContext,
  useState
} from 'react'
import { Provider } from './types'

interface Props<L> {
  language: L
  children?: ReactChild
}

interface Context<L> {
  readonly lang: L
  setLanguage(lang: L): Promise<void>
}

export default function makeI18nContext<L, T>(provider: Provider<L, T>) {
  function updateLanguage(lang: L) {
    return provider.setLanguage(lang) || Promise.resolve()
  }

  const I18nContext = createContext<Context<L>>({
    lang: provider.lang,
    setLanguage: updateLanguage
  })

  function I18nProvider({ children, language }: Props<L>) {
    const [lang, setLang] = useState(language)
    function setLanguage(lang: L) {
      return updateLanguage(lang).then(() => {
        setLang(lang)
      })
    }

    return createElement(
      I18nContext.Provider,
      { value: { lang, setLanguage } },
      Children.only(children)
    )
  }

  function useI18n() {
    const context = useContext(I18nContext)
    return [provider.t, context.lang, context.setLanguage] as const
  }

  return [I18nProvider, useI18n] as const
}
