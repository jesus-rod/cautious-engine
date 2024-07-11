'use client';

import { useTheme } from 'next-themes';
import { useEffect, useRef } from 'react';
import { Network } from 'vis-network';

const GraphVisualization = ({ data }) => {
  const graphRef = useRef(null);
  let theme = useTheme();
  let isDarkTheme = theme.theme === 'dark';

  useEffect(() => {
    const { topics, relationships } = data;
    const nodes = topics.map((topic) => ({
      id: topic.name,
      label: topic.name,
      value: topic.occurrences * 10,
      font: {
        size: 16,
        color: isDarkTheme ? 'white' : 'black',
      },
      scaling: {
        min: 10,
        max: 30,
      },
    }));

    let edges = [];
    relationships.forEach((rel) => {
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
          color: '#2b7ce9',
          highlight: '#848484',
        },
      },
    };

    const network = new Network(container, graphData, options);

    return () => {
      network.destroy();
    };
  }, [data, isDarkTheme]);

  return <div ref={graphRef} style={{ height: '1000px' }} />;
};

export default GraphVisualization;
