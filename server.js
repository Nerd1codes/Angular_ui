const express = require('express');
const multer = require('multer');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());

// MongoDB connection URI
const uri = "mongodb+srv://NikhilSingh:nikhil@cluster0.ozcycsz.mongodb.net/BMC?retryWrites=true&w=majority"; // Replace with your MongoDB connection string
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Multer setup for file uploads
const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.array('files', 4), async (req, res) => {
    console.log('File upload request received');
    try {
        console.log('Connecting to MongoDB...');
        await client.connect();
        console.log('Connected to MongoDB');

        const database = client.db('BMC');
        const collection = database.collection('file_upload'); // Use the file_upload collection

        const files = req.files.map(file => ({
            filename: file.originalname,
            path: file.path,
            size: file.size,
            mimetype: file.mimetype,
            uploadDate: new Date()
        }));

        console.log('Inserting files into file_upload collection:', files);
        const result = await collection.insertMany(files);
        console.log(`${result.insertedCount} files uploaded to file_upload collection`);

        res.status(200).send('Files uploaded successfully');
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error uploading files');
    } finally {
        await client.close();
        console.log('MongoDB connection closed');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});