import { useNavigate } from 'react-router-dom';

const usePreviousPage = () => {
    const navigate = useNavigate();

    const goToPreviousPage = () => {
        navigate('/'); 
    };

    return goToPreviousPage;
};

export default usePreviousPage;
