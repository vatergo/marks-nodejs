import fetch from 'node-fetch';

const store = [];

export function getAllProducts() {
    return store;
}

export async function addProduct(id) {
    //if (!store[id]) {
    const fetchedData = await fetch(encodeURI(`http://open.api.ebay.com/shopping?callname=GetSingleItem&responseencoding=JSON&appid=IvanVate-marks-PRD-eea9be394-ffca6479&siteid=0&version=967&ItemID=${id}`));
    const data = await fetchedData.json(); // отработать ошибку
    store.push({
        itemId: data.Item.ItemID,
        link: data.Item.ViewItemURLForNaturalSearch,
        pictureUrl: data.Item.PictureURL[0],
        title: data.Item.Title,
        price: data.Item.ConvertedCurrentPrice.Value + data.Item.ConvertedCurrentPrice.CurrencyID
    });
    return store[store.length - 1];
}
    //return store[id];
