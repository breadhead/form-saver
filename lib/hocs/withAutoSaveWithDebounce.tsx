import * as React from 'react'
import { FormSpyProps } from 'react-final-form'

import FormSpyType from '../helpers/FormSpyType'
import { Save } from '../helpers/saveFunction'
import AutoSaveWithDebounce from '../savers/AutoSaveWithDebounce'

interface Props extends FormSpyProps {
  save?: Save
  debounce?: number
}

export default (TargetSpy: FormSpyType) => ({
  debounce,
  save,
  ...rest
}: Props) => (
  <TargetSpy
    {...rest}
    subscription={{ values: true, active: true }}
    render={props => (
      <AutoSaveWithDebounce {...props} save={save} debounce={debounce} />
    )}
  />
)
