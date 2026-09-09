import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { ResultSetHeader } from 'mysql2';

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const taskId = resolvedParams.id;
    const body = await request.json();
    const { status } = body;

    const allowedStatuses = ['todo', 'in-progress', 'done'];
    if (!status || !allowedStatuses.includes(status)) {
      return NextResponse.json({ error: 'Invalid status value' }, { status: 400 });
    }

    const res: any = await db.query(
      'UPDATE tasks SET status = ? WHERE id = ?',
      [status, taskId]
    );
    const result = res[0] as ResultSetHeader;

    if (result.affectedRows === 0) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Task updated successfully' }, { status: 200 });
  } catch (err) {
    console.error('Error updating task:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const taskId = resolvedParams.id;

    const res: any = await db.query(
      'DELETE FROM tasks WHERE id = ?',
      [taskId]
    );
    const result = res[0] as ResultSetHeader;

    if (result.affectedRows === 0) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Task deleted successfully' }, { status: 200 });
  } catch (err) {
    console.error('Error deleting task:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}