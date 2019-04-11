import * as React from 'react'
import * as ReactDOM from 'react-dom'
import i18n, { Language, RootType } from 'i18n'
import makeI18nContext from '../src/use'
import connect from '../src/connect'
import { InjectionProps } from '../src/types'

const [I18nProvider, useI18n] = makeI18nContext(i18n)

interface Props {
  a: string
}

const Render = ({
  t,
  setLanguage
}: InjectionProps<Language, RootType> & Props) => {
  return (
    <div style={{ padding: `5rem` }}>
      {[`en-US`, `zh-CN`].map((la, idx) => (
        <button key={idx} onClick={() => setLanguage(la as Language)}>
          {la.toUpperCase()}
        </button>
      ))}

      <div style={{ margin: `2rem` }}>
        <div>{t.test.hehe}</div>
        <div>{t.test.what}</div>
      </div>
    </div>
  )
}

function Root(props: Props) {
  const [t, lang, setLang] = useI18n()

  return <Render t={t} lang={lang} setLanguage={setLang} {...props} />
}
const Root1 = connect(i18n)(Render)

ReactDOM.render(
  <I18nProvider language="en-US">
    <div>
      <Root a="1" />
      <Root1 a="1" />
    </div>
  </I18nProvider>,
  document.body
)
