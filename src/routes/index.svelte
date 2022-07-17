<script>
    import setupVH from "../utils/vh";
    import {onMount} from "svelte";
    onMount(setupVH);

    let anchor;
    let delta = 0;
    function Anchor (node) {
        anchor = node;
        // anchor.value = 'Hello world!';
    }
    $: delta = (effectIndex != null) && anchor?.childNodes?.length > 1 && Math.abs(anchor.getBoundingClientRect().width / anchor.childNodes.length);
    $: console.log(delta)

    import BottomNavBar from "../components/NavBar/BottomNavBar.svelte";
    import TopNavBar from "../components/NavBar/TopNavBar.svelte";

	import Modal from "../components/Modal/Modal.svelte";
	let isModalShowing = false;

    const randomFromRange = (max = 100, min = 0)=>Math.floor(Math.random()*(max-min+1)+min);
    
    import { fade, fly } from 'svelte/transition';

    const sortData = {
        source: [],
        // indices: [],
        defaultSize: 10,
    };
    let effectsControls = {
        data: [],
        freq: 1000,
        index: 0,
        doRunEffect: true,
    }
    let maxValue = 1;
    $: maxValue = Math.max(...sortData.source);

    const handleNavClick = (navItem) => {
        console.log(navItem)
        if(navItem === "fa-gears") isModalShowing = true;
        if(navItem === "fa-circle-info") effectsControls.doRunEffect = !!!effectsControls.doRunEffect;
        if(navItem === "fa-chart-simple") { sortData.source = Array.from(Array(sortData.defaultSize)).map(randomFromRange); } //sortData.indices = Array.from(sortData.source).map((v,i)=>i); }
    }


    const heapSort = (arr, effects)=>{
        // effects.algorithm = "Heap Sort";

        // effects.title = "Phase 1: Mutate Array so Heap Properties are satisfied";
        // cb({title: "Phase 1: Mutate Array so Heap Properties are satisfied", text: "Starting from the bottom elements, ensure that for every local set of 3 elements, the parent is greater than both children", level: 0})
        for(let i = Math.floor(arr.length / 2) - 1; i >= 0; i--) {
            // cb({title: `Fix subtree rooted at index ${i}`, text: "", level: 1},)
            heapify(arr, arr.length, i, effects);
        }
        
        // effects.title = "Phase 2: Extract 1 from Heap until empty";
        // cb({title: "Phase 2: Extract 1 from Heap until empty", text: "Essentially, the array is partitioned in two parts: The left side of the array is the shrinking heap and the right side is the growing sorted sequence of elements", level: 0})
        for(let i = arr.length - 1; i >= 0; i--) {
            // cb({title: `Fix subtree rooted at index ${0} with size ${i}`, text: `The right side of the array contains the sorted sequence. It is growing and has the greatest ${arr.length - i} elements`, level: 1},)
            swap(arr, 0, i, effects);
            heapify(arr, i, 0, effects);
        }
    }
    const heapify = (heap, heapSize, start, effects)=>{
        const lChild = 2 * start + 1;
        const rChild = 2 * start + 2;

        let maxFamily = start;
        if(lChild < heapSize && heap[lChild] > heap[maxFamily]) maxFamily = lChild;
        if(rChild < heapSize && heap[rChild] > heap[maxFamily]) maxFamily = rChild;

        if(maxFamily !== start){
            swap(heap, maxFamily, start, effects);
            heapify(heap, heapSize, maxFamily, effects);
        }
    }
    const swap = (arr, l, r, effects) => {
        const tmp = arr[l];
        arr[l] = arr[r];
        arr[r] = tmp;
        effects && effects.push([...effects[effects.length - 1]]) && swap(effects[effects.length - 1], l, r);
        return arr;
    }

    let msg = "";
    const handleSort = (arr)=>{
        effectsControls.data = [ Array.from(sortData.source).map((v,i)=>i) ];
        effectsControls.index = 0;
        heapSort(arr,  effectsControls.data);
        console.log("Sort finished", effectsControls.data, arr);
        tickFn(effectsControls);
    }


    let effectIndex = 0; // For some reason referencing 'effectsControls.index' was not enough to cause re-render on change
    // $: effectIndex = sortData && effectsControls.index;
    const tickFn = (effects)=>{
        console.log("In Tick", effects);
        // effects.data && effects.index != null && effects.doRunEffect && console.log(effects.data[effects.index]);
        effects.data && effects.index != null && effects.doRunEffect && (effects.index = effects.index + 1);
        // effects.data && effects.index != null && effects.doRunEffect && (sortData.indices = swap(sortData.indices, ...effects.data[effects.index - 1]));
        effects.data && effects.index != null && (effects.index < effects.data.length - 1) && setTimeout(()=>tickFn(effects), effects.freq || 1000);
        msg = `${effects.index}`;
        effectIndex = effects.index;
    }

</script>




<article class="app-main-page hidden-blw-md">Page 1</article>
<article class="app-main-page debug">
    <header>
        <h1>Sort Visualizer</h1>  
        <TopNavBar/>
    </header>
    <!-- $0.childNodes[1].style.transform = "translateX(150px)"  -->
    <main class="debug">
        <section>
            <h3>{msg}</h3>
            <div class="elmt-container" use:Anchor>
                {#each sortData.source as elmt, index }
                    <div in:fly="{{ y: 200, duration: 2000 }}" out:fade class="elmt" style={`transform: translateX(${delta * (effectsControls.data[effectIndex]?.map((v, i) => v === index ? i : null).filter(v=>v!=null)[0] - index)|| '0'}px); height: ${elmt * 10 / maxValue}rem`}>
                        {`${effectsControls.data[effectIndex]?.map((v, i) => v === index ? i : null).filter(v=>v!=null)[0] || ''}`}
                        <span class="hidden-blw-md">{elmt}</span>
                    </div>
                {/each}
            </div>
        </section>
        <section>
            <button on:click={e=>handleSort(sortData.source.map(v=>v))}>Sort</button>
        </section>
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
    .elmt-container{
        display: flex;
        align-items: flex-end;
    }
    .elmt{
        background: rgba(0,0,0,0.3);
        margin: 0 2px;
        flex: 1 1 5px;
        transition: all .3s;
        position: relative;
    }
</style>