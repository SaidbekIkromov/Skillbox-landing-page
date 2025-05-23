document.addEventListener('DOMContentLoaded', () => {
    function initializeRangeSlider(sliderElement) {
        const track = sliderElement.querySelector('.range-track');
        const progress = sliderElement.querySelector('.range-progress, .range-progress-duration');
        const thumbMin = sliderElement.querySelector('.range-thumb-min, .range-thumb-min-duration');
        const thumbMax = sliderElement.querySelector('.range-thumb-max, .range-thumb-max-duration');
        const inputMin = sliderElement.querySelector('.range-min, .range-min-duration');
        const inputMax = sliderElement.querySelector('.range-max, .range-max-duration');
        const displayInputMin = sliderElement.querySelector('.range-min-input, .range-min-input-duration');
        const displayInputMax = sliderElement.querySelector('.range-max-input, .range-max-input-duration');

        if (!track || !progress || !thumbMin || !thumbMax || !inputMin || !inputMax || !displayInputMin || !displayInputMax) {
            return; // Skips if essential elements are missing
        }

        const minVal = parseFloat(inputMin.min);
        const maxVal = parseFloat(inputMin.max);
        const step = parseFloat(inputMin.step) || 1;
        const thumbWidth = 12; 

        function updateSliderAppearance() {
            const currentMin = parseFloat(inputMin.value);
            const currentMax = parseFloat(inputMax.value);

            const percentMin = ((currentMin - minVal) / (maxVal - minVal)) * 100;
            const percentMax = ((currentMax - minVal) / (maxVal - minVal)) * 100;

            thumbMin.style.left = `calc(${percentMin}% - ${thumbWidth / 2 * (percentMin / 100)}px)`;
            thumbMax.style.left = `calc(${percentMax}% - ${thumbWidth / 2 * (percentMax / 100)}px)`;
            
            progress.style.left = `${percentMin}%`;
            progress.style.width = `${percentMax - percentMin}%`;

            displayInputMin.value = currentMin;
            displayInputMax.value = currentMax;
        }

        function handleThumbDrag(thumb, input, isMinThumb) {
            let isDragging = false;

            thumb.addEventListener('mousedown', (e) => {
                isDragging = true;
                thumb.classList.add('dragging');
                document.body.style.userSelect = 'none'; // Prevents text selection
            });
            thumb.addEventListener('touchstart', (e) => {
                isDragging = true;
                thumb.classList.add('dragging');
            }, { passive: true });

            document.addEventListener('mousemove', (e) => {
                if (!isDragging) return;
                processMove(e.clientX);
            });
            document.addEventListener('touchmove', (e) => {
                if (!isDragging) return;
                if (e.touches.length > 0) {
                    processMove(e.touches[0].clientX);
                }
            }, { passive: false }); // passive:false if preventDefault might be called

            document.addEventListener('mouseup', () => {
                if (isDragging) {
                    isDragging = false;
                    thumb.classList.remove('dragging');
                    document.body.style.userSelect = '';
                }
            });
             document.addEventListener('touchend', () => {
                if (isDragging) {
                    isDragging = false;
                    thumb.classList.remove('dragging');
                }
            });

            function processMove(clientX) {
                const trackRect = track.getBoundingClientRect();
                let newValue = ((clientX - trackRect.left) / trackRect.width) * (maxVal - minVal) + minVal;
                
                // Snap to step
                newValue = Math.round(newValue / step) * step;

                if (isMinThumb) {
                    newValue = Math.max(minVal, Math.min(newValue, parseFloat(inputMax.value) - step));
                } else {
                    newValue = Math.min(maxVal, Math.max(newValue, parseFloat(inputMin.value) + step));
                }
                input.value = newValue;
                updateSliderAppearance();
            }
        }

        handleThumbDrag(thumbMin, inputMin, true);
        handleThumbDrag(thumbMax, inputMax, false);

        displayInputMin.addEventListener('change', (e) => {
            let val = parseFloat(e.target.value);
            val = Math.max(minVal, Math.min(val, parseFloat(inputMax.value) - step));
            inputMin.value = val;
            e.target.value = val; // Corrects if user enters invalid value
            updateSliderAppearance();
        });

        displayInputMax.addEventListener('change', (e) => {
            let val = parseFloat(e.target.value);
            val = Math.min(maxVal, Math.max(val, parseFloat(inputMin.value) + step));
            inputMax.value = val;
            e.target.value = val; // Corrects if user enters invalid value
            updateSliderAppearance();
        });
        
        // Initial update
        updateSliderAppearance();
    }

    // Initialize all range sliders on the page
    const allRangeSliders = document.querySelectorAll('.range-slider');
    allRangeSliders.forEach(slider => {
        initializeRangeSlider(slider);
    });

    // Mobile menu toggle for common.js if not already there
    const burgerMenu = document.querySelector('.burger-menu');
    const mobileMenu = document.querySelector('.mobile-menu');
    const closeBtn = document.querySelector('.mobile-menu .close-btn');

    if (burgerMenu && mobileMenu && closeBtn) {
        burgerMenu.addEventListener('click', () => {
            mobileMenu.classList.add('active');
        });
        closeBtn.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
        });
    }
}); 