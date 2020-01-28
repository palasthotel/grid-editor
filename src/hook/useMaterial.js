import { useSelector } from "react-redux";
import { isContentContainerType } from "../utils/container-type";

export const usePermissions = () => useSelector(({permissions}) => permissions || []);
export const useContainerStyles = () => useSelector(({styles}) => styles.container || []);
export const useSlotStyles = () => useSelector(({styles}) => styles.slot || []);
export const useBoxStyles = () => useSelector(({styles}) => styles.box || []);

export const useContainerTypes =
    () => useSelector(({container_types}) => container_types || []);

export const useContentContainerTypes =
    ()=> useContainerTypes().filter(({type}) => isContentContainerType(type));

export const useBoxMetaTypes =
    () => useSelector(({box_meta_types})=> box_meta_types || []);

export const useBoxTypes =
    (metaType)=> useSelector(({box_types}) => box_types[metaType] || [] );

