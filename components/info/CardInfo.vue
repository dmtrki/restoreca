<template>
  <div class="infoCard" style="background-image: url('/assets/images/c-storages.png');">
    <div class="infoCard__overflow"></div>
    
    <div class="infoCard__content">
      <div class="infoCard__title infoCard__title--large infoCard__title--bold">
        Сеть складов
      </div>
      <div class="infoCard__title infoCard__title--large">
        По всей россии
      </div>
      <div class="infoCard__title infoCard__title--large infoCard__title--bold">
        18 городов
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
  @include block(infoCard) {
    background-size: cover;
    background-repeat: no-repeat;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    border-radius: 13px;
    max-width: 100%;
    @include vmin(padding, 13px);
    @include vmin(width, 360px);
    
  }
</style>
