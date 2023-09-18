import React, { useEffect } from 'react'
import { List, Message, Portal, Transition } from 'semantic-ui-react'

import { ToastWrapper } from './ToastProvider'

import './Toast.scss'

interface Props {
    toastList: Array<ToastWrapper>
    position: string
    autoDelete: boolean
    dismissTime: number
}
const Toast = (props: Props) => {
    const { toastList, autoDelete, dismissTime } = props
    const [list, setList] = React.useState(toastList)

    useEffect(() => {
        setList([...toastList])
        //eslint-disable-next-line
    }, [toastList])

    useEffect(() => {
        const interval = setInterval(() => {
            if (autoDelete && toastList.length && list.length) {
                deleteToast(toastList[0].id)
            }
        }, dismissTime)

        return () => {
            clearInterval(interval)
        }

        // eslint-disable-next-line
    }, [toastList, autoDelete, dismissTime, list])

    const deleteToast = (id: string) => {
        const listItemIndex = list.findIndex((e) => e.id === id)
        const toastListItem = toastList.findIndex((e) => e.id === id)
        list.splice(listItemIndex, 1)
        toastList.splice(toastListItem, 1)
        setList([...list])
    }

    return (
        <>
            <Portal open>
                <div className='power-toast-container'>
                    <Transition.Group
                        duration={500}
                        animation='fly up'
                        as={List}
                    >
                        {list.map((toast, i) => (
                            <List.Item key={i}>
                                <Message
                                    {...toast.type()}
                                    icon={toast.icon()}
                                    header={toast.item.title}
                                    content={toast.item.description}
                                />
                            </List.Item>
                        ))}
                    </Transition.Group>
                </div>
            </Portal>
        </>
    )
}

export default Toast
