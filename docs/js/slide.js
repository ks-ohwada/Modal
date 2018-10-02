class Slide {
  constructor() {
    this.slide = document.querySelectorAll('.modal-slide');

    this.aaa = 1;

    this.test();
  }

  test() {
    console.log(this.aaa);
  }
}

const slide = new Slide();
