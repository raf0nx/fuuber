import AuthForm from '../../components/AuthForm/AuthForm'

import authBackground from '../../assets/auth-background.webp'

const Auth: React.FC = () => {
  return (
    <section className="w-full h-full flex justify-evenly items-center">
      <img
        className="absolute -z-10 bg-center object-cover h-full w-full"
        src={authBackground}
        alt="Food nicely presented"
      />
      <div />
      <AuthForm />
    </section>
  )
}

export default Auth
