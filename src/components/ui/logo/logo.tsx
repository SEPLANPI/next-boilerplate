import Image from 'next/image'

export function Logo() {
  return (
    <Image
      src="/logo/vertical/verde-verde.png"
      alt="Logo"
      className="w-32"
      width={300}
      height={80}
      priority
      quality={100}
    />
  )
}
