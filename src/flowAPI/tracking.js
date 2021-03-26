let trackingListeners = [];

export function addTrackingListener(cb, id){
    if (typeof cb !== 'function') {
        console.error("Listener Needs to be a function", cb)
    }
    trackingListeners.push({cb, id})
}

export function removeTrackingListener(cb, id){
    trackingListeners = trackingListeners.filter( ( listener => {
        if (id == listener.id) return false;
        else if (cb == listener.cb) return false;
    }))
}

// export function addIgnoreElements( ignoredElements ){

// }

document.body.addEventListener('click',(e) => {
    let clickedElement = null
    if (e && e.path) clickedElement = e.path[0];
    else if (e.originalTarget) clickedElement = e.originalTarget
    if (clickedElement){
        trackingListeners.forEach( ( {cb} ) => {
            cb(clickedElement, clickedElement.outerHTML);
        })
    }
}, true); 