import * as diff from 'object-diff'
import * as React from 'react'

import { emptySave, Save } from '../helpers/saveFunction'
import {
  emptySetFieldData,
  SetFieldData,
} from '../helpers/setFieldDataFunction'

interface State {
  values: any
  submitting: boolean
}

interface Props {
  values?: any
  active?: string
  children?: React.ReactNode
  setFieldData?: SetFieldData
  save?: Save
}

export default class AutoSaveOnFieldBlur extends React.Component<Props, State> {
  public state = {
    values: this.props.values,
    submitting: false,
  } as State

  private promise: Promise<any>

  public componentWillReceiveProps(nextProps: Props) {
    if (this.props.active && this.props.active !== nextProps.active) {
      // blur occurred
      this.save(this.props.active)
    }
  }

  public render() {
    const { submitting } = this.state
    const { children } = this.props

    const canRender = submitting && !!children

    return canRender ? children : null
  }

  private save = async (blurredField: string) => {
    if (this.promise) {
      await this.promise
    }
    const {
      values,
      setFieldData = emptySetFieldData,
      save = emptySave,
    } = this.props

    const difference = diff(this.state.values, values)
    if (Object.keys(difference).length) {
      this.setState({ submitting: true, values })
      setFieldData(blurredField, { saving: true })
      this.promise = save(values, difference)
      await this.promise
      delete this.promise
      this.setState({ submitting: false })
      setFieldData(blurredField, { saving: false })
    }
  }
}
