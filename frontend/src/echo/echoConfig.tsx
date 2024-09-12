import Echo from "laravel-echo";
import Pusher from "pusher-js";

import { memo, useEffect } from "react";
import useAuthStore from "../zustand/AuthStore";
import axios from "axios";

// pusherJs
// Pusher

(window as any).Pusher = Pusher;

// window.Echo = new Echo({
//     broadcaster: 'reverb',
//     key: import.meta.env.VITE_REVERB_APP_KEY,
//     wsHost: import.meta.env.VITE_REVERB_HOST,
//     wsPort: import.meta.env.VITE_REVERB_PORT ?? 80,
//     wssPort: import.meta.env.VITE_REVERB_PORT ?? 443,
//     forceTLS: (import.meta.env.VITE_REVERB_SCHEME ?? 'https') === 'https',
//     enabledTransports: ['ws', 'wss'],
// });
function EchoConfig() {
  const token = useAuthStore.getState().token;
  useEffect(() => {
    if ((window as any).echo) {
      console.log("Echo is going to be disconnected");
      (window as any).echo.disconnect();
    }
    console.log("Echo is going to be connected");
    var echo = new Echo({
      broadcaster: "reverb",
      key: "s3w3thzezulgp5g0e5bs",
      wsHost: "localhost",
      wsPort: 8080,
      wssPort: 8080,
      forceTLS: false,
      enabledTransports: ["ws", "wss"],
      authEndpoint: "http://localhost:8000/broadcasting/auth",
      // transports: ["websocket", "polling", "flashsocket"],
      auth: {
        headers: {
          Authorization: `${token}`,
        },
      },

      

      authorizer: (channel, options) => {
        return {
            authorize: (socketId, callback) => {
                axios.post('http://localhost:8000/broadcasting/auth', {

                    socket_id: socketId,
                    channel_name: channel.name,
                  }, { withCredentials: true,headers:{ Authorization: `${token}`,}  })
                .then(response => {
                    callback(false, response.data);
                })
                .catch(error => {
                    callback(true, error);
                });
            }
        };
    }

    }); //ech

    // initialEcho(getToken())

    echo.connector.pusher.connection.bind("state_change", (states: any) => {
      // console.log(states)
      const { current, previous } = states;
      if (current === "disconnected") {
        // toast.error("Socket is disconnected!", { position: "top-right" });
        console.log('Echo disconnected');
      } else if (current === "connected") {
        // toast.success("Socket is connected", { position: "top-right" });
        console.log('Echo connected');
        // Optionally handle reconnection
      }
    }); //echo

    (window as any).echo = echo;
  }, [token]);
  return null;
}

export default memo(EchoConfig);
// echo.connect()

