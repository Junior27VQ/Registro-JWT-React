import { useState } from "react";
import { API_BASE_URL } from "../config/apiConfig";
import { useNavigate } from "react-router-dom";
import AlertaNotificacion from "../components/AlertaNotificacion";

function Registrar(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rol, setRol] = useState('USER'); //Valor por defecto
    const [err, setErr] = useState('');

    const navigate = useNavigate();

    const [alerta, setAlerta] = useState(null);

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

            setAlerta("Registro completado correctamente");
            setTimeout(()=> navigate('/login'), 2000);
            
        } catch (error) {
            setErr(error.message);
        }
    }

    return(
        <form onSubmit={onRegistrar}>
            {alerta && <AlertaNotificacion mensaje={alerta} />}
            <h1>Registro de Nuevo Usuario</h1>
            <div>
                <label>Nombre de Usuario</label>
                <input type="text" value={username} onChange={(e)=> setUsername(e.target.value)} required />
            </div>
            <div>
                <label>Contraseña</label>
                <input type="password" value={password} onChange={(e)=> setPassword(e.target.value)} required />
            </div>
            <div>
                <label>Rol en el Sistema</label>
                <select value={rol} onChange={(e)=> setRol(e.target.value)} required>
                    <option value="USER">USER</option>
                    <option value="ADMIN">ADMIN</option>
                </select>
            </div>
            {err && <p style={{color: 'red'}}>{err}</p>}
            <button type="submit">Registrar</button>
        </form>
    )
}
export default Registrar;