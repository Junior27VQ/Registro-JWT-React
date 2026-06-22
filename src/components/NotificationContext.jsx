import { createContext, useContext, useState } from 'react';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    const [alerta, setAlerta] = useState(null);

    const mostrarAlerta = (mensaje) => {
        setAlerta(mensaje);
        setTimeout(() => setAlerta(null), 3000); // Se limpia sola
    };

    return (
        <NotificationContext.Provider value={{ mostrarAlerta }}>
            {children}
            {alerta && <div className="global-alerta">{alerta}</div>}
        </NotificationContext.Provider>
    );
};

export const useNotification = () => useContext(NotificationContext);