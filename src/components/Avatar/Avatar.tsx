import { ReactComponent as AvatarPlaceholder } from '../../assets/icons/avatar-placeholder.svg'

interface AvatarProps {
  imageUrl?: string
}

export const Avatar: React.FC<AvatarProps> = ({ imageUrl }) => {
  return (
    <>
      {imageUrl && (
        <img
          className="w-8 h-8 rounded-full ring-2 ring-gray-300 cursor-pointer"
          src={imageUrl}
          alt="User avatar"
        />
      )}
      {!imageUrl && (
        <div className="relative w-8 h-8 overflow-hidden bg-gray-100 ring-2 ring-gray-300 rounded-full cursor-pointer">
          <div className="absolute w-10 h-10 text-gray-400 -left-1">
            <AvatarPlaceholder />
          </div>
        </div>
      )}
    </>
  )
}
