import useSwrMutation from 'swr/mutation';

export const useDocAdd = () =>
  useSwrMutation(
    '/api/doc/add',
    (_, { arg }: { arg: { id: string; pid?: string } }) =>
      fetch('/api/doc', {
        method: 'POST',
        body: JSON.stringify(arg),
      })
  );

export const useDocDel = () =>
  useSwrMutation('/api/doc/del', (_, { arg }: { arg: { ids: string[] } }) =>
    fetch('/api/doc', {
      method: 'DELETE',
      body: JSON.stringify(arg),
    })
  );
