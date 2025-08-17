function removeJutsuBlocker() {
    if (!document || !document.querySelector) {
        return;
    }
    
    try {
        const blockerElement = document.querySelector('.tab_need_plus');
        
        if (blockerElement) {
            console.log('Найден блокирующий элемент Jutsu+, удаляем...');
            blockerElement.remove();
        }
        
        const allElements = document.querySelectorAll('div[style*="display: block"]');
        allElements.forEach(element => {
            if (element && element.textContent && element.textContent.includes('Jutsu+')) {
                element.remove();
            }
        });
        
        const overlays = document.querySelectorAll('.overlay, .modal, .popup');
        overlays.forEach(overlay => {
            if (overlay && overlay.textContent && overlay.textContent.includes('Jutsu+')) {
                overlay.remove();
            }
        });
    } catch (error) {
    }
}

function unlockVideoElements() {
    if (!document || !document.querySelectorAll) {
        return;
    }
    
    try {
        const videos = document.querySelectorAll('video');
        videos.forEach(video => {
            if (video && video.style) {
                video.style.pointerEvents = 'auto';
                video.style.opacity = '1';
                
                const parent = video.parentElement;
                if (parent && parent.querySelectorAll) {
                    const overlays = parent.querySelectorAll('div[style*="position: absolute"], div[style*="z-index"]');
                    overlays.forEach(overlay => {
                        if (overlay && overlay.textContent && (overlay.textContent.includes('Jutsu+') || overlay.textContent.includes('подписк'))) {
                            overlay.remove();
                        }
                    });
                }
            }
        });
        
        // Разблокируем iframe элементы
        const iframes = document.querySelectorAll('iframe');
        iframes.forEach(iframe => {
            if (iframe && iframe.style) {
                iframe.style.pointerEvents = 'auto';
                iframe.style.opacity = '1';
            }
        });
    } catch (error) {
        console.error('Ошибка при разблокировке видео элементов:', error);
    }
}

function restorePageFunctionality() {
    if (document.body) {
        document.body.style.overflow = 'auto';
    }
    
    if (document.documentElement) {
        document.documentElement.style.overflow = 'auto';
    }
    
    if (document.querySelectorAll) {
        const blurredElements = document.querySelectorAll('[style*="filter: blur"], [style*="opacity: 0."]');
        blurredElements.forEach(element => {
            if (element && element.style) {
                element.style.filter = 'none';
                element.style.opacity = '1';
            }
        });
    }
}

function init() {
    try {
        
        removeJutsuBlocker();
        unlockVideoElements();
        restorePageFunctionality();
        
    } catch (error) {
        console.error('Ошибка при инициализации Jutsu Blocker Remover:', error);
    }
}

function safeInit() {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else if (document.readyState === 'interactive' || document.readyState === 'complete') {
        init();
    }
}

if (document && document.readyState) {
    safeInit();
} else {
    setTimeout(safeInit, 100);
}

setTimeout(init, 1000);
setTimeout(init, 3000);

function setupMutationObserver() {
    if (!window.MutationObserver || !document.body) {
        setTimeout(setupMutationObserver, 1000);
        return;
    }
    
    try {
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.addedNodes) {
                    mutation.addedNodes.forEach(function(node) {
                        if (node.nodeType === 1) { // Element node
                            try {
                                if (node.classList && node.classList.contains('tab_need_plus')) {
                                    node.remove();
                                }
                                
                                if (node.querySelectorAll) {
                                    const nestedBlockers = node.querySelectorAll('.tab_need_plus');
                                    if (nestedBlockers) {
                                        nestedBlockers.forEach(blocker => {
                                            blocker.remove();
                                        });
                                    }
                                }
                            } catch (error) {
                            }
                        }
                    });
                }
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
        
        console.log('Jutsu Blocker Remover: MutationObserver активирован');
    } catch (error) {
        console.error('Ошибка при настройке MutationObserver:', error);
    }
}

setTimeout(setupMutationObserver, 1000);

setTimeout(init, 1000);
setTimeout(init, 3000);
setTimeout(init, 5000);

