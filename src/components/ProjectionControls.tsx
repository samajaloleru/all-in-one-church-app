import React, { useState, useEffect } from 'react';

interface ProjectionControlsProps {
  passage: string;
  verses: Array<{verse: number, text: string}>;
}

const ProjectionControls: React.FC<ProjectionControlsProps> = ({ passage, verses }) => {
  const [vmixSettings, setVmixSettings] = useState({
    ip: '',
    port: '8088',
    input: '1',
    enabled: false
  });
  const [showSettings, setShowSettings] = useState(false);
  const [currentVerseIndex, setCurrentVerseIndex] = useState(0);
  const [connectionStatus, setConnectionStatus] = useState<'disconnected' | 'testing' | 'connected'>('disconnected');
  const [isLocalNetwork, setIsLocalNetwork] = useState(false);

  // Check if we're on the same network as V-Mix
  useEffect(() => {
    // This is a simple check - in a real app, you'd have a more robust method
    const checkLocalNetwork = async () => {
      if (typeof window !== 'undefined') {
        // Check if we're on localhost or a local IP
        const isLocal = window.location.hostname === 'localhost' || 
                        window.location.hostname === '127.0.0.1' ||
                        window.location.hostname.startsWith('192.168.') ||
                        window.location.hostname.startsWith('10.0.');
        
        setIsLocalNetwork(isLocal);
        
        // If we're on a local network, try to auto-detect V-Mix
        if (isLocal && !vmixSettings.ip) {
          setVmixSettings(prev => ({ ...prev, ip: 'localhost' }));
        }
      }
    };
    
    checkLocalNetwork();
  }, []);

  // Parse the passage to get book, chapter, and verse info
  const parsePassage = (passage: string) => {
    const match = passage.match(/(\d?\s?\w+)\s+(\d+):\s*(\d+)\s*-\s*(\d+)/) || 
                  passage.match(/(\d?\s?\w+)\s+(\d+):\s*(\d+)/) ||
                  passage.match(/(\d?\s?\w+)\s+(\d+)/);
    
    if (match) {
      return {
        book: match[1],
        chapter: match[2],
        startVerse: match[3] || '1',
        endVerse: match[4] || match[3] || '1'
      };
    }
    return null;
  };

  // Test V-Mix connection
  const testVmixConnection = async () => {
    if (!vmixSettings.ip) {
      setConnectionStatus('disconnected');
      return;
    }
    
    setConnectionStatus('testing');
    
    try {
      // Use a proxy for remote connections
      const useProxy = !isLocalNetwork;
      const baseUrl = useProxy 
        ? `/api/vmix-proxy?host=${vmixSettings.ip}&port=${vmixSettings.port}` 
        : `http://${vmixSettings.ip}:${vmixSettings.port}/api`;
      
        console.log('====================================');
        console.log(baseUrl);
        console.log('====================================');
      const response = await fetch(`${baseUrl}?Function=Version`);
      
      if (response.ok) {
        setConnectionStatus('connected');
      } else {
        setConnectionStatus('disconnected');
      }
    } catch (error) {
      console.error('Connection test failed:', error);
      setConnectionStatus('disconnected');
    }
  };

  // Send verse to V-Mix
  const sendToVmix = async (text: string, title: string) => {
    if (!vmixSettings.enabled || connectionStatus !== 'connected') return;
    
    try {
      // Use a proxy for remote connections
      const useProxy = !isLocalNetwork;
      const baseUrl = useProxy 
        ? `/api/vmix-proxy?host=${vmixSettings.ip}&port=${vmixSettings.port}` 
        : `http://${vmixSettings.ip}:${vmixSettings.port}/api`;
      
      // First, set the title
      const titleResponse = await fetch(
        `${baseUrl}?Function=SetText&Input=${vmixSettings.input}&SelectedName=Title&Value=${encodeURIComponent(title)}`
      );
      
      // Then set the verse text
      const textResponse = await fetch(
        `${baseUrl}?Function=SetText&Input=${vmixSettings.input}&SelectedName=Text&Value=${encodeURIComponent(text)}`
      );
      
      if (titleResponse.ok && textResponse.ok) {
        console.log('Verse sent to V-Mix successfully');
      } else {
        console.error('Failed to send verse to V-Mix');
      }
    } catch (error) {
      console.error('Error sending to V-Mix:', error);
      
      // If we're on a local network but the direct connection failed,
      // try using the proxy as a fallback
      if (isLocalNetwork) {
        console.log('Trying fallback proxy connection...');
        try {
          const baseUrl = `/api/vmix-proxy?host=${vmixSettings.ip}&port=${vmixSettings.port}`;
          
          const titleResponse = await fetch(
            `${baseUrl}?Function=SetText&Input=${vmixSettings.input}&SelectedName=Title&Value=${encodeURIComponent(title)}`
          );
          
          const textResponse = await fetch(
            `${baseUrl}?Function=SetText&Input=${vmixSettings.input}&SelectedName=Text&Value=${encodeURIComponent(text)}`
          );
          
          if (titleResponse.ok && textResponse.ok) {
            console.log('Verse sent to V-Mix via proxy successfully');
          }
        } catch (fallbackError) {
          console.error('Fallback proxy connection also failed:', fallbackError);
        }
      }
    }
  };

  // Generate EasyWorship XML
  const generateEasyWorshipXML = (verse: {verse: number, text: string}, passageInfo: any) => {
    const title = `${passageInfo.book} ${passageInfo.chapter}:${verse.verse}`;
    
    return `<?xml version="1.0" encoding="UTF-8"?>
<EasyWorship>
  <Version>200</Version>
  <Title>${title}</Title>
  <Events>
    <Event>
      <Type>Scripture</Type>
      <Description>${title}</Description>
      <Reference>${title}</Reference>
      <Text>${verse.text}</Text>
    </Event>
  </Events>
</EasyWorship>`;
  };

  // Download EasyWorship file
  const downloadEasyWorshipFile = (verse: {verse: number, text: string}, passageInfo: any) => {
    const xmlContent = generateEasyWorshipXML(verse, passageInfo);
    const blob = new Blob([xmlContent], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${passageInfo.book}_${passageInfo.chapter}_${verse.verse}.xml`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Project specific verse
  const projectVerse = (index: number) => {
    if (index < 0 || index >= verses.length) return;
    
    setCurrentVerseIndex(index);
    const verse = verses[index];
    const passageInfo = parsePassage(passage);
    
    if (!passageInfo) return;
    
    const title = `${passageInfo.book} ${passageInfo.chapter}:${verse.verse}`;
    
    // Send to V-Mix
    sendToVmix(verse.text, title);
    
    console.log('Verse ready for projection:', verse);
  };

  // Project next verse
  const projectNextVerse = () => {
    if (currentVerseIndex < verses.length - 1) {
      projectVerse(currentVerseIndex + 1);
    }
  };

  // Project previous verse
  const projectPreviousVerse = () => {
    if (currentVerseIndex > 0) {
      projectVerse(currentVerseIndex - 1);
    }
  };

  const passageInfo = parsePassage(passage);

  return (
    <div className="projection-controls bg-gray-100 p-4 rounded-lg mt-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold">Projection Controls</h3>
        <button 
          onClick={() => setShowSettings(!showSettings)}
          className="text-blue-600 hover:text-blue-800 text-sm"
        >
          {showSettings ? 'Hide Settings' : 'Show Settings'}
        </button>
      </div>

      {showSettings && (
        <div className="vmix-settings mb-4 p-3 bg-white rounded">
          <h4 className="font-medium mb-2">V-Mix Settings</h4>
          
          {!isLocalNetwork && (
            <div className="mb-3 p-2 bg-yellow-100 rounded">
              <p className="text-sm text-yellow-800">
                <strong>Note:</strong> You're accessing this app from a remote server. 
                To use V-Mix integration, you need to set up port forwarding on your network 
                or use a VPN to access your local network.
              </p>
            </div>
          )}
          
          <div className="grid grid-cols-2 gap-2 mb-2">
            <div>
              <label className="block text-sm mb-1">IP Address</label>
              <input
                type="text"
                value={vmixSettings.ip}
                onChange={(e) => setVmixSettings({...vmixSettings, ip: e.target.value})}
                className="w-full p-1 border rounded text-sm"
                placeholder="localhost or remote IP"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Port</label>
              <input
                type="text"
                value={vmixSettings.port}
                onChange={(e) => setVmixSettings({...vmixSettings, port: e.target.value})}
                className="w-full p-1 border rounded text-sm"
                placeholder="8088"
              />
            </div>
          </div>
          <div className="mb-2">
            <label className="block text-sm mb-1">Input Number</label>
            <input
              type="text"
              value={vmixSettings.input}
              onChange={(e) => setVmixSettings({...vmixSettings, input: e.target.value})}
              className="w-full p-1 border rounded text-sm"
              placeholder="1"
            />
          </div>
          <div className="flex items-center mb-2">
            <input
              type="checkbox"
              checked={vmixSettings.enabled}
              onChange={(e) => setVmixSettings({...vmixSettings, enabled: e.target.checked})}
              className="mr-2"
              id="vmixEnabled"
            />
            <label htmlFor="vmixEnabled" className="text-sm">Enable V-Mix Integration</label>
          </div>
          
          <div className="flex items-center">
            <button
              onClick={testVmixConnection}
              className="px-3 py-1 bg-blue-600 text-white rounded text-sm mr-2"
            >
              Test Connection
            </button>
            <span className={`text-sm ${
              connectionStatus === 'connected' ? 'text-green-600' : 
              connectionStatus === 'testing' ? 'text-yellow-600' : 'text-red-600'
            }`}>
              {connectionStatus === 'connected' ? 'Connected' : 
               connectionStatus === 'testing' ? 'Testing...' : 'Disconnected'}
            </span>
          </div>
        </div>
      )}

      <div className="projection-buttons flex flex-wrap gap-2">
        <button
          onClick={() => projectPreviousVerse()}
          disabled={currentVerseIndex === 0}
          className="px-3 py-1 bg-gray-600 text-white rounded text-sm disabled:opacity-50"
        >
          Previous
        </button>

        <button
          onClick={() => projectNextVerse()}
          disabled={currentVerseIndex === verses.length - 1}
          className="px-3 py-1 bg-gray-600 text-white rounded text-sm disabled:opacity-50"
        >
          Next
        </button>

        <button
          onClick={() => passageInfo && downloadEasyWorshipFile(verses[currentVerseIndex], passageInfo)}
          className="px-3 py-1 bg-green-600 text-white rounded text-sm"
        >
          Download for EasyWorship
        </button>

        {vmixSettings.enabled && connectionStatus === 'connected' && (
          <button
            onClick={() => projectVerse(currentVerseIndex)}
            className="px-3 py-1 bg-blue-600 text-white rounded text-sm"
          >
            Send to V-Mix
          </button>
        )}
      </div>

      <div className="verse-navigation mt-3">
        <p className="text-sm text-gray-600 mb-1">Current Verse: {currentVerseIndex + 1} of {verses.length}</p>
        <div className="flex flex-wrap gap-1">
          {verses.map((verse, index) => (
            <button
              key={index}
              onClick={() => projectVerse(index)}
              className={`px-2 py-1 text-xs rounded ${
                index === currentVerseIndex 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-300 text-gray-700'
              }`}
            >
              {verse.verse}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectionControls;