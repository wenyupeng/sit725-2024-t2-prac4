const express = require('express');
const { MongoClient } = require('mongodb')

const port = process.env.PORT || 3000;
const url = 'mongodb+srv://wen0424068311:wen0424068311@cluster0.xo2dvru.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const app = express();
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true })

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('index');
})

app.get('/index/cards', async (req, res, next) => {
    try {
        await client.connect;
        const collection = client.db('sit725').collection('week04');
        const fResult = collection.find({ title: { $in: ['Week01', 'Week02', 'Week03',] } });
        const result = await fResult.toArray();
        // console.log(result);
        res.send(result);
    } catch (err) {
        next(err)
    }

})

app.post('/user', async (req, res, next) => {
    try {
        let user = req.body;
        await client.connect;
        const collection = client.db('sit725').collection('week04');
        await collection.deleteMany({firstName:'Chris'})
        await collection.insertOne(user);
        res.send({message:"ok"});
    } catch (err) {
        next(err)
    }
})



app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})



