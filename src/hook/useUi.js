import { useSelector } from "react-redux";

export const useIsLoading = ()=> useSelector(({ui})=> ui.isIsLoading === true);
export const useIsAltKeyPressed = ()=> useSelector(({ui})=> ui.isAltKeyPressed);