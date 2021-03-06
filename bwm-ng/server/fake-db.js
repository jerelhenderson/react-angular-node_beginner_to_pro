const Rental = require('./models/rental');
const User = require('./models/user');
const Booking = require('./models/booking');
const fakeDbData = require('./data.json');

class FakeDB {
    constructor() {
        this.rentals = fakeDbData.rentals;
        this.users = fakeDbData.users;
    }

    async cleanDb() {
        await User.remove({});
        await Rental.remove({});
        await Booking.remove({});
    }

    pushDataToDb() {
        const user = new User(this.users[0]);
        const anotheruser = new User(this.users[1]);

        this.rentals.forEach((rental) => {
            const newRental = new Rental(rental);
            newRental.user = user;

            user.rentals.push(newRental);
            newRental.save();
        });
        user.save();
        anotheruser.save();
    }

    async seedDb() {
        await this.cleanDb();
        this.pushDataToDb();
    }
}

module.exports = FakeDB;