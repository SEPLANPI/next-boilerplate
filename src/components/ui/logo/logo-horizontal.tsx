import Image from 'next/image'

export function LogoHorizontal() {
  return (
    <Image
      src="/logo/horizontal/verde-verde.png"
      alt="Logo"
      className="h-10 w-auto"
      width={300}
      height={80}
      priority
      quality={100}
    />
  )
}
