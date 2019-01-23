import * as React from 'react'
import { FormSpyProps } from 'react-final-form'

import FormSpyType from '../helpers/FormSpyType'
import { Save } from '../helpers/saveFunction'
import { SetFieldData } from '../helpers/setFieldDataFunction'
import AutoSaveOnFieldBlur from '../savers/AutoSaveOnFieldBlur'

interface Props extends FormSpyProps {
  save?: Save
  setFieldData?: SetFieldData
}

export default (TargetSpy: FormSpyType) => ({
  setFieldData,
  save,
  ...rest
}: Props) => (
  <TargetSpy
    {...rest}
    subscription={{ values: true, active: true }}
    render={props => (
      <AutoSaveOnFieldBlur {...props} save={save} setFieldData={setFieldData} />
    )}
  />
)
