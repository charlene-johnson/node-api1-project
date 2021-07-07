const express = require("express");
const welcome = require("./welcome")
const db = require("./database");

const server = express();
const port = process.env.PORT || 8080

server.use(express.json());
server.use("/", welcome)

server.get("/api/users/:id", (req, res) => {
  try {
    const id = req.params.id;

    const user = db.getUserById(id);

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({
        errorMessage: "The user with the specified ID does not exist.",
      });
    }
  } catch (err) {
    res.status(500).json({
      errorMessage: "The user information could not be retrieved",
    });
  }
});

server.get("/api/users", (req, res) => {
  try {
    const allUsers = db.getUsers();
    res.json(allUsers);
  } catch (err) {
    res.status(500).json({
      errorMessage: "The user information could not be retrieved",
    });
  }
});

server.post("/api/users", (req, res) => {
  try {
    if (req.body.name === undefined || req.body.bio === undefined) {
      res.status(400).json({
        errorMessage: "Please provide name and bio for the user.",
      });
    } else {
      const newUser = db.createUser({
        name: req.body.name,
        bio: req.body.bio,
      });
      res.status(201).json(newUser);
    }
  } catch (err) {
    res.status(500).json({
      errorMessage: "The user information could not be retrieved",
    });
  }
});

server.delete("/api/users/:id", (req, res) => {
  try {
    const user = db.getUserById(req.params.id);
    if (user) {
      db.deleteUser(req.params.id);
      res.status(204).end();
    } else {
      res.status(404).json({
        errorMessage: "The user with the specified ID does not exist.",
      });
    }
  } catch (err) {
    res.status(500).json({
      errorMessage: "The user information could not be retrieved",
    });
  }
});

server.put("/api/users/:id", (req, res) => {
  try {
    const user = db.getUserById(req.params.id);
    if (req.body.name === undefined || req.body.bio === undefined) {
      res.status(400).json({
        errorMessage: "Please provide name and bio for the user.",
      });
    } else if (user) {
      db.updateUser(req.params.id, req.body);
      res.status(200).json({
        name: req.body.name,
        bio: req.body.bio,
      });
    } else {
      res.status(404).json({
        errorMessage: "The user with the specified ID does not exist.",
      });
    }
  } catch (err) {
    res.status(500).json({
      errorMessage: "The user information could not be retrieved",
    });
  }
});

server.listen(port, () => {
  console.log(`The server has started on port ${port}, have fun!`);
});
