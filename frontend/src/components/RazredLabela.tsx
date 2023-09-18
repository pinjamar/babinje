import React from 'react'
import { Label, SemanticCOLORS } from 'semantic-ui-react'

const RazredLabela: React.FC<{ grade?: string }> = (props) => {
    const { grade } = props

    let color: SemanticCOLORS = 'green'

    if (grade === 'A') {
        color = 'green'
    } else if (grade === 'B') {
        color = 'olive'
    } else if (grade === 'C') {
        color = 'yellow'
    } else if (grade === 'D') {
        color = 'orange'
    } else if (grade === 'F') {
        color = 'red'
    } else {
        color = 'grey'
    }

    return <Label color={color}>{grade ?? '?'}</Label>
}

export default RazredLabela
