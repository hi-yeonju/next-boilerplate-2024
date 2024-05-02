/**
 * 색상 관련 설정
 * @param rgb 
 * @returns 
 */
export function rgbToHsl(rgb:string) {
    // 'rgb(255, 0, 0)' 형식을 파싱하여 숫자 배열로 변환
    const rgbArray = rgb.match(/\d+/g)?.map(Number) ?? [];

    // 0에서 1 사이의 값으로 정규화
    const r = rgbArray[0] / 255;
    const g = rgbArray[1] / 255;
    const b = rgbArray[2] / 255;

    // 최소, 최대 채널 값 및 채도, 명도 계산
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const delta = max - min;

    let h = 0;
    let s = 0;
    let l = (max + min) / 2;

    if (delta !== 0) {
        s = delta / (1 - Math.abs(2 * l - 1));

        switch (max) {
            case r:
                h = ((g - b) / delta + 6) % 6;
                break;
            case g:
                h = (b - r) / delta + 2;
                break;
            case b:
                h = (r - g) / delta + 4;
                break;
        }

        h *= 60;

        h = Math.floor(h)
    }

    return { h, s: s * 100, l: l * 100 };
}
// // Example
// const rgbColor = 'rgb(255, 0, 0)';
// const hslColor = rgbToHsl(rgbColor);
// console.log(hslColor); // { h: 0, s: 100, l: 50 }


interface hslToRgbType {
    h: number,
    s: number,
    l: number,
}
export function hslToRgb(hsl:hslToRgbType) {

    const h = hsl.h / 360;
    const s = hsl.s / 100;
    const l = hsl.l / 100;

    let r, g, b;

    if (s === 0) {
        r = g = b = l; // achromatic
    } else {
        const hue2rgb = (p:number, q:number, t:number) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };

        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;

        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }

    const result =  {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255),
    }
    
    return `rgb(${result.r},${result.g},${result.b})`;
}

// Example
// const hslColor = { h: 0, s: 100, l: 50 };
// const rgbColor = hslToRgb(hslColor);
// console.log(rgbColor); // { r: 255, g: 0, b: 0 }


export function rgbStringToHex(rgbString:string) {
    // 정규식을 사용하여 숫자 추출
    const rgbArray = rgbString.match(/\d+/g)?.map(Number) ?? [];

    if (!rgbArray) {
        // 형식이 일치하지 않으면 null 반환 또는 예외 처리
        return null;
    }

    // 추출된 숫자를 16진수로 변환하고 두 자리로 맞춤
    const hexR = ('0' + Number(rgbArray[0]).toString(16)).slice(-2);
    const hexG = ('0' + Number(rgbArray[1]).toString(16)).slice(-2);
    const hexB = ('0' + Number(rgbArray[2]).toString(16)).slice(-2);

    // 변환된 16진수를 합쳐서 HEX 코드로 반환
    return `#${hexR}${hexG}${hexB}`;
}

// // Example
// const hexColor = rgbStringToHex("rgb(0, 0, 0)");
// console.log(hexColor); // Output: #000000
