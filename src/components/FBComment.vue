<template>
    <div class="fb-comment-block" style="margin-top: 0;">
        <div class="fb-comments" :data-href="href" data-numposts="5" data-width="100%" data-order-by="reverse_time"></div>
    </div>
</template>

<script>
export default {
    props: ['href']
}
</script>

<style lang="scss" scoped>
    .fb-comment-block{
    	width: 100%;
    	background-color: #fff;
    }
</style>