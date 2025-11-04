// Simple Dijkstra's Algorithm for shortest path (can be extended with AI later)
export function findShortestPath(graph, start, end) {
  const distances = {};
  const visited = new Set();
  const previous = {};

  // Initialize distances
  Object.keys(graph).forEach(node => {
    distances[node] = Infinity;
  });
  distances[start] = 0;

  while (visited.size !== Object.keys(graph).length) {
    const currentNode = Object.keys(distances)
      .filter(node => !visited.has(node))
      .reduce((a, b) => distances[a] < distances[b] ? a : b);

    visited.add(currentNode);

    for (const neighbor in graph[currentNode]) {
      let newDist = distances[currentNode] + graph[currentNode][neighbor];
      if (newDist < distances[neighbor]) {
        distances[neighbor] = newDist;
        previous[neighbor] = currentNode;
      }
    }
  }

  // Build path
  let path = [];
  let current = end;
  while (current) {
    path.unshift(current);
    current = previous[current];
  }

  return { distance: distances[end], path };
}
