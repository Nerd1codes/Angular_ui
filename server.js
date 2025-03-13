const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const app = express();
const port = 3000;

app.use(cors());

// Configure Multer to store files in the "uploads" folder
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Save files in "uploads" directory
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Rename file with timestamp
    }
});

const upload = multer({ storage: storage });

app.post('/upload', upload.array('files', 4), (req, res) => {
    console.log('Files received:', req.files);
    res.status(200).send('Files uploaded successfully');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
