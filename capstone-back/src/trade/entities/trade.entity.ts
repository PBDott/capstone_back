export class Trade {
    tradeId: number;  // Trade ID, 기본 키
    title: string;    // 책 제목
    author: string;   // 저자
    publication: string;  // 출판사
    seller: string;   // 판매자
    price: number;    // 가격
    imageId: number;  // 이미지 ID
  
    constructor(tradeId: number, title: string, author: string, publication: string, seller: string, price: number, imageId: number) {
      this.tradeId = tradeId;
      this.title = title;
      this.author = author;
      this.publication = publication;
      this.seller = seller;
      this.price = price;
      this.imageId = imageId;
    }
  }
  