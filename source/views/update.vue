<template lang="pug">

body#update
    h3( class='title center' ) AniLibria
    p( class='status center' ) {{ status.text[ status.code ] }}
    img( class='loading center' src='~src/assets/images/loading.gif' )

    img( class='version-sticker' src='~src/assets/images/Nezuko-01.png' )
    div( class='version-div' )
        span( class='text' ) Version: 0.2.0
        span( class='text' ) Nezuko

</template>

<script>
export default {
    mounted: start,
    data: function () {
        return {
            status: {
                text: ['Подготовка', 'Проверка наличия обновлении', 'Скачиваем обновления', 'Установка'],
                code: 1
            }
        }
    }
}

function start () {
    ipc.on('set-update-status', (sender, codess) => {
        this.status.code = code
    })
}
</script>

<style lang="stylus">
@import '~src/style/base'
@import '~src/style/palette'

#update
    background $midnight
    color $white
    position absolute
    top 0
    left 0
    right 0
    bottom 0
    
    .center
        display block
        margin 0 auto
        text-align center

    .title
        color $red
        font-size 52px
        font-weight 400
        margin-top 32px

    .status
        color darken($white, 5)
        font-size 14px
        font-weight 300
        margin-top 18px

    .loading
        height 8px
        margin-top 6px
        position relative
        left -10px

    .version-sticker
        position absolute
        bottom 2px
        right 6px
        max-height 128px
        max-width 128px

    .version-div
        position absolute
        bottom 12px
        left 14px

        .text
            color darken($white, 15)
            display block
            font-size 10px
            font-weight 300
            line-height 11px

</style>