// method to reset active states of buttongroup
export const removeHighlights = (buttonGroup) => {
    for (let item of buttonGroup) {
        item.className = item.className.replace(" btn-active", "");
    }
}
