<template>
  <section>
    <section v-if="$device.isDesktopOrTablet" class="page page--info">
      <h1 class="page__title">
        {{ title }}
      </h1>
      <div class="aboutWelcome">
        <div class="aboutWelcome__info">
          <div class="infoCard" style="background: linear-gradient(112.38deg, #CCCBFA 7.67%, #D9EFFF 89.09%);">
            <div class="infoCard__content infoCard__content--large">
              Ресторека - это интернет-магазин оборудования для отелей, ресторанов, кафе и не только. <br/>
              Мы занимаемся продажей, доставкой, установкой и обслуживанием оборудования для ХОРЕКА, холодильных камер, сплит-систем.
            </div>
          </div>
        </div>
        <div class="aboutWelcome__pic">
          <img src="/assets/images/wellclome-full.png" alt="">
        </div>
      </div>
      <div class="aboutShort">
        <div class="aboutShort__col">
          <div class="infoCard">
            <div class="infoCard__title infoCard__title--large" style="background: linear-gradient(105.36deg, #53FFB7 7.64%, #0038FF 90.97%);">
              <span>Нам 12 лет</span>
            </div>
            <div class="infoCard__content">
              С 2009-го года мы занимаемся продажей и обслуживанием оборудования для общепита и магазинов, холодильного и теплового оборудования.
            </div>
          </div>
        </div>
        <div class="aboutShort__col">
          <div class="infoCard">
            <div class="infoCard__title" style="background: linear-gradient(116.81deg, #61B3FF 7.68%, #7000FF 97.83%);">
              <span>Доставляем <br/>
              по всей России <br/>
              в кратчайшие сроки</span>
            </div>
            <div class="infoCard__content">
              Мы сотрудничаем только с лучшими транспортными компаниями.<br/>
              Также, вам доступен самовывоз в любом из наших 18 складов.
            </div>
          </div>
        </div>
        <div class="aboutShort__col">
          <div class="infoCard">
            <div class="infoCard__title" style="background: linear-gradient(105.36deg, #7000FF 7.64%, #FF9900 90.97%);">
              <span>Более 15 000 наименований сертифицированной продукции</span>
            </div>
            <div class="infoCard__content">
              Мы работаем только с официальными поставщиками — вся продукция, на нашем сайте, имеет соответствующие сертификаты безопасности и гигиены.
            </div>
          </div>
        </div>
        <div class="aboutShort__col">
          <div class="infoCard">
            <div class="infoCard__title infoCard__title--large" style="background: linear-gradient(105.36deg, #FF9900 7.64%, #00FF75 90.97%);">
              <span>7777 довольных клиентов</span>
            </div>
            <div class="infoCard__content">
              Мы заботимся о каждом нашем клиенте, поэтому вам будет предоставлен персональный менеджер.
              Наши постоянные клиенты получают особые привелегии по нашей программе лояльности.
            </div>
          </div>
        </div>
      </div>
    </section>
    <section v-else>
      <AppBar
        :title="title"
      />
    </section>
  </section>
</template>

<script>
export default {
  transition: 'fade',
  scrollToTop: true,
  key(route) {
    return route.fullPath
  },
  head() {
    return {
      title: this.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Restoreca.ru'
        }
      ]
    }
  },
  async asyncData({ params, $axios }) {
    const response = await $axios.$get('/pages/about-us')
    return response
  },

}
</script>

<style lang="scss">
  @include block(aboutWelcome) {
    display: flex;

    @include element(info) {
      width: 34%;
      @include padding-vw(13px);
    }
  }

  @include block(aboutShort) {
    display: flex;
    @include up-vw(margin-top, 55px);

    @include element(col) {
      width: 25%;
      @include padding-vw(13px);
    }
  }

  @include block(infoCard) {
    width: 100%;
    position: relative;
    background: #eeecf9;
    border-radius: 21px;
    box-shadow:  13px 13px 56px #dbd9e5,
                -13px -13px 56px #ffffff;

    @include element(title) {
      position: relative;
      &::before {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        border-radius: 22px;
        background-color: rgba(255,255,255,.34);
        backdrop-filter: blur(5px);
      }
      @include padding-vw(13px);
      border-radius: 21px;
      position: relative;
      @include font-vw(21px); 
      font-weight: 500;

      @include modifier(large) {
        @include font-vw(34px); 
        font-weight: 300;
      }

      & span {
        position: relative;
      }
    }

    @include element(content) {
      position: relative;
      @include padding-vw(21px);
      @include font-vw(13px);

      @include modifier(large) {
        @include font-vw(18px);
      }
    }
  }
</style>