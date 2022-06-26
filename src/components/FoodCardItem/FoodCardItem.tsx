import { useState } from 'react'
import classNames from 'classnames'
import { FaChevronRight } from 'react-icons/fa'
import { CSSTransition } from 'react-transition-group'

import Button from 'components/UI/Button'
import Card from 'components/UI/Card'

import { isKeyEnterOrSpace } from 'utils/utils'

import { Food } from 'types/food'
import FoodModal from 'components/UI/FoodModal'
import AddToFavourite from 'components/AddToFavourite'

interface FoodCardItemProps {
  item: Food
}

export const FoodCardItem: React.FC<FoodCardItemProps> = ({ item }) => {
  const [isCardFocused, setIsCardFocused] = useState(false)
  const [isModalOpened, setIsModalOpened] = useState(false)

  return (
    <>
      <Card
        classes={classNames(
          'cursor-pointer hover:scale-105 hover:shadow-lg transition-transform relative',
          { 'scale-105': isCardFocused }
        )}
        onClick={() => setIsModalOpened(true)}
        onKeyDown={({ nativeEvent }) =>
          isKeyEnterOrSpace(nativeEvent.code) && setIsModalOpened(true)
        }
        onMouseEnter={() => setIsCardFocused(true)}
        onMouseLeave={() => setIsCardFocused(false)}
        onFocus={() => setIsCardFocused(true)}
        tabIndex={0}
        ariaLabelledby={`articleHeading${item.id}`}
      >
        {isCardFocused && <AddToFavourite item={item} />}
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
              onBlur={() => setIsCardFocused(false)}
              onClick={event => {
                event.stopPropagation()
                setIsModalOpened(true)
              }}
              onKeyDown={event => {
                event.stopPropagation()
                isKeyEnterOrSpace(event.nativeEvent.code) &&
                  setIsModalOpened(true)
              }}
              ariaLabel="Open modal with meal details"
            >
              <FaChevronRight />
            </Button>
          </div>
        </div>
      </Card>
      {/* Modal rendered as a document.body child */}
      <CSSTransition
        in={isModalOpened}
        timeout={{
          enter: 300,
          exit: 500,
        }}
        classNames={{
          enterActive: 'animate-slide-in',
          exitActive: 'animate-slide-out',
        }}
        unmountOnExit
      >
        <FoodModal
          item={item}
          classNames="w-256 h-128 flex relative"
          onClose={() => setIsModalOpened(false)}
        />
      </CSSTransition>
    </>
  )
}
