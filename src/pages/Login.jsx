import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { API_BASE_URL } from "../config/apiConfig";

function Login(){

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const {login} = useAuth();

    const manejarSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try{
            const response = await fetch(`${API_BASE_URL}/auth/login`, {
                method: 'POST', headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({username, password}),
            });

            if(!response.ok){
                throw new Error('Usuario o Contraseña Incorrectos')
            }
            
            const datos = await response.json();
            login(datos.token);
            navigate('/perfil');

        }catch(err){
            setError(err.message)
        }
    };

    const registar = ()=> {
        navigate('/registrar')
    }

    return(
        <div className="auth-container">
        <h1>Iniciar Sesión</h1>
        <form onSubmit={manejarSubmit}>
            <div className="input-group">
                <label>Usuario:</label>
                <input type="text" value={username} onChange={(e)=> setUsername(e.target.value)} required />
            </div>
            <div className="input-group">
                <label>Contraseña:</label>
                <input type="password" value={password} onChange={(e)=> setPassword(e.target.value)} required />
            </div>
            <button type="submit">Ingresar</button>
            <button type="button" onClick={registar} style={{background: 'transparent', color: '#4ecca3', border: '1px solid #4ecca3'}}>
                Registrar
            </button>
        </form>
    </div>
    )
}
export default Login;