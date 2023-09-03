import React from "react";
import { BabinjeItem } from "../Models";
import { Card, Button, Image } from "semantic-ui-react";

interface Props {
    data: BabinjeItem
}

const BabinjeCard: React.FC<Props> = (props) => {
    const item = props.data;
    return <Card>
        <Card.Content>
            <Image
            floated='right'
            size='mini'
            src='/images/avatar/large/molly.png'
            />
            <Card.Header>{item.name}</Card.Header>
            <Card.Meta>{item.isBought ? "Kupljeno" : "Slobodno"}</Card.Meta>
            <Card.Description>
                {item.link ? <><a href={item.link}>Link</a> - {item.desc}</> : <div>{item.desc}</div>}  
            </Card.Description>
        </Card.Content>
        <Card.Content extra>
            <div className='ui two buttons'>
            <Button basic color='green' disabled={!!item.user}>
                Rezerviraj
            </Button>
            <Button basic color='red' disabled={!item.user}>
                Oslobodi
            </Button>
            </div>
      </Card.Content>

    </Card>
}

export default BabinjeCard;