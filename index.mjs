import express, { response } from 'express';
import cors from "cors";
import { Employee, Attendance } from "./dbConn.mjs"

const app = express()
app.use(express.json())
app.use(cors());


// app.get('/post/:id', (req, res) => {
//     Post.findOne({ _id: req.params.id }, (err, data) => {
//         if (!err) {
//             res.send(data);
//         } else {
//             res.status(500).send("something went wrong")
//         }
//     })
// })

// app.get('/posts', (req, res) => {
//     Post.find({}, (err, data) => {
//         if (!err) {
//             res.send(data);
//         } else {
//             res.status(500).send("something went wrong")
//         }
//     })
// })

// app.post('/post', (req, res) => {

//     if (!req.body.text || req.body.text.length > 200) {
//         res.status(400).send(`text is required in json body (max 200 chars), e.g: { "text" : "what is in your mind" }`);
//         return;
//     }

//     let newPost = new Post({
//         text: req.body.text
//     });

//     newPost.save((err, saved) => {
//         if (!err) {
//             res.send("your post is saved 🥳");
//         } else {
//             res.status(500).send("some thing went wrong, please try later");
//         }
//     })
// })

// app.put('/post/:id', (req, res) => {

//     Post.findOneAndUpdate(
//         { _id: req.params.id },
//         { text: req.body.text },
//         {},
//         (err, data) => {
//             if (!err) {
//                 res.send("updated");
//             } else {
//                 res.status(500).send("something went wrong")
//             }
//         }
//     );
// })

app.delete('/post/:id', (req, res) => {
    Employee.deleteOne(
        { _id: req.params.id },
        {},
        (err, data) => {
            if (!err) {
                res.send("deleted")
            } else {
                 res.status(500).send("something went wrong")
            }
        });
})



app.post('/employee', (req, res) => {

    if (
        !req.body.employeeName
        || !req.body.employeeDesignation
        || !req.body.employeeDepartment
        || !req.body.employeeEmail
        || !req.body.employeePhone
        || !req.body.employeeGender
    ) {
        res.status(400).send(`all parameters are required in json body,
         e.g:
         {
            Name: "john",
            Designation: "Manager",
            Department: "Information Technology",
            Email: "john@abc.com",
            Phone: "+9221312345678",
            Gender: "Male",
            
        }`);
        return;
    }

    let newEmployee = new Employee({
        Name: req.body.employeeName,
        Designation: req.body.employeeDesignation,
        Department: req.body.employeeDepartment,
        Email: req.body.employeeEmail,
        Phone: req.body.employeePhone,
        Gender: req.body.employeeGender,

    })

    newEmployee.save((err, saved) => {
        if (!err) {
            res.send("New Employee has been Registered !!!");
        } else {
            res.status(500).send("Something went wrong, Please try later");
        }
    })
})

app.get('/employees', (req, res) => {
    Employee.find({}, (err, data) => {
        if (!err) {
            res.send(data);
        } else {
            res.status(500).send("Something went wrong")
        }
    })
})


// app.post('/attendance', (req, res) => {

//     if (
//         !req.body.studentId
//         || (req.body.isPresent === undefined)
//     ) {
//         res.status(400).send(`all parameters are required in json body,
//          e.g:
//          {
//             studentId: "32423jkj234kj23423kj4h24",
//             isPresent: true,
//         }`);
//         return;
//     }

//     let newAttendance = new Attendance({
//         studentId: req.body.studentId,
//         studentName: req.body.studentName,
//         isPresent: req.body.isPresent,
//     })

//     newAttendance.save((err, saved) => {
//         if (!err) {
//             res.send(`${req.body.studentName}'s Attendance is marked in database 🎊`);
//         } else {
//             res.status(500).send("some thing went wrong, please try later");
//         }
//     })

// })

// app.get('/attendance/:date', (req, res) => {

//     if (!req.params.date) {
//         res.status(400).send(`/attendance/`);
//         return;
//     }

//     Attendance.find({ createdOn: req.params.date }, (err, data) => {
//         if (!err) {
//             res.send(data);
//         } else {
//             res.status(500).send("something went wrong")

//         }
//     })
// })



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is listening at http://localhost:${PORT}`)
})


// https://devcenter.heroku.com/articles/getting-started-with-nodejs