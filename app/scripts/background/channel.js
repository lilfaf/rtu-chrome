import { Socket } from 'phoenix-socket';

export function configureChannel() {
  let socket = new Socket('ws://localhost:4000/socket');
  socket.connect();

  let channel = socket.channel('track:*');

  channel.join()
    .receive('ok', (payload) => {
      console.log('Joined channel !');
    })
    .receive('error', (reason) => {
      console.log('Channel join error');
      console.log(reason);
    });

  return channel;
}
