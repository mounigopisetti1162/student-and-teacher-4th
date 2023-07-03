import { client } from "../index.js";
export async function postuser(data) {
  return await client.db("student").collection("login").insertOne(data);
}
export async function getuser(username) {
  return await client.db("student").collection("login").findOne({username:username});
}
export async function getalluser() {
  return await client.db("student").collection("login").find({}).toArray();
}

