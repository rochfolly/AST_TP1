const express = require('express')

module.exports = function(){
  const crud = {
    create: (req,res) => {

    },
    read: (req,res) => {

    },
    delete: (req, res) => {

    },
    delete: (req, res) => {

    }
  }

  const router = express.Router()

  module.exports = router
    .get('/', crud.readAll)
    .get('/:id', crud.read)
    .post('/:id', crud.update)
    .delete('/:id', crud.delete)
}
