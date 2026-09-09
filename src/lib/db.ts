import mysql from 'mysql2/promise';

const initPool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  waitForConnections: true,
  connectionLimit: 2,
});

async function initializeDatabase() {
  try {
    const dbName = process.env.DB_NAME || 'task_board_db';
    
    await initPool.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\`;`);
    
    const pool = mysql.createPool({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: dbName,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });

    await pool.query(`
      CREATE TABLE IF NOT EXISTS tasks (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        status ENUM('todo', 'in-progress', 'done') NOT NULL DEFAULT 'todo',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    return pool;
  } catch (error) {
    console.error('Database initialization failed:', error);
    throw error;
  }
}


const pool = {
  async query<T>(sql: string, values?: any): Promise<T> {
    const dbPool = await initializeDatabase();
    return dbPool.query(sql, values) as unknown as T;
  }
};

export default pool;