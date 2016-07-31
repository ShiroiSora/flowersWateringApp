export function FlowerEntry($resource, URL) {

    return $resource(URL + '/plantApp/flower/',null,  {
        'update': { method:'PUT' },
        'delete': {
            'method' : 'DELETE',
            'url' : URL + '/plantApp/flower/:name'
        }
    });
    
}