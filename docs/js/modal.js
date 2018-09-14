class Modal {
  constructor() {
    this.button = document.querySelectorAll('.open-modal');
    this.modal = document.querySelector('.modal');
    this.overlay = document.querySelector('.overlay');
    this.close = document.querySelector('.modal-close-button');
    this.close_cross = document.querySelector('.modal-close-cross');
    this.modal_text = document.querySelector('.modal-text');

    this.body = document.body;

    this.close_list = [this.overlay, this.close, this.close_cross];

    this.bind();
  }

  bind() {
    // this.button.forEach(currentValue => {
    //   currentValue.addEventListener('click', () => {
    //     this.openModal();
    //   });
    // });

    this.close_list.forEach(currentValue => {
      currentValue.addEventListener('click', () => {
        this.closeModal();
      });
    });

    [].forEach.call(this.button, modal_text => {
      modal_text.addEventListener('click', (e) => {
        this.index = e.currentTarget.dataset.text;

        this.modal_text.textContent = this.index;

        this.openModal();
      });
    });
  }

  openModal() {
    this.overlay.style.display = 'block';
    this.modal.style.display = 'block';

    anime({
      targets: this.modal,
      scale: [0, 1],
      duration: 300
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
      duration: 300
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
}

const modal = new Modal();
