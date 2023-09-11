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
  FormProps,
  Input,
} from 'semantic-ui-react';

const logo = new URL('../images/baby-logo.jpg', import.meta.url);

interface result {
  name: string;
  desc: string;
  link: string;
}

interface Props {
  data: BabinjeItem;
  isOpen: boolean;
  onClose(): void;
  onSubmit?(n: result): void;
}

const BabinjeCard: React.FC<Props> = (props) => {
  const item = props.data;

  const [open, setOpen] = useState(false);
  const [release, setRelease] = useState(false);

  const onCreate = (e: any, data: FormProps) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    props.onSubmit?.(Object.fromEntries(formData.entries()) as any as result);
  };

  const error = {
    content: 'Unesite vrijednost',
    pointing: 'below',
  };

  return (
    <Card>
      <Card.Content>
        <Image floated="right" size="mini" src={logo} />
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
              <Form id="form" onSubmit={onCreate}>
                <Form.Field name="name" control={Input} label="Ime" required />
                <Form.Field
                  name="email"
                  control={Input}
                  label="Email"
                  required
                />
              </Form>
            </Modal.Content>
            <Modal.Actions>
              <Button
                color="black"
                onClick={() => setOpen(false)}
                type="submit"
                negative
              >
                Neeću, falija san
              </Button>
              <Button
                content="Da, potvrdi!"
                labelPosition="right"
                icon="checkmark"
                onClick={() => setOpen(false)}
                type="submit"
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
              <p>Želite li otkazati nabavu ovog proizvoda?</p>
            </Modal.Content>
            <Modal.Actions>
              <Button color="red" onClick={() => setRelease(false)}>
                <Icon name="remove" /> Ne
              </Button>
              <Button color="green" onClick={() => setRelease(false)}>
                <Icon name="checkmark" /> Da
              </Button>
            </Modal.Actions>
          </Modal>
        </div>
      </Card.Content>
    </Card>
  );
};

export default BabinjeCard;
