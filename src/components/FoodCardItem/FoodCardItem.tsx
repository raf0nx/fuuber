import classNames from 'classnames'
import { FaChevronRight } from 'react-icons/fa'

import Button from 'components/UI/Button'
import Card from 'components/UI/Card'
import FoodModal from 'components/FoodModal'
import AddToFavourite from 'components/AddToFavourite'
import Modal from 'components/UI/Modal'

import { isKeyEnterOrSpace } from 'utils/utils'
import { useElementVisible } from 'hooks/use-element-visible'

import { Food } from 'types/food'

import './FoodCardItem.css'

export const FoodCardItem: React.FC<{ item: Food }> = ({ item }) => {
  const { ref, isElementVisible, setIsElementVisible } =
    useElementVisible<HTMLDivElement>(false)

  return (
    <>
      <Card
        id="foodCardItem"
        classes={classNames(
          'cursor-pointer hover:shadow-lg hover:scale-105 transition-transform relative focus-within:scale-105 focus-within:shadow-lg'
        )}
        onClick={() => setIsElementVisible(true)}
        onKeyDown={({ nativeEvent }) =>
          isKeyEnterOrSpace(nativeEvent.code) && setIsElementVisible(true)
        }
        tabIndex={0}
        ariaLabelledby={`articleHeading${item.id}`}
      >
        <AddToFavourite item={item} />
        <img
          src={item.img}
          className="rounded-t w-full h-60 object-cover"
          alt=""
        />
        <div className="p-4">
          <h3
            id={`articleHeading${item.id}`}
            className="text-lg font-semibold text-gray-900 mb-2 truncate"
          >
            {item.name}
          </h3>
          <p className="text-slate-500 text-sm line-clamp-3 h-15">
            {item.description}
          </p>
          <hr className="my-4" />
          <div className="flex items-center justify-between">
            <p className="font-semibold text-2xl text-indigo-500">
              $ {item.price}
            </p>
            <Button
              category="primary"
              name="Open modal"
              onClick={event => {
                event.stopPropagation()
                setIsElementVisible(true)
              }}
              onKeyDown={event => {
                event.stopPropagation()
                isKeyEnterOrSpace(event.nativeEvent.code) &&
                  setIsElementVisible(true)
              }}
              ariaLabel="Open modal with meal details"
            >
              <FaChevronRight />
            </Button>
          </div>
        </div>
      </Card>
      {/* Modal rendered as a document.body child */}
      <Modal show={isElementVisible}>
        <FoodModal
          item={item}
          classNames="w-256 h-128 flex relative"
          onClose={() => setIsElementVisible(false)}
          ref={ref}
        />
      </Modal>
    </>
  )
}
