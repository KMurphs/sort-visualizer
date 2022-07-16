<script>
    import setupVH from "../utils/vh";
    import {onMount} from "svelte";
    onMount(setupVH);


    import BottomNavBar from "../components/NavBar/BottomNavBar.svelte";
    import TopNavBar from "../components/NavBar/TopNavBar.svelte";

	import Modal from "../components/Modal/Modal.svelte";
	let isModalShowing = false;

    const handleNavClick = (navItem) => {
        console.log(navItem)
        if(navItem === "fa-gears") isModalShowing = true;
    }

</script>




<article class="app-main-page hidden-blw-md">Page 1</article>
<article class="app-main-page debug">
    <header>
        <h1>Sort Visualizer</h1>  
        <TopNavBar/>
    </header>
    
    <main class="debug">
        <section>
            <h3>Content</h3>
            <div>123</div>
        </section>
        <section>CTA</section>
    </main>

    <BottomNavBar on:click={e=>handleNavClick(e.detail)}/>
    <Modal visible={isModalShowing} on:closeModal={()=>(isModalShowing = false)}/>
</article>

<style>
    .app-main-page{
        flex: 1 1 10rem;
        display: flex;
        flex-direction: column;
    }
    .app-main-page main{
        flex: 1 1 10rem;
    }
</style>