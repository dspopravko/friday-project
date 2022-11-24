import React, {SelectHTMLAttributes, DetailedHTMLProps, ChangeEvent} from 'react'
import s from './XSelect.module.css'

export type arrType = {
    id: number
    value: string
}

type DefaultSelectPropsType = DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>

type SuperSelectPropsType = DefaultSelectPropsType & {
    options?: arrType[]
    onChangeOption?: (option: number) => void
}

const XSelect: React.FC<SuperSelectPropsType> = ({
                                                     options,
                                                     className,
                                                     onChange,
                                                     onChangeOption,
                                                     ...restProps
                                                     }) => {
    const mappedOptions: any[] = options
        ? options.map((o) => (
            <option
                id={'hw7-option-' + o.id}
                className={s.option}
                key={o.id}
                value={o.id}
            >
                {o.value}
            </option>
        )) : []

    const onChangeCallback = (e: ChangeEvent<HTMLSelectElement>) =>
        onChangeOption && onChangeOption(++e.currentTarget.options.selectedIndex)

    const finalSelectClassName = [s.select, className].join(' ')

    return (
        <select
            className={finalSelectClassName}
            onChange={onChangeCallback}
            {...restProps}
        >
            {mappedOptions}
        </select>
    )
}

export default XSelect
