import React from 'react'
import { FieldError, FieldErrors, UseFormRegister } from 'react-hook-form'
import {
    Form,
    Label,
    LabelProps,
    SemanticShorthandItem,
    SemanticWIDTHS,
} from 'semantic-ui-react'

// import './Input.scss'

interface InputProps {
    name: string
    register: UseFormRegister<any>
    minLength?: number
    maxLength?: number
    min?: number
    max?: number
    value?: any
    pattern?: RegExp
    type?: string
    label?: string
    required?: boolean
    errors?: FieldErrors
    rightLabel?: SemanticShorthandItem<LabelProps>
    disabled?: boolean
    valueAsNumber?: boolean
    validate?: (value: any) => string | boolean | Promise<any>
    width?: SemanticWIDTHS
}

const TextInputForm: React.FC<InputProps> = (props) => {
    const {
        name,
        type = 'text',
        label = 'Nema Labele',
        required = false,
        min = undefined,
        value = undefined,
        max = undefined,
        minLength = undefined,
        maxLength = undefined,
        pattern = undefined,
        width = undefined,
        disabled = undefined,
        valueAsNumber = undefined,
        rightLabel = undefined,
        validate = undefined,

        register,
        errors = {},
    } = props

    const labelPosition = rightLabel ? 'right' : undefined

    // const renderErrors = () => {
    //     if (!errors[name]) {
    //         return null
    //     }

    //     const error = errors[name] as FieldError
    //     const errorType = error.type

    //     let translationKey = 'errors.unknown'
    //     let translationParams = {}

    //     switch (errorType) {
    //         case 'required':
    //             translationKey = 'errors.required'
    //             translationParams = { error: label }
    //             break
    //         case 'pattern':
    //             translationKey = 'errors.pattern'
    //             translationParams = { error: label, pattern: pattern }
    //             break
    //         case 'max':
    //             translationKey = 'errors.max'
    //             translationParams = { error: label, max: max }
    //             break
    //         case 'min':
    //             translationKey = 'errors.min'
    //             translationParams = { error: label, max: max }
    //             break
    //         case 'minLength':
    //             translationKey = 'errors.minLength'
    //             translationParams = { error: label, minLength: minLength }
    //             break
    //         case 'maxLength':
    //             translationKey = 'errors.maxLength'
    //             translationParams = { error: label, maxLength: maxLength }
    //             break
    //         default:
    //             break
    //     }

    //     return {
    //         error: {
    //             pointing: 'above',
    //             content: <p>{t(translationKey, translationParams)}</p>,
    //         },
    //     }
    // }

    return (
        <Form.Field required={required} width={width} disabled={disabled}>
            <label>{label}</label>
            <Form.Input
                // placeholder={t(label)}
                label={rightLabel}
                labelPosition={labelPosition}
                type={type}
                min={min}
                max={max}
                valueAsNumber={valueAsNumber}
                minLength={minLength}
                maxLength={maxLength}
                value={value}>
                <input
                    {...register(name, {
                        required,
                        max,
                        min,
                        minLength,
                        maxLength,
                        validate,
                        pattern,
                    })}
                />
                {rightLabel && <Label right></Label>}
            </Form.Input>
        </Form.Field>
    )
}

export default TextInputForm
