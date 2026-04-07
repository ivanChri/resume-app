export async function exportPdf(elementId: string):Promise<void>{
  const originalContents = document.getElementById(elementId)
  if (!originalContents) return
  const iframe = document.createElement('iframe')
  iframe.style.position = 'fixed'
  iframe.style.right = '0'
  iframe.style.bottom = '0'
  iframe.style.width = '0'
  iframe.style.height = '0'
  iframe.style.border = 'none'
  iframe.style.visibility = 'hidden'
  document.body.appendChild(iframe)
  const targetDoc = iframe.contentWindow?.document
  if (!targetDoc) return
  let headHtml = ''
  document.querySelectorAll('link[rel="stylesheet"]').forEach(link => {
    headHtml += link.outerHTML
  })
  document.querySelectorAll('style').forEach(style => {
    headHtml += style.outerHTML
  })
  targetDoc.open()
  targetDoc.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        ${headHtml}
        <style>
          @page {
            size: A4;
            margin: 10mm;
          }
          * {
           -webkit-print-color-adjust: exact !important;
           print-color-adjust: exact !important;
           box-sizing: border-box !important;
          }
          body {
           margin: 0;
           padding: 0;
           width: 100%;
          }
          #print-wrapper {
           width: 100%;
           max-width: 190mm;
           margin: 0 auto;
           padding: 2rem;
          }
          #main-themes {
           width: 100% !important;
           margin: 0 !important;
          }
          body, h1, h2, h3, h4, span, p {
            visibility: visible !important;
          }
        </style>
      </head>
      <body>
        <div id="print-wrapper">
          ${originalContents.outerHTML}
        </div>
      </body>
    </html>
  `);
  targetDoc.close()
  try {
    await new Promise((resolve) => {
      const checkReady = () => {
        if (iframe.contentWindow?.document.readyState === 'complete') {
          resolve(true)
        } else {
          setTimeout(checkReady, 100)
        }
      }
      checkReady()
    })
    if (iframe.contentWindow?.document.fonts) {
      await iframe.contentWindow.document.fonts.ready
    }
    await new Promise(resolve => setTimeout(resolve, 500))
    iframe.contentWindow?.focus()
    iframe.contentWindow?.print()
  } catch (err) {
    console.error("Gagal mencetak:", err)
  } finally {
    setTimeout(() => {
      document.body.removeChild(iframe)
    }, 2000)
  }
}