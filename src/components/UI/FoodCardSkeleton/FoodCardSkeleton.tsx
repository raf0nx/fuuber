export const FoodCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-md">
      <div className="animate-pulse flex flex-col">
        <div className="bg-slate-200 rounded-t w-full h-60" />
        <div className="flex flex-col p-4">
          <div className="h-5 bg-slate-200 rounded mb-4 w-9/12" />
          <div className="h-3 bg-slate-200 rounded mb-2" />
          <div className="h-3 bg-slate-200 rounded mb-2" />
          <div className="h-3 bg-slate-200 rounded w-6/12 mb-2" />
          <hr className="my-4" />
          <div className="flex items-center justify-between">
            <div className="h-9 w-20 bg-slate-200 rounded" />
            <div className="h-9 w-14 bg-slate-200 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  )
}
