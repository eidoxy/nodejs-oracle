import oracledb from 'oracledb';

async function createEmployees() {
  let connection;

  try {
    // Membuka koneksi ke Oracle DB
    connection = await oracledb.getConnection({
      user: 'hr',
      password: 'hr',
      connectionString: 'localhost/orclpdb',
    });

    console.log('Successfully connected to Oracle Database');

    // Query untuk insert data ke tabel EMPLOYEES
    const sql = `
      INSERT INTO EMPLOYEES
      (EMPLOYEE_ID, FIRST_NAME, LAST_NAME, EMAIL, PHONE_NUMBER, HIRE_DATE, JOB_ID, SALARY, COMMISSION_PCT, MANAGER_ID, DEPARTMENT_ID)
      VALUES
      (:1, :2, :3, :4, :5, TO_DATE(:6, 'YYYY-MM-DD'), :7, :8, :9, :10, :11)
    `;

    // Data yang akan dimasukkan dalam bentuk array
    const rows = [
      [220, 'Adrian', 'Sondang', 'adriango', '0895350353300', '2005-02-23', 'IT_PROG', 24000, null, 100, 90],
    ];

    console.log('Inserting employees');

    // Menjalankan query untuk insert banyak data sekaligus
    let result = await connection.executeMany(sql, rows);

    console.log("Result is:", result);

    console.log(result.rowsAffected, 'Rows Inserted');

    // Melakukan commit untuk menyimpan perubahan
    await connection.commit();
  } catch (err) {
    console.error('Error inserting employees:', err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error('Error closing connection:', err);
      }
    }
  }
}

// Menjalankan fungsi untuk insert data
createEmployees();