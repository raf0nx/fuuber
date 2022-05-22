interface CardProps {
  title: string
  classes?: string
  subtitle?: string
  actions?: JSX.Element
  actionsClasses?: string
}

export const Card: React.FC<CardProps> = ({
  children,
  title,
  classes = '',
  subtitle,
  actions,
  actionsClasses = '',
}) => {
  return (
    <div
      className={`bg-white p-6 rounded-lg border border-gray-200 shadow-md ${classes}`}
    >
      <h1 className="text-2xl antialiased font-bold text-gray-900 mb-2">
        {title}
      </h1>
      {subtitle && <h2 className="text-sm opacity-60">{subtitle}</h2>}
      {children && <div className="my-8">{children}</div>}
      {actions && <div className={actionsClasses}>{actions}</div>}
    </div>
  )
}
