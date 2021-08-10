<template>
  <section>
    <MmmSection
      transparent
    >
      <ReButtonInfo
        title="О доставке"
        alt="Доставка по России"
      ><SvgDelivery/></ReButtonInfo>

      <ReButtonInfo
        title="Способы оплаты"
        alt="Оплата наличными, картой, на счет, а также..."
        bg="linear-gradient(120.56deg, #4B1B86 23.58%, #21629C 94.38%);"
      ><SvgPayments/></ReButtonInfo>

      <ReButtonInfo
        picture-url="~assets/images/illusDelivery.svg"
        title="Гарантия"
        alt="Год гарантии на большинство товаров"
        bg="    linear-gradient(120.56deg, #1E1B86 23.58%, #219C8B 94.38%);"
      ><SvgGaranty/></ReButtonInfo>
    </MmmSection>
    <MmmSection transparent>
      <MmmHorizontal>
        <MmmHorizontalItem>
          <ReCardInfo />
        </MmmHorizontalItem>
      </MmmHorizontal>
    </MmmSection>
    <div v-if="false" class="homeInfo__col">    
        <div class="homeInfo__company">
          
          <div class="companyItem companyItem--reviews">
            <img src="/assets/images/c-reviews.png" class="companyItem__pic" />
            <div class="companyItem__pic"></div>
            <div class="companyItem__overflow"></div>
            <RButton
              class="companyItem__details"
              text="34 отзыва"
              type="detailsOnDark"
              size="xsmall"
            />
            <div class="companyItem__content">
              <div class="companyItem__title companyItem__title--large">
                7035
              </div>
              <div class="companyItem__title companyItem__title--bold">
                довольных клиентов
              </div>
              <div class="companyItem__title companyItem__title--small companyItem__title--bold">
                (на 20.10.20)
              </div>
            </div>
          </div>
          <div class="companyItem companyItem--cold">
            <img src="~/assets/images/c-cold.png" class="companyItem__pic" />
            <div class="companyItem__overflow"></div>
            <RButton
              class="companyItem__details"
              text="Посмотреть сертификаты"
              type="detailsOnDark"
              size="xsmall"
            />
            <div class="companyItem__content">
              <div class="companyItem__title companyItem__title--large">Более</div>
              <div class="companyItem__title companyItem__title--xlarge">1 000 000</div>
              <div class="companyItem__title">кубов холода</div>
              <div class="companyItem__title companyItem__title--offset">мы произвели</div>
              <div class="companyItem__title companyItem__title--large companyItem__title--right">за <span class="companyItem__title--bold">11</span> лет работы</div>
            </div>
          </div>
          <div class="homeInfo__bottomNav">
            <RButton
              class="companyItem__details"
              text="Больше информации о нас"
              type="detailsOnDark"
              size="xsmall"
            />
          </div>
        </div>
        <div class="homeInfo__stories">
          <div class="storyCard">
            <div class="storyCard__pic"></div>
            <div class="storyCard__overlay" style="background-color: rgba(33,33,33,.34);"></div>
            <div class="storyCard__title storyCard__title--light">Правильно считаем объем камеры</div>
          </div>
          <div class="storyCard">
            <div class="storyCard__pic"></div>
            <div class="storyCard__overlay"></div>
            <div class="storyCard__title storyCard__title--main">Правильно считаем объем камеры</div>
          </div>
          <div class="storyCard">
            <div class="storyCard__pic"></div>
            <div class="storyCard__overlay" style="background-color: rgba(0, 209, 164, 0.34);"></div>
            <div class="storyCard__title storyCard__title--accent">Правильно считаем объем камеры</div>
          </div>
          <div class="storyCard">
            <div class="storyCard__pic"></div>
            <div class="storyCard__overlay" style="background-color: rgba(33,33,33,.34);"></div>
            <div class="storyCard__title storyCard__title--light">Правильно считаем объем камеры</div>
          </div>
          <div class="homeInfo__bottomNav">
            <RButton
              text="Больше историй"
              type="details"
              size="small"
            />
          </div>
        </div></div>
  </section>
</template>

<script>

export default {
  components: {
    SvgDelivery: () => import('/assets/images/illusDelivery.svg'),
    SvgPayments: () => import('/assets/images/illusPayment.svg'),
    SvgGaranty: () => import('/assets/images/garanty.svg'),
  }
}
</script>

<style lang="scss">

  // // Факты о компании
  @include block(companyItem) {
    position: relative;
    display: block;
    text-align: center;
    color: $light;
    background-size: cover;
    background-repeat: no-repeat;
    overflow: hidden;
    @include padding-vmin(21px);
    border-radius: 34px;

    @include element(pic) {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(33,33,33,.34);
      z-index:0;
    }

    @include element(overflow) {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(33,33,33,.34);
      z-index:1;
    }

    @include element(details) {
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: 3;
      display: block;
      text-align: right;
      left: 0;
      top: 1.3vmin;
      padding-right: 2.1vmin;
    }

    @include element(content) {
      position: relative;
      z-index: 2;
      @include vmin(margin-top,34px);
      font-weight: 300;
    }
    @include element(title) {
      text-transform: uppercase;
      font-size: 1.3vmin;
      line-height: 1.3vmin * 1.3;
      margin-bottom: .8vmin;

      @include modifier(small) {
        @include font-vmin(16px);
      }
      @include modifier(large) {
        font-size: 2.1vmin;
        margin-bottom: 1.3vmin;
      }
      @include modifier(xlarge) {
        font-size: 2.7vmin;
        margin-bottom: 1.4vmin;
      }
      @include modifier(bold) {
        font-weight: bold;
      }
      @include modifier(right) {
        text-align: right;
      }
      @include modifier(offset) {
        padding-left: 1.5vmin;
      }
    }

    @include modifier(cold) {
      @include element(content) {
        text-align: left;
        width: 73%;
        margin: 1vmin auto;
      }
    }

    @include modifier(reviews) {
      text-align: left;
      grid-area: reviewsCell;
    }
  }

  // // block Информация о компании
  // @include block(homeInfo) {
  //   @include block-large($bg-light-accent);
  //   z-index: 3;
  //   display: grid;
  //   grid-template-columns: 55% 1fr;
  //   grid-template-rows: min-content 1fr;
  //   gap: 34px 34px;
  //   grid-template-areas:
  //     "infoMain infoMain"
  //     ". .";

  //   @include element(main) {
  //     @include up-vmin(margin-top,89px);
  //     @include up-vmin(margin-bottom,89px);
  //     width: 100%;
  //     display: flex;
  //     justify-content: space-around;
  //     @supports (display: grid) {
  //       grid-area: infoMain; 
  //       display: grid;
  //       grid-template-columns: repeat(3, 1fr);
  //       gap: 13px;
  //     }
  //   }

  //   @include element(col) {
  //     @include flex-centered;
  //     @include up-vmin(padding-left,21px);
  //     @include up-vmin(padding-right,21px);
  //   }

  //   @include element(company) {
  //     @supports not (display: grid) {
  //       width: 55%;
  //     }
  //     display: grid;
  //     grid-template-columns: 2fr 1fr;
  //     grid-template-rows: 1fr 1fr min-content;
  //     gap: 21px 21px;
  //     grid-template-areas:
  //       ". reviewsCell"
  //       ". reviewsCell"
  //       "companyNav companyNav";
  //   }

  //   @include element(companyNav) {
  //     margin-top: 0;
  //     grid-area: companyNav;
  //   }

  //   @include element(stories) {
  //     overflow: hidden;
  //     @supports not (display: grid) {
  //       display: flex;
  //       flex-wrap: wrap;
  //     }
  //     display: grid;
  //     grid-template-columns: 1fr 1fr;
  //     grid-template-rows: 1fr 1fr min-content;
  //     gap: 2em 2em;
  //     grid-template-areas:
  //       ". ."
  //       ". ."
  //       "storiesNav storiesNav";
  //   }

  //   @include element(storiesNav) {
  //     margin-top: 0;
  //     grid-area: storiesNav;
  //   }
  // }

  // // Информация о доставке и т.п.
  // @include block(infoButton) {
  //   //@include padding(21px);
  //   //@include height(89px);
  //   border-radius: 21px;
  //   @include padding-vmin(21px);
  //   @include up-vmin(height,89px);
  //   color: $light;
  //   position: relative;
  //   display: flex;
  //   justify-content: space-between;
  //   font-weight: 500;
  //   cursor: pointer;

  //   &:hover {
  //     @include element(title) {
  //       &::after {
  //         transform: translateX(8px);
  //       }
  //     }
  //     @include element(pic) {
  //       transform: scale(1.03)
  //     }
  //   }

  //   @include modifier(gp) {
  //     background: linear-gradient(120.56deg, #0CB8AE 23.58%, #66219C 94.38%);
  //   }
  //   @include modifier(pp) {
  //     background: linear-gradient(253.33deg, #7731AE 11.13%, #4D0CB8 59.34%, #7E31BB 115.13%);
  //   }
  //   @include modifier(pg) {
  //     background: linear-gradient(257.19deg, #0CB8AE 15.05%, #651F9C 98.34%);
  //   }

  //   @include element(pic) {
  //     margin-top: -13%;
  //     transition: transform .3s ease-in-out;
  //     //@include width(89px);
  //     @include up-vmin(width,89px);

  //     svg, img {
  //       max-width: 100%;
  //       max-height: 100%;
  //     }
  //   }

  //   @include element(title) {
  //     text-transform: uppercase;
  //     display: flex;
  //     justify-content: flex-end;
  //     align-items: center;
  //     //@include font-height(21px);
  //     //@include padding-left(55px);
  //     width: min-content;
  //     @include font-vmin(21px);
  //     @include up-vmin(padding-left,55px);

  //     &::after {
  //       display: inline-block;
  //       transform: translateX(0);
  //       transition: transform .3s .2s ease-in;
  //       //@include margin-left(13px);
  //       @include up-vmin(margin-left,13px);
  //     }
  //   }
  // }



  // // Превью сторис
  // @include block(storyCard) {
  //   border-radius: 21px;
  //   @include padding-vmin(21px);
  //   display: flex;
  //   align-items: flex-end;
  //   position: relative;
  //   overflow: hidden;
  //   transition: transform .35s ease-in;
  //   transform: scale(1);
  //   cursor: pointer;

  //   @include element(pic) {
  //     position: absolute;
  //     top: 0;
  //     left: 0;
  //     width: 100%;
  //     height: 100%;
  //     z-index: 0;
  //   }

  //   @include element(overlay) {
  //     position: absolute;
  //     top: 0;
  //     left: 0;
  //     width: 100%;
  //     height: 100%;
  //     z-index: 1;
  //     background-color: transparent(#98CEFF, 34%);
  //   }

  //   @include element(title) {
  //     position: relative;
  //     z-index: 2;
  //     font-size: 1.4vmin;
  //     line-height: 2.1vmin;
  //     font-weight: 500;
  //     max-width: 13vmin;
  //     width: 80%;

  //     @include modifier(light) {
  //       color: $light;
  //     }
  //     @include modifier(main) {
  //       color: $c-main;
  //     }
  //     @include modifier(accent) {
  //       color: $c-accent;
  //     }

  //   }

  //   &:hover {
  //     transform: scale(1.1);
  //   }
  // }
</style>
