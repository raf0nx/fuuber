export const ResponsiveGrid: React.FC = ({ children }) => (
  <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 auto-rows-auto gap-8">
    {children}
  </div>
)
