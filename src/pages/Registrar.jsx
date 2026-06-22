import { useState } from "react";
import { API_BASE_URL } from "../config/apiConfig";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../components/NotificationContext";

function Registrar(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rol, setRol] = useState('USER'); //Valor por defecto
    const [err, setErr] = useState('');

    const navigate = useNavigate();

    const {mostrarAlerta} = useNotification();
   
    const onRegistrar = async (e)=>{
        e.preventDefault();
        setErr('');

        try {
            const response = await fetch(`${API_BASE_URL}/auth/registrar`, {
                method: 'POST', 
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({username, password, rol}),
            });
            const mensajeError = await response.text();
            if(!response.ok){
                console.log(mensajeError);
                throw new Error('Error al registrar, el usuario: '+username+' Ya existe.' );
            }
            mostrarAlerta("¡Usuario registrado con éxito!");
            navigate('/login');
        } catch (error) {
            setErr(error.message);
        }
    }

    return(
        <div className="auth-container">
            <h1>Registro</h1>
            <form onSubmit={onRegistrar}>
                <div className="input-group">
                    <label>Nombre de Usuario</label>
                    <input type="text" value={username} onChange={(e)=> setUsername(e.target.value)} required />
                </div>
                <div className="input-group">
                    <label>Contraseña</label>
                    <input type="password" value={password} onChange={(e)=> setPassword(e.target.value)} required />
                </div>
                <div className="input-group">
                    <label>Rol</label>
                    <select value={rol} onChange={(e)=> setRol(e.target.value)}>
                        <option value="USER">USER</option>
                        <option value="ADMIN">ADMIN</option>
                    </select>
                </div>
                {err && <p style={{color: '#ff6b6b', fontSize: '0.8rem'}}>{err}</p>}
                <button type="submit">Registrar</button>
            </form>
        </div>
    )
}
export default Registrar;