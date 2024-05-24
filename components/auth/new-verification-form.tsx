"use client"

import { FC, useCallback, useLayoutEffect, useState } from "react";
import { CardWrapper } from "./card-wrapper";
import { Routers } from "@/enum/routers";
import { PulseLoader } from "react-spinners";
import { newVerification } from "@/actions/new-verification";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";

interface NewVerificationFormProps {
  token: string
}

const NewVerificationForm: FC<NewVerificationFormProps> = (props) => {
  const { token } = props;
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);

  const onSubmint = useCallback(() => {
    if (!!error || !!success) return;
    if (!token) return setError("Missing token");

    newVerification(token)
    .then((res) => {
      if (!!res.success) {
        setError(undefined)
        setSuccess(res.success)
      }
      if (!!res.error) {
        setSuccess(undefined)
        setError(res.error)
      }
    })
    .catch(() => {
      setSuccess(undefined)
      setError("Something went wrong")
    })
  }, [token, error, success]);

  useLayoutEffect(() => {
    onSubmint();
  }, [onSubmint])

  return (
    <CardWrapper
      headerLabel="Confirmation your verification"
      backButtonLabel="Back to login"
      backButtonHref={Routers.Login}
    >
      <div
        className="flex items-center w-full justify-center"
      >
        {
          !(error || success) && (
            <PulseLoader/>
          )
        }
        <FormError
          message={error}
        />
        <FormSuccess
          message={success}
        />
      </div>
    </CardWrapper>
  )
}

export { NewVerificationForm }