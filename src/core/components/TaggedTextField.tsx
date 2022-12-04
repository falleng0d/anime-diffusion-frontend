import { PropsWithoutRef } from "react"

export interface TaggedTextFieldProps extends PropsWithoutRef<JSX.IntrinsicElements["textarea"]> {
  /** Field name. */
  name: string
  /** Field label. */
  label: string
  /** Field placeholder. */
  placeholder?: string
}

export const TaggedTextField = function (props: TaggedTextFieldProps) {
  return (
    <div>
      <label>
        <textarea
          className="border w-full h-24 px-3 py-3 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md"
          placeholder={props.placeholder}
          {...props}
        />
      </label>
    </div>
  )
}
