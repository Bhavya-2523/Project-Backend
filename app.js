const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Importing route files
const roleRoutes = require("./src/routes/RoleRoutes");
app.use(roleRoutes);

const userRoutes = require("./src/routes/UserRoutes");
app.use(userRoutes);

const categoryRoutes = require("./src/routes/CategoryRoutes");
app.use("/category", categoryRoutes);

const surveyRoutes = require("./src/routes/SurveyRoutes");
app.use("/survey", surveyRoutes);

const questionRoutes = require("./src/routes/QuestionRoutes");
app.use("/question", questionRoutes);

const responseRoutes = require("./src/routes/ResponseRoutes");
app.use("/response", responseRoutes);

const answerRoutes = require("./src/routes/AnswerRoutes");
app.use("/answer", answerRoutes);

// MongoDB connection string directly
const mongoURI = "mongodb+srv://patelbhavya2510:Bhavya@2523@survey-snap.qj89xfy.mongodb.net/";  // Update this with your MongoDB URI if you use Atlas

// Connect to MongoDB
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log("Database connected....");
    })
    .catch((err) => {
        console.log("Error connecting to the database:", err);
    });

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log("Server started on port number", PORT);
});
