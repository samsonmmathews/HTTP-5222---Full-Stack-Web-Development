export const groceries = ["apples", "oranges", "cherries"]

export function addGroceries(newGrocery) {
    groceries.push(newGrocery)
}

export function groceryLength() {
    return groceries.length
}