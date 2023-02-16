import React, { useState, type MouseEvent } from 'react'
import cn from 'classnames'
import s from './MultiDropdown.module.scss'


export type Option = {
  /** Ключ варианта, используется для отправки на бек/использования в коде */
  key: string;
  /** Значение варианта, отображается пользователю */
  value: string;
};

/** Пропсы, которые принимает компонент Dropdown */
export type MultiDropdownProps = {
  /** Массив возможных вариантов для выбора */
  options: Option[];
  /** Текущие выбранные значения поля, может быть пустым */
  value: Option[];
  /** Callback, вызываемый при выборе варианта */
  onChange: (value: Option[]) => void;
  /** Заблокирован ли дропдаун */
  disabled?: boolean;
  /** Преобразовать выбранные значения в строку. Отображается в дропдауне в качестве выбранного значения */
  pluralizeOptions: (value: Option[]) => string;
};

const getDropdownMenuHeight = (optionHeight: number, optionLength: number) => optionHeight * optionLength - 9

export const MultiDropdown: React.FC<MultiDropdownProps> = (props) => {
  const { disabled, onChange, options, value, pluralizeOptions } = props
  const [isOpen, setIsOpen] = useState(false)
  const activeItemsKeys = value.map(({ key }) => key)
  const dropdownMenuStyle = {
    height: isOpen && !disabled ? getDropdownMenuHeight(50, options.length) : 0
  }

  const isActive = (optionKey: string) => activeItemsKeys.includes(optionKey)

  const handleClick = (option: Option) => () => {
    if (disabled) return

    let activeOptions: Option[]
    if (isActive(option.key)) {
      activeOptions = value.filter((el) => el.key !== option.key)
    } else {
      activeOptions = [...value, option]
    }
    onChange(activeOptions)
  }

  return (
    <div className={cn(s['multi-dropdown'], 'multi-dropdown')}>
      <button
        className={cn(s.dropdown_toggle, {
          [s.focused]: isOpen
        })}
        id="multiDropdownMenuButton"
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {pluralizeOptions(value)}
      </button>
      {isOpen && !disabled &&
          <ul
              style={dropdownMenuStyle}
              className={s.dropdown_menu}
              role={'menuitem'}
              aria-expanded="false"
              aria-labelledby="multiDropdownMenuButton"
          >
            {options.map(({ key, value }) => (
              <li
                key={key}
                onClick={handleClick({ key, value })}
                className={cn(s.dropdown_menu_item, {
                  [s.dropdown_menu_item__active]: isActive(key)
                })}
              >
                {value}
              </li>
            ))}
          </ul>
      }
    </div>

  )
}
