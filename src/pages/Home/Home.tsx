import FoodCardItem from 'components/FoodCardItem'

import { useAppSelector } from 'hooks/store-hooks'
import { useGetFoodsQuery } from 'api/food'

import { ReactComponent as NoFoodIcon } from 'assets/icons/no-food.svg'

export const Home: React.FC = () => {
  const { user } = useAppSelector(state => state.auth)
  const { data: foods, isSuccess } = useGetFoodsQuery()

  return (
    <section className="container mx-auto p-4">
      <header className="mb-4">
        <h1 className="text-2xl text-gray-900 font-semibold mb-2">
          Welcome, {user?.displayName}!
        </h1>
        <p className="text-slate-500 font-medium mb-6">
          Choose a food category and order your favorite dish delivered to your
          door. You can find anything you fancy on React Food.
        </p>
        <hr />
      </header>
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
    </section>
  )
}
