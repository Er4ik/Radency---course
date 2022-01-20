function testValidRequestBodyNote(contentFromModalFields) {
    try {
        const availableDataFiledCategory = ["Idea", "Thought", "Task"];
        for (const key in contentFromModalFields) {
            if (!contentFromModalFields[key] && key !== "dates") return false;
            else if (key === "category" && !availableDataFiledCategory.includes(contentFromModalFields[key]))
                return false;
        }
        return true;
    } catch (error) {
        throw new Error(`Error validate ${error}`);
    }
}

module.exports = { testValidRequestBodyNote };