import { GetServerSideProps } from "next";
import React from "react";

const Auth = () => {
  return <div>Auth</div>;
};

export default Auth;

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: "/auth/login",
      permanent: false,
    },
  };
};
