import { Socket } from 'phoenix-socket';

export function configureChannel() {
  let socket = new Socket('ws://54.154.142.114/socket');
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
