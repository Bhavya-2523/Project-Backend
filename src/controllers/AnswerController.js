const Answer = require("../models/AnswerModel");
// const Response = require("../models/ResponseModel");

const getAllAnswers = async (req, res) => {
    try {
                // const { surveyId } = req.params;
        
                const answers = await Answer.find()
                    .populate("questionId", "questionText");
        
                if (!answers.length) {
                    return res.status(404).json({ message: "No answers found for this survey" });
                }
        
                res.status(200).json({total: answers.length, answers });
            } catch (error) {
                res.status(500).json({ message: "Server error", error: error.message });
            }
        };    
  

const submitAnswer = async (req, res) => {
    try {
        const { surveyId, questionId, answerText, selectedOption, ratingValue } = req.body;

        // const response = await Response.findById(responseId);
        // if (!response) {
        //     return res.status(404).json({ message: "Response not found" });
        // }

        const newAnswer = new Answer({
            surveyId,
            questionId,
            answerText: answerText || null,
            selectedOption: selectedOption || null,
            ratingValue: ratingValue || null
        });

        await newAnswer.save();
        res.status(201).json({ message: "Answer submitted successfully", answer: newAnswer });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


const deleteAnswer = async (req, res) => {
    try {
        const { answerId } = req.params;

        const answer = await Answer.findByIdAndDelete(answerId);
        if (!answer) {
            return res.status(404).json({ message: "Answer not found" });
        }

        res.status(200).json({ message: "Answer deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// const getAnswersBySurvey = async (req, res) => {
//     try {
//         const { surveyId } = req.params;

//         const answers = await Answer.find({ surveyId })
//             .populate("questionId", "questionText");

//         if (!answers.length) {
//             return res.status(404).json({ message: "No answers found for this survey" });
//         }

//         res.status(200).json({total: answers.length, answers });
//     } catch (error) {
//         res.status(500).json({ message: "Server error", error: error.message });
//     }
// };

const getAnswersBySurvey = async (req, res) => {
    try {
      const surveyId  = req.params.id;
        console.log(surveyId)
      const answers = await Answer.find({ surveyId })
        .populate("questionId", "questionText");
  
      if (!answers.length) {
        return res.status(404).json({ message: "No answers found for this survey" });
      }
  
      res.status(200).json({ total: answers.length, answers });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
  



module.exports = {
    submitAnswer,
    deleteAnswer,
    getAnswersBySurvey,
    getAllAnswers, 
};