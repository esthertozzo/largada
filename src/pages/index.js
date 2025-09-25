import {useState, useEffect} from "react";
import Largada from './largada'
import Link from "next/link";


export default function App() {
  // state para controlar o estado da largada
  // fases: apagado, ligando, verde, go
  const [estado, setEstado] = useState('apagado');

  // state para indicar qual luz vermelha está acendendo - o índice
  const [currentLuz, setCurrentLuz] = useState(0);
  

  // função usada quando o botão é clicado
  const iniciar = () => {
    setEstado('ligando'); //muda o estado para 'ligando' 
    setCurrentLuz(0); // reseta o contador das luzes
  };


  // o useEffect controla a sequência de luzes
  useEffect(() => {
    if(estado === 'ligando' && currentLuz < 3) {

      const tempo = setTimeout(() => {
        setCurrentLuz((prev) => prev + 1);
      }, 1000); // acende a próxima luz após 1 segundo

      return () => clearTimeout(tempo); // limpa o timeout se o componente for desmontado
      
    } else if (estado === 'ligando' && currentLuz === 3) {
      setTimeout(() => setEstado('verde'), 1000); // quando todas as luzes acenderem, muda elas para verde
    }else if (estado === 'verde') {
      const tempo = setTimeout(() => setEstado('go'), 1000); // após 1 segundo, muda o estado para 'go'
      return () => clearTimeout(tempo);
    }
  }, [estado, currentLuz]); 


  return(
    <div className="flex flex-col items-center justify-center min-h-screen bg-indigo-200 gap-6">

  <h1 className="text-3xl font-bold text-gray-800">Largada de Corrida</h1>

 
  <Largada estado={estado} currentLuz={currentLuz} />

  {estado === "go" && (
    <h2 className="text-4xl font-extrabold text-rose-400">
      GO!
    </h2>
  )}

  <button
    className="px-6 py-2 bg-amber-500 text-white font-semibold rounded-lg shadow-md hover:bg-amber-600 active:bg-amber-700 transition duration-300"
    onClick={iniciar}
  >
    Iniciar Corrida
  </button>

<Link href="jogo" passHref> 
<button
    className="px-6 py-2 bg-emerald-600 text-white font-semibold rounded-lg shadow-md hover:bg-emerald-700 active:bg-emerald-800 transition duration-300"
  >
    Ir para jogo 
  </button> </Link>

  
</div>

  )
}
