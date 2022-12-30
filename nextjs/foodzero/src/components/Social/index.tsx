import React, { memo } from 'react'
import Image, { ImageProps } from 'next/image'
import Link from 'next/link'

interface SocialProps extends ImageProps {
  link: string
}

const Social = ({ link, width = 28, height = 28, ...rest }: SocialProps) => {
  return (
    <Link href={link} prefetch={false}>
      <Image width={width} height={height} {...rest} />
    </Link>
  )
}

export default memo(Social)
