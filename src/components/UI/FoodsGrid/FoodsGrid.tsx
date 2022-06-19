import FoodCardItem from 'components/FoodCardItem'
import ResponsiveGrid from '../ResponsiveGrid'

import { Food } from 'types/food'

interface FoodsGridProps {
  foods: Food[]
}

export const FoodsGrid: React.FC<FoodsGridProps> = ({ foods }) => (
  <ResponsiveGrid>
    {foods.map(item => (
      <FoodCardItem item={item} key={item.id} />
    ))}
  </ResponsiveGrid>
)
