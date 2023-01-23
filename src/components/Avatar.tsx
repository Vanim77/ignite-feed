import styles from './Avatar.module.css'

interface AvatarProps {
  hasBorder?: boolean,
  src: string,
  alt?: string
}

export function Avatar({ hasBorder = true, ...props }: AvatarProps) {
  return (
    <img
      {...props}
      className={ hasBorder ? styles.avatarWithBorder : styles.avatar }
    />
  );
}
