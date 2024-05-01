export interface IconProps {
  name: string;
  width?: number;
  height?: number;
}

const Icon = ({name, width, height}: IconProps) => (
  <svg className={`icon icon-${name}`} style={{width, height}}>
    <use xlinkHref={`/sprite.svg#icon-${name}`} />
  </svg>
);

export default Icon;
