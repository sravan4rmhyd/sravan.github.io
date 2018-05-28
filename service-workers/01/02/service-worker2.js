var version=1;
var currentCache = {
    offline: 'offline-cache'+version
}
var offlineUrl='offline.html';
self.addEventListener('install',function(event){
    event.waitUntil(caches.open(currentCache.offline), function(cache){
        return cache.addAll([offlineUrl]);
    });
});
self.addEventListener('fetch',function(event){
    var request = event.request;
    var isGetRequest = request.method==='GET';
    if(request.mode === 'navigate' || isRequestMethodGET )
    {
        fetch(createRequestWithCacheBusting(request.url)).catch(function(error){
            console.log('OFFLINE: Returning offline page.',error);
            return caches.match(request.url);
        });
    } else {
        event.respondwith(caches.match(request.url).then(function(response){
            return response |fetch(request.url);
        }));
    }
    
});
function createRequestWithCacheBusting(url) {
    var request,cacheBustingUrl;
    request = new Request(url,{cache:'reload'});
    if('cache' in request)
    {
        return request;
    }
    cacheBustingUrl = new URL(url,self.location.url);
    cacheBustingUrl.search +=(cacheBustingUrl.search ? '&':'')+'cachebust='+Date.now()
    return new Request(cacheBustingUrl);
}