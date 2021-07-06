export default class Shop {
    static fromSnapshot(snapshot) {
        return new Shop(snapshot)
    }

    constructor({id, name, ownerName, phone, address1, address2, landmark, city, state, pinCode, lat, lng, category, weeklyHolidays, openTime, closeTime, homeDeliveryCapable, shopBeat, homeDeliveryMinOrderAmount, onLeaveStatus, imageUri}) {
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
        this.imageUri = imageUri;
        this.isImmutable = false;
    }

    lock() {
        this.isImmutable = true
        return this
    }

    setAddress(address1,
               address2,
               landmark,
               pinCode,
               lat,
               lng) {
        if (this.isImmutable) {
            return Shop.fromSnapshot({
                ...this,
                address1,
                address2,
                landmark,
                pinCode,
                lat,
                lng
            })
        }
        this.address1 = address1
        this.address2 = address2
        this.landmark = landmark
        this.pinCode = pinCode
        this.lat = lat;
        this.lng = lng;
        return this
    }

    setName(name) {
        if (this.isImmutable) {
            return Shop.fromSnapshot({
                ...this,
                name
            })
        }
        this.name = name;
        return this;
    }

    setPhone(phone) {
        if (this.isImmutable) {
            return Shop.fromSnapshot({
                ...this,
                phone
            })
        }
        this.phone = phone;
        return this;
    }

    setWeeklyHolidays(weeklyHolidays) {
        if (this.isImmutable) {
            return Shop.fromSnapshot({
                ...this,
                weeklyHolidays
            })
        }
        this.weeklyHolidays = weeklyHolidays;
        return this;
    }

    setOpenTime(openTime) {
        if (this.isImmutable) {
            return Shop.fromSnapshot({
                ...this,
                openTime
            })
        }
        this.openTime = openTime;
        return this;
    }

    setCloseTime(closeTime) {
        if (this.isImmutable) {
            return Shop.fromSnapshot({
                ...this,
                closeTime
            })
        }
        this.closeTime = closeTime;
        return this;
    }

    setOnLeaveStatus(onLeaveStatus) {
        if (this.isImmutable) {
            return Shop.fromSnapshot({
                ...this,
                onLeaveStatus
            })
        }
        this.onLeaveStatus = onLeaveStatus;
        return this;
    }
}