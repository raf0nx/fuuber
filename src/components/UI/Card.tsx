interface CardProps {
  title: string
  className?: string
  subtitle?: string
  actions?: JSX.Element
  actionsClasses?: string
}

const Card: React.FC<CardProps> = ({
  children,
  title,
  className,
  subtitle,
  actions,
  actionsClasses,
}) => {
  return (
    <div
      className={`bg-white p-6 rounded shadow-md shadow-white ${
        className || ''
      }`}
    >
      <h1 className="text-2xl antialiased font-bold text-gray-800 mb-2">
        {title}
      </h1>
      {subtitle && <h2 className="text-sm opacity-60">{subtitle}</h2>}
      {children && <div className="my-8">{children}</div>}
      {actions && <div className={actionsClasses || ''}>{actions}</div>}
    </div>
  )
}

export default Card
