import { useNavigate } from 'react-router-dom'

import Button from '../../components/UI/Button'

import { useAppDispatch, useAppSelector } from '../../hooks/store-hooks'
import { logout } from '../../store/slices/auth'

export const Home: React.FC = () => {
  const { user } = useAppSelector(state => state.auth)
  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const logoutHandler = () => {
    dispatch(logout())
    navigate('/auth', { replace: true })
  }

  return (
    <>
      <div>Welcome home!</div>
      <div>{user?.displayName}</div>
      <Button category="primary" onClick={logoutHandler}>
        Logout
      </Button>
    </>
  )
}
