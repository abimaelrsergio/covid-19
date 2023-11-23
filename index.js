import express from 'express';
import axios from 'axios';
import dayjs from 'dayjs';

const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/', async(req, res) => {
    try {
        const result = await axios.get('https://covid19-brazil-api.now.sh/api/report/v1');
        const report = result.data;
        res.render('index.ejs', { data: report.data });
    } catch(error) {
        console.error('Failed to make the request: ', error.response.data);
        res.render("index.ejs", { error: JSON.stringify(error.message) });
    }
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
