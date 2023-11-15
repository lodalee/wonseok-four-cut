import React from "react";

interface IconProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: React.MouseEventHandler<HTMLImageElement>;
}

const Icon: React.FC<IconProps> = ({ src, alt, className, style, onClick }) => {
  return <img src={src} alt={alt} className={className} style={style} onClick={onClick} />;
};

export default Icon;
