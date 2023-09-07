import React, { useState } from 'react';
import { BabinjeItem } from '../Models';
import { Card, Button, Image, Modal, Header, Icon } from 'semantic-ui-react';

interface Props {
  data: BabinjeItem;
}

const BabinjeCard: React.FC<Props> = (props) => {
  const item = props.data;
  const reserve = () => {
    const [open, setOpen] = useState(false);

    return (
      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={<Button>Rezerviraj</Button>}
      >
        <Modal.Header>Želite li rezervirati ovaj proizvod?</Modal.Header>
        <Modal.Content image>
          {/* <Image
            size="medium"
            src="https://react.semantic-ui.com/images/avatar/large/rachel.png"
            wrapped
          /> */}
          <p>Ovde ide link proizvoda iz baze</p>
          <Modal.Description>
            <Header>Ovde ide name proizvoda iz baze</Header>
            <p>Ovde ide desc proizvoda iz baze</p>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button color="black" onClick={() => setOpen(false)}>
            Neeću, falija san
          </Button>
          <Button
            content="Da, potvrdi!"
            labelPosition="right"
            icon="checkmark"
            onClick={() => setOpen(false)}
            positive
          />
        </Modal.Actions>
      </Modal>
    );
  };
  const free = () => {
    const [open, setOpen] = useState(false);

    return (
      <Modal
        closeIcon
        open={open}
        trigger={<Button>Show Modal</Button>}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
      >
        <Header icon="archive" content="Archive Old Messages" />
        <Modal.Content>
          <p>Ne razumin točno šta ovaj botun triba radit?</p>
        </Modal.Content>
        <Modal.Actions>
          <Button color="red" onClick={() => setOpen(false)}>
            <Icon name="remove" /> No
          </Button>
          <Button color="green" onClick={() => setOpen(false)}>
            <Icon name="checkmark" /> Yes
          </Button>
        </Modal.Actions>
      </Modal>
    );
  };
  return (
    <Card>
      <Card.Content>
        <Image
          floated="right"
          size="mini"
          src="/images/avatar/large/molly.png"
        />
        <Card.Header>{item.name}</Card.Header>
        <Card.Meta>{item.isBought ? 'Kupljeno' : 'Slobodno'}</Card.Meta>
        <Card.Description>
          {item.link ? (
            <>
              <a href={item.link}>Link</a> - {item.desc}
            </>
          ) : (
            <div>{item.desc}</div>
          )}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className="ui two buttons">
          <Button
            basic
            color="green"
            // disabled={!!item.user}
            onClick={reserve}
          >
            Rezerviraj
          </Button>
          <Button basic color="red" disabled={!item.user} onClick={free}>
            Oslobodi
          </Button>
        </div>
      </Card.Content>
    </Card>
  );
};

export default BabinjeCard;
