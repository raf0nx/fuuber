export const capitalize = (value: string) =>
  value && value.slice(0, 1).toUpperCase().concat(value.slice(1))

export const snakeCaseToSentenceCase = (value: string) =>
  value && value.slice(0).replace(/_/g, ' ')
