'use client';

import {useEffect, useRef} from 'react';
import {Network} from 'vis-network';


const GraphVisualization = ({ data }) => {
  const graphRef = useRef(null);

  useEffect(() => {
    const { topics, relationships } = data;
    console.log("rels", relationships)

    const nodes = topics.map(topic => ({
      id: topic.name,
      label: topic.name,
      value: topic.occurrences * 10,
      font: {
        size: 16,
        color: '#000000'
      },
      scaling: {
        min: 10,
        max: 30
      }
    }));

    // Create edges with weights based on connections
    let edges = [];
    relationships.forEach(rel => {
      edges.push({
        from: rel.from,
        to: rel.to,
        label: `${rel.occurrences}`,
        value: rel.occurrences,
      });
    });

    const container = graphRef.current;
    const graphData = {
      nodes,
      edges,
    };

    const options = {
      physics: {
        enabled: true,
      },
      nodes: {
        shape: 'dot', 
        size: 20,
        font: {
          size: 16,
        },
      },
      edges: {
        color: {
          color: "#2b7ce9",
          highlight: "#848484"
        }
      },
    };

    console.log("graphData:", graphData)
    const network = new Network(container, graphData, options);

    return () => {
      network.destroy();
    };
  }, [data]);

  return <div ref={graphRef} style={{ height: '600px' }} />;
};

export default GraphVisualization;
