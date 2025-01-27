const urlInput = document.getElementById("urlInput");
const checkButton = document.getElementById("checkButton");
const loadingDiv = document.getElementById("loading");
const resultsDiv = document.getElementById("results");
const mockDataToggle = document.getElementById("mockDataToggle");

// Mock data for testing
const mockUrls = [
  "https://www.example.com",
  "https://www.nonexistentwebsite.com",
  "https://www.google.com",
];

function mockCheckLinks() {
  // Simulate checking links with mock data
  const workingLinks = [];
  const brokenLinks = [];

  mockUrls.forEach((link) => {
    if (link === "https://www.nonexistentwebsite.com") {
      brokenLinks.push(link);
    } else {
      workingLinks.push({ url: link, text: "Link is reachable" });
    }
  });

  return { workingLinks, brokenLinks };
}

checkButton.addEventListener("click", async () => {
  const url = urlInput.value.trim();

  if (!url) {
    alert("Please enter a valid URL");
    return;
  }

  // Clear previous results
  resultsDiv.innerHTML = "";
  loadingDiv.style.display = "block";
  checkButton.disabled = true;

  try {
    let workingLinks, brokenLinks;

    if (mockDataToggle.checked) {
      // Use mock data instead
      ({ workingLinks, brokenLinks } = mockCheckLinks());
    } else {
      // Fetch the content of the provided URL
      const response = await axios.get(url);
      const htmlContent = response.data;

      // Extract URLs from the HTML content
      const urls = extractUrls(htmlContent, url);

      // Check reachability of each URL
      workingLinks = [];
      brokenLinks = [];

      for (const link of urls) {
        try {
          await axios.get(link);
          workingLinks.push({ url: link, text: "Link is reachable" });
        } catch (error) {
          brokenLinks.push(link);
        }
      }
    }

    const urls = mockDataToggle.checked ? mockUrls : []; // Use mock URLs for summary if mock data is checked

    // Create summary
    const summary = document.createElement("div");
    summary.className = "summary";
    summary.innerHTML = `
            <strong>Summary:</strong><br>
            Total links checked: ${urls.length}<br>
            Broken links found: ${brokenLinks.length}<br>
            Working links: ${workingLinks.length}
        `;
    resultsDiv.appendChild(summary);

    // Display working links
    if (workingLinks.length > 0) {
      const workingTitle = document.createElement("h2");
      workingTitle.textContent = "Working Links";
      resultsDiv.appendChild(workingTitle);

      const workingList = document.createElement("div");
      workingList.className = "link-list";
      workingLinks.forEach((link) => {
        const linkDiv = document.createElement("div");
        linkDiv.className = "link-item working";
        linkDiv.innerHTML = `
                    <div class="link-url">${link.url}</div>
                    <div class="link-text">${link.text}</div>
                `;
        workingList.appendChild(linkDiv);
      });
      resultsDiv.appendChild(workingList);
    }
  } catch (error) {
    resultsDiv.innerHTML = `<div style="color: red;">Error: ${error.message}</div>`;
  } finally {
    loadingDiv.style.display = "none";
    checkButton.disabled = false;
  }
});

function extractUrls(html, baseUrl) {
  console.log("Extracting URLs from HTML content...");
  // console.log("HTML content before regex:", html);

  const urlRegex = /href="(http[s]?:\/\/[^"]+|\/[^"]+)"/g;
  const urls = [];
  let match;
  while ((match = urlRegex.exec(html)) !== null) {
    let url = match[1];
    // Convert relative URLs to absolute URLs
    if (url.startsWith("/")) {
      url = new URL(url, baseUrl).href; // Create absolute URL
    }
    console.log(`Found URL: ${url}`);
    urls.push(url);
  }

  console.log(`Total URLs extracted: ${urls.length}`);
  // console.log("HTML content after regex:", html);

  return urls;
}
