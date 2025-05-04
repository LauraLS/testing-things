import { create } from "zustand"
import { v4 as uuidv4 } from "uuid"

export type ChildStyle = {
  fontSize: number
  color: string
  fontWeight: string
  lineHeight: number
  textAlign: "left" | "right" | "center" | "justify"
}

export type Child = {
  id: string
  type: string | undefined
  focus: boolean
  column: string
  value: string
  width: number
  style: ChildStyle
}

export type Section = {
  id: string
  type: string
  children: Child[]
}

export type DocumentStyle = {
  width: number
  backgroundColor: string
  margin: string
}

interface EditorState {
  dragSection: boolean
  dragRow: boolean
  documentStyle: DocumentStyle
  sections: Section[]
  structure: any
  focusRow: Child | undefined
  focusSection: Section | undefined
  onFocusRow: (row: Child | undefined) => void
  onFocusElement: (id: string, type: string) => void
  addSection: (id: string, direction: string, type: string) => void
  changeDragSection: (dragSection: boolean) => void
  changeDragRow: (dragRow: boolean) => void
  changeGeneralWidth: (width: number) => void
  changeGeneralBackgroundColor: (backgroundColor: string) => void
  changeDocumentStyle: (style: DocumentStyle) => void
  changeChildType: (id: string, type: string) => void
  changeChildStyle: (id: string, style: ChildStyle) => void
  changeChildValue: (id: string, value: string) => void
  changeChildWidth: (id: string, value: number) => void
}

const MatchColumns = {
  "1": ["1"],
  "2": ["2", "2"],
  "3": ["3", "3", "3"],
  "4": ["4", "4", "4", "4"],
} as const

const createChild = (column: string): Child => {
  return {
    id: uuidv4(),
    type: undefined,
    focus: false,
    column,
    value: "",
    width: 100,
    style: {
      fontSize: 14,
      color: "#000000",
      fontWeight: "normal",
      lineHeight: 1.2,
      textAlign: "left",
    },
  }
}

const createChildren = (columns: keyof typeof MatchColumns): Child[] => {
  return MatchColumns[columns].map(createChild)
}

const initialState = {
  dragSection: false,
  dragRow: false,
  documentStyle: { width: 600, backgroundColor: "#ffffff", margin: "auto" },
  focusRow: undefined,
  focusSection: undefined,
  sections: [
    {
      id: "c7157f30-bce2-4ea6-86df-a4fc2387654b",
      type: "1",
      children: [
        {
          ...createChild("1"),
          id: "054db709-ddaf-4758-9247-551c2f7381b5",
        },
      ],
    },
  ],
  structure: {
    html: {
      lang: "es",
      dir: "ltr",
      children: [
        {
          head: {},
        },
        {
          body: {
            style: {
              backgroundColor: "red",
            },
            children: [
              {
                container: {
                  style: {},
                  children: [],
                },
              },
            ],
          },
        },
      ],
    },
  },
}

export const useEditorStore = create<EditorState>()((set) => ({
  ...initialState,

  changeDragSection: (dragSection: boolean) =>
    set((state) => {
      return {
        ...state,
        dragSection,
      }
    }),
  changeDragRow: (dragRow: boolean) =>
    set((state) => {
      return {
        ...state,
        dragRow,
      }
    }),
  addSection: (id: string, direction: string, type: string) =>
    set((state) => {
      const oldSections = state.sections

      const index = oldSections.findIndex((section: any) => section.id === id)
      const newSections = [...oldSections]

      if (direction === "up")
        newSections.splice(index, 0, {
          id: uuidv4(),
          type,
          children: createChildren(type as keyof typeof MatchColumns),
        })
      if (direction === "down")
        newSections.splice(index + 1, 0, {
          id: uuidv4(),
          type,
          children: createChildren(type as keyof typeof MatchColumns),
        })

      return { ...state, sections: newSections }
    }),
  onFocusRow: (row: Child | undefined) =>
    set((state) => {
      return {
        ...state,
        focusRow: row,
      }
    }),
  onFocusElement: (id: string, type: string) =>
    set((state) => {
      if (type === "row") {
        const child = state.sections
          .map((section: any) => section.children)
          .flat()
          .find((child: any) => child.id === id)
        return { ...state, focusRow: child, focusSection: undefined }
      }
      if (type === "section") {
        const section = state.sections.find((section: any) => section.id === id)
        return { ...state, focusSection: section, focusRow: undefined }
      }
      return { ...state, focusRow: undefined, focusSection: undefined }
    }),
  changeGeneralWidth: (width: number) =>
    set((state) => {
      return {
        ...state,
        documentStyle: { ...state.documentStyle, width },
      }
    }),
  changeGeneralBackgroundColor: (backgroundColor: string) =>
    set((state) => {
      return {
        ...state,
        documentStyle: { ...state.documentStyle, backgroundColor },
      }
    }),
  changeDocumentStyle: (style: DocumentStyle) =>
    set((state) => {
      return {
        ...state,
        documentStyle: style,
      }
    }),
  changeChildType: (id: string, type: string) =>
    set((state) => {
      const sections = state.sections.map((section: any) => {
        const updatedChildren = section.children.map((child: any) => {
          if (child.id === id) {
            return {
              ...child,
              id: uuidv4(),
              type,
              column: child.column,
              style: child.style,
            }
          }
          return child
        })

        return {
          ...section,
          children: updatedChildren,
        }
      })

      return { ...state, sections: sections }
    }),
  changeChildStyle: (id: string, style: ChildStyle) =>
    set((state) => {
      const sections = state.sections.map((section: Section) => {
        const updatedChildren = section.children.map((child: Child) => {
          if (child.id === id) {
            return {
              ...child,
              style: style,
            }
          }
          return child
        })

        return {
          ...section,
          children: updatedChildren,
        }
      })

      return {
        ...state,
        sections: sections,
        focusRow: sections
          .map((section: Section) => section.children)
          .flat()
          .find((child: Child) => child.id === id),
      }
    }),
  changeChildValue: (id: string, value: string) =>
    set((state) => {
      const sections = state.sections.map((section: any) => {
        const updatedChildren = section.children.map((child: any) => {
          if (child.id === id) {
            return {
              ...child,
              value,
            }
          }
          return child
        })

        return {
          ...section,
          children: updatedChildren,
        }
      })

      return {
        ...state,
        sections: sections,
        focusRow: sections
          .map((section: any) => section.children)
          .flat()
          .find((child: any) => child.id === id),
      }
    }),
  changeChildWidth: (id: string, value: number) =>
    set((state) => {
      const sections = state.sections.map((section: any) => {
        const updatedChildren = section.children.map((child: any) => {
          if (child.id === id) {
            return {
              ...child,
              width: value,
            }
          }
          return child
        })

        return {
          ...section,
          children: updatedChildren,
        }
      })

      return {
        ...state,
        sections: sections,
        focusRow: sections
          .map((section: any) => section.children)
          .flat()
          .find((child: any) => child.id === id),
      }
    }),
}))
