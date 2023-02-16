import React from 'react'
import s from './CheckBox.module.scss'
import cn from 'classnames'

export type CheckBoxProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange'
> & {
  /** Вызывается при клике на чекбокс */
  onChange: (value: boolean) => void;
};

export const CheckBox: React.FC<CheckBoxProps> = ({ onChange, ...props }) => (
  <label className={cn(s.checkbox)}>
    <input
      type="checkbox"
      {...props}
      onChange={(e) => onChange(e.target.checked)}
    />
    <span className={cn(s.checkmark, 'checkbox')}></span>
  </label>

)
