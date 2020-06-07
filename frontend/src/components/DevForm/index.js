import React, { useState, useEffect } from 'react';

import './styles.css';

export default function DevForm({ onSubmit }) {

    const [github_username, setGithubUsername] = useState('');
    const [techs, setTechs] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;

                setLatitude(latitude);
                setLongitude(longitude);
            },
            (error) => {
                console.log(error);
            },
            {
                timeout: 30000,
            }
        );
    }, []);

    async function handleSubmit(event) {
        event.preventDefault();

        await onSubmit({
            github_username,
            techs,
            latitude,
            longitude
        });

        setGithubUsername('');
        setTechs('');
    }

    return(
        <form onSubmit={handleSubmit}>
            <div className="input-block">
                <label htmlFor="github_username">Usuário do Gitbug</label>
                <input 
                    name="github_username" 
                    id="github_username" 
                    required
                    value={github_username}
                    onChange={e => setGithubUsername(e.target.value)} />
            </div>
            
            <div className="input-block">
                <label htmlFor="techs">Tecnologias</label>
                <input 
                    name="techs" 
                    id="techs" 
                    required
                    value={techs}
                    onChange={e => setTechs(e.target.value)} />
            </div>

            <div className="input-group">
                <div className="input-block">
                    <label htmlFor="latitude">Latitude</label>
                    <input 
                        name="latitude" 
                        id="latitude" 
                        required 
                        value={latitude} 
                        type="number"
                        onChange={e => setLatitude(e.target.value)} />
                </div>

                <div className="input-block">
                    <label htmlFor="longitude">Longitude</label>
                    <input 
                        name="longitude" 
                        id="longitude" 
                        required 
                        value={longitude} 
                        type="number"
                        onChange={e => setLongitude(e.target.value)} />
                </div>
            </div>

            <button type="submit">Salvar</button>
        </form>
    );
}