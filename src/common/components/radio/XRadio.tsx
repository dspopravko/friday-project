import React, {ChangeEvent, InputHTMLAttributes, DetailedHTMLProps, HTMLAttributes} from 'react'
import s from './XRadio.module.css'

export type arrType = {
    id: number
    value: string
}

type DefaultRadioPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
type DefaultSpanPropsType = DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>

type SuperRadioPropsType = Omit<DefaultRadioPropsType, 'type'> & {
    options?: arrType[]
    onChangeOption?: (option: number) => void
    spanProps?: DefaultSpanPropsType
}

const SuperRadio: React.FC<SuperRadioPropsType> = ({
                                                       id,
                                                       name,
                                                       className,
                                                       options,
                                                       value,
                                                       onChange,
                                                       onChangeOption,
                                                       spanProps,
                                                       ...restProps
                                                   }) => {
    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) =>
        onChangeOption && onChangeOption(+e.currentTarget.value)

    const finalRadioClassName = [s.radio, className].join(' ')
    const spanClassName = [s.span, spanProps?.className].join(' ')

    const mappedOptions: any[] = options
        ? options.map((o) => (
            <label key={name + '-' + o.id} className={s.label}>
                <input
                    id={id + '-input-' + o.id}
                    className={finalRadioClassName}
                    type={'radio'}
                    name={name}
                    checked={o.id === value}
                    value={o.id}
                    onChange={onChangeCallback}
                    {...restProps}
                />
                <span
                    id={id + '-span-' + o.id}
                    {...spanProps}
                    className={spanClassName}
                >
                      {o.value}
                  </span>
            </label>
        ))
        : []

    return <div className={s.options}>{mappedOptions}</div>
}

export default SuperRadio
