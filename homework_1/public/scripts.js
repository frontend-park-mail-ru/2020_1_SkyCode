const frontendElement =
    document.getElementsByClassName('frontend')[0];
frontendElement.addEventListener('mouseover', () => {
    console.log('over');
    frontendElement.style.opacity = 0;
});

frontendElement.addEventListener('mouseleave', () => {
    console.log('leave');
    frontendElement.style.opacity = 1;
});