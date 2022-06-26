import { useState } from 'react'
import classNames from 'classnames'
import { FaChevronRight } from 'react-icons/fa'
import { MdFavoriteBorder, MdFavorite } from 'react-icons/md'
import { useSnackbar } from 'notistack'
import { CSSTransition } from 'react-transition-group'

import Button from 'components/UI/Button'
import Card from 'components/UI/Card'

import { useUpdateFavouritesMutation } from 'api/favourites'
import { useAppSelector } from 'hooks/store-hooks'
import { isKeyEnterOrSpace } from 'utils/utils'

import { Food } from 'types/food'
import FoodModal from 'components/UI/FoodModal'

interface FoodCardItemProps {
  item: Food
}

export const FoodCardItem: React.FC<FoodCardItemProps> = ({ item }) => {
  const [isCardFocused, setIsCardFocused] = useState(false)
  const [isModalOpened, setIsModalOpened] = useState(false)

  const userId = useAppSelector(state => state.auth.user?.localId)
  const favouritesIds = useAppSelector(state => state.favourites.favouritesIds)
  const [updateFavourites] = useUpdateFavouritesMutation()

  const { enqueueSnackbar } = useSnackbar()

  const isItemFavourite = !!favouritesIds && favouritesIds.includes(item.id)

  const getAddToFavouriteSnackbarMessage = () =>
    isItemFavourite
      ? `${item.name}'s been removed from favourites`
      : `${item.name}'s been added to favorites`

  const pushNewFavourite = () =>
    favouritesIds ? [...favouritesIds, item.id] : [item.id]

  const updateFavouritesIds = () =>
    isItemFavourite
      ? favouritesIds.filter(id => id !== item.id)
      : pushNewFavourite()

  const toggleFavouriteHandler = async (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    event.stopPropagation()

    if (!userId) return

    try {
      await updateFavourites({
        userId,
        favouritesIds: updateFavouritesIds(),
      }).unwrap()
      enqueueSnackbar(getAddToFavouriteSnackbarMessage(), {
        variant: 'success',
      })
    } catch {
      enqueueSnackbar('Adding meal to favourite failed! Please try again', {
        variant: 'error',
      })
    }
  }

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
        {isCardFocused && (
          <div
            className="absolute w-9 h-9 bg-[#ff3259] text-white right-2 top-2 text-2xl flex items-center justify-center rounded-full transition-colors hover:bg-red-600"
            onClick={event => toggleFavouriteHandler(event)}
            onKeyDown={event =>
              isKeyEnterOrSpace(event.nativeEvent.code) &&
              toggleFavouriteHandler(event)
            }
            tabIndex={0}
            aria-label={
              isItemFavourite ? 'Remove from favourites' : 'Add to favourites'
            }
            role="button"
          >
            {isItemFavourite ? <MdFavorite /> : <MdFavoriteBorder />}
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
              name="Open modal"
              onBlur={() => setIsCardFocused(false)}
              onClick={event => {
                event.stopPropagation()
                setIsModalOpened(true)
              }}
              onKeyDown={event => {
                event.stopPropagation()
                setIsModalOpened(true)
              }}
              ariaLabel="Open modal with meal details"
            >
              <FaChevronRight />
            </Button>
          </div>
        </div>
      </Card>
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
