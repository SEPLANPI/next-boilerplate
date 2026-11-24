import React, { PropsWithChildren } from "react"
import Image from "next/image"
import { cn } from "@/utils"

interface CenteredFormLayoutRootProps extends PropsWithChildren {
  backgroundImage?: string
  className?: string
}

function CenteredFormLayoutRoot({
  children,
  backgroundImage,
  className = "",
}: CenteredFormLayoutRootProps) {
  return (
    <div
      className={cn(
        "relative flex min-h-[100dvh] w-full justify-center bg-gray-50 p-4",
        className,
      )}
    >
      {backgroundImage && (
        <div className="fixed left-0 top-0 z-0 h-[100dvh] w-full">
          <Image
            src={backgroundImage}
            fill
            sizes="100vw"
            quality={100}
            alt="Background"
            className="object-cover"
          />
        </div>
      )}

      <div className="relative z-10 flex w-full max-w-[672px] flex-col space-y-4 sm:mt-16">
        {children}
      </div>
    </div>
  )
}

interface CenteredFormLayoutHeaderImageProps {
  src?: string
  alt?: string
  className?: string
}

function CenteredFormLayoutHeaderImage({
  src = "/form-header.png",
  alt = "Header",
  className = "",
}: CenteredFormLayoutHeaderImageProps) {
  return (
    <Image
      src={src}
      className={`w-full ${className}`}
      alt={alt}
      quality={100}
      width={1350}
      height={144}
    />
  )
}

interface CenteredFormLayoutContentProps extends PropsWithChildren {
  title?: string
  description?: string
  className?: string
}

function CenteredFormLayoutContent({
  children,
  title,
  description,
  className = "",
}: CenteredFormLayoutContentProps) {
  return (
    <div
      className={`flex flex-col space-y-4 rounded-md bg-white p-6 shadow-md ${className}`}
    >
      {title && (
        <h1 className="text-xl font-semibold text-content-emphasis">{title}</h1>
      )}
      {description && <p className="">{description}</p>}
      {children}
    </div>
  )
}

interface CenteredFormLayoutHeaderProps extends PropsWithChildren {
  className?: string
}

function CenteredFormLayoutHeader({
  children,
  className = "",
}: CenteredFormLayoutHeaderProps) {
  return (
    <>
      <div
        className={`flex flex-col space-y-4 rounded-md bg-white p-6 shadow-md ${className}`}
      >
        {children}
      </div>
    </>
  )
}

interface CenteredFormLayoutTitleProps extends PropsWithChildren {
  className?: string
}

function CenteredFormLayoutTitle({
  children,
  className = "",
}: CenteredFormLayoutTitleProps) {
  return (
    <h1 className={`text-xl font-semibold text-content-emphasis ${className}`}>
      {children}
    </h1>
  )
}

// Description component
interface CenteredFormLayoutDescriptionProps extends PropsWithChildren {
  className?: string
}

function CenteredFormLayoutDescription({
  children,
  className = "",
}: CenteredFormLayoutDescriptionProps) {
  return <p className={className}>{children}</p>
}

export const CenteredFormLayout = {
  Root: CenteredFormLayoutRoot,
  HeaderImage: CenteredFormLayoutHeaderImage,
  Header: CenteredFormLayoutHeader,
  Title: CenteredFormLayoutTitle,
  Description: CenteredFormLayoutDescription,
  Content: CenteredFormLayoutContent,
}

export {
  CenteredFormLayoutRoot,
  CenteredFormLayoutHeaderImage,
  CenteredFormLayoutHeader,
  CenteredFormLayoutTitle,
  CenteredFormLayoutDescription,
  CenteredFormLayoutContent,
}

export type {
  CenteredFormLayoutRootProps,
  CenteredFormLayoutHeaderImageProps,
  CenteredFormLayoutHeaderProps,
  CenteredFormLayoutTitleProps,
  CenteredFormLayoutDescriptionProps,
  CenteredFormLayoutContentProps,
}
