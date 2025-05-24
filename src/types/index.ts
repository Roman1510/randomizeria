export interface Item {
  id: string
  text: string
}

export interface Team {
  id: string
  name: string
  items: Item[]
}
