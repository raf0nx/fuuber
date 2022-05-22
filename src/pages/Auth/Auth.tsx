import AuthForm from '../../components/AuthForm'

import authBackground from '../../assets/auth-background.webp'

export const Auth: React.FC = () => {
  return (
    <section className="w-full h-full flex justify-evenly items-center">
      <div
        className="absolute bg-repeat h-full w-full -z-10"
        style={{
          backgroundImage: `url(${authBackground})`,
        }}
      />
      <AuthForm />
    </section>
  )
}
