import { useRef } from 'react'
import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'

export const toTitleCase = str => {
  return str.replace(/_/g, ' ')
    .replace(
      /\w\S*/g,
      txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    )
    .replace(new RegExp('-', 'g'), ' ')
    .replace(new RegExp(' i ', 'g'), ' I ')
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

export const useFocus = () => {
  const htmlElRef = useRef(null)

  const setFocus = () => {
    const element = htmlElRef.current

    if (element) {
      element.focus()
      element.setSelectionRange(element.value.length, element.value.length)
    }
  }

  return [htmlElRef, setFocus]
}

export const didUserVote = (id, votes) => {
  return votes.hasOwnProperty(id) && (votes[id].upVote || votes[id].downVote)
}
