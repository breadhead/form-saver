export type Save = (fields: any, diff: any) => Promise<any>

export const emptySave = () => Promise.resolve()
