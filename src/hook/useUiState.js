import { useSelector, useDispatch } from "react-redux";
import { actionSetGridIsLoading } from "../data/actions/ui";

const useIsLoading = ()=>{
    const dispatch = useDispatch();
    const isLoading = useSelector(({ui})=> ui.isIsLoading === true);
    return [
        (value)=>{
            dispatch(actionSetGridIsLoading(value));
        },
        isLoading
    ];
};