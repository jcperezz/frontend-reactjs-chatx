
// react core
import React from 'react';
import { ChangeEvent, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

// bootstrap
import { Form, Button, Toast, Container, } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

import './login.css';

// app
import { Context } from "../../context/AppContext.jsx";
import UsersService from '../../services/UserService.ts';
import { FaLinkedin } from 'react-icons/fa';


interface IFormInput {
    nick: string,
}

function Login() {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IFormInput>();

    const { user } = useContext(Context);
    const [nick, setNick] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    // eventos
    const toggleToast = () => setShowToast(!showToast);
    const handleNickChange = (e: ChangeEvent<HTMLInputElement>): void => setNick(e.target.value);

    const onSubmit = async () => {
        try {
            const newUser = await UsersService.createUser(nick);
            user.nick = newUser.nick;
            user.id = newUser.id;
            //console.log('user', newUser);
            navigate('/chatroom');
        } catch (error) {
            console.error('Error al crear usuario:', error);
            setShowToast(true);
            setErrorMessage(`${error}`);
        }
    };

    return (
        <Container fluid className="d-flex vh-100">
            <div className="container">
                <div className="body d-md-flex align-items-center justify-content-between">
                    
                    <div className="box-1 mt-md-0 mt-5">
                        <img src="https://images.pexels.com/photos/2033997/pexels-photo-2033997.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                            className="" alt=""></img>
                    </div>
                    <div className="box-2 d-flex flex-column h-100">
                        <div className="mt-5">
                            <p className="mb-1 h-1">Bienvenido al Super Chat!</p>
                            <p className="text-muted mb-2" style={{height: '30px'}}></p>
                            <div className="d-flex flex-column ">
                                <p className="text-muted mb-2">Ingresa tu nickname</p>
                                <div className="d-flex align-items-center">

                                    <Form>
                                        <Form.Group controlId="formNick">
                                            <Form.Control
                                                type="text"
                                                value={nick}
                                                minLength={4}
                                                maxLength={8}
                                                {...register('nick', {
                                                    required: 'Requerido',
                                                    minLength: { message: 'Mínimo 4 carácteres', value: 4 },
                                                    maxLength: { message: 'Máximo 8 carácteres', value: 8 },
                                                    pattern: { message: 'Solo se permite lentras y números', value: /^[A-Za-z0-9]+$/i },
                                                    onChange: handleNickChange
                                                })}
                                                aria-invalid={errors.nick ? 'true' : 'false'}
                                            />
                                            {errors.nick && <p className="alert alert-danger">{errors.nick?.message}</p>}
                                        </Form.Group>

                                        <div className="d-flex justify-content-between mt-3">
                                            <Button variant="primary" onClick={handleSubmit(onSubmit)} >Iniciar</Button>
                                        </div>
                                    </Form>
                                </div>

                            </div>
                            <Toast show={showToast} onClose={toggleToast}>
                                <Toast.Header>
                                    <strong className="me-auto">Notificación</strong>
                                </Toast.Header>
                                <Toast.Body>{errorMessage}</Toast.Body>
                            </Toast>
                        </div>
                        <div className="mt-auto">
                            <p className="text-muted mb-0 mt-md-0 mt-4">Elaborado por
                                <span className="p-color me-1"> Juan Carlos Pérez</span>
                            </p>
                            <p className="text-muted mb-0 mt-md-0 mt-4">
                                <a href='https://www.linkedin.com/in/juan-carlos-perez' target='_blank' rel="noreferrer">
                                    <FaLinkedin style={{ marginRight: '8px' }} />
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

        </Container>
    );
}

export default Login;