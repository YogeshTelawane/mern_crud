const express = require('express');
const app = express();
const cors = require('cors');
const Employee = require('./db/models/employeeModel')

app.use(express.json())
app.use(cors());

const db = require('./db/config')

db.authenticate().then(() => console.log('Database connected successfully')).catch((err) => console.log(`Database connection failed with error ${err}`))

app.post('/create', async (req, res) => {
    try {
        const { username, email, password, confirmPassword, country, isActive, gender } = req.body;
        const result = await Employee.create({ username, email, password, confirmPassword, country, isActive, gender });

        res.json({ msg: "Employee created", data: result })
    } catch (error) {
        console.log(error)
    }
})

app.get('/list', async (req, res) => {

    try {
        const listEmployees = await Employee.findAll({});
        if(!listEmployees) return res.send("No Data Found")
        return res.status(200).json(listEmployees);
    } catch (error) {
        console.log(error)
    }
})

app.put('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const emp = await Employee.findOne({where: {id}});

        if(!emp) return res.send(`No Employee found with id ${id}`)
        const { username, email, password, confirmPassword, country, isActive, gender } = req.body;
        const result = await Employee.update({ username, email, password, confirmPassword, country, isActive, gender }, {where:{id}});

        return res.json({ msg: "Employee updated" })
    } catch (error) {
        console.log(error)
    }
})

app.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const emp = await Employee.findOne({where: {id}});

        if(!emp) return res.send(`No Employee found with id ${id}`)
        const result = await Employee.destroy({where:{id}});

        return res.json({ msg: "Employee deleted" })
    } catch (error) {
        console.log(error)
    }
})

app.listen(8800, () => console.log('server running on port 8800'))