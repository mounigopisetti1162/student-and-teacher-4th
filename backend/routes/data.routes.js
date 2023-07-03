import express from 'express'
import { client } from '../index.js';
import { auth } from '../middleware/auth.js';
import { getmobile, getmobileid,postmobile,deletemobile,updatemobile } from '../services/data.services.js';
const router=express.Router()
router.get('/', async function (request, responce) {
  const mobile = await getmobile();
  responce.send(mobile);
});
router.get('/:id', async function (request, responce) {
    const {id}=request.params
    const mobile = await getmobileid(id);
    responce.send(mobile);
  });
router.post('/', async function (request, responce) {
  const data = request.body;
  const newmobile = await postmobile(data);
  responce.send(newmobile);
});
router.put('/:id',async function(request,responce)
{
const {id}=request.params;
const body=request.body;
const update=await updatemobile(id,body)
responce.send(update)
})

router.delete('/:id',async function (request,responce)
{
  const {id}=request.params;
  console.log("deleted")
  console.log(id)
  const result=await deletemobile(id)
  responce.send(result)
})
export default router;



