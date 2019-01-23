import * as React from 'react'
import { FormSpyProps } from 'react-final-form'

interface Additional {
  defaultProps?: any
}

type FormSpyType = React.ComponentType<FormSpyProps> & Additional

export default FormSpyType
