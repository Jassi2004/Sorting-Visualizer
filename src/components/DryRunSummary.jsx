import React from 'react';

const DryRunSummary = ({ summary, originalArray, sortedArray }) => {
  // Function to parse and format the summary text
  const formatSummary = (text) => {
    // Replace **text** with <strong>text</strong>
    return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  };

  return (
    <div className="dry-run-summary" style={{
      // backgroundColor: '#1E1E1E',
      color: '#FFFFFF',
      padding: '20px',
      borderRadius: '10px',
      // boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
      maxHeight: '80vh',
      overflowY: 'auto'
    }}>
      <h2>Dry Run Summary</h2>
      <div>
        <strong>Original Array:</strong> [{originalArray.join(', ')}]
      </div>
      <div>
        <strong>Sorted Array:</strong> [{sortedArray.join(', ')}]
      </div>
      <div 
        dangerouslySetInnerHTML={{ __html: formatSummary(summary || 'Generating summary...') }}
        style={{
          whiteSpace: 'pre-wrap',
          wordWrap: 'break-word',
          fontFamily: 'monospace',
          marginTop: '20px'
        }}
      />
    </div>
  );
};

export default React.memo(DryRunSummary);