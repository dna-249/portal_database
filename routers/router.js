
const express = require('express');
const studentRouter = express.Router()

const { postStudent,putSetStudent,putPullStudent, putPushStudent, deleteOneStudent,putOneStudent,getOneStudent,getAllStudent } = require("../controllers/controller");
  





studentRouter.post('/create', postStudent)
studentRouter.get('/', getAllStudent)
studentRouter.get('/:_id', getOneStudent)
studentRouter.put('/push/:id/:object', putPushStudent)
studentRouter.put('/:_id', putOneStudent)
studentRouter.put('/pull/:_id/:_id2/:object', putPullStudent)
studentRouter.put('/set/:_id/:object/:index/:key', putSetStudent)
studentRouter.delete("/:_id", deleteOneStudent)




module.exports = { studentRouter };
