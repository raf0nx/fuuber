import { FaCartPlus } from 'react-icons/fa'
import { MdClose } from 'react-icons/md'

import Button from '../Button'
import Card from '../Card'

import { isKeyEnterOrSpace } from 'utils/utils'

import { Food } from 'types/food'

interface FoodModalProps {
  item: Food
  classNames?: string
  onClose: () => void
}

export const FoodModal: React.FC<FoodModalProps> = ({
  item,
  classNames,
  onClose,
}) => {
  return (
    <Card classes={classNames}>
      <span
        className="absolute top-4 right-4 text-2xl text-gray-900 cursor-pointer"
        tabIndex={0}
        aria-label="Close modal"
        onClick={onClose}
        onKeyDown={({ nativeEvent }) =>
          isKeyEnterOrSpace(nativeEvent.code) && onClose
        }
      >
        <MdClose />
      </span>
      <img className="w-1/2 rounded-l-lg object-cover" src={item.img} alt="" />
      <div className="flex flex-col w-1/2 px-8 py-4 justify-between">
        <div className="flex flex-col">
          <h1 className="text-2xl text-gray-900 font-semibold mb-2">
            {item.name}
          </h1>
          <p className="text-slate-500 text-sm  max-h-28 line-clamp-5">
            {item.description}
          </p>
          <hr className="my-4" />
        </div>
        <div className="flex justify-between items-center">
          <p className="font-semibold text-2xl text-indigo-500">
            $ {item.price}
          </p>
          <Button
            classes="flex items-center gap-2"
            category="primary"
            name="Add to Cart button"
            ariaLabel="Add meal to the Cart"
          >
            <FaCartPlus /> Add to Cart
          </Button>
        </div>
      </div>
    </Card>
  )
}
