import Luzes from './luzes';

export default function Largada({estado, currentLuz}) {
    const luzes = [0, 1, 2]; // array com as luzes
    
    return(
        <div style={{ display: "flex", gap: "10px" }}>
 
      {luzes.map((index) => (
        <Luzes
          key={index}                 
          color={estado === "verde" ? "green" : "red"}                  
          active={
            estado === "verde" || (estado === "ligando" && index < currentLuz)
          } 
        />
      ))}

    </div>
    )
}