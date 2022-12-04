import Head from "next/head"
import React from "react"
import { BlitzLayout } from "@blitzjs/next"
import { Toaster } from "react-hot-toast"

const Layout: BlitzLayout<{ title?: string; children?: React.ReactNode }> = ({
  title,
  children
}) => {
  return (
    <>
      <Head>
        <title>{title || "anime-diffusion-frontend"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          style: {
            fontSize: "1.1em"
          },
          duration: 4000
        }}
      />

      {children}
    </>
  )
}

export default Layout
