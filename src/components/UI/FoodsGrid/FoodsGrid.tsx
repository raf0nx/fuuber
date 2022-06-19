import FoodCardItem from 'components/FoodCardItem'
import { Food } from 'types/food'

interface FoodsGridProps {
  foods: Food[]
}

export const FoodsGrid: React.FC<FoodsGridProps> = ({ foods }) => (
  <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 auto-rows-auto gap-8">
    {foods.map(item => (
      <FoodCardItem item={item} key={item.id} />
    ))}
  </div>
)
