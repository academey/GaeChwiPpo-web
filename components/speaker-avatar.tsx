import Image from "next/image"
import { cn } from "@/lib/utils"

interface SpeakerAvatarProps {
  src: string
  alt: string
  className?: string
  size?: "sm" | "md" | "lg" | "xl"
}

export function SpeakerAvatar({ src, alt, className, size = "md" }: SpeakerAvatarProps) {
  const sizeClasses = {
    sm: "h-10 w-10",
    md: "h-16 w-16",
    lg: "h-24 w-24",
    xl: "h-32 w-32",
  }

  // 기본 아바타 이미지 경로
  const defaultAvatar = "/speakers/default-avatar.png"

  // 이미지 소스가 없거나 유효하지 않은 경우 기본 아바타 사용
  const imageSrc = src && src !== "" ? src : defaultAvatar

  return (
    <div className={cn("relative overflow-hidden rounded-full bg-gray-100", sizeClasses[size], className)}>
      <Image
        src={imageSrc || "/placeholder.svg"}
        alt={alt}
        fill
        className="object-cover"
        sizes={`(max-width: 768px) 100vw, ${size === "xl" ? "256px" : size === "lg" ? "192px" : size === "md" ? "128px" : "80px"}`}
        priority={size === "xl" || size === "lg"}
      />
    </div>
  )
}
