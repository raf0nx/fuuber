import FoodCardItem from 'components/FoodCardItem'

import { useGetFoodsQuery } from 'api/food'

import { ReactComponent as NoFoodIcon } from 'assets/icons/no-food.svg'

export const Foods: React.FC = () => {
  const { data: foods, isSuccess } = useGetFoodsQuery()

  return (
    <>
      <h2 className="text-xl font-semibold text-gray-900 mb-8">
        Available meals ({foods?.length})
      </h2>
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
