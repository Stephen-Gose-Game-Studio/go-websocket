/* a ComponentMap object maps components to vertices that are all in that component
     it is used to:
          0. find connected components in grid
          1. count the number of components
          2. iterate over each component, finding all the empty spots on the edges
          3. probably something I didn't intend
*/
var ComponentMap = function(graph) {
    // initialize an array of size numberComponents and populate with empty arrays
    var components = new Set([]);
    // 0 <= numberComponents < (count^2)/2

    //console.clear();
    //console.log("| v | R | S |");
    //console.log("|---|---|---|");
    var findComponentContaining = function(u) {
        // see bfs.md for better explanation of BFS algorithm
        var R = new Queue([u]);    // vertices Reached
        var S = new Set([]);       // vertices Searched
        var v;


        //console.log("| "+u.toString()+" | "+ R.toString()+" | "+S.toString()+" |");

        while(!R.empty()) {
            // Remove first element of Reached Queue, assign it to v
            v = R.dequeue();

            // Find all vertices adjacent to v
            neighbors = graph.neighborsOf(v);

            neighbors.each(function(neighbor) {

                // color checks have already been madek
                // is neighbor not in (R ⋃ S)?
                // !(A || B) = !A && !B
                if(!R.contains(neighbor) && !S.member(neighbor)) {
                    R.enqueue(neighbor);
                }
            });

            // Then v is added to S
            S.add(v);
            
            // debug output
            //console.log("| "+v.toString()+" | "+ R.toString()+" | "+S.toString()+" |");
        }

        // Return connected component containing u
        return S;
    }

    // Pick the first non-empty vertex, u
    // Apply a BFS to find the component that contains u
    // Push component, repeat and find first non-empty vertex that is not in the
    // existing components
    graph.vertices.each(function(u) {
        var component = findComponentContaining(u);
        components.add(component);
    });

    return {
        numberComponents: components.cardinality(),
        choose: function() {
            return components.choose();
        },
        eachComponent: function(fn) {
            components.each(fn);
        }
    }
}

