import React, { ButtonHTMLAttributes, DetailedHTMLProps } from 'react'
import s from './XButton.module.css'

type DefaultButtonPropsType = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>

type XButtonPropsType = DefaultButtonPropsType & {
  xType?: string
}

const SuperButton: React.FC<XButtonPropsType> = ({
  xType,
  className,
  disabled,
  ...restProps
}) => {
  const finalClassName = s.button
  // +
  // (disabled
  //   ? ` ${s.disabled} `
  //   : xType === 'red'
  //   ? ` ${s.red} `
  //   : xType === 'secondary'
  //   ? ` ${s.secondary} `
  //   : ` ${s.default} `) +
  // (className ? ' ' + className : '')

  return (
    <button disabled={disabled} className={finalClassName} {...restProps} />
  )
}

export default SuperButton
