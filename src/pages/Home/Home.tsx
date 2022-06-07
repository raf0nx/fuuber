import { useAppSelector } from 'hooks/store-hooks'

import FoodCardItem from 'components/FoodCardItem'

const MOCKED_FOOD = [
  {
    id: 1,
    name: 'Choco Sundae',
    price: 29.99,
    description: 'Choco Sundae Cup (100 ml)',
    img: 'https://api.pizzahut.io/v1/content/en-in/in-1/images/dessert/choco-sundae.e0d29fd156012e251c099c2771219d18.1.jpg?width=800',
    quantity: 1,
  },
  {
    id: 2,
    name: 'Cornetto Double Chocolate',
    price: 38.99,
    description: 'Cornetto Double Chocolate Cone (105 ml)',
    img: 'https://api.pizzahut.io/v1/content/en-in/in-1/images/dessert/cornetto-double-chocolate.acc21849ac732f2f85998ad73e532d40.1.jpg?width=522',
    quantity: 1,
  },
  {
    id: 3,
    name: 'Magnum Truffle',
    price: 76.99,
    description: 'Magnum Truffle (80 ml)',
    img: 'https://api.pizzahut.io/v1/content/en-in/in-1/images/dessert/magnum-truffle.e300005ba1d8c15aafe824c1fa3b41ea.1.jpg?width=522',
    quantity: 1,
  },
  {
    id: 4,
    name: 'Divine Chocolate(Tub)',
    price: 209.99,
    description: 'Divine Chocolate (700 ml)',
    img: 'https://api.pizzahut.io/v1/content/en-in/in-1/images/dessert/divine-chocolate-tub.1df6b11e6e5d510cd11ae0d6e475686d.1.jpg?width=522',
    quantity: 1,
  },
  {
    id: 5,
    name: 'Choco Volcano Cake',
    price: 99.99,
    description: 'Choco Delight With A Gooey Chocolate Volcano Centre',
    img: 'https://api.pizzahut.io/v1/content/en-in/in-1/images/dessert/choco-volcano-cake.dd9f24941b09268c73c073494d54480d.1.jpg?width=522',
    quantity: 1,
  },
  {
    id: 6,
    name: 'Very long name just to test ellipsis',
    price: 113.99,
    description:
      'Choco Delight With A Gooey Chocolate Volcano Centre. Lorem ipsum sit amet, sed diam non et justo ut aliquet.',
    img: 'https://wallpaperaccess.com/full/1312727.jpg',
    quantity: 1,
  },
]

export const Home: React.FC = () => {
  const { user } = useAppSelector(state => state.auth)

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
        Available meals ({MOCKED_FOOD.length})
      </h2>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 auto-rows-auto gap-8">
        {MOCKED_FOOD.map(item => (
          <FoodCardItem item={item} key={item.id} />
        ))}
      </div>
    </section>
  )
}
