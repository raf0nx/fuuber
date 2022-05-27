import { useAppSelector } from 'hooks/store-hooks'

export const Home: React.FC = () => {
  const { user } = useAppSelector(state => state.auth)

  return (
    <section>
      <div>Welcome home!</div>
      <div>{user?.displayName}</div>
    </section>
  )
}
