const express = require('express');
const cors = require('cors');
const app = express();
const jsonData = require('./data/sales')
// Enable CORS for all routes
app.use(cors());

app.get('/getAll', (req, res) => {
    if (!jsonData) {
        throw new Error('Data not found');
    } else {
        res.json(jsonData);
    }
});

app.get('/getStoreData/:store', (req, res) => {
    let store = req.params.store;
    let start = req.query.start;
    let end = req.query.end;
    if (!jsonData) {
        throw new Error('Data not found');
    } else {
        let data = jsonData.filter(item => item.Store === store);

        if (start && end) {
            // Filter data based on the provided date range
            data = data.filter(item => {
                const itemDate = new Date(item.OrderDate);
                return itemDate >= new Date(start) && itemDate <= new Date(end);
            });
        }
        res.json(data);
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        error: {
            message: err.message || 'Internal Server Error'
        }
    });
});

// Start the server
app.listen(4000, () => {
    console.log(`Server Started at ${4000}`);
});
