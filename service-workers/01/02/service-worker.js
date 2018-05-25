self.addEventListener('install',function(e){
    console.log('install event',e);
});
self.addEventListener('activate',function(e){
    console.log('activate event',e);
});