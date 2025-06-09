import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import { Patient } from './models/patient.models.js';
import { Doctor } from './models/doctor.models.js';
import { Hospital } from './models/hospital.models.js';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(`${process.env.MONGO_DB_URL}`).then(() => {
  app.on('error', (error) => {
    console.error("Error: server connection failed ",error);
  }).post('/patients', async (req, res) => {
    try {
      const patient = new Patient(req.body);
      await patient.save();
      res.status(201).send(patient);
    } catch (error) {
      res.status(400).send(error);
    }
  }).get('/patients', async (req, res) => {
    try {
      const patients = await Patient.find().populate('admittedIn');
      res.send(patients);
    } catch (error) {
      res.status(500).send(error);
    }
  }).post('/appointments', async (req, res) => {
    try {
      const { patientId, doctorId, hospitalId } = req.body;
      const patient = await Patient.findById(patientId);
      const doctor = await Doctor.findById(doctorId);
      const hospital = await Hospital.findById(hospitalId);
  
      if (!patient || !doctor || !hospital) {
        return res.status(404).send({ error: 'Invalid data provided' });
      }
  
      res.status(200).send({ message: 'Appointment requested successfully' });
    } catch (error) {
      res.status(400).send(error);
    }
  }).listen(3000, () => {
    console.log('Server is running on port 3000');
  });
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});



