import React, { useContext, useEffect } from "react";
import IDE from "../components/IDE";
import Header from "../components/Header";
import Whiteboard from "../components/Whiteboard";
import { Split } from "@geoffcox/react-splitter";
import Input from "../components/InputBox";
import Output from "../components/OutputBox";

import { io } from "socket.io-client";
import { API } from "../backend";
import { editorDetailsContext } from "../context/GlobalContext";

const Editor = () => {
  let socket;
  socket = io(new URL(API).origin, {
      // path: '/socket/'
      withCredentials: true
  });
  const { darkMode } = useContext(editorDetailsContext);
  useEffect(() => {
    console.log(`Connecting socket...`);

    return () => {
      if (socket) socket.disconnect();
    };
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Header />
      <div className={`${darkMode ? "PrimaryDark" : ""}`}>
          <Split
            horizontal
            initialPrimarySize="70%"
            minPrimarySize="20px"
            minSecondarySize="20px"
          >
            <IDE socket={socket} />
            <Split
                initialPrimarySize="50%"
                minPrimarySize="20px"
                minSecondarySize="20px"
            >
              <Input />
              <Output />
            </Split>
          </Split>
      </div>
    </>
  );
};

export default Editor;
