<link rel="stylesheet" href="<?= urlTo('assets/css/bootstrap5.min.css') ?>">
<link rel="stylesheet" href="<?= urlTo('assets/jquery/jquery-ui.min.css') ?>">
<link rel="stylesheet" href="<?= urlTo('assets/jquery/jquery-ui.structure.min.css') ?>">
<link rel="stylesheet" href="<?= urlTo('assets/jquery/jquery-ui.theme.min.css') ?>">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">

<style>
    #loading {
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        background-color: rgba(0,0,0,.5);
        -webkit-transition: all .5s ease;
        z-index: 1000;
        display:none;
    }
    .statics-card
    {
        border: 1px solid gray;
        border-radius: 15px;
    }
</style>

<!-- Configurations for JS files -->
<script>
    const API_URL = '<?= API_URL ?>';
    const BASE_URL = '<?= BASE_URL ?>';
</script>