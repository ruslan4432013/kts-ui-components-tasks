import React from 'react'
import s from './Button.module.scss'
import cn from 'classnames'
import { Loader, LoaderSize } from '../Loader/Loader'

export type ButtonProps = React.PropsWithChildren<{
  /**
   * Если true, то внутри кнопки вместе с children отображается компонент Loader
   * Также кнопка должна переходить в состояние disabled
   */
  loading?: boolean;
}> & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<ButtonProps> = (props) => {
  const {loading, className,  children, disabled, ...other} = props
  return (
    <button
      className={cn(className, s.button, 'button', {
        [s.button_disabled]: loading || disabled,
        [s.button_load]: loading,
      })}
      disabled={disabled || loading}
      {...other}
    >
      {loading && <Loader className={s.loader} loading={loading} size={LoaderSize.s}/>}
      {children}
    </button>
  )
};
