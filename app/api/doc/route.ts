import { createDoc, delDoc, delTipDoc } from '@/actions/menu';

// add
export async function POST(request: Request) {
  const data = await request.json();
  createDoc(data.id, data.pid);
  return Response.json({ data });
}

// del
export async function DELETE(request: Request) {
  const data = await request.json();
  delDoc(data.ids);
  data.ids.map(async (id: string) => {
    const d = await delTipDoc(id);
    console.log(d, 'delTipDoc');
  });
  return Response.json({ data: 'delete' });
}
