import * as React from 'react'
import { FieldProps, FieldRenderProps } from 'react-final-form'

interface Props {
  name: string
  children?: React.ReactNode
}

const isSaving = ({ meta }: FieldRenderProps): boolean => {
  if (!!meta.data && meta.data.hasOwnProperty('saving')) {
    return !!(meta.data as any).saving
  }

  return false
}

const withSavingIndicator = (TargetField: React.ComponentType<FieldProps>) => ({
  name,
  children,
}: Props) => (
  <TargetField
    name={name}
    subscription={{ data: true }}
    render={props => (isSaving(props) && !!children ? children : null)}
  />
)

export default withSavingIndicator
