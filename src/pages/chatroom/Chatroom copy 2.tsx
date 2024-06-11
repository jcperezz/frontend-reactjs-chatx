import './chatroom.css';

import React from 'react';
import { ChangeEvent, useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';


// bootstrap
import { Form, Button, Toast, Container, Row, Col, } from 'react-bootstrap';
import { FaHome, FaSearch } from 'react-icons/fa';

// app
import { Context } from '../../context/AppContext.jsx';

// types
import OnlineUser from '../../types/OnlineUser.ts';

import { v4 as uuid } from 'uuid';

// pages
import Conversation from './conversation/Conversation.tsx';
import OnlineUsersList from './onlineUsers/OnlineUsersList.tsx';
import ChatService from '../../services/ChatService.ts';
import Message from '../../types/Message.ts';
import { get } from 'react-hook-form';

const Chatroom: React.FC = () => {
    // variables de contexto
    const navigate = useNavigate();
    const { user } = useContext(Context);
    const [userSelected, setUserSelected] = useState<OnlineUser>();
    const [newMessages, setNewMessages] = useState<Map<string, string>>(new Map());
    const [content, setContent] = useState<string>('');
    const [allMessages, setAllMessages] = useState<Map<string, Message[]>>(new Map());
    const [onlineUsers, setOnlineUsers] = useState<OnlineUser[]>([]);


    const handleContentChange = (e: ChangeEvent<HTMLInputElement>): void => setContent(e.target.value);

    const onSelectUser = (onlineUser: OnlineUser) => setUserSelected(onlineUser);

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

    const onSendMessage = (outMessage: Message) => {
        console.log('onsendmessage 1');
        ChatService.sendMessage(outMessage);

        /** 
        setAllMessages(all => {
            const newMap = new Map(allMessages);
            const oldMessages = (newMap.get(outMessage.fromId) ?? []).filter(m => m.id !== outMessage.id);
            newMap.set(outMessage.fromId, [...oldMessages, outMessage]);
            return newMap;
        });

        allMessages.get(outMessage.fromId)?.forEach(m => console.log('agregado ', m.content));

        */
    }

    const formatDate = (timestamp?: number): string => {
        const date = new Date(timestamp ?? Date.now());

        const nombresMeses = ['Ene', 'Feb', 'Mar', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dec'];
        
        let hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // la hora '0' debe ser '12'
        const strMinutes = minutes < 10 ? '0' + minutes : minutes.toString();
        const month = date.getMonth() ; // Los meses comienzan desde 0
        const day = date.getDate();
      
        return `${hours}:${strMinutes} ${ampm} | ${nombresMeses[month]} ${day}`;
      };


    // funciones
    useEffect(() => {
        if (!user || !user.nick) {
            // se regresa al home si no está logeado
            navigate('/');
        }

        ChatService.onOnlineUser(async (data) => {
            if (data.userId !== user.id) {
                setOnlineUsers(onlineUsers => [...onlineUsers.filter(o => o.userId !== data.userId), data]);
            }
        });

        ChatService.onOfflineUser((connectionId) => setOnlineUsers(onlineUsers => [...onlineUsers.filter(o => o.connectionId !== connectionId)]));

        ChatService.sendUserOnline(user);

        ChatService.onMessage((message) => {

            setNewMessages(map => {
                const newMap = new Map(map);
                newMap.set(message.fromId, message.content);
                return newMap;
            });

            setAllMessages(all => {
                const conversationId = user.id === message.fromId ? `${message.toId}|${user.id}` : `${message.fromId}|${user.id}`;
                const newMap = new Map(all);
                const oldMessages = (newMap.get(conversationId) ?? []);
                
                if(!oldMessages.includes(message)){
                    console.log('nuevo mensaje');
                    newMap.set(conversationId, [...oldMessages, message]);
                }
                return newMap;
            });

        });


        return () => {
            console.log('Chatroom se ha desmontado');
        };
    }, [userSelected, allMessages]); // El array de dependencias vacío asegura que este efecto se ejecute solo una vez.



    const onClickHome = () => ChatService.disconect();

    return (
        <Container id='chatroom' fluid style={{ backgroundColor: '#CDC4F9'}}>
            <Row>
                <Col>
                    <div>
                    <h1 className='m-5'> <Link className='m-5' to={'/'} onClick={onClickHome}><FaHome></FaHome></Link> Bienvenido al Super Chat! {user.nick}</h1>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                    
                </Col>
            </Row>
            <Row>
                <Col>
                    <div className='col-md-12'>

                        <div className='card' id='chat3' style={{ borderRadius: '15px' }}>
                            <div className='card-body'>
                                <div className='row'>


                                    <div className='col-md-6 col-lg-5 col-xl-4 mb-4 mb-md-0 rounded' style={{ overflowY: 'scroll', maxHeight: '200px' }}>

                                        <div className='p-3'>
                                            <div className='input-group rounded mb-3'>
                                                <input type='search' className='form-control rounded' placeholder='Buscar...' aria-label='Buscar...'
                                                    aria-describedby='search-addon' />
                                                <span className='input-group-text border-0' id='search-addon'>
                                                    <FaSearch></FaSearch>
                                                </span>
                                            </div>

                                            {!onlineUsers || onlineUsers.length === 0 ? <p>No hay usuarios en línea</p> : <></>}

                                            {onlineUsers?.map((onlineUser) => (

                                                <div key={onlineUser.userId} data-mdb-perfect-scrollbar-init style={{ position: 'relative', height: '100px' }}>
                                                    <ul className={'list-unstyled mb-0' + (onlineUser.userId === userSelected?.userId ? ' bg-info text-white' : '')}>
                                                        <li className='p-2 border-bottom'>
                                                            <a href='#!' onClick={() => onSelectUser(onlineUser)} className='d-flex justify-content-between' style={{ textDecoration: 'none' }}>
                                                                <div className='d-flex flex-row'>
                                                                    <div>
                                                                        <img
                                                                            src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp'
                                                                            alt='avatar' className='d-flex align-self-center me-3' width='60'>
                                                                        </img>
                                                                        <span className='badge bg-success badge-dot'></span>
                                                                    </div>
                                                                    <div className='pt-1'>
                                                                        <p className='fw-bold mb-0'>{onlineUser.nick}</p>
                                                                        <p className='small text-muted'>{newMessages?.get(onlineUser.userId!) ?? ''}</p>
                                                                    </div>
                                                                </div>
                                                                <div className='pt-1'>
                                                                    <p className='small text-muted mb-1'>{newMessages?.get(onlineUser.userId!) ? 'Nuevo mensaje' : ''}</p>
                                                                </div>
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            ))}
                                        </div>
                                    </div>



                                    <div className='col-md-6 col-lg-7 col-xl-8 bg-secondary rounded'>

                                        <div className='pt-3 pe-3' data-mdb-perfect-scrollbar-init
                                            style={{ position: 'relative', overflowY: 'auto', height: '400px', maxHeight: '400px' }}>


                                            {!userSelected &&
                                                <div className='col-auto text-center'>
                                                    <h3>Seleccione un contacto para enviar el mensaje</h3>
                                                </div>
                                            }

                                            {userSelected && allMessages.get(`${userSelected.userId}|${user.id}`)?.map((message: Message) => (
                                                <div key={message.id} className={'d-flex flex-row justify-content-start' + (message.fromId === user.id ? ' justify-content-end' : '')}>
                                                    <img src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp'
                                                        alt='avatar 1' style={{ width: '45px', height: '100%' }}>
                                                    </img>
                                                    <div>
                                                        <p className={'small p-2 ms-3 mb-1 rounded-3' + (message.fromId === user.id ? ' text-white bg-primary' : '')}
                                                            style={{ backgroundColor: (message.fromId === user.id ? ' #3B71CA' : '#f5f6f7') }}>{message.content}</p>
                                                        <p className='small ms-3 mb-3 rounded-3 text-muted float-end'>{formatDate(message.date)}</p>
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
                                </div>
                            </div>

                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default Chatroom;