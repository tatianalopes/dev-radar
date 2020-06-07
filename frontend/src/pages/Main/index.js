import React, { useState, useEffect } from 'react';

import api from '../../services/api'
import DevForm from '../../components/DevForm';
import DevItem from '../../components/DevItem';

import './styles.css';

export default function Main() {

    const [devs, setDevs] = useState([]);

    useEffect(() => {
        async function loadDevs() {
            const response = await api.get('/devs');

            setDevs(response.data);
        }

        loadDevs();
    }, []);

    async function handleAddDev(data) {
        const response = await api.post('/devs', data);

        setDevs([...devs, response.data]);
    };

    async function handleDeleteDev(id) {
        try {
            await api.delete(`devs/${id}`);
            
            setDevs(devs.filter(dev => dev._id !== id));            
        } catch(err) {
            alert('Erro ao deletar Dev, tente novamente');
        }
    }

    return (
        <div id="app">
            <aside>
                <strong>Cadastrar</strong>
                <DevForm onSubmit={handleAddDev} />
            </aside>
            <main>
                <ul>
                    {devs.map(dev => (
                        <DevItem key={dev._id} dev={dev} onClick={handleDeleteDev} />
                    ))}
                </ul>
            </main>
        </div>
    );
}