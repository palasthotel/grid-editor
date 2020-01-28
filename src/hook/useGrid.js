import { useSelector } from "react-redux";

export const useRevisions = () => useSelector(({revisions}) => revisions || []);

export const useIsDraft = () => useSelector(({grid: {isDraft}}) => isDraft);
export const useIsPublished = () => !useIsDraft();

export const useGrid = ()=> useSelector(({grid})=> grid);
export const useGridContainerList = () => useSelector(({grid: {container}}) => container || []);

export const useGridContainer =
    (containerId) => useGrid().container.find(c=>c.id === containerId);

export const useGridSlot = (slotId) => {
    const containers = useGridContainerList().slots[slotIndex];
    for(const {slots} of containers){
        const found = slots.find(({id})=> id === slotId);
        if(found) return found;
    }
}

export const useGridBox = (boxId) =>{
    const containers = useGridContainerList();
    for(const {slots} of containers){
        for(const {boxes} of slots){
            const found = boxes.find(({id})=>id === boxId);
            if(found) return found;
        }
    }
}