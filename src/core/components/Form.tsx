import { ReactNode, PropsWithoutRef, useEffect } from "react"
import { Form as FinalForm, FormProps as FinalFormProps, FormRenderProps } from "react-final-form"
import { z, ZodType } from "zod"
import { validateZodSchema } from "blitz"
export { FORM_ERROR } from "final-form"
import { toast } from "react-hot-toast"
import { MutatorFunc } from "src/core/utils/final-form"

type ZodAny = ZodType<any, any, any>

export interface RenderFormProps {
  submitText?: string
  useToast?: boolean
  submitError?: string
  submitting?: boolean
  formProps: PropsWithoutRef<JSX.IntrinsicElements["form"]>
  handleSubmit: FormRenderProps["handleSubmit"]
  children?: ReactNode
}

//  FormRenderProps<any, Partial<z.TypeOf<S>>>
function RenderForm<S extends ZodAny>({
  submitText,
  useToast,
  submitError,
  children,
  submitting,
  formProps,
  handleSubmit
}: RenderFormProps) {
  useEffect(() => {
    if (!useToast || !submitError) return
    toast.error(submitError)
  }, [submitError, useToast])

  return (
    <form className="form" onSubmit={handleSubmit} {...formProps}>
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
    </form>
  )
}

export interface FormProps<S extends ZodAny>
  extends Omit<PropsWithoutRef<JSX.IntrinsicElements["form"]>, "onSubmit"> {
  useToast?: boolean
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
  useToast,
  ...props
}: FormProps<S>) {
  return (
    <FinalForm
      initialValues={initialValues}
      validate={validateZodSchema(schema)}
      onSubmit={onSubmit}
      render={({ handleSubmit, submitting, submitError }) => (
        <RenderForm
          formProps={props}
          submitText={submitText}
          useToast={useToast}
          handleSubmit={handleSubmit}
          submitting={submitting}
          submitError={submitError}
        >
          {children}
        </RenderForm>
      )}
    />
  )
}

/*
       render={({ handleSubmit, submitting, submitError }) => (
        <form onSubmit={handleSubmit} className="form" {...props}>
          {/* Form fields supplied as children are rendered here /}
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
        </form>
      )}
*/
export default Form
