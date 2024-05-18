"use client"

import { TriangleAlert } from "lucide-react";
import { FC } from "react";

interface FormErrorProps {
  message?: string
}

const FormError: FC<FormErrorProps> = (props) => {
  const { message } = props;

  if (!message) return null;

  return (
    <div
      className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive"
    >
      <TriangleAlert 
        className="h-5 w-5"
      />
      <p>{message}</p>
    </div>
  )
}

export { FormError }