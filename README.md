# Broken Link Checker Web App

A web application that checks for broken links on any website. Built with Node.js, Express, and the broken-link-checker package.

## Features

- Simple and modern user interface
- Check any website for broken links
- Displays both working and broken links
- Shows detailed error reasons for broken links
- Real-time progress updates

## Prerequisites

- Node.js (v12 or higher)
- npm (Node Package Manager)

## Installation

1. Clone this repository or download the files
2. Install the dependencies:
   ```bash
   npm install
   ```

## Usage

1. Start the server:
   ```bash
   npm start
   ```

2. Open your web browser and navigate to:
   ```
   http://localhost:3000
   ```

3. Enter a website URL (including http:// or https://) in the input field
4. Click "Check Links" and wait for the results

## Notes

- The link checking process may take several minutes depending on the size of the website
- Make sure the website you're checking is accessible from your network
- Some websites may block automated requests, which could affect the results
