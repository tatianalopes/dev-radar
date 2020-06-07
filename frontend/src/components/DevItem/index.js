import React from 'react';
import {FiTrash2 } from 'react-icons/fi'

import './styles.css';

export default function DevItem({ dev, onClick }) {

    async function handleDeleteItem(id) {        
        await onClick(id);
    }

    return(
        <li className="dev-item">
            <button onClick={() => handleDeleteItem(dev._id)} type="button">
                <FiTrash2 size={20} color="#a8a8b3"/>
            </button>

            <header>
                <img src={dev.avatar_url} alt="Profile picure"/>
                <div className="user-info">
                    <strong>{dev.name}s</strong>
                    <span>{dev.techs.join(', ')}</span>
                </div>
            </header>
            <p>{dev.bio}</p>
            <a href={`https://github.com/${dev.github_username}`}>Acessar perfil</a>
        </li>
    );
} 