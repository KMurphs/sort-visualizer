<script lang="ts">
	import { createEventDispatcher } from "svelte";
	const dispatch = createEventDispatcher();

</script>

<nav>
    <ul class="reset">
        <li><button on:click={e => dispatch("click", "fa-circle-info")}><i class="fa-solid fa-circle-info"></i><span class="btn-txt hidden-blw-md">Title</span></button></li>
        <li><button on:click={e => dispatch("click", "fa-gears")}><i class="fa-solid fa-gears"></i><span class="btn-txt hidden-blw-md">Title</span></button></li>
    </ul>
    <ul class="reset">
        <li><button on:click={e => dispatch("click", "fa-retweet")}><i class="fa-solid fa-retweet"></i><span class="btn-txt hidden-blw-md">Title</span></button></li>
        <li><button on:click={e => dispatch("click", "fa-square-pen")}><i class="fa-solid fa-square-pen"></i><span class="btn-txt hidden-blw-md">Title</span></button></li>
        <li><button on:click={e => dispatch("click", "fa-chart-simple")}><i class="fa-solid fa-chart-simple"></i><span class="btn-txt hidden-blw-md">Title</span></button></li>
    </ul>
</nav>

<style>
    nav, ul, li{
        display: flex;
    }
    nav{
        justify-content: space-between;
    }
    button{
        min-width: 3rem;
        height: 3rem;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        display: flex;
        padding: .5rem;
    }
    i{
        font-size: 1.5rem;
    }
    i + span{
        margin-left: 1rem;
    } 
</style>