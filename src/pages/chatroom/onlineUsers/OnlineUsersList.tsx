import './onlineuserslist.css';

// react core
import React, { useState, useEffect, useContext } from 'react';

// app
import { Context } from '../../../context/AppContext.jsx';
// bootstrap
import { FaSearch } from 'react-icons/fa';
//types
import OnlineUser from '../../../types/OnlineUser.ts';
//Service
import ChatService from '../../../services/ChatService.ts';

interface OnlineUsersListProps {
    onSelectUser: (onlineUser: OnlineUser) => void;
    newMessages?: Map<string, string>;
}

const OnlineUsersList: React.FC<OnlineUsersListProps> = ({ onSelectUser, newMessages }) => {
    const { user } = useContext(Context);
    const [onlineUsers, setOnlineUsers] = useState<OnlineUser[]>([]);
    const [userSelected, setUserSelected] = useState<OnlineUser>();

    const handleSelectUser = (user: OnlineUser) => {
        setUserSelected(user);
        onSelectUser(user);
    }

    useEffect(() => {

        ChatService.onOnlineUser(async (data) => {
            if (data.userId !== user.id) {
                setOnlineUsers(onlineUsers => [...onlineUsers.filter(o => o.userId !== data.userId), data]);
            }
        });

        ChatService.onOfflineUser((connectionId) => setOnlineUsers(onlineUsers => [...onlineUsers.filter(o => o.connectionId !== connectionId)]));

        // Si necesitas limpiar algo cuando el componente se desmonta, puedes devolver una función de limpieza.
        return () => {
            console.log('Usuarios online se ha desmontado');
        };
    }, []);

    return (
        <div className='col-md-6 col-lg-5 col-xl-4 mb-4 mb-md-0 rounded' style={{ overflowY: 'scroll' }}>

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
                        <ul className={'list-unstyled mb-0'+(onlineUser.userId === userSelected?.userId ? ' bg-info text-white' : '')}>
                            <li className='p-2 border-bottom'>
                                <a href='#!' onClick={() => handleSelectUser(onlineUser)} className='d-flex justify-content-between' style={{ textDecoration: 'none' }}>
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
                                            <p className='small text-muted'>{newMessages?.get(onlineUser.userId!) ?? '' }</p>
                                        </div>
                                    </div>
                                    <div className='pt-1'>
                                        <p className='small text-muted mb-1'>{newMessages?.get(onlineUser.userId!) ? 'Nuevo mensaje': '' }</p>
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default OnlineUsersList;