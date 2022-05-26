import { useHistory } from 'react-router-dom'

import Button from 'components/UI/Button'

import { useAppDispatch, useAppSelector } from 'hooks/store-hooks'
import { logout } from 'store/slices/auth'

export const Home: React.FC = () => {
  const { user } = useAppSelector(state => state.auth)
  const dispatch = useAppDispatch()

  const history = useHistory()

  const logoutHandler = () => {
    dispatch(logout())
    history.replace('/auth')
  }

  return (
    <section>
      <div>Welcome home!</div>
      <div>{user?.displayName}</div>
      <Button category="primary" onClick={logoutHandler}>
        Logout
      </Button>
    </section>
  )
}
