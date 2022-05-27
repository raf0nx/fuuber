import { KeyboardEventCodes } from 'types/enums/KeyboardEventCodes'

export const isKeyEnterOrSpace = (code: string) => {
  return code === KeyboardEventCodes.ENTER || code === KeyboardEventCodes.SPACE
}
