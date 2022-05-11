import { capitalize, snakeCaseToSentenceCase } from './string-utils'

describe('capitalize', () => {
  test('it should purely capitalize the provided string', () => {
    // Given
    const stringToCapitalize = 'some random string'

    // When
    const capitalizedString = capitalize(stringToCapitalize)

    // Then
    expect(capitalizedString).toBe('Some random string')
    expect(stringToCapitalize).not.toBe('Some random string')
  })

  test('it should return an empty string when empty string is provided', () => {
    // Given
    const emptyString = ''

    // When
    const result = capitalize(emptyString)

    // Then
    expect(result).toBe('')
  })
})

describe('snakeCaseToSentenceCase', () => {
  test('it should map snake cased string to regular sentence', () => {
    // Given
    const snakeCaseString = 'some_random_string'

    // When
    const sentenceCaseString = snakeCaseToSentenceCase(snakeCaseString)

    // Then
    expect(sentenceCaseString).toBe('some random string')
  })

  test('it should return an empty string when empty string is provided', () => {
    // Given
    const emptyString = ''

    // When
    const result = snakeCaseToSentenceCase(emptyString)

    // Then
    expect(result).toBe('')
  })
})
