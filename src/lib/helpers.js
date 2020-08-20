import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'

export const toTitleCase = str => {
  return str.replace(/_/g, ' ').replace(
    /\w\S*/g,
    txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  )
}

export const exportActionsToPdf = (actions) => {
  pdfMake.vfs = pdfFonts.pdfMake.vfs

  const now = new Date().toISOString().split("T")[0]
  const docDefinition = {
    info: {
      title: `Retro-Actions-${now}.pdf`,
      subject: 'Retro Actions'
    },
    header: { text: 'Retro Actions', alignment: 'center', style: 'header', margin: 10 },
    footer: { text: `${now}`, alignment: 'center', style: 'footer', margin: 10 },
    content: actions,
    styles: {
      header: {
        fontSize: 22,
        bold: true
      },
      footer: {
        bold: true
      }
    }
  }

  pdfMake.createPdf(docDefinition).open()
}
