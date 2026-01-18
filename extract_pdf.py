import fitz  # PyMuPDF

pdf_files = [
    ("em/BigData_Theory.pdf", "bigdata.txt"),
    ("em/01_02_IOT_Intro.pdf", "iot.txt"),
    ("em/Blockchain and Cryptocurrencies.pdf", "blockchain.txt"),
    ("em/Quantum Computing.pdf", "quantum.txt"),
    ("em/Wireless.pdf", "wireless.txt"),
    ("em/WT.pdf", "5g.txt"),
]

for pdf_path, output_name in pdf_files:
    try:
        doc = fitz.open(pdf_path)
        text = ""
        for page in doc:
            text += page.get_text()
        
        with open(f"content/summaries/{output_name}", "w", encoding="utf-8") as f:
            f.write(text)
        print(f"✅ Extracted: {pdf_path} -> content/summaries/{output_name}")
    except Exception as e:
        print(f"❌ Error {pdf_path}: {e}")

print("\n🎉 Done! Check content/summaries/ folder")
