import React from 'react';
import usePreviousPage from '../../hooks/useGoToPreviousPage';

const ButtonRegresar: React.FC = () => {
    const goToPreviousPage = usePreviousPage()

    return (
        <button className='bg-slate-700 hover:bg-slate-600 text-white font-semibold py-2 px-14 rounded-md mx-auto'
            onClick={goToPreviousPage}>
            Regresar
        </button>

    )
}

export default ButtonRegresar;