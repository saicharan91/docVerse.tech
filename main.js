const tools = [
    { id: "merge", name: "Merge PDF", icon: "M", hint: "Combine multiple PDF files into one.", category: "Organize", isReady: true },
    { id: "split", name: "Split PDF", icon: "S", hint: "Extract pages or split a PDF into several files.", category: "Organize", isReady: true },
    { id: "compress", name: "Compress PDF", icon: "C", hint: "Reduce PDF file size while maintaining quality.", category: "Optimize", isReady: false },
    { id: "jpg-pdf", name: "JPG to PDF", icon: "J", hint: "Convert JPG, PNG, and images to PDF.", category: "Convert", isReady: true },
    { id: "pdf-jpg", name: "PDF to JPG", icon: "P", hint: "Extract high-quality images from a PDF.", category: "Convert", isReady: false },
    { id: "unlock", name: "Unlock PDF", icon: "U", hint: "Remove password from PDFs.", category: "Security", isReady: false },
    { id: "protect", name: "Protect PDF", icon: "P", hint: "Encrypt your PDF with a strong password.", category: "Security", isReady: true },
    // Image Tools
    { id: "compress-img", name: "Compress IMAGE", icon: "I", hint: "Reduce image file size.", category: "Optimize", isReady: true },
    { id: "upscale", name: "Upscale IMAGE", icon: "U", hint: "Increase image resolution.", category: "Optimize", isReady: false },
    { id: "remove-bg", name: "Remove Background", icon: "B", hint: "Remove image backgrounds.", category: "Image", isReady: false },
    { id: "meme", name: "Meme Generator", icon: "M", hint: "Create custom memes.", category: "Create", isReady: false },
    { id: "editor", name: "Photo Editor", icon: "E", hint: "Edit and filter photos.", category: "Create", isReady: false },
    { id: "resize-img", name: "Resize IMAGE", icon: "R", hint: "Change image dimensions.", category: "Modify", isReady: true },
    { id: "crop-img", name: "Crop IMAGE", icon: "C", hint: "Remove unwanted areas.", category: "Modify", isReady: false }, // Needs UI cropper
    { id: "rotate-img", name: "Rotate IMAGE", icon: "R", hint: "Rotate images 90 degrees.", category: "Modify", isReady: true },
    { id: "to-jpg", name: "Convert to JPG", icon: "J", hint: "Convert to JPG.", category: "Convert", isReady: true },
    { id: "from-jpg", name: "Convert from JPG", icon: "J", hint: "Convert to PNG.", category: "Convert", isReady: true },
    { id: "html-img", name: "HTML to IMAGE", icon: "H", hint: "Convert HTML to image.", category: "Convert", isReady: false },
    { id: "watermark-img", name: "Watermark IMAGE", icon: "W", hint: "Add watermark.", category: "Security", isReady: false },
    { id: "blur-face", name: "Blur Face", icon: "B", hint: "Blur faces.", category: "Security", isReady: false }
];

document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const searchInput = document.getElementById('tool-search');
    const dropdown = document.getElementById('tool-dropdown');
    const currentToolName = document.getElementById('current-tool-name');
    const currentToolIcon = document.getElementById('current-tool-icon');
    const toolHint = document.getElementById('tool-hint');
    const dropZone = document.getElementById('drop-zone');
    const fileInput = document.getElementById('file-input');
    const processBtn = document.getElementById('process-btn');
    const fileListEl = document.getElementById('file-list');
    const fileCountEl = document.getElementById('file-count');

    // Inputs (Top Bar)
    const compressionContainer = document.getElementById('compression-container');
    const compressionSlider = document.getElementById('compression-slider');
    const compressionValue = document.getElementById('compression-value');

    const rangeContainer = document.getElementById('range-container');
    const rangeInput = document.getElementById('range-input');

    const passwordContainer = document.getElementById('password-container');
    const passwordInput = document.getElementById('password-input');

    let selectedFiles = [];
    let activeTool = tools[0];

    // Initialize dropdown
    function renderDropdown(items) {
        dropdown.innerHTML = '';
        items.forEach(tool => {
            const div = document.createElement('div');
            div.className = 'dropdown-item';
            const badge = tool.isReady ? '<span class="status-badge ready">Ready</span>' : '<span class="status-badge plan">Coming Soon</span>';
            div.innerHTML = `
                <div style="display:flex; align-items:center; justify-content:space-between; width:100%">
                    <div><strong>${tool.name}</strong> <span style="font-size:0.8em; opacity:0.7">(${tool.category})</span></div>
                    ${badge}
                </div>
            `;
            div.addEventListener('mousedown', (e) => {
                selectTool(tool);
            });
            dropdown.appendChild(div);
        });
    }

    renderDropdown(tools);

    function selectTool(tool) {
        activeTool = tool;
        currentToolName.textContent = tool.name;
        currentToolIcon.textContent = tool.icon;
        toolHint.textContent = tool.hint;
        searchInput.value = '';
        dropdown.classList.add('hidden');

        // Logic for UI Visibility
        if (compressionContainer) compressionContainer.classList.add('hidden');
        if (rangeContainer) rangeContainer.classList.add('hidden');
        if (passwordContainer) passwordContainer.classList.add('hidden');

        if (['merge', 'compress', 'jpg-pdf', 'to-jpg'].includes(tool.id)) {
            if (compressionContainer) compressionContainer.classList.remove('hidden');
        }
        else if (tool.id === 'split') {
            if (rangeContainer) {
                rangeContainer.classList.remove('hidden');
                if (rangeInput) rangeInput.value = '';
            }
        }
        else if (tool.id === 'protect') {
            if (passwordContainer) {
                passwordContainer.classList.remove('hidden');
                if (passwordInput) passwordInput.value = '';
            }
        }
    }

    if (compressionSlider) {
        compressionSlider.addEventListener('input', (e) => {
            const val = e.target.value;
            if (val > 80) compressionValue.textContent = 'High Quality (Low Compression)';
            else if (val > 40) compressionValue.textContent = 'Medium Quality';
            else compressionValue.textContent = 'Low Quality (High Compression)';
        });
    }

    // Search Interaction
    searchInput.addEventListener('focus', () => {
        dropdown.classList.remove('hidden');
        renderDropdown(tools);
    });

    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        const filtered = tools.filter(t => t.name.toLowerCase().includes(term) || t.category.toLowerCase().includes(term));
        renderDropdown(filtered);
    });

    document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !dropdown.contains(e.target)) {
            dropdown.classList.add('hidden');
        }
    });

    // File Upload
    dropZone.addEventListener('click', () => fileInput.click());

    fileInput.addEventListener('change', (e) => {
        handleFiles(Array.from(e.target.files));
    });

    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.style.borderColor = '#3b82f6';
        dropZone.style.backgroundColor = 'rgba(59, 130, 246, 0.05)';
    });

    dropZone.addEventListener('dragleave', () => {
        dropZone.style.borderColor = '#e2e8f0';
        dropZone.style.backgroundColor = 'transparent';
    });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        handleFiles(Array.from(e.dataTransfer.files));
    });

    function handleFiles(files) {
        selectedFiles = [...selectedFiles, ...files];
        renderFileList();
    }

    function renderFileList() {
        if (selectedFiles.length > 0) {
            dropZone.classList.add('hidden');
            fileListEl.classList.remove('hidden');
            fileCountEl.classList.remove('hidden');
            fileListEl.innerHTML = '';

            selectedFiles.forEach((file, index) => {
                const item = document.createElement('div');
                item.className = 'file-item';
                item.innerHTML = `
                    <div class="file-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
                    </div>
                    <div class="file-info">
                        <div class="file-name">${file.name}</div>
                        <div class="file-size">${formatSize(file.size)}</div>
                    </div>
                    <button class="remove-file-btn" onclick="removeFile(${index})">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                `;
                fileListEl.appendChild(item);
            });

            fileCountEl.textContent = `${selectedFiles.length} file(s) selected`;
        } else {
            dropZone.classList.remove('hidden');
            fileListEl.classList.add('hidden');
            fileCountEl.classList.add('hidden');
        }
    }

    window.removeFile = (index) => {
        selectedFiles.splice(index, 1);
        renderFileList();
    };

    function formatSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    // ACTUAL BACKEND LOGIC (PDF-LIB & CANVAS)
    processBtn.addEventListener('click', async () => {
        if (selectedFiles.length === 0) {
            alert('Please select files first.');
            return;
        }

        const originalBtnText = processBtn.textContent;
        processBtn.textContent = 'Processing...';
        processBtn.disabled = true;

        try {
            // PDF Tools
            if (activeTool.id === 'merge') await mergePDFs(selectedFiles);
            else if (activeTool.id === 'split') await splitPDF(selectedFiles[0]);
            else if (activeTool.id === 'jpg-pdf') await imagesToPDF(selectedFiles);
            else if (activeTool.id === 'protect') await protectPDF(selectedFiles[0]);

            // Image Tools
            else if (['compress-img', 'resize-img', 'rotate-img', 'to-jpg', 'from-jpg', 'editor', 'meme', 'watermark-img'].includes(activeTool.id)) {
                await processImages(selectedFiles, activeTool.id);
            }
            // Coming Soon
            else {
                alert(`The ${activeTool.name} tool requires heavy server-side AI processing (e.g. Background Removal). We are working on a client-side version!`);
            }
        } catch (err) {
            console.error(err);
            alert('An error occurred: ' + err.message);
        } finally {
            processBtn.textContent = originalBtnText;
            processBtn.disabled = false;
        }
    });

    // --- PDF FUNCTIONS ---

    async function mergePDFs(files) {
        const { PDFDocument } = PDFLib;
        const mergedPdf = await PDFDocument.create();

        for (const file of files) {
            if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
                throw new Error(`File "${file.name}" is not a PDF.`);
            }
            try {
                const arrayBuffer = await file.arrayBuffer();
                const pdf = await PDFDocument.load(arrayBuffer);
                const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
                copiedPages.forEach((page) => mergedPdf.addPage(page));
            } catch (innerErr) {
                console.error(innerErr);
                throw new Error(`Failed to load "${file.name}".`);
            }
        }
        downloadBlob(await mergedPdf.save({ useObjectStreams: true }), 'merged_docverse.pdf', 'application/pdf');
    }

    async function splitPDF(file) {
        if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) throw new Error("Not a PDF.");

        const { PDFDocument } = PDFLib;
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        const pageCount = pdf.getPageCount();

        // Read from UI input
        let input = '';
        if (document.getElementById('range-input')) {
            input = document.getElementById('range-input').value.trim();
        }

        // Fallback to prompt if empty
        if (!input) {
            input = prompt(`No range entered. Enter ranges to extract from ${pageCount} pages (e.g. "1-2, 5"):`, "1-" + pageCount);
            if (!input) return;
        }

        const ranges = input.split(',').map(r => r.trim());

        for (const range of ranges) {
            const newPdf = await PDFDocument.create();
            const indices = [];

            if (range.includes('-')) {
                const parts = range.split('-');
                let start = parseInt(parts[0]);
                let end = parseInt(parts[1]);
                if (isNaN(start) || start < 1) start = 1;
                if (isNaN(end) || end > pageCount) end = pageCount;
                if (start > end) continue;
                for (let i = start; i <= end; i++) indices.push(i - 1);
            } else {
                let pageNum = parseInt(range);
                if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= pageCount) indices.push(pageNum - 1);
            }

            if (indices.length === 0) continue;
            const copiedPages = await newPdf.copyPages(pdf, indices);
            copiedPages.forEach((page) => newPdf.addPage(page));

            const sanitizedRange = range.replace(/[^0-9-]/g, '');
            downloadBlob(await newPdf.save(), `split_${sanitizedRange}_${file.name}`, 'application/pdf');
        }
    }

    async function imagesToPDF(files) {
        const { PDFDocument } = PDFLib;
        const pdfDoc = await PDFDocument.create();

        const compressionSlider = document.getElementById('compression-slider');
        const qualityLevel = compressionSlider ? (compressionSlider.value / 100) : 0.7;

        for (const file of files) {
            if (!file.type.startsWith('image/')) continue;
            let image;

            if (qualityLevel < 0.95) {
                const imgBitmap = await createImageBitmap(file);
                const canvas = document.createElement('canvas');
                canvas.width = imgBitmap.width;
                canvas.height = imgBitmap.height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(imgBitmap, 0, 0);

                const compressedDataUrl = canvas.toDataURL('image/jpeg', qualityLevel);
                const compressedBytes = await fetch(compressedDataUrl).then(res => res.arrayBuffer());
                image = await pdfDoc.embedJpg(compressedBytes);
            } else {
                const arrayBuffer = await file.arrayBuffer();
                if (file.type === 'image/jpeg') image = await pdfDoc.embedJpg(arrayBuffer);
                else if (file.type === 'image/png') image = await pdfDoc.embedPng(arrayBuffer);
                else continue;
            }

            const page = pdfDoc.addPage([image.width, image.height]);
            page.drawImage(image, { x: 0, y: 0, width: image.width, height: image.height });
        }
        downloadBlob(await pdfDoc.save(), 'images_docverse.pdf', 'application/pdf');
    }

    async function protectPDF(file) {
        if (file.type !== 'application/pdf') throw new Error("Not a PDF.");

        let password = '';
        if (document.getElementById('password-input')) {
            password = document.getElementById('password-input').value.trim();
        }

        if (!password) {
            password = prompt("Enter a password to encrypt this PDF:");
            if (!password) return;
        }

        try {
            // Use Web Crypto API for client-side encryption
            const arrayBuffer = await file.arrayBuffer();

            // Derive encryption key from password using PBKDF2
            const encoder = new TextEncoder();
            const passwordBuffer = encoder.encode(password);

            // Generate a random salt
            const salt = crypto.getRandomValues(new Uint8Array(16));

            // Import password as key material
            const keyMaterial = await crypto.subtle.importKey(
                'raw',
                passwordBuffer,
                'PBKDF2',
                false,
                ['deriveBits', 'deriveKey']
            );

            // Derive actual encryption key
            const key = await crypto.subtle.deriveKey(
                {
                    name: 'PBKDF2',
                    salt: salt,
                    iterations: 100000,
                    hash: 'SHA-256'
                },
                keyMaterial,
                { name: 'AES-GCM', length: 256 },
                false,
                ['encrypt']
            );

            // Generate random IV
            const iv = crypto.getRandomValues(new Uint8Array(12));

            // Encrypt the PDF
            const encryptedData = await crypto.subtle.encrypt(
                { name: 'AES-GCM', iv: iv },
                key,
                arrayBuffer
            );

            // Combine salt + iv + encrypted data
            const resultBuffer = new Uint8Array(salt.length + iv.length + encryptedData.byteLength);
            resultBuffer.set(salt, 0);
            resultBuffer.set(iv, salt.length);
            resultBuffer.set(new Uint8Array(encryptedData), salt.length + iv.length);

            // Download as .encrypted file
            const baseName = file.name.replace(/\.pdf$/i, '');
            downloadBlob(resultBuffer, `${baseName}_protected.encrypted`, 'application/octet-stream');

            alert('PDF encrypted successfully!\n\nIMPORTANT: Save this password safely. The file is encrypted with AES-256-GCM.\n\nTo decrypt, use the "Unlock PDF" tool (coming soon) or visit docVerse.tech/decrypt');
        } catch (e) {
            console.error(e);
            throw new Error("Failed to protect PDF: " + e.message);
        }
    }

    // --- IMAGE FUNCTIONS ---
    async function processImages(files, toolId) {
        for (const file of files) {
            if (!file.type.startsWith('image/')) {
                alert(`Skipping "${file.name}" - not an image.`);
                continue;
            }

            const imgBitmap = await createImageBitmap(file);
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            let width = imgBitmap.width;
            let height = imgBitmap.height;
            let outputType = file.type;
            let quality = 0.9;
            let filename = file.name;

            if (toolId === 'resize-img') {
                const scale = prompt("Enter resize percentage (e.g. 50 for 50%):", "50");
                if (!scale) return;
                const ratio = parseFloat(scale) / 100;
                width = Math.floor(width * ratio);
                height = Math.floor(height * ratio);
            }
            else if (toolId === 'to-jpg') {
                outputType = 'image/jpeg';
                filename = filename.replace(/\.[^/.]+$/, "") + ".jpg";
            }
            else if (toolId === 'from-jpg') {
                outputType = 'image/png';
                filename = filename.replace(/\.[^/.]+$/, "") + ".png";
            }
            else if (toolId === 'compress-img') {
                quality = 0.6; // Aggressive compression
                if (outputType === 'image/png') outputType = 'image/jpeg';
                filename = "compressed_" + filename;
            }
            else if (toolId === 'rotate-img') {
                [width, height] = [height, width];
            }

            canvas.width = width;
            canvas.height = height;

            if (toolId === 'rotate-img') {
                ctx.translate(width / 2, height / 2);
                ctx.rotate(90 * Math.PI / 180);
                ctx.drawImage(imgBitmap, -height / 2, -width / 2);
            } else {
                ctx.drawImage(imgBitmap, 0, 0, width, height);
            }

            canvas.toBlob(blob => {
                downloadBlob(blob, filename, outputType);
            }, outputType, quality);
        }
    }

    function downloadBlob(data, fileName, mimeType) {
        const blob = data instanceof Blob ? data : new Blob([data], { type: mimeType });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(url);
    }
});
