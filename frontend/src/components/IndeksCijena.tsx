import React from 'react'
import { Label, Segment, SegmentProps } from 'semantic-ui-react'

const IndeksCijena: React.FC<SegmentProps> = (props) => {
    return (
        <Segment
            {...props}
            basic
            textAlign='center'
            style={{ marginTop: '1.5em' }}>
            <Label color='green'>A - manje od 20€</Label>
            <Label color='olive'>B - do 50 € </Label>
            <Label color='yellow'>C - do 100 €</Label>
            <Label color='orange'>D - do 150 € </Label>
            <Label color='red'>F - preko 150€</Label>
        </Segment>
    )
}

export default IndeksCijena
