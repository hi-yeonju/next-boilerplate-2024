import React, { useEffect, useRef, useState } from 'react';
import styles from './ColorPicker.module.css';
import ColorSpectrem from './ColorSpectrem';
import ColorSaturation from './ColorSaturation';
import ColorField from './ColorField';
import ColorPalette from './ColorPalette';


const ColorPicker = ({
    x = 0,
    y = 0,
}) => {

    const actionBox = useRef<HTMLDivElement | null>(null)

    const [colorPickerValue, setColorPicker] = useState({
        show: true,
        pos: {
            x: 100,
            y: 200
        }
    })
    // console.log(colorPickerValue)

    const [color, setColor] = useState('rgb(255,0,0)')
    const [sColor, setSColor] = useState('rgb(255,0,0)')

    // 컬러픽커 외 클릭시 닫기
    useEffect(() => {
        
        const handleClickOutside = (event: MouseEvent) => {
            if(colorPickerValue.show){
                if (!actionBox.current?.contains(event.target as Node)) {
                    setColorPicker({
                        ...colorPickerValue,
                        show: false,
                    })
                
                }
            }
          };
      
          document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);

        };
    },[colorPickerValue])

    // if(!colorPickerValue.show){
    //     return
    // }


    return (
        <div 
        ref={actionBox}
        className='container'
        style={{
            left: colorPickerValue.pos.x,
            top: colorPickerValue.pos.y - 100,
        }}
        >
            <ColorSaturation 
                color={sColor}
                result={val => {
                    setColor(val)
                    setColorPicker({
                        ...colorPickerValue,
                        value: val
                    })
                }}
            />


            {/* 색상 스팩트럽 */}
            <ColorSpectrem
                result={val => {
                    setSColor(val)
                }}
            />

            <ColorField color={color} />

            <ColorPalette />

            <style jsx>{`
                .container{position: fixed; z-index: 99; display: inline-block; padding: 10px; padding-top: 0; background: #fff; border-radius: 10px; box-shadow: 0px 2px 7.5px 0px rgba(0, 0, 0, 0.1); border: 1px solid #eee;}
            `}</style>
            
        </div>
    );
}

export default ColorPicker;