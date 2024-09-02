import React, { useState } from 'react';
import { saveAs } from 'file-saver';
import Footer from '././components/Footer';
import Header from './components/Header';
import SalvarArquivo from './SalvarArquivo';
import './App.css';

function App(){
  return(
    <div className="App-header">
      <Header/>
      <main>
        <p> Componente do semestre 2024/2</p>
        {ListaDeDisciplinas()}
      </main>
      
      {/* <Footer/> */}
    </div>
  );
}
 
function ListaDeDisciplinas() {
  
  // Estado para armazenar na lista de disciplinas e a nova disciplina
  const [lista, setlista] = useState(['PW4', 'TC2', 'PDM']);
  const [novaDisciplina, setnovaDisciplina] = useState('');
  
  const [text, setText] = useState('');
  const [turno, setTurno] = useState('M'); // Valor padrão: Matutino


  const handleSaveFile = () =>{
    const fileContent = `Lista de disciplinas:\n${lista}\n\nTurno: ${turno}\n\nObservações:\n${text}`;
    const blob = new Blob([fileContent], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, 'arquivo.txt');
};
  /// Função para lidar com a mudança de valor do input
  const handleChange = (event) => {
    setnovaDisciplina(event.target.value);
  };

  // Função para adicionar uma nova disciplina à lista
  const adicionarDisciplina = () => {
    if (novaDisciplina.trim() !== '') {
      setlista([...lista, novaDisciplina]);
      setnovaDisciplina('');
    }
  };

  // Função para capturar a tecla Enter e adicionar a lista de disciplinas
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      adicionarDisciplina();  // Chama a função de adicionar tarefa ao pressionar Enter
    }
  };

  return (
    <div>
        <div>
          <h1>Lista de disciplinas</h1>
          <input
            type="text"
            value={novaDisciplina}
            onChange={handleChange}
            onKeyPress={handleKeyPress}  // Adiciona a função de capturar Enter
            placeholder="Nova disciplina"
          />
          <button onClick={adicionarDisciplina}>Adicionar</button>
          <ul>
            {lista.map((tarefa, index) => (
              <li key={index}>{tarefa}</li>  // Renderiza cada tarefa como um item de lista
            ))}
          </ul>    
        </div>
        
        <div>          
          <p>Selecione o turno:</p>
            <label>
                <input 
                type="radio" 
                name="options" 
                value="Matutino"
                checked={turno === 'Matutino'} 
                onChange={(e) => setTurno(e.target.value)
                } 
                />Matutino
            </label>
            <label>
                <input 
                type="radio" 
                name="options" 
                value="Vespertino"
                checked={turno === 'Vespertino'} 
                onChange={(e) => setTurno(e.target.value)
              }
                />Vespertino
            </label>
            <label>
                <input 
                type="radio" 
                name="options" 
                value="Noturno"
                checked={turno === 'Noturno'} 
                onChange={(e) => setTurno(e.target.value)
                }
                />Noturno
            </label>  
        </div>

        <div>
          <h2>Observações:</h2>
          <textarea 
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows="10"
          cols="50"
          />
          <button onClick={handleSaveFile}>Salvar</button>
        </div>
    </div> 
);
} 
export default App;