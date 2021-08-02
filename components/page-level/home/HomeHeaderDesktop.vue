<template>
  <div class="homeHeader">

  </div>
</template>
<script>
export default {
  data() {
    return {
      headerData: {
        
      }
    }
  }
}
</script>

<style lang="scss">

@media screen and (min-width: $breakpoint-to-fluid) {

}
</style>

<style lang="scss">
$base: vw(233px);
$isometricTransforms: translateZ(-($base * 8)) rotateX(60deg) rotateY(0deg) rotateZ(45deg);
@keyframes moveTopCube {
  from {
    transform: scale3d(.5, .5, .5) translateY(-($base * 0.55)) translateX($base*2) $isometricTransforms;
  }
  to {
    transform: scale3d(.8, .8, .8) translateX(2vw) translateY(-($base / 2)) translateZ(-($base * 8)) rotateX(444deg) rotateY(-5deg) rotateZ(3deg);
  }
}
@keyframes moveCenterCube {
  from {
    transform: scale3d(.5, .5, .5) translateY(-($base * 0.55)) translateX($base*2) $isometricTransforms
  }
  to {
    transform: scale3d(.8,.8,.8) translateX(($base * 1.8)) translateY(-($base / 2)) translateZ(-($base * 2)) rotateX(453deg) rotateY(-353deg) rotateZ(10deg);
  }
}
@keyframes moveBottomCube {
  from {
    transform: scale3d(.5, .5, .5) translateY($base * 0.66) translateX($base * 2.72) $isometricTransforms;
  }
  to {
    transform: scale3d(.8,.8,.8) translateX(($base * 2.1)) translateY(($base * .89)) translateZ(-($base * 2)) rotateX(93deg) rotateY(-3deg) rotateZ(-350deg);
  }
}

@keyframes float {
	0% {
		transform: scale3d(.8, .8, .8) translateX(2vw) translateY(-($base / 2)) translateZ(-($base * 8)) rotateX(444deg) rotateY(-5deg) rotateZ(3deg);
	}
	50% {
		transform: scale3d(.8, .8, .8) translateX(2vw) translateY(-($base / 1.618)) translateZ(-($base * 4)) rotateX(444deg) rotateY(-5deg) rotateZ(3deg);
	}
	100% {
		transform: scale3d(.8, .8, .8) translateX(2vw) translateY(-($base / 2)) translateZ(-($base * 8)) rotateX(444deg) rotateY(-5deg) rotateZ(3deg);
	}
}


@include block(cube) {
  &Scene {
    display: none;
    position: absolute;
    width: $base;
    height: $base;
    will-change: transform;
    //perspective: $base * 2;

    &--bottom {
      z-index: 2;
      transform: scale(.5) translateX(70%) translateY(35%);    
      animation-name: showBottomCube;
      animation-duration: 1s;
      animation-timing-function: cubic-bezier(0.785, 0.135, 0.150, 0.860);
      animation-delay: 2s;
      animation-fill-mode: forwards;

      .cube {
        animation-name: rotateBottomCube;
        animation-duration: 1s;
        animation-timing-function: cubic-bezier(0.58, -0.06, 0.05, 1.04);
        animation-delay: 2s;
        animation-fill-mode: forwards;
      }
    }
    &--center {
      transform: scale(.5);
      animation-name: showCenterCube;
      animation-duration: 1s;
      animation-timing-function: cubic-bezier(0.785, 0.135, 0.150, 0.860);
      animation-delay: 1s;
      animation-fill-mode: forwards;

      .cube {
        animation-name: rotateCenterCube;
        animation-duration: 1s;
        animation-timing-function: cubic-bezier(0.58, -0.06, 0.05, 1.04);
        animation-delay: 1s;
        animation-fill-mode: forwards;
      }
    }
    &--top {
      transform: scale(.5) translateY(-87%);
      z-index: 3;
      animation-name: showTopCube;
      animation-duration: 1s;
      animation-timing-function: cubic-bezier(0.785, 0.135, 0.150, 0.860);
      animation-delay: 0s;
      animation-fill-mode: forwards;

      .cube {
        animation-name: rotateTopCube;
        animation-duration: 1s;
        animation-timing-function: cubic-bezier(0.58, -0.06, 0.05, 1.04);
        animation-delay: 0s;
        animation-fill-mode: forwards;
      }
    }
  }

  position: absolute;
  bottom: 0;
  left: 0;
  transform-style: preserve-3d;
  transition: transform 1s;
  width: $base;
  height: $base;  

  @include element(face) {
    position: absolute;
    width: $base;
    height: $base;

    @include modifier(front) {
      transform: rotateY(0deg) translateZ(($base / 2));
      background: linear-gradient(168.68deg, #068CA9 -3.57%, #441A87 83.6%);
    }

    @include modifier(back) {
      transform: rotateY(180deg) translateZ(($base / 2));
      background: linear-gradient(168.68deg, #068CA9 -3.57%, #441A87 83.6%);
    } 

    @include modifier(right) {
      transform: rotateY(90deg) translateZ(($base / 2));
      background: linear-gradient(180deg, #882BD0 -26.47%, #4926AD 100%);
    }    

    @include modifier(left) {
      transform: rotateY(-90deg) translateZ(($base / 2));
      background: linear-gradient(180deg, #882BD0 -26.47%, #4926AD 100%);
    }

    @include modifier(top) {
      transform: rotateX(90deg) translateZ(($base / 2));
      background: linear-gradient(180deg, #0B9B9B 0%, #045B76 113.48%);
    }

    @include modifier(bottom) {
      transform: rotateX(-90deg) translateZ(($base / 2));
      background: linear-gradient(180deg, #0B9B9B 0%, #045B76 113.48%);
    }
  }

  @include modifier(restaurants) {
    z-index: 2;
    transform: scale3d(.5, .5, .5) translateY($base * 0.3) translateX($base*2) $isometricTransforms;
  }
  @include modifier(shops) {
    z-index: 3;
    transform: scale3d(.5, .5, .5) translateY(-($base * 0.55)) translateX($base*2) $isometricTransforms;
  }
  @include modifier(fridges) {
    z-index: 4;
    transform: scale3d(.5, .5, .5) translateY($base * 0.66) translateX($base * 2.72) $isometricTransforms;
  }
}



  //
  $total-lines: 5;
  $left-offset: 21px;
  $clip-height: 34px;
  $clip-height-m: -34px;
  $line-height: $clip-height - 5px;
  //
  @include block(isometricTitle) {
    margin: 0 auto;
    @include up-vw(padding-bottom,55px);
    @include font-vw(34px);
    font-weight: 300;
    letter-spacing: -2px;
    text-transform: uppercase;
    transform: translate3d(0, 0, 0);
    -webkit-font-smoothing: antialiased;
    -webkit-font-kerning: normal;
    -webkit-text-size-adjust: 100%;

    @include element(line) {
      display: block;
      height: vw($clip-height);
      //overflow: hidden;
      position: relative;
      
      &:nth-child(odd) {
        transform: skew(60deg, -30deg) scaleY(.66667);
      }
      &:nth-child(even) {
        transform: skew(0deg, -30deg) scaleY(1.33333);
      }
      
      @for $i from 1 through $total-lines+1 {
        &:nth-child(#{$i}) {
          left: vw($left-offset * $i);
        }
      }

      p {
        height: vw($clip-height);
        line-height: vw($line-height);
        padding: 0 10px;
        transition: all .4s ease-in-out;
        transform: translate3d(0, 0, 0);
        white-space: nowrap;
      }
    }

    @include modifier(second) {
      $total-lines: 2;
      $right-offset: 13px;
      $clip-height: 34px;
      $clip-height-m: -34px;
      $line-height: $clip-height * 1.618;

      @include element(line) {
        display: block;
        height: vw($clip-height);
        overflow: hidden;
        position: relative;
        @include font-vw(21px);
        
        &:nth-child(1) {
          transform: skew(0deg, 30deg) scaleY(1.33333);
        }
        
        &:nth-child(2) {
          margin-top: 2.1vw;
          margin-left: 3.4vw;
          transform: skew(-60deg, 30deg) scaleY(.66667);
        }

        p {
          height: vw($clip-height);
          line-height: vw($line-height);
          padding: 0 10px;
          transition: all .4s ease-in-out;
          transform: translate3d(0, -(vw($clip-height)), 0);
          vertical-align: top;
          white-space: nowrap;
          font-weight: 600;
        }
      }
    }
  }


  // block Каталог проектов

  @include block(projectCatCard) {
    position: relative;
    @include up-vw(min-height,233px);
    @include up-vw(min-width,233px);
    width: 100%;
    height: 100%;
    border-radius: $r-small;
    display: flex;
    justify-content: flex-end;

    &:hover {

      @include element(details) {  
        &::after {
          transform: translateX(5px);
        }
      }
    }

    @include element(desc) {
      color: $c-light;
      position: relative;
      z-index:2;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      text-align: left;
      text-transform: uppercase;
      border-radius: $r-small;
      cursor: pointer;
      width: 100%;
      height: 100%;
      @include padding-vw(13px);
    }

    @include element(title) {
      font-weight: 500;
      @include font-vw(18px);
    }

    @include element(price) {
      font-weight: 500;
      @include font-vw(16px);
    }

    @include element(details) {
      @include font-vw(12px);

      &::after {
        @include perfect-transition;
        transform: translateX(0);
        display: inline-block;

      }
    }

    @include modifier(restorants) {
      @include element(pic) {
        background-image: url(#{$assets}/images/p-1.png);
      }
      @include element(overflow) {
        background: rgb(72 10 120 / 0.21);
      }
      @include element(desc) {
        background: linear-gradient(180deg, #882BD0 -26.47%, #4926AD 100%);
      }
    }

    @include modifier(shops) {
      @include element(desc) {
        background: linear-gradient(168.68deg, #068CA9 -3.57%, #441A87 83.6%);
      }
    }

    @include modifier(fridges) {
      @include element(desc) {
        @include up-vw(padding-left,21px);
        background: linear-gradient(180deg, #0B9B9B 0%, #045B76 113.48%);
      }
    }
  }

  @include block(homeDelivery) {
   
    @include element(map) {
      &Scene {
        perspective: 100vw;
        width: 55%;
      }      
      transform: rotateX(60deg) rotateZ(-45deg) scale(0.5);
    }
    @include element(title) {
      
    }
  }

  // block Каталог оборудования


  @include block(homeCatalog) {
    @include container;
    @include block-large($bg-light);  
    @include up-vw(padding-bottom,55px);
    @include up-vw(padding-top, 144px);
    //@include padding-vw(233px, 21px, 55px, 21px);
    z-index: 4;

    @include element(header) {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      @include up-vw(margin-bottom, 34px);
    }

    @include element(title) {
      @include font-vw(28px);
    }

    @include element(search) {
      width: 34%;
    }
  }

  // block Информация о компании
  @include block(homeInfo) {
    @include block-large($bg-light-accent);
    z-index: 3;
    display: grid;
    grid-template-columns: 55% 1fr;
    grid-template-rows: min-content 1fr;
    gap: 34px 34px;
    grid-template-areas:
      "infoMain infoMain"
      ". .";

    @include element(main) {
      @include up-vw(margin-top,89px);
      @include up-vw(margin-bottom,89px);
      width: 100%;
      display: flex;
      justify-content: space-around;
      @supports (display: grid) {
        grid-area: infoMain; 
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 13px;
      }
    }

    @include element(col) {
      @include flex-centered;
      @include up-vw(padding-left,21px);
      @include up-vw(padding-right,21px);
    }

    @include element(company) {
      @supports not (display: grid) {
        width: 55%;
      }
      display: grid;
      grid-template-columns: 2fr 1fr;
      grid-template-rows: 1fr 1fr min-content;
      gap: 21px 21px;
      grid-template-areas:
        ". reviewsCell"
        ". reviewsCell"
        "companyNav companyNav";
    }

    @include element(companyNav) {
      margin-top: 0;
      grid-area: companyNav;
    }

    @include element(stories) {
      overflow: hidden;
      @supports not (display: grid) {
        display: flex;
        flex-wrap: wrap;
      }
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr 1fr min-content;
      gap: 2em 2em;
      grid-template-areas:
        ". ."
        ". ."
        "storiesNav storiesNav";
    }

    @include element(storiesNav) {
      margin-top: 0;
      grid-area: storiesNav;
    }
  }

  // Информация о доставке и т.п.
  @include block(infoButton) {
    //@include padding(21px);
    //@include height(89px);
    border-radius: 21px;
    @include padding-vw(21px);
    @include up-vw(height,89px);
    color: $c-light;
    position: relative;
    display: flex;
    justify-content: space-between;
    font-weight: 500;
    cursor: pointer;

    &:hover {
      @include element(title) {
        &::after {
          transform: translateX(8px);
        }
      }
      @include element(pic) {
        transform: scale(1.03)
      }
    }

    @include modifier(gp) {
      background: linear-gradient(120.56deg, #0CB8AE 23.58%, #66219C 94.38%);
    }
    @include modifier(pp) {
      background: linear-gradient(253.33deg, #7731AE 11.13%, #4D0CB8 59.34%, #7E31BB 115.13%);
    }
    @include modifier(pg) {
      background: linear-gradient(257.19deg, #0CB8AE 15.05%, #651F9C 98.34%);
    }

    @include element(pic) {
      margin-top: -13%;
      transition: transform .3s ease-in-out;
      //@include width(89px);
      @include up-vw(width,89px);

      svg, img {
        max-width: 100%;
        max-height: 100%;
      }
    }

    @include element(title) {
      text-transform: uppercase;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      //@include font-height(21px);
      //@include padding-left(55px);
      width: min-content;
      @include font-vw(21px);
      @include up-vw(padding-left,55px);

      &::after {
        display: inline-block;
        transform: translateX(0);
        transition: transform .3s .2s ease-in;
        //@include margin-left(13px);
        @include up-vw(margin-left,13px);
      }
    }
  }

  // Факты о компании
  @include block(companyItem) {
    position: relative;
    display: block;
    text-align: center;
    color: $c-light;
    background-size: cover;
    background-repeat: no-repeat;
    overflow: hidden;
    @include padding-vw(21px);
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
      top: 1.3vw;
      padding-right: 2.1vw;
    }

    @include element(content) {
      position: relative;
      z-index: 2;
      @include up-vw(margin-top,34px);
      font-weight: 300;
    }
    @include element(title) {
      text-transform: uppercase;
      font-size: 1.3vw;
      line-height: 1.3vw * 1.3;
      margin-bottom: .8vw;

      @include modifier(small) {
        @include font-vw(16px);
      }
      @include modifier(large) {
        font-size: 2.1vw;
        margin-bottom: 1.3vw;
      }
      @include modifier(xlarge) {
        font-size: 2.7vw;
        margin-bottom: 1.4vw;
      }
      @include modifier(bold) {
        font-weight: bold;
      }
      @include modifier(right) {
        text-align: right;
      }
      @include modifier(offset) {
        padding-left: 1.5vw;
      }
    }

    @include modifier(cold) {
      @include element(content) {
        text-align: left;
        width: 73%;
        margin: 1vw auto;
      }
    }

    @include modifier(reviews) {
      text-align: left;
      grid-area: reviewsCell;
    }
  }

  // Превью сторис
  @include block(storyCard) {
    border-radius: 21px;
    @include padding-vw(21px);
    display: flex;
    align-items: flex-end;
    position: relative;
    overflow: hidden;
    transition: transform .35s ease-in;
    transform: scale(1);
    cursor: pointer;

    @include element(pic) {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 0;
    }

    @include element(overlay) {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
      background-color: transparent(#98CEFF, 34%);
    }

    @include element(title) {
      position: relative;
      z-index: 2;
      font-size: 1.4vw;
      line-height: 2.1vw;
      font-weight: 500;
      max-width: 13vw;
      width: 80%;

      @include modifier(light) {
        color: $c-light;
      }
      @include modifier(main) {
        color: $c-main;
      }
      @include modifier(accent) {
        color: $c-accent;
      }

    }

    &:hover {
      transform: scale(1.1);
    }
  }
</style>