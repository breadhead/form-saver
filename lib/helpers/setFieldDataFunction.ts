interface FieldData {
  saving: boolean
}

export type SetFieldData = (field: string, data: FieldData) => any

export const emptySetFieldData = () => null
