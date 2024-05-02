import { useState } from "react";

const ColorPalette = () => {

    const [colorPickerValue, setColorPicker] = useState({
        show: true,
        pos: {
            x: 0,
            y: 0
        }
    })
    const palette = [
        'transparent',
        '#EF4444',
        '#F97316',
        '#FACC15',
        '#4ADE80',
        '#3B82F6',
        '#6467F2',
        '#F43F5E',
        '#D946EF',
        '#FFFFFF',
        '#AEAEAE',
        '#000000',

    ];

    const handlePalette = (color:string) => {
        setColorPicker({
            ...colorPickerValue,
            value: color
        })
    }

    return (
        <div className="wrap">
            <h5>기본색상</h5>
            
            <div className="container">
                {palette.map(color => (
                    <button 
                    key={`colorChip${color}`} 
                    style={{background: color}}
                    className={color == 'transparent' ? 'none' : ''}
                    onClick={() => handlePalette(color)}
                    ></button>
                ))}
            </div>
            <style jsx>{`
                .wrap{margin-top: 20px;}
                h5{font-size: 15px; font-weight: 500; margin-bottom: 20px;}
                .container{display: grid; grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr; row-gap: 10px;}
                .container button{width: 25px; height: 25px; border-radius: 50%; background-color: #f4f4f4; border: 1px solid #eee; position: relative; overflow: hidden;}
                .container button.none{border-color: #ddd;}
                .container button.none::before{content: ""; display: inline-block; width: 1px; height: 100%; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%) rotate(45deg); background-color: #ff5b5b;}
            `}</style>
        </div>
    );
}

export default ColorPalette;