class Modal {
  constructor() {
    /* エレメント取得 */
    this.button = document.querySelectorAll('.open-modal');
    this.modal = document.querySelector('.modal');
    this.overlay = document.querySelector('.overlay');
    this.close = document.querySelector('.modal-close-button');
    this.close_cross = document.querySelector('.modal-close-cross');
    this.modal_text = document.querySelectorAll('.modal-text');
    this.modal_image = document.querySelectorAll('.modal-image');
    this.modal_arrow = [
      document.querySelector('.modal-left-arrow'),
      document.querySelector('.modal-right-arrow')
    ];

    this.index = null;
    this.index2 = null;
    this.isAnimating = false;

    this.body = document.body;

    this.close_list = [this.overlay, this.close, this.close_cross];

    /* スライダー用変数 */
    this.inside = document.querySelector('.slide-inside');
    this.width = 600;
    this.translateX = null;

    this.setData();
    this.bind();
  }

  bind() {
    this.close_list.forEach(currentValue => {
      currentValue.addEventListener('click', () => {
        this.closeModal();
      });
    });

    [].forEach.call(this.button, button => {
      button.addEventListener('click', e => {
        this.index = Number(e.currentTarget.dataset.value);

        this.update();
        this.openModal();
      });
    });

    this.modal_arrow[0].addEventListener('click', e => {
      if (this.isAnimating) {
        return;
      }
      this.prevSlide();
    });

    this.modal_arrow[1].addEventListener('click', e => {
      if (this.isAnimating) {
        return;
      }
      this.nextSlide();
    });
  }

  noClick() {
    this.modal_arrow[1].classList.add('noClick');
  }

  openModal() {
    this.overlay.style.display = 'block';
    this.modal.style.display = 'block';

    anime({
      targets: this.modal,
      easing: 'linear',
      scale: [0, 1],
      duration: 200
    });
    anime({
      targets: this.overlay,
      backgroundColor: ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.8)'],
      easing: 'linear',
      duration: 300
    });

    this.body.classList.add('no-scroll');
    this.scrollOff();
  }

  closeModal() {
    anime({
      targets: this.modal,
      scale: 0,
      easing: 'linear',
      duration: 200
    });
    anime({
      targets: this.overlay,
      backgroundColor: 'rgba(0, 0, 0, 0)',
      easing: 'linear',
      duration: 300,
      complete: () => {
        this.overlay.style.display = 'none';
        this.modal.style.display = 'none';
        this.body.classList.remove('no-scroll');
      }
    });
  }

  scrollOff() {
    this.modal.addEventListener('touchmove', e => {
      e.preventDefault();
    });
    this.overlay.addEventListener('touchmove', e => {
      e.preventDefault();
    });
  }

  setData() {
    this.button.forEach((currentValue, index) => {
      currentValue.dataset.value = index;
    });

    this.modal_text.forEach((currentValue, index) => {
      currentValue.textContent = this.button[index].dataset.text;
    });

    this.modal_image.forEach((currentValue, index) => {
      currentValue.innerHTML = `<img src="./images/${
        this.button[index].dataset.image
      }.jpg">`;
    });

    this.inside.style.transform = `translateX(0px)`;
  }

  update() {
    this.inside.style.transform = `translateX(${-this.width * this.index}px)`;
  }

  nextSlide() {
    // if (this.index < this.button.length - 1) {
    //   this.index++;
    // } else {
    //   this.index = 0;
    // }

    this.index = this.index < this.button.length - 1
      ? this.index + 1
      : 0;

      console.log(this.index);

    this.slideAnimation();
  }

  prevSlide() {
    if (this.index > 0) {
      this.index--;
    } else {
      this.index = this.button.length - 1;
    }

    this.slideAnimation();
  }
  slideAnimation() {
    this.translateX = -this.width * this.index;
    this.noClick();

    anime.remove(this.inside);
    this.isAnimating = true;
    anime({
      targets: this.inside,
      translateX: this.translateX,
      easing: 'easeOutCubic',
      duration: 500,

      complete: () => {
        this.isAnimating = false;
      }
    });
  }
}

const modal = new Modal();
