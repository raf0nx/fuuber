import { CSSTransition } from 'react-transition-group'

import FoodCardItem from 'components/FoodCardItem'
import Alert from 'components/UI/Alert'
import FoodCardSkeleton from 'components/FoodCardSkeleton'

import { useGetFoodsQuery } from 'api/food'

import { ReactComponent as NoFoodIcon } from 'assets/icons/no-food.svg'

export const Foods: React.FC = () => {
  const { data: foods, isSuccess, isError, isLoading } = useGetFoodsQuery()

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
      {isLoading && (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 auto-rows-auto gap-8">
          {Array(12)
            .fill(0)
            .map(() => (
              <FoodCardSkeleton />
            ))}
        </div>
      )}
      {!!foods?.length && isSuccess && (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 auto-rows-auto gap-8">
          {foods.map(item => (
            <FoodCardItem item={item} key={item.id} />
          ))}
        </div>
      )}
      {!foods?.length && isSuccess && (
        <div className="flex flex-col items-center gap-4">
          <NoFoodIcon />
          <h2 className="text-xl text-center font-semibold text-gray-900 mt-4">
            No meals available at this moment.
          </h2>
          <p className="text-slate-500">We have to get our chefs to work...</p>
        </div>
      )}
    </>
  )
}
