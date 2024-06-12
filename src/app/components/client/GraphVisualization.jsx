'use client';

import {useEffect, useRef} from 'react';
import {Network} from 'vis-network';

const GraphVisualization = ({ data }) => {
  const graphRef = useRef(null);

  useEffect(() => {
    console.log("graph data", data);
    const { topics, relationships } = data;

    console.log("topics", topics);
    console.log("relationships", relationships);

    // Create nodes with sizes based on occurrence
    const nodeCount = {};
    relationships.forEach(rel => {
      nodeCount[rel.topic] = (nodeCount[rel.topic] || 0) + 1;
      rel.related_topics.forEach(topic => {
        nodeCount[topic] = (nodeCount[topic] || 0) + 1;
      });
    });

    const nodes = topics.map(topic => ({
      id: topic,
      label: topic,
      title: topic, // Add title for tooltip
      value: nodeCount[topic] || 1,
      font: {
        size: 16, // Ensure the font size is readable
        color: '#000000' // Black color for text
      },
      scaling: {
        label: {
          enabled: true,
          min: 14,
          max: 30,
          drawThreshold: 12,
          maxVisible: 20
        },
        min: 10,
        max: 50,
      },
    }));

    // Create edges with weights based on connections
    const edgeCount = {};
    const edges = [];
    relationships.forEach(rel => {
      rel.related_topics.forEach(topic => {
        const edgeId = `${rel.topic}-${topic}`;
        const reverseEdgeId = `${topic}-${rel.topic}`;
        if (edgeCount[edgeId] || edgeCount[reverseEdgeId]) {
          edgeCount[edgeId] = (edgeCount[edgeId] || 0) + 1;
          edgeCount[reverseEdgeId] = (edgeCount[reverseEdgeId] || 0) + 1;
        } else {
          edgeCount[edgeId] = 1;
          edges.push({
            from: rel.topic,
            to: topic,
            value: edgeCount[edgeId],
            width: edgeCount[edgeId] * 2, // Set the width based on the edge value
          });
        }
      });
    });

    const networkData = {
      nodes,
      edges,
    };

    const options = {
      nodes: {
        shape: 'dot',
        scaling: {
          min: 10,
          max: 50,
          label: {
            enabled: true,
            min: 14,
            max: 30,
            drawThreshold: 12,
            maxVisible: 20
          },
        },
        font: {
          size: 16,
          face: 'arial',
          color: '#000000'
        },
      },
      edges: {
        arrows: {
          to: { enabled: false },
        },
        scaling: {
          min: 1,
          max: 10,
        },
      },
      physics: {
        stabilization: false,
      },
    };

    console.log("network data", networkData)
    const network = new Network(graphRef.current, networkData, options);

    return () => network.destroy();
  }, [data]);

  return (
    <div className="border border-indigo-600">
      <div ref={graphRef} style={{ height: '600px' }} />
    </div>
  );
};

export default GraphVisualization;
