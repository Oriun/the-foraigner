import { GetServerSideProps, GetStaticProps } from "next";
import React from "react";

const Chat = () => {
  return <div>Chat</div>;
};

export default Chat;

export const getStaticProps: GetStaticProps = async () => {
  return {
    redirect: {
      destination: "http://chat.foraigner.com",
      permanent: false,
    },
  };
};
