import { expect } from "chai";
import { describe, it, before, after } from "mocha";
import supertest from "supertest";
import mongoose from "mongoose";
import { isValidObjectId } from "mongoose";

import userModel from "../src/dao/models/User.js";
import petModel from "../src/dao/models/Pet.js";
import adoptionModel from "../src/dao/models/Adoption.js";

await mongoose.connect(
  `mongodb+srv://UselessMawi:123321@pruebas-cluster.0pb2xbo.mongodb.net/?retryWrites=true&w=majority&appName=pruebas-cluster&dbName=adoptmedb`
);

const requester = supertest("http://localhost:8080");

let testUser, testPet, testAdoption;

describe("Pruebas router adoptions", function () {
  this.timeout(10000);

  before(async () => {
    // Creamos un usuario de prueba
    testUser = await userModel.create({
      first_name: "Max",
      last_name: "Test",
      email: "testuser@example.com",
      password: "test123",
    });

    // Creamos una mascota de prueba
    testPet = await petModel.create({
      name: "Pelusa",
      specie: "Mascota de prueba",
      birthDate: "2023-05-05",
    });
  });

  after(async () => {
    // Eliminar adopción si se creó
    if (testAdoption) {
      await adoptionModel.deleteOne({ _id: testAdoption._id });
    }

    // Eliminar mascota y usuario de prueba
    await petModel.deleteOne({ _id: testPet._id });
    await userModel.deleteOne({ _id: testUser._id });

    await mongoose.connection.close();
  });

  it("✅ POST /api/adoptions/:uid/:pid Debe Crear una Adopción", async () => {
    const { body } = await requester
      .post(`/api/adoptions/${testUser._id}/${testPet._id}`)
      .send();

    console.log("Respuesta: ", body);

    expect(body).to.have.property("status", "success");
    expect(body).to.have.property("message", "Pet adopted");

    // Guardar para test siguiente
    testAdoption = await adoptionModel.findOne({
      owner: testUser._id,
      pet: testPet._id,
    });

    expect(testAdoption).to.exist;
    expect(isValidObjectId(testAdoption._id)).to.be.true;
  });

  it("✅ GET /api/adoptions Debe Devolver un Array con las Adopciones", async () => {
    const { body } = await requester.get("/api/adoptions").send();

    console.log("Respuesta: ", body);

    expect(body).to.have.property("status", "success");
    expect(body.payload).to.be.an("array");

    const found = body.payload.find(
      (a) => String(a._id) === String(testAdoption._id)
    );
    expect(found).to.exist;
  });

  it("✅ GET /api/adoptions/:aid Debe Devolver la Adopción Correspondiente", async () => {
    const { body } = await requester
      .get(`/api/adoptions/${testAdoption._id}`)
      .send();

    const user = await userModel.findById(body.payload.owner);
    const pet = await petModel.findById(body.payload.pet);

    console.log("Usuario adoptante:", user);
    console.log("Mascota adoptada:", pet);

    expect(user).to.have.property("email", testUser.email);
    expect(pet).to.have.property("name", testPet.name);
    expect(body).to.have.property("status", "success");
    expect(body.payload).to.have.property("_id", String(testAdoption._id));
  });

  it('Debe Devolver 404 si el Usuario no Existe', async () => {
    const response = await requester.post('/api/adoptions/123456789012345678901234');
    expect(response.status).to.equal(404);
    console.log("Usuario no encontrado.");
  });
});
