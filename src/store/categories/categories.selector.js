// create a hashtable based on the categories array from state
export const selectCategoriesMap = (state) =>
    state.categories.categories.reduce((acc, category) => {
        const { title, items } = category;
        acc[title.toLowerCase()] = items;
        return acc;
    }, {});
