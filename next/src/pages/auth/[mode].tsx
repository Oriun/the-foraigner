import React from "react";
import Auth from "@/views/auth";
import { GetServerSideProps } from "next";

type LoginProps = {
  defaultMode: "login" | "register";
};

const Login: React.FC<LoginProps> = ({ defaultMode }) => {
  return (
    <>
      <Auth defaultMode={defaultMode} />
    </>
  );
};

export default Login;

export const getServerSideProps: GetServerSideProps<LoginProps> = async ({
  query,
}) => {
  return {
    props: {
      defaultMode: query.mode as "login" | "register",
    },
  };
};
