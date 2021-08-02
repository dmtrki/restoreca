<template>
  <div class="cubeScene">
    <div class="cube">
      <div 
        class="cube__face cube__face--front"
        :style="true"
      >

      </div>
      <div class="cube__face cube__face--back">back</div>
      <div class="cube__face cube__face--right">right</div>
      <div class="cube__face cube__face--left">left</div>
      <div class="cube__face cube__face--top">top</div>
      <div class="cube__face cube__face--bottom">bottom</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    "base" : {
      type: String
    },
    "colorBase": {
      type: String
    },
    "colors": {
      type: Array
    },
    "transform": {
      type: String
    },
    "content": {
      type: Array
    }
  },
  computed() {
  }
}
</script>

<style lang="scss">
$base: 3vw;

@include block(cube) {
  &Scene {
    position: absolute;
    width: $base;
    height: $base;
    //perspective: $base * 2;

    &--small {
      width: 5vw;
      height: 5vw;
    }
  }

  position: relative;
  transform-style: preserve-3d;
  transform: translateZ(-($base / 2)) rotateX(60deg) rotateY(0deg) rotateZ(-45deg);
  transition: transform 1s;
  width: $base;
  height: $base;

  .cube.show-front  { transform: translateZ(-100px) rotateY(   0deg); }
  .cube.show-right  { transform: translateZ(-100px) rotateY( -90deg); }
  .cube.show-back   { transform: translateZ(-100px) rotateY(-180deg); }
  .cube.show-left   { transform: translateZ(-100px) rotateY(  90deg); }
  .cube.show-top    { transform: translateZ(-100px) rotateX( -90deg); }
  .cube.show-bottom { transform: translateZ(-100px) rotateX(  90deg); }

  

  @include element(face) {
    position: absolute;
    width: $base;
    height: $base;

    @include modifier(front) {
      transform: rotateY(0deg) translateZ(-($base / 2));
      background:#237A57;
    }

    @include modifier(right) {
      transform: rotateY(90deg) translateZ(-($base / 2));
      background:#23417a;
      background: linear-gradient(180deg, #882BD0 -26.47%, #4926AD 100%);
    }

    @include modifier(back) {
      transform: rotateY(180deg) translateZ(-($base / 2));
      background: linear-gradient(168.68deg, #068CA9 -3.57%, #441A87 83.6%);
    } 

    @include modifier(left) {
      transform: rotateY(-90deg) translateZ(-($base / 2));
      background:#7a2356;
    }

    @include modifier(top) {
      transform: rotateX(90deg) translateZ(-($base / 2));
      background: linear-gradient(180deg, #0B9B9B 0%, #045B76 113.48%);
    }

    @include modifier(bottom) {
      transform: rotateX(-90deg) translateZ(-($base / 2));
      background:#7a7423;
    }
  }
}
</style>