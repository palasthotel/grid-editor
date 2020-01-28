
/**
 * @param {string} containerType
 * @returns {boolean}
 */
export const isContentContainerType = (containerType) => containerType.startsWith("c-");

/**
 * @param {string} containerType
 * @returns {string[]}
 */
export const getSlotDefinitions = (containerType) => containerType.split("-").splice(1);

/**
 * get denominator for container type
 * @param container_type
 * @returns {number}
 */
export const getDenominator = (containerType) => {
	const slots = containerType.split("-");
	let denom = 0;
	for(let i = 1; i < slots.length; i++){
		denom+= parseInt(slots[i]);
	}
	return denom;
}

/**
 * @param {string} slotDefinition
 * @returns {float}
 */
export const getSlotWidth = (slotDefinition) => {
	const parts = slotDefinition.split("d");
	return (parts[0]/parts[1])*100;
}

