{
  let view = {
    el: '#nav',
    template: `
      <div class="row align-items-start">
        <div class="col-2">
          <a href="#" class="logo">
            <svg data-v-2cb57da0="" version="1.0" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="100%" height="100%" viewBox="0 0 340.000000 250.000000" preserveAspectRatio="xMidYMid meet" color-interpolation-filters="sRGB" style="margin: auto;"><rect data-v-2cb57da0="" x="0" y="0" width="100%" height="100%" fill="#feffff" fill-opacity="1" class="background"></rect> <rect data-v-2cb57da0="" x="0" y="0" width="100%" height="100%" fill="url(#watermark)" fill-opacity="1" class="watermarklayer"></rect> <g data-v-2cb57da0="" fill="#008abd" class="iconlinesvg-g iconlinesvg" transform="translate(79.89546203613281,92.00779509544373)"><g class="tp-name" transform="translate(0,0)"><g transform="translate(0, 1.8739073028988749)"><g><g class="imagesvg"><g><rect fill="#008abd" fill-opacity="0" stroke-width="2" x="0" y="0" width="46.67002438378954" height="47.28089352817354" class="image-rect"></rect> <svg x="0" y="0" width="46.67002438378954" height="47.28089352817354" filtersec="colorsb8712567400" class="image-svg-svg primary"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -0.0015567583031952381 81.56427001953125 82.63155364990234"><g><path d="M51.1 51.16a1.56 1.56 0 0 1-.29-.37L43 43a3 3 0 1 1 4.24-4.24l9 8.94A25 25 0 0 0 45.49 0H2a2 2 0 0 0-2 2v78.63a2 2 0 0 0 2 2h78.53c1.1 0 1.37-.64.58-1.42z" fill="#008abd"></path></g></svg></svg> <!----></g></g></g></g><g transform="translate(50, 0)"><g data-gra="path-name" fill="#008abd" transform="scale(1)"><path d="M1.94-14.43L1.94-14.43Q2.80-29.07 15.29-29.71L15.29-29.71Q27.78-29.07 28.64-14.43L28.64-14.43Q27.78 0 15.29 0.43L15.29 0.43Q2.80 0 1.94-14.43ZM6.89-14.43L6.89-14.43Q7.54-3.66 15.29-3.44L15.29-3.44Q23.04-3.66 23.68-14.43L23.68-14.43Q23.04-25.19 15.29-25.41L15.29-25.41Q7.54-25.19 6.89-14.43Z" transform="translate(-1.9377990430622007, 39.40191387559809)"></path></g></g><g transform="translate(80, 0)"><g data-gra="path-name" fill="#008abd" transform="scale(1)"><path d="M26.91-19.59L26.91-19.59L26.91 0L22.18 0L22.18-17.66Q22.61-25.62 15.93-25.19L15.93-25.19Q8.61-24.76 8.40-15.72L8.40-15.72L8.40 0L3.44 0L3.44-28.85L8.18-28.85L8.18-24.76Q11.63-29.71 17.01-29.71L17.01-29.71Q26.70-29.50 26.91-19.59Z" transform="translate(-3.4449760765550237, 39.40191387559809)"></path></g></g><g transform="translate(107, 0)"><g data-gra="path-name" fill="#008abd" transform="scale(1)"><path d="M7.32-14.43L7.32-14.43Q7.54-3.44 15.07-3.23L15.07-3.23Q22.61-3.88 22.82-12.92L22.82-12.92Q23.04-25.19 15.07-25.19L15.07-25.19Q7.11-25.19 7.32-14.43ZM22.82-28.85L27.34-28.85L27.34-2.37Q27.78 11.63 14.21 11.63L14.21 11.63Q4.09 11.63 3.01 3.01L3.01 3.01L7.97 3.01Q8.83 7.75 14.43 7.75L14.43 7.75Q23.04 7.75 22.61-1.94L22.61-1.94L22.61-3.23L22.61-3.01Q20.02 0.43 14.86 0.43L14.86 0.43Q2.80 0 2.15-15.29L2.15-15.29Q2.80-29.07 14.21-29.71L14.21-29.71Q19.59-29.71 22.82-24.76L22.82-24.76L22.82-28.85Z" transform="translate(-2.15311004784689, 39.40191387559809)"></path></g></g><g transform="translate(136, 0)"><g data-gra="path-name" fill="#008abd" transform="scale(1)"><path d="M23.25-9.04L23.25-9.04L27.99-9.04Q27.13-4.09 22.82-1.08L22.82-1.08Q20.45 0.43 15.07 0.43L15.07 0.43Q2.80 0 2.15-13.56L2.15-13.56Q2.58-29.28 15.93-29.71L15.93-29.71Q28.21-29.50 28.42-12.70L28.42-12.70L7.32-12.70Q7.32-3.23 15.72-3.23L15.72-3.23Q21.75-3.66 23.25-9.04ZM7.32-16.58L7.32-16.58L23.47-16.58Q22.82-25.19 15.29-25.19L15.29-25.19Q8.18-24.55 7.32-16.58Z" transform="translate(-2.15311004784689, 39.40191387559809)"></path></g></g><g transform="translate(166, 0)"><g data-gra="path-name" fill="#008abd" transform="scale(1)"><path d="M9.04-16.79L9.04-16.79L9.04 0L4.09 0L4.09-28.85L8.83-28.85L8.83-23.90Q12.06-29.71 17.01-29.71L17.01-29.71Q17.44-29.71 17.87-29.50L17.87-29.50Q18.09-29.50 18.30-29.50L18.30-29.50L18.30-24.33L16.36-24.33Q9.47-23.90 9.04-16.79Z" transform="translate(-4.090909090909091, 39.40191387559809)"></path></g></g></g> <g data-gra="path-slogan" fill-rule="" class="tp-slogan" fill="#008abd" transform="translate(5,55.15800476074219)"><rect x="0" height="1" y="3.9750003814697266" width="63.5145378112793"></rect> <rect height="1" y="3.9750003814697266" width="63.5145378112793" x="106.69453811645508"></rect> <g transform="translate(66.5145378112793,0)"><g transform="scale(1)"><path d="M9.14-8.58L9.14 0L8.02 0L8.02-5.06Q8.02-5.77 8.02-7.22L8.02-7.22L5.58 0L4.41 0L2.02-7.22L1.97-7.22Q1.97-6.70 2.02-5.67L2.02-5.67Q2.02-5.16 2.02-5.06L2.02-5.06L2.02 0L0.84 0L0.84-8.58L2.53-8.58L5.02-1.31L7.45-8.58L9.14-8.58ZM16.50-3.19L16.50-8.58L17.67-8.58L17.67-3.05Q17.53 0.05 14.16 0.14L14.16 0.14Q11.02 0.05 10.88-2.86L10.88-2.86L10.88-8.58L12.05-8.58L12.05-3.19Q12.09-0.84 14.20-0.80L14.20-0.80Q16.50-0.84 16.50-3.19L16.50-3.19ZM25.73-6.09L25.73-6.09L24.66-6.09Q24.56-7.73 22.50-7.83L22.50-7.83Q20.58-7.78 20.58-6.33L20.58-6.33Q20.58-5.39 21.61-5.25L21.61-5.25L24.05-4.69Q25.97-4.22 25.97-2.34L25.97-2.34Q25.92 0.05 22.59 0.14L22.59 0.14Q20.77 0.14 20.02-0.61L20.02-0.61Q19.08-1.31 19.13-2.77L19.13-2.77L20.25-2.77Q20.30-0.80 22.59-0.75L22.59-0.75Q24.84-0.80 24.89-2.20L24.89-2.20Q25.08-3.38 23.02-3.75L23.02-3.75L21.23-4.13Q19.41-4.64 19.41-6.19L19.41-6.19Q19.55-8.72 22.41-8.81L22.41-8.81Q25.64-8.81 25.73-6.09ZM27.61-8.58L28.78-8.58L28.78 0L27.61 0L27.61-8.58ZM37.92-6.05L37.92-6.05L36.80-6.05Q36.38-7.78 34.41-7.83L34.41-7.83Q31.69-7.69 31.59-4.36L31.59-4.36Q31.59-0.80 34.45-0.80L34.45-0.80Q36.42-0.84 36.89-3.19L36.89-3.19L38.02-3.19Q37.50 0.05 34.22 0.14L34.22 0.14Q30.47 0 30.38-4.31L30.38-4.31Q30.56-8.63 34.41-8.81L34.41-8.81Q37.45-8.72 37.92-6.05Z" transform="translate(-0.84375, 8.8125)"></path></g></g></g></g><defs v-gra="od"></defs></svg>
          </a>
        </div>
        <div class="col-10">
          <div class="nav-content">
            <ul class="nav">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="https://portal.qiniu.com/home">七牛</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="https://leancloud.cn/docs/leanstorage_guide-js.html#hash314705411">leanClound</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="https://music-163-manage.herokuapp.com/">音乐</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="https://github.com/baozoudashijian">GitHub</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    `,
    render() {
      $(this.el).html(this.template)
    }
  }

  let model = { }
  let controller = {
    init(view, model) {
      this.view = view
      this.model = model
      this.view.render()
    }
  }
  controller.init(view, model)
}