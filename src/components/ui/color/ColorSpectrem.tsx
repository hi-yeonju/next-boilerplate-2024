import React, { useEffect, useRef, useState } from 'react';

const ColorSpectrem = ({
    result = (val: string) => { }
}) => {

    // 색상 박스
    const colorBoxRef = useRef<HTMLDivElement>(null)

    // 기본 색상
    const [color, setColor] = useState('rgb(255,0,0)')
    useEffect(() => {
        result(color)
    }, [color])

    // 포인터 좌표
    const [posX, setPosX] = useState(0)

    // 포인터 이동
    let isInit = false
    const handleMouseDown = (e:React.MouseEvent) => {

        isInit = true;

        // 마우스 이동 이벤트에 대한 이벤트 리스너 추가
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
    };

    const handleMouseMove = (e: React.MouseEvent | MouseEvent) => {
        if(isInit){
            dragColors(e as React.MouseEvent)
        }

    };

    const handleMouseUp = () => {
        isInit = false
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

    // 포인터 좌표에 맞게 이동
    const dragColors = (event: React.MouseEvent) => {


        // 클릭 이벤트가 발생한 위치의 X 좌표
        const clickX = event.clientX;

        // 클릭한 div의 X 좌표
        if (!colorBoxRef) {
            return false;
        }
        const divX = colorBoxRef.current?.getBoundingClientRect().left ?? 0;
        const divWidth = colorBoxRef.current?.getBoundingClientRect().width ?? 0;


        // 왼쪽으로 얼마나 떨어져 있는지 계산
        let distanceFromLeft = clickX - divX;
        distanceFromLeft = distanceFromLeft > divWidth ? divWidth : clickX <= divX ? 10 : distanceFromLeft

        setPosX(distanceFromLeft - 10)

        // 16.6% 씩 증가
        const unit = 16.6
        const per = distanceFromLeft / divWidth * 100;

        if (per <= unit * 1) {
            const unitPer = per / unit;
            setColor(`rgb(255,${Math.floor(255 * unitPer)},0)`)
        } else if (per > unit * 1 && per <= unit * 2) {
            const unitPer = (per - unit) / unit;
            setColor(`rgb(${255 - Math.floor(255 * unitPer)}, 255,0)`)
        } else if (per > unit * 2 && per <= unit * 3) {
            const unitPer = (per - unit * 2) / unit;
            setColor(`rgb(0, 255,${Math.floor(255 * unitPer)})`)
        } else if (per > unit * 3 && per <= unit * 4) {
            const unitPer = (per - unit * 3) / unit;
            setColor(`rgb(0, ${255 - Math.floor(255 * unitPer)},255)`)
        } else if (per > unit * 4 && per <= unit * 5) {
            const unitPer = (per - unit * 4) / unit;
            setColor(`rgb(${Math.floor(255 * unitPer)}, 0,255)`)
        } else if (per > unit * 5 && per <= unit * 6) {
            const unitPer = (per - unit * 5) / unit;
            setColor(`rgb(255, 0,${255 - Math.floor(255 * unitPer)})`)
        }
    }


    return (
        <div>
            {/* 색상 스팩트럽 */}
            <div className="colorSpectrum"
                ref={colorBoxRef}
                draggable={false}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onClick={(e) => dragColors(e)}
            >
                <span
                    className="pointer"
                    style={{ backgroundColor: color, left: posX }}
                ></span>
            </div>

            <style jsx>{`
            .pointer{width: 18px; height: 18px; background: #eee; border: 1px solid #ddd; border-radius: 50%; position: absolute; box-shadow: 0 0 0 2px #fff inset;}
            .colorSpectrum{ background:linear-gradient(
                to right, 
                rgb(255, 0, 0),
                rgb(255, 255, 0),
                rgb(0, 255, 0),
                rgb(0, 255, 255),
                rgb(0, 0, 255),
                rgb(255, 0, 255),
                rgb(255, 0, 0)
            );  width: 200px; height: 15px; position: relative; border-radius: 50px;
            }
            .colorSpectrum .pointer{ top: 50%; transform: translateY(-50%); left: 0; }
            `}</style>
        </div>
    );
}

export default ColorSpectrem;