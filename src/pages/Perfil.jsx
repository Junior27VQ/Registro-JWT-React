import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config/apiConfig";
import { useNotification } from "../components/NotificationContext";

function Perfil(){
    const [datosPerfil, setDatosPerfil] = useState(null);
    const [error, setError] = useState('');

    const {token, logout} = useAuth();

    const navigate = useNavigate();

    const {mostrarAlerta} = useNotification();

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
        mostrarAlerta("Sesion cerrada con éxito!");
        navigate('/login');
    }

    return(
        <div className="profile-card">
            <h2>Perfil de Usuario</h2>
            {datosPerfil ? (
                <div className="profile-info">
                    <div className="profile-item">
                        <span>Menssage:</span> <strong>{datosPerfil.Mensaje}</strong>
                    </div>
                    <div className="profile-item">
                        <span>Usuario:</span> <strong>{datosPerfil.Usuario}</strong>
                    </div>
                    <div className="profile-item">
                        <span>Rol:</span> <strong>{datosPerfil.Rol}</strong>
                    </div>
                    <div className="profile-item">
                        <span>Estado:</span> <strong>{datosPerfil.Estatus}</strong>
                    </div>
                </div>
            ) : (
                <p>Cargando datos...</p>
            )}

            <button className="btn-logout" onClick={manejarLogOut}>
                Cerrar Sesión
            </button>
        </div>
    )

}

export default Perfil;