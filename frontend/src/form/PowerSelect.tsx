import React from 'react'
import { Control, Controller, FieldErrors } from 'react-hook-form'
import { DropdownItemProps, Form, SemanticWIDTHS } from 'semantic-ui-react'

interface InputProps {
    name: string
    control: Control<any>
    minLength?: number
    maxLength?: number
    min?: number
    max?: number
    pattern?: RegExp
    type?: string
    placeholder?: string
    label?: string
    required?: boolean
    errors?: FieldErrors
    width?: SemanticWIDTHS
    disabled?: boolean
    fluid?: boolean
    clearable?: boolean
    options: DropdownItemProps[]
}

const PowerSelect: React.FC<InputProps> = (props) => {
    const {
        control,
        errors,
        name,
        label,
        width,
        fluid,
        options,
        placeholder,
        clearable,
        disabled,
        required = false,
    } = props

    return (
        <Controller
            control={control}
            name={name}
            rules={{ required: required }}
            render={({ field }) => {
                return (
                    <Form.Dropdown
                        clearable={clearable}
                        search
                        selection
                        disabled={disabled}
                        placeholder={placeholder}
                        required={required}
                        label={label}
                        value={field.value}
                        onChange={(event, value) => field.onChange(value.value)}
                        options={options}
                        width={width}
                        fluid={fluid}
                        error={
                            errors?.[name] && {
                                pointing: 'above',
                                content: <p>{label} has issues</p>,
                            }
                        }
                    />
                )
            }}
        ></Controller>
    )
}

export default PowerSelect
