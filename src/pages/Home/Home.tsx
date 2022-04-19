import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import Button from '../../components/UI/Button/Button'
import { useAppDispatch, useAppSelector } from '../../hooks/store-hooks'
import { logout } from '../../store/auth'

import { useLazyGetUserDataQuery } from '../../api/auth'

const Home: React.FC = () => {
  const { idToken, user } = useAppSelector(state => state.auth)
  const dispatch = useAppDispatch()

  const [triggerGetUserData] = useLazyGetUserDataQuery()

  const navigate = useNavigate()

  useEffect(() => {
    idToken && user?.incompleteData && triggerGetUserData(idToken)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idToken])

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

export default Home
