import { AuthenticationError, PromiseReturnType } from "blitz"
import Link from "next/link"
import { LabeledTextField } from "src/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "src/core/components/Form"
import login from "src/auth/mutations/login"
import { Login } from "src/auth/validations"
import { useMutation } from "@blitzjs/rpc"
import { Routes } from "@blitzjs/next"

type LoginFormProps = {
  onSuccess?: (user: PromiseReturnType<typeof login>) => void
}

export const LoginForm = (props: LoginFormProps) => {
  const [loginMutation] = useMutation(login)
  return (
    <div className="relative flex min-h-screen text-gray-800 antialiased flex-col justify-center overflow-hidden bg-gray-50 py-6 sm:py-12">
      <div className="relative py-3 sm:w-96 mx-auto text-center">
        <span className="text-2xl font-light ">Login to your account</span>
        <div className="mt-4 bg-white shadow-md rounded-lg text-left">
          <div className="h-2 bg-purple-400 rounded-t-md"></div>
          <div className="px-8 py-6">
            <Form
              schema={Login}
              initialValues={{ email: "", password: "" }}
              onSubmit={async (values) => {
                try {
                  const user = await loginMutation(values)
                  props.onSuccess?.(user)
                } catch (error: any) {
                  if (error instanceof AuthenticationError) {
                    return { [FORM_ERROR]: "Sorry, those credentials are invalid" }
                  } else {
                    return {
                      [FORM_ERROR]:
                        "Sorry, we had an unexpected error. Please try again. - " + error.toString()
                    }
                  }
                }
              }}
              useToast={true}
            >
              <LabeledTextField
                name="email"
                label="Email"
                placeholder="Email"
                className="border w-full mb-4 h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md"
                labelProps={{ className: "block font-semibold" }}
              />
              <LabeledTextField
                name="password"
                label="Password"
                placeholder="Password"
                type="password"
                className="border w-full mb-4 h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md"
                labelProps={{ className: "block font-semibold" }}
              />

              <div className="flex justify-between items-baseline mb-4">
                <button
                  type="submit"
                  className="mt-4 px-2 bg-purple-500 text-white py-2 t6 rounded-md hover:bg-purple-600"
                >
                  Login
                </button>
                <Link href={Routes.ForgotPasswordPage()}>
                  <a className="text-sm hover:underline">Forgot your password?</a>
                </Link>
              </div>

              <div className="flex justify-center items-baseline">
                <Link href={Routes.SignupPage()}>
                  <a className="text-sm hover:underline">Sign Up Instead</a>
                </Link>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginForm
