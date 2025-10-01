let infoPopup = null;

function showNodeInfo(node, event, Graph, gData) {
    console.log('Show info for node directly');
    // Close existing popup
    closeInfoPopup();

    // Get connected nodes
    const connectedNodes = [];
    gData.links.forEach(link => {
      if (link.source.id === node.id || link.source === node.id) {
        connectedNodes.push(link.target.id || link.target);
      }
      if (link.target.id === node.id || link.target === node.id) {
        connectedNodes.push(link.source.id || link.source);
      }
    });
    
    // Create popup element
    infoPopup = document.createElement('div');
    infoPopup.style.cssText = `
      position: fixed;
      background: white;
      border: 2px solid #333;
      border-radius: 8px;
      padding: 15px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      z-index: 1000;
      font-family: Arial, sans-serif;
      font-size: 14px;
      max-width: 300px;
      pointer-events: auto;
    `;
    
    // Position near mouse
    infoPopup.style.left = (event.clientX + 10) + 'px';
    infoPopup.style.top = (event.clientY + 10) + 'px';
    
    // Populate with node information
    infoPopup.innerHTML = `
      <h3 style="margin: 0 0 10px 0; color: #333;">Node Information</h3>
      <p><strong>ID:</strong> ${node.id}</p>
      <p><strong>Image:</strong> ${node.img}</p>
      <p><strong>Position:</strong> (${node.x?.toFixed(1)}, ${node.y?.toFixed(1)}, ${node.z?.toFixed(1)})</p>
      <p><strong>Connections:</strong> ${connectedNodes.length}</p>
      <p><strong>Connected to:</strong> ${connectedNodes.length > 0 ? connectedNodes.join(', ') : 'None'}</p>
    `;
    
    document.body.appendChild(infoPopup);
  }

    function closeInfoPopup() {
    if (infoPopup) {
      document.body.removeChild(infoPopup);
      infoPopup = null;
    }
  }

  export { showNodeInfo };
  export { closeInfoPopup };