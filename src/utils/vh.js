const define_vh = () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}


export default function setupVH(){
    define_vh();
    window.addEventListener('resize', define_vh);
}