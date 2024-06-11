import './conversation.css';

// react core
import React, { ChangeEvent, useState, useContext, useEffect } from 'react';

// bootstrap
import { useForm } from 'react-hook-form';

// context
import { Context } from '../../../context/AppContext.jsx';

//Services
import ChatService from '../../../services/ChatService.ts';

import { v4 as uuid } from 'uuid';

//types
import Message from '../../../types/Message.ts';
import User from '../../../types/User.ts';
import OnlineUser from '../../../types/OnlineUser.ts';
import { Button } from 'react-bootstrap';

interface ConversationProps {
    readonly user: User,
    readonly userSelected?: OnlineUser
    readonly inputMessages?: Message[];
    readonly onSendMessage: (onlineUser: Message) => void;
    readonly count: number;
}

const Conversation: React.FC<ConversationProps> = ({ user, userSelected, inputMessages, onSendMessage, count}) => {
    const [content, setContent] = useState<string>('');
    const [messages, setMessages] = useState<Message[]>([]);

    const handleContentChange = (e: ChangeEvent<HTMLInputElement>): void => setContent(e.target.value);

    const onClickSendButton = async () => {
        const message = ({
            id: uuid(),
            content: content,
            fromId: user.id,
            toId: userSelected?.userId!,
            toConnectionId: userSelected?.connectionId!
        }) as Message;

        onSendMessage(message);
        setContent('');
    };

    useEffect(() => {
        console.log('los mensajes entrantes', inputMessages);
        if(inputMessages){
            setMessages(inputMessages);
        }

        // Si necesitas limpiar algo cuando el componente se desmonta, puedes devolver una función de limpieza.
        return () => {
            console.log('Conversacion se ha desmontado');
        };
    }, [count]); // El array de dependencias vacío asegura que este efecto se ejecute solo una vez.

    return (
        <div className='col-md-6 col-lg-7 col-xl-8 bg-secondary rounded'>

            <div className='pt-3 pe-3' data-mdb-perfect-scrollbar-init
                style={{ position: 'relative', height: '400px' }}>


                {!userSelected &&
                    <div className='col-auto text-center'>
                        <h3>Seleccione un contacto para enviar el mensaje</h3>
                    </div>
                }

                {messages?.map((message: Message) => (
                    <div key={message.id} className={'d-flex flex-row justify-content-start' + (message.fromId === user.id ? ' justify-content-end' : '')}>
                        <img src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp'
                            alt='avatar 1' style={{ width: '45px', height: '100%' }}>
                        </img>
                        <div>
                            <p className={'small p-2 ms-3 mb-1 rounded-3' + (message.fromId === user.id ? ' text-white bg-primary' : '')}
                                style={{ backgroundColor: (message.fromId === user.id ? ' #3B71CA' : '#f5f6f7') }}>{message.content}</p>
                            <p className='small ms-3 mb-3 rounded-3 text-muted float-end'>12:00 PM | Aug 13</p>
                        </div>
                    </div>
                ))}



            </div>
            <div className='text-muted d-flex justify-content-start align-items-center pe-3 pt-3 m-2'>
                <img src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp'
                    alt='avatar 3' style={{ width: '40px', height: '100%' }}></img>
                <input type='text' value={content} className='form-control form-control-lg' id='exampleFormControlInput2'
                    placeholder='Enviar mensaje' readOnly={!userSelected} onChange={handleContentChange} />
                <Button className='primary ms-3' disabled={!userSelected || !content} onClick={onClickSendButton}>Enviar</Button>
            </div>

        </div>
    );
}

export default Conversation;