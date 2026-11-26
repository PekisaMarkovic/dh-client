const base = "public/drinks";

const getDrinks = () => base;
const getCategories = () => `${base}/categories`;

const DrinkApis = { getDrinks, getCategories };

export default DrinkApis;
