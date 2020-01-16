import React, { useState, useEffect } from 'react';
import api from './services/Api';
import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';

import DevItem from './components/DevItem'
import DevForm from './components/DevForm'
// O que é React
// Componente -> É uma função que retorna algum conteudo Html, Css ou Javascript p interface
// Bloco isolado de HTML, Css e Js o qual nao interfere no restante da aplicação

// Estado -> Informações mantidas pelo componente (Lembrar: Imutabilidade)

// Propriedade -> Informações que o componente Pai passa para o componente Filho

// Primeira letra de componente sempre maiuscula

// Regra de no maximo um componente por arquivo

// <> </> -> fragments modelo p encapsula varios componentes sem usar div

function App() {
  const [devs, setDevs] = useState([]);

  useEffect(() => {
    async function loadDevs() {
      const response = await api.get('/devs');
      setDevs(response.data);
    }
    loadDevs();
  }, [])

  async function handleAddDev(data) {
    const response = await api.post('/devs', data)
    setDevs([...devs, response.data]);
  }

  return (
    <div id='app'>
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev} />
      </aside>

      <main>
        <ul>
          {devs.map(dev => (
              <DevItem key={dev._id} dev={dev} />
            ))}
        </ul>
      </main>

    </div>
  );
}

export default App;
