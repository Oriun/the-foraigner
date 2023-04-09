import { GetServerSideProps } from "next";
import React from "react";

const Chat = () => {
  return <div>Chat</div>;
};

export default Chat;

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: "http://chat.foraigner.com",
      permanent: false,
    },
  };
};
