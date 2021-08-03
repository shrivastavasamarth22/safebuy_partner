export default class Shop {
    static fromSnapshot(snapshot) {
        return new Shop(snapshot);
    }

    constructor({
        id,
        name,
        ownerName,
        phone,
        address1,
        address2,
        landmark,
        city,
        state,
        pinCode,
        lat,
        lng,
        category,
        weeklyHolidays,
        openTime,
        closeTime,
        homeDeliveryCapable,
        shopBeat,
        homeDeliveryMinOrderAmount,
        onLeaveStatus,
        fromLeaveDate,
        toLeaveDate,
        imageUri,
        ownerImageUri,
    }) {
        this.id = id;
        this.name = name;
        this.ownerName = ownerName;
        this.phone = phone;
        this.address1 = address1;
        this.address2 = address2;
        this.landmark = landmark;
        this.city = city;
        this.state = state;
        this.pinCode = pinCode;
        this.lat = lat;
        this.lng = lng;
        this.category = category;
        this.weeklyHolidays = weeklyHolidays;
        this.openTime = openTime;
        this.closeTime = closeTime;
        this.homeDeliveryCapable = homeDeliveryCapable;
        this.shopBeat = shopBeat;
        this.homeDeliveryMinOrderAmount = homeDeliveryMinOrderAmount;
        this.onLeaveStatus = onLeaveStatus;
        this.fromLeaveDate = fromLeaveDate;
        this.toLeaveDate = toLeaveDate;
        this.imageUri = imageUri;
        this.ownerImageUri = ownerImageUri;
        this.isImmutable = false;
    }

    lock() {
        this.isImmutable = true;
        return this;
    }

    setAddress(address1, address2, landmark, pinCode, lat, lng) {
        if (this.isImmutable) {
            return Shop.fromSnapshot({
                ...this,
                address1,
                address2,
                landmark,
                pinCode,
                lat,
                lng,
            });
        }
        this.address1 = address1;
        this.address2 = address2;
        this.landmark = landmark;
        this.pinCode = pinCode;
        this.lat = lat;
        this.lng = lng;
        return this;
    }

    setName(name) {
        if (this.isImmutable) {
            return Shop.fromSnapshot({
                ...this,
                name,
            });
        }
        this.name = name;
        return this;
    }

    setOwnerName(ownerName) {
        if (this.isImmutable) {
            return Shop.fromSnapshot({
                ...this,
                ownerName,
            });
        }
        this.ownerName = ownerName;
        return this;
    }

    setPhone(phone) {
        if (this.isImmutable) {
            return Shop.fromSnapshot({
                ...this,
                phone,
            });
        }
        this.phone = phone;
        return this;
    }

    setWeeklyHolidays(weeklyHolidays) {
        if (this.isImmutable) {
            return Shop.fromSnapshot({
                ...this,
                weeklyHolidays,
            });
        }
        this.weeklyHolidays = weeklyHolidays;
        return this;
    }

    setOpenTime(openTime) {
        if (this.isImmutable) {
            return Shop.fromSnapshot({
                ...this,
                openTime,
            });
        }
        this.openTime = openTime;
        return this;
    }

    setCloseTime(closeTime) {
        if (this.isImmutable) {
            return Shop.fromSnapshot({
                ...this,
                closeTime,
            });
        }
        this.closeTime = closeTime;
        return this;
    }

    setOnLeaveStatusToTrue(fromLeaveDate, toLeaveDate) {
        if (this.isImmutable) {
            return Shop.fromSnapshot({
                ...this,
                onLeaveStatus: true,
                fromLeaveDate,
                toLeaveDate,
            });
        }
        this.fromLeaveDate = fromLeaveDate;
        this.toLeaveDate = toLeaveDate;
        this.onLeaveStatus = true;
        return this;
    }

    setOnLeaveStatusToFalse(id) {
        if (this.isImmutable) {
            return Shop.fromSnapshot({
                ...this,
                onLeaveStatus: false,
                fromLeaveDate: null,
                toLeaveDate: null,
            });
        }
        this.fromLeaveDate = null;
        this.toLeaveDate = null;
        this.onLeaveStatus = false;
        return this;
    }

    setShopImage(imageUri) {
        if (this.isImmutable) {
            return Shop.fromSnapshot({ ...this, imageUri });
        }
        this.imageUri = imageUri;
        return this;
    }

    setOwnerImage(ownerImageUri) {
        if (this.isImmutable) {
            return Shop.fromSnapshot({ ...this, ownerImageUri });
        }
        this.ownerImageUri = ownerImageUri;
        return this;
    }

    setHomeDeliveryCapable(homeDeliveryCapable) {
        if (this.isImmutable) {
            return Shop.fromSnapshot({...this, homeDeliveryCapable})
        }
        this.homeDeliveryCapable = homeDeliveryCapable;
        return this;
    }

    setHomeDeliveryMinOrderAmount(homeDeliveryMinOrderAmount) {
        if (this.isImmutable) {
            return Shop.fromSnapshot({...this, homeDeliveryMinOrderAmount})
        }
        this.homeDeliveryMinOrderAmount = homeDeliveryMinOrderAmount;
        return this;
    }
}
