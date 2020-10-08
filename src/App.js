import React, { useEffect, useState } from "react";
import api from './services/api'

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api.get('/repositories').then(repository => setRepositories(repository.data))
  }, [])


  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      title: "Repositório deste projeto",
      url: "https://github.com/FefAzvdo/Bootcamp-11---Desafio-03---Conceitos-ReactJS",
      techs: ["ReactJS"]
    })

    const newRepository = response.data

    setRepositories([...repositories, newRepository])
  }

  async function handleRemoveRepository(id) {
    api.delete(`/repositories/${id}`)

    const newList = repositories.filter(repository => repository.id !== id)

    setRepositories(newList)
  }

  return (
    <div>
      <ul data-testid="repository-list" className="repository-container">
        {repositories !== [] && repositories.map(repository => {
          return (
            <li key={repository.id} className="repository-item">
              <p>{repository.title}</p>
              <a href={repository.url} target="_blank">Ver Repositório</a>
              <ul>
                Techs:
                {repository.techs.map(tech => {
                return (
                  <li key={tech}>{tech}</li>
                )
              })}
              </ul>
              <strong>Likes: {repository.likes} ❤</strong>
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
          </button>
            </li>
          )
        })
        }
      </ul>
      <div className="add-button-container">
        <button onClick={handleAddRepository}>Adicionar</button>
      </div>

    </div>
  );
}

export default App;
