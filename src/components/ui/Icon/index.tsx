interface IProps {
  name: string;
  width?: number;
  height?: number;
}

const Icon = ({name, width, height}: IProps) => (
  <svg className={`icon icon-${name}`} style={{width, height}}>
    <use xlinkHref={`/sprite.svg#icon-${name}`} />
  </svg>
);

export default Icon;
