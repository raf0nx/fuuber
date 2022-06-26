import { MdFavoriteBorder, MdFavorite } from 'react-icons/md'
import { useSnackbar } from 'notistack'

import { useAppSelector } from 'hooks/store-hooks'
import { isKeyEnterOrSpace } from 'utils/utils'
import { useUpdateFavouritesMutation } from 'api/favourites'
import { Food } from 'types/food'

export const AddToFavourite: React.FC<{ item: Food }> = ({ item }) => {
  const userId = useAppSelector(state => state.auth.user?.localId)
  const [updateFavourites] = useUpdateFavouritesMutation()
  const { enqueueSnackbar } = useSnackbar()

  const favouritesIds = useAppSelector(state => state.favourites.favouritesIds)

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
  )
}
