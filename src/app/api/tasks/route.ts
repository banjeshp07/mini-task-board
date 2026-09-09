import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

export async function GET() {
  try {
    const res: any = await db.query('SELECT * FROM tasks ORDER BY created_at DESC');
    const rows = res[0] as RowDataPacket[];
    return NextResponse.json(rows, { status: 200 });
  } catch (err) {
    console.error('Error fetching tasks:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title } = body;

    if (!title || typeof title !== 'string' || title.trim() === '') {
      return NextResponse.json({ error: 'Task title cannot be empty' }, { status: 400 });
    }

    const cleanTitle = title.trim();
    const defaultStatus = 'todo';

    const res: any = await db.query(
      'INSERT INTO tasks (title, status) VALUES (?, ?)',
      [cleanTitle, defaultStatus]
    );
    const result = res[0] as ResultSetHeader;

    const newTask = {
      id: result.insertId,
      title: cleanTitle,
      status: defaultStatus,
      created_at: new Date().toISOString()
    };

    return NextResponse.json(newTask, { status: 201 });
  } catch (err) {
    console.error('Error creating task:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}