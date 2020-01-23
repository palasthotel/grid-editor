import { useSelector } from "react-redux";

export const usePermissions = () => useSelector(({permissions}) => permissions || []);
export const useContainerStyles = () => useSelector(({styles}) => styles.container || []);
export const useSlotStyles = () => useSelector(({styles}) => styles.slot || []);
export const useBoxStyles = () => useSelector(({styles}) => styles.box || []);

export const useContainerTypes = () => useSelector(({container_types}) => container_types || []);
export const useBoxMetaTypes = () => useSelector(({box_meta_types})=> box_meta_types || []);
export const useBoxTypes = (metaType)=> useSelector(({box_types}) => box_types[metaType] || [] );

