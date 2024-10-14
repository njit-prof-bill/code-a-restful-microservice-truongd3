const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// **************************************************************
// Put your implementation here
// If necessary to add imports, please do so in the section above

let users = [];
let currentId = 1;

// POST /users: Create a new user
app.post('/users', (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).json({ error: 'Name and email are required' });
    }
    
    const newUser = { // params
        id: currentId++,
        name,
        email
    };

    users.push(newUser);
    res.status(201).json(newUser);
});

// GET /users/:id: Retrieve user by ID
app.get('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find(u => u.id === userId); // find by ID

    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
});

// PUT /users/:id: Update user information by ID
app.put('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const { name, email } = req.body;

    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex === -1) { // not found
        return res.status(404).json({ error: 'User not found' });
    }

    if (!name || !email) {
        return res.status(400).json({ error: 'Name and email are required' });
    }

    users[userIndex] = { id: userId, name, email };
    res.json(users[userIndex]);
});

// DELETE /users/:id: Delete user by ID
app.delete('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex(u => u.id === userId);

    if (userIndex === -1) {
        return res.status(404).json({ error: 'User not found' });
    }

    users.splice(userIndex, 1); // delete
    res.status(204).send();
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Do not touch the code below this comment
// **************************************************************

// Start the server (only if not in test mode)
if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
}

module.exports = app; // Export the app for testing