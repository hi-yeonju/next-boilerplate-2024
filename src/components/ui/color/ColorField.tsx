import { useEffect, useState } from "react";
import { rgbStringToHex } from "./color";

const ColorField = ({
    color = 'rgb(0,0,0)'
}) => {

    const [hexCode, setHexCode] = useState('#eee')
    useEffect(() => {
        const hex = rgbStringToHex(color);
        // console.log(color)
        // console.log(hex)
        if(hex){
            setHexCode(hex)
        }
      
    },[color])

    return (
        <div className="container">
            <div className="preview" style={{ backgroundColor: color }}></div>
            <input type="text" className="hue" disabled value={hexCode} />
            {/* <input type="text" className="alpha" value={'100%'} /> */}

            <style jsx>{`
                .container{margin-top: 20px; display: flex; gap: 5px; align-items: center; justify-content: space-between; width: 200px;}
                .container .preview{width: 35px; height: 35px; border: 1px solid #ddd; border-radius: 3px; background-color: #eee; box-shadow: 0 0 0 2px #fff inset;}
                .container input{min-width: 0; border: 1px solid #ddd; height: 35px; }
                .container input.hue{flex: 1;}
                .container input.alpha{width: 60px;}
            `}</style>
        </div>
    );
}

export default ColorField;