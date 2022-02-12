import mongoose from "mongoose";

//// mongodb connection code /////////////////////////////////////////////////////////////////////////////////////////////
// let dbURI = "mongodb+srv://uzair:uzzi*123@cluster0.6rm2l.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
let dbURI = "mongodb+srv://uzzi:uzzi*123@cluster0.6rm2l.mongodb.net/Attendance?retryWrites=true&w=majority";
// let dbURI = 'mongodb://localhost/mydatabase';
mongoose.connect(dbURI);

////////////////mongodb connected disconnected events///////////////////////////////////////////////
mongoose.connection.on('connected', function () {//connected
    console.log("Mongoose is connected");
    
});

mongoose.connection.on('disconnected', function () {//disconnected
    console.log("Mongoose is disconnected");
    process.exit(1);
});

mongoose.connection.on('error', function (err) {//any error
    console.log('Mongoose connection error: ', err);
    process.exit(1);
});

process.on('SIGINT', function () {/////this function will run just before app is closing
    console.log("app is terminating");
    mongoose.connection.close(function () {
        console.log('Mongoose default connection closed');
        process.exit(0);
    });
});
////////////////mongodb connected disconnected events///////////////////////////////////////////////



const employeeSchema = new mongoose.Schema({
    "Name": String,
    "Code": String,
    "Designation": String,
    "Department": String,
    "Email": String,
    "Phone": String,
    "Gender": String,
    "createdOn": { type: Date, default: Date.now }
});
export const Employee = mongoose.model('Employee', employeeSchema);

const attendanceSchema = new mongoose.Schema({
    "Code": String,
    "createdOn": { type: Date, default: Date.now }
});
export const Attendance = mongoose.model('Attendance', attendanceSchema);
