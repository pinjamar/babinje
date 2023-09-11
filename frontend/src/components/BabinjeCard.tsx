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

const logo = new URL('../images/baby-logo.jpg', import.meta.url);

interface Props {
  data: BabinjeItem;
}

const BabinjeCard: React.FC<Props> = (props) => {
  const item = props.data;

  const [open, setOpen] = useState(false);
  const [release, setRelease] = useState(false);

  return (
    <Card>
      <Card.Content>
        <Image
          floated="right"
          size="mini"
          src={logo}
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
              <Form id="form" onSubmit={alert()}>
                <Form.Field>
                  <label>Name</label>
                  <input placeholder="First Name" />
                </Form.Field>
                <Form.Field>
                  <label>Email</label>
                  <input placeholder="Last Name" />
                </Form.Field>
                {/* <Button type="submit">Submit</Button> */}
              </Form>
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
            open={release}
            trigger={
              <Button basic color="red">
                Otpusti
              </Button>
            }
            onClose={() => setRelease(false)}
            onOpen={() => setRelease(true)}
          >
            <Header icon="archive" content="Archive Old Messages" />
            <Modal.Content>
              <p>Ne razumin točno šta ovaj botun triba radit?</p>
            </Modal.Content>
            <Modal.Actions>
              <Button color="red" onClick={() => setRelease(false)}>
                <Icon name="remove" /> No
              </Button>
              <Button color="green" onClick={() => setRelease(false)}>
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
