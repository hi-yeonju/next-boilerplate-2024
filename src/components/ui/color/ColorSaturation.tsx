
import React, { useEffect, useRef, useState } from 'react';
import { hslToRgb, rgbToHsl } from './color';
const ColorSaturation = ({
    color = 'rgb(255,0,0)',
    result = (val:string) => {}

}) => {

    // 색상 박스
    const colorBoxRef = useRef<HTMLDivElement>(null)

    // 기본색상
    const [nowColor, setNowColor] = useState('rgb(255,0,0)')
    useEffect(() => {
        const h = rgbToHsl(color).h
        // console.log(h, sl)
        setNowColor(`hsl(${h},${sl.s}%,${sl.l}%)`)

        result(hslToRgb({h,s:sl.s,l:sl.l}))
    },[color])

    // 포인터 좌표
    const [pos, setPos] = useState({
        x: 185,
        y: 0
    })
    const [sl, setSl] = useState({
        h: 0,
        s: 100,
        l: 50
    })

    // 포인터 이동
    const handleMouseDown = (e:React.MouseEvent) => {

        // 마우스 이동 이벤트에 대한 이벤트 리스너 추가
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
    };

    const handleMouseMove = (e: React.MouseEvent | MouseEvent) => {
        dragColors(e as React.MouseEvent)

    };

    const handleMouseUp = () => {
        // 마우스 땔 때 이벤트 리스너 제거
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
    };
    

    useEffect(() => {
     
        // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
        return () => {
          window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []); 

    // useEffect(() => {
    //     // 마우스 업 이벤트에 대한 이벤트 리스너 추가
    //     window.addEventListener('mouseup', handleMouseUp);

    //     // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    //     return () => {
    //         window.removeEventListener('mousemove', handleMouseMove);
    //     };
    // }, [checkMouseUp]); 

    // 포인터 좌표에 맞게 이동
    const dragColors = (event:React.MouseEvent) => {
        const pointerSize = 15;

        // 클릭 이벤트가 발생한 위치의  좌표
        const clickX = event.clientX;
        const clickY = event.clientY;

        const divX = colorBoxRef.current?.getBoundingClientRect().left ?? 0;
        const divWidth = colorBoxRef.current?.getBoundingClientRect().width ?? 0;

        const divY = colorBoxRef.current?.getBoundingClientRect().top ?? 0;
        const divHeight = colorBoxRef.current?.getBoundingClientRect().height ?? 0;

        // 왼쪽으로 얼마나 떨어져 있는지 계산
        let distanceFromLeft = clickX - divX;
        distanceFromLeft = distanceFromLeft >= divWidth ? divWidth - 4 : clickX <= divX  ? 0 : distanceFromLeft

        let distanceFromTop = clickY - divY;
        distanceFromTop = distanceFromTop >= divHeight ? divHeight - 4 : clickY <= divY ? 0 : distanceFromTop

        const verticalPercent =  Math.floor((distanceFromTop - divHeight) / divHeight * 100 * -1)

        // console.log(distanceFromLeft,distanceFromTop)
        // console.log(color, rgbToHsl(color))
        const h = rgbToHsl(color).h
        let s = 0
        if(distanceFromLeft < 1){
            s = 0
        } else if(distanceFromTop < 1){
            s = 100
        } else {
            s = Math.floor(distanceFromLeft / divWidth * 100)
        }
        let l = 0
        const horizontalPercent = Math.floor(((divWidth - distanceFromLeft) / (divWidth * 2) * 100) + 50 )
        if(distanceFromTop < 1){
            l = horizontalPercent
        } else {
            l = horizontalPercent * (verticalPercent * 0.01)
        }


        result(hslToRgb({h,s,l}))
        
        setPos({
            x: distanceFromLeft,
            y: distanceFromTop
        })

        setSl({
            h: h,
            s: s,
            l: l,
        })

       
        // console.log(h, s, l)
        setNowColor(`hsl(${h},${s}%,${l}%)`)
    }

    return (
        <div>
            <div className="container" 
            ref={colorBoxRef}
            style={{ backgroundColor: color }}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onClick={(e) =>  dragColors(e)}
            >
                <span className="pointer" 
                style={{ 
                    left: `${pos.x}px`, 
                    top: `${pos.y}px`, 
                }}
             
                ><i
                style={{ 
                    backgroundColor: nowColor, 
                  
                }}
                ></i></span>
            </div>
     
            <style jsx>{`
                .pointer{ position: absolute; display: inline-block; width: 1px; height: 1px;}
                .pointer i{position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); width: 15px; height: 15px; background: #eee; border: 1px solid #ddd; border-radius: 50%; box-shadow: 0 0 0 2px #fff inset;}

                .container{width: 200px; height: 200px; margin: 10px 0; border: 1px solid #eee; position: relative; overflow: hidden;}
                .container::before,
                .container::after{content: ""; display: block; width: 100%; height: 100%; position: absolute; top: 0; left: 0; }
                .container::before{z-index: 1; background: linear-gradient(to right, rgb(255,255,255), transparent);}
                .container::after{z-index: 2; background: linear-gradient(to bottom, transparent, rgb(0,0,0));}
                .container .pointer{/* transform: translate(-15px, 15px); */ z-index: 3;}
            `}</style>
        </div>
    );
}

export default ColorSaturation;