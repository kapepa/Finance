import { FC, ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode,
}

const AuthLayout: FC<AuthLayoutProps> = (props) => {
  const { children } = props;

  return (
    <main
      className="h-full flex items-center justify-center bg-sky-500"
    >
      {children}
    </main>
  )
}

export default AuthLayout;