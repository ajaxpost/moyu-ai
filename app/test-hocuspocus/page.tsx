'use client';
import { HocuspocusProvider } from '@hocuspocus/provider';

export default function Page() {
  // Connect it to the backend
  const provider = new HocuspocusProvider({
    url: 'ws://127.0.0.1:9090',
    name: 'example-document',
  });

  // Define `tasks` as an Array
  const tasks = provider.document.getArray('tasks');

  // Listen for changes
  tasks.observe(() => {
    console.log('tasks were modified');
  });

  const handlerClick = async () => {
    // Add a new task
    tasks.push(['buy milk']);
  };
  return (
    <>
      <button onClick={handlerClick}>点击</button>
    </>
  );
}
