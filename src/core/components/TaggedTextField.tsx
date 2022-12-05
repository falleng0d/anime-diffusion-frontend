import React, { PropsWithoutRef } from "react"
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query"

/**
 * clsx is a small utility for constructing className strings conditionally. It has zero
 * dependencies.
 */
export function clsx(
  ...args: (string | number | boolean | undefined | null | Record<string, boolean>)[]
): string {
  const classes = new Set()

  for (const arg of args) {
    if (!arg) continue

    if (typeof arg === "string" || typeof arg === "number") {
      if (typeof arg === "string") {
        classes.add(arg)
      } else {
        classes.add(arg.toString())
      }
    } else if (Array.isArray(arg) && arg.length) {
      const inner = clsx(...arg)
      if (inner) {
        classes.add(inner)
      }
    } else if (typeof arg === "object") {
      for (const key in arg) {
        if (arg[key]) {
          classes.add(key)
        }
      }
    }
  }

  return Array.from(classes).join(" ")
}

/**
 * A remove button for the tag. It consists of an X icon.
 * @param props
 */
export const RemoveButton = (props: PropsWithoutRef<JSX.IntrinsicElements["button"]>) => (
  <button
    type="button"
    aria-label="Remove Tag"
    {...props}
    className={clsx("text-center fill-blue-800 cursor-pointer hover:fill-red-500", props.className)}
  >
    <svg data-icon="small-cross" width="16" height="16" viewBox="0 0 16 16" role="img">
      <path
        d="M9.41 8l2.29-2.29c.19-.18.3-.43.3-.71a1.003 1.003 0 00-1.71-.71L8 6.59l-2.29-2.3a1.003 1.003 0 00-1.42 1.42L6.59 8 4.3 10.29c-.19.18-.3.43-.3.71a1.003 1.003 0 001.71.71L8 9.41l2.29 2.29c.18.19.43.3.71.3a1.003 1.003 0 00.71-1.71L9.41 8z"
        fillRule="evenodd"
      ></path>
    </svg>
  </button>
)

export interface TagProps extends PropsWithoutRef<JSX.IntrinsicElements["span"]> {
  label: string
  onRemove?: () => void
}

export const Tag = ({ label, ...props }: TagProps) => {
  return (
    <span
      {...props}
      className="inline-flex relative flex-row flex-grow-0 flex-shrink-0 items-center py-px px-1 mr-1 mb-1 max-w-full text-xs leading-4 text-blue-800 break-words bg-indigo-50 rounded-sm cursor-text focus:outline-offset-0"
    >
      <span className="flex-grow flex-shrink mr-1 leading-4 text-blue-800 border-0 border-gray-200 border-solid cursor-text truncate">
        {label}
      </span>
      <RemoveButton onClick={props.onRemove}></RemoveButton>
    </span>
  )
}

export interface TaggedTextFieldProps extends PropsWithoutRef<JSX.IntrinsicElements["div"]> {
  /** Field name. */
  name: string
  /** Field label. */
  label: string
  /** Field placeholder. */
  placeholder?: string
}

export const TaggedTextField = function (props: TaggedTextFieldProps) {
  const inputComponentRef = React.useRef<HTMLInputElement>(null)
  const [tags, setTags] = React.useState<string[]>([])
  const [inputValue, setInputValue] = React.useState("")

  const addTag = (tag: string) => {
    setTags([...tags, tag])
    setInputValue("")
  }

  return (
    <div>
      <label>
        <div
          className="border w-full h-24 px-3 py-3 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md"
          {...props}
        >
          <Tag label="test" onRemove={() => console.log("Remove")}></Tag>
          <input
            type="text"
            className="border-none ring-0 focus:border-none focus:ring-0 bg-transparent"
            ref={inputComponentRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <Suggest
            options={["test", "test2"]}
            confirmOnEnter={true}
            onSelect={(value) => addTag(value)}
          />
        </div>
      </label>
    </div>
  )
}

export interface SuggestProps extends PropsWithoutRef<JSX.IntrinsicElements["div"]> {
  query: Parameters<typeof useQuery>
}

export const Suggest = function (props: SuggestProps) {
  const query = useQuery(...props.query)

  return (
    <div>
      <ul>
        {props.options.map((option) => (
          <li>{option}</li>
        ))}
      </ul>
    </div>
  )
}
