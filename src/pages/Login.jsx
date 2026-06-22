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
    }

    return(
        <div>
            <h1>Iniciar Sesion</h1>
            <form onSubmit={manejarSubmit}>
                <div>
                    <label> Usuario: </label>
                    <input
                        required 
                        type="text"
                        value={username}
                        onChange={(e)=> setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label>Contraseña:</label>
                    <input
                        type="password" 
                        value={password}
                        onChange={(e)=> setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p>{error}</p>}
                <button type="submit">Ingresar</button>
                
            </form>
        </div>
    )
}
export default Login;