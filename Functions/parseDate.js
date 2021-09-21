export const parseDate = (date) => {
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    let year = date.getUTCFullYear();
    let month = date.getUTCMonth();
    let dt = date.getUTCDate();
    let day = date.getUTCDay();

    if (dt < 10) {
        dt = '0' + dt;
    }

    return `${dayNames[day]}, ${dt} ${monthNames[month]} ${year}`
}