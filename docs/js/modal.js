class Modal {
  constructor() {
    this.button = document.querySelectorAll('.open-modal');
    this.modal = document.querySelector('.modal');
    this.overlay = document.querySelector('.overlay');
    this.close = document.querySelector('.modal-close-button');
    this.close_cross = document.querySelector('.modal-close-cross');
    this.modal_text = document.querySelector('.modal-text');
    this.modal_arrow = [
      document.querySelector('.modal-left-arrow'),
      document.querySelector('.modal-right-arrow')
    ];

    this.index = 0;

    this.body = document.body;

    this.close_list = [this.overlay, this.close, this.close_cross];

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
        this.modal_text.textContent = e.currentTarget.dataset.text;

        this.index = e.currentTarget.dataset.value;

        this.openModal();
      });
    });

    this.modal_arrow[0].addEventListener('click', e => {
      this.prevText();
    });

    this.modal_arrow[1].addEventListener('click', e => {
      this.nextText();
    });
  }

  openModal() {
    console.log(this.index);
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
  }

  nextText() {
    if (this.index < this.button.length - 1) {
      this.index++;
    } else {
      this.index = 0;
    }

    this.updateText();
  }

  prevText() {
    if (this.index > 0) {
      this.index--;
    } else {
      this.index = this.button.length - 1;
    }

    this.updateText();
  }

  updateText() {
    this.modal_text.textContent = this.button[this.index].dataset.text;
  }
}

const modal = new Modal();
