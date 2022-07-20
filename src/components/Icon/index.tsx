import classNames from "classnames"
interface Props {
  type: string,
  className?: string,
  onClick?: () => void,
}
export const Icon: React.FC<Props> = ({ type, className,onClick }) => {
  return (
    <svg className={classNames("icon", className)} aria-hidden="true" onClick={onClick}>
      {/* 使用时，只需要将此处的 iconbtn_like_sel 替换为 icon 的名称即可*/}
      <use xlinkHref={`#${type}`}></use>
    </svg>
  )
}
