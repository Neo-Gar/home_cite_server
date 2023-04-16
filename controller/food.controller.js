const db = require('../db')



class FoodController {
    async createItem(req, res){
        let date = new Date()
        console.log(date.toLocaleTimeString(),'New POST createItem')
        const {header, description, img_name} = req.body
        const newItem = await db.query(
            `INSERT INTO food (header, description, img_name)
                values ($1, $2, $3)`, [header, description, img_name]
        )
        res.sendStatus(200)
        console.log(date.toLocaleTimeString(),'CODE: 200')
    }

    async getItems(req, res){
        let date = new Date()
        console.log(date.toLocaleTimeString(),'New GET getItems')
        const items = await db.query(`SELECT * FROM food`)
        res.json(items.rows)
        console.log(date.toLocaleTimeString(),'CODE: 200')
    }

    async getOneItem(req, res){
        let date = new Date()
        console.log(date.toLocaleTimeString(),'New GET getOneItem')
        const id = req.params.id
        const item = await db.query(`SELECT * FROM food WHERE id = $1`, [id])
        if (item.rows.length !== 0) {
            res.json(item.rows[0])
            console.log(date.toLocaleTimeString(),'CODE: 200')
        }
        else {
            res.sendStatus(403)
            console.log(date.toLocaleTimeString(),'CODE: 403')
        }
    }

    async updateItem(req, res){
        let date = new Date()
        console.log(date.toLocaleTimeString(),'New PUT updateItem')
        const {id, header, description, img_name} = req.body
        const idCheck = await db.query(
            `SELECT id FROM food WHERE id = $1`, [id]
        )
        if (idCheck.rows.length !== 0){
            const item = await db.query(
            `UPDATE food SET header = $2,
                description = $3,
                img_name = $4,
                is_edited = TRUE,
                edit_time = CURRENT_TIMESTAMP WHERE id = $1`,
            [id, header, description, img_name]
            )
            res.sendStatus(200)
            console.log(date.toLocaleTimeString(),'CODE: 200')
        }
        else {
            res.sendStatus(403)
            console.log(date.toLocaleTimeString(),'CODE: 403')
        }

    }

    async deleteItem(req, res){
        let date = new Date()
        console.log(date.toLocaleTimeString(),'New DELETE deleteItem')
        const id = req.params.id
        const idCheck = await db.query(
            `SELECT id FROM food WHERE id = $1`, [id]
        )
        if (idCheck.rows.length !== 0) {
            const item = await db.query(`DELETE FROM food WHERE id = $1`, [id])
            res.sendStatus(200)
            console.log(date.toLocaleTimeString(),'CODE: 200')
        }
        else {
            res.sendStatus(403)
            console.log(date.toLocaleTimeString(),'CODE: 403')
        }
    }
}

module.exports = new FoodController()