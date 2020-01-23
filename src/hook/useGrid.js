import { useSelector } from "react-redux";
import { useContainerStyles } from "./useMaterial";

export const useRevisions = () => useSelector(({revisions}) => revisions || []);

export const useGrid = ()=> useSelector(({grid})=> grid);
export const useIsDraft = () => useSelector(({grid: {isDraft}}) => isDraft);
export const useIsPublished = () => !useIsDraft();
export const useGridContainerList = () => useSelector(({grid: {container}}) => container || []);

export const useGridContainer =
    (containerIndex) => useGrid().container[containerIndex];
    
export const useGridSlot = (containerIndex, slotIndex) =>
    useGridContainer(containerIndex).slots[slotIndex];

export const useGridBox = (containerIndex, slotIndex, boxIndex) =>
    useGridSlot(containerIndex, slotIndex).boxes[boxIndex]