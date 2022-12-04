import { ReactNode, useEffect } from "react"
import { FormRenderProps } from "react-final-form"
import { ZodType } from "zod"
import { toast } from "react-hot-toast"

export { FORM_ERROR } from "final-form"

type ZodAny = ZodType<any, any, any>

export interface RenderFormProps {
  useToast?: boolean
  submitError?: string
  formProps: FormRenderProps
  children?: ReactNode
}

//  FormRenderProps<any, Partial<z.TypeOf<S>>>
function RenderForm<S extends ZodAny>({
  useToast,
  submitError,
  children,
  formProps
}: RenderFormProps) {
  useEffect(() => {
    if (!useToast || !submitError) return
    toast.error(submitError)
  }, [submitError, useToast])

  return (
    <form className="form" onSubmit={formProps.handleSubmit} {...formProps}>
      {children}
      {/*{submitError && (
        <div role="alert" style={{ color: "red" }}>
          {submitError}
        </div>
      )}

      {submitText && (
        <button type="submit" disabled={submitting}>
          {submitText}
        </button>
      )}*/}
    </form>
  )
}

/*
export interface FormProps<S extends ZodAny>
  extends Omit<PropsWithoutRef<JSX.IntrinsicElements["form"]>, "onSubmit"> {
  useToast?: boolean
  /!** All your form fields *!/
  children?: ReactNode
  /!** Text to display in the submit button *!/
  submitText?: string
  schema?: S
  onSubmit: FinalFormProps<z.infer<S>>["onSubmit"]
  initialValues?: FinalFormProps<z.infer<S>>["initialValues"]
}
*/

/*
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
*/

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
export default RenderForm
