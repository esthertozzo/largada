import React, { useState } from "react";
import Largada from './largada'

export default function Jogo() {
  const [ganhou, setGanhou] = useState(null);
  const [currentLuz, setCurrentLuz] = useState(0);
  const [estado, setEstado] = useState("apagado");
  const [placar, setPlacar] = useState({ jA: 0, jB: 0 });
  const [abrirModal, setAbrirModal] = useState(false);

  const iniciar = () => {
     setEstado("ligando");
    setCurrentLuz(0);
    setGanhou(null);
   

    let tempo1 = setTimeout(() => {
      setCurrentLuz(1);
    }, 1000);
    let tempo2 = setTimeout(() => {
      setCurrentLuz(2);
    }, 2000);
    let tempo3 = setTimeout(() => {
      setCurrentLuz(3);
    }, 3000);
    let tempoVerde = setTimeout(() => {
      setEstado("verde");
    }, 4000);
    let tempoGo = setTimeout(() => {
      setEstado("go");
    }, 5000);

    return () => {
      clearTimeout(tempo1);
      clearTimeout(tempo2);
      clearTimeout(tempo3);
      clearTimeout(tempoVerde);
      clearTimeout(tempoGo);
    };
  };

  const handleKeyPress = (evento) => {
    if (estado === "go" && !ganhou) {
      if (evento.key.toLowerCase() === "a") {
        setGanhou('Jogador A ganhou!');
        setPlacar((prev) => ({ ...prev, jA: prev.jA + 1 }));
      } else if (evento.key.toLowerCase() === "b") {
        setGanhou('Jogador B ganhou!');
        setPlacar((prev) => ({ ...prev, jB: prev.jB + 1 }));
      }
    }
  };

  return (
    //para capturar as teclas
    <div
    // div fica focada para capturar os eventos das teclas
      tabIndex="0"
      onKeyDown={handleKeyPress}
      className="flex flex-col items-center justify-center min-h-screen bg-indigo-200 gap-6 outline-none"
    >
      <h1 className="text-3xl font-bold text-gray-800">Jogo de Reflexo</h1>

       <Largada estado={estado} currentLuz={currentLuz} />

       {estado === "go" && (
        <h2 className="text-4xl font-extrabold text-rose-400">
          GO!
        </h2>
      )}

      {ganhou && (
        <p className="text-lg font-semibold text-gray-700">
          {ganhou}
        </p>
      )}

       <div className="flex gap-10 text-lg ">
        <span className="text-pink-600">Jogador A: {placar.jA}</span>
        <span className="text-sky-600">Jogador B: {placar.jB}</span>
      </div>

       <button
        onClick={iniciar}
        className="px-6 py-2 bg-amber-500 text-white font-semibold rounded-lg shadow-md hover:bg-amber-600 active:bg-amber-700 transition duration-300"
      >
        Começar
      </button>

       <button
        onClick={() => setAbrirModal(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
      >
        Instruções
      </button>

       {abrirModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-lg max-w-md w-full">
            <h2 className="text-2xl text-gray-600 font-bold mb-4 text-center"> Instruções</h2>
            <p className="mb-2 text-gray-700"> Aguarde as luzes ficarem verdes.</p>
            <p className="mb-2 text-gray-700"> Quando aparecer <strong>GO!</strong>, pressione sua tecla</p>
            <p className="mb-2 text-gray-700"> <strong>Jogador A:</strong> tecla <kbd className="px-2 py-1 bg-gray-200 rounded">A</kbd></p>
            <p className="mb-2 text-gray-700"><strong>Jogador B:</strong> tecla <kbd className="px-2 py-1 bg-gray-200 rounded">B</kbd></p>
            <p className="mb-4 text-gray-700">Quem apertar primeiro, ganha a rodada</p>

            <div className="flex justify-center">
              <button
                onClick={() => setAbrirModal(false)}
                className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
      
    </div>
  );
}
