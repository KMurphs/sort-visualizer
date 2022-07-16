<script>
    import setupVH from "../utils/vh";
    import {onMount} from "svelte";
    onMount(setupVH);


    import BottomNavBar from "../components/NavBar/BottomNavBar.svelte";
    import TopNavBar from "../components/NavBar/TopNavBar.svelte";

	import Modal from "../components/Modal/Modal.svelte";
	let isModalShowing = false;

    const randomFromRange = (max = 100, min = 0)=>Math.floor(Math.random()*(max-min+1)+min);

    const sortData = {
        asWas: [],
        asIs: [],
        defaultSize: 10,
    }

    const handleNavClick = (navItem) => {
        console.log(navItem)
        if(navItem === "fa-gears") isModalShowing = true;
        if(navItem === "fa-chart-simple") { sortData.asIs = Array.from(Array(sortData.defaultSize)).map(randomFromRange); sortData.asWas = Array.from(sortData.asIs); }
        console.log(sortData)
        heapSort(sortData.asIs)
        console.log(sortData)

    }


    const heapSort = (arr)=>{
        for(let i = arr.length / 2 - 1; i >= 0; i--) {
            heapify(arr, arr.length, i);
        }
        for(let i = arr.length - 1; i >= 0; i--) {
            swap(arr, 0, i);
            heapify(arr, i, 0);
        }
    }
    const heapify = (heap, heapSize, start)=>{
        const lChild = 2 * start + 1;
        const rChild = 2 * start + 2;

        let maxFamily = start;
        if(lChild < heapSize && heap[lChild] > heap[maxFamily]) maxFamily = lChild;
        if(rChild < heapSize && heap[rChild] > heap[maxFamily]) maxFamily = rChild;

        if(maxFamily !== start){
            swap(heap, maxFamily, start);
            heapify(heap, heapSize, maxFamily);
        }
    }
    const swap = (arr, l, r) => {
        const tmp = arr[l];
        arr[l] = arr[r];
        arr[r] = tmp;
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