import { setTestValue } from "@/redux/common";
import { useDispatch, useSelector } from "react-redux";

export const usetextValue = ():[
    string,
    (val:string) => void
] => {
    const dispatch = useDispatch();

    const setValues = (newValue: string) => {
        dispatch(setTestValue(newValue));
    };

    const values = useSelector((state: any) => state.common.testValue);

    return [ values, setValues ];
}