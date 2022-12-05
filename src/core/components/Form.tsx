import { PropsWithoutRef, ReactNode, useEffect } from "react"
import { FormRenderProps } from "react-final-form"
import { z } from "zod"
import { toast } from "react-hot-toast"
import { validateZodSchema } from "blitz"
import { Form as FinalForm, FormProps as FinalFormProps } from "react-final-form"

export { FORM_ERROR } from "final-form"

type ZodAny = z.ZodType<any, any>

export interface RenderFormProps<S extends ZodAny>
  extends Omit<PropsWithoutRef<JSX.IntrinsicElements["form"]>, "onSubmit"> {
  useToast?: boolean
  submitError?: string
  children?: ReactNode
  formProps: FormRenderProps<z.infer<S>>
}

function RenderForm<S extends ZodAny>({
  useToast,
  submitError,
  children,
  formProps,
  ...props
}: RenderFormProps<S>) {
  useEffect(() => {
    if (!useToast || !submitError) return
    toast.error(submitError)
  }, [submitError, useToast])

  return (
    <form className="form" onSubmit={formProps.handleSubmit} {...props}>
      {children}
    </form>
  )
}

export interface FormProps<S extends ZodAny>
  extends Omit<PropsWithoutRef<JSX.IntrinsicElements["form"]>, "onSubmit"> {
  /** All your form fields */
  children?: ReactNode
  /** Text to display in the submit button */
  submitText?: string
  schema?: S
  onSubmit: FinalFormProps<z.infer<S>>["onSubmit"]
  initialValues?: FinalFormProps<z.infer<S>>["initialValues"]
}

export function Form<S extends ZodAny>({
  children,
  submitText,
  schema,
  initialValues,
  onSubmit,
  ...props
}: FormProps<S>) {
  return (
    <FinalForm
      initialValues={initialValues}
      validate={validateZodSchema(schema)}
      onSubmit={onSubmit}
      render={({ handleSubmit, submitting, submitError }) => (
        <form onSubmit={handleSubmit} className="form" {...props}>
          {/* Form fields supplied as children are rendered here */}
          {children}

          {submitError && (
            <div role="alert" style={{ color: "red" }}>
              {submitError}
            </div>
          )}

          {submitText && (
            <button type="submit" disabled={submitting}>
              {submitText}
            </button>
          )}

          <style global jsx>{`
            .form > * + * {
              margin-top: 1rem;
            }
          `}</style>
        </form>
      )}
    />
  )
}

export default RenderForm
