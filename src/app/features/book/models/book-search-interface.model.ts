export interface BookSearchInterface {
  id: number;
  title: string;
  description: string;
  imgUrl: string;
  pageCount: number;
  publishDate: Date;

  //Not mapped, only View
  isFromApi: boolean;
}