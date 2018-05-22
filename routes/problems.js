const route = require("express").Router();

// Import DB Models required
const { Problem, Submission } = require("../models");
// Utilities
const { checkLoggedIn } = require("../utils/auth");

// GET Route for a Problem
route.get("/:id", async (req, res) => {
    try {
        // Get the Problem with contest
        const problem = await Problem.findById(req.params.id).populate("contest");
        // Check if Contest has started
        if (problem.contest.startTime > Date.now())
            return res.status(404).send("Problem not found!");
        
        // else, Render the Problem Page
        res.render("problem", { problem, loggedIn: !!req.user });

    } catch (err) {
        console.error(err.stack);
        res.sendStatus(500);
    }
});

// GET Route for Editorial of a Problem
route.get("/:id/editorial", async (req, res) => {
    try {
        // Get Problem with contest
        const problem = await Problem.findById(req.params.id).populate("contest");
        // Check if Contest Statrted
        if (problem.contest.startTime > Date.now())
            return res.status(404).send("Problem not found!");

        // Render the Editorial of the Problem
        res.render("problem/editorial", { problem });

    } catch (err) {
        console.error(err.stack);
        res.sendStatus(500);
    }
});

// Submit Function to Make API Request for Submission
// Returns the Verdict, Time Used, and Memory Consumed
// TODO: Make actual request, currently mocked
const submit = (code, language) => {
    return {
        verdict: "AC",
        timeUsed: 0.1,
        memoryUsed: 100
    };
};

// POST Route for Submission to the problem
route.post("/:id/submit", checkLoggedIn, async (req, res) => {
    try {
        // Check if valid problem
        const problem = await Problem.findById(req.params.id);
        if (problem === null) {
            return res.status(404).send("Problem not found!");
        }

        // Get required data
        const { code, language } = req.body;

        const result = submit(code, language);

        // Make new submission
        const submission = await Submission.create({
            user: req.user,
            problem: req.params.id,
            code, language, ...result
        });

        res.send(result);

    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

module.exports = route;