import { useEffect } from 'react'
import { CSSTransition } from 'react-transition-group'

import FoodCardItem from 'components/FoodCardItem'
import Alert from 'components/UI/Alert'
import FoodCardSkeleton from 'components/UI/FoodCardSkeleton'
import NotFoundContent from 'components/UI/NotFoundContent'

import { useGetFoodsQuery } from 'api/food'

import { useLazyGetFavouritesQuery } from 'api/favourites'
import { useAppSelector } from 'hooks/store-hooks'

import { ReactComponent as NoFoodIcon } from 'assets/icons/no-food.svg'

export const Foods: React.FC = () => {
  const userId = useAppSelector(state => state.auth.user?.localId)

  const { data: foods, isSuccess, isError, isLoading } = useGetFoodsQuery()
  const [fetchFavourites] = useLazyGetFavouritesQuery()

  useEffect(() => {
    userId && fetchFavourites(userId)
  }, [userId, fetchFavourites])

  const areThereAnyFood = !!foods?.length

  const skeletonLoaders = (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 auto-rows-auto gap-8">
      {Array(12)
        .fill(0)
        .map((_, idx) => (
          <FoodCardSkeleton key={idx} />
        ))}
    </div>
  )

  const foodsContent = areThereAnyFood ? (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 auto-rows-auto gap-8">
      {foods.map(item => (
        <FoodCardItem item={item} key={item.id} />
      ))}
    </div>
  ) : (
    <NotFoundContent
      icon={<NoFoodIcon />}
      header="No meals available at this moment."
      secondaryText="We have to get our chefs to work..."
    />
  )

  return (
    <>
      <CSSTransition
        in={isError}
        timeout={{
          enter: 700,
          exit: 280,
        }}
        mountOnEnter
        unmountOnExit
        classNames={{
          enterActive: 'animate-slide-in',
          exitActive: 'animate-fade-out',
        }}
      >
        <Alert
          message="Failed to fetch the data. Try again later."
          type="danger"
        />
      </CSSTransition>
      <h2 className="text-xl font-semibold text-gray-900 mb-8">
        Available meals ({foods?.length || 0})
      </h2>
      {isLoading && skeletonLoaders}
      {isSuccess && foodsContent}
    </>
  )
}
