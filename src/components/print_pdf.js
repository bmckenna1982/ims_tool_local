import React from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const pxToMm = (px) => {
  return Math.floor(px / document.getElementById('myMm').offsetHeight);
};

const mmToPx = (mm) => {
  return document.getElementById('myMm').offsetHeight * mm;
};

const range = (start, end) => {
  return Array(end - start).join(0).split(0).map(function (val, id) { return id + start });
};

const togglePdfButtonView = () => {
  document.getElementById('printButton').classList.toggle('print')
  document.getElementById('emptyCartButton').classList.toggle('print')
}

const PrintButton = ({ id, label }) => {
  return (
    // <div className="tc mb4 mt2">
    /*
      Getting pixel height in milimeters:
      https://stackoverflow.com/questions/7650413/pixel-to-mm-equation/27111621#27111621
    */
    <React.Fragment>

      <div id="myMm" style={{ height: "1mm" }} />


      <div
        className="bttn" id="printButton"
        crossOrigin="anonymous"
        onClick={async () => {
          togglePdfButtonView()
          console.log('id', id)
          console.log('document.getElementById(id)', document.getElementById(id))
          const input = document.getElementById(id);
          input.setAttribute('crossOrigin', 'anonymous')
          const disclaimer = document.getElementById('cartDisclaimer')
          disclaimer.setAttribute('crossOrigin', 'anonymous')
          const disclaimerHeightMm = pxToMm(disclaimer.offsetHeight);
          const disclaimerWidthMm = pxToMm(disclaimer.offsetWidth);
          const inputHeightMm = pxToMm(input.offsetHeight);
          const inputWidthMm = pxToMm(input.offsetWidth);
          console.log('inputWidthMm', inputWidthMm)
          const a4WidthMm = 210;
          const a4HeightMm = 297;
          const a4HeightPx = mmToPx(a4HeightMm);
          const numPages = inputHeightMm + disclaimerHeightMm <= a4HeightMm ? 1 : Math.floor(inputHeightMm / a4HeightMm) + 1;
          console.log({
            input, inputHeightMm, inputWidthMm, disclaimerHeightMm, disclaimerWidthMm, a4HeightMm, a4HeightPx, numPages, range: range(0, numPages),
            comp: inputHeightMm <= a4HeightMm, inputHeightPx: input.offsetHeight
          });

          window.scrollTo(0, 0);
          let pdf = new jsPDF('p', 'mm');

          await html2canvas(disclaimer, {
            useCORS: true, logging: true, width: 375,
            // "onrendered": function (canvas) {
            //   alert(canvas);
            //   var url = canvas.toDataURL("image/png");
            //   window.open(url, "_blank");
            // }
          })
            .then((canvas) => {
              console.log('discalimer', disclaimer)
              const disclaimerData = canvas.toDataURL('image/png');

              // pdf.addImage(disclaimerData, 'PNG', 110, 10, disclaimerWidthMm - 5, disclaimerHeightMm);
              pdf.addImage(disclaimerData, 'PNG', 110, 10, disclaimerWidthMm - 5, disclaimerHeightMm);
              // pdf.save(`${id}.pdf`);
              // togglePdfButtonView()
            });
          ;

          await html2canvas(input, {
            useCORS: true, logging: true, width: 400,
            // "onrendered": function (canvas) {
            //   alert(canvas);
            //   var url = canvas.toDataURL("image/png");
            //   window.open(url, "_blank");
            // }
          })
            // html2canvas(input)
            .then((canvas) => {
              const imgData = canvas.toDataURL('image/png');
              let imgWidth = 210;
              let pageHeight = 295;
              let imgHeight = canvas.height * imgWidth / canvas.width;
              let heightLeft = inputHeightMm;
              // let pdf = new jsPDF('p', 'mm');
              let position = 0;

              console.log('canvas', canvas)
              // let pdf

              // // Document of a4WidthMm wide and inputHeightMm high
              // if (inputHeightMm > a4HeightMm) {
              //   // elongated a4 (system print dialog will handle page breaks)
              //   pdf = new jsPDF('p', 'mm', [inputHeightMm + 16, a4WidthMm]);
              // } else {
              //   // standard a4
              //   pdf = new jsPDF();
              // }

              // pdf = new jsPDF();

              // if (numPages > 0) {

              // }
              console.log('position', position)
              // pdf.addImage(imgData, 'PNG', 10, position + 10, inputWidthMm, inputHeightMm);
              pdf.addImage(imgData, 'PNG', 15, position + 10, inputWidthMm, inputHeightMm);
              heightLeft -= pageHeight;

              console.log('heightLeft', heightLeft)

              while (heightLeft >= 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 10, position + 10, imgWidth, imgHeight);
                heightLeft -= pageHeight;
              }
              // pdf.addImage(imgData, 'PNG', 0, 0, 200, inputHeightMm);
              // pdf.addImage(imgData, 'PNG', 20, 20, inputWidthMm, inputHeightMm)
              togglePdfButtonView()
              pdf.save(`${id}.pdf`);
            });
          ;

        }}
      >
        {label}
      </div>
    </React.Fragment >
    // </div>
  )
};

export default PrintButton;