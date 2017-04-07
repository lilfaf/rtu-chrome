import { Socket } from 'phoenix-socket';

const socket = new Socket('wss://rtu-server.herokuapp.com/socket');
socket.connect();

const channel = socket.channel('track:*');
channel.join()
  .receive('ok', () => { console.log('connected') })
  .receive('error', (reason) => { console.log(reason) });

export default channel;
