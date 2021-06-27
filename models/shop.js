export default class Shop {
    constructor(
        id,
        name,
        ownerName,
        phone,
        address,
        location,
        category,
        weeklyHolidays,
        openTime,
        closeTime,
        homeDeliveryCapable,
        shopBeat,
        homeDeliveryMinOrderAmount,
        onLeaveStatus,
    ) {
        this.id = id;
        this.name = name;
        this.ownerName = ownerName;
        this.phone = phone;
        this.address = address;
        this.location = location;
        this.category = category;
        this.weeklyHolidays = weeklyHolidays;
        this.openTime = openTime;
        this.closeTime = closeTime;
        this.homeDeliveryCapable = homeDeliveryCapable;
        this.shopBeat = shopBeat;
        this.homeDeliveryMinOrderAmount = homeDeliveryMinOrderAmount;
        this.onLeaveStatus = onLeaveStatus;
    }
}