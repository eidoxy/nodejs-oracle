import { Router } from "express";

import {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../controllers/employees.controller.js";

const router = Router();

router
  .get('/employees', getEmployees)
  .post('/create/employees', createEmployee)
  .put('/edit/employees/:id', updateEmployee)
  .delete('/delete/employees/:id', deleteEmployee);

export default router;