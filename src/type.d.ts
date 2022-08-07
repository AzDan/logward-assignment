interface Comment {
  data: {
    name: string
    text: string
    id: string
    pid: string|null
    date: Date
  }
  replies: {
    data?: {
      name: string
      text: string
      id: string
      pid: string|null
      date: Date
    }
  }[]
}