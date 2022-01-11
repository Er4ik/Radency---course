export function validateFieldModal(value, key) {
    try {
        const availableDataFiledCategory = ['Idea', 'Thought', 'Task']
        if(!value && key !== 'dateContent') return false;
        else if(key === 'category' && !availableDataFiledCategory.includes(value)) return false;
        return true;   
    } catch (error) {
        throw new Error(`Error validate ${error}`);
    }
}
