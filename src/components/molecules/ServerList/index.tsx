import { Server } from "../../atoms/Servers";


export const SERVERS = [
    { key: 1, name: 'Chernarus PLUS 3PP', online: 115, status: true,  hours: 312},
    { key: 2, name: 'Livonia PLUS 3PP', online: 150, status: true, hours: 222},
    { key: 3, name: 'Chernarus PLUS 3PP', online: 0, status: false, hours: 111},
    { key: 4, name: 'Chernarus PLUS 3PP', online: 115, status: true, hours: 543},
  ];

export const ServerList = () => {
  return (
    <div className="container mt-16 flex flex-col items-center sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {SERVERS.map(({key, name, online, status}) => <Server key={key} name={name} online={online} status={status}/>)}
    </div>
  )
}
