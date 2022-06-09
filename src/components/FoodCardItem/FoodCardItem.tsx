import { useState } from 'react'
import classNames from 'classnames'
import { FaChevronRight } from 'react-icons/fa'

import Button from 'components/UI/Button'
import Card from 'components/UI/Card'

import { Food } from 'types/food'

interface FoodCardItemProps {
  item: Food
}

export const FoodCardItem: React.FC<FoodCardItemProps> = ({ item }) => {
  const [isButtonFocused, setIsButtonFocused] = useState(false)

  return (
    <Card
      classes={classNames(
        'cursor-pointer hover:scale-105 hover:shadow-lg focus:scale-105 transition-transform',
        { 'scale-105': isButtonFocused }
      )}
      tabIndex={0}
      ariaLabelledby={`articleHeading${item.id}`}
    >
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
            onFocus={() => setIsButtonFocused(true)}
            onBlur={() => setIsButtonFocused(false)}
            ariaLabel="Open modal with meal details"
          >
            <FaChevronRight />
          </Button>
        </div>
      </div>
    </Card>
  )
}
