import mongoose from 'mongoose';
import fetch from 'node-fetch';

import '../models/thing';

const Thing = mongoose.model('Thing');

export function setUpConnection() {
    mongoose.connect('mongodb://localhost/marks_things')
}

export function getProduct(itemId, userId) {
    return Thing.find({ _id: { itemId: itemId, userId: userId } });
}

export function getAllProducts(userId) {
    return Thing.find({ userId: userId });
}

export async function addProduct(itemId, userId) {
    const fetchedData = await fetch(encodeURI(`http://open.api.ebay.com/shopping?callname=GetSingleItem&responseencoding=JSON&appid=IvanVate-marks-PRD-eea9be394-ffca6479&siteid=0&version=967&ItemID=${itemId}`));
    const data = await fetchedData.json();
    const thing = new Thing({
        _id: {
            itemId: itemId,
            userId: userId,
        },
        userId: userId,
        link: data.Item.ViewItemURLForNaturalSearch,
        pictureUrl: data.Item.PictureURL[0],
        title: data.Item.Title,
        price: data.Item.ConvertedCurrentPrice.Value + data.Item.ConvertedCurrentPrice.CurrencyID
    });
    return thing.save();
}

export function deleteProduct(itemId, userId) {
    return Thing.deleteOne({_id: {itemId: itemId, userId: userId}});
}