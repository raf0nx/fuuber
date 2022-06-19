interface NotFoundContentProps {
  icon?: JSX.Element
  header: string
  secondaryText?: string
}

export const NotFoundContent: React.FC<NotFoundContentProps> = ({
  icon,
  header,
  secondaryText,
}) => (
  <div className="flex flex-col items-center gap-4">
    {icon && icon}
    <h2 className="text-xl text-center font-semibold text-gray-900 mt-4">
      {header}
    </h2>
    {secondaryText && <p className="text-slate-500">{secondaryText}</p>}
  </div>
)
