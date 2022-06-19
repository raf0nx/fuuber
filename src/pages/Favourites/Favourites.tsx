import FoodCardItem from 'components/FoodCardItem'
import { useAppSelector } from 'hooks/store-hooks'

export const Favourites: React.FC = () => {
  const favouritesIds = useAppSelector(state => state.favourites.favouritesIds)
  const availableMeals = useAppSelector(state => state.food.availableMeals)

  const favouritesCount = favouritesIds?.length
  const favouriteMeals = favouritesIds
    ? availableMeals?.filter(meal => favouritesIds.includes(meal.id))
    : []

  return (
    <section className="container mx-auto p-4">
      <header className="mb-4">
        <h1 className="text-2xl text-gray-900 font-semibold mb-2">
          Favourites ({favouritesCount || 0})
        </h1>
        <p className="text-slate-500 font-medium mb-6">
          Here you can find a list with all of your favourite meals
        </p>
        <hr />
      </header>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 auto-rows-auto gap-8">
        {favouriteMeals?.map(item => (
          <FoodCardItem item={item} key={item.id} />
        ))}
      </div>
    </section>
  )
}
