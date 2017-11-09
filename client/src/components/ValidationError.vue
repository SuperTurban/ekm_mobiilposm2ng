<template>
<div v-show="msg" class="alert alert-danger validation-error">
    {{msg}}
</div>
</template>



<script>
export default {
    name : 'verror',
    props : ['msg'] 
}
</script>

<style>
    .validation-error{
        color:red;
        font-size:12px;
        padding : 0.15rem;
    }
</style>
