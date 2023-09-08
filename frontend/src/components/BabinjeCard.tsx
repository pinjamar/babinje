import React, { useState } from 'react';
import { BabinjeItem } from '../Models';
import {
  Card,
  Button,
  Image,
  Modal,
  Header,
  Icon,
  Form,
} from 'semantic-ui-react';

interface Props {
  data: BabinjeItem;
}

const BabinjeCard: React.FC<Props> = (props) => {
  const item = props.data;

  const [open, setOpen] = useState(false);

  const FormExampleForm = () => (
    <Form>
      <Form.Field>
        <label>First Name</label>
        <input placeholder="First Name" />
      </Form.Field>
      <Form.Field>
        <label>Last Name</label>
        <input placeholder="Last Name" />
      </Form.Field>
      <Button type="submit">Submit</Button>
    </Form>
  );

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
          <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={
              <Button basic color="green">
                Rezerviraj
              </Button>
            }
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
          <Modal
            closeIcon
            open={open}
            trigger={
              <Button basic color="red">
                Otpusti
              </Button>
            }
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
        </div>
      </Card.Content>
    </Card>
  );
};

export default BabinjeCard;
