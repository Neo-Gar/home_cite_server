const db = require('../db')



class NotesController {
    async createItem(req, res){
        let date = new Date()
        console.log(date.toLocaleTimeString(),'New POST createItem')
        const {header, text, author} = req.body
        const newItem = await db.query(
            `INSERT INTO notes (header, text, author)
                values ($1, $2, $3)`, [header, text, author]
        )
        res.sendStatus(200)
        console.log(date.toLocaleTimeString(),'CODE: 200\n')
    }

    async getItems(req, res){
        let date = new Date()
        console.log(date.toLocaleTimeString(),'New GET getItems')
        const items = await db.query(`SELECT * FROM notes`)
        res.json(items.rows)
        console.log(date.toLocaleTimeString(),'CODE: 200\n')
    }

    async getOneItem(req, res){
        let date = new Date()
        console.log(date.toLocaleTimeString(),'New GET getOneItem')
        const id = req.params.id
        const item = await db.query(`SELECT * FROM notes WHERE id = $1`, [id])
        if (item.rows.length !== 0) {
            res.json(item.rows[0])
            console.log(date.toLocaleTimeString(),'CODE: 200\n')
        }
        else {
            res.sendStatus(403)
            console.log(date.toLocaleTimeString(),'CODE: 403\n')
        }
    }

    async updateItem(req, res){
        let date = new Date()
        console.log(date.toLocaleTimeString(),'New PUT updateItem')
        const {id, header, text, author} = req.body
        const idCheck = await db.query(
            `SELECT id FROM notes WHERE id = $1`, [id]
        )
        if (idCheck.rows.length !== 0){
            const item = await db.query(
            `UPDATE notes SET header = $2,
                text = $3,
                author = $4,
                is_edited = TRUE,
                edit_time = CURRENT_TIMESTAMP WHERE id = $1`,
            [id, header, text, author]
            )
            res.sendStatus(200)
            console.log(date.toLocaleTimeString(),'CODE: 200\n')
        }
        else {
            res.sendStatus(403)
            console.log(date.toLocaleTimeString(),'CODE: 403\n')
        }

    }

    async deleteItem(req, res){
        let date = new Date()
        console.log(date.toLocaleTimeString(),'New DELETE deleteItem')
        const id = req.params.id
        const idCheck = await db.query(
            `SELECT id FROM notes WHERE id = $1`, [id]
        )
        if (idCheck.rows.length !== 0) {
            const item = await db.query(`DELETE FROM notes WHERE id = $1`, [id])
            res.sendStatus(200)
            console.log(date.toLocaleTimeString(),'CODE: 200\n')
        }
        else {
            res.sendStatus(403)
            console.log(date.toLocaleTimeString(),'CODE: 403\n')
        }
    }
}

module.exports = new NotesController()