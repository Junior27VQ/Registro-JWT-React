import { useEffect, useState } from "react";
import './AlertaNotificacion.css'

const AlertaNotificacion = ({ mensaje, onClose }) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        // Temporizador para desvanecer tras 3 segundos
        const timer = setTimeout(() => {
            setVisible(false);
            if (onClose) onClose();
        }, 2000);

        return () => clearTimeout(timer);
    }, [onClose]);

    if (!visible) return null;

    return <div className="alert-container">{mensaje}</div>;
};

export default AlertaNotificacion;