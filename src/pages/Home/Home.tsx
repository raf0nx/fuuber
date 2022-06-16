import { useEffect } from 'react'

import Foods from 'components/Foods'

import { useAppSelector } from 'hooks/store-hooks'
import { useLazyGetFavouritesQuery } from 'api/favourites'

export const Home: React.FC = () => {
  const { user } = useAppSelector(state => state.auth)
  const [trigger] = useLazyGetFavouritesQuery()

  useEffect(() => {
    user && trigger(user.localId)
  }, [user, trigger])

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
      <Foods />
    </section>
  )
}
