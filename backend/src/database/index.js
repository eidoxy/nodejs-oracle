import oracledb from 'oracledb';
import 'dotenv/config';

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

export default async function getConnection() {
  try {
    await oracledb.initOracleClient({ libDir: 'D:\\Dev\\instantclient-basic\\instantclient_19_25' });
    const conn = await oracledb.getConnection({
      user: "hr",
      password: "hr",
      connectString: "localhost/orclpdb",
    });

    return conn;
  } catch (err) {
    console.error('Error while connecting to Database', err);
  }
}