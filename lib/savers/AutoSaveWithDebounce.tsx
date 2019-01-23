import * as diff from 'object-diff'
import * as React from 'react'

import { emptySave, Save } from '../helpers/saveFunction'

interface State {
  values: any
  submitting: boolean
}

interface Props {
  values?: any
  debounce?: number
  children?: React.ReactNode
  save?: Save
}

const DEFAULT_DEBOUNCE = 1500

export default class AutoSaveWithDebounce extends React.Component<
  Props,
  State
> {
  public state = {
    values: this.props.values,
    submitting: false,
  } as State

  private timeout: number
  private promise: Promise<any>

  public componentWillReceiveProps() {
    if (this.timeout) {
      clearTimeout(this.timeout)
    }

    const { debounce = DEFAULT_DEBOUNCE } = this.props

    this.timeout = setTimeout(this.save, debounce)
  }

  public render() {
    const { submitting } = this.state
    const { children } = this.props

    const canRender = submitting && !!children

    return canRender ? children : null
  }

  private save = async () => {
    if (this.promise) {
      await this.promise
    }
    const { values, save = emptySave } = this.props

    const difference = diff(this.state.values || {}, values || {})
    if (Object.keys(difference).length) {
      this.setState({ submitting: true, values })
      this.promise = save(values, difference)
      await this.promise
      delete this.promise
      this.setState({ submitting: false })
    }
  }
}
