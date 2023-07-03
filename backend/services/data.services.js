import { client } from "../index.js";
import { ObjectId } from 'mongodb';

export async function postmobile(data) {
  return await client.db("student").collection("data").insertOne(data);
}
export async function getmobile() {
  return await client.db("student").collection("data").find({}).toArray();
}
export async function deletemobile(id) {
  console.log("inside")
  return await client.db("student").collection('data').deleteOne({_id:new ObjectId(id)});
}
export async function updatemobile(id,body) {
  // console.log('password updTE')
  console.log(body);
  return client.db('student').collection('data').updateOne({_id:new ObjectId(id)},{$set:{avatar:body.avatar,name:body.name,field:body.field,division:body.division}});
}
export async function getmobileid(id) {
    return await client.db("student").collection("data").findOne({_id:new ObjectId(id)});
  }
