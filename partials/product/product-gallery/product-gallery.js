import Swiper from "swiper/bundle";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import PhotoSwipeFullscreen from "/js/vendor/fullscreen/photoswipe-fullscreen.esm.min.js";

export default new class ProductGallery {
  constructor () {
    this.init();
  }

  init () {
    document.addEventListener("DOMContentLoaded", () => {
      this.initPhotoSwipe();
      this.initSliders();
    });
  }

  initPhotoSwipe () {
    if (document.querySelector(".js-photo-swipe") == null) return;
    const lightbox = new PhotoSwipeLightbox({
      zoomSVG: "<svg viewBox=\"0 0 32 32\" class=\"pswp__icn\" width=\"32\" height=\"32\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M28 28L20 20L28 28ZM22.6667 13.3333C22.6667 14.559 22.4253 15.7727 21.9562 16.905C21.4872 18.0374 20.7997 19.0663 19.933 19.933C19.0663 20.7997 18.0374 21.4872 16.905 21.9562C15.7727 22.4253 14.559 22.6667 13.3333 22.6667C12.1077 22.6667 10.894 22.4253 9.76162 21.9562C8.62925 21.4872 7.60035 20.7997 6.73367 19.933C5.86699 19.0663 5.1795 18.0374 4.71046 16.905C4.24141 15.7727 4 14.559 4 13.3333C4 10.858 4.98333 8.48401 6.73367 6.73367C8.48401 4.98333 10.858 4 13.3333 4C15.8087 4 18.1827 4.98333 19.933 6.73367C21.6833 8.48401 22.6667 10.858 22.6667 13.3333Z\" stroke=\"#111827\" stroke-width=\"2.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></svg>",
      closeSVG: "<svg viewBox=\"0 0 32 32\" class=\"pswp__icn\" width=\"32\" height=\"32\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M8 8L24 24M8 24L24 8L8 24Z\" stroke=\"#111827\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></svg>",
      bgOpacity: 0.3,
      gallery: ".js-photo-swipe",
      showHideAnimationType: 'fade',
      children: "a",
      pswpModule: () => import("photoswipe")
    });
    const fullscreenPlugin = new PhotoSwipeFullscreen(lightbox);
    lightbox.init();
  }

  initSliders () {
    if (document.querySelector(".js-gallery-thumbs") == null) return;
    const thumbsGallery = new Swiper(".js-gallery-thumbs", {
      slidesPerView: 4,
      spaceBetween: 4,
      watchSlidesProgress: true,
      breakpoints: {
        768: {
          spaceBetween: 8
        }
      }
    });

    const swiperGallery = new Swiper(".js-gallery-top", {
      spaceBetween: 8,
      slidesPerView: 1,
      initialSlide: 1,
      thumbs: {
        swiper: thumbsGallery
      }
    });
  }
}();
