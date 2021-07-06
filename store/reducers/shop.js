import {Shop} from "../../models";

const initialState = {
    shop: new Shop({
        id: 1,
        name: "Gupta Vegetable Shop",
        ownerName: "Prakash Gupta",
        phone: 9893614220,
        address1: "A-3/603 Vishnu Hitech City",
        address2: "Near Dana Pani Restaurant, Bawadiya Kalan",
        landmark: "Bawadiya Railway Crossing",
        city: "Bhopal",
        state: "Madhya Pradesh",
        pinCode: "462026",
        lat: 23.188,
        lng: 77.447,
        category: "vegetable",
        weeklyHolidays: ["Tuesday"],
        openTime: "0900",
        closeTime: "2000",
        homeDeliveryCapable: true,
        homeDeliveryMinOrderAmount: 40,
        onLeaveStatus: false,
        imageUri: ""
    }).lock()
}

export default (state = initialState, action) => {
    switch(action.type) {
        default:
            return state;
    }
}