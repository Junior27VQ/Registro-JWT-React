import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config/apiConfig";
import AlertaNotificacion from "../components/AlertaNotificacion";

function Perfil(){
    const [datosPerfil, setDatosPerfil] = useState(null);
    const [error, setError] = useState('');

    const {token, logout} = useAuth();

    const navigate = useNavigate();

    const [alerta, setAlerta] = useState(null);

    useEffect(()=>{
        const cargarPerfil = async ()=>{
            try{
                const response = await fetch(`${API_BASE_URL}/auth/perfil`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if(!response.ok){
                    throw new Error('No se podo cargar Perfil, inicie sesion nuevamente')
                }
                const datos = await response.json();
                setDatosPerfil(datos);

            }catch(err){
                setError(err.message)
            };
        }
        cargarPerfil()
    }, [token]);

    const manejarLogOut = async()=>{
        try {
            const response = await fetch(`${API_BASE_URL}/auth/logout`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token: token })
            });

            if (!response.ok) {
                console.log("El servidor no pudo invalidar el token, pero procederemos al logout local.");
            }
           
        } catch (err) {
            console.log('Error de red al intentar revocar el token: ' + err);
        }

        logout();
        setAlerta('Sesion cerrada exitosamente');
        console.log("Alerta activada:"+ alerta);

        setTimeout(()=> navigate('/login'), 2000);
        
    }

    return(
        <div>
            <div>{alerta && <AlertaNotificacion mensaje={alerta} />}</div>
            <div>
                <h2>Perfil de Usuario</h2>
                <button onClick={manejarLogOut}>Cerrar Sesion</button>
            </div>

            {error && <p>{error}</p>}

            {datosPerfil && (
                <div>
                    <p>{datosPerfil.Mensaje}</p>
                    <p>{datosPerfil.Usuario}</p>
                    <p>{datosPerfil.Rol}</p>
                    <p>{datosPerfil.Estatus}</p>
                </div>
            )}  
        </div>
    )

}

export default Perfil;