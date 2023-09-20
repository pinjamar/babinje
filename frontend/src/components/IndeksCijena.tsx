import React, { useState } from 'react'
import { Label, Segment, SegmentProps } from 'semantic-ui-react'
import './IndeksCijena.scss'

interface Props extends SegmentProps {
    onSelect?(grade: string | null)
}

const IndeksCijena: React.FC<Props> = (props) => {
    const { onSelect, ...rest } = props

    const [grade, setGrade] = useState<string | null>(null)

    const onLabelClick = (newGrade) => {
        let result = newGrade
        if (newGrade === grade) {
            result = null
        }
        setGrade(result)
        onSelect?.(result)
    }

    return (
        <Segment
            {...rest}
            className='indeks-cijena'
            basic
            textAlign='center'
            style={{ marginTop: '1.5em' }}>
            <Label
                style={{
                    cursor: 'pointer',
                    opacity: grade && grade !== 'A' ? 0.33 : 1,
                }}
                onClick={() => onLabelClick('A')}
                color='green'>
                A - manje od 20€
            </Label>
            <Label
                style={{
                    cursor: 'pointer',
                    opacity: grade && grade !== 'B' ? 0.33 : 1,
                }}
                onClick={() => onLabelClick('B')}
                color='olive'>
                B - do 50 €{' '}
            </Label>
            <Label
                style={{
                    cursor: 'pointer',
                    opacity: grade && grade !== 'C' ? 0.33 : 1,
                }}
                onClick={() => onLabelClick('C')}
                color='yellow'>
                C - do 100 €
            </Label>
            <Label
                style={{
                    cursor: 'pointer',
                    opacity: grade && grade !== 'D' ? 0.33 : 1,
                }}
                onClick={() => onLabelClick('D')}
                color='orange'>
                D - do 150 €{' '}
            </Label>
            <Label
                style={{
                    cursor: 'pointer',
                    opacity: grade && grade !== 'F' ? 0.33 : 1,
                }}
                onClick={() => onLabelClick('F')}
                color='red'>
                F - preko 150€
            </Label>
        </Segment>
    )
}

export default IndeksCijena
