import {
  Body,
  Button,
  Column,
  Container,
  Font,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Row,
  Section,
  Text,
} from "@react-email/components"
import ReactDOMServer from "react-dom/server"
import React from "react"
import type {
  DocumentStyle,
  Section as SectionType,
} from "@/stores/editor-store.ts"

type ComponentKey = keyof typeof componentsMap

type SimpleJSON = {
  [K in ComponentKey]: K extends ComponentKey
    ? {
        [key: string]: any
        value: string
      }
    : never
}

type ComplexJSON = {
  [K in ComponentKey]: K extends ComponentKey
    ? {
        [key: string]: any
        children?: JSON[]
      }
    : never
}

type JSON = Partial<SimpleJSON> | Partial<ComplexJSON>

const componentsMap = {
  html: Html,
  head: Head,
  button: Button,
  container: Container,
  column: Column,
  row: Row,
  font: Font,
  heading: Heading,
  img: Img,
  link: Link,
  section: Section,
  text: Text,
  hr: Hr,
  body: Body,
} as const

const createSimpleElement = (json: SimpleJSON) => {
  const [type] = Object.keys(json) as (keyof typeof componentsMap)[]
  const [values] = Object.values(json)

  const { value, ...props } = values

  return React.createElement(
    componentsMap[type] as any,
    { ...props, key: Math.random() * (1000 - 1) + 1 },
    value,
  )
}

const createComplexElement = (json: ComplexJSON): any => {
  const [type] = Object.keys(json) as (keyof typeof componentsMap)[]
  const [value] = Object.values(json)

  const { children = [], ...props } = value

  const childrenComponents =
    children.length > 0
      ? children.map((child: any) => createElements(child))
      : undefined

  return React.createElement(
    componentsMap[type] as any,
    { ...props, key: Math.random() * (1000 - 1) + 1 },
    childrenComponents,
  )
}

const createElements = (json: JSON) => {
  const [type] = Object.keys(json)

  return ["text", "heading"].includes(type)
    ? createSimpleElement(json as SimpleJSON)
    : createComplexElement(json as ComplexJSON)
}

export const convertToHtml = (json: JSON) => {
  return ReactDOMServer.renderToString(createElements(json))
}

export const convertToStructure = (
  json: SectionType[],
  documentStyle: DocumentStyle,
): JSON => {
  const children = json.map((section): JSON => {
    const children = section.children.filter((child) => child.type) ?? []

    return {
      row: {
        id: section.id,
        style: {},
        children: children.map((child) => {
          const { id, style, value, type, width } = child
          if (type === "image") {
            return {
              column: {
                style,
                children: [
                  {
                    img: {
                      src: value,
                      width: `${width}%`,
                      style: { display: "inline-block" },
                      id,
                    },
                  },
                ],
              },
            }
          }
          if (type === "heading") {
            return {
              column: {
                children: [
                  {
                    heading: {
                      id,
                      style,
                      value,
                    },
                  },
                ],
              },
            }
          }
          return {
            column: {
              children: [
                {
                  text: {
                    id,
                    style,
                    value,
                  },
                },
              ],
            },
          }
        }),
      },
    }
  })

  return {
    html: {
      lang: "es",
      dir: "ltr",
      children: [
        {
          head: {},
        },
        {
          body: {
            style: documentStyle,
            children: [
              {
                container: {
                  style: {},
                  children: children,
                },
              },
            ],
          },
        },
      ],
    },
  }
}
