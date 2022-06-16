import { useState } from 'react'
import classNames from 'classnames'
import { FaChevronRight } from 'react-icons/fa'
import { MdFavoriteBorder } from 'react-icons/md'

import Button from 'components/UI/Button'
import Card from 'components/UI/Card'

import { useUpdateFavouritesMutation } from 'api/favourites'
import { useAppSelector } from 'hooks/store-hooks'
import { isKeyEnterOrSpace } from 'utils/utils'

import { Food } from 'types/food'

interface FoodCardItemProps {
  item: Food
}

export const FoodCardItem: React.FC<FoodCardItemProps> = ({ item }) => {
  const [isCardFocused, setIsCardFocused] = useState(false)

  const userId = useAppSelector(state => state.auth.user?.localId)
  const [updateFavourites] = useUpdateFavouritesMutation()

  const toggleFavouriteHandler = () => {
    userId && updateFavourites({ userId, favouritesIds: [item.id] })
  }

  return (
    <Card
      classes={classNames(
        'cursor-pointer hover:scale-105 hover:shadow-lg transition-transform relative',
        { 'scale-105': isCardFocused }
      )}
      onMouseEnter={() => setIsCardFocused(true)}
      onMouseLeave={() => setIsCardFocused(false)}
      onFocus={() => setIsCardFocused(true)}
      tabIndex={0}
      ariaLabelledby={`articleHeading${item.id}`}
    >
      {isCardFocused && (
        <div
          className="absolute w-9 h-9 bg-[#ff3259] text-white right-2 top-2 text-2xl flex items-center justify-center rounded-full transition-colors hover:bg-red-600"
          onClick={toggleFavouriteHandler}
          onKeyDown={({ nativeEvent }) =>
            isKeyEnterOrSpace(nativeEvent.code) && toggleFavouriteHandler()
          }
          tabIndex={0}
          aria-label="Add to favourite"
          role="button"
        >
          <MdFavoriteBorder />
        </div>
      )}
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
            name="Add to Cart"
            onBlur={() => setIsCardFocused(false)}
            ariaLabel="Open modal with meal details"
          >
            <FaChevronRight />
          </Button>
        </div>
      </div>
    </Card>
  )
}
