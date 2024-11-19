import getConnection from '../database/index.js';  
import oracledb from 'oracledb';

export async function getEmployees(req, res) {
  const connection = await getConnection();

  try {
    if (!connection) {
      throw new Error('Database connection failed');
    }
    
    const query = await connection.execute(
      `
        SELECT
          e.EMPLOYEE_ID AS NIP,
          j.JOB_TITLE AS Pekerjaan,
          e.FIRST_NAME || ' ' || e.LAST_NAME AS NamaPegawai,
          NVL(m.FIRST_NAME || ' ' || m.LAST_NAME, 'No Manager') AS Manager
        FROM
          EMPLOYEES e
        JOIN JOBS j
          ON e.JOB_ID = j.JOB_ID
        LEFT JOIN EMPLOYEES m
          ON e.MANAGER_ID = m.EMPLOYEE_ID
      `
    );

    await connection.commit();

    res.json(query.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving employees');
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

export async function createEmployee(req, res) {
  const connection = await getConnection();
  const { employee_id, first_name, last_name, email, phone_number, hire_date, job_id, salary, commission_pct, manager_id, department_id } = req.body;

  try {
    if (!connection) {
      throw new Error('Database connection failed');
    }

    await connection.execute(
      `
          INSERT INTO EMPLOYEES 
          (EMPLOYEE_ID, FIRST_NAME, LAST_NAME, EMAIL, PHONE_NUMBER, HIRE_DATE, JOB_ID, SALARY, COMMISSION_PCT, MANAGER_ID, DEPARTMENT_ID)
          VALUES (:employee_id, :first_name, :last_name, :email, :phone_number, TO_DATE(:hire_date, 'YYYY-MM-DD'), :job_id, :salary, :commission_pct, :manager_id, :department_id)
          `,
      { employee_id, first_name, last_name, email, phone_number, hire_date, job_id, salary, commission_pct, manager_id, department_id }
    );

    res.send('Employee inserted successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error inserting employee');
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

export async function updateEmployee(req, res) {
  const connection = await getConnection();

  const id = parseInt(req.params.id);

  console.log(id)
  
  const { employee_id, manager_id, salary } = req.body;

  try {
    if (!connection) {
      throw new Error('Database connection failed');
    }

    await connection.execute(
      `
      UPDATE EMPLOYEES
      SET MANAGER_ID = :manager_id, SALARY = :salary
      WHERE EMPLOYEE_ID = :employee_id
      `,
      { employee_id, manager_id, salary }
    );

    res.send('Employee updated successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error updating employee');
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

export async function deleteEmployee(req, res) {
  const connection = await getConnection();
  const { job_id, ename } = req.body;

  try {
    if (!connection) {
      throw new Error('Database connection failed');
    }

    console.log(req.body);
    
    await connection.execute(
      `
      DELETE FROM EMPLOYEES
      WHERE JOB_ID = :job_id AND FIRST_NAME || ' ' || LAST_NAME = :ename
      `,
      { job_id, ename }
    );

    res.send('Employee deleted successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error deleting employee');
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}