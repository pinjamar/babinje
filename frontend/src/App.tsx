import React from 'react'
import { Outlet } from 'react-router-dom'

import { Container, Menu, Image } from 'semantic-ui-react'
import ToastProvider from './toast/ToastProvider'

const logo = new URL('./images/baby-logo.jpg', import.meta.url)

const App: React.FC = () => {
    return (
        <ToastProvider>
            <Menu>
                <Container>
                    <Menu.Item as='a' header href='/'>
                        <Image
                            circular
                            size='mini'
                            src={logo}
                            alt='logo'
                            style={{ marginRight: '1.5em' }}
                        />
                        Babinje
                    </Menu.Item>
                    <Menu.Item as='a' href='/'>
                        Artikli
                    </Menu.Item>
                    <Menu.Item as='a' href='/potrosna'>
                        Potrošna roba
                    </Menu.Item>
                </Container>
            </Menu>

            <Container>
                <Outlet />
            </Container>
        </ToastProvider>
    )
}

export default App
