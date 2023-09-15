import React from 'react'
import { Outlet } from 'react-router-dom'

import { Container, Menu } from 'semantic-ui-react'
import ToastProvider from './toast/ToastProvider'

const App: React.FC = () => {
    return (
        <ToastProvider>
            <Menu inverted>
                <Container>
                    <Menu.Item as='div'>Babinje</Menu.Item>
                </Container>
            </Menu>

            <Container>
                <Outlet />
            </Container>
        </ToastProvider>
    )
}

export default App
