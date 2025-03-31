import { create } from "zustand"
import { v4 as uuidv4 } from "uuid"

interface EditorState {
  sections: any
  structure: any
  addSection: (rowId: string) => void
}

const Match = {
  "1": ["100%"],
  "2": ["50%", "50%"],
  "3": ["33.33%", "33.33%", "33.33%"],
  "4": ["25%", "25%", "25%", "25%"],
  "1/3": ["33.33%", "66.67%"],
  "3/1": ["66.67%", "33.33%"],
} as const

const createColumn = (width: string) => ({
  column: {
    id: uuidv4(),
    style: {
      textAlign: "center",
      backgroundColor: "white",
      width,
    },
    children: [
      {
        text: "Texto 1",
      },
    ],
  },
})

const createRow = (columns: keyof typeof Match) => ({
  row: {
    id: uuidv4(),
    style: {
      backgroundColor: "blue",
    },
    children: Match[columns].map((width: string) => createColumn(width)),
  },
})

const createSection = (rows: number, columns: keyof typeof Match) => ({
  section: {
    id: uuidv4(),
    style: {},
    children: [{ ...createRow(columns) }],
  },
})

const sections = [
  { ...createSection(1, "1") },
  { ...createSection(2, "2") },
  { ...createSection(3, "3") },
  { ...createSection(4, "4") },
  { ...createSection(1, "1/3") },
  { ...createSection(3, "3/1") },
]

const initialState = {
  sections: sections,
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
                  children: sections,
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

  addSection: (rowId: string) =>
    set((state) => {
      const newSections = []

      for (const element of state.sections) {
        const newChildren = []
        const { section } = element
        const { children } = section

        for (const child of children) {
          const { row } = child
          const { id: childId } = row
          newChildren.push(child)
          if (childId === rowId) {
            const newRow = createRow("1")
            newChildren.push(newRow)
          }
        }

        newSections.push({ section: { ...section, children: newChildren } })
      }

      return {
        ...state,
        sections: newSections,
      }
    }),
}))
