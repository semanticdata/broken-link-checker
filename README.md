# Broken Link Checker

Check for broken links in a website.

## Features

- **Check Links**: Enter a website URL to check for broken links.
- **Mock Data**: Use mock data for testing without making actual network requests.

## How to Use

1. **Enter a URL**: In the input field, enter the website URL you want to check (e.g., `https://www.example.com`).
2. **Choose Mock Data**: If you want to test the functionality without making real requests, check the "Use Mock Data" checkbox. This will simulate the link checking process using predefined URLs.
3. **Check Links**: Click the "Check Links" button to start the process. The application will display the results, including the number of working and broken links found.

## Testing with Mock Data

When the "Use Mock Data" option is selected, the application will use the following predefined URLs for testing:

- `https://www.example.com` (working link)
- `https://www.nonexistentwebsite.com` (broken link)
- `https://www.google.com` (working link)

This feature is useful for testing the application without relying on external websites.

## License

Source code in this repository is available under the [MIT License](./LICENSE).
