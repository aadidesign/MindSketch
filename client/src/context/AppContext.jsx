import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
export const AppContext = createContext()

const AppContextProvider = (props) => {
    const [user, setUser] = useState(null);
    const [showLogin, setShowLogin] = useState(false);
    const [token, setToken] = useState(localStorage.getItem('token'));

    const [credit, setCredit] = useState(0);
    const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';
    
    console.log('Backend URL:', backendUrl);
    console.log('Environment VITE_BACKEND_URL:', import.meta.env.VITE_BACKEND_URL);

    const navigate = useNavigate()

    const loadCreditsData = async () => {
        try {
            if (!token) {
                console.log('No token available for credits request');
                return;
            }
            
            console.log('Loading credits from:', `${backendUrl}/api/users/credits`);
            const { data } = await axios.get(
                `${backendUrl}/api/users/credits`,
                { headers: { token } }
            );
            if (data.success) {
                setCredit(data.credits);
                setUser(data.user);
                console.log('Credits loaded successfully:', data.credits);
            } else {
                console.log('Credits request failed:', data.message);
            }
        } catch (error) {
            console.log('Error loading credits:', error);
            toast.error(error.response?.data?.message || error.message);
        }
    };

    const generateImage = async(prompt) => {
        try{
            const {data} = await axios.post(backendUrl + '/api/image/generate-image', {prompt}, {headers : {token}})
            if(data.success){
                loadCreditsData()
                    return data.resultImage  
            }
        } catch(error){
            const message = error.response?.data?.message || error.message
            toast.error(message)
            loadCreditsData()
            if (error.response?.data?.creditBalance === 0){
                toast.error('Insufficient credits. Please buy a package to continue.')
                navigate('/buy')
            }
            
        }
    }

    const logout = () => {
        localStorage.removeItem('token');
        setToken('');
        setUser(null);
        setCredit(0);
    };

    useEffect(() => {
        if (token) {
            loadCreditsData();
        }
    }, [token]);

    const values = {
        user,
        setUser,
        showLogin,
        setShowLogin,
        credit,
        setCredit,
        backendUrl,
        token,
        setToken,
        loadCreditsData,
        logout,
        generateImage
        }

        return (
            <AppContext.Provider value={values}>
                {props.children}
            </AppContext.Provider>
        )
}

export { AppContextProvider };
