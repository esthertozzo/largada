export default function Luzes({color, active}) {

    const luzStyle = {
        width: "50px",            
        height: "50px",          
        borderRadius: "50%",      
        backgroundColor: active ? color : "gray", 
    }
    return <div style={luzStyle}></div>
    
}