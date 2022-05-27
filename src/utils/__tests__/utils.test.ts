import { KeyboardEventCodes } from 'types/enums/KeyboardEventCodes'
import { isKeyEnterOrSpace } from 'utils/utils'

describe('isKeyEnterOrSpace', () => {
  test.each`
    code                         | result
    ${KeyboardEventCodes.ENTER}  | ${true}
    ${KeyboardEventCodes.SPACE}  | ${true}
    ${KeyboardEventCodes.ESCAPE} | ${false}
  `(
    'Should return true if code is [Space]/[Enter]',
    ({ code, result }: { code: string; result: boolean }) => {
      // Then
      expect(isKeyEnterOrSpace(code)).toBe(result)
    }
  )
})
