let text = ``; // HTML from YT playlists page.

function extractVideoInfo(text) {
  const lines = text.split('\n');
  const durations = [];
  const titles = [];
  
  lines.forEach(line => {
      if (line.includes('badge-shape-wiz__text')) {
          let duration = line.trim()
              .replace(/<[^>]*>/g, '')
              .replace(/&quot;/g, '"')
              .replace(/\s+/g, ' ');
          durations.push(duration);
      }
      if (line.includes('video-title')) {
          let title = line.trim()
              .replace(/<[^>]*>/g, '')
              .replace(/&quot;/g, '"')
              .replace(/\s+/g, ' ');
          titles.push(title);
      }
  });

  // Print in JSON format
  console.log('{\n    "activities": [');
  for (let i = 0; i < Math.min(titles.length, durations.length); i++) {
      console.log(`        { "title": "${titles[i]}", "duration": "${durations[i]}" }${i < titles.length - 1 ? ',' : ''}`);
  }
  console.log('    ]\n}');
}

function extractVideoInfo(text) {
    const timeRegex = /<div class="badge-shape-wiz__text">([0-9:]+)<\/div>/g;
    const titleRegex = /video-title".*?title="([^"]+)"/g;
    
    const times = [];
    const titles = [];
    
    // Extract times
    let timeMatch;
    while ((timeMatch = timeRegex.exec(text)) !== null) {
        times.push(timeMatch[1]);
    }
    
    // Extract titles
    let titleMatch;
    while ((titleMatch = titleRegex.exec(text)) !== null) {
        titles.push(titleMatch[1]);
    }
    
    // Print in the specified JSON format
    console.log('const activityLists = [');
    console.log('    {');
    console.log('        title: "YouTube Playlist",');
    console.log('        activities: [');
    
    for (let i = 0; i < Math.min(titles.length, times.length); i++) {
        // Convert time to HH:MM:SS format
        let time = times[i];
        if (time.split(':').length === 2) {
            time = "00:" + time;
        }
        
        console.log(`            { title: "${titles[i]}", duration: "${time}" }${i < titles.length - 1 ? ',' : ''}`);
    }
    
    console.log('        ]');
    console.log('    }');
    console.log('];');
}

extractVideoInfo(text)