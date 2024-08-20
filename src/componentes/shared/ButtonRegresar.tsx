import React from 'react';
import usePreviousPage from '../../hooks/useGoToPreviousPage';

const ButtonRegresar: React.FC = () => {
    const goToPreviousPage = usePreviousPage()

    return(
        <div>
            <button className='bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-8 rounded-md'
                            onClick={goToPreviousPage}>
                            Regresar
                        </button>
        </div>
    )
}

export default ButtonRegresar;