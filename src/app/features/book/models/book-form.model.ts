export class BookForm {
  constructor(
    public title: string | null = null,
    public urlImg: string | null = null,
    public description: string | null = null,
    public pageCount: number | null = null,
    public publishDate: Date | null = null
  ) { }
}