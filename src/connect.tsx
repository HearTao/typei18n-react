import { Provider, InjectionProps } from './types'
import * as React from 'react'

type Omit0<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

export default function connect<L, T>(provider: Provider<L, T>) {
  return function wrap<
    P extends InjectionProps<L, T>,
    OP extends Omit0<P, keyof InjectionProps<L, T>> = Omit0<
      P,
      keyof InjectionProps<L, T>
    >
  >(
    Comp: React.ComponentType<OP & InjectionProps<L, T>>
  ): React.ComponentType<OP> {
    interface State {
      lang: L
    }
    class Wrapper extends React.Component<OP, State> {
      state: State = {
        lang: provider.lang
      }

      setLanguage = (lang: L) => {
        return (provider.setLanguage(lang) || Promise.resolve()).then(() => {
          this.setState({ lang })
        })
      }

      render() {
        return (
          <Comp
            {...this.props}
            t={provider.t}
            lang={this.state.lang}
            setLanguage={this.setLanguage}
          />
        )
      }
    }
    return Wrapper
  }
}
