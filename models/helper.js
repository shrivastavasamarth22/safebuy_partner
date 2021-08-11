export default class Helper {
    static fromSnapshot(snapShot) {
        return new Helper(snapShot)
    }

    constructor({
                    id,
                    name,
                    phone,
                    address1,
                    address2,
                    landmark,
                    city,
                    state,
                    pinCode,
                    lat,
                    lng,
                    imageUri,
                    assignedOrders,
                    controlStatus,
                    salaryAmount,
                    salaryStatus
                }) {
        this.id = id;
        this.name = name;
        this.phone = phone;
        this.address1 = address1;
        this.address2 = address2;
        this.landmark = landmark;
        this.city = city;
        this.state = state;
        this.pinCode = pinCode;
        this.lat = lat;
        this.lng = lng;
        this.imageUri = imageUri;
        this.assignedOrders = assignedOrders;
        this.controlStatus = controlStatus;
        this.salaryAmount = salaryAmount;
        this.salaryStatus = salaryStatus;
        this.isImmutable = false;
    }

    lock() {
        this.isImmutable = true;
        return this;
    }

    setName(name) {
        if (this.isImmutable) {
            return Helper.fromSnapshot({
                ...this,
                name
            })
        }
        this.name = name;
        return this;
    }

    setAddress(address1, address2, landmark, pinCode, lat, lng) {
        if (this.isImmutable) {
            return Helper.fromSnapshot({
                ...this,
                address1,
                address2,
                landmark,
                pinCode,
                lat,
                lng
            })
        }
        this.address1 = address1;
        this.address2 = address2;
        this.landmark = landmark;
        this.pinCode = pinCode;
        this.lat = lat;
        this.lng = lng;
        return this;
    }

    setPhone(phone) {
        if (this.isImmutable) {
            return Helper.fromSnapshot({
                ...this,
                phone
            })
        }
        this.phone = phone;
        return this;
    }

    setSalaryAmount(salaryAmount) {
        if (this.isImmutable) {
            return Helper.fromSnapshot({
                ...this,
                salaryAmount
            })
        }
        this.salaryAmount = salaryAmount;
        return this;
    }
}

