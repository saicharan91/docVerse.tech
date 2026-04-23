<div align="center">

# 📄 docVerse.tech

**A fast, secure, client-side document and image processing toolkit — no uploads, no servers, no limits.**



</div>

***

## 🌟 Overview

**docVerse.tech** is a browser-based file utility suite offering 30+ tools for PDF manipulation and image processing — all running entirely in your browser. No file is ever sent to a server. Your documents stay private.

Built with pure HTML, CSS, and JavaScript using the [pdf-lib](https://pdf-lib.js.org/) library and the native Web Crypto & Canvas APIs.

***

## ✨ Features

### 📋 PDF Tools

| Tool | Status | Description |
|------|--------|-------------|
| **Merge PDF** | ✅ Ready | Combine multiple PDFs into one, with compression control |
| **Split PDF** | ✅ Ready | Extract specific pages or ranges from a PDF |
| **JPG to PDF** | ✅ Ready | Convert JPG/PNG images to a PDF document |
| **Protect PDF** | ✅ Ready | Encrypt PDF with AES-256-GCM via a password |
| **Compress PDF** | 🔜 Coming Soon | Reduce PDF size while maintaining quality |
| **PDF to JPG** | 🔜 Coming Soon | Extract high-quality images from a PDF |
| **Unlock PDF** | 🔜 Coming Soon | Remove password protection from PDFs |

### 🖼️ Image Tools

| Tool | Status | Description |
|------|--------|-------------|
| **Compress IMAGE** | ✅ Ready | Reduce image file size |
| **Resize IMAGE** | ✅ Ready | Scale image to a given percentage |
| **Rotate IMAGE** | ✅ Ready | Rotate image 90° clockwise |
| **Convert to JPG** | ✅ Ready | Convert any image format to JPG |
| **Convert from JPG** | ✅ Ready | Convert JPG to PNG |
| **Upscale IMAGE** | 🔜 Coming Soon | Increase image resolution (AI-based) |
| **Remove Background** | 🔜 Coming Soon | AI background removal |
| **Crop IMAGE** | 🔜 Coming Soon | Crop with a UI cropper |
| **Watermark IMAGE** | 🔜 Coming Soon | Add a watermark |
| **Blur Face** | 🔜 Coming Soon | Automatically blur faces for privacy |
| **Meme Generator** | 🔜 Coming Soon | Create custom memes |
| **Photo Editor** | 🔜 Coming Soon | Edit and apply filters to photos |

***

## 🔒 Privacy First

All processing happens **100% in your browser** using:
- **[pdf-lib](https://pdf-lib.js.org/)** — in-browser PDF creation and manipulation
- **Web Crypto API** — AES-256-GCM encryption for PDF password protection
- **HTML5 Canvas API** — client-side image transformation and compression

Your files are never uploaded to any server.

***

## 🚀 Getting Started

### Use Online

Visit **[https://docverse.tech](https://docverse.tech)** — no installation required.

### Run Locally

```bash
# Clone the repository
git clone https://github.com/saicharan91/docVerse.tech.git

# Navigate to the project directory
cd docVerse.tech

# Open in your browser (no build step needed)
open index.html
# Or serve with any static file server:
npx serve .
```

***

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Markup | HTML5 |
| Styling | CSS3 (custom, responsive) |
| Logic | Vanilla JavaScript (ES2020+) |
| PDF Engine | [pdf-lib](https://pdf-lib.js.org/) (CDN) |
| Encryption | Web Crypto API (AES-256-GCM, PBKDF2) |
| Image Processing | HTML5 Canvas API |
| Analytics | Google Analytics (GA4) |

***

## 📁 Project Structure

```
docVerse.tech/
├── index.html       # Main application shell and UI
├── main.js          # Core tool logic, PDF & image processing functions
├── style.css        # UI styles and responsive layout
├── favicon.svg      # App icon
├── LICENSE          # MIT License
└── .github/
    └── FUNDING.yml  # GitHub Sponsors configuration
```

***

## 🧩 How It Works

1. **Select a tool** from the searchable dropdown (30+ tools).
2. **Drop or browse** for your file(s).
3. Configure options (compression level, page range, password, etc.).
4. Hit **Process Now** — the output is instantly downloaded to your device.

All operations are triggered client-side via the `processBtn` click handler in `main.js`, routing to the relevant function (`mergePDFs`, `splitPDF`, `imagesToPDF`, `protectPDF`, `processImages`).

***

## 🔐 PDF Encryption Details

The **Protect PDF** tool uses the browser's native **Web Crypto API** with the following scheme:

- **Algorithm**: AES-256-GCM
- **Key Derivation**: PBKDF2 (100,000 iterations, SHA-256)
- **Random Salt**: 16 bytes (generated per file)
- **IV**: 12 bytes (randomly generated)
- Output is saved as a `.encrypted` file.

> ⚠️ Save your password securely. There is no recovery option. A companion **Unlock PDF** tool is in development.

***

## 🤝 Contributing

Contributions are welcome! Here's how to get started:

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Make your changes and commit: `git commit -m "Add: your feature"`
4. Push to your fork: `git push origin feature/your-feature-name`
5. Open a Pull Request

### Ideas for Contribution
- Implement any of the **Coming Soon** tools
- Add drag-to-reorder for merged PDFs
- Add multi-language support (i18n)
- Improve mobile responsiveness
- Add dark mode support

***

## 📜 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

***

## 🙏 Acknowledgements

- [pdf-lib](https://pdf-lib.js.org/) by Andrew Dillon — the backbone of all PDF operations
- Web Crypto & Canvas APIs — powering zero-server-side processing

***

<div align="center">

Made with ❤️ by [Vuribindi Sai Charan Reddy](https://github.com/saicharan91)

⭐ If you find this useful, consider [starring the repo](https://github.com/saicharan91/docVerse.tech) or [sponsoring the project](https://github.com/sponsors/saicharan91)!

</div>
